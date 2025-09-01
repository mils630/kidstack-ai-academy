-- Kid.Stack AI Sample Data
-- Run this after the schema to populate with initial data

-- Insert Programming Languages
INSERT INTO programming_languages (id, name, description, icon_url, color, difficulty_level) VALUES
    ('550e8400-e29b-41d4-a716-446655440001', 'Python', 'Perfect first language! Easy to read and write, great for beginners', '/icons/python.svg', '#3776ab', 'beginner'),
    ('550e8400-e29b-41d4-a716-446655440002', 'JavaScript', 'The language of the web! Create interactive websites and apps', '/icons/javascript.svg', '#f7df1e', 'beginner'),
    ('550e8400-e29b-41d4-a716-446655440003', 'HTML', 'Build the structure of web pages with this markup language', '/icons/html.svg', '#e34f26', 'beginner'),
    ('550e8400-e29b-41d4-a716-446655440004', 'CSS', 'Make your websites beautiful with colors, layouts, and animations', '/icons/css.svg', '#1572b6', 'beginner'),
    ('550e8400-e29b-41d4-a716-446655440005', 'SQL', 'Talk to databases and manage data like a pro', '/icons/sql.svg', '#336791', 'intermediate'),
    ('550e8400-e29b-41d4-a716-446655440006', 'AI Basics', 'Learn how artificial intelligence works and create smart programs', '/icons/ai.svg', '#ff6b6b', 'intermediate');

-- Insert Sample Courses
INSERT INTO courses (id, language_id, title, description, difficulty, order_index, content, xp_reward) VALUES
    ('650e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440001', 'Python Basics: Your First Steps', 'Learn variables, print statements, and basic input/output in Python', 'beginner', 1, '{"lessons": ["What is Python?", "Variables and Data Types", "Input and Output", "Your First Program"]}', 15),
    ('650e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440001', 'Python Loops and Conditions', 'Master if statements, for loops, and while loops', 'beginner', 2, '{"lessons": ["If Statements", "For Loops", "While Loops", "Nested Conditions"]}', 20),
    ('650e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440002', 'JavaScript Fundamentals', 'Variables, functions, and basic DOM manipulation', 'beginner', 1, '{"lessons": ["Variables in JS", "Functions", "DOM Basics", "Events"]}', 15),
    ('650e8400-e29b-41d4-a716-446655440004', '550e8400-e29b-41d4-a716-446655440003', 'HTML Structure', 'Learn to create web page structure with HTML tags', 'beginner', 1, '{"lessons": ["HTML Tags", "Page Structure", "Links and Images", "Forms"]}', 10),
    ('650e8400-e29b-41d4-a716-446655440005', '550e8400-e29b-41d4-a716-446655440004', 'CSS Styling', 'Make your websites colorful and responsive', 'beginner', 1, '{"lessons": ["Colors and Fonts", "Layout Basics", "Flexbox", "Animations"]}', 15);

-- Insert Sample Flashcards
INSERT INTO flashcards (language_id, course_id, question, answer, code_snippet, explanation, difficulty) VALUES
    ('550e8400-e29b-41d4-a716-446655440001', '650e8400-e29b-41d4-a716-446655440001', 'How do you create a variable in Python?', 'Use assignment: variable_name = value', 'name = "Alice"\nage = 10', 'Variables store data that you can use later in your program', 'beginner'),
    ('550e8400-e29b-41d4-a716-446655440001', '650e8400-e29b-41d4-a716-446655440001', 'What function displays text in Python?', 'print()', 'print("Hello World!")', 'The print() function shows text on the screen', 'beginner'),
    ('550e8400-e29b-41d4-a716-446655440001', '650e8400-e29b-41d4-a716-446655440002', 'How do you create a for loop in Python?', 'for variable in sequence:', 'for i in range(5):\n    print(i)', 'For loops repeat code for each item in a sequence', 'beginner'),
    ('550e8400-e29b-41d4-a716-446655440002', '650e8400-e29b-41d4-a716-446655440003', 'How do you create a variable in JavaScript?', 'Use let, const, or var', 'let name = "Bob";\nconst age = 12;', 'Variables in JavaScript can use let (changeable) or const (unchangeable)', 'beginner'),
    ('550e8400-e29b-41d4-a716-446655440003', '650e8400-e29b-41d4-a716-446655440004', 'What tag creates a heading in HTML?', '<h1> through <h6>', '<h1>Big Title</h1>\n<h2>Smaller Title</h2>', 'HTML headings go from h1 (biggest) to h6 (smallest)', 'beginner'),
    ('550e8400-e29b-41d4-a716-446655440004', '650e8400-e29b-41d4-a716-446655440005', 'How do you change text color in CSS?', 'color: colorname;', 'h1 {\n  color: blue;\n}', 'The color property changes the text color of elements', 'beginner');

-- Insert Sample Quizzes
INSERT INTO quizzes (id, language_id, course_id, title, description, difficulty, time_limit, xp_reward) VALUES
    ('750e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440001', '650e8400-e29b-41d4-a716-446655440001', 'Python Basics Quiz', 'Test your knowledge of Python fundamentals', 'beginner', 10, 25),
    ('750e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440002', '650e8400-e29b-41d4-a716-446655440003', 'JavaScript Basics Quiz', 'Check your understanding of JavaScript basics', 'beginner', 8, 20),
    ('750e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440003', '650e8400-e29b-41d4-a716-446655440004', 'HTML Structure Quiz', 'Test your HTML knowledge', 'beginner', 5, 15);

