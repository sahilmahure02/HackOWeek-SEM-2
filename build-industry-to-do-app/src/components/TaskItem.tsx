import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Check,
  Trash2,
  Edit3,
  Calendar,
  Clock,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import type { Task, Priority, Category } from '../types';

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (task: Task) => void;
}

const priorityConfig: Record<Priority, { color: string; bg: string; label: string; dot: string }> = {
  urgent: { color: 'text-red-600', bg: 'bg-red-50 dark:bg-red-950', label: 'Urgent', dot: 'bg-red-500' },
  high: { color: 'text-orange-600', bg: 'bg-orange-50 dark:bg-orange-950', label: 'High', dot: 'bg-orange-500' },
  medium: { color: 'text-yellow-600', bg: 'bg-yellow-50 dark:bg-yellow-950', label: 'Medium', dot: 'bg-yellow-500' },
  low: { color: 'text-green-600', bg: 'bg-green-50 dark:bg-green-950', label: 'Low', dot: 'bg-green-500' },
};

const categoryEmoji: Record<Category, string> = {
  personal: '👤',
  work: '💼',
  health: '💪',
  shopping: '🛒',
  finance: '💰',
  other: '📌',
};

export default function TaskItem({ task, onToggle, onDelete, onEdit }: TaskItemProps) {
  const [expanded, setExpanded] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const priority = priorityConfig[task.priority];

  const isOverdue =
    !task.completed && task.dueDate && new Date(task.dueDate) < new Date();

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);

    if (date.toDateString() === today.toDateString()) return 'Today';
    if (date.toDateString() === tomorrow.toDateString()) return 'Tomorrow';

    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: date.getFullYear() !== today.getFullYear() ? 'numeric' : undefined,
    });
  };

  const timeAgo = (dateStr: string) => {
    const diff = Date.now() - new Date(dateStr).getTime();
    const minutes = Math.floor(diff / 60000);
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, x: -100, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      className={`group bg-white dark:bg-gray-800 border rounded-2xl transition-all duration-300 hover:shadow-lg ${
        task.completed
          ? 'border-gray-100 dark:border-gray-750 opacity-75'
          : isOverdue
          ? 'border-red-200 dark:border-red-900 shadow-sm shadow-red-100 dark:shadow-red-950'
          : 'border-gray-200 dark:border-gray-700 shadow-sm'
      }`}
    >
      <div className="p-4">
        <div className="flex items-start gap-3">
          {/* Checkbox */}
          <button
            onClick={() => onToggle(task.id)}
            className={`mt-0.5 flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
              task.completed
                ? 'bg-gradient-to-br from-indigo-500 to-purple-500 border-indigo-500'
                : 'border-gray-300 dark:border-gray-600 hover:border-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950'
            }`}
          >
            {task.completed && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              >
                <Check size={14} className="text-white" strokeWidth={3} />
              </motion.div>
            )}
          </button>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1 min-w-0">
                <h3
                  className={`font-semibold text-sm leading-snug transition-all ${
                    task.completed
                      ? 'line-through text-gray-400 dark:text-gray-500'
                      : 'text-gray-900 dark:text-white'
                  }`}
                >
                  {task.title}
                </h3>

                {/* Tags row */}
                <div className="flex flex-wrap items-center gap-1.5 mt-1.5">
                  <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-semibold ${priority.bg} ${priority.color}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${priority.dot}`} />
                    {priority.label}
                  </span>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-medium bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
                    {categoryEmoji[task.category]} {task.category}
                  </span>
                  {task.dueDate && (
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-medium ${
                        isOverdue
                          ? 'bg-red-100 dark:bg-red-950 text-red-600 dark:text-red-400'
                          : 'bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400'
                      }`}
                    >
                      <Calendar size={10} />
                      {formatDate(task.dueDate)}
                    </span>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                {task.description && (
                  <button
                    onClick={() => setExpanded(!expanded)}
                    className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all"
                  >
                    {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                  </button>
                )}
                <button
                  onClick={() => onEdit(task)}
                  className="p-1.5 rounded-lg text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-950 transition-all"
                >
                  <Edit3 size={14} />
                </button>
                {showDeleteConfirm ? (
                  <button
                    onClick={() => { onDelete(task.id); setShowDeleteConfirm(false); }}
                    onBlur={() => setTimeout(() => setShowDeleteConfirm(false), 200)}
                    className="p-1.5 rounded-lg text-red-500 bg-red-50 dark:bg-red-950 hover:bg-red-100 transition-all text-xs font-bold"
                  >
                    Confirm
                  </button>
                ) : (
                  <button
                    onClick={() => setShowDeleteConfirm(true)}
                    className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950 transition-all"
                  >
                    <Trash2 size={14} />
                  </button>
                )}
              </div>
            </div>

            {/* Expanded description */}
            {expanded && task.description && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="mt-2"
              >
                <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed bg-gray-50 dark:bg-gray-750 rounded-lg p-3">
                  {task.description}
                </p>
              </motion.div>
            )}

            {/* Timestamp */}
            <div className="flex items-center gap-1 mt-2 text-[10px] text-gray-400">
              <Clock size={10} />
              <span>Created {timeAgo(task.createdAt)}</span>
              {task.completedAt && (
                <span className="ml-1">· Completed {timeAgo(task.completedAt)}</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
