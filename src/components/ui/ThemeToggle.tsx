import { motion } from 'framer-motion';
import { Moon, Sun, Laptop } from 'lucide-react';
import { useTheme } from '@/providers/ThemeProvider';

// Modern Animated Toggle
export function ThemeToggle1() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="relative p-2.5 rounded-xl bg-white dark:bg-gray-800 
                 border border-gray-200 dark:border-gray-700
                 group transition-all duration-300
                 hover:shadow-lg hover:shadow-emerald-500/20"
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      <div className="relative w-5 h-5">
        {/* Sun Icon */}
        <motion.div
          initial={false}
          animate={{
            scale: theme === 'dark' ? 0 : 1,
            opacity: theme === 'dark' ? 0 : 1,
            rotate: theme === 'dark' ? 90 : 0,
          }}
          transition={{ duration: 0.2, ease: 'easeInOut' }}
          className="absolute inset-0"
        >
          <Sun className="w-full h-full text-amber-500" />
        </motion.div>

        {/* Moon Icon */}
        <motion.div
          initial={false}
          animate={{
            scale: theme === 'dark' ? 1 : 0,
            opacity: theme === 'dark' ? 1 : 0,
            rotate: theme === 'dark' ? 0 : -90,
          }}
          transition={{ duration: 0.2, ease: 'easeInOut' }}
          className="absolute inset-0"
        >
          <Moon className="w-full h-full text-emerald-400" />
        </motion.div>
      </div>

      {/* Glow effect */}
      <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 via-teal-500/20 to-emerald-500/20 
                      blur-xl rounded-full animate-pulse" />
      </div>
    </motion.button>
  );
}

// Cyberpunk Style Toggle
export function ThemeToggle2() {
  const { theme, setTheme } = useTheme();

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="relative p-3 rounded-xl bg-white/10 dark:bg-gray-800/50 backdrop-blur-lg 
                 border border-emerald-500/20 dark:border-emerald-400/20
                 group transition-all duration-300"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
    >
      <div className="relative">
        {/* System Theme Indicator */}
        <motion.div
          initial={false}
          animate={{
            opacity: theme === 'system' ? 1 : 0,
            scale: theme === 'system' ? 1 : 0,
          }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <Laptop className="w-5 h-5 text-emerald-500 dark:text-emerald-400" />
        </motion.div>

        {/* Dark Theme Icon */}
        <motion.div
          initial={false}
          animate={{
            opacity: theme === 'dark' ? 1 : 0,
            scale: theme === 'dark' ? 1 : 0,
            rotateY: theme === 'dark' ? 0 : 180,
          }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <Moon className="w-5 h-5 text-emerald-400" />
        </motion.div>

        {/* Light Theme Icon */}
        <motion.div
          initial={false}
          animate={{
            opacity: theme === 'light' ? 1 : 0,
            scale: theme === 'light' ? 1 : 0,
            rotateY: theme === 'light' ? 0 : -180,
          }}
          className="flex items-center justify-center"
        >
          <Sun className="w-5 h-5 text-amber-500" />
        </motion.div>
      </div>

      {/* Cyber lines effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-[1px] bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent"
            style={{
              top: `${(i + 1) * 25}%`,
              left: '-50%',
              right: '-50%'
            }}
            animate={{
              scaleX: [0, 1, 0],
              opacity: [0, 0.5, 0],
              transition: {
                duration: 2,
                repeat: Infinity,
                delay: i * 0.3
              }
            }}
          />
        ))}
      </div>

      {/* Glow ring */}
      <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl opacity-0 
                    group-hover:opacity-30 blur-lg group-hover:animate-pulse transition-all duration-300" />
    </motion.button>
  );
}

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={toggleTheme}
      className="relative p-2.5 rounded-xl bg-white/50 dark:bg-gray-800/50 
                 border border-gray-200/50 dark:border-gray-700/50
                 backdrop-blur-sm group transition-all duration-300
                 hover:shadow-lg hover:shadow-brand-500/20
                 dark:hover:shadow-brand-500/10"
      aria-label="Toggle theme"
    >
      <div className="relative w-5 h-5">
        <motion.div
          initial={false}
          animate={{
            scale: theme === 'light' ? 1 : 0,
            opacity: theme === 'light' ? 1 : 0,
            rotate: theme === 'light' ? 0 : -90,
          }}
          transition={{ duration: 0.2, ease: 'easeInOut' }}
          className="absolute inset-0"
        >
          <Sun className="w-full h-full text-amber-500" />
        </motion.div>

        <motion.div
          initial={false}
          animate={{
            scale: theme === 'dark' ? 1 : 0,
            opacity: theme === 'dark' ? 1 : 0,
            rotate: theme === 'dark' ? 0 : 90,
          }}
          transition={{ duration: 0.2, ease: 'easeInOut' }}
          className="absolute inset-0"
        >
          <Moon className="w-full h-full text-blue-500" />
        </motion.div>

        <motion.div
          initial={false}
          animate={{
            scale: theme === 'system' ? 1 : 0,
            opacity: theme === 'system' ? 1 : 0,
            rotate: theme === 'system' ? 0 : 90,
          }}
          transition={{ duration: 0.2, ease: 'easeInOut' }}
          className="absolute inset-0"
        >
          <Laptop className="w-full h-full text-gray-500" />
        </motion.div>
      </div>

      <div 
        className="absolute -inset-0.5 bg-gradient-to-r from-brand-500 to-emerald-500 
                   rounded-xl opacity-0 group-hover:opacity-20 blur transition-all 
                   duration-300 dark:group-hover:opacity-10"
      />
    </motion.button>
  );
} 