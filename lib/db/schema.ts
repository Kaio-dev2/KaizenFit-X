import { pgTable, text, timestamp, boolean, integer, decimal, uuid, jsonb, pgEnum } from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'

// --- Enums -------------------------------------------------------------------

export const genderEnum = pgEnum('gender', ['male', 'female', 'other'])
export const goalEnum = pgEnum('goal', ['lose_weight', 'gain_muscle', 'maintain', 'improve_health', 'gain_strength'])
export const activityLevelEnum = pgEnum('activity_level', ['sedentary', 'light', 'moderate', 'active', 'very_active'])
export const difficultyEnum = pgEnum('difficulty', ['beginner', 'intermediate', 'advanced', 'expert'])
export const muscleGroupEnum = pgEnum('muscle_group', ['chest', 'back', 'shoulders', 'biceps', 'triceps', 'forearms', 'abs', 'quadriceps', 'hamstrings', 'glutes', 'calves', 'full_body', 'cardio'])
export const mealTypeEnum = pgEnum('meal_type', ['breakfast', 'morning_snack', 'lunch', 'afternoon_snack', 'dinner', 'supper'])
export const orderStatusEnum = pgEnum('order_status', ['pending', 'paid', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded'])
export const userRoleEnum = pgEnum('user_role', ['user', 'admin', 'moderator', 'support', 'seller'])
export const postTypeEnum = pgEnum('post_type', ['text', 'image', 'workout', 'progress', 'achievement'])

// --- Better Auth required tables ---------------------------------------------

export const user = pgTable('user', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  emailVerified: boolean('emailVerified').notNull().default(false),
  image: text('image'),
  role: userRoleEnum('role').notNull().default('user'),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
})

export const session = pgTable('session', {
  id: text('id').primaryKey(),
  expiresAt: timestamp('expiresAt').notNull(),
  token: text('token').notNull().unique(),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
  ipAddress: text('ipAddress'),
  userAgent: text('userAgent'),
  userId: text('userId')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
})

export const account = pgTable('account', {
  id: text('id').primaryKey(),
  accountId: text('accountId').notNull(),
  providerId: text('providerId').notNull(),
  userId: text('userId')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  accessToken: text('accessToken'),
  refreshToken: text('refreshToken'),
  idToken: text('idToken'),
  accessTokenExpiresAt: timestamp('accessTokenExpiresAt'),
  refreshTokenExpiresAt: timestamp('refreshTokenExpiresAt'),
  scope: text('scope'),
  password: text('password'),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
})

export const verification = pgTable('verification', {
  id: text('id').primaryKey(),
  identifier: text('identifier').notNull(),
  value: text('value').notNull(),
  expiresAt: timestamp('expiresAt').notNull(),
  createdAt: timestamp('createdAt').defaultNow(),
  updatedAt: timestamp('updatedAt').defaultNow(),
})

// --- User Profile ------------------------------------------------------------

export const userProfile = pgTable('user_profile', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: text('userId')
    .notNull()
    .unique()
    .references(() => user.id, { onDelete: 'cascade' }),
  bio: text('bio'),
  gender: genderEnum('gender'),
  birthDate: timestamp('birthDate'),
  height: decimal('height', { precision: 5, scale: 2 }), // cm
  weight: decimal('weight', { precision: 5, scale: 2 }), // kg
  targetWeight: decimal('targetWeight', { precision: 5, scale: 2 }),
  goal: goalEnum('goal'),
  activityLevel: activityLevelEnum('activityLevel'),
  // Gamification
  xp: integer('xp').notNull().default(0),
  level: integer('level').notNull().default(1),
  streak: integer('streak').notNull().default(0),
  lastActivityDate: timestamp('lastActivityDate'),
  // Onboarding
  onboardingCompleted: boolean('onboardingCompleted').notNull().default(false),
  // Notifications
  pushNotifications: boolean('pushNotifications').notNull().default(true),
  emailNotifications: boolean('emailNotifications').notNull().default(true),
  // Timestamps
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
})

