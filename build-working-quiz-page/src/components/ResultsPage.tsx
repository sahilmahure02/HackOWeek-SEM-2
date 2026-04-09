import { useState } from "react";
import { Quiz } from "../data/quizzes";
import { QuizResult } from "../types";

interface ResultsPageProps {
  quiz: Quiz;
  result: QuizResult;
  onRetake: () => void;
  onHome: () => void;
}

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  if (m === 0) return `${s}s`;
  return `${m}m ${s}s`;
}

function getGrade(pct: number) {
  if (pct >= 90) return { grade: "A+", label: "Outstanding!", color: "text-emerald-400", emoji: "🏆" };
  if (pct >= 80) return { grade: "A", label: "Excellent!", color: "text-emerald-400", emoji: "🌟" };
  if (pct >= 70) return { grade: "B", label: "Good Job!", color: "text-sky-400", emoji: "👍" };
  if (pct >= 60) return { grade: "C", label: "Keep Practicing", color: "text-amber-400", emoji: "📚" };
  if (pct >= 50) return { grade: "D", label: "Needs Work", color: "text-orange-400", emoji: "💪" };
  return { grade: "F", label: "Keep Trying!", color: "text-rose-400", emoji: "🔄" };
}

export default function ResultsPage({ quiz, result, onRetake, onHome }: ResultsPageProps) {
  const [showReview, setShowReview] = useState(false);
  const [reviewFilter, setReviewFilter] = useState<"all" | "correct" | "wrong" | "skipped">("all");

  const gradeInfo = getGrade(result.percentage);

  const filteredQuestions = quiz.questions.filter((q, i) => {
    const userAnswer = result.answers[i];
    const isCorrect = userAnswer === q.correctAnswer;
    const isSkipped = userAnswer === undefined;

    if (reviewFilter === "correct") return isCorrect;
    if (reviewFilter === "wrong") return !isCorrect && !isSkipped;
    if (reviewFilter === "skipped") return isSkipped;
    return true;
  });

  const correctCount = quiz.questions.filter((q, i) => result.answers[i] === q.correctAnswer).length;
  const wrongCount = quiz.questions.filter((q, i) => result.answers[i] !== undefined && result.answers[i] !== q.correctAnswer).length;
  const skippedCount = quiz.questions.filter((_, i) => result.answers[i] === undefined).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-950 to-slate-900 pb-16">
      {/* Header */}
      <header className="border-b border-white/10 bg-white/5 backdrop-blur-sm">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
          <button onClick={onHome} className="flex items-center gap-2 text-white/60 hover:text-white transition-colors text-sm">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Home
          </button>
          <span className="text-white font-semibold flex items-center gap-2">
            <span>{quiz.icon}</span> Quiz Results
          </span>
          <button
            onClick={onRetake}
            className="text-sm text-white/60 hover:text-white transition-colors flex items-center gap-1"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Retake
          </button>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-4 pt-10">
        {/* Score Hero */}
        <div className="text-center mb-8">
          <div className="text-6xl mb-3">{gradeInfo.emoji}</div>
          <h1 className="text-4xl font-extrabold text-white mb-1">{gradeInfo.label}</h1>
          <p className="text-white/50 mb-6">{quiz.title} · Completed</p>

          {/* Big Score Circle */}
          <div className="relative inline-flex items-center justify-center w-40 h-40 mx-auto mb-6">
            <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 160 160">
              <circle cx="80" cy="80" r="70" fill="none" stroke="white" strokeOpacity="0.08" strokeWidth="12" />
              <circle
                cx="80"
                cy="80"
                r="70"
                fill="none"
                stroke="url(#scoreGrad)"
                strokeWidth="12"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 70}`}
                strokeDashoffset={`${2 * Math.PI * 70 * (1 - result.percentage / 100)}`}
                className="transition-all duration-1000"
              />
              <defs>
                <linearGradient id="scoreGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#8b5cf6" />
                  <stop offset="100%" stopColor="#ec4899" />
                </linearGradient>
              </defs>
            </svg>
            <div className="text-center">
              <p className="text-4xl font-black text-white">{result.percentage}%</p>
              <p className={`text-lg font-bold ${gradeInfo.color}`}>{gradeInfo.grade}</p>
            </div>
          </div>

          <p className="text-white/60 text-lg">
            You scored <span className="text-white font-bold">{result.score}</span> out of{" "}
            <span className="text-white font-bold">{result.total}</span>
          </p>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-4 text-center">
            <p className="text-3xl font-bold text-emerald-400">{correctCount}</p>
            <p className="text-xs text-white/50 mt-1">Correct</p>
          </div>
          <div className="bg-rose-500/10 border border-rose-500/20 rounded-2xl p-4 text-center">
            <p className="text-3xl font-bold text-rose-400">{wrongCount}</p>
            <p className="text-xs text-white/50 mt-1">Wrong</p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center">
            <p className="text-3xl font-bold text-white/60">{skippedCount}</p>
            <p className="text-xs text-white/50 mt-1">Skipped</p>
          </div>
        </div>

        {/* Additional Stats */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-5 mb-8 grid grid-cols-2 gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-lg">⏱️</div>
            <div>
              <p className="text-white font-semibold">{formatTime(result.timeTaken)}</p>
              <p className="text-white/40 text-xs">Time Taken</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-lg">🎯</div>
            <div>
              <p className="text-white font-semibold">{Math.round(result.timeTaken / result.total)}s avg</p>
              <p className="text-white/40 text-xs">Per Question</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-lg">📊</div>
            <div>
              <p className="text-white font-semibold">{result.percentage}%</p>
              <p className="text-white/40 text-xs">Accuracy Rate</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-lg">📅</div>
            <div>
              <p className="text-white font-semibold">{result.date.toLocaleDateString()}</p>
              <p className="text-white/40 text-xs">Date Taken</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 mb-8">
          <button
            onClick={onRetake}
            className={`flex-1 py-4 rounded-2xl bg-gradient-to-r ${quiz.color} text-white font-bold text-sm shadow-lg hover:shadow-xl hover:scale-[1.01] active:scale-[0.99] transition-all`}
          >
            🔄 Retake Quiz
          </button>
          <button
            onClick={onHome}
            className="flex-1 py-4 rounded-2xl bg-white/10 border border-white/10 text-white font-bold text-sm hover:bg-white/15 transition-all"
          >
            🏠 Home
          </button>
        </div>

        {/* Review Section */}
        <div className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden">
          <button
            onClick={() => setShowReview(!showReview)}
            className="w-full flex items-center justify-between p-5 hover:bg-white/5 transition-colors"
          >
            <span className="text-white font-semibold flex items-center gap-2">
              📋 Review Answers
            </span>
            <svg
              className={`w-5 h-5 text-white/40 transition-transform duration-300 ${showReview ? "rotate-180" : ""}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {showReview && (
            <div className="px-5 pb-5">
              {/* Filter Tabs */}
              <div className="flex gap-2 mb-5 flex-wrap">
                {(["all", "correct", "wrong", "skipped"] as const).map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setReviewFilter(filter)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      reviewFilter === filter
                        ? "bg-violet-500 text-white"
                        : "bg-white/10 text-white/50 hover:text-white hover:bg-white/15"
                    }`}
                  >
                    {filter === "all" ? `All (${quiz.questions.length})` : ""}
                    {filter === "correct" ? `Correct (${correctCount})` : ""}
                    {filter === "wrong" ? `Wrong (${wrongCount})` : ""}
                    {filter === "skipped" ? `Skipped (${skippedCount})` : ""}
                  </button>
                ))}
              </div>

              {/* Questions Review */}
              <div className="space-y-4">
                {filteredQuestions.map((q) => {
                  const qIndex = quiz.questions.indexOf(q);
                  const userAnswer = result.answers[qIndex];
                  const isCorrect = userAnswer === q.correctAnswer;
                  const isSkipped = userAnswer === undefined;

                  return (
                    <div
                      key={q.id}
                      className={`rounded-2xl p-4 border ${
                        isSkipped
                          ? "bg-white/5 border-white/10"
                          : isCorrect
                          ? "bg-emerald-500/10 border-emerald-500/20"
                          : "bg-rose-500/10 border-rose-500/20"
                      }`}
                    >
                      {/* Question Header */}
                      <div className="flex items-start gap-3 mb-3">
                        <span
                          className={`flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold ${
                            isSkipped
                              ? "bg-white/10 text-white/40"
                              : isCorrect
                              ? "bg-emerald-500 text-white"
                              : "bg-rose-500 text-white"
                          }`}
                        >
                          {qIndex + 1}
                        </span>
                        <p className="text-white/90 text-sm font-medium leading-relaxed flex-1">{q.question}</p>
                      </div>

                      {/* Options Review */}
                      <div className="space-y-2 ml-10">
                        {q.options.map((opt) => {
                          const isUserChoice = opt.id === userAnswer;
                          const isCorrectOpt = opt.id === q.correctAnswer;

                          let optStyle = "bg-white/5 text-white/40";
                          if (isCorrectOpt) optStyle = "bg-emerald-500/20 text-emerald-300 font-medium";
                          if (isUserChoice && !isCorrectOpt) optStyle = "bg-rose-500/20 text-rose-300 line-through";

                          return (
                            <div key={opt.id} className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm ${optStyle}`}>
                              <span className="font-bold text-xs w-4">{opt.id.toUpperCase()}.</span>
                              <span>{opt.text}</span>
                              {isCorrectOpt && <span className="ml-auto text-emerald-400">✓</span>}
                              {isUserChoice && !isCorrectOpt && <span className="ml-auto text-rose-400">✗</span>}
                            </div>
                          );
                        })}
                      </div>

                      {/* Explanation */}
                      <div className="mt-3 ml-10 p-3 bg-white/5 rounded-xl">
                        <p className="text-white/50 text-xs leading-relaxed">
                          <span className="text-white/70 font-semibold">💡 Explanation: </span>
                          {q.explanation}
                        </p>
                      </div>
                    </div>
                  );
                })}

                {filteredQuestions.length === 0 && (
                  <div className="text-center py-8 text-white/30">
                    <p className="text-4xl mb-2">🎉</p>
                    <p>No questions in this category!</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
