import React from 'react';
import { motion } from 'motion/react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Activity, Layers } from 'lucide-react';

// Generate 24-hour historical data
const generate24HourData = () => {
  const data = [];
  const now = new Date();
  
  for (let i = 23; i >= 0; i--) {
    const hour = new Date(now.getTime() - i * 60 * 60 * 1000);
    const hourLabel = hour.getHours();
    
    // Simulate realistic patterns: higher during rush hours
    let baseAQI = 50;
    if ((hourLabel >= 7 && hourLabel <= 9) || (hourLabel >= 17 && hourLabel <= 20)) {
      baseAQI = 80 + Math.random() * 30;
    } else if (hourLabel >= 0 && hourLabel <= 5) {
      baseAQI = 30 + Math.random() * 15;
    } else {
      baseAQI = 50 + Math.random() * 20;
    }
    
    data.push({
      hour: `${hourLabel}:00`,
      aqi: Math.round(baseAQI),
    });
  }
  
  return data;
};

// Pollutant breakdown data
const pollutantData = [
  { name: 'PM2.5', value: 35, limit: 25, color: '#f59e0b' },
  { name: 'PM10', value: 48, limit: 50, color: '#10b981' },
  { name: 'NO₂', value: 62, limit: 80, color: '#f59e0b' },
  { name: 'O₃', value: 88, limit: 100, color: '#f97316' },
  { name: 'CO', value: 12, limit: 50, color: '#10b981' },
  { name: 'SO₂', value: 8, limit: 20, color: '#10b981' },
];

export function AnalyticsGraphs() {
  const historicalData = generate24HourData();

  return (
    <section className="py-16 px-4 bg-slate-900/30" aria-labelledby="analytics-heading">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 id="analytics-heading" className="text-4xl md:text-5xl font-bold text-center mb-4">
            Historical Data & Analytics
          </h2>
          <p className="text-center text-slate-300 text-lg">
            Understanding air quality patterns over the past 24 hours
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* 24-Hour AQI Trend */}
          <motion.div
            className="backdrop-blur-xl bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <Activity className="w-5 h-5 text-blue-400" />
              24-Hour AQI Trend
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={historicalData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis 
                  dataKey="hour" 
                  stroke="#94a3b8"
                  style={{ fontSize: '11px' }}
                  interval={3}
                />
                <YAxis 
                  stroke="#94a3b8"
                  style={{ fontSize: '12px' }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1e293b',
                    border: '1px solid #334155',
                    borderRadius: '8px',
                    color: '#fff'
                  }}
                  labelStyle={{ color: '#94a3b8' }}
                />
                <Line
                  type="monotone"
                  dataKey="aqi"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  dot={{ fill: '#3b82f6', r: 3 }}
                  activeDot={{ r: 6 }}
                  animationDuration={1500}
                />
              </LineChart>
            </ResponsiveContainer>
            <div className="mt-4 p-4 bg-slate-700/30 rounded-lg">
              <div className="text-sm text-slate-300">
                <strong>Key Observation:</strong> AQI peaks during morning (7-9 AM) and evening (5-8 PM) rush hours due to increased traffic emissions.
              </div>
            </div>
          </motion.div>

          {/* Pollutant Breakdown */}
          <motion.div
            className="backdrop-blur-xl bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <Layers className="w-5 h-5 text-purple-400" />
              Current Pollutant Levels
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={pollutantData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis 
                  type="number" 
                  stroke="#94a3b8"
                  style={{ fontSize: '12px' }}
                />
                <YAxis 
                  type="category" 
                  dataKey="name" 
                  stroke="#94a3b8"
                  style={{ fontSize: '12px' }}
                  width={60}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1e293b',
                    border: '1px solid #334155',
                    borderRadius: '8px',
                    color: '#fff'
                  }}
                  formatter={(value: any, name: string, props: any) => {
                    return [
                      `${value} µg/m³ (Limit: ${props.payload.limit} µg/m³)`,
                      'Level'
                    ];
                  }}
                />
                <Bar 
                  dataKey="value" 
                  fill="#3b82f6"
                  radius={[0, 8, 8, 0]}
                  animationDuration={1500}
                />
              </BarChart>
            </ResponsiveContainer>
            <div className="mt-4 grid grid-cols-2 gap-3">
              {pollutantData.slice(0, 4).map((pollutant) => (
                <div key={pollutant.name} className="p-3 bg-slate-700/30 rounded-lg">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-semibold">{pollutant.name}</span>
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: pollutant.color }}
                    />
                  </div>
                  <div className="text-xs text-slate-400">
                    {pollutant.value} / {pollutant.limit} µg/m³
                  </div>
                  <div className="text-xs font-semibold mt-1" style={{ color: pollutant.color }}>
                    {pollutant.value <= pollutant.limit ? 'Within Limits' : 'Exceeds Limits'}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Pollutant Explanations */}
        <motion.div
          className="mt-8 backdrop-blur-xl bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <h3 className="text-xl font-semibold mb-6">Understanding Pollutants</h3>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-4 bg-slate-700/30 rounded-xl">
              <div className="font-semibold mb-2 text-yellow-400">PM2.5 & PM10</div>
              <p className="text-sm text-slate-300">
                Fine particles from vehicle emissions, construction, and combustion. Can penetrate deep into lungs.
              </p>
            </div>
            <div className="p-4 bg-slate-700/30 rounded-xl">
              <div className="font-semibold mb-2 text-orange-400">NO₂ & O₃</div>
              <p className="text-sm text-slate-300">
                Nitrogen dioxide from traffic and ozone from sunlight reactions. Harmful to respiratory system.
              </p>
            </div>
            <div className="p-4 bg-slate-700/30 rounded-xl">
              <div className="font-semibold mb-2 text-green-400">CO & SO₂</div>
              <p className="text-sm text-slate-300">
                Carbon monoxide and sulfur dioxide from industrial sources and fuel combustion.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}