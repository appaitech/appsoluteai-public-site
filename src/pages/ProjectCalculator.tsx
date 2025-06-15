import { useState } from 'react';
import { ProjectCalculator } from '@/components/ui/ProjectCalculator';
import { TimelineVisualizer } from '@/components/ui/TimelineVisualizer';
import { AnimatedHeading } from '@/components/ui/AnimatedHeading';
import { motion } from 'framer-motion';
import { Calculator, Clock, Download, Share2 } from 'lucide-react';

// export function ProjectCalculatorPage() {
//   const [activeTab, setActiveTab] = useState<'calculator' | 'timeline'>('calculator');
//
//   return (
//     <div className="min-h-screen py-20 bg-gradient-to-b from-white to-emerald-50 dark:from-gray-900 dark:to-emerald-900/10">
//       <div className="container mx-auto px-6">
//         <AnimatedHeading 
//           variant="gradient"
//           className="text-5xl md:text-6xl font-bold text-center mb-6 font-display tracking-normal"
//         >
//           Project Planning Hub
//         </AnimatedHeading>
//         
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="mb-8 text-center max-w-2xl mx-auto"
//         >
//           <p className="text-gray-600 dark:text-gray-300">
//             Plan your project with our interactive tools. Get instant cost estimates and timeline projections.
//           </p>
//         </motion.div>
//
//         {/* Tab Navigation */}
//         <div className="flex justify-center mb-12">
//           <div className="bg-white dark:bg-gray-800 rounded-lg p-1 shadow-lg">
//             <button
//               onClick={() => setActiveTab('calculator')}
//               className={`px-6 py-2 rounded-md transition-all duration-200 ${
//                 activeTab === 'calculator' 
//                   ? 'bg-emerald-500 text-white' 
//                   : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
//               }`}
//             >
//               <span className="flex items-center space-x-2">
//                 <Calculator className="w-4 h-4" />
//                 <span>Cost Calculator</span>
//               </span>
//             </button>
//             <button
//               onClick={() => setActiveTab('timeline')}
//               className={`px-6 py-2 rounded-md transition-all duration-200 ${
//                 activeTab === 'timeline' 
//                   ? 'bg-emerald-500 text-white' 
//                   : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
//               }`}
//             >
//               <span className="flex items-center space-x-2">
//                 <Clock className="w-4 h-4" />
//                 <span>Timeline</span>
//               </span>
//             </button>
//           </div>
//         </div>
//         
//         <div className="max-w-4xl mx-auto">
//           <motion.div
//             key={activeTab}
//             initial={{ opacity: 0, x: 20 }}
//             animate={{ opacity: 1, x: 0 }}
//             exit={{ opacity: 0, x: -20 }}
//             transition={{ duration: 0.3 }}
//           >
//             {activeTab === 'calculator' ? <ProjectCalculator /> : <TimelineVisualizer />}
//           </motion.div>
//
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 0.5 }}
//             className="mt-8 flex justify-center space-x-4"
//           >
//             <button className="btn-base flex items-center space-x-2 bg-emerald-600 hover:bg-emerald-700">
//               <Download className="w-4 h-4" />
//               <span>Export PDF</span>
//             </button>
//             <button className="btn-base flex items-center space-x-2 bg-emerald-600 hover:bg-emerald-700">
//               <Share2 className="w-4 h-4" />
//               <span>Share</span>
//             </button>
//           </motion.div>
//
//           <div className="mt-12 text-center">
//             <p className="text-sm text-gray-500 dark:text-gray-400">
//               Need a more detailed quote? <a href="#contact" className="text-emerald-500 hover:text-emerald-600">Contact us</a>
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }