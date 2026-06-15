"use client";

import { useEffect } from 'react';

declare global {
    interface Window {
        gsap: any;
        ScrollTrigger: any;
        CustomEase: any;
        DrawSVGPlugin: any;
        InertiaPlugin: any;
        SplitText: any;
        lenis: any;
    }
}

// ──────────────────────────────────────────────────────────────
// Load coordinator: a single promise-based init pipeline replaces
// the previous chain of arbitrary setTimeouts. Each stage waits on
// what it actually depends on, so init succeeds on slow phones too.
// ──────────────────────────────────────────────────────────────

const waitFor = <T,>(test: () => T | undefined | null, timeoutMs = 8000, intervalMs = 50): Promise<T> =>
    new Promise((resolve, reject) => {
        const start = performance.now();
        const tick = () => {
            const value = test();
            if (value) return resolve(value);
            if (performance.now() - start > timeoutMs) return reject(new Error('waitFor timeout'));
            setTimeout(tick, intervalMs);
        };
        tick();
    });

const loadScript = (src: string): Promise<void> =>
    new Promise((resolve, reject) => {
        if (document.querySelector(`script[src="${src}"]`)) return resolve();
        const el = document.createElement('script');
        el.src = src;
        el.defer = false;
        el.onload = () => resolve();
        el.onerror = () => reject(new Error(`failed to load ${src}`));
        document.body.appendChild(el);
    });

