"use client";

import { useEffect } from 'react';

declare global {
    interface Window {
        Swiper: any;
        gsap: any;
        ScrollTrigger: any;
        CustomEase: any;
        CustomWiggle: any;
        CustomBounce: any;
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

        const animate = () => {
            currentX += (mouseX - currentX) * 0.08;
            currentY += (mouseY - currentY) * 0.08;
            const xPct = (currentX / window.innerWidth) * 100;
            const yPct = (currentY / window.innerHeight) * 100;
            const overlay = document.getElementById('mouse-glow-overlay');
            if (overlay) {
                overlay.style.background = `radial-gradient(600px circle at ${xPct}% ${yPct}%, rgba(230,81,0,0.06) 0%, rgba(230,81,0,0.02) 40%, transparent 70%)`;
            }
            animationId = requestAnimationFrame(animate);
        };

        if (!document.getElementById('mouse-glow-overlay')) {
            const overlay = document.createElement('div');
            overlay.id = 'mouse-glow-overlay';
            overlay.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:1;background:transparent';
            document.body.appendChild(overlay);
        }

        if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
            window.addEventListener('mousemove', handleMouseMove);
            animationId = requestAnimationFrame(animate);
        }

        // ────────────────────────────────────────────────
        // 2. SWIPER (flavour slider) — needs Swiper global
        // ────────────────────────────────────────────────
        const initSwiper = async () => {
            const flavourSliderEl = document.querySelector('[data-flavour-slider]');
            const contentSliderEl = document.querySelector('[data-flavour-content-slider]');
            if (!flavourSliderEl || !contentSliderEl) return;

            // Swiper is served locally (public/vendor/swiper) if present — never from
            // a CDN. CDN loads here were blocked by Firefox/Safari/Edge privacy modes
            // and broke cross-browser. Our custom FlavourSection doesn't use Swiper,
            // so this stays a no-op unless a [data-flavour-slider] element exists AND
            // a local Swiper global is available.
            if (!window.Swiper) return;

            const contentSwiper = new window.Swiper('[data-flavour-content-slider]', {
                slidesPerView: 1,
                allowTouchMove: false,
                effect: 'fade',
                fadeEffect: { crossFade: true },
                speed: 600,
            });

            const mainSwiper = new window.Swiper('[data-flavour-slider]', {
                slidesPerView: 1,
                centeredSlides: true,
                speed: 800,
                loop: false,
                grabCursor: true,
                breakpoints: { 992: { slidesPerView: 1.5 } },
                thumbs: { swiper: contentSwiper },
            });

            const leftBtn = document.querySelector('[data-flavour-slider-left-button]');
            const rightBtn = document.querySelector('[data-flavour-slider-right-button]');
            leftBtn?.addEventListener('click', () => { mainSwiper.slidePrev(); contentSwiper.slidePrev(); });
            rightBtn?.addEventListener('click', () => { mainSwiper.slideNext(); contentSwiper.slideNext(); });
            mainSwiper.on('slideChange', () => { contentSwiper.slideTo(mainSwiper.activeIndex); });
        };

        // ────────────────────────────────────────────────
        // 3. TESTIMONIAL SLIDER (custom horizontal scroll)
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
        // 4. VIDEO SOUND — owned entirely by app.js Ao().
        //    app.js attaches its own click handler to every
        //    [data-video-button] (toggles video.muted + play() on unmute) and
        //    a ScrollTrigger that plays/pauses on view. We must NOT add a
        //    second click handler — two handlers double-toggle the mute and
        //    the video stays muted. (InsiderSection's IntersectionObserver
        //    still lazy-loads the data-src that Ao() then plays.)
        // ────────────────────────────────────────────────

        // ────────────────────────────────────────────────
        // 5. FOOTER CREDITS TOGGLE
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
        // 6. CUSTOM GSAP ANIMATIONS (benefits, payment, mobile cards, parallax)
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

            // Mobile sequence CARDS are NOT JS-animated (the pinned-canvas +
            // scroll-over layout is the animation). But the mobile FINAL title
            // ("Fuel The Rebel") has no app.js hook, so reveal it on scroll-in.
            mm.add('(max-width: 991px)', () => {
                const title = document.querySelector<HTMLElement>('.sequence-final-mobile .sequence-title');
                if (!title) return;
                const obs = new IntersectionObserver(
                    (entries) => {
                        entries.forEach((e) => {
                            if (e.isIntersecting) { e.target.classList.add('is-inview'); obs.unobserve(e.target); }
                        });
                    },
                    { threshold: 0.3, rootMargin: '0px 0px -8% 0px' }
                );
                obs.observe(title);
                return () => obs.disconnect();
            });

            cleanups.push(() => mm.revert());
        };

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
                        ...(w.CustomWiggle ? [w.CustomWiggle] : []),
                        ...(w.CustomBounce ? [w.CustomBounce] : []),
                    );
                } catch (err) {
                    console.error('[gsap] registerPlugin failed', err);
                }
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
            initSwiper();
            initTestimonialSlider();
            initFooterCredits();

            if (gsapReady) initGSAPAnimations();
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
            cleanups.forEach((c) => { try { c(); } catch { /* ignore */ } });
        };
    }, []);
};

export default useAnimations;
