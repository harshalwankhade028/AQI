import React, { useEffect, useState } from 'react';
import { motion, useSpring, useTransform } from 'motion/react';
import { Shield, AlertTriangle, AlertCircle, Skull } from 'lucide-react';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';

interface HeroSectionProps {
  currentAQI: number;
}

const getAQIInfo = (aqi: number) => {
  if (aqi <= 50) {
    return {
      level: 'Good',
      color: 'from-green-400 to-emerald-500',
      bgColor: 'bg-green-500/20',
      borderColor: 'border-green-400/50',
      Icon: Shield,
      description: 'Air quality is satisfactory, and air pollution poses little or no risk.'
    };
  } else if (aqi <= 100) {
    return {
      level: 'Moderate',
      color: 'from-yellow-400 to-amber-500',
      bgColor: 'bg-yellow-500/20',
      borderColor: 'border-yellow-400/50',
      Icon: AlertTriangle,
      description: 'Air quality is acceptable. However, there may be a risk for some people.'
    };
  } else if (aqi <= 150) {
    return {
      level: 'Unhealthy for Sensitive Groups',
      color: 'from-orange-400 to-orange-600',
      bgColor: 'bg-orange-500/20',
      borderColor: 'border-orange-400/50',
      Icon: AlertCircle,
      description: 'Members of sensitive groups may experience health effects.'
    };
  } else {
    return {
      level: 'Unhealthy',
      color: 'from-red-500 to-red-700',
      bgColor: 'bg-red-500/20',
      borderColor: 'border-red-400/50',
      Icon: Skull,
      description: 'Everyone may begin to experience health effects.'
    };
  }
};

export function HeroSection({ currentAQI }: HeroSectionProps) {
  const [displayAQI, setDisplayAQI] = useState(currentAQI);
  const springAQI = useSpring(currentAQI, { stiffness: 50, damping: 20 });
  const aqiInfo = getAQIInfo(currentAQI);
  const Icon = aqiInfo.Icon;

  useEffect(() => {
    springAQI.set(currentAQI);
  }, [currentAQI, springAQI]);

  useEffect(() => {
    const unsubscribe = springAQI.on('change', (latest) => {
      setDisplayAQI(Math.round(latest));
    });
    return unsubscribe;
  }, [springAQI]);

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden" aria-labelledby="hero-title">
      {/* Animated Background */}
      <div className="absolute inset-0 z-0" aria-hidden="true">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-900/50 to-slate-900 z-10" />
        <ImageWithFallback 
          src="https://images.unsplash.com/photo-1741171679170-a024eda2d44a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaXR5JTIwc2t5bGluZSUyMHRyYWZmaWMlMjBhZXJpYWwlMjB2aWV3fGVufDF8fHx8MTc2OTg0MDI5MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="City skyline"
          className="w-full h-full object-cover opacity-30"
        />
        {/* Animated particles */}
        <div className="absolute inset-0 z-5">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white/20 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.2, 0.5, 0.2],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="relative z-20 max-w-6xl mx-auto px-4 text-center">
        <motion.h1
          className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Air Quality Intelligence
        </motion.h1>

        <motion.p
          className="text-xl md:text-2xl mb-12 text-slate-300"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Real-time air quality monitoring for healthier cities
        </motion.p>

        {/* AQI Score Card */}
        <motion.div
          className={`max-w-2xl mx-auto backdrop-blur-xl ${aqiInfo.bgColor} border ${aqiInfo.borderColor} rounded-3xl p-8 md:p-12 shadow-2xl`}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="flex items-center justify-center mb-6">
            <motion.div
              animate={{ 
                rotate: [0, 360],
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Icon className="w-16 h-16 md:w-20 md:h-20" />
            </motion.div>
          </div>

          <div className="mb-4">
            <div className="text-7xl md:text-8xl font-bold mb-2">
              <motion.span
                className={`bg-gradient-to-r ${aqiInfo.color} bg-clip-text text-transparent`}
              >
                {displayAQI}
              </motion.span>
            </div>
            <div className="text-2xl md:text-3xl font-semibold mb-4">
              {aqiInfo.level}
            </div>
          </div>

          {/* AQI Color Bar */}
          <div className="relative h-3 bg-white/10 rounded-full overflow-hidden mb-6">
            <motion.div
              className={`absolute inset-y-0 left-0 bg-gradient-to-r ${aqiInfo.color} rounded-full`}
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(100, (currentAQI / 200) * 100)}%` }}
              transition={{ duration: 1, delay: 0.5 }}
            />
          </div>

          <p className="text-lg text-slate-200 mb-6">
            {aqiInfo.description}
          </p>

          {/* Live indicator */}
          <div className="flex items-center justify-center gap-2">
            <motion.div
              className="w-3 h-3 bg-red-500 rounded-full"
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="text-sm font-medium">Live Data</span>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="mt-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="text-slate-400"
          >
            <svg className="w-8 h-8 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}