import { supabase, type Profile, type Course, type Flashcard, type Quiz, type QuizQuestion, type VirtualPet, type UserProgress, type QuizAttempt, type Achievement, type ProgrammingLanguage } from './supabase'

// Authentication
export const signUp = async (email: string, password: string, userData: any) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: userData
    }
  })
  return { data, error }
}

export const signIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  })
  return { data, error }
}

export const signOut = async () => {
  const { error } = await supabase.auth.signOut()
  return { error }
}

export const getCurrentUser = async () => {
  const { data: { user } } = await supabase.auth.getUser()
  return user
}

// Profile Management
export const getProfile = async (userId: string): Promise<Profile | null> => {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single()
  
  if (error) {
    console.error('Error fetching profile:', error)
    return null
  }
  return data
}

export const updateProfile = async (userId: string, updates: Partial<Profile>) => {
  const { data, error } = await supabase
    .from('profiles')
    .update(updates)
    .eq('id', userId)
    .select()
    .single()
  
  return { data, error }
}

// Programming Languages
export const getProgrammingLanguages = async (): Promise<ProgrammingLanguage[]> => {
  const { data, error } = await supabase
    .from('programming_languages')
    .select('*')
    .eq('is_active', true)
    .order('difficulty_level', { ascending: true })
  
  if (error) {
    console.error('Error fetching languages:', error)
    return []
  }
  return data || []
}

// Courses
export const getCourses = async (languageId?: string): Promise<Course[]> => {
  let query = supabase
    .from('courses')
    .select(`
      *,
      programming_languages (*)
    `)
    .eq('is_published', true)
    .order('order_index', { ascending: true })
  
  if (languageId) {
    query = query.eq('language_id', languageId)
  }
  
  const { data, error } = await query
  
  if (error) {
    console.error('Error fetching courses:', error)
    return []
  }
  return data || []
}

export const getCourse = async (courseId: string): Promise<Course | null> => {
  const { data, error } = await supabase
    .from('courses')
    .select(`
      *,
      programming_languages (*)
    `)
    .eq('id', courseId)
    .single()
  
  if (error) {
    console.error('Error fetching course:', error)
    return null
  }
  return data
}

// Flashcards
export const getFlashcards = async (languageId?: string, courseId?: string): Promise<Flashcard[]> => {
  let query = supabase
    .from('flashcards')
    .select('*')
    .eq('is_active', true)
  
  if (languageId) {
    query = query.eq('language_id', languageId)
  }
  
  if (courseId) {
    query = query.eq('course_id', courseId)
  }
  
  const { data, error } = await query
  
  if (error) {
    console.error('Error fetching flashcards:', error)
    return []
  }
  return data || []
}

export const updateFlashcardProgress = async (userId: string, flashcardId: string, correct: boolean) => {
  // First get current progress
  const { data: currentProgress } = await supabase
    .from('flashcard_progress')
    .select('*')
    .eq('user_id', userId)
    .eq('flashcard_id', flashcardId)
    .single()
  
  const correctCount = (currentProgress?.correct_count || 0) + (correct ? 1 : 0)
  const incorrectCount = (currentProgress?.incorrect_count || 0) + (!correct ? 1 : 0)
  const masteryLevel = correct 
    ? Math.min((currentProgress?.mastery_level || 0) + 1, 5)
    : Math.max((currentProgress?.mastery_level || 0) - 1, 0)
  
  const { data, error } = await supabase
    .from('flashcard_progress')
    .upsert({
      user_id: userId,
      flashcard_id: flashcardId,
      correct_count: correctCount,
      incorrect_count: incorrectCount,
      last_reviewed: new Date().toISOString(),
      mastery_level: masteryLevel
    })
  
  return { data, error }
}

// Quizzes
export const getQuizzes = async (languageId?: string): Promise<Quiz[]> => {
  let query = supabase
    .from('quizzes')
    .select(`
      *,
      programming_languages (*)
    `)
    .eq('is_published', true)
  
  if (languageId) {
    query = query.eq('language_id', languageId)
  }
  
  const { data, error } = await query
  
  if (error) {
    console.error('Error fetching quizzes:', error)
    return []
  }
  return data || []
}

export const getQuizWithQuestions = async (quizId: string) => {
  const { data: quiz, error: quizError } = await supabase
    .from('quizzes')
    .select(`
      *,
      programming_languages (*)
    `)
    .eq('id', quizId)
    .single()
  
  if (quizError) {
    console.error('Error fetching quiz:', quizError)
    return { quiz: null, questions: [] }
  }
  
  const { data: questions, error: questionsError } = await supabase
    .from('quiz_questions')
    .select('*')
    .eq('quiz_id', quizId)
    .order('order_index', { ascending: true })
  
  if (questionsError) {
    console.error('Error fetching questions:', questionsError)
    return { quiz, questions: [] }
  }
  
  return { quiz, questions: questions || [] }
}

export const submitQuizAttempt = async (
  userId: string,
  quizId: string,
  answers: any,
  score: number,
  totalQuestions: number,
  timeTaken: number,
  xpEarned: number
) => {
  const passed = score >= 70 // Assuming 70% is passing
  
  const { data, error } = await supabase
    .from('quiz_attempts')
    .insert({
      user_id: userId,
      quiz_id: quizId,
      answers,
      score,
      total_questions: totalQuestions,
      time_taken: timeTaken,
      passed,
      xp_earned: xpEarned
    })
    .select()
    .single()
  
  // Update user XP
  if (!error && xpEarned > 0) {
    const { data: profile } = await supabase
      .from('profiles')
      .select('xp_points')
      .eq('id', userId)
      .single()
    
    if (profile) {
      await supabase
        .from('profiles')
        .update({
          xp_points: profile.xp_points + xpEarned
        })
        .eq('id', userId)
    }
  }
  
  return { data, error }
}

