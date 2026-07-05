import { useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

export function useMetaTags() {
  const { portfolioData } = useLanguage();
  const { profile } = portfolioData;

  useEffect(() => {

    // Update document title
    document.title = `${profile.name} - ${profile.role}`;

    // Helper to set or create meta tags
    const setMetaTag = (attribute: string, value: string, content: string) => {
      let element = document.querySelector(`meta[${attribute}="${value}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, value);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // Standard Meta Tags
    setMetaTag('name', 'description', profile.tagline);
    
    // Open Graph / Facebook
    setMetaTag('property', 'og:type', 'website');
    setMetaTag('property', 'og:url', window.location.href);
    setMetaTag('property', 'og:title', `${profile.name} - ${profile.role}`);
    setMetaTag('property', 'og:description', profile.tagline);
    setMetaTag('property', 'og:image', profile.image);

    // Twitter
    setMetaTag('name', 'twitter:card', 'summary_large_image');
    setMetaTag('name', 'twitter:url', window.location.href);
    setMetaTag('name', 'twitter:title', `${profile.name} - ${profile.role}`);
    setMetaTag('name', 'twitter:description', profile.tagline);
    setMetaTag('name', 'twitter:image', profile.image);
    
    if (profile.socials.twitter) {
      // Try to extract handle from URL if it's a URL
      let handle = profile.socials.twitter;
      if (handle.includes('twitter.com/') || handle.includes('x.com/')) {
        handle = handle.split('/').filter(Boolean).pop() || handle;
      }
      if (!handle.startsWith('@')) {
        handle = `@${handle}`;
      }
      setMetaTag('name', 'twitter:creator', handle);
    }
  }, [profile]);
}
