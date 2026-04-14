"use client";

import React, { useEffect, useRef } from 'react';
import { Button } from '@/components/ui';

export const HeroSection: React.FC = () => {
    const lottieRef = useRef<HTMLDivElement>(null);
    const headingRef = useRef<HTMLHeadingElement>(null);

    useEffect(() => {
        if (lottieRef.current && !lottieRef.current.querySelector('lottie-player')) {
            const player = document.createElement('lottie-player');
            player.setAttribute('src', 'https://cdn.prod.website-files.com/686c09a33211842a0ac0183d/68bf4595ca06155170fa0b3f_fee5b51503049a55da64bfd6a8ed744f_more-logo-animation.json');
            player.setAttribute('background', 'transparent');
            player.setAttribute('speed', '1');
            player.setAttribute('data-load-stage-logo-lottie', '');
            player.setAttribute('data-load-stage-logo', '');
            player.className = 'stage-logo-svg';
            lottieRef.current.appendChild(player);
        }
    }, []);

    // After GSAP SplitText processes the heading, force "Energy" and "Drink" words white
    useEffect(() => {
        const applyWhite = () => {
            if (!headingRef.current) return;
            const allEls = headingRef.current.querySelectorAll('.split-word, .split-char, div, span');
            allEls.forEach(el => {
                const text = el.textContent?.trim();
                if (text === 'Energy' || text === 'Drink' || text === 'Energy Drink') {
                    (el as HTMLElement).style.setProperty('color', 'white', 'important');
                }
                // Also check single characters inside "Energy Drink"
                if (el.closest('[data-white-text]')) {
                    (el as HTMLElement).style.setProperty('color', 'white', 'important');
                }
            });
        };
        // Run after GSAP has time to initialize
        const timers = [500, 1000, 2000, 3000].map(ms => setTimeout(applyWhite, ms));
        // Also observe DOM changes
        const observer = new MutationObserver(applyWhite);
        if (headingRef.current) {
            observer.observe(headingRef.current, { childList: true, subtree: true });
        }
        return () => { timers.forEach(clearTimeout); observer.disconnect(); };
    }, []);

    return (
        <section data-load-stage="" data-inertia="" className="stage" style={{ paddingBottom: 0, overflow: 'visible', marginBottom: '-5vw' }}>
            <div className="stage-overlay"></div>
            <div className="stage-container">
                <div className="stage-inner">
                    <div className="stage-content">
                        <div className="stage-logo" ref={lottieRef} data-load-stage-logo="">
                        </div>
                        <div data-load-stage-cta="" className="stage-cta">
                            <Button href="#">
                                Buy now
                            </Button>
                        </div>
                        <div className="stage-wrap">
                            <div className="stage-left">
                                <div className="stage-deco">
                                    <div data-load-stage-deco-text="" style={{ '--animation-delay': '.05s' } as React.CSSProperties} className="stage-deco-text-wrap">
                                        <img src="https://cdn.prod.website-files.com/686c09a33211842a0ac0183d/68d41a7021c95a7f4ce8cd14_4bb0c9727f3cc3cf72d4fe155fa50163_Real%20Matcha%2C%20Origin%20al%20Taste.svg" loading="eager" fetchPriority="high" width="300" height="112" alt="Hype Bam Energy" className="stage-deco-text" />
                                        <img src="https://cdn.prod.website-files.com/686c09a33211842a0ac0183d/68d41a7021c95a7f4ce8cd14_4bb0c9727f3cc3cf72d4fe155fa50163_Real%20Matcha%2C%20Origin%20al%20Taste.svg" loading="lazy" width="300" height="112" alt="Hype Bam Energy" className="stage-deco-text is-wiggle" />
                                    </div>
                                    <div data-load-stage-deco-arrow="" style={{ '--animation-delay': '.15s' } as React.CSSProperties} className="stage-deco-arrow-wrap">
                                        <img src="https://cdn.prod.website-files.com/686c09a33211842a0ac0183d/68a9a089d73e5cf84d4ded67_stage-sketch-arrow.svg" loading="eager" fetchPriority="high" width="150" height="150" alt="stage-sketch-arrow" className="stage-deco-arrow" />
                                        <img src="https://cdn.prod.website-files.com/686c09a33211842a0ac0183d/68a9a089d73e5cf84d4ded67_stage-sketch-arrow.svg" loading="lazy" width="150" height="150" alt="stage-sketch-arrow" className="stage-deco-arrow is-wiggle" />
                                    </div>
                                </div>
                                <div data-load-stage-visual="" className="stage-visual">
                                    <canvas data-load-stage-canvas-img-path="/img/" data-load-stage-canvas="" className="stage-canvas"></canvas>
                                </div>
                                <div className="stage-facts">
                                    <div data-inertia-item="" className="stage-fact-outer">
                                        <div data-load-stage-fact="" data-inertia-item-child="" className="stage-fact is-first">
                                            <div className="stage-fact-wrap">
                                                <div className="stage-fact-number">80</div>
                                                <div className="stage-fact-unit">mg</div>
                                            </div>
                                            <div className="stage-fact-text">caffeine</div>
                                        </div>
                                    </div>
                                    <div data-inertia-item="" className="stage-fact-outer">
                                        <div data-load-stage-fact="" data-inertia-item-child="" className="stage-fact is-second">
                                            <div className="stage-fact-wrap">
                                                <div className="stage-fact-number">5</div>
                                                <div className="stage-fact-unit">g</div>
                                            </div>
                                            <div className="stage-fact-text">of Sugar</div>
                                        </div>
                                    </div>
                                    <div data-inertia-item="" className="stage-fact-outer">
                                        <div data-load-stage-fact="" data-inertia-item-child="" className="stage-fact is-third">
                                            <div className="stage-fact-wrap">
                                                <div className="stage-fact-number">200</div>
                                                <div className="stage-fact-unit">mg</div>
                                            </div>
                                            <div className="stage-fact-text">of electrolytes</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="stage-bg">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 731 818" fill="none" data-load-stage-svg="" className="stage-bg-svg">
                                        <path d="M542.941 42.7702C707.951 122.986 766.918 351.375 667.592 555.698C568.265 760.021 352.233 854.727 187.223 774.512C22.2122 694.296 -36.7556 465.905 62.5711 261.582C161.898 57.2593 377.93 -37.4456 542.941 42.7702Z" stroke="currentColor" strokeWidth="28"></path>
                                    </svg>
                                </div>
                            </div>
                            <div className="stage-right">
                                <div className="stage-text-wrap">
                                    <h1 ref={headingRef} data-load-stage-title="" className="hero-heading">
                                        <span className="white-span"></span><br />Sri Lankanized<br /> <span data-white-text="">Energy Drink</span>
                                    </h1>
                                    <div className="stage-paragraph-wrap">
                                        <p data-load-stage-text="" className="paragraph is-stage-paragraph">
                                            For the dreamers. Rule Breakers. Do-ers. More than just a caffeine kick. Infused with flavour and a rebellious spirit.
                                        </p>
                                        <div data-load-stage-underline="" style={{ '--animation-delay': '.2s' } as React.CSSProperties} className="stage-subline-wrap">
                                            <img src="https://cdn.prod.website-files.com/686c09a33211842a0ac0183d/688655fd2fed5f707c038914_Layer_1%20(3).svg" loading="eager" fetchPriority="high" width="152" height="42" alt="Underline" className="subline-img" />
                                            <img src="https://cdn.prod.website-files.com/686c09a33211842a0ac0183d/688655fd2fed5f707c038914_Layer_1%20(3).svg" loading="lazy" width="152" height="42" alt="Underline" className="subline-img is-wiggle" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div data-marquee="" className="marquee" style={{ transform: 'translateY(clamp(-20vw, -15vw, -10vw))' }}>
                <div className="marquee-inner" style={{ transform: 'translateY(200px)' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 1440 442" width="100%" style={{ overflow: 'visible' }} className="marquee-bg-svg">
                        <path stroke="currentColor" strokeWidth="160" d="M-71 371.6C126.3 260 593.5 65.8 934.5 80.8c313 13.8 497 136 572 200"></path>
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 1440 442" width="100%" style={{ overflow: 'visible' }} data-marquee-svg="" className="marquee-text-svg">
                        <path d="M-71 371.6C126.3 260 593.5 65.8 934.5 80.8c313 13.8 497 136 572 200" id="curve"></path>
                        <text width="100%" style={{ transform: 'translate3d(0,0,0)' }} fontSize="120" dy="10">
                            <textPath style={{ transform: 'translate3d(0,0,0)' }} alignmentBaseline="middle" href="#curve" startOffset="-30%">
                                Let&apos;s Get Bam&apos;ed · Let&apos;s Get Bam&apos;ed · Let&apos;s Get Bam&apos;ed
                            </textPath>
                        </text>
                    </svg>
                    <div className="marquee-overlay"></div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
