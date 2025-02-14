import { useState, type FormEvent, ChangeEvent } from 'react';
import { AnimatedHeading } from '@/components/ui/AnimatedHeading';
import { motion } from 'framer-motion';
import { 
  FileText, Send, Mail, Phone, Info, CheckCircle, 
  Globe, Smartphone, Server, Shield, Users, Settings, Palette, Clock,
  Upload, AlertCircle, DollarSign, ArrowRight, Check,
  AlertTriangle, Download
} from 'lucide-react';
import { toast } from 'sonner';

interface PRDFormData {
  // Basic Info
  clientName: string;
  companyName: string;
  email: string;
  phone: string;
  date: string;

  // Project Details
  projectDescription: string;
  primaryPurpose: string;
  problemSolution: string;
  targetAudience: string[];
  customAudience: string;

  // Features
  userAuthentication: boolean;
  paymentProcessing: boolean;
  pushNotifications: boolean;
  adminDashboard: boolean;
  userProfiles: boolean;
  messaging: boolean;
  fileUploads: boolean;
  locationServices: boolean;
  booking: boolean;
  ecommerce: boolean;
  customFeatures: string;

  // User Actions
  userAction1: string;
  userAction2: string;
  userAction3: string;
  similarApps: string;

  // Design
  designStyle: string;
  hasLogo: boolean;
  brandGuidelines: string;

  // Platform & Technical
  platforms: string[];
  offlineMode: boolean;
  thirdPartyIntegrations: string[];
  customIntegrations: string;

  // Timeline & Security
  timeline: string;
  securityRequirements: string[];
  customSecurity: string;
  maintenanceRequired: boolean;

  // New fields
  brandAssets: FileUpload[];
  budget: {
    min: number;
    max: number;
  };
  projectPriorities: {
    speed: number;
    quality: number;
    cost: number;
  };
}

interface FileUpload {
  file: File;
  preview: string;
}

// Add these constants for the checkboxes and radio options
const TARGET_AUDIENCES = [
  { id: 'general', label: 'General consumers' },
  { id: 'b2b', label: 'Businesses (B2B)' },
  { id: 'internal', label: 'Internal company use' },
  { id: 'other', label: 'Other' }
];

const KEY_FEATURES = [
  { id: 'auth', label: 'User authentication (Sign-up, login, password reset)' },
  { id: 'payment', label: 'Payment processing (Xero, PayPal, etc.)' },
  { id: 'notifications', label: 'Push notifications' },
  { id: 'admin', label: 'Admin dashboard' },
  { id: 'profiles', label: 'User profiles' },
  { id: 'messaging', label: 'Messaging/chat functionality' },
  { id: 'uploads', label: 'File uploads (images, videos, documents)' },
  { id: 'location', label: 'Location services (maps, GPS tracking)' },
  { id: 'booking', label: 'Booking & scheduling' },
  { id: 'ecommerce', label: 'E-commerce functionality' }
];

const USER_ACTIONS = [
  'Edit their profile and account settings',
  'Make purchases or subscribe to a service',
  'Post and share content',
  'Send messages or chat with other users',
  'Book appointments or schedule services',
  'Leave reviews or rate products/services',
  'Save items to a wishlist or favorites',
  'Access exclusive content',
  'Upload and manage documents/files',
  'Track orders or service requests'
];

const DESIGN_STYLES = [
  { id: 'minimalistic', label: 'Minimalistic' },
  { id: 'modern', label: 'Modern & colourful' },
  { id: 'corporate', label: 'Corporate & professional' },
  { id: 'other', label: 'Other' }
];

const PLATFORMS = [
  { id: 'ios', label: 'iOS' },
  { id: 'android', label: 'Android' },
  { id: 'web', label: 'Web (Browser-based)' },
  { id: 'other', label: 'Other' }
];

const INTEGRATIONS = [
  { id: 'payment', label: 'Payment gateway (e.g., Stripe, PayPal)' },
  { id: 'social', label: 'Social media login (Google, Facebook, Apple)' },
  { id: 'maps', label: 'Maps & location services' },
  { id: 'other', label: 'Other' }
];

const FORM_SECTIONS = [
  { id: 'basic', title: 'Basic Information', icon: FileText },
  { id: 'overview', title: 'Project Overview', icon: Globe },
  { id: 'features', title: 'Features', icon: Settings },
  { id: 'design', title: 'Design', icon: Palette },
  { id: 'technical', title: 'Technical', icon: Server },
  { id: 'timeline', title: 'Timeline', icon: Clock },
  { id: 'security', title: 'Security', icon: Shield },
  { id: 'maintenance', title: 'Maintenance', icon: Settings }
];

