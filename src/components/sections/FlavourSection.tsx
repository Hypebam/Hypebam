"use client";

import React, { useEffect, useRef, useState, useCallback } from 'react';

const flavours = [
    { name: 'Original', label: 'Classic Energy', image: '/img/flavours/original.png', color: '#E65100' },
    { name: 'Lemon Lime', label: 'Citrus Blast', image: '/img/flavours/lemon-lime.png', color: '#7CB342' },
    { name: 'Pineapple Passion', label: 'Tropical Rush', image: '/img/flavours/pineapple-passion.png', color: '#E91E63' },
    { name: 'Apple Berry', label: 'Fruity Fusion', image: '/img/flavours/apple-berry.png', color: '#D32F2F' },
    { name: 'Mango Peach', label: 'Island Vibes', image: '/img/flavours/mango-peach.png', color: '#FF8F00' },
];

export const FlavourSection: React.FC = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const subRef = useRef<HTMLHeadingElement>(null);
    const productRef = useRef<HTMLDivElement>(null);
    const infoRef = useRef<HTMLDivElement>(null);
    const imgRefs = useRef<(HTMLImageElement | null)[]>([]);
    const gsapRef = useRef<any>(null);

    const [active, setActive] = useState(0);
    const [sliding, setSliding] = useState(false);

    // ── GSAP scroll-triggered entrance ──
    useEffect(() => {
        const init = async () => {
            try {
                const gMod = await import('gsap');
                const sMod = await import('gsap/ScrollTrigger');
                const gsap = gMod.default || gMod.gsap;
                const ST = sMod.default || sMod.ScrollTrigger;
                if (!gsap || !ST) return;
                gsap.registerPlugin(ST);
                gsapRef.current = gsap;

                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 80%',
                        toggleActions: 'play none none reverse',
                    },
                });

                // Title drop-in with elastic bounce
                tl.fromTo(titleRef.current,
                    { y: 80, opacity: 0, scale: 0.85 },
                    { y: 0, opacity: 1, scale: 1, duration: 1.1, ease: 'elastic.out(1, 0.6)' }, 0);

                // Subtitle slide up
                tl.fromTo(subRef.current,
                    { y: 50, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }, 0.2);

                // Product scale up with rotation
                tl.fromTo(productRef.current,
                    { y: 100, opacity: 0, scale: 0.7, rotate: 8 },
                    { y: 0, opacity: 1, scale: 1, rotate: 0, duration: 1.2, ease: 'elastic.out(1, 0.5)' }, 0.3);

                // Info block fade up
                tl.fromTo(infoRef.current,
                    { y: 40, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.7, ease: 'power2.out' }, 0.7);

            } catch (_) { /* GSAP unavailable */ }
        };
        init();
    }, []);

    // ── Slide with GSAP animation ──
    const animateSlide = useCallback((newIndex: number) => {
        if (sliding) return;
        setSliding(true);
        const gsap = gsapRef.current;
        const currentImg = imgRefs.current[active];
        const nextImg = imgRefs.current[newIndex];

        if (gsap && currentImg && nextImg) {
            // Animate current out
            gsap.to(currentImg, {
                scale: 0.6, opacity: 0, rotate: -15, x: -60,
                duration: 0.35, ease: 'power2.in',
                onComplete: () => {
                    setActive(newIndex);
                    // Set next image starting position
                    gsap.set(nextImg, { scale: 0.6, opacity: 0, rotate: 15, x: 60 });
                    // Animate next in with elastic bounce
                    gsap.to(nextImg, {
                        scale: 1, opacity: 1, rotate: 0, x: 0,
                        duration: 0.7, ease: 'elastic.out(1, 0.6)',
                        onComplete: () => setSliding(false),
                    });
                },
            });
        } else {
            setActive(newIndex);
            setTimeout(() => setSliding(false), 400);
        }
    }, [active, sliding]);

    const goPrev = () => animateSlide((active - 1 + flavours.length) % flavours.length);
    const goNext = () => animateSlide((active + 1) % flavours.length);

    const cur = flavours[active];

    return (
        <section ref={sectionRef} id="flavours-section" className="hbf">
            <style>{`
                .hbf {
                    background: #FFF8EF;
                    padding: clamp(60px, 8vw, 120px) 0 clamp(80px, 10vw, 160px);
                    overflow: hidden;
                    position: relative;
                    text-align: center;
                }
                /* decorative ring */
                .hbf::before {
                    content: '';
                    position: absolute;
                    top: 35%;
                    left: 50%;
                    width: min(700px, 55vw);
                    height: min(700px, 55vw);
                    border: 3px solid rgba(230,81,0,0.05);
                    border-radius: 50%;
                    transform: translate(-50%, -50%);
                    pointer-events: none;
                }
                .hbf::after {
                    content: '';
                    position: absolute;
                    top: 30%;
                    left: 50%;
                    width: min(900px, 70vw);
                    height: min(900px, 70vw);
                    border: 2px solid rgba(230,81,0,0.03);
                    border-radius: 50%;
                    transform: translate(-50%, -50%);
                    pointer-events: none;
                }

                /* ── Header ── */
                .hbf-head { padding: 0 20px; margin-bottom: clamp(20px, 4vw, 50px); position: relative; z-index: 2; }
                .hbf-t1 {
                    font-family: 'Founders Grotesk Condensed','Impact',sans-serif;
                    font-size: clamp(32px, 5vw, 60px);
                    font-weight: 700;
                    color: #3a2a1a;
                    line-height: 1.1;
                    margin: 0 0 4px;
                }
                .hbf-t2 {
                    font-family: 'Founders Grotesk Condensed','Impact',sans-serif;
                    font-size: clamp(46px, 8vw, 100px);
                    font-weight: 800;
                    color: #E65100;
                    line-height: 0.95;
                    margin: 0;
                    opacity: 0.9;
                }

                /* ── Product showcase (centered) ── */
                .hbf-stage {
                    position: relative;
                    max-width: 600px;
                    margin: 0 auto;
                    min-height: clamp(320px, 42vw, 550px);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                .hbf-can-wrap {
                    position: absolute;
                    inset: 0;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    pointer-events: none;
                }
                .hbf-can {
                    width: clamp(240px, 30vw, 420px);
                    height: auto;
                    object-fit: contain;
                    filter: drop-shadow(0 30px 60px rgba(0,0,0,0.25));
                    pointer-events: auto;
                    will-change: transform, opacity;
                }
                .hbf-can.hidden { opacity: 0; pointer-events: none; }

                /* ── Arrows ── */
                .hbf-arrows {
                    position: absolute;
                    top: 50%;
                    left: 0; right: 0;
                    transform: translateY(-50%);
                    display: flex;
                    justify-content: space-between;
                    padding: 0 clamp(10px, 3vw, 40px);
                    pointer-events: none;
                    z-index: 10;
                    max-width: 900px;
                    margin: 0 auto;
                }
                .hbf-arr {
                    width: 52px; height: 52px;
                    border-radius: 50%;
                    border: none;
                    background: rgba(255,255,255,0.92);
                    color: #3a2a1a;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    box-shadow: 0 4px 20px rgba(0,0,0,0.1);
                    transition: all 0.35s cubic-bezier(0.34,1.56,0.64,1);
                    pointer-events: auto;
                }
                .hbf-arr:hover {
                    background: #E65100; color: white;
                    transform: scale(1.15);
                    box-shadow: 0 6px 28px rgba(230,81,0,0.3);
                }
                .hbf-arr:active { transform: scale(0.92); }

                /* ── Info ── */
                .hbf-info { margin-top: clamp(16px, 2vw, 32px); position: relative; z-index: 2; }
                .hbf-lbl {
                    font-family: 'Inter',sans-serif;
                    font-size: clamp(11px, 1.1vw, 15px);
                    color: #E65100;
                    text-transform: uppercase;
                    letter-spacing: 0.2em;
                    margin: 0 0 6px;
                    font-weight: 600;
                    transition: all 0.3s ease;
                }
                .hbf-name {
                    font-family: 'Founders Grotesk Condensed','Impact',sans-serif;
                    font-size: clamp(36px, 5.5vw, 72px);
                    font-weight: 800;
                    color: #3a2a1a;
                    text-transform: uppercase;
                    line-height: 1;
                    margin: 0 0 20px;
                    transition: all 0.5s cubic-bezier(0.34,1.56,0.64,1);
                }
                .hbf-name.slide-out { opacity: 0; transform: translateY(12px); }
                .hbf-cta {
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    padding: 14px 32px;
                    background: #3a2a1a;
                    color: white;
                    border-radius: 50px;
                    font-family: 'Inter',sans-serif;
                    font-size: 15px;
                    font-weight: 600;
                    text-decoration: none;
                    border: none;
                    cursor: pointer;
                    transition: all 0.35s cubic-bezier(0.34,1.56,0.64,1);
                    box-shadow: 0 6px 24px rgba(0,0,0,0.12);
                }
                .hbf-cta:hover {
                    background: #E65100;
                    transform: translateY(-3px) scale(1.04);
                    box-shadow: 0 10px 32px rgba(230,81,0,0.3);
                }

                /* dots */
                .hbf-dots { display: flex; justify-content: center; gap: 8px; margin-top: 20px; }
                .hbf-dot {
                    width: 8px; height: 8px;
                    border-radius: 50%;
                    border: none;
                    background: rgba(230,81,0,0.15);
                    cursor: pointer;
                    transition: all 0.3s ease;
                    padding: 0;
                }
                .hbf-dot.on {
                    background: #E65100;
                    transform: scale(1.5);
                }

                @media (max-width: 768px) {
                    .hbf-arrows { padding: 0 5px; }
                    .hbf-arr { width: 40px; height: 40px; }
                }
            `}</style>

            {/* ── Header ── */}
            <div className="hbf-head">
                <h2 ref={titleRef} className="hbf-t1">Sri Lankanized, just the way you like it.</h2>
                <h3 ref={subRef} className="hbf-t2">What&apos;s your flavour?</h3>
            </div>

            {/* ── Centered product stage ── */}
            <div style={{ position: 'relative', maxWidth: 900, margin: '0 auto' }}>
                <div ref={productRef} className="hbf-stage">
                    {flavours.map((f, i) => (
                        <div key={i} className="hbf-can-wrap">
                            <img
                                ref={el => { imgRefs.current[i] = el; }}
                                className={`hbf-can ${i !== active ? 'hidden' : ''}`}
                                src={f.image}
                                alt={`Hype Bam ${f.name}`}
                                draggable={false}
                            />
                        </div>
                    ))}
                </div>

                {/* Arrows flanking the product */}
                <div className="hbf-arrows">
                    <button className="hbf-arr" onClick={goPrev} aria-label="Previous flavour">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M15 18l-6-6 6-6"/></svg>
                    </button>
                    <button className="hbf-arr" onClick={goNext} aria-label="Next flavour">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M9 18l6-6-6-6"/></svg>
                    </button>
                </div>
            </div>

            {/* ── Info ── */}
            <div ref={infoRef} className="hbf-info">
                <p className="hbf-lbl" style={{ color: cur.color }}>{cur.label}</p>
                <h3 className={`hbf-name ${sliding ? 'slide-out' : ''}`}>{cur.name}</h3>
                <a href="#" className="hbf-cta">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M7 17L17 7M17 7H7M17 7v10"/></svg>
                    Buy now
                </a>
                <div className="hbf-dots">
                    {flavours.map((_, i) => (
                        <button key={i} className={`hbf-dot ${i === active ? 'on' : ''}`}
                            onClick={() => !sliding && animateSlide(i)} aria-label={`Flavour ${i + 1}`} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FlavourSection;
