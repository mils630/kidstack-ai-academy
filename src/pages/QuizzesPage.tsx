import { useState } from "react";
import { 
  ArrowLeft, 
  Clock, 
  CheckCircle, 
  XCircle,
  Sparkles,
  Trophy,
  Target,
  BookOpen,
  Zap,
  RefreshCw
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";

interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  code?: string;
  language: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "What will the following Python code output?",
    code: `def multiply(x, y=2):
    return x * y

print(multiply(5))`,
    options: ["5", "10", "25", "Error"],
    correctAnswer: 1,
    explanation: "The function multiply has a default parameter y=2. When called with only one argument (5), y uses its default value of 2, so 5 * 2 = 10.",
    language: "Python",
    difficulty: "beginner"
  },
  {
    id: 2,
    question: "Which JavaScript method adds an element to the end of an array?",
    options: ["push()", "pop()", "shift()", "unshift()"],
    correctAnswer: 0,
    explanation: "The push() method adds one or more elements to the end of an array and returns the new length of the array.",
    language: "JavaScript",
    difficulty: "beginner"
  },
  {
    id: 3,
    question: "In CSS, what does 'flex: 1' mean?",
    options: [
      "The element takes up 1px of space",
      "The element grows to fill available space",
      "The element shrinks by a factor of 1",
      "The element has a flex order of 1"
    ],
    correctAnswer: 1,
    explanation: "flex: 1 is shorthand for flex-grow: 1, flex-shrink: 1, flex-basis: 0. It means the element will grow to fill the available space in the flex container.",
    language: "CSS",
    difficulty: "intermediate"
  },
  {
    id: 4,
    question: "What SQL command is used to retrieve data from a database?",
    options: ["GET", "FETCH", "SELECT", "RETRIEVE"],
    correctAnswer: 2,
    explanation: "SELECT is the SQL command used to query and retrieve data from database tables. It's the most fundamental command for reading data.",
    language: "SQL",
    difficulty: "beginner"
  },
  {
    id: 5,
    question: "What is the main difference between supervised and unsupervised learning?",
    options: [
      "Supervised learning uses labeled data, unsupervised doesn't",
      "Supervised learning is faster than unsupervised learning", 
      "Supervised learning uses more data than unsupervised learning",
      "There is no difference between them"
    ],
    correctAnswer: 0,
    explanation: "Supervised learning uses labeled training data (input-output pairs) to learn patterns, while unsupervised learning finds patterns in data without labels.",
    language: "AI/ML",
    difficulty: "intermediate"
  }
];

