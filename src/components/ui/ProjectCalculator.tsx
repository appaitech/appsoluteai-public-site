import { useState, useEffect } from 'react';
import { Calculator, DollarSign, Clock, Save, Sparkles, AlertCircle, PoundSterling, 
  User, Bell, MessageCircle, List, Filter, MapPin, CreditCard, ShoppingCart, 
  Box, Calendar, BarChart, Cloud, PenTool, Globe, WifiOff, Link, Shield, Users, Info } from 'lucide-react';
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
    ZAR: 8000,
    USD: 424,
    GBP: 336,
    maxZAR: 20000,
    avgZAR: Math.round((8000 + 20000) / 2),
    avgUSD: Math.round((424 + 1060) / 2),
    avgGBP: Math.round((336 + 840) / 2)
  },
  userProfiles: {
    ZAR: 5000,
    USD: 265,
    GBP: 210,
    maxZAR: 12000,
    avgZAR: Math.round((5000 + 12000) / 2),
    avgUSD: Math.round((265 + 636) / 2),
    avgGBP: Math.round((210 + 504) / 2)
  },
  pushNotifications: {
    ZAR: 5000,
    USD: 265,
    GBP: 210,
    maxZAR: 15000,
    avgZAR: Math.round((5000 + 15000) / 2),
    avgUSD: Math.round((265 + 795) / 2),
    avgGBP: Math.round((210 + 630) / 2)
  },
  messaging: {
    ZAR: 15000,
    USD: 795,
    GBP: 630,
    maxZAR: 35000,
    avgZAR: Math.round((15000 + 35000) / 2),
    avgUSD: Math.round((795 + 1855) / 2),
    avgGBP: Math.round((630 + 1470) / 2)
  },
  feedPosts: {
    ZAR: 12000,
    USD: 636,
    GBP: 504,
    maxZAR: 30000,
    avgZAR: Math.round((12000 + 30000) / 2),
    avgUSD: Math.round((636 + 1590) / 2),
    avgGBP: Math.round((504 + 1260) / 2)
  },
  searchFilters: {
    ZAR: 6000,
    USD: 318,
    GBP: 252,
    maxZAR: 18000,
    avgZAR: Math.round((6000 + 18000) / 2),
    avgUSD: Math.round((318 + 954) / 2),
    avgGBP: Math.round((252 + 756) / 2)
  },
  geoMaps: {
    ZAR: 10000,
    USD: 530,
    GBP: 420,
    maxZAR: 30000,
    avgZAR: Math.round((10000 + 30000) / 2),
    avgUSD: Math.round((530 + 1590) / 2),
    avgGBP: Math.round((420 + 1260) / 2)
  },
  payments: {
    ZAR: 15000,
    USD: 795,
    GBP: 630,
    maxZAR: 35000,
    avgZAR: Math.round((15000 + 35000) / 2),
    avgUSD: Math.round((795 + 1855) / 2),
    avgGBP: Math.round((630 + 1470) / 2)
  },
  ecommerceCart: {
    ZAR: 12000,
    USD: 636,
    GBP: 504,
    maxZAR: 25000,
    avgZAR: Math.round((12000 + 25000) / 2),
    avgUSD: Math.round((636 + 1325) / 2),
    avgGBP: Math.round((504 + 1050) / 2)
  },
  productListings: {
    ZAR: 10000,
    USD: 530,
    GBP: 420,
    maxZAR: 22000,
    avgZAR: Math.round((10000 + 22000) / 2),
    avgUSD: Math.round((530 + 1166) / 2),
    avgGBP: Math.round((420 + 924) / 2)
  },
  bookingsCalendar: {
    ZAR: 12000,
    USD: 636,
    GBP: 504,
    maxZAR: 28000,
    avgZAR: Math.round((12000 + 28000) / 2),
    avgUSD: Math.round((636 + 1484) / 2),
    avgGBP: Math.round((504 + 1176) / 2)
  },
  adminDashboard: {
    ZAR: 20000,
    USD: 1060,
    GBP: 840,
    maxZAR: 50000,
    avgZAR: Math.round((20000 + 50000) / 2),
    avgUSD: Math.round((1060 + 2650) / 2),
    avgGBP: Math.round((840 + 2100) / 2)
  },
  analytics: {
    ZAR: 4000,
    USD: 212,
    GBP: 168,
    maxZAR: 10000,
    avgZAR: Math.round((4000 + 10000) / 2),
    avgUSD: Math.round((212 + 530) / 2),
    avgGBP: Math.round((168 + 420) / 2)
  },
  cloudStorage: {
    ZAR: 5000,
    USD: 265,
    GBP: 210,
    maxZAR: 15000,
    avgZAR: Math.round((5000 + 15000) / 2),
    avgUSD: Math.round((265 + 795) / 2),
    avgGBP: Math.round((210 + 630) / 2)
  },
  uiuxPrototype: {
    ZAR: 8000,
    USD: 424,
    GBP: 336,
    maxZAR: 25000,
    avgZAR: Math.round((8000 + 25000) / 2),
    avgUSD: Math.round((424 + 1325) / 2),
    avgGBP: Math.round((336 + 1050) / 2)
  },
  multiLanguage: {
    ZAR: 6000,
    USD: 318,
    GBP: 252,
    maxZAR: 15000,
    avgZAR: Math.round((6000 + 15000) / 2),
    avgUSD: Math.round((318 + 795) / 2),
    avgGBP: Math.round((252 + 630) / 2)
  },
  offlineMode: {
    ZAR: 10000,
    USD: 530,
    GBP: 420,
    maxZAR: 20000,
    avgZAR: Math.round((10000 + 20000) / 2),
    avgUSD: Math.round((530 + 1060) / 2),
    avgGBP: Math.round((420 + 840) / 2)
  },
  apiIntegrations: {
    ZAR: 5000,
    USD: 265,
    GBP: 210,
    maxZAR: 20000,
    avgZAR: Math.round((5000 + 20000) / 2),
    avgUSD: Math.round((265 + 1060) / 2),
    avgGBP: Math.round((210 + 840) / 2)
  },
  security2FA: {
    ZAR: 8000,
    USD: 424,
    GBP: 336,
    maxZAR: 18000,
    avgZAR: Math.round((8000 + 18000) / 2),
    avgUSD: Math.round((424 + 954) / 2),
    avgGBP: Math.round((336 + 756) / 2)
  },
  userRoles: {
    ZAR: 5000,
    USD: 265,
    GBP: 210,
    maxZAR: 12000,
    avgZAR: Math.round((5000 + 12000) / 2),
    avgUSD: Math.round((265 + 636) / 2),
    avgGBP: Math.round((210 + 504) / 2)
  }
};

