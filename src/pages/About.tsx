import { motion } from 'framer-motion';

export function About() {
  return (
    <div className="pt-20">
      {/* About Section */}
      <section className="py-20 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-white via-emerald-50/50 to-white 
                          dark:from-gray-900 dark:via-emerald-900/10 dark:to-gray-900" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto">
            {/* Vision Statement */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-emerald-600 to-teal-500 
                             bg-clip-text text-transparent">
                Our Vision
              </h2>
              <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
                Empowering startups and businesses to transform their digital dreams into reality, 
                one innovative solution at a time.
              </p>
            </motion.div>

            {/* Mission & Values Grid */}
            <div className="grid md:grid-cols-2 gap-8 mb-16">
              {/* Mission */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm 
                           rounded-xl p-6 border border-gray-200/50 dark:border-gray-700/50
                           shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <h3 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
                  Our Mission
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  To provide accessible, high-quality software development solutions that help 
                  businesses scale and succeed in the digital age. We believe in rapid delivery 
                  without compromising on quality.
                </p>
              </motion.div>

              {/* Values */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm 
                           rounded-xl p-6 border border-gray-200/50 dark:border-gray-700/50
                           shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <h3 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
                  Our Values
                </h3>
                <ul className="space-y-3">
                  {[
                    "Innovation at the core of everything we do",
                    "Transparency and open communication",
                    "Quality-driven development",
                    "Client success is our success"
                  ].map((value, index) => (
                    <li key={index} className="flex items-center space-x-3 text-gray-600 dark:text-gray-300">
                      <svg className="w-5 h-5 text-emerald-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>{value}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>

            {/* Why Choose Us */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">
                Why Choose Us
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  {
                    title: "Startup Focused",
                    description: "We understand the unique challenges startups face and provide solutions that scale."
                  },
                  {
                    title: "Rapid Development",
                    description: "Quick turnaround without compromising on quality or reliability."
                  },
                  {
                    title: "Growth Partners",
                    description: "We're not just developers - we're partners in your growth journey."
                  }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.2 }}
                    className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm 
                               rounded-xl p-6 border border-gray-200/50 dark:border-gray-700/50
                               shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      {item.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
} 