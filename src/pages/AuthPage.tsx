import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, Users, Sparkles, ArrowLeft, Heart, Shield, Zap } from "lucide-react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useState } from "react";

const AuthPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const preselectedRole = searchParams.get('role');
  const [selectedRole, setSelectedRole] = useState<string | null>(preselectedRole);
  const [authMode, setAuthMode] = useState<'select' | 'login' | 'signup'>('select');

  const roles = [
    {
      id: 'student',
      title: 'I\'m a Student',
      subtitle: 'Ages 7-17',
      description: 'Join thousands of kids learning to code with AI-powered lessons and virtual pets!',
      features: [
        '🎮 Virtual pet companion',
        '🏆 Badges and achievements', 
        '📚 Interactive coding lessons',
        '🎯 Personalized learning paths',
        '👥 Student community'
      ],
      color: 'gradient-primary',
      icon: <GraduationCap className="w-8 h-8" />,
      route: '/student'
    },
    {
      id: 'educator',
      title: 'I\'m an Educator',
      subtitle: 'Teachers & Contributors',
      description: 'Create engaging content, track student progress, and make coding education accessible.',
      features: [
        '📝 Create courses and quizzes',
        '📊 Track student engagement',
        '💡 Upload educational content',
        '🤝 Collaborate with educators',
        '🎖️ Earn contributor badges'
      ],
      color: 'gradient-secondary',
      icon: <Users className="w-8 h-8" />,
      route: '/educator'
    }
  ];

  const handleRoleSelect = (roleId: string) => {
    setSelectedRole(roleId);
    setAuthMode('login');
  };

  const handleSignupSwitch = () => {
    setAuthMode('signup');
  };

  const handleBackToRoleSelect = () => {
    setAuthMode('select');
    setSelectedRole(null);
  };

  const handleContinue = () => {
    if (selectedRole === 'student') {
      navigate('/student');
    } else if (selectedRole === 'educator') {
      navigate('/educator');
    }
  };

  if (authMode === 'select') {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        {/* Header */}
        <header className="border-b border-border bg-card">
          <div className="container flex h-14 max-w-screen-2xl items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-bold text-xl">Kid.Stack AI</span>
            </Link>
            
            <Link to="/" className="ml-auto">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Button>
            </Link>
          </div>
        </header>

        {/* Role Selection */}
        <main className="flex-1 flex items-center justify-center p-6">
          <div className="w-full max-w-4xl space-y-8">
            <div className="text-center space-y-4">
              <h1 className="text-4xl font-bold tracking-tighter">
                Welcome to 
                <span className="gradient-hero bg-clip-text text-transparent"> Kid.Stack AI</span>
              </h1>
              <p className="text-xl text-muted-foreground">
                Choose your role to get started with your coding adventure!
              </p>
              <div className="flex items-center justify-center space-x-6 text-sm text-muted-foreground">
                <div className="flex items-center space-x-2">
                  <Heart className="w-4 h-4 text-red-500" />
                  <span>14-day free trial</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Shield className="w-4 h-4 text-green-500" />
                  <span>Safe for kids</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Zap className="w-4 h-4 text-yellow-500" />
                  <span>No credit card needed</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {roles.map((role) => (
                <Card 
                  key={role.id} 
                  className="relative cursor-pointer hover-scale transition-smooth shadow-card hover:shadow-glow border-border/50 group"
                  onClick={() => handleRoleSelect(role.id)}
                >
                  <CardHeader className="text-center pb-4">
                    <div className={`w-20 h-20 mx-auto rounded-full ${role.color} flex items-center justify-center mb-4 group-hover:animate-pulse-glow transition-smooth`}>
                      <div className="text-primary-foreground">
                        {role.icon}
                      </div>
                    </div>
                    <CardTitle className="text-2xl">{role.title}</CardTitle>
                    <Badge variant="outline" className="mx-auto">
                      {role.subtitle}
                    </Badge>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <CardDescription className="text-center text-base">
                      {role.description}
                    </CardDescription>
                    <ul className="space-y-2">
                      {role.features.map((feature, index) => (
                        <li key={index} className="text-sm flex items-center">
                          <span className="mr-2">{feature.split(' ')[0]}</span>
                          <span>{feature.split(' ').slice(1).join(' ')}</span>
                        </li>
                      ))}
                    </ul>
                    <Button className="w-full" variant={role.id === 'student' ? 'default' : 'secondary'}>
                      Continue as {role.id === 'student' ? 'Student' : 'Educator'}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                Not sure which one? <Link to="/" className="text-primary hover:underline">Learn more about Kid.Stack AI</Link>
              </p>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container flex h-14 max-w-screen-2xl items-center">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-bold text-xl">Kid.Stack AI</span>
          </Link>
          
          <Button variant="ghost" size="sm" onClick={handleBackToRoleSelect} className="ml-auto">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Role Selection
          </Button>
        </div>
      </header>

      {/* Auth Form */}
      <main className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md space-y-6">
          <Card className="shadow-glow border-primary/20">
            <CardHeader className="text-center">
              <div className={`w-16 h-16 mx-auto rounded-full ${selectedRole === 'student' ? 'gradient-primary' : 'gradient-secondary'} flex items-center justify-center mb-4`}>
                {selectedRole === 'student' ? 
                  <GraduationCap className="w-8 h-8 text-primary-foreground" /> :
                  <Users className="w-8 h-8 text-primary-foreground" />
                }
              </div>
              <CardTitle className="text-2xl">
                {authMode === 'login' ? 'Welcome Back!' : 'Create Account'}
              </CardTitle>
              <CardDescription>
                {selectedRole === 'student' ? 
                  `${authMode === 'login' ? 'Continue' : 'Start'} your coding journey` :
                  `${authMode === 'login' ? 'Access' : 'Join'} the educator portal`
                }
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center p-6 border border-border rounded-lg bg-muted/20">
                <p className="text-muted-foreground mb-4">
                  Authentication system requires Supabase integration
                </p>
                <Button onClick={handleContinue} variant={selectedRole === 'student' ? 'default' : 'secondary'} className="w-full">
                  Continue to Dashboard (Demo)
                </Button>
              </div>
              
              <div className="text-center space-y-2">
                {authMode === 'login' ? (
                  <p className="text-sm text-muted-foreground">
                    Don't have an account?{' '}
                    <button 
                      onClick={handleSignupSwitch}
                      className="text-primary hover:underline font-medium"
                    >
                      Sign up here
                    </button>
                  </p>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    Already have an account?{' '}
                    <button 
                      onClick={() => setAuthMode('login')}
                      className="text-primary hover:underline font-medium"
                    >
                      Log in here
                    </button>
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          <div className="text-center">
            <p className="text-xs text-muted-foreground">
              By continuing, you agree to our Terms of Service and Privacy Policy. 
              Safe and secure for kids aged 7-17.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AuthPage;