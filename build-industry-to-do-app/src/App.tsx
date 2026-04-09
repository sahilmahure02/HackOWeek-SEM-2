import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Moon, Sun, Trash2 } from 'lucide-react';
import { useTasks } from './hooks/useTasks';
import Header from './components/Header';
import QuickAdd from './components/QuickAdd';
import FilterBar from './components/FilterBar';
import TaskItem from './components/TaskItem';
import AddTaskModal from './components/AddTaskModal';
import EmptyState from './components/EmptyState';
import type { Task } from './types';

function App() {
  const {
    tasks,
    allTasks,
    stats,
    search,
    setSearch,
    filterStatus,
    setFilterStatus,
    filterCategory,
    setFilterCategory,
    filterPriority,
    setFilterPriority,
    sortBy,
    setSortBy,
    addTask,
    updateTask,
    deleteTask,
    toggleTask,
    clearCompleted,
  } = useTasks();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('taskflow-dark');
      if (saved !== null) return saved === 'true';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
    localStorage.setItem('taskflow-dark', String(darkMode));
  }, [darkMode]);

  const handleEdit = (task: Task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingTask(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 transition-colors duration-500">
      {/* Background decoration */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-indigo-200/30 to-purple-200/30 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-blue-200/30 to-cyan-200/30 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-violet-200/20 to-pink-200/20 dark:from-violet-900/10 dark:to-pink-900/10 rounded-full blur-3xl" />
      </div>

      {/* Top bar */}
      <div className="relative z-10">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-200 dark:shadow-indigo-950">
              <span className="text-white text-sm font-bold">✓</span>
            </div>
            <span className="text-lg font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              TaskFlow
            </span>
          </div>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2.5 rounded-xl bg-white/80 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-800 transition-all shadow-sm"
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="relative z-10 max-w-2xl mx-auto px-4 pb-24">
        <Header stats={stats} />
        <QuickAdd onAdd={addTask} onOpenFull={() => setIsModalOpen(true)} />
        
        {allTasks.length > 0 && (
          <FilterBar
            search={search}
            setSearch={setSearch}
            filterStatus={filterStatus}
            setFilterStatus={setFilterStatus}
            filterCategory={filterCategory}
            setFilterCategory={setFilterCategory}
            filterPriority={filterPriority}
            setFilterPriority={setFilterPriority}
            sortBy={sortBy}
            setSortBy={setSortBy}
          />
        )}

        {/* Task counter & clear */}
        {tasks.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center justify-between mb-3"
          >
            <p className="text-xs font-medium text-gray-400 dark:text-gray-500">
              {tasks.length} task{tasks.length !== 1 ? 's' : ''}
              {search && ' found'}
            </p>
            {stats.completed > 0 && (
              <button
                onClick={clearCompleted}
                className="text-xs text-gray-400 dark:text-gray-500 hover:text-red-500 dark:hover:text-red-400 font-medium flex items-center gap-1 transition-colors"
              >
                <Trash2 size={12} />
                Clear completed ({stats.completed})
              </button>
            )}
          </motion.div>
        )}

        {/* Tasks list */}
        <div className="space-y-3">
          <AnimatePresence mode="popLayout">
            {tasks.length > 0 ? (
              tasks.map(task => (
                <TaskItem
                  key={task.id}
                  task={task}
                  onToggle={toggleTask}
                  onDelete={deleteTask}
                  onEdit={handleEdit}
                />
              ))
            ) : (
              <EmptyState
                filterStatus={filterStatus}
                hasSearch={!!search || filterCategory !== 'all' || filterPriority !== 'all'}
                onAddClick={() => setIsModalOpen(true)}
              />
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Modal */}
      <AddTaskModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onAdd={addTask}
        onUpdate={updateTask}
        editTask={editingTask}
      />
    </div>
  );
}

export default App;
