import React from 'react';
import { motion } from 'motion/react';
import { MapPin, Share2, Calendar, Bell, Download, ExternalLink } from 'lucide-react';

const ctaButtons = [
  {
    icon: MapPin,
    title: 'Check My Area Risk',
    description: 'Get instant AQI for your location',
    color: 'from-blue-500 to-cyan-500',
    bgColor: 'bg-blue-500/20',
    borderColor: 'border-blue-400/50',
  },
  {
    icon: Calendar,
    title: "View Tomorrow's Forecast",
    description: 'Plan ahead with 24-hour predictions',
    color: 'from-purple-500 to-pink-500',
    bgColor: 'bg-purple-500/20',
    borderColor: 'border-purple-400/50',
  },
  {
    icon: Share2,
    title: 'Share Safety Advice',
    description: 'Help others stay informed',
    color: 'from-green-500 to-emerald-500',
    bgColor: 'bg-green-500/20',
    borderColor: 'border-green-400/50',
  },
];

const additionalActions = [
  { icon: Bell, label: 'Set Alert Notifications', color: 'text-yellow-400' },
  { icon: Download, label: 'Download Health Report', color: 'text-green-400' },
  { icon: ExternalLink, label: 'View Full Analytics', color: 'text-blue-400' },
];

export function CTASection() {
  return (
    <section className="py-20 px-4 relative overflow-hidden" aria-labelledby="cta-heading">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/5 to-transparent" aria-hidden="true" />
      <div className="absolute inset-0" aria-hidden="true">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent" id="cta-heading">
            Take Action Now
          </h2>
          <p className="text-xl text-slate-300">
            Stay informed and protect your health with real-time air quality insights
          </p>
        </motion.div>

        {/* Primary CTAs */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {ctaButtons.map((button, idx) => (
            <motion.button
              key={button.title}
              className={`backdrop-blur-xl ${button.bgColor} border ${button.borderColor} rounded-2xl p-8 text-left transition-all hover:shadow-2xl group`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.98 }}
            >
              <motion.div
                className={`w-16 h-16 mb-4 rounded-xl bg-gradient-to-br ${button.color} flex items-center justify-center`}
                whileHover={{ rotate: [0, -10, 10, 0] }}
                transition={{ duration: 0.5 }}
              >
                <button.icon className="w-8 h-8" />
              </motion.div>
              
              <h3 className="text-xl font-bold mb-2">{button.title}</h3>
              <p className="text-sm text-slate-300 mb-4">{button.description}</p>
              
              <div className="flex items-center gap-2 text-sm font-semibold">
                <span className={`bg-gradient-to-r ${button.color} bg-clip-text text-transparent`}>
                  Get Started
                </span>
                <motion.svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </motion.svg>
              </div>
            </motion.button>
          ))}
        </div>

        {/* Secondary Actions */}
        <motion.div
          className="backdrop-blur-xl bg-slate-800/50 border border-slate-700/50 rounded-2xl p-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <h3 className="text-xl font-semibold mb-6 text-center">More Actions</h3>
          <div className="grid md:grid-cols-3 gap-4">
            {additionalActions.map((action, idx) => (
              <motion.button
                key={action.label}
                className="flex items-center gap-3 p-4 bg-slate-700/30 rounded-xl hover:bg-slate-700/50 transition-all"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 + idx * 0.1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <action.icon className={`w-5 h-5 ${action.color}`} />
                <span className="text-sm font-medium">{action.label}</span>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Newsletter Signup */}
        <motion.div
          className="mt-12 backdrop-blur-xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-400/30 rounded-2xl p-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
        >
          <div className="max-w-2xl mx-auto text-center">
            <Bell className="w-12 h-12 mx-auto mb-4 text-blue-400" />
            <h3 className="text-2xl font-bold mb-3">Stay Updated</h3>
            <p className="text-slate-300 mb-6">
              Get daily air quality reports and personalized health alerts
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-xl focus:outline-none focus:border-blue-400 transition-colors"
              />
              <motion.button
                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl font-semibold hover:shadow-lg hover:shadow-blue-500/50 transition-shadow"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Subscribe
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Footer Info */}
        <motion.div
          className="mt-12 text-center text-slate-400 text-sm"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
        >
          <p className="mb-2">
            Air Quality Intelligence Platform • Powered by Advanced AI
          </p>
          <p>
            Data sourced from EPA, WHO, and local monitoring stations • Updated every 5 minutes
          </p>
        </motion.div>
      </div>
    </section>
  );
}