// --- Workout Module ----------------------------------------------------------

export const exercise = pgTable('exercise', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  description: text('description'),
  instructions: text('instructions'),
  muscleGroup: muscleGroupEnum('muscleGroup').notNull(),
  secondaryMuscles: jsonb('secondaryMuscles').$type<string[]>(),
  difficulty: difficultyEnum('difficulty').notNull().default('beginner'),
  equipment: text('equipment'),
  videoUrl: text('videoUrl'),
  imageUrl: text('imageUrl'),
  caloriesPerMinute: integer('caloriesPerMinute'),
  isPublic: boolean('isPublic').notNull().default(true),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
})

export const workoutPlan = pgTable('workout_plan', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: text('userId')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  name: text('name').notNull(),
  description: text('description'),
  goal: goalEnum('goal'),
  difficulty: difficultyEnum('difficulty').notNull().default('beginner'),
  durationWeeks: integer('durationWeeks').notNull().default(4),
  isActive: boolean('isActive').notNull().default(false),
  isPublic: boolean('isPublic').notNull().default(false),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
})

export const workoutDay = pgTable('workout_day', {
  id: uuid('id').primaryKey().defaultRandom(),
  workoutPlanId: uuid('workoutPlanId')
    .notNull()
    .references(() => workoutPlan.id, { onDelete: 'cascade' }),
  dayOfWeek: integer('dayOfWeek').notNull(), // 0-6 (Sunday-Saturday)
  name: text('name').notNull(),
  description: text('description'),
  estimatedDuration: integer('estimatedDuration'), // minutes
  restDay: boolean('restDay').notNull().default(false),
  order: integer('order').notNull().default(0),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
})

export const workoutExercise = pgTable('workout_exercise', {
  id: uuid('id').primaryKey().defaultRandom(),
  workoutDayId: uuid('workoutDayId')
    .notNull()
    .references(() => workoutDay.id, { onDelete: 'cascade' }),
  exerciseId: uuid('exerciseId')
    .notNull()
    .references(() => exercise.id, { onDelete: 'cascade' }),
  sets: integer('sets').notNull().default(3),
  reps: integer('reps'),
  duration: integer('duration'), // seconds (for timed exercises)
  restSeconds: integer('restSeconds').notNull().default(60),
  weight: decimal('weight', { precision: 6, scale: 2 }),
  notes: text('notes'),
  order: integer('order').notNull().default(0),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
})

export const workoutSession = pgTable('workout_session', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: text('userId')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  workoutDayId: uuid('workoutDayId')
    .references(() => workoutDay.id, { onDelete: 'set null' }),
  name: text('name').notNull(),
  startedAt: timestamp('startedAt').notNull().defaultNow(),
  finishedAt: timestamp('finishedAt'),
  duration: integer('duration'), // minutes
  caloriesBurned: integer('caloriesBurned'),
  notes: text('notes'),
  rating: integer('rating'), // 1-5
  xpEarned: integer('xpEarned').notNull().default(0),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
})

export const exerciseSet = pgTable('exercise_set', {
  id: uuid('id').primaryKey().defaultRandom(),
  workoutSessionId: uuid('workoutSessionId')
    .notNull()
    .references(() => workoutSession.id, { onDelete: 'cascade' }),
  exerciseId: uuid('exerciseId')
    .notNull()
    .references(() => exercise.id, { onDelete: 'cascade' }),
  setNumber: integer('setNumber').notNull(),
  reps: integer('reps'),
  weight: decimal('weight', { precision: 6, scale: 2 }),
  duration: integer('duration'), // seconds
  completed: boolean('completed').notNull().default(false),
  notes: text('notes'),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
})

// --- Nutrition Module --------------------------------------------------------

