"use client";
import React, { useEffect, useRef } from 'react';

export const Loader: React.FC = () => {
    const iconRef = useRef<HTMLImageElement>(null);

    useEffect(() => {
        let observer: MutationObserver | null = null;
        let cancelled = false;

        // Use the vendored GSAP core (loaded by layout.tsx as an afterInteractive
        // script) instead of bundling a SECOND copy of gsap from npm (~25 kB gzip
        // saved, and one engine instead of two). It loads within a few ticks of
        // hydration; until then the icon just sits static, which is fine.
        const waitForGsap = (timeoutMs = 5000): Promise<typeof window.gsap | null> =>
            new Promise((resolve) => {
                const start = performance.now();
                const tick = () => {
                    if (cancelled) return resolve(null);
                    if (window.gsap) return resolve(window.gsap);
                    if (performance.now() - start > timeoutMs) return resolve(null);
                    setTimeout(tick, 40);
                };
                tick();
            });

        const init = async () => {
            const gsap = await waitForGsap();
            if (!gsap || cancelled) return;
            // If the page already revealed (is-ready landed before gsap did),
            // the loader is hidden — starting the entrance + INFINITE breathe/
            // glow tweens now would tick invisibly forever. Do nothing.
            if (document.documentElement.classList.contains('is-ready')) return;
            const icon = iconRef.current;
            if (!icon) return;

            // ─────────────────────────────────────────────────────────────────
            // INITIAL STATE: a razor-thin comet streak high above center screen
            // ─────────────────────────────────────────────────────────────────
            gsap.set(icon, {
                y: -480,
                scaleX: 0.06,
                scaleY: 6.5,
                filter: 'brightness(6) blur(10px)',
                opacity: 1,
                transformOrigin: 'center center',
            });

            const tl = gsap.timeline();

            // ─────────────────────────────────────────────────────────────────
            // PHASE 1 — DESCENT  (0 – 0.38s)
            // Comet rockets downward at terminal velocity.
            // scaleX widens as it approaches, scaleY compresses — anticipation.
            // ─────────────────────────────────────────────────────────────────
            tl.to(icon, {
                y: 15,
                scaleX: 1.2,
                scaleY: 0.75,
                filter: 'brightness(3) blur(3px)',
                duration: 0.38,
                ease: 'power4.in',
            })

            // ─────────────────────────────────────────────────────────────────
            // PHASE 2 — IMPACT  (0.38 – 0.44s)
            // Ground slam: extreme squash + blinding energy flash.
            // Classic animation squash principle at 6× speed.
            // ─────────────────────────────────────────────────────────────────
            .to(icon, {
                y: 0,
                scaleX: 1.7,
                scaleY: 0.45,
                filter: 'brightness(9) blur(0px)',
                duration: 0.055,
                ease: 'none',
            })

            // ─────────────────────────────────────────────────────────────────
            // PHASE 3 — ELASTIC RECOVERY  (0.44 – 1.32s)
            // Springs from squashed pancake back to full form.
            // Overshoot + settle = the character is alive.
            // ─────────────────────────────────────────────────────────────────
            .to(icon, {
                scaleX: 1,
                scaleY: 1,
                filter: 'brightness(1) blur(0px)',
                duration: 0.88,
                ease: 'elastic.out(1.15, 0.36)',
                transformOrigin: 'center bottom',
            })

            // ─────────────────────────────────────────────────────────────────
            // PHASE 4 — CHARGE QUIVER  (1.32 – 1.75s)
            // Energy is still uncontained — character vibrates with it.
            // Decreasing amplitude = the energy is being focused.
            // ─────────────────────────────────────────────────────────────────
            .to(icon, { rotation: -8,  x: -6, duration: 0.052, ease: 'power4.out', transformOrigin: 'center center' }, '+=0.04')
            .to(icon, { rotation:  8,  x:  6, duration: 0.068, ease: 'power4.out' })
            .to(icon, { rotation: -6,  x: -5, duration: 0.055, ease: 'power4.out' })
            .to(icon, { rotation:  6,  x:  4, duration: 0.065, ease: 'power4.out' })
            .to(icon, { rotation: -4,  x: -3, duration: 0.050, ease: 'power4.out' })
            .to(icon, { rotation:  4,  x:  3, duration: 0.058, ease: 'power4.out' })
            .to(icon, { rotation: -2,  x: -1, duration: 0.045, ease: 'power4.out' })
            .to(icon, { rotation:  0,  x:  0, duration: 0.090, ease: 'elastic.out(1, 0.5)' })

            // ─────────────────────────────────────────────────────────────────
            // PHASE 5 — POWER SURGE  (1.75 – 2.05s)
            // One final ignition: expands with a fire flash, then snaps back.
            // Signals "full power achieved" before entering the idle loop.
            // ─────────────────────────────────────────────────────────────────
            .to(icon, {
                scale: 1.22,
                filter: 'brightness(3.5) drop-shadow(0 0 35px rgba(255,200,60,0.95))',
                duration: 0.11,
                ease: 'power3.out',
                transformOrigin: 'center center',
            })
            .to(icon, {
                scale: 1,
                filter: 'drop-shadow(0 6px 22px rgba(40,12,0,0.7))',
                duration: 0.3,
                ease: 'elastic.out(1.2, 0.5)',
            })

            // ─────────────────────────────────────────────────────────────────
            // PHASE 6 — GLOW BREATHE LOOP  (2.1s → ∞)
            // Contained power. Icon breathes and pulses with fire glow
            // against the dark background — the energy is alive.
            // ─────────────────────────────────────────────────────────────────
            .add(() => {
                // Scale breath — slow and powerful
                gsap.to(icon, {
                    scale: 1.07,
                    duration: 0.92,
                    ease: 'sine.inOut',
                    yoyo: true,
                    repeat: -1,
                    transformOrigin: 'center center',
                });

                // Fire glow pulse — synced with scale breath
                gsap.fromTo(icon,
                    { filter: 'drop-shadow(0 6px 22px rgba(40,12,0,0.7))' },
                    {
                        filter: 'drop-shadow(0 0 24px rgba(255,210,70,0.95)) drop-shadow(0 0 55px rgba(255,80,0,0.6)) drop-shadow(0 0 90px rgba(255,40,0,0.3))',
                        duration: 0.92,
                        ease: 'sine.inOut',
                        yoyo: true,
                        repeat: -1,
                    }
                );
            }, '+=0.08');

            // ─────────────────────────────────────────────────────────────────
            // EXIT — "BLAST OFF"  (on html.is-ready)
            // Mirrors the entrance: wind-back → launch straight up as a streak.
            // Dark loader fades revealing the bright amber hero beneath — a
            // dramatic dark → light reveal the user only sees once.
            // ─────────────────────────────────────────────────────────────────
            observer = new MutationObserver(() => {
                if (!document.documentElement.classList.contains('is-ready')) return;
                observer?.disconnect();
                gsap.killTweensOf(icon);

                gsap.timeline()
                    // Wind-back: crouch before launch
                    .to(icon, {
                        scaleX: 0.83,
                        scaleY: 1.22,
                        y: 22,
                        filter: 'drop-shadow(0 6px 22px rgba(40,12,0,0.7))',
                        duration: 0.13,
                        ease: 'power2.in',
                        transformOrigin: 'center center',
                    })
                    // BLAST: narrow to a streak, rocket upward, gone
                    .to(icon, {
                        y: -500,
                        scaleX: 0.06,
                        scaleY: 7,
                        filter: 'brightness(7) blur(12px)',
                        opacity: 0,
                        duration: 0.42,
                        ease: 'power4.in',
                        transformOrigin: 'center center',
                    });
            });

            observer.observe(document.documentElement, {
                attributes: true,
                attributeFilter: ['class'],
            });
        };

        init();
        return () => { cancelled = true; observer?.disconnect(); };
    }, []);

    return (
        <div className="loader">
            <img
                ref={iconRef}
                src="/img/original-flavor-icon.png"
                alt="Hype Bam"
                className="ldr-icon"
                draggable={false}
            />
        </div>
    );
};

export default Loader;
