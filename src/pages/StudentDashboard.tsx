import { useState } from "react";
import { 
  Home, 
  CreditCard, 
  FileQuestion, 
  Code2, 
  BookOpen, 
  Calendar, 
  Heart, 
  Settings,
  Menu,
  X,
  User,
  Trophy,
  Zap,
  Target,
  Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/ThemeToggle";

interface SidebarItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  path: string;
  badge?: string;
}

const sidebarItems: SidebarItem[] = [
  { id: 'home', label: 'Home', icon: <Home className="w-5 h-5" />, path: '/student' },
  { id: 'flashcards', label: 'Flashcards', icon: <CreditCard className="w-5 h-5" />, path: '/student/flashcards', badge: 'New' },
  { id: 'quizzes', label: 'Quizzes', icon: <FileQuestion className="w-5 h-5" />, path: '/student/quizzes' },
  { id: 'languages', label: 'Programming Languages', icon: <Code2 className="w-5 h-5" />, path: '/student/languages' },
  { id: 'assignments', label: 'Assignments', icon: <BookOpen className="w-5 h-5" />, path: '/student/assignments', badge: '3' },
  { id: 'study-plan', label: 'Study Plan', icon: <Calendar className="w-5 h-5" />, path: '/student/study-plan' },
  { id: 'virtual-pet', label: 'Virtual Pet', icon: <Heart className="w-5 h-5" />, path: '/student/pet', badge: '!' },
  { id: 'settings', label: 'Settings', icon: <Settings className="w-5 h-5" />, path: '/student/settings' }
];

const StudentDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('home');

  const studentStats = {
    xp: 1250,
    level: 5,
    streak: 12,
    completedLessons: 28,
    totalLessons: 45,
    badges: 8,
    petLevel: 3
  };

  const recentActivities = [
    { type: 'quiz', title: 'JavaScript Basics Quiz', score: 85, timestamp: '2 hours ago' },
    { type: 'flashcard', title: 'Python Functions', completed: 15, total: 20, timestamp: '1 day ago' },
    { type: 'assignment', title: 'Build a Calculator', status: 'completed', timestamp: '2 days ago' },
    { type: 'lesson', title: 'HTML Semantic Elements', progress: 100, timestamp: '3 days ago' }
  ];

  const upcomingTasks = [
    { title: 'CSS Flexbox Quiz', due: 'Today', priority: 'high' },
    { title: 'Python Project Review', due: 'Tomorrow', priority: 'medium' },
    { title: 'SQL Practice Session', due: 'This Week', priority: 'low' }
  ];

  const currentLanguages = [
    { name: 'Python', progress: 75, color: 'learning-python', level: 'Intermediate' },
    { name: 'JavaScript', progress: 45, color: 'learning-javascript', level: 'Beginner' },
    { name: 'HTML & CSS', progress: 90, color: 'learning-html', level: 'Advanced' }
  ];

  return (
    <div className="min-h-screen bg-background flex">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden" 
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={cn(
        "fixed left-0 top-0 z-50 h-full w-64 transform bg-card border-r border-border transition-transform md:relative md:translate-x-0",
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="flex items-center justify-between p-4 border-b border-border">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-bold text-lg">Kid.Stack AI</span>
            </Link>
            <Button 
              variant="ghost" 
              size="sm" 
              className="md:hidden"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          {/* Student Info */}
          <div className="p-4 border-b border-border">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 gradient-primary rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <p className="font-semibold">Emma Thompson</p>
                <p className="text-sm text-muted-foreground">Level {studentStats.level} Coder</p>
              </div>
            </div>
            
            <div className="mt-3 space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">XP Progress</span>
                <span className="font-medium">{studentStats.xp}/2000 XP</span>
              </div>
              <Progress value={(studentStats.xp / 2000) * 100} className="h-2" />
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-4">
            <ul className="space-y-2">
              {sidebarItems.map((item) => (
                <li key={item.id}>
                  <Button
                    variant={activeTab === item.id ? "secondary" : "ghost"}
                    className="w-full justify-start relative"
                    onClick={() => {
                      setActiveTab(item.id);
                      setSidebarOpen(false);
                    }}
                  >
                    {item.icon}
                    <span className="ml-2">{item.label}</span>
                    {item.badge && (
                      <Badge 
                        variant="outline" 
                        className="ml-auto text-xs px-1.5 py-0.5 h-auto gradient-accent text-accent-foreground"
                      >
                        {item.badge}
                      </Badge>
                    )}
                  </Button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Pet Status */}
          <div className="p-4 border-t border-border">
            <div className="gradient-card rounded-lg p-3">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 pet-baby rounded-full flex items-center justify-center">
                  <Heart className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-semibold text-sm">CodeBuddy</p>
                  <p className="text-xs text-muted-foreground">Level {studentStats.petLevel} • Happy</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <header className="bg-card border-b border-border p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                className="md:hidden"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu className="w-4 h-4" />
              </Button>
              <div>
                <h1 className="text-2xl font-bold">Dashboard</h1>
                <p className="text-muted-foreground">Welcome back, Emma! Ready to code today?</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <ThemeToggle />
              <div className="flex items-center space-x-2 text-sm">
                <Zap className="w-4 h-4 text-yellow-500" />
                <span>{studentStats.streak} day streak!</span>
              </div>
              <Badge variant="outline" className="gradient-primary text-primary-foreground">
                <Trophy className="w-3 h-3 mr-1" />
                {studentStats.badges} badges
              </Badge>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="gradient-card">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total XP</CardTitle>
                  <Zap className="w-4 h-4 text-yellow-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{studentStats.xp.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">+125 from yesterday</p>
                </CardContent>
              </Card>

              <Card className="gradient-card">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Current Level</CardTitle>
                  <Target className="w-4 h-4 text-primary" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">Level {studentStats.level}</div>
                  <p className="text-xs text-muted-foreground">{2000 - studentStats.xp} XP to next level</p>
                </CardContent>
              </Card>

              <Card className="gradient-card">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Lessons Completed</CardTitle>
                  <BookOpen className="w-4 h-4 text-accent" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{studentStats.completedLessons}/{studentStats.totalLessons}</div>
                  <p className="text-xs text-muted-foreground">{Math.round((studentStats.completedLessons / studentStats.totalLessons) * 100)}% complete</p>
                </CardContent>
              </Card>

              <Card className="gradient-card">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Study Streak</CardTitle>
                  <Heart className="w-4 h-4 text-red-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{studentStats.streak} days</div>
                  <p className="text-xs text-muted-foreground">Keep it up! 🔥</p>
                </CardContent>
              </Card>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Current Progress */}
              <div className="lg:col-span-2 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Current Learning Progress</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {currentLanguages.map((lang, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <div className={`w-3 h-3 rounded-full bg-${lang.color}`}></div>
                            <span className="font-medium">{lang.name}</span>
                            <Badge variant="outline" className="text-xs">{lang.level}</Badge>
                          </div>
                          <span className="text-sm text-muted-foreground">{lang.progress}%</span>
                        </div>
                        <Progress value={lang.progress} className="h-2" />
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentActivities.map((activity, index) => (
                        <div key={index} className="flex items-center space-x-4 p-3 rounded-lg bg-muted/20 hover:bg-muted/30 transition-colors">
                          <div className={`w-10 h-10 rounded-full gradient-${activity.type === 'quiz' ? 'primary' : activity.type === 'flashcard' ? 'secondary' : 'accent'} flex items-center justify-center`}>
                            {activity.type === 'quiz' && <FileQuestion className="w-5 h-5 text-primary-foreground" />}
                            {activity.type === 'flashcard' && <CreditCard className="w-5 h-5 text-secondary-foreground" />}
                            {(activity.type === 'assignment' || activity.type === 'lesson') && <BookOpen className="w-5 h-5 text-accent-foreground" />}
                          </div>
                          <div className="flex-1">
                            <p className="font-medium">{activity.title}</p>
                            <p className="text-sm text-muted-foreground">
                              {'score' in activity && `Score: ${activity.score}%`}
                              {'completed' in activity && `${activity.completed}/${activity.total} completed`}
                              {'status' in activity && `Status: ${activity.status}`}
                              {'progress' in activity && `Progress: ${activity.progress}%`}
                              {' • ' + activity.timestamp}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar Content */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Heart className="w-5 h-5 text-red-500" />
                      <span>CodeBuddy Status</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <div className="w-20 h-20 mx-auto mb-4 gradient-primary rounded-full flex items-center justify-center animate-bounce">
                      <Heart className="w-10 h-10 text-primary-foreground" />
                    </div>
                    <h3 className="font-semibold">CodeBuddy</h3>
                    <p className="text-sm text-muted-foreground mb-3">Level {studentStats.petLevel} • Happy & Energetic</p>
                    <div className="space-y-2 text-left">
                      <div className="flex justify-between text-sm">
                        <span>Happiness</span>
                        <span>85%</span>
                      </div>
                      <Progress value={85} className="h-2" />
                      <div className="flex justify-between text-sm">
                        <span>Energy</span>
                        <span>92%</span>
                      </div>
                      <Progress value={92} className="h-2" />
                    </div>
                    <Button variant="outline" size="sm" className="w-full mt-4" onClick={() => setActiveTab('virtual-pet')}>
                      Visit CodeBuddy
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Upcoming Tasks</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {upcomingTasks.map((task, index) => (
                      <div key={index} className="flex items-center space-x-3 p-2 rounded-lg bg-muted/20">
                        <div className={`w-2 h-2 rounded-full ${
                          task.priority === 'high' ? 'bg-red-500' : 
                          task.priority === 'medium' ? 'bg-yellow-500' : 
                          'bg-green-500'
                        }`}></div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">{task.title}</p>
                          <p className="text-xs text-muted-foreground">Due: {task.due}</p>
                        </div>
                      </div>
                    ))}
                    <Button variant="outline" size="sm" className="w-full">
                      View All Tasks
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button variant="default" size="sm" className="w-full" onClick={() => setActiveTab('flashcards')}>
                      <CreditCard className="w-4 h-4 mr-2" />
                      Practice Flashcards
                    </Button>
                    <Button variant="secondary" size="sm" className="w-full" onClick={() => setActiveTab('quizzes')}>
                      <FileQuestion className="w-4 h-4 mr-2" />
                      Take a Quiz
                    </Button>
                    <Button variant="outline" size="sm" className="w-full" onClick={() => setActiveTab('languages')}>
                      <Code2 className="w-4 h-4 mr-2" />
                      Continue Learning
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default StudentDashboard;