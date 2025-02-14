import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Loader } from 'lucide-react';
import { toast } from 'sonner';

export function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Implement newsletter subscription API call
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulated API call
      toast.success('Successfully subscribed to newsletter!');
      setEmail('');
    } catch (error) {
      toast.error('Failed to subscribe. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="text-center max-w-2xl mx-auto">
      <h3 className="text-2xl font-bold mb-4">Stay Updated</h3>
      <p className="text-gray-600 mb-6">
        Get the latest insights and trends delivered straight to your inbox
      </p>

      <form onSubmit={handleSubmit} className="flex gap-4">
        <div className="relative flex-1">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full pl-10 pr-4 py-2 rounded-lg border focus:ring-2 focus:ring-emerald-500"
            required
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="bg-emerald-500 text-white px-6 py-2 rounded-lg hover:bg-emerald-600 
                   transition-colors disabled:opacity-50 disabled:cursor-not-allowed
                   flex items-center"
        >
          {loading ? (
            <Loader className="w-5 h-5 animate-spin" />
          ) : (
            'Subscribe'
          )}
        </button>
      </form>
    </div>
  );
} 