import { z } from 'zod';

export const contactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

export const prdFormSchema = z.object({
  projectName: z.string().min(2, 'Project name is required'),
  companyName: z.string().min(2, 'Company name is required'),
  contactEmail: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Valid phone number is required'),
  budget: z.string().min(1, 'Budget selection is required'),
  timeline: z.string().min(1, 'Timeline selection is required'),
  platform: z.array(z.string()).min(1, 'Select at least one platform'),
  description: z.string().min(50, 'Please provide a detailed description'),
  features: z.string().min(50, 'Please list key features'),
  targetAudience: z.string().min(20, 'Describe your target audience'),
  competitors: z.string(),
  successCriteria: z.string().min(20, 'Define your success criteria'),
  additionalInfo: z.string(),
  termsAccepted: z.boolean().refine((val) => val === true, 'Terms must be accepted'),
}); 