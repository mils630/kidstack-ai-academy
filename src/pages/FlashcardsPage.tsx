import { useState } from "react";
import { 
  ArrowLeft, 
  RotateCcw, 
  ChevronLeft, 
  ChevronRight, 
  CheckCircle, 
  XCircle,
  Sparkles,
  Code2,
  Trophy,
  Target
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Link } from "react-router-dom";

interface Flashcard {
  id: number;
  question: string;
  answer: string;
  code?: string;
  language: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  category: string;
}

const flashcards: Flashcard[] = [
  {
    id: 1,
    question: "What is a Python function?",
    answer: "A function is a reusable block of code that performs a specific task. It can take parameters (inputs) and return a value (output).",
    code: `def greet(name):
    return f"Hello, {name}!"

# Call the function
message = greet("Alice")
print(message)  # Output: Hello, Alice!`,
    language: "Python",
    difficulty: "beginner",
    category: "Functions"
  },
  {
    id: 2,
    question: "What does the 'for' loop do in JavaScript?",
    answer: "A 'for' loop repeats a block of code a specified number of times. It consists of initialization, condition, and increment/decrement.",
    code: `// Print numbers 1 to 5
for (let i = 1; i <= 5; i++) {
    console.log(i);
}

// Output: 1, 2, 3, 4, 5`,
    language: "JavaScript",
    difficulty: "beginner",
    category: "Loops"
  },
  {
    id: 3,
    question: "What is the purpose of CSS flexbox?",
    answer: "Flexbox is a CSS layout method that makes it easy to arrange elements in a row or column, distribute space, and align items within a container.",
    code: `.container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
}

.item {
  flex: 1;
  margin: 10px;
}`,
    language: "CSS",
    difficulty: "intermediate",
    category: "Layout"
  },
  {
    id: 4,
    question: "What is a SQL JOIN?",
    answer: "A JOIN clause combines rows from two or more tables based on a related column between them. It allows you to retrieve data from multiple tables in a single query.",
    code: `SELECT users.name, orders.product
FROM users
INNER JOIN orders ON users.id = orders.user_id
WHERE orders.amount > 100;`,
    language: "SQL",
    difficulty: "intermediate",
    category: "Queries"
  },
  {
    id: 5,
    question: "What is Machine Learning?",
    answer: "Machine Learning is a type of AI that enables computers to learn and make decisions from data without being explicitly programmed for every task.",
    code: `# Simple example using Python
from sklearn.linear_model import LinearRegression
import numpy as np

# Training data
X = np.array([[1], [2], [3], [4]])
y = np.array([2, 4, 6, 8])

# Create and train model
model = LinearRegression()
model.fit(X, y)

# Make prediction
prediction = model.predict([[5]])
print(f"Prediction: {prediction[0]}")  # Output: 10`,
    language: "AI/ML",
    difficulty: "advanced",
    category: "Concepts"
  }
];