const initialFeatures = {
  authentication: {
    enabled: false,
    cost: featureCosts.authentication.avgZAR,
    maxCost: featureCosts.authentication.maxZAR,
    description: "Email/password, OAuth (Google/Apple), forgot/reset password",
    complexity: "medium",
    timeEstimate: "1-2 weeks"
  },
  userProfiles: {
    enabled: false,
    cost: featureCosts.userProfiles.avgZAR,
    maxCost: featureCosts.userProfiles.maxZAR,
    description: "View/edit profiles, avatars, role types",
    complexity: "low",
    timeEstimate: "1 week"
  },
  pushNotifications: {
    enabled: false,
    cost: featureCosts.pushNotifications.avgZAR,
    maxCost: featureCosts.pushNotifications.maxZAR,
    description: "Local + cloud (Firebase), optional targeting",
    complexity: "medium",
    timeEstimate: "1-2 weeks"
  },
  messaging: {
    enabled: false,
    cost: featureCosts.messaging.avgZAR,
    maxCost: featureCosts.messaging.maxZAR,
    description: "1:1 or group chat, real-time (Firestore/Socket), simple UI",
    complexity: "high",
    timeEstimate: "2-3 weeks"
  },
  feedPosts: {
    enabled: false,
    cost: featureCosts.feedPosts.avgZAR,
    maxCost: featureCosts.feedPosts.maxZAR,
    description: "Scrollable feed, likes, comments, timestamps",
    complexity: "medium",
    timeEstimate: "2 weeks"
  },
  searchFilters: {
    enabled: false,
    cost: featureCosts.searchFilters.avgZAR,
    maxCost: featureCosts.searchFilters.maxZAR,
    description: "Basic fuzzy search, filters, categories",
    complexity: "medium",
    timeEstimate: "1-2 weeks"
  },
  geoMaps: {
    enabled: false,
    cost: featureCosts.geoMaps.avgZAR,
    maxCost: featureCosts.geoMaps.maxZAR,
    description: "Location picker, GPS tracking, Google Maps API",
    complexity: "high",
    timeEstimate: "2-3 weeks"
  },
  payments: {
    enabled: false,
    cost: featureCosts.payments.avgZAR,
    maxCost: featureCosts.payments.maxZAR,
    description: "PayFast, Stripe, PayPal integration, checkout",
    complexity: "high",
    timeEstimate: "2-3 weeks"
  },
  ecommerceCart: {
    enabled: false,
    cost: featureCosts.ecommerceCart.avgZAR,
    maxCost: featureCosts.ecommerceCart.maxZAR,
    description: "Add to cart, quantity, total, checkout",
    complexity: "medium",
    timeEstimate: "2 weeks"
  },
  productListings: {
    enabled: false,
    cost: featureCosts.productListings.avgZAR,
    maxCost: featureCosts.productListings.maxZAR,
    description: "Upload/create, image + detail views",
    complexity: "medium",
    timeEstimate: "1-2 weeks"
  },
  bookingsCalendar: {
    enabled: false,
    cost: featureCosts.bookingsCalendar.avgZAR,
    maxCost: featureCosts.bookingsCalendar.maxZAR,
    description: "Availability, time slot picker, simple logic",
    complexity: "medium",
    timeEstimate: "2 weeks"
  },
  adminDashboard: {
    enabled: false,
    cost: featureCosts.adminDashboard.avgZAR,
    maxCost: featureCosts.adminDashboard.maxZAR,
    description: "View/edit users/data, moderate content",
    complexity: "high",
    timeEstimate: "3-4 weeks"
  },
  analytics: {
    enabled: false,
    cost: featureCosts.analytics.avgZAR,
    maxCost: featureCosts.analytics.maxZAR,
    description: "Firebase, Mixpanel, page tracking",
    complexity: "low",
    timeEstimate: "1 week"
  },
  cloudStorage: {
    enabled: false,
    cost: featureCosts.cloudStorage.avgZAR,
    maxCost: featureCosts.cloudStorage.maxZAR,
    description: "Upload docs/images, S3 or Firebase storage",
    complexity: "medium",
    timeEstimate: "1-2 weeks"
  },
  uiuxPrototype: {
    enabled: false,
    cost: featureCosts.uiuxPrototype.avgZAR,
    maxCost: featureCosts.uiuxPrototype.maxZAR,
    description: "High-fidelity Figma designs, interactive flows",
    complexity: "medium",
    timeEstimate: "2-3 weeks"
  },
  multiLanguage: {
    enabled: false,
    cost: featureCosts.multiLanguage.avgZAR,
    maxCost: featureCosts.multiLanguage.maxZAR,
    description: "Translation setup, i18n config",
    complexity: "medium",
    timeEstimate: "1-2 weeks"
  },
  offlineMode: {
    enabled: false,
    cost: featureCosts.offlineMode.avgZAR,
    maxCost: featureCosts.offlineMode.maxZAR,
    description: "Local caching, retry logic",
    complexity: "high",
    timeEstimate: "2 weeks"
  },
  apiIntegrations: {
    enabled: false,
    cost: featureCosts.apiIntegrations.avgZAR,
    maxCost: featureCosts.apiIntegrations.maxZAR,
    description: "Connect to 3rd-party services (per integration)",
    complexity: "medium",
    timeEstimate: "1-2 weeks"
  },
  security2FA: {
    enabled: false,
    cost: featureCosts.security2FA.avgZAR,
    maxCost: featureCosts.security2FA.maxZAR,
    description: "OTP, email verification, rate limiting",
    complexity: "medium",
    timeEstimate: "1-2 weeks"
  },
  userRoles: {
    enabled: false,
    cost: featureCosts.userRoles.avgZAR,
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

// Map feature keys to icons
const featureIcons: Record<string, React.ReactNode> = {
  authentication: <Shield className="w-5 h-5 text-emerald-500" />,
  userProfiles: <User className="w-5 h-5 text-blue-500" />,
  pushNotifications: <Bell className="w-5 h-5 text-yellow-500" />,
  messaging: <MessageCircle className="w-5 h-5 text-pink-500" />,
  feedPosts: <List className="w-5 h-5 text-indigo-500" />,
  searchFilters: <Filter className="w-5 h-5 text-gray-500" />,
  geoMaps: <MapPin className="w-5 h-5 text-red-500" />,
  payments: <CreditCard className="w-5 h-5 text-green-700" />,
  ecommerceCart: <ShoppingCart className="w-5 h-5 text-orange-500" />,
  productListings: <Box className="w-5 h-5 text-purple-500" />,
  bookingsCalendar: <Calendar className="w-5 h-5 text-cyan-500" />,
  adminDashboard: <BarChart className="w-5 h-5 text-emerald-700" />,
  analytics: <BarChart className="w-5 h-5 text-blue-700" />,
  cloudStorage: <Cloud className="w-5 h-5 text-sky-500" />,
  uiuxPrototype: <PenTool className="w-5 h-5 text-pink-700" />,
  multiLanguage: <Globe className="w-5 h-5 text-green-500" />,
  offlineMode: <WifiOff className="w-5 h-5 text-gray-700" />,
  apiIntegrations: <Link className="w-5 h-5 text-indigo-700" />,
  security2FA: <Shield className="w-5 h-5 text-orange-700" />,
  userRoles: <Users className="w-5 h-5 text-purple-700" />
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
      (Object.keys(updated) as (keyof typeof featureCosts)[]).forEach(key => {
        updated[key] = {
          ...updated[key],
          cost:
            currency === 'ZAR'
              ? featureCosts[key].avgZAR
              : currency === 'USD'
              ? featureCosts[key].avgUSD
              : featureCosts[key].avgGBP
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

  // Count and sum selected features
  const selectedFeatures = Object.values(features).filter(f => f.enabled);
  const selectedFeaturesCount = selectedFeatures.length;
  const selectedFeaturesTotal = selectedFeatures.reduce((sum, f) => sum + f.cost, 0);

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

        {/* Selected Features Count and Total */}
        <div className="flex items-center justify-between mb-8">
          <span className="text-sm text-gray-700 dark:text-gray-300">
            Selected Features: <span className="font-semibold">{selectedFeaturesCount}</span>
          </span>
          <span className="text-sm text-emerald-600 dark:text-emerald-400">
            +{currencySymbols[currency]}{selectedFeaturesTotal.toLocaleString()}
          </span>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {Object.entries(features)
            .filter(([_, feature]) => 
              selectedComplexity.length === 0 || 
              selectedComplexity.includes(feature.complexity)
            )
            .map(([key, feature]) => (
              <motion.label
                key={key}
                className={`flex flex-col h-full overflow-hidden p-0 min-h-[220px] rounded-2xl border border-emerald-100 dark:border-emerald-900 bg-gradient-to-br from-emerald-50 via-white to-emerald-100 dark:from-gray-900 dark:via-gray-800 dark:to-emerald-950 shadow-lg transition-all duration-300 cursor-pointer hover:shadow-2xl hover:scale-[1.04] ${feature.enabled ? 'ring-2 ring-emerald-400 scale-[1.05]' : ''}`}
                whileHover={{ x: 5 }}
              >
                <div className="flex flex-col items-center p-6 pb-4">
                  <div className="flex items-center w-full justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={feature.enabled}
                        onChange={() => setFeatures(prev => ({
                          ...prev,
                          [key]: { ...feature, enabled: !feature.enabled }
                        }))}
                        className="w-5 h-5 rounded border-2 border-emerald-400 text-emerald-600 focus:ring-emerald-500 transition-all duration-200 shadow-sm"
                      />
                    </div>
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900 shadow-inner">
                      {featureIcons[key]}
                    </div>
                  </div>
                  <div className="w-full text-center mb-2">
                    <span className="block text-lg font-bold text-gray-800 dark:text-white capitalize leading-tight">{key.replace(/([A-Z])/g, ' $1').toLowerCase()}</span>
                  </div>
                  <div className="flex items-center justify-center gap-3 w-full mb-2">
                    <span className="text-base font-semibold text-emerald-600 dark:text-emerald-400">
                      +{currencySymbols[currency]}{feature.cost.toLocaleString()}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      feature.complexity === 'low' ? 'bg-green-100 text-green-700' :
                      feature.complexity === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                      feature.complexity === 'high' ? 'bg-orange-100 text-orange-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {feature.complexity}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-300 font-medium">{feature.timeEstimate}</span>
                  </div>
                  <div className="w-full border-t border-emerald-100 dark:border-emerald-900 my-2"></div>
                  <div className="w-full text-xs text-gray-600 dark:text-gray-400 text-center mt-1">
                    {feature.description}
                  </div>
                </div>
              </motion.label>
            ))}
        </div>

        {/* Info about base price */}
        <div className="flex items-center justify-center mt-6 mb-2">
          <div className="relative group flex items-center gap-2">
            <Info className="w-4 h-4 text-emerald-500" />
            <span className="text-xs text-gray-500 cursor-pointer underline decoration-dotted group-hover:text-emerald-700 transition-colors">Why does the price start at {currencySymbols[currency]}{(baseRates.complexity[complexity][currency] + baseRates.screens[currency]).toLocaleString()}?</span>
            <div className="absolute left-1/2 -translate-x-1/2 top-7 z-20 w-64 bg-gray-900 text-white text-xs rounded-lg p-3 shadow-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200">
              The starting price includes the base cost for a simple project and one screen, even if no features are selected. This covers initial setup, architecture, and a basic app structure.
            </div>
          </div>
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