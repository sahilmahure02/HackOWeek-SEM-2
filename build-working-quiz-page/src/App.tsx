import { useState, useCallback } from "react";
import HomePage from "./components/HomePage";
import QuizPage from "./components/QuizPage";
import ResultsPage from "./components/ResultsPage";
import { quizzes } from "./data/quizzes";
import { QuizResult } from "./types";

type Screen = "home" | "quiz" | "results";

export default function App() {
  const [screen, setScreen] = useState<Screen>("home");
  const [activeQuizId, setActiveQuizId] = useState<string | null>(null);
  const [latestResult, setLatestResult] = useState<QuizResult | null>(null);
  const [bestScores, setBestScores] = useState<Record<string, number>>({});

  const activeQuiz = activeQuizId ? quizzes.find((q) => q.id === activeQuizId) ?? null : null;

  const handleStartQuiz = useCallback((quizId: string) => {
    setActiveQuizId(quizId);
    setLatestResult(null);
    setScreen("quiz");
  }, []);

  const handleFinishQuiz = useCallback((result: QuizResult) => {
    setLatestResult(result);
    setBestScores((prev) => {
      const prevScore = prev[result.quizId] ?? 0;
      if (result.score > prevScore) {
        return { ...prev, [result.quizId]: result.score };
      }
      return prev;
    });
    setScreen("results");
  }, []);

  const handleRetake = useCallback(() => {
    if (activeQuizId) {
      setLatestResult(null);
      setScreen("quiz");
    }
  }, [activeQuizId]);

  const handleGoHome = useCallback(() => {
    setActiveQuizId(null);
    setLatestResult(null);
    setScreen("home");
  }, []);

  if (screen === "quiz" && activeQuiz) {
    return (
      <QuizPage
        key={`${activeQuiz.id}-${Date.now()}`}
        quiz={activeQuiz}
        onFinish={handleFinishQuiz}
        onBack={handleGoHome}
      />
    );
  }

  if (screen === "results" && activeQuiz && latestResult) {
    return (
      <ResultsPage
        quiz={activeQuiz}
        result={latestResult}
        onRetake={handleRetake}
        onHome={handleGoHome}
      />
    );
  }

  return <HomePage onStartQuiz={handleStartQuiz} bestScores={bestScores} />;
}
