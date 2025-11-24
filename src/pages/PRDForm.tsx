import { useState, type FormEvent } from 'react';
import { AnimatedHeading } from '@/components/ui/AnimatedHeading';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Send, FileText, Clock, List, Mail, Phone,
  CheckCircle, AlertCircle, ChevronDown, Sparkles
} from 'lucide-react';
import type { KeyboardEvent, ChangeEvent } from 'react';

interface PRDFormData {
  projectName: string;
  description: string;
  timeline: string;
  budget: string;
  features: string[];
  email: string;
  phone?: string;
}

type StepNumber = 1 | 2 | 3 | 4;

const timelineOptions = ['1-3 months', '3-6 months', '6-12 months', '1+ year'] as const;
const budgetRanges = [
  'Price on request — still exploring scope',
  'Price on request — aligning internal approvals',
  'Price on request — ready to begin soon',
  'Price on request — enterprise engagement'
] as const;

type TimelineOption = typeof timelineOptions[number];
type BudgetRange = typeof budgetRanges[number];

export function PRDFormPage() {
  const [formData, setFormData] = useState<PRDFormData>({
    projectName: '',
    description: '',
    timeline: '',
    budget: '',
    features: [],
    email: '',
    phone: ''
  });
  const [currentStep, setCurrentStep] = useState<StepNumber>(1);
  const [newFeature, setNewFeature] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setShowSuccess(true);
    console.log('Form submitted:', formData);
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: keyof PRDFormData
  ) => {
    setFormData(prev => ({
      ...prev,
      [field]: e.target.value
    }));
  };

  const addFeature = () => {
    if (newFeature.trim() && formData.features.length < 10) {
      setFormData(prev => ({
        ...prev,
        features: [...prev.features, newFeature.trim()]
      }));
      setNewFeature('');
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addFeature();
    }
  };

  const removeFeature = (index: number) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index)
    }));
  };

  const setTimeline = (option: TimelineOption) => {
    setFormData(prev => ({ ...prev, timeline: option }));
  };

  const setBudget = (range: BudgetRange) => {
    setFormData(prev => ({ ...prev, budget: range }));
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Project Name
                <span className="text-emerald-500 ml-1">*</span>
              </label>
              <div className="relative group">
                <input
                  type="text"
                  value={formData.projectName}
                  onChange={(e) => handleInputChange(e, 'projectName')}
                  className="w-full pl-4 pr-10 py-3 rounded-lg border border-gray-300 dark:border-gray-600 
                            bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                            focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400
                            transition-all duration-200"
                  placeholder="Enter your project name"
                  required
                />
                <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 
                              transition-opacity duration-300 pointer-events-none">
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 via-teal-500/5 
                                to-emerald-500/5 blur-sm rounded-lg" />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Project Description
                <span className="text-emerald-500 ml-1">*</span>
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => handleInputChange(e, 'description')}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 
                          bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                          focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400
                          transition-all duration-200"
                rows={4}
                placeholder="Describe your project vision and goals"
                required
              />
            </div>
          </motion.div>
        );

      case 2:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Timeline
                <span className="text-emerald-500 ml-1">*</span>
              </label>
              <div className="grid grid-cols-2 gap-3">
                {timelineOptions.map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setTimeline(option as TimelineOption)}
                    className={`p-3 rounded-lg border transition-all duration-200
                              ${formData.timeline === option
                                ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400'
                                : 'border-gray-200 dark:border-gray-700 hover:border-emerald-500'
                              }`}
                  >
                    <Clock className="w-5 h-5 mb-2 mx-auto" />
                    {option}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Budget Range
                <span className="text-emerald-500 ml-1">*</span>
              </label>
              <div className="grid grid-cols-2 gap-3">
                {budgetRanges.map((range) => (
                  <button
                    key={range}
                    type="button"
                    onClick={() => setBudget(range as BudgetRange)}
                    className={`p-3 rounded-lg border transition-all duration-200
                              ${formData.budget === range
                                ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400'
                                : 'border-gray-200 dark:border-gray-700 hover:border-emerald-500'
                              }`}
                  >
                    <Sparkles className="w-5 h-5 mb-2 mx-auto" />
                    {range}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        );

      case 3:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Key Features
                <span className="text-emerald-500 ml-1">*</span>
              </label>
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={newFeature}
                  onChange={(e) => setNewFeature(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="flex-grow px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 
                            bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                            focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400"
                  placeholder="Add a feature"
                />
                <button
                  type="button"
                  onClick={addFeature}
                  className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600
                           transition-colors duration-200"
                  disabled={formData.features.length >= 10}
                >
                  Add
                </button>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {formData.features.length}/10 features added
              </p>

              <div className="space-y-2 mt-4">
                {formData.features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                  >
                    <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                    <button
                      type="button"
                      onClick={() => removeFeature(index)}
                      className="text-red-500 hover:text-red-600"
                    >
                      Remove
                    </button>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        );

      case 4:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Email
                  <span className="text-emerald-500 ml-1">*</span>
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 
                                 text-gray-400 dark:text-gray-500" />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange(e, 'email')}
                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 
                              bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                              focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400"
                    placeholder="Your email"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Phone (Optional)
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 
                                  text-gray-400 dark:text-gray-500" />
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange(e, 'phone')}
                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 
                              bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                              focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400"
                    placeholder="Your phone number"
                  />
                </div>
              </div>
            </div>

            <div className="mt-8">
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full btn-base bg-emerald-600 hover:bg-emerald-700 
                         flex items-center justify-center space-x-2"
              >
                <Send className="w-5 h-5" />
                <span>Submit Project Requirements</span>
              </motion.button>
            </div>
          </motion.div>
        );
    }
  };

  return (
    <div className="min-h-screen py-20 bg-gradient-to-b from-white to-emerald-50 dark:from-gray-900 dark:to-emerald-900/10">
      <div className="container mx-auto px-6">
        <AnimatedHeading 
          variant="glitch"
          className="text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-white mb-8"
        >
          Project Requirements
        </AnimatedHeading>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 text-center max-w-2xl mx-auto"
        >
          <p className="text-gray-600 dark:text-gray-300">
            Tell us about your project and we'll help bring it to life.
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex justify-between">
              {[1, 2, 3, 4].map((step) => (
                <div
                  key={step}
                  className={`flex-1 ${step !== 4 ? 'border-b-2' : ''} ${
                    step <= currentStep
                      ? 'border-emerald-500'
                      : 'border-gray-200 dark:border-gray-700'
                  }`}
                >
                  <div
                    className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center
                              transition-colors duration-300 ${
                      step === currentStep
                        ? 'bg-emerald-500 text-white'
                        : step < currentStep
                        ? 'bg-emerald-100 dark:bg-emerald-900 text-emerald-500'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-400'
                    }`}
                  >
                    {step < currentStep ? (
                      <CheckCircle className="w-5 h-5" />
                    ) : (
                      <span>{step}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <AnimatePresence mode="wait">
                {renderStep()}
              </AnimatePresence>

              <div className="flex justify-between mt-8">
                {currentStep > 1 && (
                  <button
                    type="button"
                    onClick={() => setCurrentStep(prev => prev - 1)}
                    className="px-6 py-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 
                             dark:hover:text-white transition-colors"
                  >
                    Previous
                  </button>
                )}
                {currentStep < 4 && (
                  <button
                    type="button"
                    onClick={() => setCurrentStep(prev => prev + 1)}
                    className="ml-auto px-6 py-2 text-emerald-600 dark:text-emerald-400 
                             hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors"
                  >
                    Next
                  </button>
                )}
              </div>
            </form>
          </motion.div>
        </div>
      </div>

      {/* Success Modal */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-8 max-w-md mx-4"
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/30 rounded-full 
                              flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-emerald-500" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Submission Successful!
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  We'll review your project requirements and get back to you soon.
                </p>
                <button
                  onClick={() => setShowSuccess(false)}
                  className="btn-base bg-emerald-600 hover:bg-emerald-700"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 