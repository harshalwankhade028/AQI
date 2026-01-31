import React, { useState } from 'react';
import { motion } from 'motion/react';
import { MapPin, Navigation, Thermometer } from 'lucide-react';

interface MapProps {
  currentAQI: number;
  userLocation: { lat: number; lng: number; name: string } | null;
}

interface SensorPoint {
  id: string;
  lat: number;
  lng: number;
  aqi: number;
  location: string;
}

// Mock sensor data
const sensorPoints: SensorPoint[] = [
  { id: '1', lat: 40.7589, lng: -73.9851, aqi: 45, location: 'Times Square' },
  { id: '2', lat: 40.7128, lng: -74.0060, aqi: 72, location: 'Downtown' },
  { id: '3', lat: 40.7580, lng: -73.9855, aqi: 88, location: 'Midtown' },
  { id: '4', lat: 40.7614, lng: -73.9776, aqi: 125, location: 'Upper East' },
  { id: '5', lat: 40.7489, lng: -73.9680, aqi: 56, location: 'East Side' },
  { id: '6', lat: 40.7282, lng: -73.7949, aqi: 95, location: 'Industrial Zone' },
  { id: '7', lat: 40.7480, lng: -73.9862, aqi: 63, location: 'Chelsea' },
  { id: '8', lat: 40.7400, lng: -73.9900, aqi: 110, location: 'Garment District' },
];

const getAQIColor = (aqi: number) => {
  if (aqi <= 50) return 'bg-green-500';
  if (aqi <= 100) return 'bg-yellow-500';
  if (aqi <= 150) return 'bg-orange-500';
  return 'bg-red-500';
};

const getAQIGradient = (aqi: number) => {
  if (aqi <= 50) return 'from-green-500/80 to-green-500/20';
  if (aqi <= 100) return 'from-yellow-500/80 to-yellow-500/20';
  if (aqi <= 150) return 'from-orange-500/80 to-orange-500/20';
  return 'from-red-500/80 to-red-500/20';
};

