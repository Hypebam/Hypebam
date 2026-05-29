"use client";

import React, { useEffect, useRef } from 'react';
import { Button } from '@/components/ui';

export const HeroSection: React.FC = () => {
    const lottieRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = lottieRef.current;
        if (!el) return;
        // app.js yo() calls [data-load-stage-logo-lottie].play() during the hero
        // intro. We don't render a Lottie (the bundled JSON is the wrong brand),
        // so give the element a no-op play() — this keeps yo() from throwing,
        // which is what unblocks the hero can-canvas draw + intro reveal.
        if (typeof (el as unknown as { play?: () => void }).play !== 'function') {
            (el as unknown as { play: () => void }).play = () => {};
        }
    }, []);

    return (
        <section data-load-stage="" data-inertia="" className="stage" style={{ paddingBottom: 0, overflow: 'visible' }}>
            <div className="stage-overlay"></div>
            <div className="stage-container">
                <div className="stage-inner">
                    <div className="stage-content">
                        <div className="stage-logo" data-load-stage-logo="">
                            <img
                                src="/img/hypebam-logo-final-vector-02.svg"
                                loading="eager"
                                fetchPriority="high"
                                alt="Hype Bam logo"
                                className="stage-logo-img"
                            />
                            {/* Animated Lottie logo (original site flourish), lazy-loaded.
                                app.js yo() calls this element's .play() on hero intro. */}
                            <div
                                ref={lottieRef}
                                data-load-stage-logo-lottie=""
                                data-load-stage-logo=""
                                aria-hidden="true"
                                className="stage-logo-lottie"
                            ></div>
                        </div>
                        <div data-load-stage-cta="" data-typography-target="hero-buy-button" className="stage-cta">
                            <Button href="#">
                                Buy now
                            </Button>
                        </div>
                        <div className="stage-wrap">
                            <div className="stage-left">
                                <div className="stage-deco">
                                    <div data-load-stage-deco-text="" style={{ '--animation-delay': '.05s' } as React.CSSProperties} className="stage-deco-text-wrap">
                                        <img src="/img/cdn/68d41a7021c95a7f4ce8cd14_4bb0c9727f3cc3cf72d4fe155fa50163_Real_Matcha__Origin_al_Taste.svg" loading="eager" fetchPriority="high" width="300" height="112" alt="Hype Bam Energy" className="stage-deco-text" />
                                        <img src="/img/cdn/68d41a7021c95a7f4ce8cd14_4bb0c9727f3cc3cf72d4fe155fa50163_Real_Matcha__Origin_al_Taste.svg" loading="lazy" width="300" height="112" alt="Hype Bam Energy" className="stage-deco-text is-wiggle" />
                                    </div>
                                    <div data-load-stage-deco-arrow="" style={{ '--animation-delay': '.15s' } as React.CSSProperties} className="stage-deco-arrow-wrap">
                                        <img src="/img/cdn/68a9a089d73e5cf84d4ded67_stage-sketch-arrow.svg" loading="eager" fetchPriority="high" width="150" height="150" alt="stage-sketch-arrow" className="stage-deco-arrow" />
                                        <img src="/img/cdn/68a9a089d73e5cf84d4ded67_stage-sketch-arrow.svg" loading="lazy" width="150" height="150" alt="stage-sketch-arrow" className="stage-deco-arrow is-wiggle" />
                                    </div>
                                </div>
                                <div data-load-stage-visual="" className="stage-visual">
                                    <canvas data-load-stage-canvas-img-path="/img/" data-load-stage-canvas="" className="stage-canvas"></canvas>
                                </div>
                                <div data-typography-target="stage-fact-circles" className="stage-facts">
                                    <div data-inertia-item="" className="stage-fact-outer">
                                        <div data-load-stage-fact="" data-inertia-item-child="" className="stage-fact is-first">
                                            <div className="stage-fact-wrap">
                                                <div className="stage-fact-number">80</div>
                                                <div className="stage-fact-unit">mg</div>
                                            </div>
                                            <div className="stage-fact-text">Caffeine</div>
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
                                            <div className="stage-fact-text">of Electrolytes</div>
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
                                    <h1 data-load-stage-title="" className="hero-heading">
                                        <span className="white-span"></span><br />Sri Lankanized<br /> <span data-white-text="">Energy Drink</span>
                                    </h1>
                                    <div className="stage-paragraph-wrap">
                                        <p data-load-stage-text="" data-typography-target="hero-stage-paragraph" className="paragraph is-stage-paragraph">
                                            For the Dreamers. Rule Breakers. Do-ers. More than just a caffeine kick. Infused with flavour and a rebellious spirit.
                                        </p>
                                        <div data-load-stage-underline="" style={{ '--animation-delay': '.2s' } as React.CSSProperties} className="stage-subline-wrap">
                                            <img src="/img/cdn/688655fd2fed5f707c038914_Layer_1_3.svg" loading="eager" fetchPriority="high" width="152" height="42" alt="Underline" className="subline-img" />
                                            <img src="/img/cdn/688655fd2fed5f707c038914_Layer_1_3.svg" loading="lazy" width="152" height="42" alt="Underline" className="subline-img is-wiggle" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div data-marquee="" className="marquee">
                <div className="marquee-inner">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 1440 442" width="100%" preserveAspectRatio="xMidYMid meet" style={{ overflow: 'visible' }} className="marquee-bg-svg">
                        <path stroke="currentColor" strokeWidth="160" d="M-71 371.6C126.3 260 593.5 65.8 934.5 80.8c313 13.8 497 136 572 200"></path>
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 1440 442" width="100%" preserveAspectRatio="xMidYMid meet" style={{ overflow: 'visible' }} data-marquee-svg="" className="marquee-text-svg">
                        <path d="M-71 371.6C126.3 260 593.5 65.8 934.5 80.8c313 13.8 497 136 572 200" id="curve"></path>
                        <text width="100%" style={{ transform: 'translate3d(0,0,0)' }} >
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
