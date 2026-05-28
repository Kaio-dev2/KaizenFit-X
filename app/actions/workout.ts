'use server'

import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { 
  exercise, 
  workoutPlan, 
  workoutDay, 
  workoutExercise, 
  workoutSession, 
  exerciseSet,
  userProfile
} from '@/lib/db/schema'
import { eq, and, desc, sql, ilike, or } from 'drizzle-orm'
import { headers } from 'next/headers'
import { revalidatePath } from 'next/cache'

async function getUserId() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) throw new Error('Unauthorized')
  return session.user.id
}

// Get all public exercises
export async function getExercises(filters?: {
  muscleGroup?: string
  difficulty?: string
  search?: string
}) {
  let query = db.select().from(exercise).where(eq(exercise.isPublic, true))

  const exercises = await db
    .select()
    .from(exercise)
    .where(
      and(
        eq(exercise.isPublic, true),
        filters?.muscleGroup ? eq(exercise.muscleGroup, filters.muscleGroup as any) : undefined,
        filters?.difficulty ? eq(exercise.difficulty, filters.difficulty as any) : undefined,
        filters?.search ? or(
          ilike(exercise.name, `%${filters.search}%`),
          ilike(exercise.description, `%${filters.search}%`)
        ) : undefined
      )
    )
    .orderBy(exercise.name)

  return exercises
}

// Get exercise by ID
export async function getExerciseById(id: string) {
  const result = await db
    .select()
    .from(exercise)
    .where(eq(exercise.id, id))
    .limit(1)

  return result[0] || null
}

// Get user's workout plans
export async function getUserWorkoutPlans() {
  const userId = await getUserId()
  
  const plans = await db
    .select()
    .from(workoutPlan)
    .where(eq(workoutPlan.userId, userId))
    .orderBy(desc(workoutPlan.createdAt))

  return plans
}

// Get workout plan with days and exercises
export async function getWorkoutPlanWithDetails(planId: string) {
  const userId = await getUserId()
  
  const plan = await db
    .select()
    .from(workoutPlan)
    .where(and(eq(workoutPlan.id, planId), eq(workoutPlan.userId, userId)))
    .limit(1)

  if (!plan[0]) return null

  const days = await db
    .select()
    .from(workoutDay)
    .where(eq(workoutDay.workoutPlanId, planId))
    .orderBy(workoutDay.order)

  const daysWithExercises = await Promise.all(
    days.map(async (day) => {
      const exercises = await db
        .select({
          workoutExercise,
          exercise,
        })
        .from(workoutExercise)
        .innerJoin(exercise, eq(workoutExercise.exerciseId, exercise.id))
        .where(eq(workoutExercise.workoutDayId, day.id))
        .orderBy(workoutExercise.order)

      return {
        ...day,
        exercises,
      }
    })
  )

  return {
    ...plan[0],
    days: daysWithExercises,
  }
}

// Create a new workout plan
export async function createWorkoutPlan(data: {
  name: string
  description?: string
  goal?: 'lose_weight' | 'gain_muscle' | 'maintain' | 'improve_health' | 'gain_strength'
  difficulty?: 'beginner' | 'intermediate' | 'advanced' | 'expert'
  durationWeeks?: number
}) {
  const userId = await getUserId()
  
  const result = await db
    .insert(workoutPlan)
    .values({
      userId,
      ...data,
    })
    .returning()

  revalidatePath('/dashboard/treinos')
  return result[0]
}

// Add day to workout plan
export async function addWorkoutDay(planId: string, data: {
  dayOfWeek: number
  name: string
  description?: string
  restDay?: boolean
}) {
  const userId = await getUserId()
  
  // Verify plan belongs to user
  const plan = await db
    .select()
    .from(workoutPlan)
    .where(and(eq(workoutPlan.id, planId), eq(workoutPlan.userId, userId)))
    .limit(1)

  if (!plan[0]) throw new Error('Plan not found')

  // Get max order
  const maxOrder = await db
    .select({ max: sql<number>`COALESCE(MAX(${workoutDay.order}), -1)` })
    .from(workoutDay)
    .where(eq(workoutDay.workoutPlanId, planId))

  const result = await db
    .insert(workoutDay)
    .values({
      workoutPlanId: planId,
      order: (maxOrder[0]?.max || 0) + 1,
      ...data,
    })
    .returning()

  revalidatePath('/dashboard/treinos')
  return result[0]
}