export const food = pgTable('food', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  brand: text('brand'),
  category: text('category').notNull(),
  servingSize: decimal('servingSize', { precision: 8, scale: 2 }).notNull(), // grams
  servingUnit: text('servingUnit').notNull().default('g'),
  calories: decimal('calories', { precision: 8, scale: 2 }).notNull(),
  protein: decimal('protein', { precision: 8, scale: 2 }).notNull(),
  carbs: decimal('carbs', { precision: 8, scale: 2 }).notNull(),
  fat: decimal('fat', { precision: 8, scale: 2 }).notNull(),
  fiber: decimal('fiber', { precision: 8, scale: 2 }),
  sugar: decimal('sugar', { precision: 8, scale: 2 }),
  sodium: decimal('sodium', { precision: 8, scale: 2 }),
  isPublic: boolean('isPublic').notNull().default(true),
  createdByUserId: text('createdByUserId')
    .references(() => user.id, { onDelete: 'set null' }),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
})

export const mealLog = pgTable('meal_log', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: text('userId')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  mealType: mealTypeEnum('mealType').notNull(),
  date: timestamp('date').notNull(),
  notes: text('notes'),
  totalCalories: decimal('totalCalories', { precision: 8, scale: 2 }),
  totalProtein: decimal('totalProtein', { precision: 8, scale: 2 }),
  totalCarbs: decimal('totalCarbs', { precision: 8, scale: 2 }),
  totalFat: decimal('totalFat', { precision: 8, scale: 2 }),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
})

export const mealFood = pgTable('meal_food', {
  id: uuid('id').primaryKey().defaultRandom(),
  mealLogId: uuid('mealLogId')
    .notNull()
    .references(() => mealLog.id, { onDelete: 'cascade' }),
  foodId: uuid('foodId')
    .notNull()
    .references(() => food.id, { onDelete: 'cascade' }),
  quantity: decimal('quantity', { precision: 8, scale: 2 }).notNull(), // multiplier of serving size
  createdAt: timestamp('createdAt').notNull().defaultNow(),
})

export const waterLog = pgTable('water_log', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: text('userId')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  date: timestamp('date').notNull(),
  amount: integer('amount').notNull(), // ml
  createdAt: timestamp('createdAt').notNull().defaultNow(),
})

// --- Community Module --------------------------------------------------------

export const communityPost = pgTable('community_post', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: text('userId')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  type: postTypeEnum('type').notNull().default('text'),
  content: text('content').notNull(),
  imageUrl: text('imageUrl'),
  workoutSessionId: uuid('workoutSessionId')
    .references(() => workoutSession.id, { onDelete: 'set null' }),
  likesCount: integer('likesCount').notNull().default(0),
  commentsCount: integer('commentsCount').notNull().default(0),
  isPublic: boolean('isPublic').notNull().default(true),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
})

export const postLike = pgTable('post_like', {
  id: uuid('id').primaryKey().defaultRandom(),
  postId: uuid('postId')
    .notNull()
    .references(() => communityPost.id, { onDelete: 'cascade' }),
  userId: text('userId')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
})

export const postComment = pgTable('post_comment', {
  id: uuid('id').primaryKey().defaultRandom(),
  postId: uuid('postId')
    .notNull()
    .references(() => communityPost.id, { onDelete: 'cascade' }),
  userId: text('userId')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  content: text('content').notNull(),
  parentCommentId: uuid('parentCommentId'),
  likesCount: integer('likesCount').notNull().default(0),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
})

export const userFollow = pgTable('user_follow', {
  id: uuid('id').primaryKey().defaultRandom(),
  followerId: text('followerId')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  followingId: text('followingId')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
})

export const communityGroup = pgTable('community_group', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  description: text('description'),
  imageUrl: text('imageUrl'),
  coverUrl: text('coverUrl'),
  isPrivate: boolean('isPrivate').notNull().default(false),
  category: text('category').notNull().default('general'),
  city: text('city'),
  state: text('state'),
  whatsappLink: text('whatsappLink'),
  membersCount: integer('membersCount').notNull().default(0),
  createdByUserId: text('createdByUserId')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
})

