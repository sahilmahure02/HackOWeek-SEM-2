import { useEffect, useState, useCallback } from "react";
import { Quiz } from "../data/quizzes";
import { QuizResult } from "../types";

interface QuizPageProps {
  quiz: Quiz;
  onFinish: (result: QuizResult) => void;
  onBack: () => void;
}

const difficultyColors: Record<string, string> = {
  easy: "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30",
  medium: "bg-amber-500/20 text-amber-400 border border-amber-500/30",
  hard: "bg-rose-500/20 text-rose-400 border border-rose-500/30",
};

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export default function QuizPage({ quiz, onFinish, onBack }: QuizPageProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [timeLeft, setTimeLeft] = useState(quiz.timeLimit);
  const [startTime] = useState(Date.now());
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const question = quiz.questions[currentQuestion];
  const totalQuestions = quiz.questions.length;
  const progress = ((currentQuestion + 1) / totalQuestions) * 100;

  const submitQuiz = useCallback(
    (finalAnswers: Record<number, string>) => {
      const timeTaken = Math.round((Date.now() - startTime) / 1000);
      let score = 0;
      quiz.questions.forEach((q, i) => {
        if (finalAnswers[i] === q.correctAnswer) score++;
      });
      const result: QuizResult = {
        quizId: quiz.id,
        score,
        total: totalQuestions,
        percentage: Math.round((score / totalQuestions) * 100),
        timeTaken,
        answers: finalAnswers,
        date: new Date(),
      };
      onFinish(result);
    },
    [quiz, totalQuestions, startTime, onFinish]
  );

  // Timer
  useEffect(() => {
    if (timeLeft <= 0) {
      submitQuiz(answers);
      return;
    }
    const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft, answers, submitQuiz]);

  const handleOptionSelect = (optionId: string) => {
    if (showFeedback) return;
    setSelectedOption(optionId);
  };

  const handleNext = () => {
    if (selectedOption === null && !answers[currentQuestion]) return;

    const option = selectedOption ?? answers[currentQuestion];
    const newAnswers = { ...answers, [currentQuestion]: option };
    setAnswers(newAnswers);
    setShowFeedback(true);

    setTimeout(() => {
      setIsAnimating(true);
      setTimeout(() => {
        if (currentQuestion < totalQuestions - 1) {
          setCurrentQuestion((q) => q + 1);
          setSelectedOption(null);
          setShowFeedback(false);
          setIsAnimating(false);
        } else {
          submitQuiz(newAnswers);
        }
      }, 300);
    }, 800);
  };

  const handleSkip = () => {
    const newAnswers = { ...answers };
    delete newAnswers[currentQuestion];
    setAnswers(newAnswers);
    if (currentQuestion < totalQuestions - 1) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentQuestion((q) => q + 1);
        setSelectedOption(null);
        setShowFeedback(false);
        setIsAnimating(false);
      }, 300);
    } else {
      submitQuiz(newAnswers);
    }
  };

  const timerWarning = timeLeft <= 60;
  const timerCritical = timeLeft <= 30;

  const currentAnswer = selectedOption ?? answers[currentQuestion] ?? null;
  const isCorrect = currentAnswer === question.correctAnswer;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-950 to-slate-900 flex flex-col">
      {/* Header */}
      <header className="border-b border-white/10 bg-white/5 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between">
          {/* Back */}
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-white/60 hover:text-white transition-colors text-sm"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Exit Quiz
          </button>

          {/* Title */}
          <div className="flex items-center gap-2">
            <span className="text-lg">{quiz.icon}</span>
            <span className="text-white font-semibold hidden sm:block">{quiz.title}</span>
          </div>

          {/* Timer */}
          <div
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full font-mono font-bold text-sm transition-all ${
              timerCritical
                ? "bg-rose-500/30 text-rose-400 border border-rose-500/50 animate-pulse"
                : timerWarning
                ? "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                : "bg-white/10 text-white/70 border border-white/10"
            }`}
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {formatTime(timeLeft)}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="h-1 bg-white/10">
          <div
            className={`h-full bg-gradient-to-r ${quiz.color} transition-all duration-500`}
            style={{ width: `${progress}%` }}
          />
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-4 py-8">
        <div
          className={`w-full max-w-2xl transition-all duration-300 ${
            isAnimating ? "opacity-0 translate-x-4" : "opacity-100 translate-x-0"
          }`}
        >
          {/* Question Counter */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="text-white/40 text-sm">
                Question{" "}
                <span className="text-white font-bold">{currentQuestion + 1}</span>{" "}
                of {totalQuestions}
              </span>
            </div>
            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${difficultyColors[question.difficulty]}`}>
              {question.difficulty.charAt(0).toUpperCase() + question.difficulty.slice(1)}
            </span>
          </div>

          {/* Question Dots */}
          <div className="flex gap-1.5 mb-6 flex-wrap">
            {quiz.questions.map((_, i) => (
              <div
                key={i}
                className={`h-1.5 flex-1 min-w-[12px] rounded-full transition-all duration-300 ${
                  i < currentQuestion
                    ? answers[i] === quiz.questions[i].correctAnswer
                      ? "bg-emerald-400"
                      : answers[i]
                      ? "bg-rose-400"
                      : "bg-white/20"
                    : i === currentQuestion
                    ? `bg-gradient-to-r ${quiz.color}`
                    : "bg-white/10"
                }`}
              />
            ))}
          </div>

          {/* Question Card */}
          <div className="bg-white/5 border border-white/10 rounded-3xl p-6 md:p-8 mb-5">
            <p className="text-xl md:text-2xl font-semibold text-white leading-relaxed">
              {question.question}
            </p>
          </div>

          {/* Options */}
          <div className="space-y-3 mb-6">
            {question.options.map((option) => {
              const isSelected = currentAnswer === option.id;
              const isCorrectOption = option.id === question.correctAnswer;

              let optionStyle =
                "bg-white/5 border-white/10 text-white/80 hover:bg-white/10 hover:border-white/20 cursor-pointer";

              if (showFeedback) {
                if (isCorrectOption) {
                  optionStyle = "bg-emerald-500/20 border-emerald-400/50 text-emerald-300 cursor-default";
                } else if (isSelected && !isCorrectOption) {
                  optionStyle = "bg-rose-500/20 border-rose-400/50 text-rose-300 cursor-default";
                } else {
                  optionStyle = "bg-white/5 border-white/10 text-white/40 cursor-default";
                }
              } else if (isSelected) {
                optionStyle = `bg-gradient-to-r ${quiz.color} border-transparent text-white cursor-pointer shadow-lg`;
              }

              return (
                <button
                  key={option.id}
                  onClick={() => handleOptionSelect(option.id)}
                  disabled={showFeedback}
                  className={`w-full flex items-center gap-4 p-4 rounded-2xl border transition-all duration-200 text-left group ${optionStyle}`}
                >
                  {/* Letter Badge */}
                  <span
                    className={`flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center font-bold text-sm transition-all ${
                      showFeedback
                        ? isCorrectOption
                          ? "bg-emerald-400 text-white"
                          : isSelected
                          ? "bg-rose-400 text-white"
                          : "bg-white/10 text-white/30"
                        : isSelected
                        ? "bg-white/20 text-white"
                        : "bg-white/10 text-white/50 group-hover:bg-white/20"
                    }`}
                  >
                    {option.id.toUpperCase()}
                  </span>

                  <span className="flex-1 font-medium">{option.text}</span>

                  {/* Feedback Icon */}
                  {showFeedback && isCorrectOption && (
                    <svg className="w-5 h-5 text-emerald-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  )}
                  {showFeedback && isSelected && !isCorrectOption && (
                    <svg className="w-5 h-5 text-rose-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  )}
                </button>
              );
            })}
          </div>

          {/* Explanation */}
          {showFeedback && (
            <div
              className={`p-4 rounded-2xl mb-5 flex items-start gap-3 transition-all ${
                isCorrect
                  ? "bg-emerald-500/10 border border-emerald-500/20"
                  : "bg-rose-500/10 border border-rose-500/20"
              }`}
            >
              <span className="text-xl flex-shrink-0">{isCorrect ? "✅" : "💡"}</span>
              <div>
                <p className={`font-semibold text-sm mb-1 ${isCorrect ? "text-emerald-400" : "text-rose-400"}`}>
                  {isCorrect ? "Correct!" : "Not quite right"}
                </p>
                <p className="text-white/70 text-sm">{question.explanation}</p>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3">
            {!showFeedback && (
              <button
                onClick={handleSkip}
                className="px-5 py-3 rounded-2xl border border-white/10 text-white/40 hover:text-white/70 hover:border-white/20 text-sm font-medium transition-all"
              >
                Skip
              </button>
            )}
            <button
              onClick={handleNext}
              disabled={currentAnswer === null}
              className={`flex-1 py-3 rounded-2xl font-semibold text-sm tracking-wide transition-all duration-200 ${
                currentAnswer !== null
                  ? `bg-gradient-to-r ${quiz.color} text-white shadow-lg hover:shadow-xl hover:scale-[1.01] active:scale-[0.99]`
                  : "bg-white/10 text-white/30 cursor-not-allowed"
              }`}
            >
              {currentQuestion < totalQuestions - 1
                ? showFeedback
                  ? "Next Question →"
                  : "Confirm Answer"
                : showFeedback
                ? "Finish Quiz 🎉"
                : "Confirm Answer"}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
