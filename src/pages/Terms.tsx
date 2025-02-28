import { motion } from 'framer-motion';

export function Terms() {
  return (
    <div className="pt-20">
      <section className="py-32 relative overflow-hidden">
        <div className="container mx-auto px-6">
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
            
            <div className="prose prose-lg dark:prose-invert max-w-none">
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

              <h2>3. Project Development</h2>
              <p>
                Our development process includes:
              </p>
              <ul>
                <li>Initial consultation and requirements gathering</li>
                <li>Project planning and timeline establishment</li>
                <li>Development and testing phases</li>
                <li>Client review and feedback integration</li>
                <li>Deployment and maintenance</li>
              </ul>

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

              <h2>5. Intellectual Property</h2>
              <p>
                Upon full payment, clients receive:
              </p>
              <ul>
                <li>Full ownership of the final product</li>
                <li>Source code and related documentation</li>
                <li>Rights to modify and distribute the software</li>
              </ul>

              <h2>6. Limitation of Liability</h2>
              <p>
                We strive to provide high-quality services but cannot guarantee:
              </p>
              <ul>
                <li>Uninterrupted or error-free operation</li>
                <li>Specific business outcomes or results</li>
                <li>Third-party service availability</li>
              </ul>

              <h2>7. Contact Information</h2>
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