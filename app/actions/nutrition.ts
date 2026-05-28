'use server'

import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { 
  food, 
  mealLog, 
  mealFood, 
  waterLog,
  userProfile
} from '@/lib/db/schema'
import { eq, and, desc, sql, ilike, or, gte, lt } from 'drizzle-orm'
import { headers } from 'next/headers'
import { revalidatePath } from 'next/cache'

async function getUserId() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) throw new Error('Unauthorized')
  return session.user.id
}

// Get all foods with optional filters
export async function getFoods(filters?: {
  category?: string
  search?: string
  isBrazilian?: boolean
}) {
  const foods = await db
    .select()
    .from(food)
    .where(
      and(
        eq(food.isPublic, true),
        filters?.category ? eq(food.category, filters.category) : undefined,
        filters?.isBrazilian !== undefined ? eq(food.isBrazilian, filters.isBrazilian) : undefined,
        filters?.search ? or(
          ilike(food.name, `%${filters.search}%`),
          ilike(food.brand, `%${filters.search}%`)
        ) : undefined
      )
    )
    .orderBy(food.name)

  return foods
}

// Get food by ID
export async function getFoodById(id: string) {
  const result = await db
    .select()
    .from(food)
    .where(eq(food.id, id))
    .limit(1)

  return result[0] || null
}

// Search foods
export async function searchFoods(query: string, limit = 20) {
  const foods = await db
    .select()
    .from(food)
    .where(
      and(
        eq(food.isPublic, true),
        or(
          ilike(food.name, `%${query}%`),
          ilike(food.brand, `%${query}%`)
        )
      )
    )
    .orderBy(food.name)
    .limit(limit)

  return foods
}

// Create custom food
export async function createFood(data: {
  name: string
  brand?: string
  category: string
  servingSize: number
  servingUnit?: string
  calories: number
  protein: number
  carbs: number
  fat: number
  fiber?: number
  sugar?: number
  sodium?: number
}) {
  const userId = await getUserId()
  
  const result = await db
    .insert(food)
    .values({
      ...data,
      isPublic: false,
      createdByUserId: userId,
    })
    .returning()

  revalidatePath('/dashboard/nutricao')
  return result[0]
}

// Log a meal
export async function logMeal(data: {
  mealType: 'breakfast' | 'morning_snack' | 'lunch' | 'afternoon_snack' | 'dinner' | 'supper'
  date?: Date
  notes?: string
  foods: Array<{
    foodId: string
    quantity: number
  }>
}) {
  const userId = await getUserId()
  const date = data.date || new Date()
  
  // Calculate totals
  let totalCalories = 0
  let totalProtein = 0
  let totalCarbs = 0
  let totalFat = 0

  // Get food details
  for (const item of data.foods) {
    const foodItem = await db
      .select()
      .from(food)
      .where(eq(food.id, item.foodId))
      .limit(1)

    if (foodItem[0]) {
      const multiplier = item.quantity
      totalCalories += Number(foodItem[0].calories) * multiplier
      totalProtein += Number(foodItem[0].protein) * multiplier
      totalCarbs += Number(foodItem[0].carbs) * multiplier
      totalFat += Number(foodItem[0].fat) * multiplier
    }
  }

  // Create meal log
  const mealResult = await db
    .insert(mealLog)
    .values({
      userId,
      mealType: data.mealType,
      date,
      notes: data.notes,
      totalCalories: String(totalCalories),
      totalProtein: String(totalProtein),
      totalCarbs: String(totalCarbs),
      totalFat: String(totalFat),
    })
    .returning()

  // Add foods to meal
  for (const item of data.foods) {
    await db.insert(mealFood).values({
      mealLogId: mealResult[0].id,
      foodId: item.foodId,
      quantity: String(item.quantity),
    })
  }

  revalidatePath('/dashboard/nutricao')
  return mealResult[0]
}

