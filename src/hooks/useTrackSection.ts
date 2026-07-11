import { useEffect, useRef } from 'react';
import { useAnalytics } from '../context/AnalyticsContext';

export function useTrackSection(sectionId: string) {
  const { setActiveSection } = useAnalytics();
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Use IntersectionObserver with optimized thresholds for sections of different sizes
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActiveSection(sectionId);
        }
      },
      {
        rootMargin: '-10% 0px -40% 0px', // trigger when section occupies main part of viewport
        threshold: 0.1,
      }
    );

    observer.observe(el);
    return () => {
      observer.unobserve(el);
    };
  }, [sectionId, setActiveSection]);

  return ref;
}