-- Insert Quiz Questions
INSERT INTO quiz_questions (quiz_id, question, question_type, options, correct_answer, explanation, points, order_index) VALUES
    ('750e8400-e29b-41d4-a716-446655440001', 'What does print("Hello") do in Python?', 'multiple_choice', '{"a": "Creates a variable", "b": "Displays Hello on screen", "c": "Saves a file", "d": "Nothing"}', 'b', 'print() displays text on the screen', 1, 1),
    ('750e8400-e29b-41d4-a716-446655440001', 'Which is correct for creating a variable?', 'multiple_choice', '{"a": "name = Alice", "b": "name == Alice", "c": "name = \"Alice\"", "d": "name := Alice"}', 'c', 'Strings must be in quotes in Python', 1, 2),
    ('750e8400-e29b-41d4-a716-446655440001', 'Python is case-sensitive', 'true_false', '{"true": "True", "false": "False"}', 'true', 'Python treats Name and name as different variables', 1, 3),
    ('750e8400-e29b-41d4-a716-446655440002', 'How do you create a function in JavaScript?', 'multiple_choice', '{"a": "function myFunc() {}", "b": "def myFunc():", "c": "func myFunc() {}", "d": "create myFunc() {}"}', 'a', 'JavaScript functions use the function keyword', 1, 1),
    ('750e8400-e29b-41d4-a716-446655440003', 'What does HTML stand for?', 'multiple_choice', '{"a": "High Tech Markup Language", "b": "HyperText Markup Language", "c": "Home Tool Markup Language", "d": "Hard Text Making Language"}', 'b', 'HTML stands for HyperText Markup Language', 1, 1);

-- Insert Achievements/Badges
INSERT INTO achievements (name, description, requirement_type, requirement_value, xp_reward, badge_color) VALUES
    ('First Steps', 'Complete your first lesson!', 'course_complete', 1, 50, '#4CAF50'),
    ('Quiz Master', 'Pass your first quiz with 80% or higher', 'quiz_score', 80, 75, '#2196F3'),
    ('Code Warrior', 'Earn 100 XP points', 'xp', 100, 100, '#FF9800'),
    ('Streak Starter', 'Study for 3 days in a row', 'streak', 3, 60, '#9C27B0'),
    ('Python Pioneer', 'Complete the Python Basics course', 'course_complete', 1, 150, '#3776ab'),
    ('Web Wizard', 'Complete both HTML and CSS basics', 'course_complete', 2, 200, '#e34f26'),
    ('Dedication Champion', 'Study for 7 days straight', 'streak', 7, 250, '#FF5722'),
    ('Knowledge Seeker', 'Earn 500 XP points', 'xp', 500, 300, '#795548');

-- Insert Sample Assignments
INSERT INTO assignments (course_id, title, description, instructions, starter_code, xp_reward, difficulty) VALUES
    ('650e8400-e29b-41d4-a716-446655440001', 'Create a Greeting Program', 'Write a Python program that asks for a name and greets the person', '{"steps": ["Ask user for their name", "Store the name in a variable", "Print a greeting message"]}', '# Your code here\n# Ask for name\n# Print greeting', 30, 'beginner'),
    ('650e8400-e29b-41d4-a716-446655440002', 'Number Guessing Game', 'Create a simple number guessing game using loops', '{"steps": ["Create a target number", "Use a loop to get guesses", "Give hints (higher/lower)", "Congratulate when correct"]}', '# Create your guessing game\nimport random\ntarget = random.randint(1, 10)\n# Your code here', 50, 'beginner'),
    ('650e8400-e29b-41d4-a716-446655440004', 'Personal Web Page', 'Create a simple HTML page about yourself', '{"steps": ["Add a title", "Include a heading with your name", "Add paragraphs about your hobbies", "Include an image (use placeholder)"]}', '<!DOCTYPE html>\n<html>\n<head>\n  <title>About Me</title>\n</head>\n<body>\n  <!-- Your content here -->\n</body>\n</html>', 25, 'beginner');

-- Update courses to be published
UPDATE courses SET is_published = true;

-- Update quizzes to be published  
UPDATE quizzes SET is_published = true;

-- Function to create sample educator account (call after creating user in auth)
CREATE OR REPLACE FUNCTION create_sample_educator(user_email text, user_name text)
RETURNS void AS $$
DECLARE
    user_id uuid;
BEGIN
    -- This would be called after creating the user in Supabase Auth
    -- For now, we'll just show the structure
    INSERT INTO profiles (email, full_name, role) 
    VALUES (user_email, user_name, 'educator');
END;
$$ LANGUAGE plpgsql;

-- Sample study plan template
INSERT INTO study_plans (title, languages, difficulty, duration_weeks, hours_per_week, schedule, goals) VALUES
    ('Beginner Web Development Path', 
     ARRAY['550e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440004', '550e8400-e29b-41d4-a716-446655440002'],
     'beginner', 
     12, 
     5,
     '{
       "monday": {"subject": "HTML", "duration": 60},
       "tuesday": {"subject": "CSS", "duration": 60}, 
       "wednesday": {"subject": "JavaScript", "duration": 60},
       "thursday": {"subject": "Practice", "duration": 90},
       "friday": {"subject": "Review", "duration": 60}
     }',
     ARRAY['Build first website', 'Understand web basics', 'Create interactive pages']
    );