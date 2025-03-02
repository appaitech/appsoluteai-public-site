import { motion } from 'framer-motion';

export function Terms() {
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
              Terms of Service
            </h1>
            
            <div className="prose prose-lg dark:prose-invert max-w-none 
                           prose-headings:text-gray-900 dark:prose-headings:text-white
                           prose-p:text-gray-600 dark:prose-p:text-gray-300
                           prose-li:text-gray-600 dark:prose-li:text-gray-300
                           prose-a:text-emerald-600 dark:prose-a:text-emerald-400">
              <p className="lead">Last updated: {new Date().toLocaleDateString()}</p>

              <h2>1. Agreement to Terms</h2>
              <p>
                By accessing or using our services, you agree to be bound by these Terms of Service 
                and our Privacy Policy.
              </p>

              <h2>2. Description of Services</h2>
              <p>
                Idea2RealApp provides software development and digital transformation services, including:
              </p>
              <ul>
                <li>Custom software development</li>
                <li>Mobile application development</li>
                <li>Web application development</li>
                <li>Digital consultation services</li>
              </ul>

              <h2>3. Intellectual Property Rights</h2>
              
              <h3>Ownership of Prototypes and MVPs</h3>
              <p>
                a) All app prototypes, wireframes, designs, and MVPs created by Idea2RealApp 
                remain the exclusive intellectual property of the Company unless explicitly transferred 
                through a separate written agreement.
              </p>
              <p>
                b) The Client is granted a limited, non-exclusive, and non-transferable license to use 
                the prototype solely for evaluation and internal testing purposes.
              </p>

              <h3>Intellectual Property Transfer</h3>
              <p>
                a) Full ownership of the prototype, including source code, UI/UX designs, and related 
                assets, will only be transferred to the Client upon full payment of all agreed-upon fees.
              </p>
              <p>
                b) Any proprietary tools, libraries, or frameworks developed by the Company during the 
                prototyping process remain the exclusive property of the Company and are not subject to transfer.
              </p>

              <h3>Restrictions</h3>
              <p>
                a) The Client may not modify, copy, distribute, or use the prototype for commercial 
                deployment without the Company's written consent or the execution of an intellectual 
                property transfer agreement.
              </p>
              <p>
                b) The Client may not claim authorship or seek to register any intellectual property 
                created by the Company as their own unless full ownership rights have been explicitly transferred.
              </p>

              <h3>Third-Party Components</h3>
              <p>
                a) If any third-party assets (e.g., open-source libraries, stock images, or licensed tools) 
                are used in the prototype, their respective licenses will govern their usage, and the 
                Company does not guarantee transferability.
              </p>

              <h3>Confidentiality & Non-Disclosure</h3>
              <p>
                a) Both parties agree to maintain strict confidentiality regarding proprietary information 
                exchanged during the development process.
              </p>
              <p>
                b) The Client shall not disclose, reverse-engineer, or reproduce the prototype without 
                prior written approval from the Company.
              </p>

              <h2>4. Payment Terms</h2>
              <p>
                Payment terms are as follows:
              </p>
              <ul>
                <li>50% upfront payment to commence work</li>
                <li>Remaining payment upon project completion</li>
                <li>Additional features or changes may incur extra costs</li>
                <li>All prices are subject to applicable taxes</li>
              </ul>

              <h2>5. Contact Information</h2>
              <p>
                For any questions regarding these terms, please contact us at:
                <br />
                <a href="mailto:legal@idea2realapp.com" className="text-emerald-600 hover:text-emerald-700">
                  legal@idea2realapp.com
                </a>
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
} 