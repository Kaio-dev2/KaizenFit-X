'use server'

import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { userProfile, user, workoutSession, mealLog, waterLog, userAchievement, achievement } from '@/lib/db/schema'
import { eq, and, desc, sql, gte, lt } from 'drizzle-orm'
import { headers } from 'next/headers'
import { revalidatePath } from 'next/cache'

async function getUserId() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) throw new Error('Unauthorized')
  return session.user.id
}

// Get current user's profile
export async function getUserProfile() {
  const userId = await getUserId()
  
  const profile = await db
    .select()
    .from(userProfile)
    .where(eq(userProfile.userId, userId))
    .limit(1)

  return profile[0] || null
}

// Create or update user profile
export async function upsertUserProfile(data: {
  bio?: string
  gender?: 'male' | 'female' | 'other'
  birthDate?: Date
  height?: number
  weight?: number
  targetWeight?: number
  goal?: 'lose_weight' | 'gain_muscle' | 'maintain' | 'improve_health' | 'gain_strength'
  activityLevel?: 'sedentary' | 'light' | 'moderate' | 'active' | 'very_active'
  onboardingCompleted?: boolean
}) {
  const userId = await getUserId()
  
  const existing = await db
    .select()
    .from(userProfile)
    .where(eq(userProfile.userId, userId))
    .limit(1)

  if (existing.length > 0) {
    await db
      .update(userProfile)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(userProfile.userId, userId))
  } else {
    await db.insert(userProfile).values({
      userId,
      ...data,
    })
  }

  revalidatePath('/dashboard')
  return { success: true }
}

// Get user stats for dashboard
export async function getDashboardStats() {
  const userId = await getUserId()
  
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const tomorrow = new Date(today)
  tomorrow.setDate(tomorrow.getDate() + 1)
  
  const weekAgo = new Date(today)
  weekAgo.setDate(weekAgo.getDate() - 7)

  // Get profile
  const profile = await db
    .select()
    .from(userProfile)
    .where(eq(userProfile.userId, userId))
    .limit(1)

  // Get today's workouts
  const todayWorkouts = await db
    .select()
    .from(workoutSession)
    .where(
      and(
        eq(workoutSession.userId, userId),
        gte(workoutSession.startedAt, today),
        lt(workoutSession.startedAt, tomorrow)
      )
    )

  // Get this week's workouts
  const weekWorkouts = await db
    .select()
    .from(workoutSession)
    .where(
      and(
        eq(workoutSession.userId, userId),
        gte(workoutSession.startedAt, weekAgo)
      )
    )

  // Get today's meals
  const todayMeals = await db
    .select()
    .from(mealLog)
    .where(
      and(
        eq(mealLog.userId, userId),
        gte(mealLog.date, today),
        lt(mealLog.date, tomorrow)
      )
    )

  // Get today's water intake
  const todayWater = await db
    .select({ total: sql<number>`COALESCE(SUM(${waterLog.amount}), 0)` })
    .from(waterLog)
    .where(
      and(
        eq(waterLog.userId, userId),
        gte(waterLog.date, today),
        lt(waterLog.date, tomorrow)
      )
    )

  // Get user achievements count
  const achievementsCount = await db
    .select({ count: sql<number>`COUNT(*)` })
    .from(userAchievement)
    .where(eq(userAchievement.userId, userId))

  const totalCaloriesToday = todayMeals.reduce((sum, meal) => 
    sum + Number(meal.totalCalories || 0), 0
  )

  return {
    profile: profile[0] || null,
    todayWorkouts: todayWorkouts.length,
    weekWorkouts: weekWorkouts.length,
    todayCalories: totalCaloriesToday,
    todayWater: Number(todayWater[0]?.total || 0),
    achievements: Number(achievementsCount[0]?.count || 0),
    xp: profile[0]?.xp || 0,
    level: profile[0]?.level || 1,
    streak: profile[0]?.streak || 0,
  }
}

// Add XP to user
export async function addXP(amount: number) {
  const userId = await getUserId()
  
  const profile = await db
    .select()
    .from(userProfile)
    .where(eq(userProfile.userId, userId))
    .limit(1)

  if (!profile[0]) {
    await db.insert(userProfile).values({
      userId,
      xp: amount,
      level: 1,
    })
  } else {
    const currentXp = profile[0].xp + amount
    const newLevel = Math.floor(currentXp / 1000) + 1 // Level up every 1000 XP

    await db
      .update(userProfile)
      .set({ 
        xp: currentXp, 
        level: newLevel,
        updatedAt: new Date() 
      })
      .where(eq(userProfile.userId, userId))
  }

  revalidatePath('/dashboard')
  return { success: true }
}

// Update streak
export async function updateStreak() {
  const userId = await getUserId()
  
  const profile = await db
    .select()
    .from(userProfile)
    .where(eq(userProfile.userId, userId))
    .limit(1)

  if (!profile[0]) return { success: false }

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const lastActivity = profile[0].lastActivityDate
  let newStreak = 1

  if (lastActivity) {
    const lastDate = new Date(lastActivity)
    lastDate.setHours(0, 0, 0, 0)
    
    const diffDays = Math.floor((today.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24))
    
    if (diffDays === 0) {
      // Already tracked today
      return { success: true, streak: profile[0].streak }
    } else if (diffDays === 1) {
      // Consecutive day
      newStreak = profile[0].streak + 1
    }
    // If diffDays > 1, streak resets to 1
  }

  await db
    .update(userProfile)
    .set({ 
      streak: newStreak,
      lastActivityDate: today,
      updatedAt: new Date() 
    })
    .where(eq(userProfile.userId, userId))

  revalidatePath('/dashboard')
  return { success: true, streak: newStreak }
}

// Get recent achievements
export async function getRecentAchievements(limit = 5) {
  const userId = await getUserId()
  
  const achievements = await db
    .select({
      userAchievement,
      achievement,
    })
    .from(userAchievement)
    .innerJoin(achievement, eq(userAchievement.achievementId, achievement.id))
    .where(eq(userAchievement.userId, userId))
    .orderBy(desc(userAchievement.unlockedAt))
    .limit(limit)

  return achievements
}

// Get leaderboard
export async function getLeaderboard(limit = 10) {
  const leaderboard = await db
    .select({
      user: {
        id: user.id,
        name: user.name,
        image: user.image,
      },
      profile: {
        xp: userProfile.xp,
        level: userProfile.level,
        streak: userProfile.streak,
      },
    })
    .from(userProfile)
    .innerJoin(user, eq(userProfile.userId, user.id))
    .orderBy(desc(userProfile.xp))
    .limit(limit)

  return leaderboard
}