// Get meals for a specific date
export async function getMealsByDate(date: Date) {
  const userId = await getUserId()
  
  const startOfDay = new Date(date)
  startOfDay.setHours(0, 0, 0, 0)
  const endOfDay = new Date(date)
  endOfDay.setHours(23, 59, 59, 999)

  const meals = await db
    .select()
    .from(mealLog)
    .where(
      and(
        eq(mealLog.userId, userId),
        gte(mealLog.date, startOfDay),
        lt(mealLog.date, endOfDay)
      )
    )
    .orderBy(mealLog.createdAt)

  // Get foods for each meal
  const mealsWithFoods = await Promise.all(
    meals.map(async (meal) => {
      const foods = await db
        .select({
          mealFood,
          food,
        })
        .from(mealFood)
        .innerJoin(food, eq(mealFood.foodId, food.id))
        .where(eq(mealFood.mealLogId, meal.id))

      return {
        ...meal,
        foods,
      }
    })
  )

  return mealsWithFoods
}

// Get nutrition summary for a date
export async function getNutritionSummary(date: Date) {
  const userId = await getUserId()
  
  const startOfDay = new Date(date)
  startOfDay.setHours(0, 0, 0, 0)
  const endOfDay = new Date(date)
  endOfDay.setHours(23, 59, 59, 999)

  const meals = await db
    .select()
    .from(mealLog)
    .where(
      and(
        eq(mealLog.userId, userId),
        gte(mealLog.date, startOfDay),
        lt(mealLog.date, endOfDay)
      )
    )

  // Get user's goals
  const profile = await db
    .select()
    .from(userProfile)
    .where(eq(userProfile.userId, userId))
    .limit(1)

  const totals = meals.reduce(
    (acc, meal) => ({
      calories: acc.calories + Number(meal.totalCalories || 0),
      protein: acc.protein + Number(meal.totalProtein || 0),
      carbs: acc.carbs + Number(meal.totalCarbs || 0),
      fat: acc.fat + Number(meal.totalFat || 0),
    }),
    { calories: 0, protein: 0, carbs: 0, fat: 0 }
  )

  // Get water intake
  const waterResult = await db
    .select({ total: sql<number>`COALESCE(SUM(${waterLog.amount}), 0)` })
    .from(waterLog)
    .where(
      and(
        eq(waterLog.userId, userId),
        gte(waterLog.date, startOfDay),
        lt(waterLog.date, endOfDay)
      )
    )

  const goals = {
    calories: 2000,
    protein: 150,
    carbs: 250,
    fat: 65,
    water: 2000,
    ...profile[0],
  }

  return {
    consumed: totals,
    water: Number(waterResult[0]?.total || 0),
    goals,
    remaining: {
      calories: goals.calories - totals.calories,
      protein: goals.protein - totals.protein,
      carbs: goals.carbs - totals.carbs,
      fat: goals.fat - totals.fat,
      water: goals.water - Number(waterResult[0]?.total || 0),
    },
  }
}

// Log water intake
export async function logWater(amount: number, date?: Date) {
  const userId = await getUserId()
  
  const result = await db
    .insert(waterLog)
    .values({
      userId,
      amount,
      date: date || new Date(),
    })
    .returning()

  revalidatePath('/dashboard/nutricao')
  return result[0]
}

// Get water intake for a date
export async function getWaterIntake(date: Date) {
  const userId = await getUserId()
  
  const startOfDay = new Date(date)
  startOfDay.setHours(0, 0, 0, 0)
  const endOfDay = new Date(date)
  endOfDay.setHours(23, 59, 59, 999)

  const logs = await db
    .select()
    .from(waterLog)
    .where(
      and(
        eq(waterLog.userId, userId),
        gte(waterLog.date, startOfDay),
        lt(waterLog.date, endOfDay)
      )
    )
    .orderBy(waterLog.createdAt)

  const total = logs.reduce((sum, log) => sum + log.amount, 0)

  return {
    logs,
    total,
  }
}

// Delete meal
export async function deleteMeal(mealId: string) {
  const userId = await getUserId()
  
  await db
    .delete(mealLog)
    .where(and(eq(mealLog.id, mealId), eq(mealLog.userId, userId)))

  revalidatePath('/dashboard/nutricao')
  return { success: true }
}

// Get food categories
export async function getFoodCategories() {
  const categories = await db
    .selectDistinct({ category: food.category })
    .from(food)
    .where(eq(food.isPublic, true))
    .orderBy(food.category)

  return categories.map(c => c.category).filter(Boolean)
}
