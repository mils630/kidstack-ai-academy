import { createClient } from '@supabase/supabase-js'

// ✅ Load environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

// ✅ Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// ✅ Database Types

export interface Profile {
  id: string
  email: string
  phone?: string
  full_name?: string
  role: 'student' | 'educator' | 'admin'
  grade_level?: number
  date_of_birth?: string
  xp_points: number
  current_level: number
  streak_days: number
  last_activity: string
  subscription_status: 'free_trial' | 'active' | 'expired' | 'cancelled'
  subscription_plan?: string
  trial_ends_at?: string
  created_at: string
  updated_at: string
}

export interface ProgrammingLanguage {
  id: string
  name: string
  description: string
  icon_url?: string
  color: string
  difficulty_level: 'beginner' | 'intermediate' | 'advanced'
  is_active: boolean
  created_at: string
}

export interface Course {
  id: string
  language_id: string
  title: string
  description: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  order_index: number
  content: any
  xp_reward: number
  estimated_duration?: number
  prerequisites?: string[]
  is_published: boolean
  created_by?: string
  created_at: string
  updated_at: string
  programming_languages?: ProgrammingLanguage
}

export interface Flashcard {
  id: string
  language_id: string
  course_id?: string
  question: string
  answer: string
  code_snippet?: string
  explanation?: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  tags?: string[]
  is_active: boolean
  created_by?: string
  created_at: string
}

export interface Quiz {
  id: string
  language_id: string
  course_id?: string
  title: string
  description?: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  time_limit?: number
  passing_score: number
  xp_reward: number
  is_published: boolean
  created_by?: string
  created_at: string
  programming_languages?: ProgrammingLanguage
}

export interface QuizQuestion {
  id: string
  quiz_id: string
  question: string
  question_type: 'multiple_choice' | 'code_completion' | 'true_false'
  options?: any
  correct_answer: string
  explanation?: string
  points: number
  order_index: number
  created_at: string
}

export interface VirtualPet {
  id: string
  user_id: string
  name: string
  pet_type: string
  level: number
  happiness: number
  hunger: number
  energy: number
  xp: number
  last_fed: string
  last_played: string
  evolution_stage: number
  accessories?: any
  created_at: string
  updated_at: string
}

export interface UserProgress {
  id: string
  user_id: string
  course_id: string
  completion_percentage: number
  last_accessed: string
  completed_at?: string
  time_spent: number
}

export interface QuizAttempt {
  id: string
  user_id: string
  quiz_id: string
  score: number
  total_questions: number
  time_taken: number
  answers: any
  passed: boolean
  xp_earned: number
  attempted_at: string
}

export interface Achievement {
  id: string
  name: string
  description: string
  icon_url?: string
  requirement_type: string
  requirement_value: number
  xp_reward: number
  badge_color: string
  is_active: boolean
  created_at: string
}

export interface UserAchievement {
  id: string
  user_id: string
  achievement_id: string
  earned_at: string
  achievements?: Achievement
}
