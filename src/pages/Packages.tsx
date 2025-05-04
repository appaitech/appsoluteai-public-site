import { motion } from 'framer-motion';
import { RegionalPricing } from '@/components/ui/RegionalPricing';
import { FeaturePricing } from '@/components/pricing/FeaturePricing';

export function Packages() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
      <section className="py-20">
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-6xl mx-auto">
            {/* Main Heading */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="inline-block mb-6 p-2 px-4 rounded-full bg-emerald-500/10 dark:bg-emerald-500/20
                           border border-emerald-500/20"
              >
                <span className="text-emerald-600 dark:text-emerald-400 font-medium">
                  Flexible Pricing Plans
                </span>
              </motion.div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 
                            bg-gradient-to-r from-emerald-600 to-teal-500 
                            dark:from-emerald-400 dark:to-teal-300
                            bg-clip-text text-transparent">
                Choose Your Perfect Package
              </h1>

              <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-3xl mx-auto">
                Transparent pricing for businesses of all sizes
              </p>
            </motion.div>

            {/* Pricing Section */}
            <RegionalPricing />

            {/* Feature Pricing Section */}
            <div className="mt-32">
              <FeaturePricing />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 