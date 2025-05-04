import { Moon } from 'lucide-react';
import { motion } from 'framer-motion';

export function DarkModeToggle() {
  return (
    <motion.button
      className="p-2 rounded-full bg-gray-800 text-gray-200 cursor-not-allowed"
      aria-label="Dark mode only"
      disabled
    >
      <Moon className="w-5 h-5" />
    </motion.button>
  );
} 