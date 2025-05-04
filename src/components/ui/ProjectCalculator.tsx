import { useState, useEffect } from 'react';
import { Calculator, DollarSign, Clock, Save, Sparkles, AlertCircle, PoundSterling } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';

interface SavedEstimate {
  id: string;
  features: typeof initialFeatures;
  totalCost: number;
  date: Date;
}

const featureCosts = {
  authentication: {
    ZAR: 8000,     // R8,000 - R20,000
    USD: 424,      // $424 - $1,060
    GBP: 336,      // £336 - £840
    maxZAR: 20000
  },
  userProfiles: {
    ZAR: 5000,     // R5,000 - R12,000
    USD: 265,      // $265 - $636
    GBP: 210,      // £210 - £504
    maxZAR: 12000
  },
  pushNotifications: {
    ZAR: 5000,     // R5,000 - R15,000
    USD: 265,      // $265 - $795
    GBP: 210,      // £210 - £630
    maxZAR: 15000
  },
  messaging: {
    ZAR: 15000,    // R15,000 - R35,000
    USD: 795,      // $795 - $1,855
    GBP: 630,      // £630 - £1,470
    maxZAR: 35000
  },
  feedPosts: {
    ZAR: 12000,    // R12,000 - R30,000
    USD: 636,      // $636 - $1,590
    GBP: 504,      // £504 - £1,260
    maxZAR: 30000
  },
  searchFilters: {
    ZAR: 6000,     // R6,000 - R18,000
    USD: 318,      // $318 - $954
    GBP: 252,      // £252 - £756
    maxZAR: 18000
  },
  geoMaps: {
    ZAR: 10000,    // R10,000 - R30,000
    USD: 530,      // $530 - $1,590
    GBP: 420,      // £420 - £1,260
    maxZAR: 30000
  },
  payments: {
    ZAR: 15000,    // R15,000 - R35,000
    USD: 795,      // $795 - $1,855
    GBP: 630,      // £630 - £1,470
    maxZAR: 35000
  },
  ecommerceCart: {
    ZAR: 12000,    // R12,000 - R25,000
    USD: 636,      // $636 - $1,325
    GBP: 504,      // £504 - £1,050
    maxZAR: 25000
  },
  productListings: {
    ZAR: 10000,    // R10,000 - R22,000
    USD: 530,      // $530 - $1,166
    GBP: 420,      // £420 - £924
    maxZAR: 22000
  },
  bookingsCalendar: {
    ZAR: 12000,    // R12,000 - R28,000
    USD: 636,      // $636 - $1,484
    GBP: 504,      // £504 - £1,176
    maxZAR: 28000
  },
  adminDashboard: {
    ZAR: 20000,    // R20,000 - R50,000
    USD: 1060,     // $1,060 - $2,650
    GBP: 840,      // £840 - £2,100
    maxZAR: 50000
  },
  analytics: {
    ZAR: 4000,     // R4,000 - R10,000
    USD: 212,      // $212 - $530
    GBP: 168,      // £168 - £420
    maxZAR: 10000
  },
  cloudStorage: {
    ZAR: 5000,     // R5,000 - R15,000
    USD: 265,      // $265 - $795
    GBP: 210,      // £210 - £630
    maxZAR: 15000
  },
  uiuxPrototype: {
    ZAR: 8000,     // R8,000 - R25,000
    USD: 424,      // $424 - $1,325
    GBP: 336,      // £336 - £1,050
    maxZAR: 25000
  },
  multiLanguage: {
    ZAR: 6000,     // R6,000 - R15,000
    USD: 318,      // $318 - $795
    GBP: 252,      // £252 - £630
    maxZAR: 15000
  },
  offlineMode: {
    ZAR: 10000,    // R10,000 - R20,000
    USD: 530,      // $530 - $1,060
    GBP: 420,      // £420 - £840
    maxZAR: 20000
  },
  apiIntegrations: {
    ZAR: 5000,     // R5,000 - R20,000
    USD: 265,      // $265 - $1,060
    GBP: 210,      // £210 - £840
    maxZAR: 20000
  },
  security2FA: {
    ZAR: 8000,     // R8,000 - R18,000
    USD: 424,      // $424 - $954
    GBP: 336,      // £336 - £756
    maxZAR: 18000
  },
  userRoles: {
    ZAR: 5000,     // R5,000 - R12,000
    USD: 265,      // $265 - $636
    GBP: 210,      // £210 - £504
    maxZAR: 12000
  }
};