export const groupMember = pgTable('group_member', {
  id: uuid('id').primaryKey().defaultRandom(),
  groupId: uuid('groupId')
    .notNull()
    .references(() => communityGroup.id, { onDelete: 'cascade' }),
  userId: text('userId')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  role: text('role').notNull().default('member'), // admin, moderator, member
  createdAt: timestamp('createdAt').notNull().defaultNow(),
})

// --- Gamification Module -----------------------------------------------------

export const achievement = pgTable('achievement', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  description: text('description').notNull(),
  icon: text('icon').notNull(),
  category: text('category').notNull(),
  requirement: jsonb('requirement').$type<{
    type: string
    value: number
    metric?: string
  }>().notNull(),
  xpReward: integer('xpReward').notNull().default(100),
  isSecret: boolean('isSecret').notNull().default(false),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
})

export const userAchievement = pgTable('user_achievement', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: text('userId')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  achievementId: uuid('achievementId')
    .notNull()
    .references(() => achievement.id, { onDelete: 'cascade' }),
  unlockedAt: timestamp('unlockedAt').notNull().defaultNow(),
  progress: integer('progress').notNull().default(0),
})

export const challenge = pgTable('challenge', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  description: text('description').notNull(),
  type: text('type').notNull(), // weekly, monthly, special
  startDate: timestamp('startDate').notNull(),
  endDate: timestamp('endDate').notNull(),
  goal: jsonb('goal').$type<{
    type: string
    value: number
    metric?: string
  }>().notNull(),
  xpReward: integer('xpReward').notNull().default(500),
  isActive: boolean('isActive').notNull().default(true),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
})

export const userChallenge = pgTable('user_challenge', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: text('userId')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  challengeId: uuid('challengeId')
    .notNull()
    .references(() => challenge.id, { onDelete: 'cascade' }),
  progress: integer('progress').notNull().default(0),
  completed: boolean('completed').notNull().default(false),
  completedAt: timestamp('completedAt'),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
})

// --- E-commerce Module -------------------------------------------------------

export const productCategory = pgTable('product_category', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  slug: text('slug').notNull().unique(),
  description: text('description'),
  imageUrl: text('imageUrl'),
  parentId: uuid('parentId'),
  order: integer('order').notNull().default(0),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
})

export const product = pgTable('product', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  slug: text('slug').notNull().unique(),
  description: text('description'),
  shortDescription: text('shortDescription'),
  categoryId: uuid('categoryId')
    .notNull()
    .references(() => productCategory.id, { onDelete: 'cascade' }),
  price: decimal('price', { precision: 10, scale: 2 }).notNull(),
  compareAtPrice: decimal('compareAtPrice', { precision: 10, scale: 2 }),
  costPrice: decimal('costPrice', { precision: 10, scale: 2 }),
  sku: text('sku'),
  barcode: text('barcode'),
  stock: integer('stock').notNull().default(0),
  lowStockThreshold: integer('lowStockThreshold').notNull().default(5),
  weight: decimal('weight', { precision: 8, scale: 2 }),
  images: jsonb('images').$type<string[]>(),
  isActive: boolean('isActive').notNull().default(true),
  isFeatured: boolean('isFeatured').notNull().default(false),
  tags: jsonb('tags').$type<string[]>(),
  metadata: jsonb('metadata').$type<Record<string, unknown>>(),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
})

export const productVariant = pgTable('product_variant', {
  id: uuid('id').primaryKey().defaultRandom(),
  productId: uuid('productId')
    .notNull()
    .references(() => product.id, { onDelete: 'cascade' }),
  name: text('name').notNull(),
  sku: text('sku'),
  price: decimal('price', { precision: 10, scale: 2 }),
  stock: integer('stock').notNull().default(0),
  attributes: jsonb('attributes').$type<Record<string, string>>(),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
})

