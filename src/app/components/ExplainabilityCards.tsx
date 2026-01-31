import React from 'react';
import { motion } from 'motion/react';
import { Car, Cloud, Factory, TrendingUp, Wind, Droplets } from 'lucide-react';

interface ExplainabilityCardsProps {
  currentAQI: number;
}

const getExplanations = (aqi: number) => {
  const isHigh = aqi > 100;
  
  return [
    {
      icon: Car,
      title: 'Traffic Emissions',
      contribution: isHigh ? 'High' : 'Medium',
      level: isHigh ? 35 : 20,
      description: isHigh 
        ? 'Heavy traffic during peak hours is significantly increasing PM2.5 and NO₂ levels.'
        : 'Moderate traffic contributing to baseline pollution levels.',
      temporary: true,
      color: isHigh ? 'from-red-500 to-orange-500' : 'from-yellow-500 to-orange-400',
      bgColor: isHigh ? 'bg-red-500/20' : 'bg-yellow-500/20',
    },
    {
      icon: Cloud,
      title: 'Weather Conditions',
      contribution: isHigh ? 'High' : 'Low',
      level: isHigh ? 30 : 10,
      description: isHigh
        ? 'Low wind speed (< 2 m/s) and high humidity (> 70%) are trapping pollutants near ground level.'
        : 'Good wind conditions helping to disperse pollutants effectively.',
      temporary: false,
      color: isHigh ? 'from-blue-600 to-purple-600' : 'from-blue-400 to-cyan-400',
      bgColor: isHigh ? 'bg-blue-500/20' : 'bg-blue-500/10',
    },
    {
      icon: Factory,
      title: 'Industrial Activity',
      contribution: 'Medium',
      level: 20,
      description: 'Steady emissions from industrial zones contributing to background pollution levels.',
      temporary: false,
      color: 'from-gray-500 to-slate-600',
      bgColor: 'bg-gray-500/20',
    },
    {
      icon: TrendingUp,
      title: 'Pollution Buildup',
      contribution: isHigh ? 'High' : 'Low',
      level: isHigh ? 25 : 5,
      description: isHigh
        ? 'PM2.5 accumulation over the last 12 hours due to sustained emission sources and poor dispersion.'
        : 'Minimal accumulation - pollutants are being effectively cleared.',
      temporary: false,
      color: isHigh ? 'from-purple-500 to-pink-500' : 'from-green-500 to-emerald-500',
      bgColor: isHigh ? 'bg-purple-500/20' : 'bg-green-500/10',
    },
  ];
};

export function ExplainabilityCards({ currentAQI }: ExplainabilityCardsProps) {
  const explanations = getExplanations(currentAQI);

  return (
    <section className="py-16 px-4" aria-labelledby="explainability-heading">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 id="explainability-heading" className="text-4xl md:text-5xl font-bold text-center mb-4">
            Why Is the AQI at This Level?
          </h2>
          <p className="text-center text-slate-300 text-lg">
            Understanding the factors affecting your air quality
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {explanations.map((item, idx) => (
            <motion.div
              key={item.title}
              className={`backdrop-blur-xl ${item.bgColor} border border-slate-700/50 rounded-2xl p-6 overflow-hidden relative`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              {/* Header */}
              <div className="flex items-start gap-4 mb-4">
                <motion.div
                  className={`p-3 rounded-xl bg-gradient-to-br ${item.color}`}
                  whileHover={{ rotate: [0, -5, 5, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  <item.icon className="w-6 h-6" />
                </motion.div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-1">{item.title}</h3>
                  <div className="flex items-center gap-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      item.contribution === 'High' ? 'bg-red-500/30 text-red-200' :
                      item.contribution === 'Medium' ? 'bg-yellow-500/30 text-yellow-200' :
                      'bg-green-500/30 text-green-200'
                    }`}>
                      {item.contribution} Impact
                    </span>
                    {item.temporary && (
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/30 text-blue-200">
                        Temporary
                      </span>
                    )}
                    {!item.temporary && item.contribution !== 'Low' && (
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-purple-500/30 text-purple-200">
                        Persistent
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Description */}
              <p className="text-slate-200 mb-4 text-sm leading-relaxed">
                {item.description}
              </p>

              {/* Contribution Bar */}
              <div>
                <div className="flex justify-between text-xs text-slate-400 mb-2">
                  <span>Contribution to Current AQI</span>
                  <span>{item.level}%</span>
                </div>
                <div className="h-2 bg-slate-700/50 rounded-full overflow-hidden">
                  <motion.div
                    className={`h-full bg-gradient-to-r ${item.color}`}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${item.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: idx * 0.1 + 0.3 }}
                  />
                </div>
              </div>

              {/* Decorative element */}
              <div className={`absolute -right-8 -bottom-8 w-32 h-32 bg-gradient-to-br ${item.color} opacity-10 rounded-full blur-2xl`} />
            </motion.div>
          ))}
        </div>

        {/* Weather Details Card */}
        <motion.div
          className="backdrop-blur-xl bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <h3 className="text-xl font-semibold mb-6">Current Weather Impact</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <Wind className="w-8 h-8 mx-auto mb-2 text-cyan-400" />
              <div className="text-sm text-slate-400 mb-1">Wind Speed</div>
              <div className="text-2xl font-bold">
                {currentAQI > 100 ? '1.5' : '4.2'} <span className="text-sm text-slate-400">m/s</span>
              </div>
              <div className="text-xs text-slate-500 mt-1">
                {currentAQI > 100 ? 'Poor dispersion' : 'Good dispersion'}
              </div>
            </div>
            
            <div className="text-center">
              <Droplets className="w-8 h-8 mx-auto mb-2 text-blue-400" />
              <div className="text-sm text-slate-400 mb-1">Humidity</div>
              <div className="text-2xl font-bold">
                {currentAQI > 100 ? '78' : '52'}<span className="text-sm text-slate-400">%</span>
              </div>
              <div className="text-xs text-slate-500 mt-1">
                {currentAQI > 100 ? 'High moisture' : 'Moderate'}
              </div>
            </div>
            
            <div className="text-center">
              <Cloud className="w-8 h-8 mx-auto mb-2 text-slate-400" />
              <div className="text-sm text-slate-400 mb-1">Cloud Cover</div>
              <div className="text-2xl font-bold">
                {currentAQI > 100 ? '85' : '35'}<span className="text-sm text-slate-400">%</span>
              </div>
              <div className="text-xs text-slate-500 mt-1">
                {currentAQI > 100 ? 'Overcast' : 'Partly cloudy'}
              </div>
            </div>
            
            <div className="text-center">
              <TrendingUp className="w-8 h-8 mx-auto mb-2 text-orange-400" />
              <div className="text-sm text-slate-400 mb-1">Temperature</div>
              <div className="text-2xl font-bold">
                {currentAQI > 100 ? '28' : '24'}<span className="text-sm text-slate-400">°C</span>
              </div>
              <div className="text-xs text-slate-500 mt-1">
                {currentAQI > 100 ? 'Warm' : 'Comfortable'}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}