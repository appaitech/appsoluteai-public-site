import { Sun, Moon } from 'lucide-react';
import { motion } from 'framer-motion';
import { useDarkMode } from '@/hooks/useDarkMode';

export function DarkModeToggle() {
  const [isDark, setIsDark] = useDarkMode();

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => setIsDark(!isDark)}
      className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 
                 text-gray-800 dark:text-gray-200 transition-colors"
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <motion.div
        initial={false}
        animate={{ rotate: isDark ? 360 : 0 }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
      >
        {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
      </motion.div>
    </motion.button>
  );
} 