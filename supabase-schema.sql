-- Kid.Stack AI Database Schema
-- Run this in your Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table (extends Supabase auth.users)
CREATE TABLE public.profiles (
    id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
    email TEXT,
    phone TEXT,
    full_name TEXT,
    role TEXT CHECK (role IN ('student', 'educator', 'admin')) DEFAULT 'student',
    grade_level INTEGER,
    date_of_birth DATE,
    xp_points INTEGER DEFAULT 0,
    current_level INTEGER DEFAULT 1,
    streak_days INTEGER DEFAULT 0,
    last_activity DATE DEFAULT CURRENT_DATE,
    subscription_status TEXT CHECK (subscription_status IN ('free_trial', 'active', 'expired', 'cancelled')) DEFAULT 'free_trial',
    subscription_plan TEXT,
    trial_ends_at TIMESTAMP WITH TIME ZONE DEFAULT (NOW() + INTERVAL '14 days'),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Programming Languages
CREATE TABLE public.programming_languages (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    icon_url TEXT,
    color TEXT,
    difficulty_level TEXT CHECK (difficulty_level IN ('beginner', 'intermediate', 'advanced')),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Courses/Lessons
CREATE TABLE public.courses (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    language_id UUID REFERENCES programming_languages(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    difficulty TEXT CHECK (difficulty IN ('beginner', 'intermediate', 'advanced')),
    order_index INTEGER,
    content JSONB,
    xp_reward INTEGER DEFAULT 10,
    estimated_duration INTEGER, -- in minutes
    prerequisites TEXT[], -- array of course ids
    is_published BOOLEAN DEFAULT false,
    created_by UUID REFERENCES profiles(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Flashcards
CREATE TABLE public.flashcards (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    language_id UUID REFERENCES programming_languages(id) ON DELETE CASCADE,
    course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    code_snippet TEXT,
    explanation TEXT,
    difficulty TEXT CHECK (difficulty IN ('beginner', 'intermediate', 'advanced')),
    tags TEXT[],
    is_active BOOLEAN DEFAULT true,
    created_by UUID REFERENCES profiles(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Quizzes
CREATE TABLE public.quizzes (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    language_id UUID REFERENCES programming_languages(id) ON DELETE CASCADE,
    course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    difficulty TEXT CHECK (difficulty IN ('beginner', 'intermediate', 'advanced')),
    time_limit INTEGER, -- in minutes
    passing_score INTEGER DEFAULT 70,
    xp_reward INTEGER DEFAULT 25,
    is_published BOOLEAN DEFAULT false,
    created_by UUID REFERENCES profiles(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Quiz Questions
CREATE TABLE public.quiz_questions (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    quiz_id UUID REFERENCES quizzes(id) ON DELETE CASCADE,
    question TEXT NOT NULL,
    question_type TEXT CHECK (question_type IN ('multiple_choice', 'code_completion', 'true_false')),
    options JSONB, -- for multiple choice questions
    correct_answer TEXT NOT NULL,
    explanation TEXT,
    points INTEGER DEFAULT 1,
    order_index INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Virtual Pets
CREATE TABLE public.virtual_pets (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE UNIQUE,
    name TEXT NOT NULL,
    pet_type TEXT DEFAULT 'dragon',
    level INTEGER DEFAULT 1,
    happiness INTEGER DEFAULT 50,
    hunger INTEGER DEFAULT 50,
    energy INTEGER DEFAULT 100,
    xp INTEGER DEFAULT 0,
    last_fed TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    last_played TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    evolution_stage INTEGER DEFAULT 1,
    accessories JSONB DEFAULT '[]',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User Progress
CREATE TABLE public.user_progress (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
    completion_percentage DECIMAL(5,2) DEFAULT 0,
    last_accessed TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    completed_at TIMESTAMP WITH TIME ZONE,
    time_spent INTEGER DEFAULT 0, -- in minutes
    UNIQUE(user_id, course_id)
);

-- Quiz Attempts
CREATE TABLE public.quiz_attempts (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    quiz_id UUID REFERENCES quizzes(id) ON DELETE CASCADE,
    score INTEGER,
    total_questions INTEGER,
    time_taken INTEGER, -- in seconds
    answers JSONB,
    passed BOOLEAN,
    xp_earned INTEGER DEFAULT 0,
    attempted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Flashcard Progress
CREATE TABLE public.flashcard_progress (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    flashcard_id UUID REFERENCES flashcards(id) ON DELETE CASCADE,
    correct_count INTEGER DEFAULT 0,
    incorrect_count INTEGER DEFAULT 0,
    last_reviewed TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    mastery_level INTEGER DEFAULT 0,
    UNIQUE(user_id, flashcard_id)
);

-- Study Plans
CREATE TABLE public.study_plans (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    languages UUID[] NOT NULL, -- array of language IDs
    difficulty TEXT CHECK (difficulty IN ('beginner', 'intermediate', 'advanced')),
    duration_weeks INTEGER DEFAULT 12,
    hours_per_week INTEGER DEFAULT 5,
    schedule JSONB, -- weekly schedule
    goals TEXT[],
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Achievements/Badges
CREATE TABLE public.achievements (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    icon_url TEXT,
    requirement_type TEXT, -- 'xp', 'streak', 'quiz_score', 'course_complete'
    requirement_value INTEGER,
    xp_reward INTEGER DEFAULT 50,
    badge_color TEXT DEFAULT '#FFD700',
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User Achievements
CREATE TABLE public.user_achievements (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    achievement_id UUID REFERENCES achievements(id) ON DELETE CASCADE,
    earned_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, achievement_id)
);

-- Assignments
CREATE TABLE public.assignments (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    instructions JSONB,
    starter_code TEXT,
    solution_code TEXT,
    test_cases JSONB,
    due_date TIMESTAMP WITH TIME ZONE,
    xp_reward INTEGER DEFAULT 30,
    difficulty TEXT CHECK (difficulty IN ('beginner', 'intermediate', 'advanced')),
    is_published BOOLEAN DEFAULT false,
    created_by UUID REFERENCES profiles(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Assignment Submissions
CREATE TABLE public.assignment_submissions (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    assignment_id UUID REFERENCES assignments(id) ON DELETE CASCADE,
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    code_solution TEXT NOT NULL,
    status TEXT CHECK (status IN ('submitted', 'graded', 'needs_revision')) DEFAULT 'submitted',
    score INTEGER,
    feedback TEXT,
    submitted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    graded_at TIMESTAMP WITH TIME ZONE,
    graded_by UUID REFERENCES profiles(id)
);

-- Subscriptions
CREATE TABLE public.subscriptions (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    plan_type TEXT CHECK (plan_type IN ('monthly', 'quarterly', 'biannual', 'annual')),
    amount DECIMAL(10,2),
    currency TEXT DEFAULT 'KES',
    status TEXT CHECK (status IN ('active', 'cancelled', 'expired', 'pending')) DEFAULT 'pending',
    started_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    ends_at TIMESTAMP WITH TIME ZONE,
    payment_method TEXT,
    transaction_id TEXT,
    auto_renewal BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Row Level Security (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.virtual_pets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quiz_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.flashcard_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.study_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.assignment_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;

-- RLS Policies
-- Users can only see their own profile
CREATE POLICY "Users can view own profile" ON profiles
    FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON profiles
    FOR UPDATE USING (auth.uid() = id);

-- Users can only see their own virtual pet
CREATE POLICY "Users can view own pet" ON virtual_pets
    FOR ALL USING (auth.uid() = user_id);

-- Users can only see their own progress
CREATE POLICY "Users can view own progress" ON user_progress
    FOR ALL USING (auth.uid() = user_id);

-- Users can only see their own quiz attempts
CREATE POLICY "Users can view own quiz attempts" ON quiz_attempts
    FOR ALL USING (auth.uid() = user_id);

-- Users can only see their own flashcard progress
CREATE POLICY "Users can view own flashcard progress" ON flashcard_progress
    FOR ALL USING (auth.uid() = user_id);

-- Public read access for published content
CREATE POLICY "Anyone can view published courses" ON courses
    FOR SELECT USING (is_published = true);

CREATE POLICY "Anyone can view active flashcards" ON flashcards
    FOR SELECT USING (is_active = true);

CREATE POLICY "Anyone can view published quizzes" ON quizzes
    FOR SELECT USING (is_published = true);

CREATE POLICY "Anyone can view quiz questions" ON quiz_questions
    FOR SELECT USING (true);

CREATE POLICY "Anyone can view programming languages" ON programming_languages
    FOR SELECT USING (is_active = true);

CREATE POLICY "Anyone can view achievements" ON achievements
    FOR SELECT USING (is_active = true);

-- Educators can manage content
CREATE POLICY "Educators can manage courses" ON courses
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM profiles 
            WHERE profiles.id = auth.uid() 
            AND profiles.role IN ('educator', 'admin')
        )
    );

-- Functions
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
    INSERT INTO public.profiles (id, email, full_name)
    VALUES (new.id, new.email, new.raw_user_meta_data->>'full_name');
    
    -- Create default virtual pet
    INSERT INTO public.virtual_pets (user_id, name, pet_type)
    VALUES (new.id, 'Buddy', 'dragon');
    
    RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for new user creation
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Function to update user level based on XP
CREATE OR REPLACE FUNCTION public.update_user_level()
RETURNS trigger AS $$
BEGIN
    -- Level up every 100 XP points
    NEW.current_level = GREATEST(1, (NEW.xp_points / 100) + 1);
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_level_trigger
    BEFORE UPDATE ON profiles
    FOR EACH ROW EXECUTE PROCEDURE public.update_user_level();