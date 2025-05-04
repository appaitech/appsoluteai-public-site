import { motion } from 'framer-motion';
import { InnovationCards } from '@/components/ui/InnovationCards';
import { ArrowRight } from 'lucide-react';
import { AnimatedHeading } from '@/components/ui/AnimatedHeading';

export function About() {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-emerald-50/50 via-transparent to-white/50 
                          dark:from-emerald-900/20 dark:via-gray-900 dark:to-gray-900" />
          {/* Animated background elements */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-200/20 dark:bg-emerald-900/20 
                         rounded-full mix-blend-multiply dark:mix-blend-lighten blur-3xl animate-float" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-teal-200/20 dark:bg-teal-900/20 
                         rounded-full mix-blend-multiply dark:mix-blend-lighten blur-3xl animate-float delay-300" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto">
            {/* Main Heading */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-24"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="inline-block mb-6 p-2 px-4 rounded-full bg-emerald-500/10 dark:bg-emerald-500/20
                           border border-emerald-500/20"
              >
                <span className="text-emerald-600 dark:text-emerald-400 font-medium">
                  Welcome to AppsoluteAI
                </span>
              </motion.div>

              <AnimatedHeading 
                variant="gradient"
                className="text-5xl md:text-6xl font-bold text-center mb-6 font-display tracking-normal"
              >
                Accelerating Digital Innovation
              </AnimatedHeading>

              <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-3xl mx-auto">
                Transforming ideas into powerful digital solutions
              </p>
            </motion.div>

            {/* Innovation Cards with enhanced spacing */}
            <div className="mb-32">
              <InnovationCards />
            </div>

            {/* Process Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-32"
            >
              <AnimatedHeading 
                variant="gradient"
                className="text-4xl md:text-5xl font-bold text-center mb-12 font-display tracking-normal"
              >
                Our Development Process
              </AnimatedHeading>
              <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                {[
                  { step: "1", title: "Dream", desc: "Share your vision" },
                  { step: "2", title: "Prototype", desc: "See it come to life" },
                  { step: "3", title: "Launch", desc: "Go to market" }
                ].map((phase, index) => (
                  <div key={phase.step} className="flex items-center gap-4">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.5 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.2 }}
                      className="relative"
                    >
                      <div className="w-16 h-16 rounded-full bg-emerald-500/10 dark:bg-emerald-500/20
                                    flex items-center justify-center text-2xl font-bold
                                    text-emerald-600 dark:text-emerald-400">
                        {phase.step}
                      </div>
                      <div className="mt-4">
                        <h3 className="font-bold text-gray-900 dark:text-white">
                          {phase.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400">
                          {phase.desc}
                        </p>
                      </div>
                    </motion.div>
                    {index < 2 && (
                      <ArrowRight className="hidden md:block w-8 h-8 text-emerald-500/50" />
                    )}
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Call to Action */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <div className="p-8 rounded-2xl bg-gradient-to-br from-emerald-500/10 to-teal-500/10
                             dark:from-emerald-900/50 dark:to-teal-900/50 backdrop-blur-sm
                             border border-emerald-500/20">
                <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                  Ready to Start Your Project?
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Let's transform your idea into reality together
                </p>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="btn-pro-primary"
                  onClick={() => window.location.href = '/prd'}
                >
                  Start Your Journey
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
} 