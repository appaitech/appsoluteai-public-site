import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  to?: string;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button = ({
  children,
  className,
  variant = 'primary',
  size = 'md',
  to,
  isLoading,
  leftIcon,
  rightIcon,
  ...props
}: ButtonProps) => {
  const baseStyles = "relative inline-flex items-center justify-center font-medium rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-gradient-to-r from-emerald-500 via-blue-500 to-purple-500 hover:from-emerald-600 hover:via-blue-600 hover:to-purple-600 text-white shadow-[0_0_30px_rgba(59,130,246,0.3)]",
    secondary: "bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-700 hover:to-gray-800 text-white dark:from-gray-700 dark:to-gray-800 dark:hover:from-gray-600 dark:hover:to-gray-700",
    outline: "border-2 border-emerald-500 dark:border-emerald-400 text-emerald-500 dark:text-emerald-400 hover:bg-emerald-500/10 dark:hover:bg-emerald-400/10"
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg"
  };

  const buttonContent = (
    <>
      {isLoading && (
        <motion.div
          className="absolute inset-0 bg-white/20"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: [0, 1.5, 1], opacity: [0, 0.2, 0] }}
          transition={{ duration: 1, repeat: Infinity }}
        />
      )}
      <span className="relative flex items-center gap-2">
        {leftIcon && <span className="inline-flex">{leftIcon}</span>}
        {children}
        {rightIcon && <span className="inline-flex">{rightIcon}</span>}
      </span>
      <motion.div
        className="absolute inset-0 rounded-xl"
        style={{ 
          background: variant === 'primary' 
            ? 'linear-gradient(to right, rgba(52,211,153,0.2), rgba(59,130,246,0.2), rgba(147,51,234,0.2))' 
            : 'transparent' 
        }}
        animate={{
          opacity: [0.5, 0.8, 0.5]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </>
  );

  const combinedClassName = cn(
    baseStyles,
    variants[variant],
    sizes[size],
    className
  );

  if (to) {
    return (
      <Link to={to} className={combinedClassName}>
        {buttonContent}
      </Link>
    );
  }

  return (
    <button
      className={combinedClassName}
      disabled={isLoading}
      {...props}
    >
      {buttonContent}
    </button>
  );
}; 