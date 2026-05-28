'use server'

import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { 
  communityPost,
  postLike,
  postComment,
  userFollow,
  user,
  userProfile,
  workoutSession
} from '@/lib/db/schema'
import { eq, and, desc, sql, or, ne } from 'drizzle-orm'
import { headers } from 'next/headers'
import { revalidatePath } from 'next/cache'

async function getUserId() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) throw new Error('Unauthorized')
  return session.user.id
}

// Get feed posts
export async function getFeedPosts(limit = 20, offset = 0) {
  const userId = await getUserId()
  
  // Get posts from followed users and public posts
  const posts = await db
    .select({
      post: communityPost,
      user: {
        id: user.id,
        name: user.name,
        image: user.image,
      },
      profile: {
        level: userProfile.level,
        xp: userProfile.xp,
      },
    })
    .from(communityPost)
    .innerJoin(user, eq(communityPost.userId, user.id))
    .leftJoin(userProfile, eq(communityPost.userId, userProfile.userId))
    .where(eq(communityPost.isPublic, true))
    .orderBy(desc(communityPost.createdAt))
    .limit(limit)
    .offset(offset)

  // Check if current user liked each post
  const postsWithLikes = await Promise.all(
    posts.map(async (item) => {
      const liked = await db
        .select()
        .from(postLike)
        .where(
          and(
            eq(postLike.postId, item.post.id),
            eq(postLike.userId, userId)
          )
        )
        .limit(1)

      return {
        ...item,
        isLiked: liked.length > 0,
      }
    })
  )

  return postsWithLikes
}

// Get single post with comments
export async function getPostWithComments(postId: string) {
  const userId = await getUserId()
  
  const post = await db
    .select({
      post: communityPost,
      user: {
        id: user.id,
        name: user.name,
        image: user.image,
      },
    })
    .from(communityPost)
    .innerJoin(user, eq(communityPost.userId, user.id))
    .where(eq(communityPost.id, postId))
    .limit(1)

  if (!post[0]) return null

  // Get comments
  const comments = await db
    .select({
      comment: postComment,
      user: {
        id: user.id,
        name: user.name,
        image: user.image,
      },
    })
    .from(postComment)
    .innerJoin(user, eq(postComment.userId, user.id))
    .where(eq(postComment.postId, postId))
    .orderBy(desc(postComment.createdAt))

  // Check if liked
  const liked = await db
    .select()
    .from(postLike)
    .where(
      and(
        eq(postLike.postId, postId),
        eq(postLike.userId, userId)
      )
    )
    .limit(1)

  return {
    ...post[0],
    comments,
    isLiked: liked.length > 0,
  }
}

// Create a post
export async function createPost(data: {
  content: string
  type?: 'text' | 'image' | 'workout' | 'progress' | 'achievement'
  imageUrl?: string
  workoutSessionId?: string
}) {
  const userId = await getUserId()
  
  const result = await db
    .insert(communityPost)
    .values({
      userId,
      ...data,
    })
    .returning()

  revalidatePath('/dashboard/comunidade')
  return result[0]
}

// Like a post
export async function likePost(postId: string) {
  const userId = await getUserId()
  
  // Check if already liked
  const existing = await db
    .select()
    .from(postLike)
    .where(
      and(
        eq(postLike.postId, postId),
        eq(postLike.userId, userId)
      )
    )
    .limit(1)

  if (existing.length > 0) {
    // Unlike
    await db
      .delete(postLike)
      .where(
        and(
          eq(postLike.postId, postId),
          eq(postLike.userId, userId)
        )
      )

    // Decrement likes count
    await db
      .update(communityPost)
      .set({ likesCount: sql`${communityPost.likesCount} - 1` })
      .where(eq(communityPost.id, postId))

    revalidatePath('/dashboard/comunidade')
    return { liked: false }
  }

  // Like
  await db.insert(postLike).values({
    postId,
    userId,
  })

  // Increment likes count
  await db
    .update(communityPost)
    .set({ likesCount: sql`${communityPost.likesCount} + 1` })
    .where(eq(communityPost.id, postId))

  revalidatePath('/dashboard/comunidade')
  return { liked: true }
}

// Add comment to post
export async function addComment(postId: string, content: string, parentCommentId?: string) {
  const userId = await getUserId()
  
  const result = await db
    .insert(postComment)
    .values({
      postId,
      userId,
      content,
      parentCommentId,
    })
    .returning()

  // Increment comments count
  await db
    .update(communityPost)
    .set({ commentsCount: sql`${communityPost.commentsCount} + 1` })
    .where(eq(communityPost.id, postId))

  revalidatePath('/dashboard/comunidade')
  return result[0]
}

// Follow a user
export async function followUser(targetUserId: string) {
  const userId = await getUserId()
  
  if (userId === targetUserId) {
    throw new Error('Cannot follow yourself')
  }

  // Check if already following
  const existing = await db
    .select()
    .from(userFollow)
    .where(
      and(
        eq(userFollow.followerId, userId),
        eq(userFollow.followingId, targetUserId)
      )
    )
    .limit(1)

  if (existing.length > 0) {
    // Unfollow
    await db
      .delete(userFollow)
      .where(
        and(
          eq(userFollow.followerId, userId),
          eq(userFollow.followingId, targetUserId)
        )
      )

    revalidatePath('/dashboard/comunidade')
    return { following: false }
  }

  // Follow
  await db.insert(userFollow).values({
    followerId: userId,
    followingId: targetUserId,
  })

  revalidatePath('/dashboard/comunidade')
  return { following: true }
}

