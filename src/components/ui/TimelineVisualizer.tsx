import { motion, AnimatePresence } from 'framer-motion';
import { Clock, CheckCircle, ArrowRight, Calendar, Users, Code, Rocket, Settings, AlertCircle } from 'lucide-react';
import { useState } from 'react';

interface Phase {
  title: string;
  duration: string;
  tasks: Array<{
    name: string;
    status: 'pending' | 'in-progress' | 'completed';
    assignee?: string;
    details: string;
  }>;
  progress: number;
  icon: JSX.Element;
}

export const TimelineVisualizer = () => {
  const [expandedPhase, setExpandedPhase] = useState<string | null>(null);
  const [selectedTask, setSelectedTask] = useState<string | null>(null);

  const phases: Phase[] = [
    {
      title: "Discovery",
      duration: "1-2 weeks",
      icon: <Calendar className="w-5 h-5 text-blue-500" />,
      progress: 100,
      tasks: [
        {
          name: "Requirements gathering",
          status: 'completed',
          assignee: "Project Manager",
          details: "Detailed analysis of project requirements and objectives"
        },
        {
          name: "Technical planning",
          status: 'completed',
          assignee: "Tech Lead",
          details: "Architecture and technology stack decisions"
        },
        {
          name: "Architecture design",
          status: 'completed',
          assignee: "System Architect",
          details: "System design and infrastructure planning"
        }
      ]
    },
    {
      title: "Development",
      duration: "4-8 weeks",
      icon: <Code className="w-5 h-5 text-emerald-500" />,
      progress: 65,
      tasks: [
        {
          name: "Core functionality",
          status: 'completed',
          assignee: "Dev Team",
          details: "Implementation of core features and basic functionality"
        },
        {
          name: "API integration",
          status: 'in-progress',
          assignee: "Backend Team",
          details: "Integration with external services and APIs"
        },
        {
          name: "Frontend development",
          status: 'in-progress',
          assignee: "Frontend Team",
          details: "UI/UX implementation and responsive design"
        }
      ]
    },
    {
      title: "Testing",
      duration: "2-3 weeks",
      icon: <Settings className="w-5 h-5 text-purple-500" />,
      progress: 25,
      tasks: [
        {
          name: "QA testing",
          status: 'in-progress',
          assignee: "QA Team",
          details: "Comprehensive testing and bug fixing"
        },
        {
          name: "User acceptance",
          status: 'pending',
          assignee: "Client",
          details: "Client review and feedback implementation"
        },
        {
          name: "Performance optimization",
          status: 'pending',
          assignee: "Dev Team",
          details: "Performance testing and optimization"
        }
      ]
    },
    {
      title: "Launch",
      duration: "1 week",
      icon: <Rocket className="w-5 h-5 text-red-500" />,
      progress: 0,
      tasks: [
        {
          name: "Deployment",
          status: 'pending',
          assignee: "DevOps",
          details: "Production deployment and configuration"
        },
        {
          name: "Monitoring",
          status: 'pending',
          assignee: "SRE Team",
          details: "Setup monitoring and alerting systems"
        },
        {
          name: "Support setup",
          status: 'pending',
          assignee: "Support Team",
          details: "Documentation and support system setup"
        }
      ]
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-500';
      case 'in-progress': return 'bg-yellow-500';
      case 'pending': return 'bg-gray-300 dark:bg-gray-600';
      default: return 'bg-gray-300';
    }
  };

  return (
    <div className="py-8">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-2">
          <Clock className="w-6 h-6 text-emerald-500" />
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">Project Timeline</h3>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <span className="w-3 h-3 bg-green-500 rounded-full"></span>
            <span className="text-sm text-gray-600 dark:text-gray-400">Completed</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="w-3 h-3 bg-yellow-500 rounded-full"></span>
            <span className="text-sm text-gray-600 dark:text-gray-400">In Progress</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="w-3 h-3 bg-gray-300 dark:bg-gray-600 rounded-full"></span>
            <span className="text-sm text-gray-600 dark:text-gray-400">Pending</span>
          </div>
        </div>
      </div>

      <div className="space-y-8">
        {phases.map((phase, index) => (
          <motion.div
            key={phase.title}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="relative"
          >
            <div className="flex items-start space-x-4">
              <motion.div 
                className="flex-shrink-0 w-8 h-8 rounded-full bg-white dark:bg-gray-800 
                          border-2 border-emerald-500 flex items-center justify-center"
                whileHover={{ scale: 1.1 }}
              >
                {phase.icon}
              </motion.div>
              <div className="flex-grow">
                <motion.div 
                  className="flex items-center space-x-2 mb-2 cursor-pointer"
                  onClick={() => setExpandedPhase(expandedPhase === phase.title ? null : phase.title)}
                >
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white">{phase.title}</h4>
                  <span className="text-sm text-emerald-500 font-medium">{phase.duration}</span>
                  <div className="flex-grow h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden ml-4">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${phase.progress}%` }}
                      className={`h-full rounded-full ${
                        phase.progress === 100 ? 'bg-green-500' :
                        phase.progress > 0 ? 'bg-yellow-500' : 'bg-gray-300'
                      }`}
                      transition={{ duration: 1, delay: index * 0.2 }}
                    />
                  </div>
                </motion.div>

                <AnimatePresence>
                  {expandedPhase === phase.title && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ul className="mt-2 space-y-3">
                        {phase.tasks.map((task, i) => (
                          <motion.li
                            key={task.name}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                            onClick={() => setSelectedTask(selectedTask === task.name ? null : task.name)}
                            className="group cursor-pointer"
                          >
                            <div className="flex items-center space-x-2 p-2 rounded-lg
                                          hover:bg-gray-50 dark:hover:bg-gray-700/50">
                              <div className={`w-2 h-2 rounded-full ${getStatusColor(task.status)}`} />
                              <span className="text-gray-600 dark:text-gray-400">{task.name}</span>
                              {task.assignee && (
                                <span className="text-xs text-gray-500 dark:text-gray-500 ml-auto">
                                  <Users className="w-4 h-4 inline mr-1" />
                                  {task.assignee}
                                </span>
                              )}
                            </div>
                            
                            <AnimatePresence>
                              {selectedTask === task.name && (
                                <motion.div
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: 'auto' }}
                                  exit={{ opacity: 0, height: 0 }}
                                  className="ml-4 mt-2 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                                >
                                  <p className="text-sm text-gray-600 dark:text-gray-400">
                                    {task.details}
                                  </p>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </motion.li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
            {index < phases.length - 1 && (
              <div className="absolute left-4 top-8 bottom-0 w-px bg-emerald-200 dark:bg-emerald-800" />
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}; 