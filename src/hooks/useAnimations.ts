"use client";

import { useEffect } from 'react';

/**
 * Custom hook to load and initialize GSAP animations
 * Loads the app.js script which contains all GSAP premium plugins and animations
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

        script.onerror = () => {
            console.error('Failed to load app.js');
            // Force show content on error
            document.documentElement.classList.add('fonts-loaded', 'is-ready', 'has-seq-ready');
        };

        document.body.appendChild(script);
    }, []);
};

export default useAnimations;