const initialFeatures = {
  authentication: {
    enabled: false,
    cost: featureCosts.authentication.ZAR,
    maxCost: featureCosts.authentication.maxZAR,
    description: "Email/password, OAuth (Google/Apple), forgot/reset password",
    complexity: "medium",
    timeEstimate: "1-2 weeks"
  },
  userProfiles: {
    enabled: false,
    cost: featureCosts.userProfiles.ZAR,
    maxCost: featureCosts.userProfiles.maxZAR,
    description: "View/edit profiles, avatars, role types",
    complexity: "low",
    timeEstimate: "1 week"
  },
  pushNotifications: {
    enabled: false,
    cost: featureCosts.pushNotifications.ZAR,
    maxCost: featureCosts.pushNotifications.maxZAR,
    description: "Local + cloud (Firebase), optional targeting",
    complexity: "medium",
    timeEstimate: "1-2 weeks"
  },
  messaging: {
    enabled: false,
    cost: featureCosts.messaging.ZAR,
    maxCost: featureCosts.messaging.maxZAR,
    description: "1:1 or group chat, real-time (Firestore/Socket), simple UI",
    complexity: "high",
    timeEstimate: "2-3 weeks"
  },
  feedPosts: {
    enabled: false,
    cost: featureCosts.feedPosts.ZAR,
    maxCost: featureCosts.feedPosts.maxZAR,
    description: "Scrollable feed, likes, comments, timestamps",
    complexity: "medium",
    timeEstimate: "2 weeks"
  },
  searchFilters: {
    enabled: false,
    cost: featureCosts.searchFilters.ZAR,
    maxCost: featureCosts.searchFilters.maxZAR,
    description: "Basic fuzzy search, filters, categories",
    complexity: "medium",
    timeEstimate: "1-2 weeks"
  },
  geoMaps: {
    enabled: false,
    cost: featureCosts.geoMaps.ZAR,
    maxCost: featureCosts.geoMaps.maxZAR,
    description: "Location picker, GPS tracking, Google Maps API",
    complexity: "high",
    timeEstimate: "2-3 weeks"
  },
  payments: {
    enabled: false,
    cost: featureCosts.payments.ZAR,
    maxCost: featureCosts.payments.maxZAR,
    description: "PayFast, Stripe, PayPal integration, checkout",
    complexity: "high",
    timeEstimate: "2-3 weeks"
  },
  ecommerceCart: {
    enabled: false,
    cost: featureCosts.ecommerceCart.ZAR,
    maxCost: featureCosts.ecommerceCart.maxZAR,
    description: "Add to cart, quantity, total, checkout",
    complexity: "medium",
    timeEstimate: "2 weeks"
  },
  productListings: {
    enabled: false,
    cost: featureCosts.productListings.ZAR,
    maxCost: featureCosts.productListings.maxZAR,
    description: "Upload/create, image + detail views",
    complexity: "medium",
    timeEstimate: "1-2 weeks"
  },
  bookingsCalendar: {
    enabled: false,
    cost: featureCosts.bookingsCalendar.ZAR,
    maxCost: featureCosts.bookingsCalendar.maxZAR,
    description: "Availability, time slot picker, simple logic",
    complexity: "medium",
    timeEstimate: "2 weeks"
  },
  adminDashboard: {
    enabled: false,
    cost: featureCosts.adminDashboard.ZAR,
    maxCost: featureCosts.adminDashboard.maxZAR,
    description: "View/edit users/data, moderate content",
    complexity: "high",
    timeEstimate: "3-4 weeks"
  },
  analytics: {
    enabled: false,
    cost: featureCosts.analytics.ZAR,
    maxCost: featureCosts.analytics.maxZAR,
    description: "Firebase, Mixpanel, page tracking",
    complexity: "low",
    timeEstimate: "1 week"
  },
  cloudStorage: {
    enabled: false,
    cost: featureCosts.cloudStorage.ZAR,
    maxCost: featureCosts.cloudStorage.maxZAR,
    description: "Upload docs/images, S3 or Firebase storage",
    complexity: "medium",
    timeEstimate: "1-2 weeks"
  },
  uiuxPrototype: {
    enabled: false,
    cost: featureCosts.uiuxPrototype.ZAR,
    maxCost: featureCosts.uiuxPrototype.maxZAR,
    description: "High-fidelity Figma designs, interactive flows",
    complexity: "medium",
    timeEstimate: "2-3 weeks"
  },
  multiLanguage: {
    enabled: false,
    cost: featureCosts.multiLanguage.ZAR,
    maxCost: featureCosts.multiLanguage.maxZAR,
    description: "Translation setup, i18n config",
    complexity: "medium",
    timeEstimate: "1-2 weeks"
  },
  offlineMode: {
    enabled: false,
    cost: featureCosts.offlineMode.ZAR,
    maxCost: featureCosts.offlineMode.maxZAR,
    description: "Local caching, retry logic",
    complexity: "high",
    timeEstimate: "2 weeks"
  },
  apiIntegrations: {
    enabled: false,
    cost: featureCosts.apiIntegrations.ZAR,
    maxCost: featureCosts.apiIntegrations.maxZAR,
    description: "Connect to 3rd-party services (per integration)",
    complexity: "medium",
    timeEstimate: "1-2 weeks"
  },
  security2FA: {
    enabled: false,
    cost: featureCosts.security2FA.ZAR,
    maxCost: featureCosts.security2FA.maxZAR,
    description: "OTP, email verification, rate limiting",
    complexity: "medium",
    timeEstimate: "1-2 weeks"
  },
  userRoles: {
    enabled: false,
    cost: featureCosts.userRoles.ZAR,
    maxCost: featureCosts.userRoles.maxZAR,
    description: "Admin/staff/customer tier access",
    complexity: "medium",
    timeEstimate: "1-2 weeks"
  }
};

