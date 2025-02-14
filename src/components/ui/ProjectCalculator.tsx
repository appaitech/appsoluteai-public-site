import { useState, useEffect } from 'react';
import { Calculator, DollarSign, Clock, Save, Sparkles, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';

interface SavedEstimate {
  id: string;
  features: typeof initialFeatures;
  totalCost: number;
  date: Date;
}

const initialFeatures = {
  authentication: {
    enabled: false,
    cost: 2000,
    description: "User authentication, authorization, and profile management",
    complexity: "medium",
    timeEstimate: "1-2 weeks"
  },
  payment: {
    enabled: false,
    cost: 3000,
    description: "Secure payment processing and transaction management",
    complexity: "high",
    timeEstimate: "2-3 weeks"
  },
  realtime: {
    enabled: false,
    cost: 4000,
    description: "Real-time updates and live data synchronization",
    complexity: "high",
    timeEstimate: "2-3 weeks"
  },
  ai: {
    enabled: false,
    cost: 5000,
    description: "AI/ML features and intelligent automation",
    complexity: "very-high",
    timeEstimate: "3-4 weeks"
  },
  mobile: {
    enabled: false,
    cost: 3000,
    description: "Native mobile app development for iOS and Android",
    complexity: "high",
    timeEstimate: "2-3 weeks"
  }
};

export const ProjectCalculator = () => {
  const [features, setFeatures] = useState(initialFeatures);
  const [savedEstimates, setSavedEstimates] = useState<SavedEstimate[]>([]);
  const [showSaved, setShowSaved] = useState(false);
  const [selectedComplexity, setSelectedComplexity] = useState<string[]>([]);

  useEffect(() => {
    // Load saved estimates from localStorage
    const saved = localStorage.getItem('savedEstimates');
    if (saved) {
      setSavedEstimates(JSON.parse(saved));
    }
  }, []);

  const calculateCost = () => {
    let baseCost = 5000;
    Object.entries(features).forEach(([_, feature]) => {
      if (feature.enabled) baseCost += feature.cost;
    });
    return baseCost;
  };

  const handleSaveEstimate = () => {
    const newEstimate: SavedEstimate = {
      id: Date.now().toString(),
      features,
      totalCost: calculateCost(),
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

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Calculator className="w-6 h-6 text-emerald-500" />
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">Project Cost Calculator</h3>
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
                      <span className="text-sm text-emerald-500">+${feature.cost.toLocaleString()}</span>
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
            key={calculateCost()}
            initial={{ scale: 1.1, color: '#10B981' }}
            animate={{ scale: 1, color: '#059669' }}
            className="text-2xl font-bold text-emerald-600 dark:text-emerald-400"
          >
            ${calculateCost().toLocaleString()}
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
                      ${estimate.totalCost.toLocaleString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}; 