export function PRDFormPage() {
  const [formData, setFormData] = useState<PRDFormData>({
    // Initialize with default values
    clientName: '',
    companyName: '',
    email: '',
    phone: '',
    date: new Date().toISOString().split('T')[0],
    projectDescription: '',
    primaryPurpose: '',
    problemSolution: '',
    targetAudience: [],
    customAudience: '',
    userAuthentication: false,
    paymentProcessing: false,
    pushNotifications: false,
    adminDashboard: false,
    userProfiles: false,
    messaging: false,
    fileUploads: false,
    locationServices: false,
    booking: false,
    ecommerce: false,
    customFeatures: '',
    userAction1: '',
    userAction2: '',
    userAction3: '',
    similarApps: '',
    designStyle: '',
    hasLogo: false,
    brandGuidelines: '',
    platforms: [],
    offlineMode: false,
    thirdPartyIntegrations: [],
    customIntegrations: '',
    timeline: '',
    securityRequirements: [],
    customSecurity: '',
    maintenanceRequired: false,
    brandAssets: [],
    budget: { min: 0, max: 0 },
    projectPriorities: { speed: 0, quality: 0, cost: 0 }
  });

  const [currentSection, setCurrentSection] = useState('basic');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [costEstimate, setCostEstimate] = useState({ min: 0, max: 0 });

  const calculateEstimate = (data: PRDFormData) => {
    let basePrice = 10000;
    
    // Add costs based on platforms
    basePrice += data.platforms.length * 5000;
    
    // Add costs based on features
    if (data.userAuthentication) basePrice += 3000;
    if (data.paymentProcessing) basePrice += 4000;
    // ... add other feature costs

    // Add timeline factor
    const timelineFactor = data.timeline === '1-3 months' ? 1.5 : 1;
    
    setCostEstimate({
      min: basePrice * timelineFactor,
      max: basePrice * timelineFactor * 1.5
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Validate form
      const errors = validateForm(formData);
      if (Object.keys(errors).length > 0) {
        setValidationErrors(errors);
        toast.error('Please fill in all required fields');
        return;
      }

      // Submit form
      await submitPRD(formData);
      
      setShowSuccessModal(true);
      toast.success('PRD submitted successfully!');
    } catch (error) {
      toast.error('Failed to submit PRD. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const newUploads = files.map(file => ({
      file,
      preview: URL.createObjectURL(file)
    }));

    setFormData(prev => ({
      ...prev,
      brandAssets: [...prev.brandAssets, ...newUploads]
    }));
  };

  return (
    <div className="min-h-screen py-20 bg-gradient-to-b from-white to-emerald-50 
                  dark:from-gray-900 dark:to-emerald-900/10 transition-colors duration-300">
      <div className="fixed top-20 left-0 w-full bg-white/90 dark:bg-gray-800/90 
                      backdrop-blur-md shadow-md z-40 transition-colors duration-300">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {FORM_SECTIONS.map((section, index) => (
              <div
                key={section.id}
                className={`flex flex-col items-center ${
                  currentSection === section.id
                    ? 'text-emerald-500'
                    : 'text-gray-400'
                }`}
              >
                <section.icon className="w-5 h-5" />
                <span className="text-xs mt-1">{section.title}</span>
                {index < FORM_SECTIONS.length - 1 && (
                  <ArrowRight className="w-4 h-4 ml-4" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 w-full bg-white/90 dark:bg-gray-800/90 
                      backdrop-blur-md shadow-md z-40 transition-colors duration-300">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold flex items-center">
                <DollarSign className="w-5 h-5 text-emerald-500 mr-2" />
                Estimated Cost Range
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                ${costEstimate.min.toLocaleString()} - ${costEstimate.max.toLocaleString()}
              </p>
            </div>
            <button
              type="button"
              onClick={() => {/* Add download handler */}}
              className="btn-base bg-emerald-100 text-emerald-700 hover:bg-emerald-200"
            >
              <Download className="w-4 h-4 mr-2" />
              Download Estimate
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6">
        <AnimatedHeading 
          variant="glitch"
          className="text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-white mb-8"
        >
          Project Requirements Document
        </AnimatedHeading>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg 
                     transition-colors duration-300"
        >
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Section: Basic Information */}
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center space-x-2">
                <FileText className="w-6 h-6 text-emerald-500" />
                <span>Basic Information</span>
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Client Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.clientName}
                    onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 
                              bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                              focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400"
                    placeholder="Your full name"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Company Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 
                              bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                              focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400"
                    placeholder="Your company name"
                    required
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 
                                bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                                focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400"
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Phone (Optional)
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 
                                bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                                focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400"
                      placeholder="+1 (234) 567-8900"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Date
                </label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 
                            bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                            focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400"
                  required
                />
              </div>
            </div>

            {/* Section: Project Overview */}
            <div className="space-y-6 pt-6 border-t border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center space-x-2">
                <Globe className="w-6 h-6 text-emerald-500" />
                <span>1. Project Overview</span>
              </h2>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    1.1 What do you want us to create? <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    value={formData.projectDescription}
                    onChange={(e) => setFormData({ ...formData, projectDescription: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 
                              bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                              focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400"
                    rows={4}
                    placeholder="Describe in detail what you envision for your app, including key functions, user interactions, and must-have features..."
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    2.1 What is the primary purpose of this app? <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    value={formData.primaryPurpose}
                    onChange={(e) => setFormData({ ...formData, primaryPurpose: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 
                              bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                              focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400"
                    rows={3}
                    placeholder="Explain the main objective (e.g., a marketplace, booking system, social platform, business tool, etc.)"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    2.2 What problem does this app solve? <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    value={formData.problemSolution}
                    onChange={(e) => setFormData({ ...formData, problemSolution: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 
                              bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                              focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400"
                    rows={3}
                    placeholder="Describe the specific problem or need this app will address"
                    required
                  />
                </div>

                {/* Target Audience */}
                <div className="space-y-4">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    2.3 Who is your target audience? <span className="text-red-500">*</span>
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    {TARGET_AUDIENCES.map((audience) => (
                      <label
                        key={audience.id}
                        className="flex items-center space-x-3 p-4 rounded-lg border border-gray-200 
                                 dark:border-gray-700 hover:border-emerald-500 cursor-pointer
                                 transition-colors duration-200"
                      >
                        <input
                          type="checkbox"
                          checked={formData.targetAudience.includes(audience.id)}
                          onChange={(e) => {
                            const newAudience = e.target.checked
                              ? [...formData.targetAudience, audience.id]
                              : formData.targetAudience.filter(a => a !== audience.id);
                            setFormData({ ...formData, targetAudience: newAudience });
                          }}
                          className="form-checkbox h-5 w-5 text-emerald-500 rounded
                                   border-gray-300 dark:border-gray-600"
                        />
                        <span className="text-gray-700 dark:text-gray-300">{audience.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Features & Functionality Section */}
            <div className="space-y-6 pt-6 border-t border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center space-x-2">
                <Settings className="w-6 h-6 text-emerald-500" />
                <span>3. Features & Functionality</span>
              </h2>

              {/* Key Features */}
              <div className="space-y-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  3.1 What are the key features you want in the app? <span className="text-red-500">*</span>
                </label>
                <div className="grid md:grid-cols-2 gap-4">
                  {KEY_FEATURES.map((feature) => (
                    <label
                      key={feature.id}
                      className="flex items-center space-x-3 p-4 rounded-lg border border-gray-200 
                               dark:border-gray-700 hover:border-emerald-500 cursor-pointer
                               transition-colors duration-200"
                    >
                      <input
                        type="checkbox"
                        checked={formData[feature.id as keyof typeof formData] as boolean}
                        onChange={(e) => setFormData({ ...formData, [feature.id]: e.target.checked })}
                        className="form-checkbox h-5 w-5 text-emerald-500 rounded
                                 border-gray-300 dark:border-gray-600"
                      />
                      <span className="text-gray-700 dark:text-gray-300">{feature.label}</span>
                    </label>
                  ))}
                </div>
                
                {/* Custom Features */}
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Other Features
                  </label>
                  <textarea
                    value={formData.customFeatures}
                    onChange={(e) => setFormData({ ...formData, customFeatures: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 
                              bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                              focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400"
                    rows={2}
                    placeholder="Describe any additional features you need..."
                  />
                </div>
              </div>

              {/* User Actions */}
              <div className="space-y-4 mt-8">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  3.2 What are three things a logged-in user should be able to do? <span className="text-red-500">*</span>
                </label>
                <div className="space-y-4">
                  {[1, 2, 3].map((num) => (
                    <div key={num} className="space-y-2">
                      <label className="block text-sm text-gray-600 dark:text-gray-400">
                        Action {num}
                      </label>
                      <select
                        value={formData[`userAction${num}` as keyof typeof formData]}
                        onChange={(e) => setFormData({ ...formData, [`userAction${num}`]: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 
                                  bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                                  focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400"
                        required
                      >
                        <option value="">Select an action...</option>
                        {USER_ACTIONS.map((action) => (
                          <option key={action} value={action}>{action}</option>
                        ))}
                      </select>
                    </div>
                  ))}
                </div>
              </div>

              {/* Similar Apps */}
              <div className="space-y-4 mt-8">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  3.3 Are there any apps similar to what you want?
                </label>
                <textarea
                  value={formData.similarApps}
                  onChange={(e) => setFormData({ ...formData, similarApps: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 
                            bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                            focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400"
                  rows={3}
                  placeholder="List any competitor apps or similar solutions for reference..."
                />
              </div>
            </div>

            {/* Design & User Experience Section */}
            <div className="space-y-6 pt-6 border-t border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center space-x-2">
                <Palette className="w-6 h-6 text-emerald-500" />
                <span>4. Design & User Experience</span>
              </h2>

              {/* Design Style */}
              <div className="space-y-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  4.1 Do you have a preferred design style? <span className="text-red-500">*</span>
                </label>
                <div className="grid md:grid-cols-2 gap-4">
                  {DESIGN_STYLES.map((style) => (
                    <label
                      key={style.id}
                      className="flex items-center space-x-3 p-4 rounded-lg border border-gray-200 
                               dark:border-gray-700 hover:border-emerald-500 cursor-pointer
                               transition-colors duration-200"
                    >
                      <input
                        type="radio"
                        name="designStyle"
                        value={style.id}
                        checked={formData.designStyle === style.id}
                        onChange={(e) => setFormData({ ...formData, designStyle: e.target.value })}
                        className="form-radio h-5 w-5 text-emerald-500
                                 border-gray-300 dark:border-gray-600"
                        required
                      />
                      <span className="text-gray-700 dark:text-gray-300">{style.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Brand Guidelines */}
              <div className="space-y-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  4.2 Do you have a logo or brand guidelines? <span className="text-red-500">*</span>
                </label>
                <div className="flex items-center space-x-4">
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="hasLogo"
                      checked={formData.hasLogo}
                      onChange={() => setFormData({ ...formData, hasLogo: true })}
                      className="form-radio h-5 w-5 text-emerald-500"
                      required
                    />
                    <span>Yes (please provide)</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="hasLogo"
                      checked={!formData.hasLogo}
                      onChange={() => setFormData({ ...formData, hasLogo: false })}
                      className="form-radio h-5 w-5 text-emerald-500"
                      required
                    />
                    <span>No, need assistance with branding</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Technical & Platform Requirements */}
            <div className="space-y-6 pt-6 border-t border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center space-x-2">
                <Server className="w-6 h-6 text-emerald-500" />
                <span>5. Technical & Platform Requirements</span>
              </h2>

              {/* Platforms */}
              <div className="space-y-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  5.1 Which platforms should the app be available on? <span className="text-red-500">*</span>
                </label>
                <div className="grid md:grid-cols-2 gap-4">
                  {PLATFORMS.map((platform) => (
                    <label
                      key={platform.id}
                      className="flex items-center space-x-3 p-4 rounded-lg border border-gray-200 
                               dark:border-gray-700 hover:border-emerald-500 cursor-pointer
                               transition-colors duration-200"
                    >
                      <input
                        type="checkbox"
                        checked={formData.platforms.includes(platform.id)}
                        onChange={(e) => {
                          const newPlatforms = e.target.checked
                            ? [...formData.platforms, platform.id]
                            : formData.platforms.filter(p => p !== platform.id);
                          setFormData({ ...formData, platforms: newPlatforms });
                        }}
                        className="form-checkbox h-5 w-5 text-emerald-500 rounded"
                        required
                      />
                      <span className="text-gray-700 dark:text-gray-300">{platform.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Offline Mode */}
              <div className="space-y-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  5.2 Should the app work offline? <span className="text-red-500">*</span>
                </label>
                <div className="flex items-center space-x-4">
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="offlineMode"
                      checked={formData.offlineMode}
                      onChange={() => setFormData({ ...formData, offlineMode: true })}
                      className="form-radio h-5 w-5 text-emerald-500"
                      required
                    />
                    <span>Yes</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="offlineMode"
                      checked={!formData.offlineMode}
                      onChange={() => setFormData({ ...formData, offlineMode: false })}
                      className="form-radio h-5 w-5 text-emerald-500"
                      required
                    />
                    <span>No</span>
                  </label>
                </div>
              </div>

              {/* Third-party Integrations */}
              <div className="space-y-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  5.3 Will the app need third-party integrations?
                </label>
                <div className="grid md:grid-cols-2 gap-4">
                  {INTEGRATIONS.map((integration) => (
                    <label
                      key={integration.id}
                      className="flex items-center space-x-3 p-4 rounded-lg border border-gray-200 
                               dark:border-gray-700 hover:border-emerald-500 cursor-pointer
                               transition-colors duration-200"
                    >
                      <input
                        type="checkbox"
                        checked={formData.thirdPartyIntegrations.includes(integration.id)}
                        onChange={(e) => {
                          const newIntegrations = e.target.checked
                            ? [...formData.thirdPartyIntegrations, integration.id]
                            : formData.thirdPartyIntegrations.filter(i => i !== integration.id);
                          setFormData({ ...formData, thirdPartyIntegrations: newIntegrations });
                        }}
                        className="form-checkbox h-5 w-5 text-emerald-500 rounded"
                      />
                      <span className="text-gray-700 dark:text-gray-300">{integration.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Timeline */}
            <div className="space-y-6 pt-6 border-t border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center space-x-2">
                <Clock className="w-6 h-6 text-emerald-500" />
                <span>6. Timeline</span>
              </h2>

              <div className="space-y-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  6.1 What is your desired launch date? <span className="text-red-500">*</span>
                </label>
                <div className="grid md:grid-cols-3 gap-4">
                  {['1-3 months', '3-6 months', 'Flexible'].map((option) => (
                    <label
                      key={option}
                      className="flex items-center space-x-3 p-4 rounded-lg border border-gray-200 
                               dark:border-gray-700 hover:border-emerald-500 cursor-pointer
                               transition-colors duration-200"
                    >
                      <input
                        type="radio"
                        name="timeline"
                        value={option}
                        checked={formData.timeline === option}
                        onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                        className="form-radio h-5 w-5 text-emerald-500"
                        required
                      />
                      <span className="text-gray-700 dark:text-gray-300">{option}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Security & Compliance */}
            <div className="space-y-6 pt-6 border-t border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center space-x-2">
                <Shield className="w-6 h-6 text-emerald-500" />
                <span>7. Security & Compliance</span>
              </h2>

              <div className="space-y-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  7.1 Do you have any specific security requirements?
                </label>
                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    { id: 'gdpr', label: 'GDPR compliance' },
                    { id: 'hipaa', label: 'HIPAA compliance (for medical data)' }
                  ].map((requirement) => (
                    <label
                      key={requirement.id}
                      className="flex items-center space-x-3 p-4 rounded-lg border border-gray-200 
                               dark:border-gray-700 hover:border-emerald-500 cursor-pointer
                               transition-colors duration-200"
                    >
                      <input
                        type="checkbox"
                        checked={formData.securityRequirements.includes(requirement.id)}
                        onChange={(e) => {
                          const newRequirements = e.target.checked
                            ? [...formData.securityRequirements, requirement.id]
                            : formData.securityRequirements.filter(r => r !== requirement.id);
                          setFormData({ ...formData, securityRequirements: newRequirements });
                        }}
                        className="form-checkbox h-5 w-5 text-emerald-500 rounded"
                      />
                      <span className="text-gray-700 dark:text-gray-300">{requirement.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Maintenance & Support */}
            <div className="space-y-6 pt-6 border-t border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center space-x-2">
                <Settings className="w-6 h-6 text-emerald-500" />
                <span>8. Maintenance & Support</span>
              </h2>

              <div className="space-y-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  8.1 Do you need ongoing support & maintenance after launch? <span className="text-red-500">*</span>
                </label>
                <div className="flex items-center space-x-4">
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="maintenance"
                      checked={formData.maintenanceRequired}
                      onChange={() => setFormData({ ...formData, maintenanceRequired: true })}
                      className="form-radio h-5 w-5 text-emerald-500"
                      required
                    />
                    <span>Yes (Separate contract)</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="maintenance"
                      checked={!formData.maintenanceRequired}
                      onChange={() => setFormData({ ...formData, maintenanceRequired: false })}
                      className="form-radio h-5 w-5 text-emerald-500"
                      required
                    />
                    <span>No</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-8 border-t border-gray-200 dark:border-gray-700">
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
          </form>
        </motion.div>
      </div>

      {showSuccessModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white dark:bg-gray-800 rounded-lg p-8 max-w-md mx-4"
          >
            {/* Success modal content */}
          </motion.div>
        </div>
      )}

      <div className="mt-6 p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg">
        <div className="flex items-center space-x-2 text-emerald-600 dark:text-emerald-400">
          <Info className="w-5 h-5" />
          <p className="text-sm">
            This PRD will be prepared by Idea2RealApp's expert team based on your inputs.
          </p>
        </div>
      </div>
    </div>
  );
} 