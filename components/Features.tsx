'use client';

import { motion } from 'framer-motion';
import {
  Mail,
  Calendar,
  Brain,
  Lock,
  Zap,
  Cat,
  MessageSquare,
  Clock,
  Search,
  Shield,
} from 'lucide-react';

const features = [
  {
    icon: Mail,
    title: 'Smart Email Management',
    description:
      'AI-powered email organization and prioritization. Never miss an important message with intelligent filtering and summaries.',
    color: 'from-blue-500 to-blue-600',
  },
  {
    icon: Calendar,
    title: 'Calendar Intelligence',
    description:
      'Automatically sync and manage your calendar events. Get smart suggestions and reminders based on your schedule.',
    color: 'from-purple-500 to-purple-600',
  },
  {
    icon: Brain,
    title: 'AI Assistant',
    description:
      'Your personal AI assistant that understands context and helps you make decisions faster with natural language processing.',
    color: 'from-pink-500 to-pink-600',
  },
  {
    icon: Lock,
    title: 'Local-First Architecture',
    description:
      'All your data stays on your device. No cloud storage, no data mining. Complete privacy and control over your information.',
    color: 'from-green-500 to-green-600',
  },
  {
    icon: Zap,
    title: 'Lightning Fast',
    description:
      'Built with performance in mind. Instant search, real-time updates, and seamless integration with your workflow.',
    color: 'from-yellow-500 to-yellow-600',
  },
  {
    icon: Search,
    title: 'Powerful Search',
    description:
      'Find anything instantly with semantic search across emails, calendar events, and your entire memory database.',
    color: 'from-indigo-500 to-indigo-600',
  },
  {
    icon: Cat,
    title: 'Mascot Chat',
    description:
      'Chat with your friendly MindMesh mascot using natural language. Ask questions, get insights, and manage tasks through conversation.',
    color: 'from-cyan-500 to-cyan-600',
  },
  {
    icon: Clock,
    title: 'Time Management',
    description:
      'Smart time tracking and productivity insights. Understand how you spend your time and optimize your workflow.',
    color: 'from-orange-500 to-orange-600',
  },
  {
    icon: Shield,
    title: 'Enterprise Security',
    description:
      'Bank-level encryption and security. Your sensitive data is protected with industry-standard security practices.',
    color: 'from-red-500 to-red-600',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

export default function Features() {
  return (
    <section id="features" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Everything You Need to
            <br />
            <span className="gradient-text">Stay Productive</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Powerful features designed to make your workflow seamless and efficient
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            const isMascotChat = feature.title === 'Mascot Chat';
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className="group p-6 bg-gray-50 rounded-xl hover:bg-white transition-all duration-300 border border-gray-200 hover:border-blue-200 hover:shadow-lg"
              >
                <div
                  className={`w-12 h-12 rounded-lg ${
                    isMascotChat 
                      ? 'bg-gray-100' 
                      : `bg-gradient-to-br ${feature.color}`
                  } flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                >
                  <Icon className={`w-6 h-6 ${isMascotChat ? 'text-black' : 'text-white'}`} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