// Add exercise to workout day
export async function addExerciseToDay(dayId: string, data: {
  exerciseId: string
  sets?: number
  reps?: number
  duration?: number
  restSeconds?: number
  weight?: number
  notes?: string
}) {
  const userId = await getUserId()
  
  // Verify day belongs to user's plan
  const day = await db
    .select({ workoutDay, workoutPlan })
    .from(workoutDay)
    .innerJoin(workoutPlan, eq(workoutDay.workoutPlanId, workoutPlan.id))
    .where(and(eq(workoutDay.id, dayId), eq(workoutPlan.userId, userId)))
    .limit(1)

  if (!day[0]) throw new Error('Day not found')

  // Get max order
  const maxOrder = await db
    .select({ max: sql<number>`COALESCE(MAX(${workoutExercise.order}), -1)` })
    .from(workoutExercise)
    .where(eq(workoutExercise.workoutDayId, dayId))

  const result = await db
    .insert(workoutExercise)
    .values({
      workoutDayId: dayId,
      order: (maxOrder[0]?.max || 0) + 1,
      ...data,
    })
    .returning()

  revalidatePath('/dashboard/treinos')
  return result[0]
}

// Start a workout session
export async function startWorkoutSession(data: {
  workoutDayId?: string
  name: string
}) {
  const userId = await getUserId()
  
  const result = await db
    .insert(workoutSession)
    .values({
      userId,
      ...data,
    })
    .returning()

  revalidatePath('/dashboard/treinos')
  return result[0]
}

// Log an exercise set during a workout
export async function logExerciseSet(sessionId: string, data: {
  exerciseId: string
  setNumber: number
  reps?: number
  weight?: number
  duration?: number
  completed?: boolean
}) {
  const userId = await getUserId()
  
  // Verify session belongs to user
  const session = await db
    .select()
    .from(workoutSession)
    .where(and(eq(workoutSession.id, sessionId), eq(workoutSession.userId, userId)))
    .limit(1)

  if (!session[0]) throw new Error('Session not found')

  const result = await db
    .insert(exerciseSet)
    .values({
      workoutSessionId: sessionId,
      ...data,
    })
    .returning()

  return result[0]
}

// Complete a workout session
export async function completeWorkoutSession(sessionId: string, data: {
  duration?: number
  caloriesBurned?: number
  notes?: string
  rating?: number
}) {
  const userId = await getUserId()
  
  // Verify session belongs to user
  const session = await db
    .select()
    .from(workoutSession)
    .where(and(eq(workoutSession.id, sessionId), eq(workoutSession.userId, userId)))
    .limit(1)

  if (!session[0]) throw new Error('Session not found')

  // Calculate XP based on duration
  const xpEarned = Math.floor((data.duration || 30) * 2) + 50 // Base 50 XP + 2 XP per minute

  await db
    .update(workoutSession)
    .set({
      finishedAt: new Date(),
      xpEarned,
      ...data,
    })
    .where(eq(workoutSession.id, sessionId))

  // Update user profile
  const profile = await db
    .select()
    .from(userProfile)
    .where(eq(userProfile.userId, userId))
    .limit(1)

  if (profile[0]) {
    const newXp = profile[0].xp + xpEarned
    const newLevel = Math.floor(newXp / 1000) + 1
    
    await db
      .update(userProfile)
      .set({
        xp: newXp,
        level: newLevel,
        lastActivityDate: new Date(),
        streak: profile[0].streak + 1,
        updatedAt: new Date(),
      })
      .where(eq(userProfile.userId, userId))
  }

  revalidatePath('/dashboard')
  revalidatePath('/dashboard/treinos')
  return { success: true, xpEarned }
}

// Get user's recent workout sessions
export async function getRecentWorkoutSessions(limit = 10) {
  const userId = await getUserId()
  
  const sessions = await db
    .select()
    .from(workoutSession)
    .where(eq(workoutSession.userId, userId))
    .orderBy(desc(workoutSession.startedAt))
    .limit(limit)

  return sessions
}

// Get workout session with all sets
export async function getWorkoutSessionDetails(sessionId: string) {
  const userId = await getUserId()
  
  const session = await db
    .select()
    .from(workoutSession)
    .where(and(eq(workoutSession.id, sessionId), eq(workoutSession.userId, userId)))
    .limit(1)

  if (!session[0]) return null

  const sets = await db
    .select({
      exerciseSet,
      exercise,
    })
    .from(exerciseSet)
    .innerJoin(exercise, eq(exerciseSet.exerciseId, exercise.id))
    .where(eq(exerciseSet.workoutSessionId, sessionId))
    .orderBy(exerciseSet.createdAt)

  return {
    ...session[0],
    sets,
  }
}

// Delete workout plan
export async function deleteWorkoutPlan(planId: string) {
  const userId = await getUserId()
  
  await db
    .delete(workoutPlan)
    .where(and(eq(workoutPlan.id, planId), eq(workoutPlan.userId, userId)))

  revalidatePath('/dashboard/treinos')
  return { success: true }
}
