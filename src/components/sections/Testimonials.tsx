import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

export function Testimonials() {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "CEO, TechStart",
      content: "AppSnap delivered our MVP in just 2 weeks. The quality and speed were exceptional!",
      rating: 5,
      avatar: "https://ui-avatars.com/api/?name=Sarah+Johnson&background=22c55e&color=fff"
    },
    {
      name: "Michael Chen",
      role: "Founder, InnovateCo",
      content: "The professional package was perfect for our needs. Great communication throughout.",
      rating: 5,
      avatar: "https://ui-avatars.com/api/?name=Michael+Chen&background=22c55e&color=fff"
    },
    {
      name: "Emily Rodriguez",
      role: "CTO, Enterprise Solutions",
      content: "Their enterprise solutions are top-notch. Highly recommend for large-scale projects.",
      rating: 5,
      avatar: "https://ui-avatars.com/api/?name=Emily+Rodriguez&background=22c55e&color=fff"
    }
  ];

  return (
    <section className="relative py-24 overflow-hidden bg-gradient-to-b from-white via-gray-50 to-white 
                        dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-40 dark:opacity-20">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-emerald-200 dark:bg-emerald-900/30 
                       rounded-full mix-blend-multiply dark:mix-blend-lighten blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-emerald-200 dark:bg-emerald-900/30 
                       rounded-full mix-blend-multiply dark:mix-blend-lighten blur-3xl" />
      </div>

      <div className="container relative mx-auto px-6">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold mb-4 text-gray-900 dark:text-white"
          >
            What Our Clients Say
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
          >
            Don't just take our word for it - hear from some of our satisfied clients
          </motion.p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="relative group"
            >
              {/* Card */}
              <div className="relative h-full p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg 
                            transition-all duration-300 hover:shadow-xl border border-gray-100 
                            dark:border-gray-700 group-hover:-translate-y-1">
                {/* Rating */}
                <div className="flex items-center mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star 
                      key={i} 
                      className="w-5 h-5 text-yellow-400 dark:text-yellow-500 fill-current 
                                group-hover:text-yellow-500 dark:group-hover:text-yellow-400 
                                transition-colors" 
                    />
                  ))}
                </div>

                {/* Content */}
                <blockquote className="mb-8">
                  <p className="text-gray-600 dark:text-gray-300 italic leading-relaxed">
                    "{testimonial.content}"
                  </p>
                </blockquote>

                {/* Author */}
                <div className="flex items-center">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full border-2 border-emerald-500 dark:border-emerald-400"
                  />
                  <div className="ml-4">
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {testimonial.name}
                    </p>
                    <p className="text-emerald-600 dark:text-emerald-400 text-sm">
                      {testimonial.role}
                    </p>
                  </div>
                </div>

                {/* Decorative quote mark */}
                <div className="absolute top-4 right-4 text-emerald-500/10 dark:text-emerald-400/10">
                  <svg 
                    className="w-12 h-12 transform rotate-180"
                    fill="currentColor"
                    viewBox="0 0 32 32"
                  >
                    <path d="M10 8v8H6v-8h4zm12 0v8h-4v-8h4zm-1.2 12.8q1.2 0 2.1.9.9.9.9 2.1 0 1.2-.9 2.1-.9.9-2.1.9-1.2 0-2.1-.9-.9-.9-.9-2.1 0-1.2.9-2.1.9-.9 2.1-.9zm-12 0q1.2 0 2.1.9.9.9.9 2.1 0 1.2-.9 2.1-.9.9-2.1.9-1.2 0-2.1-.9-.9-.9-.9-2.1 0-1.2.9-2.1.9-.9 2.1-.9z"/>
                  </svg>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
} 