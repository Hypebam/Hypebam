"use client";

import React, { useEffect, useRef } from 'react';

// ─── CUSTOMER REVIEWS — "THE REBELS HAVE SPOKEN" ────────────────────────────
// A rebel sticker wall: every review is a tilted white sticker slapped onto
// the cream halftone backdrop, with a giant ghosted Bad-Brush "BAM!" behind.
// Motion (all house language):
//   • title — SplitText word cascade from the bottom-right with an elastic
//     settle (mirrors app.js's data-highlight-text reveal)
//   • cards — slam in one after another with an elastic pop + tilt settle
//     (ScrollTrigger.batch), stars burst in sequence per card
//   • hover — app.js InertiaPlugin fling via data-inertia (same physics as
//     the hero fact pills / payment chips)
// Every state is applied fromTo at play time: no JS (or reduced motion) —
// the wall is simply fully visible.

const REVIEWS = [
    {
        quote: '“Superb taste, and I love the look of the can. I’ve tried Hype Bam and would happily recommend it to anyone.”',
        name: 'Thufa T.',
        tilt: -2.4,
    },
    {
        quote: '“One of the best energy drinks I’ve tasted. The branding is also one of the coolest I’ve seen.”',
        name: 'Kenon D.',
        tilt: 1.8,
    },
    {
        quote: '“I genuinely love the flavour and quality. It feels like a really well-made drink.”',
        name: 'Sajidha B.',
        tilt: -1.6,
    },
    {
        quote: '“Great taste with a satisfying kick. I love it.”',
        name: 'Shihaan',
        tilt: 2.6,
    },
    {
        quote: '“The flavour is good, and the whole brand feels fresh and energetic — exactly what you expect from an energy drink.”',
        name: 'Ahmed R.',
        tilt: 2.2,
    },
    {
        quote: '“Hype Bam has a great flavour and definitely stands out from the usual energy drinks available.”',
        name: 'Thalal I.',
        tilt: -2.8,
    },
    {
        quote: '“It tastes great, looks bold and brings something genuinely different to the local energy drink market.”',
        name: 'Garniya',
        tilt: 1.5,
    },
    {
        quote: '“It is easily one of the best energy drinks currently available in the market.”',
        name: 'Abdul Basith R.',
        tilt: -2,
    },
    {
        quote: '“Hype Bam feels fresh, modern and proudly Sri Lankan. That alone makes me interested in supporting the brand.”',
        name: 'Saad A.',
        tilt: 2.3,
    },
];

