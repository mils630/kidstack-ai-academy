import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GraduationCap, Users, Sparkles, ArrowLeft, Heart, Shield, Zap, Phone, Mail } from "lucide-react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useState } from "react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

const AuthPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const preselectedRole = searchParams.get('role');
  const [selectedRole, setSelectedRole] = useState<string | null>(preselectedRole);
  const [authMode, setAuthMode] = useState<'select' | 'login' | 'signup'>('select');
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    phone: '',
    fullName: '',
    confirmPassword: ''
  });

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

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (authMode === 'signup') {
        if (formData.password !== formData.confirmPassword) {
          toast.error("Passwords don't match");
          return;
        }

        const { data, error } = await supabase.auth.signUp({
          email: formData.email,
          password: formData.password,
          options: {
            data: {
              full_name: formData.fullName,
              role: selectedRole,
              phone: formData.phone
            }
          }
        });

        if (error) throw error;
        
        toast.success("Account created successfully! Please check your email to verify your account.");
        
        // Navigate to dashboard
        if (selectedRole === 'student') {
          navigate('/student');
        } else if (selectedRole === 'educator') {
          navigate('/educator');
        }
      } else {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password,
        });

        if (error) throw error;
        
        toast.success("Welcome back!");
        
        // Navigate to dashboard
        if (selectedRole === 'student') {
          navigate('/student');
        } else if (selectedRole === 'educator') {
          navigate('/educator');
        }
      }
    } catch (error: any) {
      toast.error(error.message || "An error occurred during authentication");
    } finally {
      setIsLoading(false);
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
            
            <div className="ml-auto flex items-center space-x-2">
              <ThemeToggle />
              <Link to="/">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Home
                </Button>
              </Link>
            </div>
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
          
          <div className="ml-auto flex items-center space-x-2">
            <ThemeToggle />
            <Button variant="ghost" size="sm" onClick={handleBackToRoleSelect}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Role Selection
            </Button>
          </div>
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
            <CardContent>
              <form onSubmit={handleAuth} className="space-y-4">
                {selectedRole === 'student' ? (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <div className="flex">
                        <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-input bg-muted text-muted-foreground text-sm">
                          +254
                        </span>
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="712345678"
                          value={formData.phone}
                          onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                          required
                          className="rounded-l-none"
                        />
                      </div>
                    </div>
                    
                    {authMode === 'signup' && (
                      <div className="space-y-2">
                        <Label htmlFor="fullName">Full Name</Label>
                        <Input
                          id="fullName"
                          type="text"
                          placeholder="Enter your full name"
                          value={formData.fullName}
                          onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
                          required
                        />
                      </div>
                    )}
                  </>
                ) : (
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="educator@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      required
                    />
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                    required
                  />
                </div>

                {authMode === 'signup' && (
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder="Confirm your password"
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                      required
                    />
                  </div>
                )}

                <Button 
                  type="submit" 
                  variant={selectedRole === 'student' ? 'default' : 'secondary'} 
                  className="w-full"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                      <span>Please wait...</span>
                    </div>
                  ) : (
                    <>
                      {selectedRole === 'student' ? <Phone className="mr-2 h-4 w-4" /> : <Mail className="mr-2 h-4 w-4" />}
                      {authMode === 'login' ? 'Sign In' : 'Create Account'}
                    </>
                  )}
                </Button>
              </form>
              
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