import React from 'react';
import { motion } from 'motion/react';
import { Baby, Users, Activity, Home, ShieldAlert, Clock, Droplets, Wind } from 'lucide-react';
import type { UserProfile } from '@/app/App';

interface PersonaHealthAdviceProps {
  currentAQI: number;
  userProfile: UserProfile;
}

const getAdviceByPersona = (aqi: number, profile: UserProfile) => {
  const isHighAQI = aqi > 100;
  const isModerateAQI = aqi > 50 && aqi <= 100;
  
  const advice = {
    'children-elderly': {
      icon: Baby,
      title: 'Advice for Children & Elderly',
      color: 'from-purple-500 to-pink-500',
      bgColor: 'bg-purple-500/20',
      borderColor: 'border-purple-400/50',
      recommendations: isHighAQI ? [
        { icon: Home, text: 'Stay indoors as much as possible', urgent: true },
        { icon: ShieldAlert, text: 'Wear N95 masks if you must go outside', urgent: true },
        { icon: Clock, text: 'Avoid outdoor activities during peak hours (6-10 AM, 5-9 PM)', urgent: false },
        { icon: Wind, text: 'Keep windows closed and use air purifiers', urgent: false },
      ] : isModerateAQI ? [
        { icon: Clock, text: 'Limit outdoor activities to 1-2 hours', urgent: false },
        { icon: ShieldAlert, text: 'Consider wearing masks during prolonged outdoor activity', urgent: false },
        { icon: Home, text: 'Take frequent breaks indoors', urgent: false },
      ] : [
        { icon: Activity, text: 'Safe for normal outdoor activities', urgent: false },
        { icon: Clock, text: 'Enjoy outdoor time - air quality is good!', urgent: false },
      ]
    },
    'outdoor-workers': {
      icon: Activity,
      title: 'Advice for Outdoor Workers & Athletes',
      color: 'from-orange-500 to-red-500',
      bgColor: 'bg-orange-500/20',
      borderColor: 'border-orange-400/50',
      recommendations: isHighAQI ? [
        { icon: Clock, text: 'Reschedule intense outdoor activities to early morning or late evening', urgent: true },
        { icon: Activity, text: 'Reduce physical exertion by 50%', urgent: true },
        { icon: ShieldAlert, text: 'Wear sports-grade air filtering masks', urgent: false },
        { icon: Droplets, text: 'Stay hydrated - drink 2x more water than usual', urgent: false },
      ] : isModerateAQI ? [
        { icon: Activity, text: 'Moderate exercise is okay, but avoid peak traffic hours', urgent: false },
        { icon: Droplets, text: 'Maintain good hydration levels', urgent: false },
        { icon: Clock, text: 'Take breaks every 30 minutes during intense activity', urgent: false },
      ] : [
        { icon: Activity, text: 'Perfect conditions for outdoor training', urgent: false },
        { icon: Clock, text: 'All athletic activities are safe', urgent: false },
      ]
    },
    'general-public': {
      icon: Users,
      title: 'Advice for General Public',
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-500/20',
      borderColor: 'border-blue-400/50',
      recommendations: isHighAQI ? [
        { icon: ShieldAlert, text: 'Wear masks when commuting outdoors', urgent: false },
        { icon: Home, text: 'Work from home if possible', urgent: false },
        { icon: Clock, text: 'Plan essential outdoor activities for low-pollution windows', urgent: false },
        { icon: Wind, text: 'Use public transport instead of walking/biking', urgent: false },
      ] : isModerateAQI ? [
        { icon: Clock, text: 'Safe to go outside, but be mindful of time spent outdoors', urgent: false },
        { icon: Wind, text: 'Consider public transport during peak traffic', urgent: false },
      ] : [
        { icon: Activity, text: 'Great day for outdoor activities!', urgent: false },
        { icon: Clock, text: 'No restrictions on outdoor time', urgent: false },
      ]
    }
  };

  return advice[profile.persona];
};

export function PersonaHealthAdvice({ currentAQI, userProfile }: PersonaHealthAdviceProps) {
  const advice = getAdviceByPersona(currentAQI, userProfile);
  const PersonaIcon = advice.icon;

  return (
    <section className="py-16 px-4 bg-slate-900/30" aria-labelledby="health-advice-heading">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <h2 id="health-advice-heading" className="text-4xl md:text-5xl font-bold text-center mb-4">
            Your Personalized Health Advice
          </h2>
          <p className="text-center text-slate-300 text-lg">
            Based on your profile and current air quality
          </p>
        </motion.div>

        <motion.div
          className={`max-w-4xl mx-auto backdrop-blur-xl ${advice.bgColor} border ${advice.borderColor} rounded-3xl p-8 md:p-12`}
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <motion.div
              className={`p-4 rounded-2xl bg-gradient-to-br ${advice.color}`}
              whileHover={{ rotate: [0, -10, 10, 0] }}
              transition={{ duration: 0.5 }}
            >
              <PersonaIcon className="w-8 h-8" />
            </motion.div>
            <div>
              <h3 className="text-2xl md:text-3xl font-bold">{advice.title}</h3>
              <p className="text-slate-300">Current AQI: {Math.round(currentAQI)}</p>
            </div>
          </div>

          {/* Recommendations */}
          <div className="grid md:grid-cols-2 gap-4">
            {advice.recommendations.map((rec, idx) => (
              <motion.div
                key={idx}
                className={`p-4 rounded-xl backdrop-blur-sm ${
                  rec.urgent 
                    ? 'bg-red-500/20 border-2 border-red-400/50' 
                    : 'bg-white/5 border border-white/10'
                }`}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-lg ${
                    rec.urgent ? 'bg-red-500/30' : 'bg-white/10'
                  }`}>
                    <rec.icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm md:text-base">{rec.text}</p>
                    {rec.urgent && (
                      <span className="inline-block mt-2 text-xs font-semibold px-2 py-1 rounded-full bg-red-500/30 text-red-200">
                        High Priority
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Additional Health Sensitivity Warning */}
          {userProfile.healthSensitive && currentAQI > 50 && (
            <motion.div
              className="mt-6 p-4 rounded-xl bg-yellow-500/20 border border-yellow-400/50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-yellow-500/30 rounded-lg">
                  <Baby className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-semibold">Health Sensitivity Alert</div>
                  <p className="text-sm text-slate-200">
                    You've indicated health sensitivities. Please take extra precautions and consult with your healthcare provider if symptoms worsen.
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Safe Travel Windows (for high AQI) */}
          {currentAQI > 100 && (
            <motion.div
              className="mt-6 p-6 rounded-xl bg-green-500/10 border border-green-400/30"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <Clock className="w-5 h-5 text-green-400" />
                Safer Time Windows Today
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {['5-7 AM', '10-11 AM', '2-4 PM', '10-11 PM'].map((time, idx) => (
                  <motion.div
                    key={time}
                    className="text-center p-3 rounded-lg bg-green-500/20"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                  >
                    <Clock className="w-4 h-4 mx-auto mb-1 text-green-400" />
                    <div className="text-sm font-semibold">{time}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}