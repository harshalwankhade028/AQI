import React from 'react';
import { motion } from 'motion/react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Area, AreaChart, ResponsiveContainer } from 'recharts';
import { TrendingUp, TrendingDown, AlertCircle } from 'lucide-react';

interface ForecastTimelineProps {
  currentAQI: number;
}

// Generate forecast data
const generateForecastData = (currentAQI: number) => {
  const data = [];
  let aqi = currentAQI;
  
  for (let i = 0; i <= 6; i++) {
    const hour = new Date();
    hour.setHours(hour.getHours() + i);
    const timeLabel = hour.toLocaleTimeString('en-US', { hour: 'numeric', hour12: true });
    
    // Simulate realistic AQI changes
    if (i === 0) {
      data.push({ time: timeLabel, aqi: Math.round(aqi), risk: getRiskLevel(aqi) });
    } else {
      // Morning rush (7-9 AM) and evening rush (5-8 PM) increase AQI
      const currentHour = hour.getHours();
      let change = Math.random() * 10 - 5;
      
      if ((currentHour >= 7 && currentHour <= 9) || (currentHour >= 17 && currentHour <= 20)) {
        change += 8; // Increase during rush hours
      } else if (currentHour >= 22 || currentHour <= 5) {
        change -= 5; // Decrease at night
      }
      
      aqi = Math.max(20, Math.min(180, aqi + change));
      data.push({ time: timeLabel, aqi: Math.round(aqi), risk: getRiskLevel(aqi) });
    }
  }
  
  return data;
};

const getRiskLevel = (aqi: number): string => {
  if (aqi <= 50) return 'Low';
  if (aqi <= 100) return 'Moderate';
  if (aqi <= 150) return 'High';
  return 'Hazardous';
};

const getRiskColor = (risk: string) => {
  switch (risk) {
    case 'Low': return '#10b981';
    case 'Moderate': return '#f59e0b';
    case 'High': return '#f97316';
    case 'Hazardous': return '#ef4444';
    default: return '#10b981';
  }
};

export function ForecastTimeline({ currentAQI }: ForecastTimelineProps) {
  const forecastData = generateForecastData(currentAQI);
  const trend = forecastData[6].aqi > forecastData[0].aqi ? 'increasing' : 'decreasing';

  return (
    <div className="space-y-8">
      {/* Trend Summary */}
      <motion.div
        className="flex flex-wrap items-center justify-center gap-8 backdrop-blur-xl bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <div className="flex items-center gap-3">
          {trend === 'increasing' ? (
            <TrendingUp className="w-8 h-8 text-red-400" />
          ) : (
            <TrendingDown className="w-8 h-8 text-green-400" />
          )}
          <div>
            <div className="text-sm text-slate-400">6-Hour Trend</div>
            <div className={`text-xl font-bold ${trend === 'increasing' ? 'text-red-400' : 'text-green-400'}`}>
              {trend === 'increasing' ? 'Increasing' : 'Decreasing'}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <AlertCircle className="w-8 h-8 text-yellow-400" />
          <div>
            <div className="text-sm text-slate-400">Peak Expected</div>
            <div className="text-xl font-bold">{forecastData[3].time}</div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className={`w-4 h-4 rounded-full ${
            forecastData[6].aqi <= 50 ? 'bg-green-500' :
            forecastData[6].aqi <= 100 ? 'bg-yellow-500' :
            forecastData[6].aqi <= 150 ? 'bg-orange-500' : 'bg-red-500'
          }`} />
          <div>
            <div className="text-sm text-slate-400">AQI in 6 Hours</div>
            <div className="text-xl font-bold">{forecastData[6].aqi}</div>
          </div>
        </div>
      </motion.div>

      {/* Chart */}
      <motion.div
        className="backdrop-blur-xl bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
      >
        <h3 className="text-xl font-semibold mb-6">6-Hour AQI Forecast</h3>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={forecastData}>
            <defs>
              <linearGradient id="aqiGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis 
              dataKey="time" 
              stroke="#94a3b8"
              style={{ fontSize: '12px' }}
            />
            <YAxis 
              stroke="#94a3b8"
              style={{ fontSize: '12px' }}
              label={{ value: 'AQI', angle: -90, position: 'insideLeft', fill: '#94a3b8' }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1e293b',
                border: '1px solid #334155',
                borderRadius: '8px',
                color: '#fff'
              }}
              formatter={(value: any, name: string) => {
                if (name === 'aqi') return [value, 'AQI'];
                return [value, name];
              }}
            />
            <Area
              type="monotone"
              dataKey="aqi"
              stroke="#3b82f6"
              strokeWidth={3}
              fill="url(#aqiGradient)"
              animationDuration={1500}
            />
          </AreaChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Risk Conversion Panel */}
      <motion.div
        className="backdrop-blur-xl bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
      >
        <h3 className="text-xl font-semibold mb-6">Hourly Risk Levels</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
          {forecastData.map((data, idx) => (
            <motion.div
              key={idx}
              className="text-center p-4 rounded-xl bg-slate-700/50 border border-slate-600"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="text-sm font-semibold mb-2">{data.time}</div>
              <div 
                className="w-16 h-16 mx-auto rounded-full flex items-center justify-center text-2xl font-bold mb-2"
                style={{ backgroundColor: getRiskColor(data.risk) + '40', color: getRiskColor(data.risk) }}
              >
                {data.aqi}
              </div>
              <div className="text-xs font-medium" style={{ color: getRiskColor(data.risk) }}>
                {data.risk}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Plain Language Explanation */}
      <motion.div
        className="backdrop-blur-xl bg-blue-500/10 border border-blue-400/30 rounded-2xl p-6"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4 }}
      >
        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <AlertCircle className="w-5 h-5 text-blue-400" />
          What This Means
        </h3>
        <div className="space-y-3 text-slate-200">
          <p className="flex items-start gap-2">
            <span className="text-blue-400 mt-1">•</span>
            <span>
              {trend === 'increasing' 
                ? "AQI is expected to rise due to increased traffic emissions during evening peak hours."
                : "AQI is expected to improve as traffic decreases and weather conditions help disperse pollutants."
              }
            </span>
          </p>
          {currentAQI > 70 && (
            <p className="flex items-start gap-2">
              <span className="text-blue-400 mt-1">•</span>
              <span>Low wind speed and high humidity are preventing pollutant dispersion.</span>
            </p>
          )}
          <p className="flex items-start gap-2">
            <span className="text-blue-400 mt-1">•</span>
            <span>
              {currentAQI > 100 
                ? "PM2.5 levels remain elevated due to sustained emissions over the last 12 hours."
                : "Current conditions are favorable for good air quality with adequate ventilation."
              }
            </span>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
