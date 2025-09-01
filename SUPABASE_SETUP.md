# Kid.Stack AI - Supabase Setup Guide

## 1. Database Setup

### Step 1: Create Tables
1. Go to your Supabase Dashboard → SQL Editor
2. Copy and paste the content from `supabase-schema.sql`
3. Run the SQL to create all tables and functions

### Step 2: Insert Sample Data
1. In SQL Editor, copy and paste content from `supabase-sample-data.sql`
2. Run the SQL to populate with initial data

## 2. Authentication Setup

### Enable Authentication Providers
1. Go to Authentication → Providers
2. Enable Email provider
3. For phone auth: Enable Phone provider and configure SMS service

### Email Templates (Optional)
Customize the email templates in Authentication → Email Templates

## 3. Storage Setup (for images/files)

### Create Storage Buckets
```sql
-- Run in SQL Editor
INSERT INTO storage.buckets (id, name, public) VALUES 
  ('avatars', 'avatars', true),
  ('course-images', 'course-images', true),
  ('pet-accessories', 'pet-accessories', true);
```

### Storage Policies
```sql
-- Allow users to upload their own avatars
CREATE POLICY "Users can upload avatars" ON storage.objects
FOR INSERT WITH CHECK (bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Allow public read access to course images
CREATE POLICY "Anyone can view course images" ON storage.objects
FOR SELECT USING (bucket_id = 'course-images');
```

## 4. Environment Variables

Add these to your project's environment variables:

```env
VITE_SUPABASE_URL=your-supabase-project-url
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
```

## 5. Row Level Security (RLS) Policies

The schema includes basic RLS policies. You may need to adjust them based on your specific requirements:

### Key Policies Included:
- Users can only access their own data (progress, pets, etc.)
- Public read access for published educational content
- Educators can manage educational content
- Admins have elevated permissions

## 6. Real-time Subscriptions

Enable real-time for tables where you want live updates:

```sql
-- Enable real-time for user progress updates
ALTER PUBLICATION supabase_realtime ADD TABLE user_progress;
ALTER PUBLICATION supabase_realtime ADD TABLE virtual_pets;
ALTER PUBLICATION supabase_realtime ADD TABLE quiz_attempts;
```

## 7. Edge Functions (Optional)

For advanced features like:
- Email notifications
- Payment processing with M-Pesa
- AI-powered content generation
- Automated grading

Create edge functions in the Functions tab of your Supabase dashboard.

## 8. Database Indexes (Performance Optimization)

```sql
-- Add indexes for better performance
CREATE INDEX idx_user_progress_user_id ON user_progress(user_id);
CREATE INDEX idx_quiz_attempts_user_id ON quiz_attempts(user_id);
CREATE INDEX idx_flashcard_progress_user_id ON flashcard_progress(user_id);
CREATE INDEX idx_courses_language_id ON courses(language_id);
CREATE INDEX idx_quiz_questions_quiz_id ON quiz_questions(quiz_id);
```

## 9. Sample Test Users

After setup, you can create test accounts:

### Student Account:
- Email: student@kidstack.ai
- Role: student

### Educator Account:
- Email: educator@kidstack.ai  
- Role: educator

## 10. Integration with Frontend

The frontend will need these Supabase utilities (already prepared in the codebase):

- Authentication helpers
- Database query functions
- Real-time subscriptions
- File upload utilities

## 11. Backup and Migration

Set up regular backups in Supabase Dashboard → Settings → Database

## Troubleshooting

### Common Issues:
1. **RLS blocking queries**: Check if proper policies are in place
2. **Authentication errors**: Verify environment variables
3. **Permission denied**: Ensure user has correct role assigned
4. **Slow queries**: Add appropriate indexes

### Useful SQL Queries for Testing:

```sql
-- Check user roles
SELECT email, role, created_at FROM profiles;

-- View course progress
SELECT p.email, c.title, up.completion_percentage 
FROM profiles p
JOIN user_progress up ON p.id = up.user_id
JOIN courses c ON up.course_id = c.id;

-- Check virtual pet status
SELECT p.email, vp.name, vp.level, vp.happiness 
FROM profiles p
JOIN virtual_pets vp ON p.id = vp.user_id;
```

## Next Steps

1. Run the schema and sample data scripts
2. Test authentication flow
3. Verify RLS policies work correctly
4. Set up storage buckets if needed
5. Configure real-time subscriptions
6. Test the integration with your frontend application

For support, refer to [Supabase Documentation](https://supabase.com/docs) or contact the development team.