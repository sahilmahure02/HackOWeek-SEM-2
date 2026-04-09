import { motion } from 'framer-motion';
import { CheckCircle2, Clock, AlertTriangle, ListTodo } from 'lucide-react';

interface HeaderProps {
  stats: {
    total: number;
    completed: number;
    active: number;
    overdue: number;
    progress: number;
  };
}

export default function Header({ stats }: HeaderProps) {
  const greeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-8"
    >
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white tracking-tight">
            {greeting()} 👋
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1 text-sm md:text-base">{today}</p>
        </div>
        {stats.total > 0 && (
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-xs text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wider">
                Progress
              </p>
              <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                {stats.progress}%
              </p>
            </div>
            <div className="w-24 h-24 relative">
              <svg className="w-24 h-24 -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="8"
                  className="text-gray-200 dark:text-gray-700"
                />
                <motion.circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="url(#progress-gradient)"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={`${stats.progress * 2.51} 251`}
                  initial={{ strokeDasharray: '0 251' }}
                  animate={{ strokeDasharray: `${stats.progress * 2.51} 251` }}
                  transition={{ duration: 1, ease: 'easeOut' }}
                />
                <defs>
                  <linearGradient id="progress-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#6366f1" />
                    <stop offset="100%" stopColor="#8b5cf6" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xs font-semibold text-gray-600 dark:text-gray-300">
                  {stats.completed}/{stats.total}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <StatCard
          icon={<ListTodo size={20} />}
          label="Total Tasks"
          value={stats.total}
          color="bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-400"
          iconBg="bg-blue-100 dark:bg-blue-900"
          delay={0.1}
        />
        <StatCard
          icon={<Clock size={20} />}
          label="In Progress"
          value={stats.active}
          color="bg-amber-50 text-amber-600 dark:bg-amber-950 dark:text-amber-400"
          iconBg="bg-amber-100 dark:bg-amber-900"
          delay={0.2}
        />
        <StatCard
          icon={<CheckCircle2 size={20} />}
          label="Completed"
          value={stats.completed}
          color="bg-emerald-50 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400"
          iconBg="bg-emerald-100 dark:bg-emerald-900"
          delay={0.3}
        />
        <StatCard
          icon={<AlertTriangle size={20} />}
          label="Overdue"
          value={stats.overdue}
          color="bg-red-50 text-red-600 dark:bg-red-950 dark:text-red-400"
          iconBg="bg-red-100 dark:bg-red-900"
          delay={0.4}
        />
      </div>
    </motion.div>
  );
}

function StatCard({
  icon,
  label,
  value,
  color,
  iconBg,
  delay,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
  color: string;
  iconBg: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className={`${color} rounded-2xl p-4 border border-white/20`}
    >
      <div className="flex items-center gap-3">
        <div className={`${iconBg} p-2 rounded-xl`}>{icon}</div>
        <div>
          <p className="text-2xl font-bold">{value}</p>
          <p className="text-xs font-medium opacity-75">{label}</p>
        </div>
      </div>
    </motion.div>
  );
}
