import { useEffect } from 'react';

/**
 * This hook loads the original app.js which contains all GSAP premium plugins
 * (SplitText, DrawSVG, InertiaPlugin, CustomEase) bundled together.
 */
export const useAnimations = () => {
  useEffect(() => {
    console.log('Loading original app.js with GSAP premium plugins...');

    // Check if already loaded
    if (document.querySelector('script[src="/scripts/app.js"]')) {
      console.log('app.js already loaded');
      return;
    }

    // Load the original bundled app.js
    const script = document.createElement('script');
    script.src = '/scripts/app.js';
    script.async = false;
    
    script.onload = () => {
      console.log('app.js loaded successfully');
    };
    
    script.onerror = (e) => {
      console.error('Failed to load app.js:', e);
      // Force show content on error
      document.documentElement.classList.add('fonts-loaded', 'is-ready', 'has-seq-ready');
    };
    
    document.body.appendChild(script);

    // Cleanup
    return () => {
      // Note: We don't remove the script as it has already executed
    };
  }, []);
};

export default useAnimations;
