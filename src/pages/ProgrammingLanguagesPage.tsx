import { useState } from "react";
import { 
  ArrowLeft, 
  Code2, 
  Play, 
  BookOpen, 
  Trophy,
  Target,
  CheckCircle,
  Lock,
  Sparkles,
  Zap,
  Clock,
  Star,
  FileText,
  Download,
  Eye
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Link } from "react-router-dom";
import { ThemeToggle } from "@/components/ThemeToggle";

interface Language {
  id: string;
  name: string;
  description: string;
  icon: string;
  progress: number;
  totalLessons: number;
  completedLessons: number;
  color: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedTime: string;
  nextLesson?: string;
  unlocked: boolean;
  notes?: string[];
  resources?: { title: string; description: string; type: 'pdf' | 'video' | 'article'; url?: string }[];
}

interface Lesson {
  id: string;
  title: string;
  description: string;
  duration: string;
  completed: boolean;
  locked: boolean;
  type: 'theory' | 'practice' | 'project';
}

const languages: Language[] = [
  {
    id: 'python',
    name: 'Python',
    description: 'Learn the basics of Python programming, from variables to functions and beyond!',
    icon: '🐍',
    progress: 75,
    totalLessons: 20,
    completedLessons: 15,
    color: 'learning-python',
    difficulty: 'beginner',
    estimatedTime: '4-6 weeks',
    nextLesson: 'Object-Oriented Programming Basics',
    unlocked: true,
    notes: [
      "Python is a high-level, interpreted programming language with dynamic semantics",
      "Its high-level built in data structures make it attractive for Rapid Application Development",
      "Python's simple, easy to learn syntax emphasizes readability and reduces program maintenance costs",
      "Python supports modules and packages, which encourages program modularity and code reuse"
    ],
    resources: [
      { title: "Python Basics Cheat Sheet", description: "Quick reference for Python syntax", type: "pdf" },
      { title: "Python Installation Guide", description: "Step-by-step Python setup", type: "article" },
      { title: "Intro to Python Video", description: "Visual introduction to Python", type: "video" }
    ]
  },
  {
    id: 'javascript',
    name: 'JavaScript',
    description: 'Master the language of the web and create interactive websites!',
    icon: '⚡',
    progress: 45,
    totalLessons: 25,
    completedLessons: 11,
    color: 'learning-javascript',
    difficulty: 'beginner',
    estimatedTime: '6-8 weeks',  
    nextLesson: 'DOM Manipulation',
    unlocked: true,
    notes: [
      "JavaScript is the programming language of the web",
      "It runs in browsers and can make web pages interactive",
      "Modern JavaScript (ES6+) includes classes, arrow functions, and modules",
      "JavaScript can also run on servers using Node.js"
    ],
    resources: [
      { title: "JavaScript ES6+ Features", description: "Modern JavaScript syntax guide", type: "pdf" },
      { title: "Browser Developer Tools", description: "How to debug JavaScript", type: "article" },
      { title: "JavaScript Fundamentals", description: "Complete beginner course", type: "video" }
    ]
  },
  {
    id: 'html-css',
    name: 'HTML & CSS',
    description: 'Build beautiful websites with structure and styling.',
    icon: '🎨',
    progress: 90,
    totalLessons: 18,
    completedLessons: 16,
    color: 'learning-html',
    difficulty: 'beginner',
    estimatedTime: '3-4 weeks',
    nextLesson: 'Advanced CSS Grid',
    unlocked: true
  },
  {
    id: 'sql',
    name: 'SQL',
    description: 'Query databases and manage data like a pro!',
    icon: '🗄️',
    progress: 30,
    totalLessons: 15,
    completedLessons: 4,
    color: 'learning-sql',
    difficulty: 'intermediate',
    estimatedTime: '4-5 weeks',
    nextLesson: 'JOIN Operations',
    unlocked: true
  },
  {
    id: 'ai-basics',
    name: 'AI Basics',
    description: 'Discover the fascinating world of Artificial Intelligence!',
    icon: '🤖',
    progress: 15,
    totalLessons: 12,
    completedLessons: 2,
    color: 'learning-ai',
    difficulty: 'intermediate',
    estimatedTime: '5-6 weeks',
    nextLesson: 'Machine Learning Concepts',
    unlocked: false
  },
  {
    id: 'advanced-python',
    name: 'Advanced Python',
    description: 'Take your Python skills to the next level with advanced concepts.',
    icon: '🔥',
    progress: 0,
    totalLessons: 22,
    completedLessons: 0,
    color: 'learning-python',
    difficulty: 'advanced',
    estimatedTime: '8-10 weeks',
    unlocked: false
  }
];