export function InteractiveMap({ currentAQI, userLocation }: MapProps) {
  const [selectedSensor, setSelectedSensor] = useState<SensorPoint | null>(null);
  const [hoveredSensor, setHoveredSensor] = useState<string | null>(null);

  return (
    <section className="py-16 px-4 bg-slate-900/50" aria-labelledby="map-heading">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <h2 id="map-heading" className="text-4xl md:text-5xl font-bold text-center mb-4">
            Real-Time Air Quality Map
          </h2>
          <p className="text-center text-slate-300 text-lg">
            Interactive heatmap showing AQI levels across the city
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Map Container */}
          <motion.div
            className="lg:col-span-2 backdrop-blur-xl bg-slate-800/50 rounded-3xl p-6 border border-slate-700/50 shadow-2xl"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            {/* Map Legend */}
            <div className="flex flex-wrap gap-4 mb-6 pb-4 border-b border-slate-700">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-green-500" />
                <span className="text-sm">Good (0-50)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-yellow-500" />
                <span className="text-sm">Moderate (51-100)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-orange-500" />
                <span className="text-sm">Unhealthy (101-150)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-red-500" />
                <span className="text-sm">Hazardous (150+)</span>
              </div>
            </div>

            {/* Map Visualization */}
            <div className="relative aspect-[4/3] bg-gradient-to-br from-slate-700 to-slate-800 rounded-2xl overflow-hidden">
              {/* Grid lines for map effect */}
              <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5"/>
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
              </svg>

              {/* Heatmap zones (gradients) */}
              {sensorPoints.map((sensor, idx) => (
                <motion.div
                  key={`heat-${sensor.id}`}
                  className={`absolute rounded-full blur-3xl bg-gradient-radial ${getAQIGradient(sensor.aqi)}`}
                  style={{
                    left: `${((sensor.lng + 74.0060) / 0.3) * 100}%`,
                    top: `${((40.7614 - sensor.lat) / 0.05) * 100}%`,
                    width: '300px',
                    height: '300px',
                    transform: 'translate(-50%, -50%)',
                  }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 0.6, scale: 1 }}
                  transition={{ delay: idx * 0.1, duration: 0.8 }}
                />
              ))}

              {/* Sensor points */}
              {sensorPoints.map((sensor, idx) => (
                <motion.div
                  key={sensor.id}
                  className="absolute cursor-pointer"
                  style={{
                    left: `${((sensor.lng + 74.0060) / 0.3) * 100}%`,
                    top: `${((40.7614 - sensor.lat) / 0.05) * 100}%`,
                    transform: 'translate(-50%, -50%)',
                  }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.1 + 0.5 }}
                  onHoverStart={() => setHoveredSensor(sensor.id)}
                  onHoverEnd={() => setHoveredSensor(null)}
                  onClick={() => setSelectedSensor(sensor)}
                >
                  <motion.div
                    className={`relative w-8 h-8 ${getAQIColor(sensor.aqi)} rounded-full shadow-lg`}
                    animate={{
                      scale: hoveredSensor === sensor.id ? 1.5 : 1,
                    }}
                  >
                    {/* Pulse effect */}
                    <motion.div
                      className={`absolute inset-0 ${getAQIColor(sensor.aqi)} rounded-full`}
                      animate={{
                        scale: [1, 2, 2],
                        opacity: [0.7, 0, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: idx * 0.2,
                      }}
                    />
                  </motion.div>

                  {/* Tooltip on hover */}
                  {hoveredSensor === sensor.id && (
                    <motion.div
                      className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-slate-900 px-3 py-2 rounded-lg shadow-xl whitespace-nowrap z-50"
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <div className="text-sm font-semibold">{sensor.location}</div>
                      <div className="text-xs text-slate-300">AQI: {sensor.aqi}</div>
                      <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1">
                        <div className="border-4 border-transparent border-t-slate-900" />
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              ))}

              {/* User location marker */}
              {userLocation && (
                <motion.div
                  className="absolute"
                  style={{
                    left: `${((userLocation.lng + 74.0060) / 0.3) * 100}%`,
                    top: `${((40.7614 - userLocation.lat) / 0.05) * 100}%`,
                    transform: 'translate(-50%, -50%)',
                  }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1 }}
                >
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <MapPin className="w-8 h-8 text-blue-400 drop-shadow-glow" />
                  </motion.div>
                </motion.div>
              )}
            </div>
          </motion.div>

          {/* Details Panel */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            {/* Selected Sensor Details */}
            <div className="backdrop-blur-xl bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Navigation className="w-5 h-5" />
                Location Details
              </h3>
              {selectedSensor ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-4"
                >
                  <div>
                    <div className="text-sm text-slate-400">Location</div>
                    <div className="text-lg font-semibold">{selectedSensor.location}</div>
                  </div>
                  <div>
                    <div className="text-sm text-slate-400">Current AQI</div>
                    <div className="text-3xl font-bold">{selectedSensor.aqi}</div>
                  </div>
                  <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                    <motion.div
                      className={`h-full ${getAQIColor(selectedSensor.aqi)}`}
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min(100, (selectedSensor.aqi / 200) * 100)}%` }}
                    />
                  </div>
                  <div className="pt-4 border-t border-slate-700">
                    <div className="text-sm text-slate-300">
                      Click on map points to view detailed information for each location
                    </div>
                  </div>
                </motion.div>
              ) : (
                <div className="text-slate-400 text-center py-8">
                  Click on a sensor point on the map to view details
                </div>
              )}
            </div>

            {/* Pollutant Breakdown */}
            <div className="backdrop-blur-xl bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Thermometer className="w-5 h-5" />
                Pollutant Levels
              </h3>
              <div className="space-y-3">
                {[
                  { name: 'PM2.5', value: 35, max: 50, color: 'bg-yellow-500' },
                  { name: 'PM10', value: 48, max: 100, color: 'bg-green-500' },
                  { name: 'NO₂', value: 62, max: 100, color: 'bg-yellow-500' },
                  { name: 'O₃', value: 88, max: 100, color: 'bg-orange-500' },
                ].map((pollutant) => (
                  <div key={pollutant.name}>
                    <div className="flex justify-between text-sm mb-1">
                      <span>{pollutant.name}</span>
                      <span className="text-slate-400">{pollutant.value} µg/m³</span>
                    </div>
                    <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                      <motion.div
                        className={pollutant.color}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${(pollutant.value / pollutant.max) * 100}%` }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        style={{ height: '100%' }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}