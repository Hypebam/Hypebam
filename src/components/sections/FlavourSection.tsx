"use client";

import React, { useEffect, useRef, useState, useCallback } from 'react';

const flavours = [
    { name: 'Original', label: 'Classic Energy', image: '/img/flavours/original.webp', color: '#E65100' },
    { name: 'Lemon Lime', label: 'Citrus Blast', image: '/img/flavours/lemon-lime.webp', color: '#7CB342' },
    { name: 'Pineapple Passion', label: 'Tropical Rush', image: '/img/flavours/pineapple-passion.webp', color: '#E91E63' },
    { name: 'Apple Berry', label: 'Fruity Fusion', image: '/img/flavours/apple-berry.webp', color: '#D32F2F' },
    { name: 'Mango Peach', label: 'Island Vibes', image: '/img/flavours/mango-peach.webp', color: '#FF8F00' },
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
            {/* ── Header ── */}
            <div className="hbf-head" data-typography-target="flavour-head-text-field">
                <h2 ref={titleRef} className="hbf-t1">Sri Lankanized, just the way you like it.</h2>
                <h3 ref={subRef} className="hbf-t2">What&apos;s your flavour?</h3>
            </div>

            {/* ── Centered product stage ── */}
            <div style={{ position: 'relative', maxWidth: 900, margin: '0 auto' }}>
                <div ref={productRef} className="hbf-stage">
                    {/* Cinematic color glow */}
                    <div className="hbf-glow" style={{ background: cur.color }} />
                    {flavours.map((f, i) => (
                        <div key={i} className="hbf-can-wrap">
                            <img
                                ref={el => { imgRefs.current[i] = el; }}
                                className={`hbf-can ${i !== active ? 'hidden' : ''}`}
                                src={f.image}
                                alt={`Hype Bam ${f.name}`}
                                draggable={false}
                                /* First flavour is the default active — load eagerly so it's
                                   ready when the GSAP entrance animation fires */
                                loading={i === 0 ? "eager" : "lazy"}
                                fetchPriority={i === 0 ? "high" : "low"}
                                decoding="async"
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
