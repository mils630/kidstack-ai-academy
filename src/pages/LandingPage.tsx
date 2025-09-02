import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain, Code, Gamepad2, Heart, Zap, Star, Users, Award, BookOpen, Sparkles, Rocket, Target } from "lucide-react";
import { Link } from "react-router-dom";
import { ThemeToggle } from "@/components/ThemeToggle";

const LandingPage = () => {
  const features = [
    {
      icon: <Brain className="w-8 h-8" />,
      title: "AI-Powered Learning",
      description: "Personalized curriculum that adapts to your child's learning pace and style",
      color: "learning-ai"
    },
    {
      icon: <Gamepad2 className="w-8 h-8" />,
      title: "Gamified Experience",
      description: "Virtual pets, XP points, badges, and achievements make learning addictive",
      color: "pet-baby"
    },
    {
      icon: <Code className="w-8 h-8" />,
      title: "Real Programming",
      description: "Python, JavaScript, HTML, CSS, SQL, and AI fundamentals with hands-on coding",
      color: "learning-python"
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Structured Learning",
      description: "Clear learning paths from beginner to advanced with progress tracking",
      color: "xp-gold"
    }
  ];

  const languages = [
    { name: "Python", color: "learning-python", level: "Beginner to Pro" },
    { name: "JavaScript", color: "learning-javascript", level: "Interactive Web" },
    { name: "HTML & CSS", color: "learning-html", level: "Web Design" },
    { name: "SQL", color: "learning-sql", level: "Database Magic" },
    { name: "AI Basics", color: "learning-ai", level: "Future Tech" }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Parent",
      content: "My 12-year-old daughter went from zero coding knowledge to building her first website in just 2 months! The virtual pet keeps her motivated.",
      rating: 5
    },
    {
      name: "Mike Chen",
      role: "Educator",
      content: "As a teacher, I love how Kid.Stack AI makes programming accessible and fun. My students are more engaged than ever before.",
      rating: 5
    },
    {
      name: "Emma Davis",
      role: "Student (Age 14)",
      content: "Learning Python with my AI buddy is so cool! I never thought coding could be this fun. Already built 3 games!",
      rating: 5
    }
  ];

  const pricingPlans = [
    {
      name: "Starter",
      price: "2000",
      period: "month",
      features: ["Access to all courses", "Virtual pet companion", "Basic progress tracking", "Community support"],
      recommended: false
    },
    {
      name: "Pro Learner",
      price: "4500",
      period: "3 months",
      savings: "Save 1500 KES",
      features: ["Everything in Starter", "Advanced AI tutoring", "Priority support", "Exclusive challenges", "Parent dashboard"],
      recommended: true
    },
    {
      name: "Young Developer",
      price: "8500",
      period: "6 months",
      savings: "Save 3500 KES",
      features: ["Everything in Pro", "1-on-1 mentoring", "Project showcases", "Early access features", "Certificate of completion"],
      recommended: false
    },
    {
      name: "Code Master",
      price: "12000",
      period: "year",
      savings: "Save 12000 KES",
      features: ["Everything included", "Lifetime updates", "Personal learning coach", "Advanced projects", "Career guidance"],
      recommended: false
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 max-w-screen-2xl items-center">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-bold text-xl">Kid.Stack AI</span>
          </div>
          
          <nav className="flex items-center space-x-4 text-sm font-medium ml-auto">
            <ThemeToggle />
            <Link to="/auth" className="transition-colors hover:text-primary">
              <Button variant="outline">Login</Button>
            </Link>
            <Link to="/auth">
              <Button variant="default">Start Free Trial</Button>
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 gradient-hero opacity-10"></div>
        <div className="container relative px-4 md:px-6">
          <div className="flex flex-col items-center space-y-8 text-center">
            <div className="space-y-4">
              <Badge variant="secondary" className="px-4 py-2 text-sm font-semibold">
                🚀 Your AI Study Buddy for Coding & Smart Learning
              </Badge>
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
                Learning Code is
                <span className="gradient-hero bg-clip-text text-transparent"> Fun Again</span>
              </h1>
              <p className="mx-auto max-w-[700px] text-muted-foreground text-lg md:text-xl">
                Join thousands of kids aged 7-17 learning programming with AI-powered lessons, 
                virtual pets, and gamified challenges. Start your coding journey today!
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
        <Link to="/auth">
          <Button variant="default" size="lg" className="w-full sm:w-auto">
            <Rocket className="mr-2 h-5 w-5" />
            Start Free Trial (14 Days)
          </Button>
        </Link>
        <Link to="/auth?role=educator">
          <Button variant="secondary" size="lg" className="w-full sm:w-auto">
            <Users className="mr-2 h-5 w-5" />
            Educator Signup
          </Button>
        </Link>
            </div>

            <div className="flex items-center space-x-8 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <Heart className="w-4 h-4 text-red-500" />
                <span>14-day free trial</span>
              </div>
              <div className="flex items-center space-x-2">
                <Zap className="w-4 h-4 text-yellow-500" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center space-x-2">
                <Award className="w-4 h-4 text-green-500" />
                <span>Safe for kids</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/20">
        <div className="container px-4 md:px-6">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
              Why Kids Love Kid.Stack AI
            </h2>
            <p className="mx-auto max-w-[600px] text-muted-foreground text-lg">
              We combine cutting-edge AI with gamification to create the most engaging coding experience for young learners.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover-scale transition-smooth shadow-card hover:shadow-glow border-border/50">
                <CardHeader className="pb-4">
                  <div className={`w-16 h-16 mx-auto rounded-full gradient-primary flex items-center justify-center mb-4`}>
                    <div className="text-primary-foreground">
                      {feature.icon}
                    </div>
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Programming Languages */}
      <section className="py-20">
        <div className="container px-4 md:px-6">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
              Master Real Programming Languages
            </h2>
            <p className="mx-auto max-w-[600px] text-muted-foreground text-lg">
              From web development to AI, learn the languages that power the digital world.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {languages.map((lang, index) => (
              <Card key={index} className="text-center hover-scale transition-smooth shadow-card hover:shadow-glow">
                <CardHeader className="pb-2">
                  <div className={`w-12 h-12 mx-auto rounded-lg bg-${lang.color} flex items-center justify-center mb-2`}>
                    <Code className="w-6 h-6 text-background" />
                  </div>
                  <CardTitle className="text-lg">{lang.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <Badge variant="secondary">{lang.level}</Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-muted/20">
        <div className="container px-4 md:px-6">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
              What Our Community Says
            </h2>
            <p className="mx-auto max-w-[600px] text-muted-foreground text-lg">
              Join thousands of happy families already learning with Kid.Stack AI.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="shadow-card hover:shadow-glow transition-smooth">
                <CardHeader>
                  <div className="flex items-center space-x-1 mb-2">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                    ))}
                  </div>
                  <CardTitle className="text-lg">{testimonial.name}</CardTitle>
                  <CardDescription>{testimonial.role}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground italic">"{testimonial.content}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20">
        <div className="container px-4 md:px-6">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
              Choose Your Learning Journey
            </h2>
            <p className="mx-auto max-w-[600px] text-muted-foreground text-lg">
              Start with a 14-day free trial, then pick the plan that works best for your family.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {pricingPlans.map((plan, index) => (
              <Card key={index} className={`relative hover-scale transition-smooth shadow-card hover:shadow-glow ${plan.recommended ? 'border-primary shadow-glow' : ''}`}>
                {plan.recommended && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="gradient-primary text-primary-foreground px-3 py-1">
                      Most Popular
                    </Badge>
                  </div>
                )}
                <CardHeader className="text-center">
                  <CardTitle className="text-xl">{plan.name}</CardTitle>
                  <div className="space-y-2">
                    <div className="text-3xl font-bold">
                      {plan.price} <span className="text-lg font-normal text-muted-foreground">KES</span>
                    </div>
                    <p className="text-sm text-muted-foreground">per {plan.period}</p>
                    {plan.savings && (
                      <Badge variant="outline" className="text-green-600">
                        {plan.savings}
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-2 text-sm">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center">
                        <Badge variant="outline" className="w-2 h-2 rounded-full mr-2 p-0 bg-accent"></Badge>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Link to="/auth">
            <Button 
              variant={plan.recommended ? "default" : "outline"} 
              className="w-full"
            >
                      {plan.recommended ? "Start Free Trial" : "Choose Plan"}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 gradient-hero">
        <div className="container px-4 md:px-6 text-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-primary-foreground md:text-4xl">
              Ready to Start Your Coding Adventure?
            </h2>
            <p className="mx-auto max-w-[600px] text-primary-foreground/80 text-lg">
              Join thousands of kids who are already building the future with Kid.Stack AI. 
              Your coding journey starts with just one click!
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center">
          <Link to="/auth">
            <Button variant="secondary" size="lg" className="w-full sm:w-auto shadow-glow">
              <Rocket className="mr-2 h-5 w-5" />
              Start Free Trial Now
            </Button>
          </Link>
          <Link to="/demo">
            <Button variant="outline" size="lg" className="w-full sm:w-auto border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
              <BookOpen className="mr-2 h-5 w-5" />
              Watch Demo
            </Button>
          </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border">
        <div className="container px-4 md:px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-primary-foreground" />
                </div>
                <span className="font-bold text-xl">Kid.Stack AI</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Empowering young minds to code, create, and innovate with AI-powered learning.
              </p>
            </div>
            
            <div className="space-y-4">
              <h3 className="font-semibold">Company</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Blog</a></li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h3 className="font-semibold">Services</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">For Students</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">For Educators</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">For Schools</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Enterprise</a></li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h3 className="font-semibold">Follow Us</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Twitter</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Instagram</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">YouTube</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">TikTok</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-border mt-12 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2024 Kid.Stack AI. All rights reserved. Made with ❤️ for young coders.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;