// Get user's followers
export async function getFollowers(targetUserId?: string) {
  const userId = targetUserId || await getUserId()
  
  const followers = await db
    .select({
      user: {
        id: user.id,
        name: user.name,
        image: user.image,
      },
      profile: {
        level: userProfile.level,
      },
    })
    .from(userFollow)
    .innerJoin(user, eq(userFollow.followerId, user.id))
    .leftJoin(userProfile, eq(userFollow.followerId, userProfile.userId))
    .where(eq(userFollow.followingId, userId))

  return followers
}

// Get user's following
export async function getFollowing(targetUserId?: string) {
  const userId = targetUserId || await getUserId()
  
  const following = await db
    .select({
      user: {
        id: user.id,
        name: user.name,
        image: user.image,
      },
      profile: {
        level: userProfile.level,
      },
    })
    .from(userFollow)
    .innerJoin(user, eq(userFollow.followingId, user.id))
    .leftJoin(userProfile, eq(userFollow.followingId, userProfile.userId))
    .where(eq(userFollow.followerId, userId))

  return following
}

// Get user profile for community
export async function getCommunityProfile(targetUserId: string) {
  const currentUserId = await getUserId()
  
  const userData = await db
    .select({
      user: {
        id: user.id,
        name: user.name,
        image: user.image,
      },
      profile: userProfile,
    })
    .from(user)
    .leftJoin(userProfile, eq(user.id, userProfile.userId))
    .where(eq(user.id, targetUserId))
    .limit(1)

  if (!userData[0]) return null

  // Get counts
  const postsCount = await db
    .select({ count: sql<number>`COUNT(*)` })
    .from(communityPost)
    .where(eq(communityPost.userId, targetUserId))

  const followersCount = await db
    .select({ count: sql<number>`COUNT(*)` })
    .from(userFollow)
    .where(eq(userFollow.followingId, targetUserId))

  const followingCount = await db
    .select({ count: sql<number>`COUNT(*)` })
    .from(userFollow)
    .where(eq(userFollow.followerId, targetUserId))

  // Check if current user is following
  const isFollowing = await db
    .select()
    .from(userFollow)
    .where(
      and(
        eq(userFollow.followerId, currentUserId),
        eq(userFollow.followingId, targetUserId)
      )
    )
    .limit(1)

  return {
    ...userData[0],
    postsCount: Number(postsCount[0]?.count || 0),
    followersCount: Number(followersCount[0]?.count || 0),
    followingCount: Number(followingCount[0]?.count || 0),
    isFollowing: isFollowing.length > 0,
    isOwnProfile: currentUserId === targetUserId,
  }
}

// Get user's posts
export async function getUserPosts(targetUserId: string, limit = 20) {
  const posts = await db
    .select()
    .from(communityPost)
    .where(and(eq(communityPost.userId, targetUserId), eq(communityPost.isPublic, true)))
    .orderBy(desc(communityPost.createdAt))
    .limit(limit)

  return posts
}

// Delete post
export async function deletePost(postId: string) {
  const userId = await getUserId()
  
  await db
    .delete(communityPost)
    .where(and(eq(communityPost.id, postId), eq(communityPost.userId, userId)))

  revalidatePath('/dashboard/comunidade')
  return { success: true }
}

// Share workout to community
export async function shareWorkout(sessionId: string, content: string) {
  const userId = await getUserId()
  
  // Verify workout belongs to user
  const session = await db
    .select()
    .from(workoutSession)
    .where(and(eq(workoutSession.id, sessionId), eq(workoutSession.userId, userId)))
    .limit(1)

  if (!session[0]) throw new Error('Workout not found')

  const result = await db
    .insert(communityPost)
    .values({
      userId,
      content,
      type: 'workout',
      workoutSessionId: sessionId,
    })
    .returning()

  revalidatePath('/dashboard/comunidade')
  return result[0]
}

// Get suggested users to follow
export async function getSuggestedUsers(limit = 5) {
  const userId = await getUserId()
  
  // Get users that the current user is not following
  const following = await db
    .select({ followingId: userFollow.followingId })
    .from(userFollow)
    .where(eq(userFollow.followerId, userId))

  const followingIds = following.map(f => f.followingId)

  const suggestions = await db
    .select({
      user: {
        id: user.id,
        name: user.name,
        image: user.image,
      },
      profile: {
        level: userProfile.level,
        xp: userProfile.xp,
      },
    })
    .from(user)
    .leftJoin(userProfile, eq(user.id, userProfile.userId))
    .where(
      and(
        ne(user.id, userId),
        followingIds.length > 0 
          ? sql`${user.id} NOT IN (${sql.join(followingIds.map(id => sql`${id}`), sql`, `)})`
          : undefined
      )
    )
    .orderBy(desc(userProfile.xp))
    .limit(limit)

  return suggestions
}