export const useAnimations = () => {
    useEffect(() => {
        const cleanups: Array<() => void> = [];
        let animationId: number | undefined;

        // ────────────────────────────────────────────────
        // 1. MOUSE-TRACKING SPOTLIGHT (desktop pointer only)
        // ────────────────────────────────────────────────
        let mouseX = 0, mouseY = 0;
        let currentX = 0, currentY = 0;

        const handleMouseMove = (e: MouseEvent) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        };

        const GLOW = (x: number, y: number) =>
            `radial-gradient(600px circle at ${x}px ${y}px, rgba(230,81,0,0.06) 0%, rgba(230,81,0,0.02) 40%, transparent 70%)`;

        const animate = () => {
            currentX += (mouseX - currentX) * 0.08;
            currentY += (mouseY - currentY) * 0.08;
            const overlay = document.getElementById('mouse-glow-overlay');
            if (overlay) {
                overlay.style.background = GLOW(currentX, currentY);
            }
            // Scoped marquee glow: the fixed overlay above is occluded by the
            // marquee's opaque cream triangle (inside the marquee's own stacking
            // context), so the marquee never received the page-wide hover tint.
            // Paint the SAME glow into a marquee-local layer, positioned relative
            // to the marquee so the cursor lines up. (Only this layer is tinted —
            // the videos below are untouched.)
            const mq = document.getElementById('marquee-glow');
            if (mq && mq.parentElement) {
                const r = mq.parentElement.getBoundingClientRect();
                mq.style.background = GLOW(currentX - r.left, currentY - r.top);
            }
            animationId = requestAnimationFrame(animate);
        };

        if (!document.getElementById('mouse-glow-overlay')) {
            const overlay = document.createElement('div');
            overlay.id = 'mouse-glow-overlay';
            overlay.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:1;background:transparent';
            document.body.appendChild(overlay);
        }

        // Inject the marquee-scoped glow layer. It sits above the cream overlay
        // (z-index:-1) but below the marquee text (z-index:2), and is clipped to
        // the SAME diagonal polygon as .marquee-overlay so only the cream area
        // tints — exactly matching the hover feel of the insider section below.
        const marqueeInner = document.querySelector('.marquee-inner');
        if (marqueeInner && !document.getElementById('marquee-glow')) {
            const mqGlow = document.createElement('div');
            mqGlow.id = 'marquee-glow';
            mqGlow.style.cssText =
                'position:absolute;inset:0;pointer-events:none;z-index:0;' +
                'clip-path:polygon(66% 10%,100% 53%,100% 100%,0 100%,0 79%);' +
                'background:transparent';
            marqueeInner.appendChild(mqGlow);
        }

        if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
            window.addEventListener('mousemove', handleMouseMove);
            animationId = requestAnimationFrame(animate);
        }

        // ────────────────────────────────────────────────
        // 2. TESTIMONIAL SLIDER (custom horizontal scroll)
        // ────────────────────────────────────────────────
        const initTestimonialSlider = () => {
            const slider = document.querySelector('[data-slider]') as HTMLElement;
            const leftBtn = document.querySelector('[data-slider-left-button]');
            const rightBtn = document.querySelector('[data-slider-right-button]');
            if (!slider) return;

            const items = slider.querySelectorAll('.testimonial-slider-item-wrap');
            const totalItems = items.length;
            let currentIndex = 0;

            const updateSlider = () => {
                items.forEach((item, i) => item.classList.toggle('is-active', i === currentIndex));
                const activeItem = items[currentIndex] as HTMLElement;
                if (!activeItem) return;
                const sliderRect = slider.getBoundingClientRect();
                const itemRect = activeItem.getBoundingClientRect();
                const scrollOffset = itemRect.left - sliderRect.left - (sliderRect.width / 2) + (itemRect.width / 2) + slider.scrollLeft;
                slider.scrollTo({ left: scrollOffset, behavior: 'smooth' });
            };

            leftBtn?.addEventListener('click', () => { currentIndex = Math.max(0, currentIndex - 1); updateSlider(); });
            rightBtn?.addEventListener('click', () => { currentIndex = Math.min(totalItems - 1, currentIndex + 1); updateSlider(); });
            updateSlider();
        };

        // ────────────────────────────────────────────────
        // 3. VIDEO SOUND — owned entirely by app.js Ao().
        //    app.js attaches its own click handler to every
        //    [data-video-button] (toggles video.muted + play() on unmute) and
        //    a ScrollTrigger that plays/pauses on view. We must NOT add a
        //    second click handler — two handlers double-toggle the mute and
        //    the video stays muted. (InsiderSection's IntersectionObserver
        //    still lazy-loads the data-src that Ao() then plays.)
        // ────────────────────────────────────────────────

        // ────────────────────────────────────────────────
        // 4. FOOTER CREDITS TOGGLE
        // ────────────────────────────────────────────────
        const initFooterCredits = () => {
            const toggle = document.querySelector('.footer-credits-toggle');
            const credits = document.querySelector('.footer-credits');
            if (!toggle || !credits) return;

            toggle.addEventListener('click', () => {
                const inner = credits.querySelector('.footer-credits-inner') as HTMLElement;
                if (!inner) return;
                const isVisible = inner.style.opacity === '1';
                if (isVisible) {
                    inner.style.opacity = '0';
                    inner.style.pointerEvents = 'none';
                    inner.style.translate = '.5em 1.5em 0';
                } else {
                    inner.style.opacity = '1';
                    inner.style.pointerEvents = 'auto';
                    inner.style.translate = '0 0 0';
                    inner.style.scale = '.95';
                    inner.style.transform = 'scale(1.0526315789)';
                }
            });
        };

        // ────────────────────────────────────────────────
        // 5. CUSTOM GSAP ANIMATIONS (benefits, payment, mobile cards, parallax)
        //    Uses gsap.matchMedia so contexts auto-revert on resize.
        // ────────────────────────────────────────────────
        const initGSAPAnimations = () => {
            const gsap = window.gsap;
            const ScrollTrigger = window.ScrollTrigger;
            if (!gsap || !ScrollTrigger) return;
            // Plugins already registered in the init pipeline above.

            // — Benefit table items (all viewports) —
            document.querySelectorAll('.benefit-table-item').forEach((item, i) => {
                gsap.fromTo(item,
                    { opacity: 0, y: 30 },
                    {
                        scrollTrigger: { trigger: item, start: 'top 90%', toggleActions: 'play none none reverse' },
                        opacity: 1, y: 0, duration: 0.6, delay: i * 0.08, ease: 'power2.out',
                    });
            });

            // — Benefit check marks (all viewports) —
            document.querySelectorAll('[data-benefit-table-check]').forEach((check, i) => {
                gsap.fromTo(check,
                    { scale: 0, opacity: 0 },
                    {
                        scrollTrigger: { trigger: check, start: 'top 90%', toggleActions: 'play none none reverse' },
                        scale: 1, opacity: 1, duration: 0.5, delay: i * 0.1 + 0.3, ease: 'back.out(1.7)',
                    });
            });

            // — Payment item stagger (all viewports) —
            const paymentItems = document.querySelectorAll('[data-payment-item]');
            if (paymentItems.length) {
                gsap.fromTo(paymentItems,
                    { scale: 0, opacity: 0 },
                    {
                        scrollTrigger: { trigger: '[data-payment]', start: 'top 85%', toggleActions: 'play none none reverse' },
                        scale: 1, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'back.out(1.7)', immediateRender: false,
                    });
            }

            // — Desktop-only: testimonial parallax (mobile has no scroll runway to parallax over) —
            const mm = gsap.matchMedia();
            mm.add('(min-width: 992px)', () => {
                document.querySelectorAll('[data-testimonial-parallax-item]').forEach((item) => {
                    gsap.to(item, {
                        scrollTrigger: { trigger: '[data-testimonial-parallax]', start: 'top bottom', end: 'bottom top', scrub: 1 },
                        y: -80, ease: 'none',
                    });
                });
            });

            // NOTE: the mobile finale title ("Fuel The Rebel") reveal is now pure
            // CSS (animation-timeline: view() in globals.css). Every JS approach
            // (ScrollTrigger, IntersectionObserver) verified fine here but stayed
            // stuck for the user in `next dev` + Chrome DevTools, so we removed the
            // JS entirely — the CSS scroll animation has no init/observer timing to
            // fail and falls back to fully-visible where unsupported.

            cleanups.push(() => mm.revert());
        };

        // ────────────────────────────────────────────────
        // 5b. SEQUENCE LIGHTNING — scroll draw-in (one at a time) + strike flash
        //     The bolts are <img> of the user's filled lightning art. This brings
        //     back the ORIGINAL behaviour: as you scroll the pinned section each
        //     bolt DRAWS ITSELF IN (a clip-path wipe, scrubbed by scroll), ONE AT
        //     A TIME — the previous bolt fades before the next draws. When a bolt
        //     finishes drawing it STRIKES: a violent multi-flash brightness/glow
        //     punch (--bolt-bright) — the electric lightning effect on top.
        //     clip-path drives the reveal; --bolt-bright drives the flash; they
        //     animate different properties so they never fight each other.
        // ────────────────────────────────────────────────
        const initSequenceLightning = () => {
            const gsap = window.gsap;
            const ScrollTrigger = window.ScrollTrigger;
            if (!gsap || !ScrollTrigger) return;

            const section = document.querySelector('.sequence-section');
            if (!section) return;
            // The tall pinned runway is the scrub trigger (fallback: the section).
            const runway = section.querySelector('.sequence-scroll-wrap') || section;
            const bolts = Array.from(section.querySelectorAll<HTMLElement>('[data-lightning]'));
            if (!bolts.length) return;

            // Each bolt's mask-reveal stroke — drawing it (offset 1→0) reveals the
            // artwork tip-to-tip ALONG the lightning path.
            const reveals = bolts.map((b) => b.querySelector<SVGPathElement>('[data-bolt-reveal]'));

            const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

            // Hidden to start: reveal stroke fully retracted + bolt transparent.
            gsap.set(reveals.filter(Boolean), { strokeDasharray: 1, strokeDashoffset: 1 });
            gsap.set(bolts, { opacity: 0, '--bolt-bright': 1 });

            // The strike flash — fires when a bolt finishes drawing in. A real bolt
            // flickers in two bursts, so this is a DOUBLE strike: a first flash that
            // settles, a beat of darkness, then a second, brighter flash that decays.
            const strike = (el: HTMLElement) =>
                gsap.timeline()
                    // ── first flash ──
                    .fromTo(el, { '--bolt-bright': 3.2 }, { '--bolt-bright': 1.3, duration: 0.05, ease: 'none' })
                    .to(el, { '--bolt-bright': 2.5, duration: 0.035, ease: 'none' })
                    .to(el, { '--bolt-bright': 1.1, duration: 0.06, ease: 'power1.out' })
                    // ── beat of darkness ──
                    .to(el, { '--bolt-bright': 0.82, duration: 0.06, ease: 'none' })
                    // ── second flash (bigger) ──
                    .to(el, { '--bolt-bright': 3.4, duration: 0.04, ease: 'none' })
                    .to(el, { '--bolt-bright': 1.4, duration: 0.05, ease: 'none' })
                    .to(el, { '--bolt-bright': 2.3, duration: 0.03, ease: 'none' })
                    .to(el, { '--bolt-bright': 1,   duration: 0.4,  ease: 'power2.out' });

            const struck = bolts.map(() => false);
            const n = bolts.length;
            const seg = 1 / n;              // each bolt owns one slice of the scroll

            const st = ScrollTrigger.create({
                trigger: runway,
                start: 'top top',
                end: 'bottom bottom',
                scrub: true,
                onUpdate: (self: any) => {
                    const p = self.progress;
                    bolts.forEach((b, i) => {
                        const reveal = reveals[i];
                        const local = (p - i * seg) / seg;   // 0..1 within this bolt's slice
                        let draw: number, op: number;        // draw = fraction drawn along the path
                        if (local <= 0)        { draw = 0; op = 0; struck[i] = false; }
                        else if (local >= 1)   { draw = 1; op = 0; }            // gone — one at a time
                        else if (local < 0.55) { draw = local / 0.55; op = 1; } // DRAW IN along path
                        else if (local < 0.80) {                                 // fully drawn → STRIKE
                            draw = 1; op = 1;
                            if (!reduce && !struck[i]) { struck[i] = true; strike(b); }
                        }
                        else                   { draw = 1; op = 1 - (local - 0.80) / 0.20; } // fade out
                        if (reveal) gsap.set(reveal, { strokeDashoffset: 1 - draw });
                        gsap.set(b, { opacity: op });
                    });
                },
            });

            cleanups.push(() => {
                gsap.killTweensOf(bolts);
                gsap.killTweensOf(reveals.filter(Boolean) as SVGPathElement[]);
                st.kill();
            });
        };

        // (No mobile finale-title reveal — it's static, matching the original.)

        // ────────────────────────────────────────────────
        // Init pipeline — promises, not arbitrary timers
        //
        // CRITICAL ORDER: app.js uses real GSAP plugins (SplitText.create,
        // CustomEase.create, ScrollTrigger, drawSVG + inertia tween props).
        // Those plugins load as async <Script> tags in layout.tsx, so we
        // must (1) wait for every plugin global, (2) register them into the
        // gsap core, and only THEN (3) load app.js. Loading app.js first
        // meant drawSVG/inertia/SplitText silently no-op'd.
        // ────────────────────────────────────────────────
        let cancelled = false;
        (async () => {
            // 1. Wait for gsap core + every plugin global injected by layout.tsx
            let gsapReady = false;
            try {
                await waitFor(() => {
                    const w = window as any;
                    return w.gsap && w.ScrollTrigger && w.CustomEase &&
                           w.DrawSVGPlugin && w.InertiaPlugin && w.SplitText;
                }, 8000);
                gsapReady = true;
            } catch {
                if (process.env.NODE_ENV !== 'production') {
                    console.warn('[gsap] not all plugins loaded in time — continuing degraded');
                }
            }
            if (cancelled) return;

            // 2. Register every plugin into the gsap core so tween properties
            //    (drawSVG, inertia) and eases (CustomEase/Wiggle/Bounce) resolve.
            if (gsapReady) {
                const w = window as any;
                try {
                    w.gsap.registerPlugin(
                        w.ScrollTrigger,
                        w.CustomEase,
                        w.DrawSVGPlugin,
                        w.InertiaPlugin,
                        w.SplitText,
                    );
                } catch (err) {
                    console.error('[gsap] registerPlugin failed', err);
                }
                // Suppress "GSAP target null not found" console spam: app.js
                // mo()/yo() animate several decorative elements we intentionally
                // removed (sequence signatures, cookie/strawberry, stage-deco).
                // Their gsap.set/to calls hit null/empty targets — harmless
                // no-ops. Set before app.js loads so none of them warn.
                try { w.gsap.config({ nullTargetWarn: false }); } catch { /* noop */ }
            }

            // 3. Crash-proof the hero intro: app.js yo() calls
            //    [data-load-stage-logo-lottie].play(). HeroSection lazy-loads the
            //    real lottie, but it may not be ready yet — guarantee a no-op
            //    .play() exists so yo() never throws (which would block the
            //    hero canvas draw). HeroSection upgrades this to the real call.
            const lottieEl = document.querySelector('[data-load-stage-logo-lottie]') as any;
            if (lottieEl && typeof lottieEl.play !== 'function') {
                lottieEl.play = () => {};
            }

            // 4. Load the Webflow animation bundle now that plugins are live.
            try {
                await loadScript('/scripts/app.js');
            } catch (err) {
                console.error('Failed to load app.js — enabling fallback', err);
                document.documentElement.classList.add('fonts-loaded', 'is-ready', 'has-seq-ready');
            }
            if (cancelled) return;

            // 5. Our own init tasks (each no-ops gracefully if its DOM is absent).
            //    Video sound/play is owned by app.js Ao() — do NOT init here.
            initTestimonialSlider();
            initFooterCredits();

            if (gsapReady) initGSAPAnimations();
            if (gsapReady) initSequenceLightning();
        })();

        // ────────────────────────────────────────────────
        // CLEANUP
        // ────────────────────────────────────────────────
        return () => {
            cancelled = true;
            window.removeEventListener('mousemove', handleMouseMove);
            if (animationId) cancelAnimationFrame(animationId);
            const overlay = document.getElementById('mouse-glow-overlay');
            if (overlay) overlay.remove();
            const mqGlow = document.getElementById('marquee-glow');
            if (mqGlow) mqGlow.remove();
            cleanups.forEach((c) => { try { c(); } catch { /* ignore */ } });
        };
    }, []);
};

export default useAnimations;
