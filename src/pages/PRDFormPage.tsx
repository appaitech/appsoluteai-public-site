import { useState, useEffect, useRef, type FormEvent, ChangeEvent } from 'react';
import { AnimatedHeading } from '@/components/ui/AnimatedHeading';
import { motion } from 'framer-motion';
import { 
  FileText, Send, Mail, Phone, Info, CheckCircle, 
  Globe, Smartphone, Server, Shield, Users, Settings, Palette, Clock,
  Upload, AlertCircle, ArrowRight, Check,
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

interface ValidationErrors {
  [key: string]: string;
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

const validateForm = (data: PRDFormData): ValidationErrors => {
  const errors: ValidationErrors = {};

  // Required fields validation
  if (!data.clientName) errors.clientName = 'Client name is required';
  if (!data.companyName) errors.companyName = 'Company name is required';
  if (!data.email) errors.email = 'Email is required';
  if (!data.projectDescription) errors.projectDescription = 'Project description is required';
  if (!data.primaryPurpose) errors.primaryPurpose = 'Primary purpose is required';
  if (!data.problemSolution) errors.problemSolution = 'Problem solution is required';
  if (data.targetAudience.length === 0) errors.targetAudience = 'Target audience is required';
  if (!data.timeline) errors.timeline = 'Timeline is required';
  if (data.platforms.length === 0) errors.platforms = 'At least one platform is required';

  // Email format validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (data.email && !emailRegex.test(data.email)) {
    errors.email = 'Invalid email format';
  }

  return errors;
};

const submitPRD = async (data: PRDFormData): Promise<void> => {
  // Here you would typically send the data to your backend
  // For now, we'll just simulate an API call
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > 0.1) { // 90% success rate
        resolve();
      } else {
        reject(new Error('Failed to submit PRD'));
      }
    }, 1500);
  });
};

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
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});
  const [formErrors, setFormErrors] = useState<string[]>([]);
  const sectionRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const setSectionRef = (id: string) => (el: HTMLDivElement | null): void => {
    sectionRefs.current[id] = el;
  };

  useEffect(() => {
    // Initialize refs for all sections
    FORM_SECTIONS.forEach(section => {
      sectionRefs.current[section.id] = null;
    });
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 150; // Reduced from 200px for more precise detection
      const headerOffset = 150; // Offset for header and navigation

      // Find the current section with improved accuracy
      let currentSectionId = FORM_SECTIONS[0].id;
      let closestDistance = Infinity;
      
      for (const section of FORM_SECTIONS) {
        const element = sectionRefs.current[section.id];
        if (element) {
          const distance = Math.abs(element.offsetTop - headerOffset - scrollPosition);
          if (distance < closestDistance) {
            closestDistance = distance;
            currentSectionId = section.id;
          }
        }
      }

      setCurrentSection(currentSectionId);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = sectionRefs.current[sectionId];
    if (element) {
      const headerOffset = 150; // Consistent offset for better alignment
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormErrors([]);
    
    try {
      // Validate form
      const errors = validateForm(formData);
      if (Object.keys(errors).length > 0) {
        setValidationErrors(errors);
        setFormErrors(Object.values(errors));
        Object.values(errors).forEach(error => {
          toast.error(error);
        });
        setIsSubmitting(false);
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
    <div className="min-h-screen py-24 bg-gradient-to-b from-white to-emerald-50 
                    dark:from-gray-900 dark:to-emerald-900/10 transition-colors duration-300">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <AnimatedHeading 
          variant="gradient"
          className="text-5xl md:text-6xl font-bold text-center mb-12 font-display tracking-normal"
        >
          Project Requirements Document
        </AnimatedHeading>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-2xl p-6 md:p-10 shadow-lg 
                     transition-colors duration-300 max-w-5xl mx-auto border border-emerald-500/20
                     shadow-[0_0_35px_rgba(16,185,129,0.25)]"
        >
          <form onSubmit={handleSubmit} className="space-y-16">
            {/* Section: Basic Information */}
            <div ref={setSectionRef('basic')} className="space-y-8">
              <AnimatedHeading 
                variant="gradient"
                className="text-2xl md:text-3xl font-semibold mb-8"
              >
                Basic Information
              </AnimatedHeading>
              
              <div className="grid md:grid-cols-2 gap-8">
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

              <div className="grid md:grid-cols-2 gap-8">
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
            <div ref={setSectionRef('overview')} className="space-y-8 pt-16 border-t border-gray-200 dark:border-gray-700">
              <AnimatedHeading 
                variant="gradient"
                className="text-2xl md:text-3xl font-semibold mb-8"
              >
                Project Overview
              </AnimatedHeading>
              
              <div className="space-y-8">
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

            {/* Section: Features & Functionality */}
            <div ref={setSectionRef('features')} className="space-y-8 pt-16 border-t border-gray-200 dark:border-gray-700">
              <AnimatedHeading 
                variant="gradient"
                className="text-2xl md:text-3xl font-semibold mb-8"
              >
                Features & Functionality
              </AnimatedHeading>
              
              <div className="space-y-12">
                {/* Key Features */}
                <div className="space-y-6">
                  <label className="block text-lg font-medium text-gray-700 dark:text-gray-300">
                    Key Features
                  </label>
                  <div className="grid md:grid-cols-2 gap-6">
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
                </div>

                {/* Custom Features */}
                <div className="space-y-6">
                  <label className="block text-lg font-medium text-gray-700 dark:text-gray-300">
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

                {/* User Actions */}
                <div className="space-y-6">
                  <label className="block text-lg font-medium text-gray-700 dark:text-gray-300">
                    User Actions
                  </label>
                  <div className="space-y-6">
                    {[1, 2, 3].map((num) => (
                      <div key={num} className="space-y-2">
                        <label className="block text-sm text-gray-600 dark:text-gray-400">
                          Action {num}
                        </label>
                        <select
                          value={formData[`userAction${num}` as keyof typeof formData] as string}
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
                <div className="space-y-6">
                  <label className="block text-lg font-medium text-gray-700 dark:text-gray-300">
                    Similar Apps
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
            </div>

            {/* Section: Design & User Experience */}
            <div ref={setSectionRef('design')} className="space-y-8 pt-16 border-t border-gray-200 dark:border-gray-700">
              <AnimatedHeading 
                variant="gradient"
                className="text-2xl md:text-3xl font-semibold mb-8"
              >
                Design & User Experience
              </AnimatedHeading>
              
              <div className="space-y-12">
                {/* Design Style */}
                <div className="space-y-4">
                  <label className="block text-lg font-medium text-gray-700 dark:text-gray-300">
                    Design Style
                  </label>
                  <div className="grid md:grid-cols-2 gap-6">
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
                  <label className="block text-lg font-medium text-gray-700 dark:text-gray-300">
                    Brand Guidelines
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
            </div>

            {/* Section: Technical & Platform Requirements */}
            <div ref={setSectionRef('technical')} className="space-y-8 pt-16 border-t border-gray-200 dark:border-gray-700">
              <AnimatedHeading 
                variant="gradient"
                className="text-2xl md:text-3xl font-semibold mb-8"
              >
                Technical & Platform Requirements
              </AnimatedHeading>
              
              <div className="space-y-12">
                {/* Platforms */}
                <div className="space-y-4">
                  <label className="block text-lg font-medium text-gray-700 dark:text-gray-300">
                    Platforms
                  </label>
                  <div className="grid md:grid-cols-2 gap-6">
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
                  <label className="block text-lg font-medium text-gray-700 dark:text-gray-300">
                    Offline Mode
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
                  <label className="block text-lg font-medium text-gray-700 dark:text-gray-300">
                    Third-party Integrations
                  </label>
                  <div className="grid md:grid-cols-2 gap-6">
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
            </div>

            {/* Section: Timeline */}
            <div ref={setSectionRef('timeline')} className="space-y-8 pt-16 border-t border-gray-200 dark:border-gray-700">
              <AnimatedHeading 
                variant="gradient"
                className="text-2xl md:text-3xl font-semibold mb-8"
              >
                Timeline
              </AnimatedHeading>
              
              <div className="space-y-8">
                <label className="block text-lg font-medium text-gray-700 dark:text-gray-300">
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

            {/* Section: Security & Compliance */}
            <div ref={setSectionRef('security')} className="space-y-8 pt-16 border-t border-gray-200 dark:border-gray-700">
              <AnimatedHeading 
                variant="gradient"
                className="text-2xl md:text-3xl font-semibold mb-8"
              >
                Security & Compliance
              </AnimatedHeading>
              
              <div className="space-y-8">
                <label className="block text-lg font-medium text-gray-700 dark:text-gray-300">
                  Security Requirements
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

            {/* Section: Maintenance & Support */}
            <div ref={setSectionRef('maintenance')} className="space-y-8 pt-16 border-t border-gray-200 dark:border-gray-700">
              <AnimatedHeading 
                variant="gradient"
                className="text-2xl md:text-3xl font-semibold mb-8"
              >
                Maintenance & Support
              </AnimatedHeading>
              
              <div className="space-y-8">
                <label className="block text-lg font-medium text-gray-700 dark:text-gray-300">
                  Maintenance Required
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
            <div className="pt-16 border-t border-gray-200 dark:border-gray-700">
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full btn-base bg-emerald-600 hover:bg-emerald-700 
                         flex items-center justify-center space-x-2 py-4"
              >
                <Send className="w-5 h-5" />
                <span>Submit Project Requirements</span>
              </motion.button>
            </div>
          </form>
        </motion.div>

        <div className="mt-8 p-6 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl max-w-5xl mx-auto">
          <div className="flex items-center space-x-3 text-emerald-600 dark:text-emerald-400">
            <Info className="w-5 h-5 flex-shrink-0" />
            <p className="text-sm">
              This PRD will be prepared by AppsoluteAI's expert team based on your inputs.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 