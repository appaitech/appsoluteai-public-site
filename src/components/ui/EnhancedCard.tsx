import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface EnhancedCardProps {
  children: ReactNode;
  className?: string;
  showHoverEffect?: boolean;
}

export function EnhancedCard({ children, className = '', showHoverEffect = true }: EnhancedCardProps) {
  return (
    <motion.div 
      className={`card-pro relative overflow-hidden flex flex-col
                 before:absolute before:inset-0 
                 before:bg-gradient-to-br before:from-emerald-500/10 before:to-transparent
                 before:opacity-0 hover:before:opacity-100
                 before:transition-opacity before:duration-500
                 after:absolute after:inset-0 
                 after:bg-[radial-gradient(600px_circle_at_var(--mouse-x,0px)_var(--mouse-y,0px),rgba(16,185,129,0.1),transparent_40%)]
                 border border-emerald-500/20
                 dark:bg-gray-800/80 dark:backdrop-blur-xl
                 shadow-xl
                 ${showHoverEffect ? 'transform transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl' : ''}
                 ${className}`}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        e.currentTarget.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
        e.currentTarget.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
      }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative z-10 flex flex-col h-full">
        {children}
      </div>
    </motion.div>
  );
}

// Helper components for consistent styling
export function CardHeader({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className={`mb-6 ${className}`}>
      {children}
    </div>
  );
}

export function CardTitle({ children }: { children: ReactNode }) {
  return (
    <h3 className="text-2xl font-bold mb-3 bg-gradient-to-br from-emerald-500 to-teal-600 
                   bg-clip-text text-transparent">
      {children}
    </h3>
  );
}

export function CardDescription({ children }: { children: ReactNode }) {
  return (
    <p className="text-gray-600 dark:text-gray-300">
      {children}
    </p>
  );
}

export function CardContent({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className={`flex-grow ${className}`}>
      {children}
    </div>
  );
}

export function CardFooter({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className={`mt-auto pt-6 ${className}`}>
      {children}
    </div>
  );
} 