import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Plus, Zap } from 'lucide-react';
import type { Task } from '../types';

interface QuickAddProps {
  onAdd: (task: Omit<Task, 'id' | 'completed' | 'createdAt'>) => void;
  onOpenFull: () => void;
}

export default function QuickAdd({ onAdd, onOpenFull }: QuickAddProps) {
  const [value, setValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!value.trim()) return;
    onAdd({
      title: value.trim(),
      description: '',
      priority: 'medium',
      category: 'personal',
      dueDate: '',
    });
    setValue('');
    inputRef.current?.blur();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.2 }}
      className="mb-6"
    >
      <form onSubmit={handleSubmit} className="flex gap-2">
        <div
          className={`relative flex-1 transition-all duration-300 ${
            isFocused ? 'ring-2 ring-indigo-500 rounded-xl' : ''
          }`}
        >
          <Zap
            size={16}
            className={`absolute left-3.5 top-1/2 -translate-y-1/2 transition-colors ${
              isFocused ? 'text-indigo-500' : 'text-gray-400'
            }`}
          />
          <input
            ref={inputRef}
            type="text"
            value={value}
            onChange={e => setValue(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="Quick add a task... (press Enter)"
            className="w-full pl-10 pr-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none transition-all"
          />
        </div>
        <button
          type="button"
          onClick={onOpenFull}
          className="px-4 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-xl transition-all flex items-center gap-2 font-medium text-sm shadow-lg shadow-indigo-200 dark:shadow-indigo-950 hover:shadow-xl"
        >
          <Plus size={18} />
          <span className="hidden sm:inline">New Task</span>
        </button>
      </form>
    </motion.div>
  );
}
