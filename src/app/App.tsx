import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { HeroSection } from '@/app/components/HeroSection';
import { InteractiveMap } from '@/app/components/InteractiveMap';
import { UserInputPanel } from '@/app/components/UserInputPanel';
import { ForecastTimeline } from '@/app/components/ForecastTimeline';
import { ExplainabilityCards } from '@/app/components/ExplainabilityCards';
import { PersonaHealthAdvice } from '@/app/components/PersonaHealthAdvice';
import { AnalyticsGraphs } from '@/app/components/AnalyticsGraphs';
import { CTASection } from '@/app/components/CTASection';

export type AgeGroup = 'child' | 'adult' | 'elderly';
export type Persona = 'children-elderly' | 'outdoor-workers' | 'general-public';

export interface UserProfile {
  ageGroup: AgeGroup;
  persona: Persona;
  healthSensitive: boolean;
  location: { lat: number; lng: number; name: string } | null;
}

function App() {
  const [currentAQI, setCurrentAQI] = useState(72);
  const [userProfile, setUserProfile] = useState<UserProfile>({
    ageGroup: 'adult',
    persona: 'general-public',
    healthSensitive: false,
    location: { lat: 40.7128, lng: -74.0060, name: 'Downtown' }
  });

  // Simulate AQI changing over time
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAQI(prev => {
        const change = Math.random() * 4 - 2;
        return Math.max(0, Math.min(500, prev + change));
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-white">
      {/* Skip to main content link for accessibility */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-blue-500 focus:text-white focus:rounded-lg"
      >
        Skip to main content
      </a>

      {/* Hero Section */}
      <HeroSection currentAQI={currentAQI} />

      <main id="main-content">
        {/* Interactive Map */}
        <InteractiveMap 
          currentAQI={currentAQI} 
          userLocation={userProfile.location}
        />

        {/* User Input Panel */}
        <UserInputPanel 
          userProfile={userProfile}
          onProfileChange={setUserProfile}
        />

        {/* Forecast & Risk Section */}
        <section className="py-16 px-4" aria-labelledby="forecast-heading">
          <div className="max-w-7xl mx-auto">
            <motion.h2 
              id="forecast-heading"
              className="text-4xl font-bold text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              6-Hour Forecast & Risk Analysis
            </motion.h2>
            <ForecastTimeline currentAQI={currentAQI} />
          </div>
        </section>

        {/* Explainability Section */}
        <ExplainabilityCards currentAQI={currentAQI} />

        {/* Persona-Based Health Advice */}
        <PersonaHealthAdvice 
          currentAQI={currentAQI}
          userProfile={userProfile}
        />

        {/* Analytics Graphs */}
        <AnalyticsGraphs />

        {/* CTA Section */}
        <CTASection />
      </main>
    </div>
  );
}

export default App;