export const cart = pgTable('cart', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: text('userId')
    .notNull()
    .unique()
    .references(() => user.id, { onDelete: 'cascade' }),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
})

export const cartItem = pgTable('cart_item', {
  id: uuid('id').primaryKey().defaultRandom(),
  cartId: uuid('cartId')
    .notNull()
    .references(() => cart.id, { onDelete: 'cascade' }),
  productId: uuid('productId')
    .notNull()
    .references(() => product.id, { onDelete: 'cascade' }),
  variantId: uuid('variantId')
    .references(() => productVariant.id, { onDelete: 'cascade' }),
  quantity: integer('quantity').notNull().default(1),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
})

export const wishlist = pgTable('wishlist', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: text('userId')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  productId: uuid('productId')
    .notNull()
    .references(() => product.id, { onDelete: 'cascade' }),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
})

export const order = pgTable('order', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: text('userId')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  status: orderStatusEnum('status').notNull().default('pending'),
  subtotal: decimal('subtotal', { precision: 10, scale: 2 }).notNull(),
  discount: decimal('discount', { precision: 10, scale: 2 }).notNull().default('0'),
  shipping: decimal('shipping', { precision: 10, scale: 2 }).notNull().default('0'),
  total: decimal('total', { precision: 10, scale: 2 }).notNull(),
  couponCode: text('couponCode'),
  shippingAddress: jsonb('shippingAddress').$type<{
    name: string
    street: string
    number: string
    complement?: string
    neighborhood: string
    city: string
    state: string
    zipCode: string
    phone: string
  }>(),
  paymentMethod: text('paymentMethod'),
  paymentId: text('paymentId'),
  trackingCode: text('trackingCode'),
  notes: text('notes'),
  paidAt: timestamp('paidAt'),
  shippedAt: timestamp('shippedAt'),
  deliveredAt: timestamp('deliveredAt'),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
})

export const orderItem = pgTable('order_item', {
  id: uuid('id').primaryKey().defaultRandom(),
  orderId: uuid('orderId')
    .notNull()
    .references(() => order.id, { onDelete: 'cascade' }),
  productId: uuid('productId')
    .notNull()
    .references(() => product.id, { onDelete: 'cascade' }),
  variantId: uuid('variantId')
    .references(() => productVariant.id, { onDelete: 'set null' }),
  name: text('name').notNull(),
  price: decimal('price', { precision: 10, scale: 2 }).notNull(),
  quantity: integer('quantity').notNull(),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
})

export const coupon = pgTable('coupon', {
  id: uuid('id').primaryKey().defaultRandom(),
  code: text('code').notNull().unique(),
  description: text('description'),
  discountType: text('discountType').notNull(), // percentage, fixed
  discountValue: decimal('discountValue', { precision: 10, scale: 2 }).notNull(),
  minOrderValue: decimal('minOrderValue', { precision: 10, scale: 2 }),
  maxUses: integer('maxUses'),
  usedCount: integer('usedCount').notNull().default(0),
  startDate: timestamp('startDate'),
  endDate: timestamp('endDate'),
  isActive: boolean('isActive').notNull().default(true),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
})

// --- Notifications Module ----------------------------------------------------

export const notification = pgTable('notification', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: text('userId')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  type: text('type').notNull(),
  title: text('title').notNull(),
  message: text('message').notNull(),
  data: jsonb('data').$type<Record<string, unknown>>(),
  read: boolean('read').notNull().default(false),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
})

// --- Support Module ----------------------------------------------------------

export const supportTicket = pgTable('support_ticket', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: text('userId')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  subject: text('subject').notNull(),
  category: text('category').notNull(),
  status: text('status').notNull().default('open'), // open, in_progress, resolved, closed
  priority: text('priority').notNull().default('normal'), // low, normal, high, urgent
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
})