const pythonLessons: Lesson[] = [
  { id: '1', title: 'Introduction to Python', description: 'What is Python and why use it?', duration: '15 min', completed: true, locked: false, type: 'theory' },
  { id: '2', title: 'Variables and Data Types', description: 'Learn about strings, numbers, and booleans', duration: '20 min', completed: true, locked: false, type: 'practice' },
  { id: '3', title: 'Basic Operations', description: 'Math operations and string manipulation', duration: '25 min', completed: true, locked: false, type: 'practice' },
  { id: '4', title: 'Conditional Statements', description: 'If, elif, and else statements', duration: '30 min', completed: true, locked: false, type: 'theory' },
  { id: '5', title: 'Loops', description: 'For and while loops', duration: '35 min', completed: true, locked: false, type: 'practice' },
  { id: '6', title: 'Lists and Tuples', description: 'Working with collections of data', duration: '40 min', completed: true, locked: false, type: 'practice' },
  { id: '7', title: 'Dictionaries', description: 'Key-value pairs and data organization', duration: '30 min', completed: true, locked: false, type: 'theory' },
  { id: '8', title: 'Functions', description: 'Create reusable code blocks', duration: '45 min', completed: true, locked: false, type: 'practice' },
  { id: '9', title: 'File Handling', description: 'Reading and writing files', duration: '35 min', completed: true, locked: false, type: 'practice' },
  { id: '10', title: 'Error Handling', description: 'Try, except, and finally blocks', duration: '30 min', completed: true, locked: false, type: 'theory' },
  { id: '11', title: 'Modules and Packages', description: 'Organizing and importing code', duration: '40 min', completed: true, locked: false, type: 'theory' },
  { id: '12', title: 'List Comprehensions', description: 'Efficient list creation', duration: '25 min', completed: true, locked: false, type: 'practice' },
  { id: '13', title: 'Object-Oriented Programming', description: 'Classes and objects basics', duration: '50 min', completed: true, locked: false, type: 'theory' },
  { id: '14', title: 'Inheritance', description: 'Extending classes', duration: '40 min', completed: true, locked: false, type: 'practice' },
  { id: '15', title: 'Working with APIs', description: 'Making HTTP requests', duration: '45 min', completed: true, locked: false, type: 'practice' },
  { id: '16', title: 'Advanced OOP', description: 'Polymorphism and encapsulation', duration: '55 min', completed: false, locked: false, type: 'theory' },
  { id: '17', title: 'Decorators', description: 'Function decorators and their uses', duration: '40 min', completed: false, locked: false, type: 'practice' },
  { id: '18', title: 'Regular Expressions', description: 'Pattern matching in text', duration: '45 min', completed: false, locked: false, type: 'practice' },
  { id: '19', title: 'Web Scraping', description: 'Extracting data from websites', duration: '60 min', completed: false, locked: false, type: 'project' },
  { id: '20', title: 'Final Project', description: 'Build a complete Python application', duration: '90 min', completed: false, locked: false, type: 'project' }
];

