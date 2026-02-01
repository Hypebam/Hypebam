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

        // Interactive mouse-following background effect
        const handleMouseMove = (e: MouseEvent) => {
            const x = e.clientX / window.innerWidth;
            const y = e.clientY / window.innerHeight;
            
            // Calculate color shift based on mouse position
            const hueShift = Math.round(x * 20 - 10); // -10 to +10 degrees
            const saturation = 85 + Math.round(y * 15); // 85% to 100%
            const lightness = 55 + Math.round((1 - y) * 10); // 55% to 65%
            
            // Create dynamic gradient based on mouse position
            const orangeHue = 25 + hueShift;
            const yellowHue = 45 + hueShift;
            
            document.documentElement.style.setProperty(
                '--mouse-gradient',
                `radial-gradient(
                    ellipse 80% 80% at ${x * 100}% ${y * 100}%,
                    hsl(${yellowHue}, ${saturation}%, ${lightness + 10}%) 0%,
                    transparent 50%
                )`
            );
        };

        // Add mouse glow overlay element
        const glowOverlay = document.createElement('div');
        glowOverlay.id = 'mouse-glow-overlay';
        glowOverlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 1;
            background: var(--mouse-gradient, transparent);
            transition: background 0.3s ease-out;
            mix-blend-mode: overlay;
            opacity: 0.6;
        `;
        document.body.appendChild(glowOverlay);

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            const overlay = document.getElementById('mouse-glow-overlay');
            if (overlay) overlay.remove();
        };
    }, []);
};

export default useAnimations;