export const ReviewsSection: React.FC = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const ghostRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let cancelled = false;
        const cleanups: Array<() => void> = [];

        (async () => {
            const t0 = performance.now();
            while (!(window as any).gsap || !(window as any).ScrollTrigger || !(window as any).SplitText) {
                if (cancelled || performance.now() - t0 > 8000) return;
                await new Promise((r) => setTimeout(r, 50));
            }
            if (cancelled) return;
            if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
            const gsap = (window as any).gsap;
            const ScrollTrigger = (window as any).ScrollTrigger;
            const SplitText = (window as any).SplitText;

            const section = sectionRef.current;
            if (!section) return;

            // ── Title: word cascade in from the bottom-right, elastic settle ──
            const title = section.querySelector('.revwall-title');
            const kicker = section.querySelector('.revwall-kicker');
            const underline = section.querySelector('.revwall-underline');
            const titleSplit = title ? SplitText.create(title, { type: 'words', wordsClass: 'review-word' }) : null;
            if (titleSplit) cleanups.push(() => { try { titleSplit.revert(); } catch { /* ignore */ } });

            const mascot = section.querySelector('.revwall-mascot');
            const headSt = ScrollTrigger.create({
                trigger: section,
                start: 'top 78%',
                once: true,
                onEnter: () => {
                    const tl = gsap.timeline();
                    if (mascot) {
                        // mini "BAM": the mascot drops out of the void, slams,
                        // elastically recovers — then keeps a gentle ember breathe
                        // (visibility-gated so the repeat:-1 tweens never tick
                        // while the section is off screen).
                        tl.fromTo(mascot,
                            { y: -90, opacity: 0, scale: 0.5, rotation: -18 },
                            {
                                y: 0, opacity: 1, scale: 1, rotation: 0, duration: 0.9, ease: 'elastic.out(1.1, 0.45)',
                                onComplete: () => {
                                    const breathe = [
                                        gsap.to(mascot, { y: -7, duration: 2.2, ease: 'sine.inOut', yoyo: true, repeat: -1 }),
                                        gsap.to(mascot, { rotation: 3, duration: 3.1, ease: 'sine.inOut', yoyo: true, repeat: -1 }),
                                    ];
                                    const bio = new IntersectionObserver(([entry]) => {
                                        const on = entry?.isIntersecting ?? true;
                                        breathe.forEach((a) => (on ? a.play() : a.pause()));
                                    });
                                    bio.observe(section);
                                    cleanups.push(() => { bio.disconnect(); breathe.forEach((a) => a.kill()); });
                                },
                            }, 0);
                    }
                    if (kicker) {
                        tl.fromTo(kicker, { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: 0.55, ease: 'power2.out' }, 0.12);
                    }
                    if (titleSplit) {
                        tl.fromTo(titleSplit.words,
                            { yPercent: 30, xPercent: 55, opacity: 0, scale: 0.6, transformOrigin: '100% 100%' },
                            { yPercent: 0, xPercent: 0, opacity: 1, scale: 1, duration: 0.95, stagger: 0.055, ease: 'elastic.out(1, 0.62)' }, 0.15);
                    }
                    if (underline) {
                        tl.fromTo(underline, { opacity: 0, yPercent: 45 }, { opacity: 1, yPercent: 0, duration: 0.45, ease: 'power2.out' }, 0.65);
                    }
                    if (ghostRef.current) {
                        tl.fromTo(ghostRef.current, { opacity: 0, scale: 1.15 }, { opacity: 0.55, scale: 1, duration: 1.2, ease: 'power2.out' }, 0.25);
                    }
                },
            });
            cleanups.push(() => headSt.kill());

            // ── Cards: elastic slam-in as each row scrolls into view ──
            // Animates the INNER .revwall-card-anim so the outer card's CSS
            // `rotate: var(--tilt)` and app.js's inertia hover never fight it.
            const igniteCard = (card: Element, i: number) => {
                const anim = card.querySelector('.revwall-card-anim');
                const stars = card.querySelectorAll('.revwall-star');
                const tl = gsap.timeline({ delay: i * 0.09 });
                tl.fromTo(anim,
                    { y: 110, opacity: 0, scale: 0.7, rotate: (i % 2 ? -8 : 8) },
                    { y: 0, opacity: 1, scale: 1, rotate: 0, duration: 0.9, ease: 'elastic.out(1, 0.55)' }, 0)
                  .fromTo(stars,
                    { scale: 0, rotate: -40, opacity: 0 },
                    { scale: 1, rotate: 0, opacity: 1, duration: 0.5, stagger: 0.05, ease: 'back.out(2.4)' }, 0.22)
                  // ember flick: the sticker "catches heat" for a beat as it lands
                  .fromTo(anim,
                    { filter: 'drop-shadow(0 0 0px rgba(255, 120, 20, 0))' },
                    { filter: 'drop-shadow(0 0 22px rgba(255, 120, 20, 0.45))', duration: 0.16, ease: 'power1.in' }, 0.42)
                  .to(anim,
                    { filter: 'drop-shadow(0 0 0px rgba(255, 120, 20, 0))', duration: 0.55, ease: 'power2.out', clearProps: 'filter' }, 0.58);
            };
            ScrollTrigger.batch(section.querySelectorAll('.revwall-card'), {
                start: 'top 90%',
                once: true,
                onEnter: (batch: Element[]) => batch.forEach(igniteCard),
            });
            cleanups.push(() => {
                ScrollTrigger.getAll()
                    .filter((st: any) => st.trigger && (st.trigger as HTMLElement).classList?.contains('revwall-card'))
                    .forEach((st: any) => st.kill());
            });

            // ── Ghost "BAM!": slow horizontal drift as you scroll through ──
            const drift = gsap.to(ghostRef.current, {
                xPercent: 8,
                ease: 'none',
                scrollTrigger: { trigger: section, start: 'top bottom', end: 'bottom top', scrub: 1 },
            });
            cleanups.push(() => { drift.scrollTrigger?.kill(); drift.kill(); });
        })();

        return () => {
            cancelled = true;
            cleanups.forEach((c) => { try { c(); } catch { /* ignore */ } });
        };
    }, []);

    return (
        <section ref={sectionRef} id="testimonials" data-inertia="" className="revwall">
            {/* halftone texture + giant ghosted brand word behind the wall */}
            <div className="revwall-texture" aria-hidden="true" />
            <div ref={ghostRef} className="revwall-ghost" aria-hidden="true">Bam!</div>

            <div className="revwall-head" data-typography-target="reviews-wall-text-field">
                <img src="/img/original-flavor-icon.png" alt="" aria-hidden="true" className="revwall-mascot" draggable={false} loading="lazy" />
                <p className="revwall-kicker">Real reviews · Real rebels</p>
                <h2 className="revwall-title">The rebels<br /><span className="light-green-span">have spoken</span></h2>
                <div className="revwall-underline">
                    <img src="/img/cdn/688655fd2fed5f707c038914_Layer_1_3.svg" loading="lazy" width="152" height="42" alt="" className="subline-img" />
                    <img src="/img/cdn/688655fd2fed5f707c038914_Layer_1_3.svg" loading="lazy" width="152" height="42" alt="" className="subline-img is-wiggle" />
                </div>
            </div>

            <div className="revwall-grid" data-typography-target="reviews-wall-text-field">
                {REVIEWS.map((review, index) => (
                    <div
                        key={index}
                        data-inertia-item=""
                        className="revwall-card"
                        style={{ '--tilt': `${review.tilt}deg` } as React.CSSProperties}
                    >
                        <div data-inertia-item-child="" className="revwall-card-anim">
                            <div className="revwall-stars">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <img key={star} src="/img/cdn/68b2bdb3390600fa418ac907_icon-testimonial-star.svg" loading="lazy" width="20" height="20" alt="" className="revwall-star" />
                                ))}
                            </div>
                            <p className="revwall-quote">{review.quote}</p>
                            <div className="revwall-foot">
                                <div className="revwall-name">{review.name}</div>
                                <div className="revwall-verified">
                                    <img src="/img/cdn/68b2c1be2762f3ffc1be06c5_icon-bubble-check.svg" loading="lazy" width="18" height="18" alt="" className="revwall-verified-icon" />
                                    <span>Verified</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default ReviewsSection;
