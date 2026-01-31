import React from 'react';
import { motion } from 'motion/react';
import { User, Users, Baby, Heart, MapPin } from 'lucide-react';
import type { UserProfile, AgeGroup, Persona } from '@/app/App.tsx';

interface UserInputPanelProps {
  userProfile: UserProfile;
  onProfileChange: (profile: UserProfile) => void;
}

const ageGroups: { value: AgeGroup; label: string; icon: typeof Baby }[] = [
  { value: 'child', label: 'Child', icon: Baby },
  { value: 'adult', label: 'Adult', icon: User },
  { value: 'elderly', label: 'Elderly', icon: Users },
];

const personas: { value: Persona; label: string; description: string }[] = [
  { 
    value: 'children-elderly', 
    label: 'Children / Elderly',
    description: 'Sensitive groups requiring extra care'
  },
  { 
    value: 'outdoor-workers', 
    label: 'Outdoor Workers / Athletes',
    description: 'Active individuals with high exposure'
  },
  { 
    value: 'general-public', 
    label: 'General Public',
    description: 'Standard health recommendations'
  },
];

const locations = [
  { name: 'Downtown', lat: 40.7128, lng: -74.0060 },
  { name: 'Midtown', lat: 40.7580, lng: -73.9855 },
  { name: 'Upper East', lat: 40.7614, lng: -73.9776 },
  { name: 'Chelsea', lat: 40.7480, lng: -73.9862 },
];

export function UserInputPanel({ userProfile, onProfileChange }: UserInputPanelProps) {
  return (
    <section className="py-16 px-4" aria-labelledby="personalization-heading">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <h2 id="personalization-heading" className="text-4xl md:text-5xl font-bold text-center mb-4">
            Personalize Your Experience
          </h2>
          <p className="text-center text-slate-300 text-lg">
            Get tailored health recommendations based on your profile
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Age Group Selection */}
          <motion.div
            className="backdrop-blur-xl bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <User className="w-5 h-5" />
              Age Group
            </h3>
            <div className="space-y-3">
              {ageGroups.map(({ value, label, icon: Icon }) => (
                <motion.button
                  key={value}
                  onClick={() => onProfileChange({ ...userProfile, ageGroup: value })}
                  className={`w-full p-4 rounded-xl border-2 transition-all flex items-center gap-3 ${
                    userProfile.ageGroup === value
                      ? 'bg-blue-500/20 border-blue-400 shadow-lg shadow-blue-500/20'
                      : 'bg-slate-700/30 border-slate-600 hover:border-slate-500'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{label}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Persona Selection */}
          <motion.div
            className="backdrop-blur-xl bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Users className="w-5 h-5" />
              Persona
            </h3>
            <div className="space-y-3">
              {personas.map(({ value, label, description }) => (
                <motion.button
                  key={value}
                  onClick={() => onProfileChange({ ...userProfile, persona: value })}
                  className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                    userProfile.persona === value
                      ? 'bg-blue-500/20 border-blue-400 shadow-lg shadow-blue-500/20'
                      : 'bg-slate-700/30 border-slate-600 hover:border-slate-500'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="font-medium mb-1">{label}</div>
                  <div className="text-xs text-slate-400">{description}</div>
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Location & Health Sensitivity */}
          <motion.div
            className="backdrop-blur-xl bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              Location
            </h3>
            <div className="space-y-3 mb-6">
              {locations.map((loc) => (
                <motion.button
                  key={loc.name}
                  onClick={() => onProfileChange({ 
                    ...userProfile, 
                    location: { lat: loc.lat, lng: loc.lng, name: loc.name }
                  })}
                  className={`w-full p-3 rounded-xl border-2 transition-all ${
                    userProfile.location?.name === loc.name
                      ? 'bg-blue-500/20 border-blue-400'
                      : 'bg-slate-700/30 border-slate-600 hover:border-slate-500'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {loc.name}
                </motion.button>
              ))}
            </div>

            <div className="pt-6 border-t border-slate-700">
              <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
                <Heart className="w-4 h-4" />
                Health Sensitivity
              </h4>
              <motion.button
                onClick={() => onProfileChange({ 
                  ...userProfile, 
                  healthSensitive: !userProfile.healthSensitive 
                })}
                className={`w-full p-3 rounded-xl border-2 transition-all ${
                  userProfile.healthSensitive
                    ? 'bg-purple-500/20 border-purple-400'
                    : 'bg-slate-700/30 border-slate-600'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm">I have health sensitivities</span>
                  <div className={`w-12 h-6 rounded-full transition-colors ${
                    userProfile.healthSensitive ? 'bg-purple-500' : 'bg-slate-600'
                  }`}>
                    <motion.div
                      className="w-5 h-5 bg-white rounded-full m-0.5"
                      animate={{ x: userProfile.healthSensitive ? 24 : 0 }}
                    />
                  </div>
                </div>
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}