type Currency = 'ZAR' | 'USD' | 'GBP';

const currencySymbols = {
  ZAR: "R",
  USD: "$",
  GBP: "£"
};

const exchangeRates = {
  ZAR: 1,      // Base rate for ZAR
  USD: 0.053,  // 1 ZAR = 0.053 USD
  GBP: 0.042   // 1 ZAR = 0.042 GBP
};

const baseRates = {
  features: {
    ZAR: 2000,    // R2,000 per feature
    USD: 200,     // $200 per feature
    GBP: 160      // £160 per feature
  },
  screens: {
    ZAR: 1500,    // R1,500 per screen
    USD: 150,     // $150 per screen
    GBP: 120      // £120 per screen
  },
  complexity: {
    low: {
      ZAR: 15000,   // R15,000 base
      USD: 1500,    // $1,500 base
      GBP: 1200     // £1,200 base
    },
    medium: {
      ZAR: 30000,   // R30,000 base
      USD: 3000,    // $3,000 base
      GBP: 2400     // £2,400 base
    },
    high: {
      ZAR: 50000,   // R50,000 base
      USD: 5000,    // $5,000 base
      GBP: 4000     // £4,000 base
    }
  }
};

export const ProjectCalculator = () => {
  const [features, setFeatures] = useState(initialFeatures);
  const [screens, setScreens] = useState(1);
  const [complexity, setComplexity] = useState<'low' | 'medium' | 'high'>('low');
  const [currency, setCurrency] = useState<Currency>('ZAR');
  const [savedEstimates, setSavedEstimates] = useState<SavedEstimate[]>([]);
  const [showSaved, setShowSaved] = useState(false);
  const [selectedComplexity, setSelectedComplexity] = useState<string[]>([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    // Load saved estimates from localStorage
    const saved = localStorage.getItem('savedEstimates');
    if (saved) {
      setSavedEstimates(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    const basePrice = baseRates.complexity[complexity][currency];
    const featuresCost = Object.values(features).filter(f => f.enabled).reduce((sum, f) => sum + f.cost, 0);
    const screensCost = screens * baseRates.screens[currency];
    
    setTotal(basePrice + featuresCost + screensCost);
  }, [features, screens, complexity, currency]);

  useEffect(() => {
    setFeatures(prev => {
      const updated = { ...prev };
      Object.keys(updated).forEach(key => {
        updated[key] = {
          ...updated[key],
          cost: featureCosts[key as keyof typeof featureCosts][currency]
        };
      });
      return updated;
    });
  }, [currency]);

  const handleSaveEstimate = () => {
    const newEstimate: SavedEstimate = {
      id: Date.now().toString(),
      features,
      totalCost: total,
      date: new Date()
    };

    const updatedEstimates = [...savedEstimates, newEstimate];
    setSavedEstimates(updatedEstimates);
    localStorage.setItem('savedEstimates', JSON.stringify(updatedEstimates));
    
    toast.success('Estimate saved successfully!');
  };

  const handleComplexityFilter = (complexity: string) => {
    setSelectedComplexity(prev => 
      prev.includes(complexity) 
        ? prev.filter(c => c !== complexity)
        : [...prev, complexity]
    );
  };

  const formatPriceRange = (min: number, max: number, curr: Currency): string => {
    const minPrice = Math.round(min * exchangeRates[curr]);
    const maxPrice = Math.round(max * exchangeRates[curr]);
    return `${currencySymbols[curr]}${minPrice.toLocaleString()} - ${currencySymbols[curr]}${maxPrice.toLocaleString()}`;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-emerald-600 to-teal-500 
                       bg-clip-text text-transparent">
          Project Planning Hub
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
          Plan your project with our interactive tools. Get instant cost estimates and timeline projections.
        </p>

        {/* Currency Switcher */}
        <div className="flex flex-col items-center justify-center space-y-4 mb-8">
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Select Your Currency
          </h3>
          <div className="flex space-x-2">
            {(['ZAR', 'USD', 'GBP'] as Currency[]).map((curr) => (
              <motion.button
                key={curr}
                onClick={() => setCurrency(curr)}
                className={`px-6 py-3 rounded-lg flex items-center justify-center space-x-2 
                           transition-all duration-200 ${
                             currency === curr 
                               ? 'bg-emerald-500 text-white shadow-lg scale-105' 
                               : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                           }`}
                whileHover={{ scale: currency === curr ? 1.05 : 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="text-lg font-semibold">{currencySymbols[curr]}</span>
                <span className="text-sm">{curr}</span>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Tabs */}
        <div className="flex justify-center space-x-4 mb-8">
          <button className="px-6 py-2 rounded-lg bg-emerald-500 text-white font-medium">
            Cost Calculator
          </button>
          <button className="px-6 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 
                           text-gray-700 dark:text-gray-300 font-medium 
                           hover:bg-gray-200 dark:hover:bg-gray-700">
            Timeline
          </button>
        </div>
      </div>

      {/* Calculator Content */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg 
                   border border-gray-100 dark:border-gray-700"
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <Calculator className="w-6 h-6 text-emerald-500" />
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              Project Cost Calculator
            </h3>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setShowSaved(!showSaved)}
              className="btn-base px-3 py-2 bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300"
            >
              <Save className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Complexity Filter */}
        <div className="mb-6">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Filter by complexity:</p>
          <div className="flex flex-wrap gap-2">
            {['low', 'medium', 'high', 'very-high'].map(complexity => (
              <button
                key={complexity}
                onClick={() => handleComplexityFilter(complexity)}
                className={`px-3 py-1 rounded-full text-sm ${
                  selectedComplexity.includes(complexity)
                    ? 'bg-emerald-500 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                }`}
              >
                {complexity}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          {Object.entries(features)
            .filter(([_, feature]) => 
              selectedComplexity.length === 0 || 
              selectedComplexity.includes(feature.complexity)
            )
            .map(([key, feature]) => (
              <div key={key} className="group relative">
                <motion.label 
                  className="flex items-center justify-between p-3 rounded-lg border border-gray-200 
                            dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 
                            hover:border-emerald-500 dark:hover:border-emerald-500 
                            hover:shadow-md transform hover:scale-[1.02] 
                            transition-all duration-300 cursor-pointer"
                  whileHover={{ x: 5 }}
                >
                  <div className="flex items-center space-x-4">
                    <input
                      type="checkbox"
                      checked={feature.enabled}
                      onChange={() => setFeatures(prev => ({
                        ...prev,
                        [key]: { ...feature, enabled: !feature.enabled }
                      }))}
                      className="rounded border-gray-300 text-emerald-500 focus:ring-emerald-500"
                    />
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="text-gray-700 dark:text-gray-300 capitalize">{key}</span>
                        <span className="text-sm text-emerald-500">
                          +{formatPriceRange(feature.cost, feature.maxCost, currency)}
                        </span>
                      </div>
                      <span className="text-xs text-gray-500">{feature.timeEstimate}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      feature.complexity === 'low' ? 'bg-green-100 text-green-700' :
                      feature.complexity === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                      feature.complexity === 'high' ? 'bg-orange-100 text-orange-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {feature.complexity}
                    </span>
                  </div>
                </motion.label>
                <div className="absolute left-0 right-0 -bottom-2 translate-y-full opacity-0 
                              group-hover:opacity-100 transition-opacity duration-200 z-10
                              bg-gray-900 text-white text-sm rounded-lg p-2 pointer-events-none">
                  {feature.description}
                </div>
              </div>
            ))}
        </div>

        <motion.div 
          className="mt-6 p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg"
          animate={{ scale: [1, 1.02, 1] }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex items-center justify-between">
            <span className="text-gray-700 dark:text-gray-300">Estimated Cost:</span>
            <motion.span 
              key={total}
              initial={{ scale: 1.1, color: '#10B981' }}
              animate={{ scale: 1, color: '#059669' }}
              className="text-2xl font-bold text-emerald-600 dark:text-emerald-400"
            >
              {currencySymbols[currency]}{total.toLocaleString()}
            </motion.span>
          </div>
          <div className="flex items-center justify-between mt-2">
            <span className="text-gray-700 dark:text-gray-300">Estimated Timeline:</span>
            <span className="text-emerald-600 dark:text-emerald-400">
              {Object.values(features).filter(f => f.enabled).length * 2} weeks
            </span>
          </div>
          <button
            onClick={handleSaveEstimate}
            className="mt-4 w-full btn-base bg-emerald-600 hover:bg-emerald-700"
          >
            Save Estimate
          </button>
        </motion.div>

        <AnimatePresence>
          {showSaved && savedEstimates.length > 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-6 border-t border-gray-200 dark:border-gray-700 pt-4"
            >
              <h4 className="text-lg font-semibold mb-4">Saved Estimates</h4>
              <div className="space-y-3">
                {savedEstimates.map(estimate => (
                  <div
                    key={estimate.id}
                    className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg"
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {new Date(estimate.date).toLocaleDateString()}
                      </span>
                      <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                        {currencySymbols[currency]}{estimate.totalCost.toLocaleString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}; 