export const supportMessage = pgTable('support_message', {
  id: uuid('id').primaryKey().defaultRandom(),
  ticketId: uuid('ticketId')
    .notNull()
    .references(() => supportTicket.id, { onDelete: 'cascade' }),
  userId: text('userId')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  message: text('message').notNull(),
  isStaff: boolean('isStaff').notNull().default(false),
  attachments: jsonb('attachments').$type<string[]>(),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
})

// --- Integrations Module -----------------------------------------------------

export const integration = pgTable('integration', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  provider: text('provider').notNull(), // yampi, shopify, stripe, mercadopago, etc.
  isActive: boolean('isActive').notNull().default(false),
  credentials: jsonb('credentials').$type<Record<string, string>>(),
  settings: jsonb('settings').$type<Record<string, unknown>>(),
  lastSyncAt: timestamp('lastSyncAt'),
  syncStatus: text('syncStatus'),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
})

export const integrationLog = pgTable('integration_log', {
  id: uuid('id').primaryKey().defaultRandom(),
  integrationId: uuid('integrationId')
    .notNull()
    .references(() => integration.id, { onDelete: 'cascade' }),
  event: text('event').notNull(),
  status: text('status').notNull(), // success, error, warning
  message: text('message'),
  data: jsonb('data').$type<Record<string, unknown>>(),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
})

// --- Relations ---------------------------------------------------------------

export const userRelations = relations(user, ({ one, many }) => ({
  profile: one(userProfile, {
    fields: [user.id],
    references: [userProfile.userId],
  }),
  sessions: many(session),
  accounts: many(account),
  workoutPlans: many(workoutPlan),
  workoutSessions: many(workoutSession),
  mealLogs: many(mealLog),
  waterLogs: many(waterLog),
  posts: many(communityPost),
  achievements: many(userAchievement),
  challenges: many(userChallenge),
  orders: many(order),
  notifications: many(notification),
  cart: one(cart),
}))

export const workoutPlanRelations = relations(workoutPlan, ({ one, many }) => ({
  user: one(user, {
    fields: [workoutPlan.userId],
    references: [user.id],
  }),
  days: many(workoutDay),
}))

export const workoutDayRelations = relations(workoutDay, ({ one, many }) => ({
  workoutPlan: one(workoutPlan, {
    fields: [workoutDay.workoutPlanId],
    references: [workoutPlan.id],
  }),
  exercises: many(workoutExercise),
}))

export const exerciseRelations = relations(exercise, ({ many }) => ({
  workoutExercises: many(workoutExercise),
  sets: many(exerciseSet),
}))

export const communityPostRelations = relations(communityPost, ({ one, many }) => ({
  user: one(user, {
    fields: [communityPost.userId],
    references: [user.id],
  }),
  likes: many(postLike),
  comments: many(postComment),
}))

export const productRelations = relations(product, ({ one, many }) => ({
  category: one(productCategory, {
    fields: [product.categoryId],
    references: [productCategory.id],
  }),
  variants: many(productVariant),
}))

export const orderRelations = relations(order, ({ one, many }) => ({
  user: one(user, {
    fields: [order.userId],
    references: [user.id],
  }),
  items: many(orderItem),
}))

// --- Audit & Settings Module -------------------------------------------------

export const auditLogs = pgTable('audit_logs', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: text('user_id').references(() => user.id, { onDelete: 'set null' }),
  action: text('action').notNull(),
  target: text('target'),
  details: jsonb('details').$type<Record<string, unknown>>(),
  ip: text('ip'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
})

export const supportTickets = pgTable('support_tickets', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: text('user_id').references(() => user.id, { onDelete: 'set null' }),
  name: text('name').notNull(),
  email: text('email').notNull(),
  category: text('category').notNull(),
  description: text('description').notNull(),
  protocol: text('protocol').notNull().unique(),
  status: text('status').notNull().default('open'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
})

export const siteSettings = pgTable('site_settings', {
  key: text('key').primaryKey(),
  value: text('value').notNull(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
  updatedBy: text('updated_by').references(() => user.id),
})
