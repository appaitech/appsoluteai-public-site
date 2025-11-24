import { motion } from 'framer-motion';

interface Feature {
  icon: string;
  name: string;
  description: string;
}

const features: Feature[] = [
  { icon: '🔒', name: 'Authentication', description: 'Email/password, OAuth (Google/Apple), forgot/reset password' },
  { icon: '👤', name: 'User Profiles', description: 'View/edit, avatars, role types' },
  { icon: '📨', name: 'Push Notifications', description: 'Local + cloud (Firebase), optional targeting' },
  { icon: '💬', name: 'Messaging / Chat', description: '1:1 or group, real-time (Firestore/Socket), simple UI' },
  { icon: '📱', name: 'Feed / Posts', description: 'Scrollable feed, likes, comments, timestamps' },
  { icon: '🔍', name: 'Search + Filters', description: 'Basic fuzzy search, filters, categories' },
  { icon: '📍', name: 'Geo & Maps', description: 'Location picker, GPS tracking, Google Maps API' },
  { icon: '🛒', name: 'Payments', description: 'PayFast, Stripe, PayPal integration, checkout' },
  { icon: '📦', name: 'E-commerce Cart', description: 'Add to cart, quantity, total, checkout' },
  { icon: '🗂️', name: 'Product / Item Listings', description: 'Upload/create, image + detail views' },
  { icon: '📅', name: 'Bookings / Calendar', description: 'Availability, time slot picker, simple logic' },
  { icon: '📋', name: 'Admin Dashboard (Web)', description: 'View/edit users/data, moderate content' },
  { icon: '📈', name: 'Analytics Integration', description: 'Firebase, Mixpanel, page tracking' },
  { icon: '☁️', name: 'Cloud File Uploads', description: 'Upload docs/images, S3 or Firebase storage' },
  { icon: '🎨', name: 'UI/UX Prototype', description: 'High-fidelity Figma designs, interactive flows' },
  { icon: '🌍', name: 'Multi-language Support', description: 'Translation setup, i18n config' },
  { icon: '📶', name: 'Offline Mode', description: 'Local caching, retry logic' },
  { icon: '🔄', name: 'API Integrations', description: 'Connect to 3rd-party services (per integration)' },
  { icon: '🔒', name: '2FA / Security Add-ons', description: 'OTP, email verification, rate limiting' },
  { icon: '👥', name: 'User Roles & Permissions', description: 'Admin/staff/customer tier access' },
];

export function FeaturePricing() {
  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-block mb-6 p-2 px-4 rounded-full bg-emerald-500/10 dark:bg-emerald-500/20
                       border border-emerald-500/20"
          >
            <span className="text-emerald-600 dark:text-emerald-400 font-medium">
              Feature Highlights
            </span>
          </motion.div>

          <h2 className="text-3xl font-extrabold mb-6 
                        bg-gradient-to-r from-emerald-600 to-teal-500 
                        dark:from-emerald-400 dark:to-teal-300
                        bg-clip-text text-transparent">
            Build Your Custom Solution
          </h2>
          <p className="mt-4 text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Tell us what you need and we’ll craft a proposal that fits your goals.
            Every package is priced on request after a collaborative discovery call.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 grid gap-6 lg:grid-cols-2"
        >
          {features.map((feature, index) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              key={feature.name}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden 
                         hover:shadow-emerald-500/10 dark:hover:shadow-emerald-500/5 
                         transition-all duration-300 border border-gray-100 dark:border-gray-700"
            >
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="text-2xl mr-3">{feature.icon}</span>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">{feature.name}</h3>
                  </div>
                </div>
                <p className="mt-2 text-gray-600 dark:text-gray-300">{feature.description}</p>
                <div className="mt-4 font-semibold bg-gradient-to-r from-emerald-600 to-teal-500 
                                dark:from-emerald-400 dark:to-teal-300
                                bg-clip-text text-transparent">
                  Price on Request
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-12 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Once we understand your scope, timelines, and constraints, we’ll provide a clear proposal
            with milestones, investment, and next steps.
          </p>
          <button
            className="mt-6 btn-pro-primary bg-gradient-to-r from-emerald-500 to-teal-500 
                       hover:from-emerald-600 hover:to-teal-600 relative overflow-hidden group"
            onClick={() => {
              window.location.href = '/contact';
            }}
          >
            <span className="relative z-10">Request Pricing</span>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.4),transparent_70%)] 
                          opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </button>
        </div>
      </div>
    </div>
  );
}