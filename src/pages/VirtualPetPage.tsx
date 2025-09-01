import { useState } from "react";
import { 
  ArrowLeft, 
  Heart, 
  Sparkles, 
  Trophy, 
  Apple, 
  Gamepad2,
  Gift,
  Star,
  Zap,
  Clock
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Link } from "react-router-dom";

interface PetStats {
  name: string;
  level: number;
  happiness: number;
  energy: number;
  hunger: number;
  experience: number;
  maxExperience: number;
  evolutionStage: 'baby' | 'teen' | 'adult' | 'master';
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  unlocked: boolean;
  icon: React.ReactNode;
  reward: string;
}

const VirtualPetPage = () => {
  const [petStats, setPetStats] = useState<PetStats>({
    name: "CodeBuddy",
    level: 3,
    happiness: 85,
    energy: 70,
    hunger: 60,
    experience: 750,
    maxExperience: 1000,
    evolutionStage: 'baby'
  });

  const [lastFed, setLastFed] = useState<Date>(new Date(Date.now() - 3600000)); // 1 hour ago
  const [lastPlayed, setLastPlayed] = useState<Date>(new Date(Date.now() - 7200000)); // 2 hours ago

  const achievements: Achievement[] = [
    {
      id: 'first-lesson',
      title: 'First Steps',
      description: 'Complete your first coding lesson',
      unlocked: true,
      icon: <Star className="w-4 h-4" />,
      reward: '+50 XP'
    },
    {
      id: 'quiz-master',
      title: 'Quiz Master',
      description: 'Score 100% on a quiz',
      unlocked: true,
      icon: <Trophy className="w-4 h-4" />,
      reward: '+100 XP'
    },
    {
      id: 'streak-week',
      title: 'Week Warrior',
      description: 'Maintain a 7-day learning streak',
      unlocked: false,
      icon: <Zap className="w-4 h-4" />,
      reward: '+200 XP'
    },
    {
      id: 'pet-love',
      title: 'Pet Lover',
      description: 'Keep your pet happy for 7 days',
      unlocked: false,
      icon: <Heart className="w-4 h-4" />,
      reward: 'Special outfit'
    }
  ];

  const feedPet = () => {
    setPetStats(prev => ({
      ...prev,
      hunger: Math.min(100, prev.hunger + 30),
      happiness: Math.min(100, prev.happiness + 10),
      experience: prev.experience + 25
    }));
    setLastFed(new Date());
  };

  const playWithPet = () => {
    setPetStats(prev => ({
      ...prev,
      happiness: Math.min(100, prev.happiness + 25),
      energy: Math.max(0, prev.energy - 20),
      experience: prev.experience + 50
    }));
    setLastPlayed(new Date());
  };

  const restPet = () => {
    setPetStats(prev => ({
      ...prev,
      energy: Math.min(100, prev.energy + 40),
      happiness: Math.min(100, prev.happiness + 5),
      experience: prev.experience + 15
    }));
  };

  const getEvolutionRequirement = () => {
    switch (petStats.evolutionStage) {
      case 'baby': return 'Level 5 to evolve to Teen';
      case 'teen': return 'Level 10 to evolve to Adult';
      case 'adult': return 'Level 15 to evolve to Master';
      case 'master': return 'Max evolution reached!';
      default: return '';
    }
  };

  const getPetColor = () => {
    switch (petStats.evolutionStage) {
      case 'baby': return 'pet-baby';
      case 'teen': return 'pet-teen';
      case 'adult': return 'pet-adult';
      case 'master': return 'pet-master';
      default: return 'pet-baby';
    }
  };

  const getMood = () => {
    if (petStats.happiness >= 80) return { text: 'Ecstatic! 😄', color: 'text-green-500' };
    if (petStats.happiness >= 60) return { text: 'Happy 😊', color: 'text-green-400' };
    if (petStats.happiness >= 40) return { text: 'Content 😐', color: 'text-yellow-500' };
    if (petStats.happiness >= 20) return { text: 'Sad 😢', color: 'text-orange-500' };
    return { text: 'Very Sad 😭', color: 'text-red-500' };
  };

  const getTimeSince = (date: Date) => {
    const diff = Date.now() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    if (hours > 0) return `${hours}h ${minutes}m ago`;
    return `${minutes}m ago`;
  };

  const mood = getMood();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border p-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link to="/student">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center">
                <Heart className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold">Virtual Pet</h1>
                <p className="text-sm text-muted-foreground">Your coding companion</p>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Badge variant="outline" className="gradient-primary text-primary-foreground">
              Level {petStats.level}
            </Badge>
            <Badge variant="outline" className={mood.color}>
              {mood.text}
            </Badge>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Pet Display */}
          <div className="lg:col-span-2">
            <Card className="gradient-card mb-6">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">{petStats.name}</CardTitle>
                <Badge variant="outline" className="mx-auto capitalize">
                  {petStats.evolutionStage} Stage
                </Badge>
              </CardHeader>
              <CardContent className="text-center space-y-6">
                {/* Pet Avatar */}
                <div className="relative">
                  <div className={`w-32 h-32 mx-auto rounded-full bg-${getPetColor()} flex items-center justify-center animate-bounce shadow-glow`}>
                    <Heart className="w-16 h-16 text-white" />
                  </div>
                  <div className="absolute top-0 right-1/2 transform translate-x-12 -translate-y-2">
                    <div className="animate-pulse">
                      <Sparkles className="w-6 h-6 text-yellow-500" />
                    </div>
                  </div>
                </div>

                {/* Pet Stats */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className={`w-12 h-12 mx-auto rounded-full bg-red-100 flex items-center justify-center mb-2`}>
                      <Heart className="w-6 h-6 text-red-500" />
                    </div>
                    <p className="text-sm font-medium">Happiness</p>
                    <p className="text-lg font-bold">{petStats.happiness}%</p>
                    <Progress value={petStats.happiness} className="h-2 mt-1" />
                  </div>
                  <div className="text-center">
                    <div className={`w-12 h-12 mx-auto rounded-full bg-blue-100 flex items-center justify-center mb-2`}>
                      <Zap className="w-6 h-6 text-blue-500" />
                    </div>
                    <p className="text-sm font-medium">Energy</p>
                    <p className="text-lg font-bold">{petStats.energy}%</p>
                    <Progress value={petStats.energy} className="h-2 mt-1" />
                  </div>
                  <div className="text-center">
                    <div className={`w-12 h-12 mx-auto rounded-full bg-green-100 flex items-center justify-center mb-2`}>
                      <Apple className="w-6 h-6 text-green-500" />
                    </div>
                    <p className="text-sm font-medium">Hunger</p>
                    <p className="text-lg font-bold">{petStats.hunger}%</p>
                    <Progress value={petStats.hunger} className="h-2 mt-1" />
                  </div>
                </div>

                {/* Experience */}
                <div className="bg-muted rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Experience</span>
                    <span className="text-sm text-muted-foreground">
                      {petStats.experience}/{petStats.maxExperience} XP
                    </span>
                  </div>
                  <Progress value={(petStats.experience / petStats.maxExperience) * 100} className="h-3" />
                  <p className="text-xs text-muted-foreground mt-2">{getEvolutionRequirement()}</p>
                </div>

                {/* Actions */}
                <div className="grid grid-cols-3 gap-4">
                  <Button 
                    onClick={feedPet}
                    variant="outline"
                    className="flex-col h-20 space-y-2"
                    disabled={petStats.hunger > 90}
                  >
                    <Apple className="w-6 h-6" />
                    <span className="text-xs">Feed</span>
                  </Button>
                  <Button 
                    onClick={playWithPet}
                    variant="outline"
                    className="flex-col h-20 space-y-2"
                    disabled={petStats.energy < 20}
                  >
                    <Gamepad2 className="w-6 h-6" />
                    <span className="text-xs">Play</span>
                  </Button>
                  <Button 
                    onClick={restPet}
                    variant="outline"
                    className="flex-col h-20 space-y-2"
                    disabled={petStats.energy > 90}
                  >
                    <Clock className="w-6 h-6" />
                    <span className="text-xs">Rest</span>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Care History */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Clock className="w-5 h-5" />
                  <span>Care History</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Apple className="w-5 h-5 text-green-500" />
                    <span>Last fed</span>
                  </div>
                  <span className="text-sm text-muted-foreground">{getTimeSince(lastFed)}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Gamepad2 className="w-5 h-5 text-blue-500" />
                    <span>Last played</span>
                  </div>
                  <span className="text-sm text-muted-foreground">{getTimeSince(lastPlayed)}</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Pet Care Tips */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Gift className="w-5 h-5" />
                  <span>Care Tips</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                  <p className="font-medium text-green-800 dark:text-green-200 mb-1">💡 Pro Tip</p>
                  <p className="text-green-700 dark:text-green-300">
                    Complete coding lessons to earn XP for {petStats.name}!
                  </p>
                </div>
                <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                  <p className="font-medium text-blue-800 dark:text-blue-200 mb-1">⚡ Energy</p>
                  <p className="text-blue-700 dark:text-blue-300">
                    Playing drains energy but increases happiness. Let your pet rest when tired!
                  </p>
                </div>
                <div className="p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg border border-orange-200 dark:border-orange-800">
                  <p className="font-medium text-orange-800 dark:text-orange-200 mb-1">🍎 Feeding</p>
                  <p className="text-orange-700 dark:text-orange-300">
                    Feed your pet regularly to keep hunger levels up and maintain happiness.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Achievements */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Trophy className="w-5 h-5" />
                  <span>Achievements</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {achievements.map((achievement) => (
                  <div 
                    key={achievement.id}
                    className={`flex items-start space-x-3 p-3 rounded-lg border ${
                      achievement.unlocked 
                        ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800' 
                        : 'bg-muted/20 border-muted'
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      achievement.unlocked 
                        ? 'bg-green-500 text-white' 
                        : 'bg-muted text-muted-foreground'
                    }`}>
                      {achievement.icon}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-sm">{achievement.title}</p>
                      <p className="text-xs text-muted-foreground mb-1">{achievement.description}</p>
                      <Badge 
                        variant="outline" 
                        className={`text-xs ${
                          achievement.unlocked ? 'border-green-500 text-green-600' : ''
                        }`}
                      >
                        {achievement.reward}
                      </Badge>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Evolution Progress */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Sparkles className="w-5 h-5" />
                  <span>Evolution</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground mb-2">Current Stage</p>
                  <Badge variant="outline" className="capitalize text-lg px-4 py-2">
                    {petStats.evolutionStage}
                  </Badge>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progress to next stage</span>
                    <span>{petStats.level}/5</span>
                  </div>
                  <Progress value={(petStats.level / 5) * 100} className="h-2" />
                </div>

                <div className="bg-muted/20 rounded-lg p-3 text-center">
                  <p className="text-sm font-medium mb-1">Next Evolution</p>
                  <p className="text-xs text-muted-foreground">{getEvolutionRequirement()}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default VirtualPetPage;