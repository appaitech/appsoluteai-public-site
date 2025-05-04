import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { DollarSign, PoundSterling, Calculator, Check } from 'lucide-react';

interface PriceRange {
  min: number;
  max: number;
}

interface Feature {
  icon: string;
  name: string;
  description: string;
  priceZAR: PriceRange;
}

const features: Feature[] = [
  {
    icon: '🔒',
    name: 'Authentication',
    description: 'Email/password, OAuth (Google/Apple), forgot/reset password',
    priceZAR: { min: 8000, max: 20000 },
  },
  {
    icon: '👤',
    name: 'User Profiles',
    description: 'View/edit, avatars, role types',
    priceZAR: { min: 5000, max: 12000 },
  },
  {
    icon: '📨',
    name: 'Push Notifications',
    description: 'Local + cloud (Firebase), optional targeting',
    priceZAR: { min: 5000, max: 15000 },
  },
  {
    icon: '💬',
    name: 'Messaging / Chat',
    description: '1:1 or group, real-time (Firestore/Socket), simple UI',
    priceZAR: { min: 15000, max: 35000 },
  },
  {
    icon: '📱',
    name: 'Feed / Posts',
    description: 'Scrollable feed, likes, comments, timestamps',
    priceZAR: { min: 12000, max: 30000 },
  },
  {
    icon: '🔍',
    name: 'Search + Filters',
    description: 'Basic fuzzy search, filters, categories',
    priceZAR: { min: 6000, max: 18000 },
  },
  {
    icon: '📍',
    name: 'Geo & Maps',
    description: 'Location picker, GPS tracking, Google Maps API',
    priceZAR: { min: 10000, max: 30000 },
  },
  {
    icon: '🛒',
    name: 'Payments',
    description: 'PayFast, Stripe, PayPal integration, checkout',
    priceZAR: { min: 15000, max: 35000 },
  },
  {
    icon: '📦',
    name: 'E-commerce Cart',
    description: 'Add to cart, quantity, total, checkout',
    priceZAR: { min: 12000, max: 25000 },
  },
  {
    icon: '🗂️',
    name: 'Product / Item Listings',
    description: 'Upload/create, image + detail views',
    priceZAR: { min: 10000, max: 22000 },
  },
  {
    icon: '📅',
    name: 'Bookings / Calendar',
    description: 'Availability, time slot picker, simple logic',
    priceZAR: { min: 12000, max: 28000 },
  },
  {
    icon: '📋',
    name: 'Admin Dashboard (Web)',
    description: 'View/edit users/data, moderate content',
    priceZAR: { min: 20000, max: 50000 },
  },
  {
    icon: '📈',
    name: 'Analytics Integration',
    description: 'Firebase, Mixpanel, page tracking',
    priceZAR: { min: 4000, max: 10000 },
  },
  {
    icon: '☁️',
    name: 'Cloud File Uploads',
    description: 'Upload docs/images, S3 or Firebase storage',
    priceZAR: { min: 5000, max: 15000 },
  },
  {
    icon: '🎨',
    name: 'UI/UX Prototype',
    description: 'High-fidelity Figma designs, interactive flows',
    priceZAR: { min: 8000, max: 25000 },
  },
  {
    icon: '🌍',
    name: 'Multi-language Support',
    description: 'Translation setup, i18n config',
    priceZAR: { min: 6000, max: 15000 },
  },
  {
    icon: '📶',
    name: 'Offline Mode',
    description: 'Local caching, retry logic',
    priceZAR: { min: 10000, max: 20000 },
  },
  {
    icon: '🔄',
    name: 'API Integrations',
    description: 'Connect to 3rd-party services (per integration)',
    priceZAR: { min: 5000, max: 20000 },
  },
  {
    icon: '🔒',
    name: '2FA / Security Add-ons',
    description: 'OTP, email verification, rate limiting',
    priceZAR: { min: 8000, max: 18000 },
  },
  {
    icon: '👥',
    name: 'User Roles & Permissions',
    description: 'Admin/staff/customer tier access',
    priceZAR: { min: 5000, max: 12000 },
  },
];

const exchangeRates = {
  ZAR: 1,
  USD: 0.053, // 1 ZAR = 0.053 USD
  GBP: 0.042, // 1 ZAR = 0.042 GBP
};

type Currency = 'ZAR' | 'USD' | 'GBP';

const currencySymbols: Record<Currency, string> = {
  ZAR: 'R',
  USD: '$',
  GBP: '£',
};

