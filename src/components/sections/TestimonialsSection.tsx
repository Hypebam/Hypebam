"use client";

import React, { useEffect, useRef } from 'react';

// Flavour highlight cards (original slider content). The card CHOREOGRAPHY
// (star pops, headline punch, word cascade — see the effect below) stays;
// the customer reviews now live in their own ReviewsSection.
const REVIEWS = [
    { headline: <>Original</>, quote: 'A crisp, lightly sweet blend with subtle berry notes and a smooth finish.', name: 'Original' },
    { headline: <>Apple Berry</>, quote: 'A fresh, lightly sweet blend of juicy apple and soft berry notes with a smooth finish.', name: 'Apple Berry' },
    { headline: <>Lemon Lime</>, quote: 'Bright, citrus-forward and refreshing, with a clean, zesty finish.', name: 'Lemon Lime' },
    { headline: <>Mango Peach</>, quote: 'Smooth and lightly tropical, balancing ripe mango with soft peach notes.', name: 'Mango Peach' },
    { headline: <>Pineapple Passion</>, quote: 'Vibrant and juicy, blending tropical pineapple with a hint of passionfruit.', name: 'Pineapple Passion' },
    { headline: <>Find us and let&apos;s bam!</>, quote: 'Available at stores near you. Experience the rebellious energy of Sri Lanka.', name: 'Find Us' },
];

