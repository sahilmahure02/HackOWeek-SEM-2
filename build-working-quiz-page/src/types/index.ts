export type AppScreen = "home" | "quiz-select" | "quiz" | "results";

export interface QuizState {
  currentQuestion: number;
  answers: Record<number, string>;
  timeLeft: number;
  isFinished: boolean;
  reviewMode: boolean;
}

export interface QuizResult {
  quizId: string;
  score: number;
  total: number;
  percentage: number;
  timeTaken: number;
  answers: Record<number, string>;
  date: Date;
}
