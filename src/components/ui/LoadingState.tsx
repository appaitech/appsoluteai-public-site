import { motion } from 'framer-motion';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export function LoadingState() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-4"
    >
      <Skeleton height={200} className="rounded-lg" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Skeleton height={150} className="rounded-lg" />
        <Skeleton height={150} className="rounded-lg" />
        <Skeleton height={150} className="rounded-lg" />
      </div>
    </motion.div>
  );
} 