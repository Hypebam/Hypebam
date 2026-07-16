"use client";

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Button } from '@/components/ui';

interface Flavour {
    name: string;
    tagline: string;
    image: string;
    color: string; // deep, vivid accent — reads on warm cream (name / dots / arrows)
    glow: string;  // brighter bloom that haloes the can
}

// Warm → cool spectrum so the bloom flows as you spin.
const FLAVOURS: Flavour[] = [
    { name: 'Original',          tagline: 'The one that started it all', image: '/img/flavours/can-1.webp', color: '#DC5400', glow: '#FFAE1F' },
    { name: 'Mango Peach',       tagline: 'Sun-ripened island rush',     image: '/img/flavours/can-2.webp', color: '#EE4118', glow: '#FF7A45' },
    { name: 'Apple Berry',       tagline: 'Crisp orchard mischief',      image: '/img/flavours/can-4.webp', color: '#D71F26', glow: '#FF5240' },
    { name: 'Pineapple Passion', tagline: 'Tropical, untamed, bold',     image: '/img/flavours/can-5.webp', color: '#D61E83', glow: '#FF5FAE' },
    { name: 'Lemon Lime',        tagline: 'Sharp, zesty, electric',      image: '/img/flavours/can-3.webp', color: '#5F9E00', glow: '#B0DC1E' },
];
const N = FLAVOURS.length;
const wrapIdx = (i: number) => ((i % N) + N) % N;
const clamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v));
const pad2 = (n: number) => String(n + 1).padStart(2, '0');

