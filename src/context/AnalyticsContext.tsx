import React, { createContext, useContext, useState, useEffect, useRef } from 'react';

export interface SectionViewData {
  id: string;
  name: string;
  views: number;
}

export interface ActiveVisitor {
  id: string;
  country: string;
  flag: string;
  browser: string;
  device: string;
  activeSection: string;
  duration: string;
  isSimulated?: boolean;
}

export interface VisitorLog {
  id: string;
  timestamp: string;
  message: string;
}

interface AnalyticsContextType {
  sectionViews: Record<string, number>;
  activeSection: string;
  activeVisitors: ActiveVisitor[];
  logs: VisitorLog[];
  trackSectionView: (sectionId: string) => void;
  setActiveSection: (sectionId: string) => void;
}

const AnalyticsContext = createContext<AnalyticsContextType | undefined>(undefined);

const SECTION_NAMES: Record<string, string> = {
  about: 'Journey & Background',
  skills: 'Technical Arsenal',
  experience: 'Journey & Milestones',
  services: 'Core Capabilities',
  projects: 'Featured Deployments',
  achievements: 'Career Milestones',
  insights: 'Visitor Insights',
  performance: 'Performance & SEO',
  testimonials: 'Kind Words',
  contact: 'Contact & Hire',
};

const COUNTRIES = [
  { name: 'United States', flag: '🇺🇸' },
  { name: 'Germany', flag: '🇩🇪' },
  { name: 'Bangladesh', flag: '🇧🇩' },
  { name: 'United Kingdom', flag: '🇬🇧' },
  { name: 'Canada', flag: '🇨🇦' },
  { name: 'Japan', flag: '🇯🇵' },
  { name: 'Singapore', flag: '🇸🇬' },
  { name: 'Netherlands', flag: '🇳🇱' },
  { name: 'Australia', flag: '🇦🇺' },
];

const BROWSERS = ['Chrome', 'Safari', 'Firefox', 'Edge'];
const DEVICES = ['Desktop (MacOS)', 'Desktop (Windows)', 'Mobile (iOS)', 'Mobile (Android)', 'Desktop (Linux)'];

