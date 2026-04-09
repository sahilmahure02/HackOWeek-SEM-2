import { quizzes } from "../data/quizzes";

interface HomePageProps {
  onStartQuiz: (quizId: string) => void;
  bestScores: Record<string, number>;
}

const stats = [
  { label: "Quiz Categories", value: "4", icon: "📚" },
  { label: "Total Questions", value: "40+", icon: "❓" },
  { label: "Difficulty Levels", value: "3", icon: "🎯" },
  { label: "Instant Feedback", value: "✓", icon: "⚡" },
];

export default function HomePage({ onStartQuiz, bestScores }: HomePageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-950 to-slate-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full opacity-10 blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full opacity-10 blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-violet-500 rounded-full opacity-5 blur-3xl" />
        </div>

        <div className="relative max-w-6xl mx-auto px-4 pt-16 pb-12 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white/80 text-sm px-4 py-2 rounded-full mb-6 backdrop-blur-sm">
            <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
            Free MCQ Quiz Platform for Students
          </div>

          {/* Title */}
          <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-4 tracking-tight">
            Quiz
            <span className="bg-gradient-to-r from-violet-400 to-pink-400 bg-clip-text text-transparent">
              Master
            </span>
          </h1>
          <p className="text-xl text-white/60 max-w-2xl mx-auto mb-10">
            Challenge yourself with our curated MCQ quizzes. Track your progress,
            review explanations, and master any subject.
          </p>

          {/* Scroll indicator */}
          <div className="flex justify-center">
            <a
              href="#quizzes"
              className="inline-flex flex-col items-center gap-1 text-white/40 hover:text-white/70 transition-colors"
            >
              <span className="text-sm">Choose a quiz</span>
              <svg className="w-5 h-5 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="max-w-6xl mx-auto px-4 mb-14">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-white/5 border border-white/10 rounded-2xl p-5 text-center backdrop-blur-sm"
            >
              <div className="text-3xl mb-1">{stat.icon}</div>
              <div className="text-2xl font-bold text-white">{stat.value}</div>
              <div className="text-sm text-white/50">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Quiz Cards */}
      <div id="quizzes" className="max-w-6xl mx-auto px-4 pb-20">
        <h2 className="text-2xl font-bold text-white mb-2">Choose Your Quiz</h2>
        <p className="text-white/50 mb-8">Select a category and test your knowledge</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
          {quizzes.map((quiz) => {
            const best = bestScores[quiz.id];
            const bestPct = best !== undefined ? Math.round((best / quiz.totalQuestions) * 100) : null;

            return (
              <div
                key={quiz.id}
                className="group relative bg-white/5 border border-white/10 rounded-3xl p-6 hover:bg-white/10 hover:border-white/20 transition-all duration-300 cursor-pointer overflow-hidden"
                onClick={() => onStartQuiz(quiz.id)}
              >
                {/* Gradient glow on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${quiz.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300 rounded-3xl`} />

                <div className="relative flex items-start gap-5">
                  {/* Icon */}
                  <div className={`flex-shrink-0 w-16 h-16 rounded-2xl bg-gradient-to-br ${quiz.color} flex items-center justify-center text-3xl shadow-lg`}>
                    {quiz.icon}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-xl font-bold text-white group-hover:text-white transition-colors">
                        {quiz.title}
                      </h3>
                      {bestPct !== null && (
                        <span
                          className={`flex-shrink-0 text-xs font-bold px-2.5 py-1 rounded-full ${
                            bestPct >= 80
                              ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                              : bestPct >= 50
                              ? "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                              : "bg-rose-500/20 text-rose-400 border border-rose-500/30"
                          }`}
                        >
                          Best: {bestPct}%
                        </span>
                      )}
                    </div>
                    <p className="text-white/50 text-sm mt-1 mb-4">{quiz.description}</p>

                    {/* Meta */}
                    <div className="flex flex-wrap items-center gap-3 text-xs text-white/40">
                      <span className="flex items-center gap-1">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {quiz.totalQuestions} Questions
                      </span>
                      <span className="flex items-center gap-1">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {quiz.timeLimit / 60} min
                      </span>
                      <span className="flex items-center gap-1">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                        Mixed Difficulty
                      </span>
                    </div>
                  </div>
                </div>

                {/* Start Button */}
                <div className="relative mt-5">
                  <button
                    className={`w-full py-3 rounded-2xl bg-gradient-to-r ${quiz.color} text-white font-semibold text-sm tracking-wide shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-200`}
                  >
                    {best !== undefined ? "Retake Quiz" : "Start Quiz"} →
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-white/10 py-8 text-center text-white/30 text-sm">
        <p>QuizMaster © {new Date().getFullYear()} · Built for Students · All rights reserved</p>
      </div>
    </div>
  );
}