const QuizzesPage = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: number }>({});
  const [showResults, setShowResults] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds
  const [isSubmitted, setIsSubmitted] = useState(false);

  const currentQuestion = quizQuestions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / quizQuestions.length) * 100;

  const handleAnswerSelect = (value: string) => {
    const answerIndex = parseInt(value);
    setSelectedAnswers({
      ...selectedAnswers,
      [currentQuestion.id]: answerIndex
    });
  };

  const handleNext = () => {
    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
    setShowResults(true);
  };

  const calculateScore = () => {
    let correct = 0;
    quizQuestions.forEach(question => {
      if (selectedAnswers[question.id] === question.correctAnswer) {
        correct++;
      }
    });
    return correct;
  };

  const startQuiz = () => {
    setQuizStarted(true);
    // Start timer countdown
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setShowResults(false);
    setQuizStarted(false);
    setTimeLeft(300);
    setIsSubmitted(false);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-500';
      case 'intermediate': return 'bg-yellow-500';
      case 'advanced': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getLanguageColor = (language: string) => {
    switch (language) {
      case 'Python': return 'learning-python';
      case 'JavaScript': return 'learning-javascript';
      case 'CSS': return 'learning-css';
      case 'SQL': return 'learning-sql';
      case 'AI/ML': return 'learning-ai';
      default: return 'learning-python';
    }
  };

  // Quiz Start Screen
  if (!quizStarted) {
    return (
      <div className="min-h-screen bg-background">
        <header className="bg-card border-b border-border p-4">
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <Link to="/student">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold">Programming Quiz</h1>
                <p className="text-sm text-muted-foreground">Test your coding knowledge</p>
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-2xl mx-auto p-6">
          <Card className="text-center gradient-card">
            <CardHeader>
              <div className="w-16 h-16 mx-auto mb-4 gradient-primary rounded-full flex items-center justify-center">
                <Target className="w-8 h-8 text-primary-foreground" />
              </div>
              <CardTitle className="text-2xl">Ready for the Challenge?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="bg-muted rounded-lg p-4">
                  <BookOpen className="w-6 h-6 mx-auto mb-2 text-primary" />
                  <p className="font-semibold">{quizQuestions.length} Questions</p>
                  <p className="text-muted-foreground">Mixed difficulty</p>
                </div>
                <div className="bg-muted rounded-lg p-4">
                  <Clock className="w-6 h-6 mx-auto mb-2 text-primary" />
                  <p className="font-semibold">5 Minutes</p>
                  <p className="text-muted-foreground">Time limit</p>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="font-semibold">Topics Covered:</h3>
                <div className="flex flex-wrap gap-2 justify-center">
                  <Badge variant="outline">Python</Badge>
                  <Badge variant="outline">JavaScript</Badge>
                  <Badge variant="outline">CSS</Badge>
                  <Badge variant="outline">SQL</Badge>
                  <Badge variant="outline">AI/ML</Badge>
                </div>
              </div>

              <div className="space-y-4">
                <div className="text-sm text-muted-foreground space-y-2">
                  <p>• Choose the best answer for each question</p>
                  <p>• You can navigate between questions</p>
                  <p>• Submit when you're ready or when time runs out</p>
                  <p>• Get instant feedback and explanations</p>
                </div>
                
                <Button onClick={startQuiz} size="lg" className="w-full" variant="default">
                  <Zap className="w-5 h-5 mr-2" />
                  Start Quiz
                </Button>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    );
  }

  // Results Screen
  if (showResults) {
    const score = calculateScore();
    const percentage = Math.round((score / quizQuestions.length) * 100);
    
    return (
      <div className="min-h-screen bg-background">
        <header className="bg-card border-b border-border p-4">
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <Link to="/student">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
            <div className="flex items-center space-x-2">
              <Trophy className="w-8 h-8 text-yellow-500" />
              <div>
                <h1 className="text-xl font-bold">Quiz Results</h1>
                <p className="text-sm text-muted-foreground">Your performance summary</p>
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-4xl mx-auto p-6">
          {/* Score Summary */}
          <Card className="mb-8 gradient-card">
            <CardContent className="text-center p-8">
              <Trophy className="w-16 h-16 mx-auto mb-4 text-yellow-500" />
              <h2 className="text-3xl font-bold mb-2">Quiz Complete! 🎉</h2>
              <div className="grid grid-cols-3 gap-8 mb-6">
                <div>
                  <p className="text-4xl font-bold text-primary">{score}/{quizQuestions.length}</p>
                  <p className="text-muted-foreground">Correct Answers</p>
                </div>
                <div>
                  <p className="text-4xl font-bold text-accent">{percentage}%</p>
                  <p className="text-muted-foreground">Score</p>
                </div>
                <div>
                  <p className="text-4xl font-bold text-secondary">+{score * 25}</p>
                  <p className="text-muted-foreground">XP Earned</p>
                </div>
              </div>
              
              <div className="flex justify-center space-x-4">
                <Button onClick={resetQuiz} variant="default">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Retake Quiz
                </Button>
                <Link to="/student">
                  <Button variant="outline">
                    Back to Dashboard
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Detailed Results */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold">Review Your Answers</h3>
            {quizQuestions.map((question, index) => {
              const userAnswer = selectedAnswers[question.id];
              const isCorrect = userAnswer === question.correctAnswer;
              
              return (
                <Card key={question.id} className={`border-l-4 ${isCorrect ? 'border-l-green-500' : 'border-l-red-500'}`}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <Badge variant="outline">Question {index + 1}</Badge>
                          <Badge variant="outline" className={`text-white ${getDifficultyColor(question.difficulty)}`}>
                            {question.difficulty}
                          </Badge>
                          <Badge variant="outline">{question.language}</Badge>
                        </div>
                        <CardTitle className="text-lg">{question.question}</CardTitle>
                        {question.code && (
                          <div className="mt-3 bg-muted rounded-lg p-3 border border-border">
                            <pre className="text-sm font-mono whitespace-pre-wrap overflow-x-auto">
                              <code>{question.code}</code>
                            </pre>
                          </div>
                        )}
                      </div>
                      <div className="flex items-center space-x-2">
                        {isCorrect ? (
                          <CheckCircle className="w-6 h-6 text-green-500" />
                        ) : (
                          <XCircle className="w-6 h-6 text-red-500" />
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="grid gap-2">
                        {question.options.map((option, optionIndex) => (
                          <div 
                            key={optionIndex} 
                            className={`p-3 rounded-lg border-2 ${
                              optionIndex === question.correctAnswer
                                ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                                : optionIndex === userAnswer && !isCorrect
                                ? 'border-red-500 bg-red-50 dark:bg-red-900/20'
                                : 'border-muted bg-muted/20'
                            }`}
                          >
                            <div className="flex items-center space-x-2">
                              <span className="font-mono text-sm bg-background px-2 py-1 rounded">
                                {String.fromCharCode(65 + optionIndex)}
                              </span>
                              <span>{option}</span>
                              {optionIndex === question.correctAnswer && (
                                <CheckCircle className="w-4 h-4 text-green-500 ml-auto" />
                              )}
                              {optionIndex === userAnswer && !isCorrect && (
                                <XCircle className="w-4 h-4 text-red-500 ml-auto" />
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      <div className="bg-muted/50 rounded-lg p-4 border border-border">
                        <div className="flex items-start space-x-2">
                          <BookOpen className="w-4 h-4 text-primary mt-1" />
                          <div>
                            <p className="font-semibold text-sm mb-1">Explanation:</p>
                            <p className="text-sm text-muted-foreground">{question.explanation}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </main>
      </div>
    );
  }

  // Quiz Interface
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border p-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center">
                <Target className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold">Programming Quiz</h1>
                <p className="text-sm text-muted-foreground">Question {currentQuestionIndex + 1} of {quizQuestions.length}</p>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sm">
              <Clock className={`w-4 h-4 ${timeLeft < 60 ? 'text-red-500' : 'text-primary'}`} />
              <span className={timeLeft < 60 ? 'text-red-500 font-bold' : 'font-medium'}>
                {formatTime(timeLeft)}
              </span>
            </div>
            <Badge variant="outline" className="gradient-primary text-primary-foreground">
              {Object.keys(selectedAnswers).length}/{quizQuestions.length} answered
            </Badge>
          </div>
        </div>
      </header>

      {/* Progress */}
      <div className="bg-muted/20 p-4">
        <div className="max-w-4xl mx-auto">
          <Progress value={progress} className="h-2" />
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto p-6">
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Badge variant="outline" className={`text-white ${getDifficultyColor(currentQuestion.difficulty)}`}>
                  {currentQuestion.difficulty}
                </Badge>
                <Badge variant="outline">
                  {currentQuestion.language}
                </Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h2 className="text-xl font-bold mb-4">{currentQuestion.question}</h2>
              
              {currentQuestion.code && (
                <div className="bg-muted rounded-lg p-4 border border-border mb-6">
                  <div className="flex items-center space-x-2 mb-2">
                    <BookOpen className="w-4 h-4 text-primary" />
                    <span className="text-sm font-medium">Code:</span>
                  </div>
                  <pre className="text-sm font-mono text-foreground whitespace-pre-wrap overflow-x-auto">
                    <code>{currentQuestion.code}</code>
                  </pre>
                </div>
              )}
            </div>

            <RadioGroup 
              value={selectedAnswers[currentQuestion.id]?.toString() || ""} 
              onValueChange={handleAnswerSelect}
            >
              {currentQuestion.options.map((option, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 rounded-lg border border-border hover:bg-muted/20 transition-colors">
                  <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                  <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                    <div className="flex items-center space-x-2">
                      <span className="font-mono text-sm bg-muted px-2 py-1 rounded">
                        {String.fromCharCode(65 + index)}
                      </span>
                      <span>{option}</span>
                    </div>
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentQuestionIndex === 0}
          >
            Previous
          </Button>

          <div className="flex items-center space-x-4">
            {currentQuestionIndex === quizQuestions.length - 1 ? (
              <Button 
                onClick={handleSubmit} 
                disabled={Object.keys(selectedAnswers).length === 0}
                variant="default"
              >
                Submit Quiz
              </Button>
            ) : (
              <Button
                variant="outline"
                onClick={handleNext}
              >
                Next
              </Button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default QuizzesPage;