export const AnalyticsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialize views from localStorage or with beautiful realistic starting numbers
  const [sectionViews, setSectionViews] = useState<Record<string, number>>(() => {
    const saved = localStorage.getItem('faisal_analytics_views');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // ignore
      }
    }
    
    // Seed views with realistic data
    return {
      about: 142,
      skills: 189,
      experience: 124,
      services: 98,
      projects: 215,
      achievements: 87,
      insights: 110,
      performance: 94,
      testimonials: 76,
      contact: 62,
    };
  });

  const [activeSection, setActiveSectionState] = useState<string>('about');
  const [logs, setLogs] = useState<VisitorLog[]>([]);
  
  // Track already counted sections in current session to avoid over-counting on micro-scrolls
  const lastTrackedRef = useRef<Record<string, number>>({});

  // Initialize simulated active visitors
  const [activeVisitors, setActiveVisitors] = useState<ActiveVisitor[]>([
    { id: 'v-102', country: 'Bangladesh', flag: '🇧🇩', browser: 'Chrome', device: 'Desktop (MacOS)', activeSection: 'Featured Deployments', duration: '2m 14s' },
    { id: 'v-105', country: 'Bangladesh', flag: '🇧🇩', browser: 'Firefox', device: 'Desktop (Windows)', activeSection: 'Technical Arsenal', duration: '4m 5s' },
    { id: 'v-108', country: 'Bangladesh', flag: '🇧🇩', browser: 'Chrome', device: 'Mobile (Android)', activeSection: 'Core Capabilities', duration: '1m 20s' },
    { id: 'v-112', country: 'United Kingdom', flag: '🇬🇧', browser: 'Safari', device: 'Mobile (iOS)', activeSection: 'Journey & Milestones', duration: '32s' },
  ]);

  // Persist views to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('faisal_analytics_views', JSON.stringify(sectionViews));
  }, [sectionViews]);

  // Add initial logs
  useEffect(() => {
    const initialLogs = [
      { id: 'log-1', timestamp: 'Just now', message: 'Anonymous visitor from United States viewed Featured Deployments' },
      { id: 'log-2', timestamp: '1m ago', message: 'Anonymous visitor from Bangladesh viewed Core Capabilities' },
      { id: 'log-3', timestamp: '3m ago', message: 'Anonymous visitor from Germany viewed Technical Arsenal' },
    ];
    setLogs(initialLogs);
  }, []);

  // Update/simulate active visitor actions periodically to make it look active & organic
  useEffect(() => {
    const interval = setInterval(() => {
      // 1. Randomly update one active visitor's active section
      setActiveVisitors((prev) => {
        return prev.map((visitor, idx) => {
          // Always update time for all visitors so it feels real-time
          let durationParts = visitor.duration.split(' ');
          let seconds = 0;
          let minutes = 0;
            
            if (durationParts.length === 2) {
              minutes = parseInt(durationParts[0]);
              seconds = parseInt(durationParts[1]);
            } else if (durationParts[0].includes('s')) {
              seconds = parseInt(durationParts[0]);
            } else {
              minutes = parseInt(durationParts[0]);
            }

            seconds += 1;
            if (seconds >= 60) {
              seconds = 0;
              minutes += 1;
            }

            const newDuration = minutes > 0 ? `${minutes}m ${seconds}s` : `${seconds}s`;

            // Randomly switch section
            if (Math.random() > 0.95) { // 5% chance every second to switch sections
              const sectionKeys = Object.keys(SECTION_NAMES);
              const randomSectionKey = sectionKeys[Math.floor(Math.random() * sectionKeys.length)];
              const newSectionName = SECTION_NAMES[randomSectionKey];
              
              if (newSectionName !== visitor.activeSection) {
                // Add log
                const logTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
                setLogs((l) => [
                  {
                    id: `log-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
                    timestamp: 'Just now',
                    message: `Visitor from ${visitor.country} navigated to ${newSectionName}`,
                  },
                  ...l.slice(0, 15),
                ]);

                return {
                  ...visitor,
                  activeSection: newSectionName,
                  duration: newDuration,
                };
              }
            }

            return {
              ...visitor,
              duration: newDuration,
            };
        });
      });

      // 2. Randomly add/remove a visitor to simulate real-time active traffic
      if (Math.random() > 0.85) {
        const isBd = Math.random() < 0.8;
        let country = { name: 'Bangladesh', flag: '🇧🇩' };
        if (!isBd) {
          const others = COUNTRIES.filter(c => c.name !== 'Bangladesh');
          country = others[Math.floor(Math.random() * others.length)];
        }
        const browser = BROWSERS[Math.floor(Math.random() * BROWSERS.length)];
        const device = DEVICES[Math.floor(Math.random() * DEVICES.length)];
        const sectionKeys = Object.keys(SECTION_NAMES);
        const randomSectionKey = sectionKeys[Math.floor(Math.random() * sectionKeys.length)];
        const sectionName = SECTION_NAMES[randomSectionKey];
        const randomNum = Math.floor(100 + Math.random() * 900);
        const visitorId = `v-${randomNum}-${Math.random().toString(36).substring(2, 7)}`;

        const newVisitor: ActiveVisitor = {
          id: visitorId,
          country: country.name,
          flag: country.flag,
          browser,
          device,
          activeSection: sectionName,
          duration: '5s',
          isSimulated: true,
        };

        setActiveVisitors((prev) => {
          if (prev.length >= 7) {
            // Remove one simulated visitor
            const filterSimulated = prev.filter(v => v.id !== prev[0].id);
            return [...filterSimulated, newVisitor];
          }
          return [...prev, newVisitor];
        });

        setLogs((l) => [
          {
            id: `log-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
            timestamp: 'Just now',
            message: `New connection: Visitor from ${country.name} (${device}) landed on index`,
          },
          ...l.slice(0, 15),
        ]);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const trackSectionView = (sectionId: string) => {
    if (!SECTION_NAMES[sectionId]) return;

    const now = Date.now();
    const lastTracked = lastTrackedRef.current[sectionId] || 0;

    // Throttle increments to once per 10 seconds to prevent rapid mouse wheel scroll-spamming
    if (now - lastTracked > 10000) {
      lastTrackedRef.current[sectionId] = now;
      setSectionViews((prev) => ({
        ...prev,
        [sectionId]: (prev[sectionId] || 0) + 1,
      }));

      // Add log for current real user
      setLogs((l) => [
        {
          id: `log-user-${now}-${Math.random().toString(36).substring(2, 9)}`,
          timestamp: 'Just now',
          message: `You viewed ${SECTION_NAMES[sectionId]}`,
        },
        ...l.slice(0, 15),
      ]);
    }
  };

  const setActiveSection = (sectionId: string) => {
    if (SECTION_NAMES[sectionId]) {
      setActiveSectionState(sectionId);
      trackSectionView(sectionId);
    }
  };

  return (
    <AnalyticsContext.Provider
      value={{
        sectionViews,
        activeSection,
        activeVisitors,
        logs,
        trackSectionView,
        setActiveSection,
      }}
    >
      {children}
    </AnalyticsContext.Provider>
  );
};

export const useAnalytics = () => {
  const context = useContext(AnalyticsContext);
  if (context === undefined) {
    throw new Error('useAnalytics must be used within an AnalyticsProvider');
  }
  return context;
};
