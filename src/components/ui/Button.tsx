import { motion } from 'framer-motion';
import { useState } from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export function Button({ 
  variant = 'primary', 
  size = 'md', 
  children, 
  className = '', 
  ...props 
}: ButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  const variantClasses = {
    primary: 'btn-base',
    secondary: 'btn-base bg-gradient-to-r from-gray-500 to-gray-600',
    outline: 'btn-base bg-transparent border-2 border-emerald-500 text-emerald-500 hover:text-white hover:bg-emerald-500',
  };

  return (
    <motion.button
      className={`
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${className}
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ 
        scale: 1.02,
        transition: { duration: 0.2 }
      }}
      whileTap={{ 
        scale: 0.98,
        transition: { duration: 0.1 }
      }}
      {...props}
    >
      <span className="relative z-10">{children}</span>
      {isHovered && (
        <motion.div
          className="absolute inset-0 -z-10 bg-emerald-500 opacity-30"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1.5, opacity: 0.3 }}
          exit={{ scale: 2, opacity: 0 }}
          transition={{ duration: 0.5 }}
        />
      )}
    </motion.button>
  );
} 