export const TestimonialsSection: React.FC = () => {
    const sliderRef = useRef<HTMLDivElement>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const hintRef = useRef<HTMLDivElement>(null);

    // ── GSAP choreography ────────────────────────────────────────────────────
    // The slider MOVEMENT is owned by app.js (it transforms the card wrappers
    // and [data-slider-item-inner] every frame), so everything here animates
    // only elements INSIDE the cards — stars, headline, quote words, rule line,
    // footer — plus the wrapper/arrows for the one-time entrance. All states
    // are set with fromTo at play time (never pre-hidden), so with no JS /
    // reduced motion the section is simply fully visible.
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
            const SplitText = (window as any).SplitText;
            const ScrollTrigger = (window as any).ScrollTrigger;

            const slider = sliderRef.current;
            const wrapper = wrapperRef.current;
            if (!slider || !wrapper) return;
            const wraps = Array.from(slider.querySelectorAll<HTMLElement>('.testimonial-slider-item-wrap'));

            // Pre-split every quote into word spans once (visual no-op until
            // animated; word type survives reflows/resizes unlike lines).
            const splits = new Map<HTMLElement, any>();
            wraps.forEach((w) => {
                const txt = w.querySelector('.testimonial-item-text');
                if (txt) splits.set(w, SplitText.create(txt, { type: 'words', wordsClass: 'review-word' }));
            });
            cleanups.push(() => splits.forEach((s) => { try { s.revert(); } catch { /* ignore */ } }));

            // The card "ignition": stars pop in sequence (the benefits-check
            // language), headline lands with a back-out punch, the quote
            // cascades word by word, the rule draws, the name/Verified row
            // rises. Replayed on every slide change.
            const ignite = (wrap: HTMLElement) => {
                const stars = wrap.querySelectorAll('.testimonial-star');
                const heading = wrap.querySelector('.testimonial-item-heading');
                const line = wrap.querySelector('.testimonial-line');
                const bottom = wrap.querySelector('.testimonial-item-bottom');
                const words = splits.get(wrap)?.words ?? [];
                const tl = gsap.timeline({ defaults: { overwrite: 'auto' } });
                tl.fromTo(stars,
                    { scale: 0, rotate: -35, opacity: 0 },
                    { scale: 1, rotate: 0, opacity: 1, duration: 0.55, stagger: 0.055, ease: 'back.out(2.2)' }, 0)
                  .fromTo(heading,
                    { yPercent: 45, opacity: 0, scale: 0.92, transformOrigin: '0% 100%' },
                    { yPercent: 0, opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(1.6)' }, 0.06)
                  .fromTo(words,
                    { yPercent: 120, opacity: 0 },
                    { yPercent: 0, opacity: 1, duration: 0.45, stagger: 0.012, ease: 'power3.out' }, 0.16)
                  .fromTo(line,
                    { scaleX: 0, transformOrigin: 'left center' },
                    { scaleX: 1, duration: 0.5, ease: 'power2.out' }, 0.3)
                  .fromTo(bottom,
                    { y: 14, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.45, ease: 'power2.out' }, 0.36);
                return tl;
            };

            const fadeHint = () => {
                if (hintRef.current) gsap.to(hintRef.current, { autoAlpha: 0, duration: 0.4 });
            };

            // Replay the ignition whenever app.js's slider crowns a new active
            // card (it toggles .is-active in its onSlideChange). Class changes
            // also happen programmatically (slider init, auto-advance on
            // scroll-in), so the swipe hint is NOT faded here — only real user
            // input (drag / arrows, wired below) dismisses it.
            const mo = new MutationObserver((muts) => {
                muts.forEach((m) => {
                    const el = m.target as HTMLElement;
                    if (el.classList.contains('is-active') && m.oldValue && !m.oldValue.includes('is-active')) {
                        ignite(el);
                    }
                });
            });
            wraps.forEach((w) => mo.observe(w, { attributes: true, attributeFilter: ['class'], attributeOldValue: true }));
            cleanups.push(() => mo.disconnect());

            // One-time entrance: section heading words cascade in from the
            // bottom-right with an elastic settle (mirrors app.js's
            // data-highlight-text motion), the slider rises, the arrows pop,
            // and the current active card ignites.
            const heading = document.querySelector('.testimonial-heading');
            const headingSplit = heading ? SplitText.create(heading, { type: 'words', wordsClass: 'review-word' }) : null;
            if (headingSplit) cleanups.push(() => { try { headingSplit.revert(); } catch { /* ignore */ } });
            const arrows = document.querySelectorAll('.testimonial-slider-button');

            const st = ScrollTrigger.create({
                trigger: wrapper,
                start: 'top 82%',
                once: true,
                onEnter: () => {
                    const tl = gsap.timeline();
                    if (headingSplit) {
                        tl.fromTo(headingSplit.words,
                            { yPercent: 30, xPercent: 45, opacity: 0, scale: 0.6, transformOrigin: '100% 100%' },
                            { yPercent: 0, xPercent: 0, opacity: 1, scale: 1, duration: 0.9, stagger: 0.05, ease: 'elastic.out(1, 0.6)' }, 0);
                    }
                    tl.fromTo(wrapper, { y: 70, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out' }, 0.1)
                      .fromTo(arrows, { scale: 0, rotate: -25 }, { scale: 1, rotate: 0, duration: 0.6, stagger: 0.08, ease: 'back.out(2)' }, 0.35);
                    const active = slider.querySelector<HTMLElement>('.testimonial-slider-item-wrap.is-active');
                    if (active) tl.add(ignite(active), 0.45);
                },
            });
            cleanups.push(() => st.kill());

            // The swipe hint dies on the first USER interaction: touching the
            // slider or pressing either arrow.
            slider.addEventListener('pointerdown', fadeHint, { once: true, passive: true });
            cleanups.push(() => slider.removeEventListener('pointerdown', fadeHint));
            arrows.forEach((a) => a.addEventListener('click', fadeHint, { once: true }));
            cleanups.push(() => arrows.forEach((a) => a.removeEventListener('click', fadeHint)));
        })();

        return () => {
            cancelled = true;
            cleanups.forEach((c) => { try { c(); } catch { /* ignore */ } });
        };
    }, []);

    return (
        <div id="reviews" className="testimonial-section">
            <div data-testimonial-parallax="" className="bg-img-wrapper">
                <img className="testimonial-top-img" src="/img/1/4.webp" width="1400" alt="Hype Bam Original can" data-testimonial-parallax-item="" loading="lazy" />
                <img className="bg-img" src="/img/1/6.webp" width="1400" alt="Hype Bam flame stage" data-testimonial-parallax-item="" loading="lazy" />
            </div>
            <div className="testimonial-container">
                <div className="grid-layout">
                    <div id="w-node-_188a35c2-2913-dd29-6c54-5bf8cbbe64f3-0ac01850" className="big-title-wrapper">
                        <h2 className="testimonial-big-heading">Sri Lankanized<br />Hydration</h2>
                    </div>
                    <div id="w-node-d56024cf-9b70-fc24-7ba0-e2b3ea8d1769-0ac01850" className="testimonial-slider">
                        <h3 className="testimonial-heading">why they keep<br />coming back</h3>
                        <div
                            ref={wrapperRef}
                            data-testimonial-inview=""
                            className="testimonial-slider-wrapper"
                            data-typography-target="testimonial-cards-text-field"
                        >
                            <div data-slider-interface="" className="testimonial-slider-interface">
                                <div data-slider-arrows="" className="testimonial-slider-button-wrapper">
                                    <button type="button" data-slider-left-button="" aria-label="Previous review" className="testimonial-slider-button is-left">
                                        <img src="/img/cdn/68b2de0fba88460ab65187e9_icon-arrow-left.svg" loading="lazy" width="20" height="20" alt="" className="testimonial-slider-button-arrow" />
                                    </button>
                                    <button type="button" data-slider-right-button="" aria-label="Next review" className="testimonial-slider-button is-right">
                                        <img src="/img/cdn/68b2de0f2245f238d5eb3226_icon-arrow-right.svg" loading="lazy" width="20" height="20" alt="" className="testimonial-slider-button-arrow" />
                                    </button>
                                </div>
                            </div>
                            <div ref={sliderRef} data-slider="" className="testimonial-slider-inner">
                                {REVIEWS.map((review, index) => (
                                    <div key={index} className="testimonial-slider-item-wrap">
                                        <div data-slider-item-inner="" className="testimonial-slider-item">
                                            <div className="testimonial-star-wrap">
                                                {[1, 2, 3, 4, 5].map((star) => (
                                                    <img key={star} src="/img/cdn/68b2bdb3390600fa418ac907_icon-testimonial-star.svg" loading="lazy" width="20" height="20" alt="" className="testimonial-star" />
                                                ))}
                                            </div>
                                            <div className="testimonial-item-inner-text">
                                                <h3 className="testimonial-item-heading">{review.headline}</h3>
                                                <p className="testimonial-item-text">{review.quote}</p>
                                            </div>
                                            <div className="testimonial-line"></div>
                                            <div className="testimonial-item-bottom">
                                                <div className="testimonial-client-name">{review.name}</div>
                                                <div className="testimonial-verified-wrap">
                                                    <img src="/img/cdn/68b2c1be2762f3ffc1be06c5_icon-bubble-check.svg" loading="lazy" width="20" height="20" alt="" className="testimonial-verified-icon" />
                                                    <div className="testimonial-verified-text">Verified</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        {/* Handwritten swipe cue — mobile only, fades after the first
                            interaction / slide change. OUTSIDE the typography-target
                            wrapper so the Caveat script isn't force-uppercased. */}
                        <div ref={hintRef} className="reviews-swipe-hint" aria-hidden="true">swipe for more →</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TestimonialsSection;
