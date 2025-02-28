import { motion } from 'framer-motion';

export function PrivacyPolicy() {
  return (
    <div className="pt-20">
      <section className="py-16 sm:py-32 relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-emerald-600 to-teal-500 
                          bg-clip-text text-transparent">
              Privacy Policy
            </h1>
            
            <div className="prose prose-lg dark:prose-invert max-w-none 
                           prose-headings:text-gray-900 dark:prose-headings:text-white
                           prose-p:text-gray-600 dark:prose-p:text-gray-300
                           prose-li:text-gray-600 dark:prose-li:text-gray-300
                           prose-a:text-emerald-600 dark:prose-a:text-emerald-400">
              <p className="lead">Last updated: {new Date().toLocaleDateString()}</p>
              
              <h2>1. Information We Collect</h2>
              <p>
                We collect information that you provide directly to us, including:
              </p>
              <ul>
                <li>Name and contact information</li>
                <li>Project requirements and specifications</li>
                <li>Communication preferences</li>
                <li>Payment information</li>
              </ul>

              <h2>2. How We Use Your Information</h2>
              <p>
                We use the information we collect to:
              </p>
              <ul>
                <li>Provide and improve our services</li>
                <li>Communicate with you about your projects</li>
                <li>Send important updates and announcements</li>
                <li>Process payments and transactions</li>
                <li>Analyze and improve our website performance</li>
              </ul>

              <h2>3. Information Sharing</h2>
              <p>
                We do not sell or rent your personal information to third parties. We may share your 
                information only in the following circumstances:
              </p>
              <ul>
                <li>With your consent</li>
                <li>To comply with legal obligations</li>
                <li>To protect our rights and property</li>
                <li>With service providers who assist in our operations</li>
              </ul>

              <h2>4. Data Security</h2>
              <p>
                We implement appropriate technical and organizational measures to protect your personal 
                information against unauthorized access, alteration, disclosure, or destruction.
              </p>

              <h2>5. Your Rights</h2>
              <p>
                You have the right to:
              </p>
              <ul>
                <li>Access your personal information</li>
                <li>Correct inaccurate information</li>
                <li>Request deletion of your information</li>
                <li>Opt-out of marketing communications</li>
              </ul>

              <h2>6. Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy, please contact us at:
                <br />
                <a href="mailto:privacy@idea2realapp.com" className="text-emerald-600 hover:text-emerald-700">
                  privacy@idea2realapp.com
                </a>
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
} 