const ProgrammingLanguagesPage = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('python');
  
  const currentLanguage = languages.find(lang => lang.id === selectedLanguage);
  const currentLessons = selectedLanguage === 'python' ? pythonLessons : [];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-500';
      case 'intermediate': return 'bg-yellow-500';
      case 'advanced': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'theory': return <BookOpen className="w-4 h-4" />;
      case 'practice': return <Code2 className="w-4 h-4" />;
      case 'project': return <Trophy className="w-4 h-4" />;
      default: return <BookOpen className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'theory': return 'bg-blue-500';
      case 'practice': return 'bg-green-500';
      case 'project': return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border p-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link to="/student">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center">
                <Code2 className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold">Programming Languages</h1>
                <p className="text-sm text-muted-foreground">Master the languages that power technology</p>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <ThemeToggle />
              <Badge variant="outline" className="gradient-primary text-primary-foreground">
                <Trophy className="w-3 h-3 mr-1" />
                5 Languages
              </Badge>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto p-6">
        <Tabs value={selectedLanguage} onValueChange={setSelectedLanguage} className="space-y-6">
          {/* Language Selection */}
          <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6 h-auto p-1">
            {languages.map((lang) => (
              <TabsTrigger 
                key={lang.id} 
                value={lang.id}
                disabled={!lang.unlocked}
                className="flex-col h-16 space-y-1 relative data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                <span className="text-lg">{lang.icon}</span>
                <span className="text-xs font-medium">{lang.name}</span>
                {!lang.unlocked && (
                  <Lock className="absolute top-1 right-1 w-3 h-3 text-muted-foreground" />
                )}
              </TabsTrigger>
            ))}
          </TabsList>

          {/* Language Overview */}
          {currentLanguage && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-6">
                {/* Language Info */}
                <Card className="gradient-card">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="text-4xl">{currentLanguage.icon}</div>
                        <div>
                          <CardTitle className="text-2xl">{currentLanguage.name}</CardTitle>
                          <p className="text-muted-foreground mt-1">{currentLanguage.description}</p>
                        </div>
                      </div>
                      <Badge 
                        variant="outline" 
                        className={`text-white ${getDifficultyColor(currentLanguage.difficulty)}`}
                      >
                        {currentLanguage.difficulty}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <p className="text-2xl font-bold text-primary">{currentLanguage.completedLessons}</p>
                        <p className="text-sm text-muted-foreground">Completed</p>
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-secondary">{currentLanguage.totalLessons}</p>
                        <p className="text-sm text-muted-foreground">Total Lessons</p>
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-accent">{currentLanguage.progress}%</p>
                        <p className="text-sm text-muted-foreground">Progress</p>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Course Progress</span>
                        <span>{currentLanguage.progress}%</span>
                      </div>
                      <Progress value={currentLanguage.progress} className="h-3" />
                    </div>

                    {currentLanguage.nextLesson && (
                      <div className="bg-muted/20 rounded-lg p-4 border border-border">
                        <div className="flex items-center space-x-2 mb-2">
                          <Target className="w-4 h-4 text-primary" />
                          <span className="font-medium text-sm">Next Lesson</span>
                        </div>
                        <p className="text-sm">{currentLanguage.nextLesson}</p>
                        <Button size="sm" className="mt-3" variant="default">
                          <Play className="w-3 h-3 mr-1" />
                          Continue Learning
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Lessons List */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <BookOpen className="w-5 h-5" />
                      <span>Course Curriculum</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {currentLessons.map((lesson, index) => (
                        <div 
                          key={lesson.id}
                          className={`flex items-center space-x-4 p-4 rounded-lg border transition-colors ${
                            lesson.completed 
                              ? 'border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/20' 
                              : lesson.locked
                              ? 'border-muted bg-muted/20 opacity-50'
                              : 'border-border bg-card hover:bg-muted/20'
                          }`}
                        >
                          <div className="flex items-center space-x-3">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                              lesson.completed 
                                ? 'bg-green-500 text-white' 
                                : lesson.locked
                                ? 'bg-muted text-muted-foreground'
                                : 'bg-primary text-primary-foreground'
                            }`}>
                              {lesson.completed ? <CheckCircle className="w-4 h-4" /> : 
                               lesson.locked ? <Lock className="w-4 h-4" /> : 
                               index + 1}
                            </div>
                            
                            <div className={`w-6 h-6 rounded flex items-center justify-center ${getTypeColor(lesson.type)} text-white`}>
                              {getTypeIcon(lesson.type)}
                            </div>
                          </div>
                          
                          <div className="flex-1">
                            <h3 className="font-medium">{lesson.title}</h3>
                            <p className="text-sm text-muted-foreground">{lesson.description}</p>
                          </div>
                          
                          <div className="text-right space-y-1">
                            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                              <Clock className="w-3 h-3" />
                              <span>{lesson.duration}</span>
                            </div>
                            {lesson.completed ? (
                              <Badge variant="outline" className="text-green-600 border-green-500">
                                Completed
                              </Badge>
                            ) : lesson.locked ? (
                              <Badge variant="outline" className="text-muted-foreground">
                                Locked
                              </Badge>
                            ) : (
                              <Button size="sm" variant="outline">
                                Start
                              </Button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

                {/* Sidebar */}
              <div className="space-y-6">
                {/* Study Notes */}
                {currentLanguage.notes && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <FileText className="w-5 h-5" />
                        <span>Study Notes</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {currentLanguage.notes.map((note, index) => (
                          <li key={index} className="text-sm p-3 bg-muted/20 rounded-lg border-l-4 border-primary">
                            {note}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                )}

                {/* Resources */}
                {currentLanguage.resources && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Download className="w-5 h-5" />
                        <span>Resources</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {currentLanguage.resources.map((resource, index) => (
                        <div key={index} className="flex items-center justify-between p-3 border border-border rounded-lg hover:bg-muted/20 transition-colors">
                          <div className="flex-1">
                            <h4 className="font-medium text-sm">{resource.title}</h4>
                            <p className="text-xs text-muted-foreground">{resource.description}</p>
                            <Badge variant="outline" className="text-xs mt-1">
                              {resource.type.toUpperCase()}
                            </Badge>
                          </div>
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button size="sm" variant="ghost">
                                <Eye className="w-4 h-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl">
                              <DialogHeader>
                                <DialogTitle>{resource.title}</DialogTitle>
                                <DialogDescription>{resource.description}</DialogDescription>
                              </DialogHeader>
                              <ScrollArea className="h-96 p-4 border border-border rounded-lg">
                                <div className="space-y-4">
                                  <p className="text-sm text-muted-foreground">
                                    This is a preview of the {resource.type} resource. In a full implementation, 
                                    this would show the actual content or provide download links.
                                  </p>
                                  <div className="bg-muted/20 p-4 rounded-lg">
                                    <h4 className="font-medium mb-2">Resource Content Preview</h4>
                                    <p className="text-sm">
                                      {resource.type === 'pdf' && "📄 PDF document with detailed explanations and examples"}
                                      {resource.type === 'video' && "🎥 Interactive video tutorial with subtitles"}
                                      {resource.type === 'article' && "📖 Comprehensive article with code examples"}
                                    </p>
                                  </div>
                                </div>
                              </ScrollArea>
                            </DialogContent>
                          </Dialog>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                )}
                {/* Quick Stats */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Star className="w-5 h-5" />
                      <span>Your Stats</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-center p-4 bg-muted/20 rounded-lg">
                      <div className="text-2xl font-bold text-primary mb-1">
                        {currentLanguage.estimatedTime}
                      </div>
                      <p className="text-sm text-muted-foreground">Estimated completion time</p>
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Lessons completed</span>
                        <span className="font-medium">{currentLanguage.completedLessons}/{currentLanguage.totalLessons}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Current streak</span>
                        <span className="font-medium">5 days 🔥</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">XP earned</span>
                        <span className="font-medium">+{currentLanguage.completedLessons * 50} XP</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Language Features */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Zap className="w-5 h-5" />
                      <span>What You'll Learn</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {selectedLanguage === 'python' && (
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span>Variables and data types</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span>Control structures (if/else, loops)</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span>Functions and modules</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span>Object-oriented programming</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span>File handling and APIs</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <Target className="w-4 h-4 text-primary" />
                          <span>Build real projects</span>
                        </li>
                      </ul>
                    )}
                  </CardContent>
                </Card>

                {/* Quick Actions */}
                <Card>
                  <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button variant="default" size="sm" className="w-full">
                      <Play className="w-4 h-4 mr-2" />
                      Continue Learning
                    </Button>
                    <Button variant="outline" size="sm" className="w-full">
                      <BookOpen className="w-4 h-4 mr-2" />
                      Practice Exercises
                    </Button>
                    <Link to="/student/quizzes">
                      <Button variant="outline" size="sm" className="w-full">
                        <Trophy className="w-4 h-4 mr-2" />
                        Take Quiz
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </Tabs>
      </main>
    </div>
  );
};

export default ProgrammingLanguagesPage;