const FlashcardsPage = () => {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);
  const [completedCards, setCompletedCards] = useState<number[]>([]);

  const currentCard = flashcards[currentCardIndex];
  const progress = ((correctCount + incorrectCount) / flashcards.length) * 100;
  const accuracy = correctCount > 0 ? Math.round((correctCount / (correctCount + incorrectCount)) * 100) : 0;

  const handleCardFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleAnswer = (correct: boolean) => {
    if (!completedCards.includes(currentCard.id)) {
      if (correct) {
        setCorrectCount(correctCount + 1);
      } else {
        setIncorrectCount(incorrectCount + 1);
      }
      setCompletedCards([...completedCards, currentCard.id]);
    }
    
    // Move to next card
    if (currentCardIndex < flashcards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
      setIsFlipped(false);
    }
  };

  const goToNextCard = () => {
    if (currentCardIndex < flashcards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
      setIsFlipped(false);
    }
  };

  const goToPrevCard = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(currentCardIndex - 1);
      setIsFlipped(false);
    }
  };

  const resetSession = () => {
    setCurrentCardIndex(0);
    setIsFlipped(false);
    setCorrectCount(0);
    setIncorrectCount(0);
    setCompletedCards([]);
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
                <Sparkles className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold">Flashcards</h1>
                <p className="text-sm text-muted-foreground">Master coding concepts</p>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="text-right text-sm">
              <p className="font-semibold">Progress: {Math.round(progress)}%</p>
              <p className="text-muted-foreground">Accuracy: {accuracy}%</p>
            </div>
            <Button variant="outline" size="sm" onClick={resetSession}>
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto p-6">
        {/* Progress Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="gradient-primary text-primary-foreground">
                Card {currentCardIndex + 1} of {flashcards.length}
              </Badge>
              <Badge variant="outline" className={`text-white ${getDifficultyColor(currentCard.difficulty)}`}>
                {currentCard.difficulty}
              </Badge>
              <Badge variant="outline">
                {currentCard.language}
              </Badge>
              <Badge variant="outline">
                {currentCard.category}
              </Badge>
            </div>
            <div className="flex items-center space-x-6 text-sm">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>{correctCount} Correct</span>
              </div>
              <div className="flex items-center space-x-2">
                <XCircle className="w-4 h-4 text-red-500" />
                <span>{incorrectCount} Incorrect</span>
              </div>
            </div>
          </div>
          <Progress value={progress} className="h-3" />
        </div>

        {/* Flashcard */}
        <div className="mb-8">
          <Card 
            className="w-full h-96 cursor-pointer transition-transform hover-scale relative shadow-glow"
            onClick={handleCardFlip}
          >
            <CardContent className="h-full p-8 flex flex-col justify-center">
              {!isFlipped ? (
                // Question Side
                <div className="text-center space-y-6">
                  <div className="flex items-center justify-center space-x-2 mb-4">
                    <Code2 className={`w-6 h-6 text-${getLanguageColor(currentCard.language)}`} />
                    <Badge variant="outline" className="gradient-secondary text-secondary-foreground">
                      Question
                    </Badge>
                  </div>
                  <h2 className="text-2xl font-bold mb-4">{currentCard.question}</h2>
                  <p className="text-muted-foreground">Click to reveal answer</p>
                  <div className="animate-pulse">
                    <Target className="w-8 h-8 mx-auto text-primary" />
                  </div>
                </div>
              ) : (
                // Answer Side
                <div className="space-y-6">
                  <div className="flex items-center justify-center space-x-2 mb-4">
                    <Trophy className="w-6 h-6 text-yellow-500" />
                    <Badge variant="outline" className="gradient-accent text-accent-foreground">
                      Answer
                    </Badge>
                  </div>
                  
                  <div className="space-y-4">
                    <p className="text-lg leading-relaxed">{currentCard.answer}</p>
                    
                    {currentCard.code && (
                      <div className="bg-muted rounded-lg p-4 border border-border">
                        <div className="flex items-center space-x-2 mb-2">
                          <Code2 className="w-4 h-4 text-primary" />
                          <span className="text-sm font-medium">Code Example:</span>
                        </div>
                        <pre className="text-sm font-mono text-foreground whitespace-pre-wrap overflow-x-auto">
                          <code>{currentCard.code}</code>
                        </pre>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            onClick={goToPrevCard}
            disabled={currentCardIndex === 0}
            className="flex items-center space-x-2"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous</span>
          </Button>

          {isFlipped && !completedCards.includes(currentCard.id) && (
            <div className="flex items-center space-x-4">
              <Button
                variant="destructive"
                onClick={() => handleAnswer(false)}
                className="flex items-center space-x-2"
              >
                <XCircle className="w-4 h-4" />
                <span>Incorrect</span>
              </Button>
              <Button
                variant="default"
                onClick={() => handleAnswer(true)}
                className="flex items-center space-x-2"
              >
                <CheckCircle className="w-4 h-4" />
                <span>Correct</span>
              </Button>
            </div>
          )}

          {isFlipped && completedCards.includes(currentCard.id) && (
            <Badge variant="outline" className="gradient-accent text-accent-foreground">
              Already answered
            </Badge>
          )}

          <Button
            variant="outline"
            onClick={goToNextCard}
            disabled={currentCardIndex === flashcards.length - 1}
            className="flex items-center space-x-2"
          >
            <span>Next</span>
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>

        {/* Session Complete */}
        {correctCount + incorrectCount === flashcards.length && (
          <Card className="mt-8 gradient-card">
            <CardContent className="text-center p-8">
              <Trophy className="w-16 h-16 mx-auto mb-4 text-yellow-500" />
              <h2 className="text-2xl font-bold mb-4">Session Complete! 🎉</h2>
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div>
                  <p className="text-2xl font-bold text-green-500">{correctCount}</p>
                  <p className="text-sm text-muted-foreground">Correct</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-red-500">{incorrectCount}</p>
                  <p className="text-sm text-muted-foreground">Incorrect</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-primary">{accuracy}%</p>
                  <p className="text-sm text-muted-foreground">Accuracy</p>
                </div>
              </div>
              <div className="flex justify-center space-x-4">
                <Button onClick={resetSession} variant="default">
                  Study Again
                </Button>
                <Link to="/student">
                  <Button variant="outline">
                    Back to Dashboard
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
};

export default FlashcardsPage;