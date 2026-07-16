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

    // ── Logo entrance "charge" ─────────────────────────────────────────────
    // When the loader lifts and the logo arrives, it fires ONE electric "BAM"
    // shudder — a scale punch + sharp jitter + warm glow flash that elastically
    // settles. Mirrors the loader's charge-quiver → power-surge language and
    // literally plays out the "BAM" as the logo lands. Afterwards it only keeps a
    // very gentle breathe (no repeated shaking). Runs on the wrapper so it never
    // fights app.js's container slide-in or the img's locked scale(1.3).
    useEffect(() => {
        const anims: any[] = [];
        const idle: any[] = [];   // the infinite breathe/rotate tweens — visibility-gated
        let io: IntersectionObserver | null = null;
        let tries = 0;
        const w = (window as any);
        const iv = setInterval(() => {
            const gsap = w.gsap;
            const el = document.querySelector('.stage-logo-anim');
            // wait for the loader to lift (is-ready) so the BAM happens on reveal
            const ready = document.documentElement.classList.contains('is-ready');
            if (gsap && el && ready) {
                clearInterval(iv);
                if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
                gsap.set(el, { transformOrigin: '50% 100%', willChange: 'transform, filter' });
                const POP = 'drop-shadow(0 0 18px rgba(255,190,80,0.8)) drop-shadow(0 0 46px rgba(255,110,0,0.45))';
                const OFF = 'drop-shadow(0 0 0px rgba(255,190,80,0))';
                // ── ONE-TIME entrance BAM (slight delay so it lands as the logo reveals) ──
                const entrance = gsap.timeline({
                    delay: 0.4,
                    onComplete: () => {
                        // gentle, alive — but NO shake — once settled. These are
                        // repeat:-1 tweens: pause them whenever the hero is off
                        // screen so they don't tick for the page's whole lifetime.
                        idle.push(
                            gsap.to(el, { scale: 1.022, duration: 2.8, ease: 'sine.inOut', yoyo: true, repeat: -1 }),
                            gsap.fromTo(el, { rotation: -0.5 }, { rotation: 0.5, duration: 3.6, ease: 'sine.inOut', yoyo: true, repeat: -1 }),
                        );
                        anims.push(...idle);
                        const stage = el.closest('.stage');
                        if (stage) {
                            io = new IntersectionObserver(([entry]) => {
                                const on = entry?.isIntersecting ?? true;
                                idle.forEach((a) => (on ? a.play() : a.pause()));
                            });
                            io.observe(stage);
                        }
                    },
                });
                entrance
                    .to(el, { scale: 1.075, filter: POP, duration: 0.08, ease: 'power3.out' })
                    .to(el, { rotation: 4.4,  x: 7,  duration: 0.04,  ease: 'none' })
                    .to(el, { rotation: -5.4, x: -8, duration: 0.05,  ease: 'none' })
                    .to(el, { rotation: 3.8,  x: 5,  duration: 0.045, ease: 'none' })
                    .to(el, { rotation: -2.4, x: -3, duration: 0.04,  ease: 'none' })
                    .to(el, { rotation: 1.2,  x: 1.4, duration: 0.04, ease: 'none' })
                    .to(el, { rotation: 0, x: 0, scale: 1, filter: OFF, duration: 0.95, ease: 'elastic.out(1, 0.4)' });
                anims.push(entrance);
            } else if (++tries > 280) {
                clearInterval(iv);
            }
        }, 50);
        return () => { clearInterval(iv); io?.disconnect(); anims.forEach((a) => a && a.kill && a.kill()); };
    }, []);

    return (
        <section data-load-stage="" data-inertia="" className="stage" style={{ paddingBottom: 0, overflow: 'visible' }}>
            <div className="stage-overlay"></div>
            <div className="stage-container">
                <div className="stage-inner">
                    <div className="stage-content">
                        <div className="stage-logo" data-load-stage-logo="">
                            {/* Transparent wrapper so the idle "charged" animation can compose
                                cleanly with app.js's container entrance AND the img's
                                scale(1.3) !important — none of them fight. */}
                            <span className="stage-logo-anim">
                                <img
                                    src="/img/hypebam-logo-final-vector-02.svg"
                                    loading="eager"
                                    fetchPriority="high"
                                    alt="Hype Bam logo"
                                    className="stage-logo-img"
                                />
                            </span>
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
                                <div data-load-stage-visual="" className="stage-visual">
                                    <canvas data-load-stage-canvas-img-path="/img/" data-load-stage-canvas="" className="stage-canvas"></canvas>
                                </div>
                                <div className="stage-facts">
                                    {[
                                        { img: '/img/hero/4.jpg', value: '80mg',      label: 'of Caffeine',    cls: 'is-first'  },
                                        { img: '/img/hero/3.jpg', value: '200mg',     label: 'of Electrolytes', cls: 'is-second' },
                                        { img: '/img/hero/1.jpg', value: 'Only 5g',   label: 'of Sugar',        cls: 'is-third'  },
                                        { img: '/img/hero/2.jpg', value: 'Hydrating', label: '+ nootropics',    cls: 'is-fourth' },
                                    ].map((f) => (
                                        <div key={f.cls} data-inertia-item="" className="stage-fact-outer">
                                            <div data-load-stage-fact="" data-inertia-item-child="" className={`hero-fact ${f.cls}`}>
                                                <span className="hero-fact-icon-wrap">
                                                    <img className="hero-fact-icon" src={f.img} alt="" loading="eager" draggable={false} />
                                                </span>
                                                <span className="hero-fact-copy">
                                                    <span className="hero-fact-value">{f.value}</span>
                                                    <span className="hero-fact-label">{f.label}</span>
                                                </span>
                                            </div>
                                        </div>
                                    ))}
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
                        <text width="100%" fontSize={160} style={{ transform: 'translate3d(0,0,0)' }} >
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