export const FlavourSection: React.FC = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const stageRef   = useRef<HTMLDivElement>(null);
    const bloomRef   = useRef<HTMLDivElement>(null);
    const ghostRef   = useRef<HTMLDivElement>(null);
    const nameRef    = useRef<HTMLHeadingElement>(null);
    const taglineRef = useRef<HTMLParagraphElement>(null);
    const indexRef   = useRef<HTMLSpanElement>(null);
    const wrapRefs   = useRef<(HTMLDivElement | null)[]>([]);

    const gsapRef   = useRef<any>(null);
    const splitRef  = useRef<any>(null);     // current SplitText instance on the name
    const posRef    = useRef(0);             // VISUAL carousel position (what layout draws)
    const goalRef   = useRef(0);             // LOGICAL target — updates instantly on each command
    const unitRef   = useRef(170);           // px of horizontal spread per step
    const snapTween = useRef<any>(null);
    const drag      = useRef({ on: false, startX: 0, startPos: 0, lastX: 0, lastT: 0, vel: 0, moved: false });

    const [active, setActive] = useState(0);
    const activeRef = useRef(0);              // mirrors `active` for the redundant-change guard
    const cur = FLAVOURS[active];

    const offsetOf = (i: number, p: number) => {
        let o = i - p;
        while (o >  N / 2) o -= N;
        while (o < -N / 2) o += N;
        return o;
    };

    // Coverflow transform for one can at continuous offset o, with a gentle arc
    // (side cans dip slightly so the centre "lifts" forward).
    const place = useCallback((el: HTMLDivElement, o: number) => {
        const gsap = gsapRef.current;
        if (!gsap) return;
        const a = Math.abs(o);
        gsap.set(el, {
            x: o * unitRef.current,
            y: a * 26,                                   // arc: neighbours sit a touch lower
            z: -a * 300,
            rotationY: clamp(-o * 40, -52, 52),
            scale: Math.max(0.42, 1 - a * 0.26),
            opacity: Math.max(0.12, 1 - a * 0.5),
            zIndex: Math.round(100 - a * 12),
            transformPerspective: 1600,
            transformOrigin: 'center center',
        });
    }, []);

    // parallax — bloom + ghost word drift opposite the carousel for depth.
    // CRITICAL: the ghost is centred by CSS translate(-50%,-50%); a bare
    // gsap x-set REPLACES that transform and drops the horizontal centring
    // (the word then hangs ~270px right of centre as a broken half-word).
    // Setting xPercent/yPercent alongside x keeps the centring in GSAP's own
    // transform model — exactly how the bloom below already does it.
    const layout = useCallback((p: number) => {
        wrapRefs.current.forEach((el, i) => { if (el) place(el, offsetOf(i, p)); });
        const gsap = gsapRef.current;
        if (!gsap) return;
        if (bloomRef.current) gsap.set(bloomRef.current, { xPercent: -50, yPercent: -50, x: -p * 6 });
        if (ghostRef.current) gsap.set(ghostRef.current, { xPercent: -50, yPercent: -50, x: -p * 22 });
    }, [place]);

    // Morph bloom + cross-fade the ghost word + reveal name (SplitText) on change.
    const applyActive = useCallback((idx: number) => {
        if (idx === activeRef.current) return;    // no change → don't re-trigger the reveal
        activeRef.current = idx;
        setActive(idx);
        const gsap = gsapRef.current;
        const f = FLAVOURS[idx];
        if (!gsap) return;
        if (bloomRef.current) gsap.to(bloomRef.current, { backgroundColor: f.glow, duration: 0.7, ease: 'power2.out' });
        if (nameRef.current)    gsap.to(nameRef.current,    { color: f.color, duration: 0.5, ease: 'power2.out' });
        if (taglineRef.current) gsap.to(taglineRef.current, { color: f.color, duration: 0.5, ease: 'power2.out' });

        requestAnimationFrame(() => {
            // ghost word swap (xPercent/yPercent keep the CSS centring intact)
            if (ghostRef.current) {
                gsap.fromTo(ghostRef.current,
                    { opacity: 0, scale: 1.12, xPercent: -50, yPercent: -50 },
                    { opacity: 0.07, scale: 1, xPercent: -50, yPercent: -50, duration: 0.7, ease: 'power2.out' });
            }
            // index counter flip
            if (indexRef.current) {
                gsap.fromTo(indexRef.current, { yPercent: -60, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.45, ease: 'power3.out' });
            }
            // name — SplitText per-char reveal (the real "wow").
            // The text is set IMPERATIVELY (not via React) because SplitText mutates
            // the DOM into char spans; if React also owned the text the two would
            // fight and the name would go stale.
            if (nameRef.current) {
                splitRef.current?.revert?.();
                nameRef.current.textContent = f.name;
                const SplitText = (window as any).SplitText;
                if (SplitText) {
                    const split = SplitText.create(nameRef.current, { type: 'chars' });
                    splitRef.current = split;
                    gsap.from(split.chars, {
                        yPercent: 130, opacity: 0, rotationX: -90, transformOrigin: '50% 100% -20',
                        stagger: 0.028, duration: 0.6, ease: 'back.out(1.7)',
                    });
                } else {
                    gsap.fromTo(nameRef.current, { yPercent: 60, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.5, ease: 'power3.out' });
                }
            }
            if (taglineRef.current) {
                gsap.fromTo(taglineRef.current, { y: 16, opacity: 0 }, { y: 0, opacity: 0.9, duration: 0.5, ease: 'power2.out', delay: 0.05 });
            }
        });
    }, []);

    const animateTo = useCallback((targetPos: number) => {
        const gsap = gsapRef.current;
        const target = Math.round(targetPos);
        goalRef.current = target;                 // commit the logical target IMMEDIATELY
        snapTween.current?.kill();
        if (!gsap) { posRef.current = wrapIdx(target); applyActive(wrapIdx(target)); return; }
        const proxy = { p: posRef.current };
        snapTween.current = gsap.to(proxy, {
            p: target, duration: 1.0, ease: 'elastic.out(0.5, 0.62)',
            // keep posRef on the LIVE visual position every frame so an interrupting
            // click restarts the next tween from where the cans actually are — no
            // jump back to the last completed slot.
            onUpdate: () => { posRef.current = proxy.p; layout(proxy.p); },
            onComplete: () => { posRef.current = wrapIdx(target); goalRef.current = wrapIdx(target); layout(posRef.current); },
        });
        applyActive(wrapIdx(target));
    }, [layout, applyActive]);

    // stepDir / goToIndex compute from the LOGICAL goal (updates instantly) — never
    // the visual posRef, which lags behind during the ~1s snap. This is what makes
    // a second click while the first is still animating actually advance.
    const goToIndex = useCallback((idx: number) => {
        const base = Math.round(goalRef.current);
        let diff = idx - wrapIdx(base);
        if (diff >  N / 2) diff -= N;
        if (diff < -N / 2) diff += N;
        animateTo(base + diff);
    }, [animateTo]);

    const stepDir = useCallback((dir: number) => animateTo(Math.round(goalRef.current) + dir), [animateTo]);

    const inViewRef = useRef(false);          // arrow keys only act while the section is visible

    useEffect(() => {
        let cancelled = false;
        const cleanup: Array<() => void> = [];

        const init = async () => {
            const t0 = performance.now();
            while (!(window as any).gsap || !(window as any).ScrollTrigger) {
                if (cancelled) return;
                if (performance.now() - t0 > 8000) return;
                await new Promise((r) => setTimeout(r, 50));
            }
            if (cancelled) return;
            const gsap = (window as any).gsap;
            gsapRef.current = gsap;

            const computeUnit = () => {
                const w = stageRef.current?.offsetWidth || 1000;
                unitRef.current = clamp(w * 0.205, 130, 270);
            };
            computeUnit();
            const onResize = () => { computeUnit(); layout(posRef.current); };
            window.addEventListener('resize', onResize);
            cleanup.push(() => window.removeEventListener('resize', onResize));

            layout(0);
            if (bloomRef.current) gsap.set(bloomRef.current, { backgroundColor: FLAVOURS[0].glow });
            if (nameRef.current)  gsap.set(nameRef.current,  { color: FLAVOURS[0].color });
            if (ghostRef.current) gsap.set(ghostRef.current, { opacity: 0.07, xPercent: -50, yPercent: -50 });

            const fx = wrapRefs.current.map((el) => el?.querySelector('.hbf-can-fx')).filter(Boolean) as HTMLElement[];
            // The can floats + bloom breathe are repeat:-1 tweens (11 of them) —
            // collect them and pause whenever the section is off screen, so they
            // don't tick for the rest of the page's lifetime after first reveal.
            const idleTweens: any[] = [];
            const tl = gsap.timeline({ scrollTrigger: { trigger: sectionRef.current, start: 'top 72%' } });
            tl.set(stageRef.current, { autoAlpha: 1 });
            tl.from(bloomRef.current, { scale: 0.4, opacity: 0, duration: 1.1, ease: 'power2.out' }, 0);
            tl.from(wrapRefs.current.filter(Boolean), { y: 150, opacity: 0, duration: 1.0, ease: 'power3.out', stagger: 0.05 }, 0.1);
            tl.add(() => {
                fx.forEach((el, i) => {
                    idleTweens.push(
                        gsap.to(el, { y: -13, duration: 2.4 + i * 0.25, ease: 'sine.inOut', yoyo: true, repeat: -1, delay: i * 0.3 }),
                        gsap.to(el, { rotation: 1.3, duration: 3.3 + i * 0.2, ease: 'sine.inOut', yoyo: true, repeat: -1, delay: i * 0.4 }),
                    );
                });
                if (bloomRef.current) idleTweens.push(gsap.to(bloomRef.current, { scale: 1.08, duration: 2.8, ease: 'sine.inOut', yoyo: true, repeat: -1 }));
            }, '>-0.3');
            const idleIo = new IntersectionObserver(([entry]) => {
                const on = entry?.isIntersecting ?? true;
                idleTweens.forEach((a) => (on ? a.play() : a.pause()));
            });
            if (sectionRef.current) idleIo.observe(sectionRef.current);
            cleanup.push(() => { idleIo.disconnect(); idleTweens.forEach((a) => a.kill()); tl.scrollTrigger?.kill(); tl.kill(); });
        };

        init();

        // Track visibility so global arrow keys don't hijack the carousel while
        // the user is elsewhere on the page (e.g. keyboard-scrolling the hero).
        const io = new IntersectionObserver(
            (entries) => { inViewRef.current = entries[0]?.isIntersecting ?? false; },
            { threshold: 0.2 }
        );
        if (sectionRef.current) io.observe(sectionRef.current);

        const onKey = (e: KeyboardEvent) => {
            if (!inViewRef.current) return;
            if (e.key === 'ArrowLeft')  stepDir(-1);
            if (e.key === 'ArrowRight') stepDir(1);
        };
        window.addEventListener('keydown', onKey);

        return () => {
            cancelled = true;
            io.disconnect();
            window.removeEventListener('keydown', onKey);
            snapTween.current?.kill();
            splitRef.current?.revert?.();
            cleanup.forEach((c) => { try { c(); } catch { /* ignore */ } });
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onPointerDown = (e: React.PointerEvent) => {
        if (!gsapRef.current || e.button !== 0) return;
        snapTween.current?.kill();
        drag.current = { on: true, startX: e.clientX, startPos: posRef.current, lastX: e.clientX, lastT: performance.now(), vel: 0, moved: false };
        (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    };
    const onPointerMove = (e: React.PointerEvent) => {
        const d = drag.current;
        if (!d.on) return;
        const dx = d.startX - e.clientX;
        posRef.current = d.startPos + dx / (unitRef.current * 1.5);
        layout(posRef.current);
        const now = performance.now();
        const dt = now - d.lastT;
        if (dt > 0) d.vel = (d.lastX - e.clientX) / dt;
        d.lastX = e.clientX; d.lastT = now;
        if (Math.abs(dx) > 4) d.moved = true;
    };
    const onPointerUp = (e: React.PointerEvent) => {
        const d = drag.current;
        if (!d.on) return;
        d.on = false;
        try { (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId); } catch { /* ignore */ }
        if (!d.moved) {
            const el = document.elementFromPoint(e.clientX, e.clientY);
            const w = el?.closest('.hbf-can-wrap') as HTMLDivElement | null;
            const idx = w ? wrapRefs.current.indexOf(w) : -1;
            if (idx >= 0 && idx !== active) goToIndex(idx);
            return;
        }
        const flick = clamp((d.vel * 1000 / (unitRef.current * 1.5)) * 0.35, -1.4, 1.4);
        animateTo(posRef.current + flick);
    };

    return (
        <section ref={sectionRef} id="flavours-section" className="hbf">
            <div className="hbf-texture" aria-hidden="true" />
            <div ref={ghostRef} className="hbf-ghost" aria-hidden="true">{cur.name}</div>
            <div ref={bloomRef} className="hbf-bloom" aria-hidden="true" />

            <div className="hbf-head">
                <h2 className="hbf-kicker">Five ways to fuel the rebel</h2>
                <h3 className="hbf-title">What&apos;s your flavour?</h3>
            </div>

            <div
                ref={stageRef}
                className="hbf-stage"
                onPointerDown={onPointerDown}
                onPointerMove={onPointerMove}
                onPointerUp={onPointerUp}
                onPointerCancel={onPointerUp}
            >
                {FLAVOURS.map((f, i) => (
                    <div key={i} ref={(el) => { wrapRefs.current[i] = el; }} className="hbf-can-wrap">
                        <div className="hbf-can-fx">
                            <img className="hbf-can" src={f.image} alt={`Hype Bam ${f.name}`} draggable={false} loading={i === 0 ? 'eager' : 'lazy'} decoding="async" />
                        </div>
                    </div>
                ))}

                <button className="hbf-arr is-prev" onPointerDown={(e) => e.stopPropagation()} onClick={() => stepDir(-1)} aria-label="Previous flavour">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
                </button>
                <button className="hbf-arr is-next" onPointerDown={(e) => e.stopPropagation()} onClick={() => stepDir(1)} aria-label="Next flavour">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6" /></svg>
                </button>
            </div>

            <div className="hbf-info">
                <p ref={taglineRef} className="hbf-tagline">{cur.tagline}</p>
                {/* name text is owned imperatively (SplitText) — render the initial
                    flavour as a constant so React never fights the char spans */}
                <h3 ref={nameRef} className="hbf-name">{FLAVOURS[0].name}</h3>

                <div className="hbf-controls">
                    <button className="hbf-arr is-flat is-prev" onClick={() => stepDir(-1)} aria-label="Previous flavour">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
                    </button>
                    <span className="hbf-counter"><span ref={indexRef} className="hbf-counter-cur">{pad2(active)}</span><span className="hbf-counter-tot"> / {pad2(N - 1)}</span></span>
                    <button className="hbf-arr is-flat is-next" onClick={() => stepDir(1)} aria-label="Next flavour">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6" /></svg>
                    </button>
                </div>

                <Button href="#">Buy now</Button>

                <div className="hbf-dots">
                    {FLAVOURS.map((f, i) => (
                        <button key={i} className={`hbf-dot ${i === active ? 'on' : ''}`} style={i === active ? { background: f.color } : undefined} onClick={() => goToIndex(i)} aria-label={`Show ${f.name}`} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FlavourSection;