export function FeaturePricing() {
  const [selectedCurrency, setSelectedCurrency] = useState<Currency>('ZAR');
  const [selectedFeatures, setSelectedFeatures] = useState<Set<string>>(new Set());
  const [showCalculator, setShowCalculator] = useState(false);

  const formatPrice = (amount: number): string => {
    const convertedAmount = amount * exchangeRates[selectedCurrency];
    return `${currencySymbols[selectedCurrency]}${Math.round(convertedAmount).toLocaleString()}`;
  };

  const toggleFeature = (featureName: string) => {
    const newSelected = new Set(selectedFeatures);
    if (newSelected.has(featureName)) {
      newSelected.delete(featureName);
    } else {
      newSelected.add(featureName);
    }
    setSelectedFeatures(newSelected);
  };

  const calculateTotal = () => {
    let minTotal = 0;
    let maxTotal = 0;
    selectedFeatures.forEach(featureName => {
      const feature = features.find(f => f.name === featureName);
      if (feature) {
        minTotal += feature.priceZAR.min;
        maxTotal += feature.priceZAR.max;
      }
    });
    return {
      min: formatPrice(minTotal),
      max: formatPrice(maxTotal)
    };
  };

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
              Individual Feature Pricing
            </span>
          </motion.div>

          <h2 className="text-3xl font-extrabold mb-6 
                        bg-gradient-to-r from-emerald-600 to-teal-500 
                        dark:from-emerald-400 dark:to-teal-300
                        bg-clip-text text-transparent">
            Build Your Custom Solution
          </h2>
          <p className="mt-4 text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Choose the features you need and get an estimate for your custom app
          </p>
        </motion.div>

        <div className="mt-8 flex justify-center space-x-4">
          <div className="inline-flex items-center space-x-2 bg-gray-100 dark:bg-gray-800 rounded-xl p-1">
            <button
              onClick={() => setSelectedCurrency("ZAR")}
              className={`btn-pro-secondary px-4 py-2 ${selectedCurrency === "ZAR" ? "bg-white dark:bg-gray-700" : ""}`}
            >
              ZAR
            </button>
            <button
              onClick={() => setSelectedCurrency("USD")}
              className={`btn-pro-secondary px-4 py-2 ${selectedCurrency === "USD" ? "bg-white dark:bg-gray-700" : ""}`}
            >
              <DollarSign className="w-4 h-4 inline" />
              USD
            </button>
            <button
              onClick={() => setSelectedCurrency("GBP")}
              className={`btn-pro-secondary px-4 py-2 ${selectedCurrency === "GBP" ? "bg-white dark:bg-gray-700" : ""}`}
            >
              <PoundSterling className="w-4 h-4 inline" />
              GBP
            </button>
          </div>
          <button
            onClick={() => setShowCalculator(!showCalculator)}
            className={`btn-pro-secondary px-4 py-2 flex items-center space-x-2 ${
              showCalculator ? 'bg-emerald-500 text-white' : ''
            }`}
          >
            <Calculator className="w-4 h-4" />
            <span>Calculator</span>
          </button>
        </div>

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
              className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden 
                         hover:shadow-emerald-500/10 dark:hover:shadow-emerald-500/5 
                         transition-all duration-300 border border-gray-100 dark:border-gray-700
                         ${showCalculator ? 'cursor-pointer' : ''} 
                         ${selectedFeatures.has(feature.name) ? 'ring-2 ring-emerald-500' : ''}`}
              onClick={() => showCalculator && toggleFeature(feature.name)}
            >
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="text-2xl mr-3">{feature.icon}</span>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">{feature.name}</h3>
                  </div>
                  {showCalculator && selectedFeatures.has(feature.name) && (
                    <Check className="w-5 h-5 text-emerald-500" />
                  )}
                </div>
                <p className="mt-2 text-gray-600 dark:text-gray-300">{feature.description}</p>
                <div className="mt-4 font-semibold bg-gradient-to-r from-emerald-600 to-teal-500 
                                dark:from-emerald-400 dark:to-teal-300
                                bg-clip-text text-transparent">
                  {formatPrice(feature.priceZAR.min)} – {formatPrice(feature.priceZAR.max)}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {showCalculator && selectedFeatures.size > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-4 shadow-lg"
          >
            <div className="max-w-7xl mx-auto flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Selected Features: {selectedFeatures.size}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Estimated Total: {calculateTotal().min} – {calculateTotal().max}
                </p>
              </div>
              <button
                onClick={() => setSelectedFeatures(new Set())}
                className="btn-pro-secondary px-4 py-2"
              >
                Clear Selection
              </button>
            </div>
          </motion.div>
        )}

        <div className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>* Prices are estimates and may vary based on specific requirements</p>
          <p>* Exchange rates are approximate and updated periodically</p>
          <p className="mt-2">Contact us for a detailed quote based on your specific needs</p>
        </div>
      </div>
    </div>
  );
} 