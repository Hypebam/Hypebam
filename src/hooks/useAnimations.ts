"use client";

import { useEffect } from 'react';

export const useAnimations = () => {
    useEffect(() => {
        console.log('Loading original app.js with GSAP premium plugins...');

        if (document.querySelector('script[src="/scripts/app.js"]')) {
            console.log('app.js already loaded');
            return;
        }

        const script = document.createElement('script');
        script.src = '/scripts/app.js';
        script.async = false;

        script.onload = () => {
            console.log('app.js loaded successfully');
        };

        script.onerror = () => {
            console.error('Failed to load app.js');
            document.documentElement.classList.add('fonts-loaded', 'is-ready', 'has-seq-ready');
        };

        document.body.appendChild(script);
    }, []);
};

export default useAnimations;
