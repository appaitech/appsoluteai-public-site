import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export interface AnimatedHeadingProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'glitch';
}

export const AnimatedHeading: React.FC<AnimatedHeadingProps> = ({ 
  children, 
  className = '',
  variant = 'default'
}) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.h2
      ref={ref}
      className={`relative group text-center ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
      whileHover="hover"
    >
      <span className="relative inline-block group-hover:scale-[1.02] transition-transform duration-300">
        {children}
        {/* Glitch effect only shows when variant is 'glitch' */}
        {variant === 'glitch' && [...Array(3)].map((_, i) => (
          <motion.span
            key={i}
            className="absolute inset-0 text-emerald-500 opacity-0"
            style={{ zIndex: -1 - i }}
            animate={{ 
              x: [-3, 3, -3].map(x => x * (i + 1)),
              y: [1, -1, 1].map(y => y * (i + 1)),
              opacity: [0, 0.3, 0],
              scale: [1, 1.02, 1]
            }}
            transition={{ 
              duration: 0.3,
              repeat: Infinity,
              repeatType: "reverse",
              delay: i * 0.1
            }}
          >
            {children}
          </motion.span>
        ))}
      </span>
      {/* Enhanced glow effect */}
      <motion.div
        className="absolute inset-0 -z-10"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0, 0.5, 0]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 via-teal-500/20 to-emerald-500/20 blur-2xl rounded-full" />
        <div className="absolute inset-0 bg-emerald-500/10 blur-3xl rounded-full" />
      </motion.div>
    </motion.h2>
  );
} 