// Virtual Pet
export const getVirtualPet = async (userId: string): Promise<VirtualPet | null> => {
  const { data, error } = await supabase
    .from('virtual_pets')
    .select('*')
    .eq('user_id', userId)
    .single()
  
  if (error) {
    console.error('Error fetching virtual pet:', error)
    return null
  }
  return data
}

export const updateVirtualPet = async (userId: string, updates: Partial<VirtualPet>) => {
  const { data, error } = await supabase
    .from('virtual_pets')
    .update({
      ...updates,
      updated_at: new Date().toISOString()
    })
    .eq('user_id', userId)
    .select()
    .single()
  
  return { data, error }
}

export const feedPet = async (userId: string) => {
  // First get current pet stats
  const { data: currentPet } = await supabase
    .from('virtual_pets')
    .select('hunger, happiness')
    .eq('user_id', userId)
    .single()
  
  if (!currentPet) return { data: null, error: 'Pet not found' }
  
  const { data, error } = await supabase
    .from('virtual_pets')
    .update({
      hunger: Math.min(currentPet.hunger + 20, 100),
      happiness: Math.min(currentPet.happiness + 10, 100),
      last_fed: new Date().toISOString(),
      updated_at: new Date().toISOString()
    })
    .eq('user_id', userId)
    .select()
    .single()
  
  return { data, error }
}

export const playWithPet = async (userId: string) => {
  // First get current pet stats
  const { data: currentPet } = await supabase
    .from('virtual_pets')
    .select('happiness, energy')
    .eq('user_id', userId)
    .single()
  
  if (!currentPet) return { data: null, error: 'Pet not found' }
  
  const { data, error } = await supabase
    .from('virtual_pets')
    .update({
      happiness: Math.min(currentPet.happiness + 15, 100),
      energy: Math.max(currentPet.energy - 10, 0),
      last_played: new Date().toISOString(),
      updated_at: new Date().toISOString()
    })
    .eq('user_id', userId)
    .select()
    .single()
  
  return { data, error }
}

// User Progress
export const getUserProgress = async (userId: string, courseId?: string): Promise<UserProgress[]> => {
  let query = supabase
    .from('user_progress')
    .select('*')
    .eq('user_id', userId)
  
  if (courseId) {
    query = query.eq('course_id', courseId)
  }
  
  const { data, error } = await query
  
  if (error) {
    console.error('Error fetching user progress:', error)
    return []
  }
  return data || []
}

export const updateUserProgress = async (
  userId: string,
  courseId: string,
  completionPercentage: number,
  timeSpent: number
) => {
  const { data, error } = await supabase
    .from('user_progress')
    .upsert({
      user_id: userId,
      course_id: courseId,
      completion_percentage: completionPercentage,
      time_spent: timeSpent,
      last_accessed: new Date().toISOString(),
      completed_at: completionPercentage >= 100 ? new Date().toISOString() : null
    })
    .select()
    .single()
  
  return { data, error }
}

// Achievements
export const getAchievements = async (): Promise<Achievement[]> => {
  const { data, error } = await supabase
    .from('achievements')
    .select('*')
    .eq('is_active', true)
    .order('requirement_value', { ascending: true })
  
  if (error) {
    console.error('Error fetching achievements:', error)
    return []
  }
  return data || []
}

export const getUserAchievements = async (userId: string) => {
  const { data, error } = await supabase
    .from('user_achievements')
    .select(`
      *,
      achievements (*)
    `)
    .eq('user_id', userId)
    .order('earned_at', { ascending: false })
  
  if (error) {
    console.error('Error fetching user achievements:', error)
    return []
  }
  return data || []
}

export const checkAndAwardAchievements = async (userId: string) => {
  // This would implement logic to check if user has earned any new achievements
  // based on their current stats (XP, streak, quiz scores, etc.)
  
  const profile = await getProfile(userId)
  if (!profile) return
  
  const achievements = await getAchievements()
  const userAchievements = await getUserAchievements(userId)
  const earnedAchievementIds = userAchievements.map(ua => ua.achievement_id)
  
  for (const achievement of achievements) {
    if (earnedAchievementIds.includes(achievement.id)) continue
    
    let earned = false
    
    switch (achievement.requirement_type) {
      case 'xp':
        earned = profile.xp_points >= achievement.requirement_value
        break
      case 'streak':
        earned = profile.streak_days >= achievement.requirement_value
        break
      // Add more achievement types as needed
    }
    
    if (earned) {
      await supabase
        .from('user_achievements')
        .insert({
          user_id: userId,
          achievement_id: achievement.id
        })
      
      // Award XP for achievement
      const { data: profile } = await supabase
        .from('profiles')
        .select('xp_points')
        .eq('id', userId)
        .single()
      
      if (profile) {
        await supabase
          .from('profiles')
          .update({
            xp_points: profile.xp_points + achievement.xp_reward
          })
          .eq('id', userId)
      }
    }
  }
}