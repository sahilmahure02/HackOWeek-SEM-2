import { motion } from 'framer-motion';
import { ClipboardList, Search, CheckCircle2 } from 'lucide-react';
import type { FilterStatus } from '../types';

interface EmptyStateProps {
  filterStatus: FilterStatus;
  hasSearch: boolean;
  onAddClick: () => void;
}

export default function EmptyState({ filterStatus, hasSearch, onAddClick }: EmptyStateProps) {
  if (hasSearch) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-16"
      >
        <div className="w-20 h-20 mx-auto mb-4 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
          <Search size={32} className="text-gray-400" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
          No results found
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Try adjusting your search or filters
        </p>
      </motion.div>
    );
  }

  if (filterStatus === 'completed') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-16"
      >
        <div className="w-20 h-20 mx-auto mb-4 bg-emerald-50 dark:bg-emerald-950 rounded-full flex items-center justify-center">
          <CheckCircle2 size={32} className="text-emerald-400" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
          No completed tasks yet
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Complete some tasks to see them here
        </p>
      </motion.div>
    );
  }

  if (filterStatus === 'active') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-16"
      >
        <div className="text-6xl mb-4">🎉</div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
          All caught up!
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          You've completed all your tasks. Great job!
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center py-16"
    >
      <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-950 dark:to-purple-950 rounded-3xl flex items-center justify-center">
        <ClipboardList size={40} className="text-indigo-500" />
      </div>
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
        Start your productive day
      </h3>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-6 max-w-xs mx-auto">
        Add your first task and take control of your day. Every big achievement starts with a small step.
      </p>
      <button
        onClick={onAddClick}
        className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-indigo-200 dark:hover:shadow-indigo-950 transition-all"
      >
        + Add Your First Task
      </button>
    </motion.div>
  );
}
