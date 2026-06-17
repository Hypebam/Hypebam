"use client";

import React, { useEffect, useRef } from 'react';

const statementCards = [
    {
        position: 'is-first',
        title: <>Energy that<br />hits just right</>,
        iconSrc: '/img/cdn/689bbc7e54e7ae27ef30fe2a_Layer_1_7.svg',
        iconClass: 'first-statement-icon',
        iconImgClass: 'first-statement-icon-img',
        text: <>
            <span className="sequence-text-target is-caffeine">80mg of caffeine<img
                src="/img/cdn/689bbc7e54e7ae27ef30fe2a_Layer_1_7.svg"
                loading="lazy"
                alt=""
                aria-hidden="true"
                className="sequence-text-target-icon is-caffeine"
            /></span>{' '}
            - feels like a cup of coffee,<br />blended with taurine &amp; ashwagandha for<br />smooth focus and calm energy.
        </>,
        isLeft: false
    },
    {
        position: 'is-second',
        title: <>Hydration,<br />done right</>,
        iconSrc: '/img/cdn/689c4dc54e2bba0f8a77b238_Layer_1_9.svg',
        iconClass: 'second-icon',
        iconImgClass: 'second-icon-img',
        text: <>200mg of electrolytes to help you<br />stay balanced, refreshed,<br />and moving.</>,
        isLeft: true
    },
    {
        position: 'is-third',
        title: <>Sweetness,<br />kept light</>,
        iconSrc: '/img/cdn/689c4ee13616a5bb6e89d831_Vector_6.svg',
        iconClass: 'third-statement-icon',
        iconImgClass: 'third-statement-icon-img',
        text: <>
            Just{' '}
            <span className="sequence-text-target is-sugar">5g<img
                src="/img/cdn/689c4ee13616a5bb6e89d831_Vector_6.svg"
                loading="lazy"
                alt=""
                aria-hidden="true"
                className="sequence-text-target-icon is-sugar"
            /></span>{' '}
            of sugar per serving -<br />clean energy, no guilt attached.
        </>,
        isLeft: false
    },
    {
        position: 'is-fourth',
        title: <>Sri Lankanized</>,
        iconSrc: '/img/cdn/689c4f47af9547f0f5223089_Vector_7.svg',
        iconClass: 'fourth-statement-icon',
        iconImgClass: 'fourth-statement-icon-img',
        text: <>
            <span className="sequence-text-target is-flavours">5<img
                src="/img/cdn/689c4f47af9547f0f5223089_Vector_7.svg"
                loading="lazy"
                alt=""
                aria-hidden="true"
                className="sequence-text-target-icon is-flavours"
            /></span>{' '}
            Flavours to make you go 'aaaahhh'
        </>,
        isLeft: true
    }
];

// Each visible bolt = your EXACT lightning art, masked by a stroke drawn along
// the bolt's TRUE centreline — extracted by rasterising the artwork, dilating it
// to a solid bolt, skeletonising it (Zhang–Suen thinning) and tracing the
// longest path, so the line follows every zigzag (not a smoothed diagonal).
// strokeWidth is the minimum that fully covers the bolt + its forks: verified
// 0% clipped, so the reveal is pixel-identical to your SVG and runs tip-to-tip
// exactly along the lightning path.
const BOLTS = [
    { cls: 'is-first',  mask: 'bolt-mask-1', img: '/img/Lines/lightning 1.svg', w: 170,
      path: 'M 183 103 L 195 138 L 225 153 L 270 190 L 293 223 L 325 238 L 343 265 L 455 328 L 483 358 L 485 390 L 520 433 L 538 438 L 640 435 L 663 445 L 748 453 L 758 465 L 765 508 L 825 608 L 828 628 L 825 645 L 815 655 L 815 683 L 828 710 L 830 733 L 850 770 L 923 835 L 945 843 L 958 833 L 988 838 L 1098 883' },
    { cls: 'is-second', mask: 'bolt-mask-2', img: '/img/Lines/lightning 2.svg', w: 200,
      path: 'M 1098 163 L 1033 263 L 1025 293 L 1030 303 L 1020 325 L 945 378 L 908 390 L 830 395 L 803 368 L 773 373 L 665 413 L 610 418 L 603 425 L 588 498 L 570 525 L 548 635 L 495 663 L 460 663 L 435 678 L 340 783 L 318 790 L 290 823 L 265 828 L 243 853 L 225 860 L 195 895 L 150 908' },
    { cls: 'is-third',  mask: 'bolt-mask-3', img: '/img/Lines/lightning 3.svg', w: 130,
      path: 'M 140 95 L 278 145 L 303 148 L 308 138 L 343 143 L 360 160 L 375 188 L 430 365 L 460 400 L 478 438 L 483 468 L 525 530 L 528 565 L 523 583 L 530 593 L 550 595 L 565 605 L 648 603 L 665 613 L 773 605 L 808 610 L 813 625 L 853 670 L 853 703 L 875 730 L 1015 808 L 1035 840 L 1068 855 L 1085 888 L 1128 915 L 1143 933 L 1175 950 L 1200 1000' },
] as const;

export const SequenceSection: React.FC = () => {
    const mobileTitleRef = useRef<HTMLHeadingElement>(null);

    // Mobile finale title reveal. Every event-based approach (CSS
    // `animation-timeline: view()`, IntersectionObserver one-shot, then a
    // scroll-event scrub) was fine in desktop Chromium but failed on the user's
    // phone — because on touch devices Lenis falls back to native scroll and
    // iOS Safari does NOT fire `scroll` events continuously during momentum, so
    // an event-driven scrub never ticks mid-swipe.
    //
    // Bulletproof fix: a requestAnimationFrame LOOP that re-reads the title's
    // viewport position every frame and maps it to opacity + slide. It depends
    // on nothing but rAF (universal) — no scroll events, no Lenis hook, no
    // view-timeline support. An IntersectionObserver only starts/stops the loop
    // so it costs nothing when the section is far away. CSS default keeps the
    // title fully visible if JS never runs (never stuck blank).
    useEffect(() => {
        const el = mobileTitleRef.current;
        if (!el) return;
        const section: Element = el.closest('.sequence-section') ?? el;
        let running = false;
        let raf = 0;

        const tick = () => {
            if (!running) return;
            if (el.offsetParent !== null) { // skip while hidden (desktop layout)
                const r = el.getBoundingClientRect();
                const vh = window.innerHeight || 1;
                // 0 as the title first appears low on screen → 1 once it rises to ~mid.
                const start = vh * 0.9, end = vh * 0.45;
                const prog = Math.max(0, Math.min(1, (start - r.top) / (start - end)));
                el.style.opacity = String(prog);
                el.style.transform = `translateY(${(1 - prog) * 1.8}rem)`;
            }
            raf = requestAnimationFrame(tick);
        };

        const io = new IntersectionObserver(
            (entries) => {
                const near = entries[0]?.isIntersecting ?? false;
                if (near && !running) {
                    running = true;
                    raf = requestAnimationFrame(tick);
                } else if (!near && running) {
                    running = false;
                    if (raf) cancelAnimationFrame(raf);
                }
            },
            { rootMargin: '300px 0px 300px 0px' }
        );
        io.observe(section);

        return () => {
            running = false;
            if (raf) cancelAnimationFrame(raf);
            io.disconnect();
        };
    }, []);

    return (
        <div id="nutrition" data-sequence="" className="sequence-section">
            <div className="sequence-signature">
                <div className="sequence-signature-text">
                    {/* Brand brush-font label (was an SVG of handwritten text). */}
                    <span className="sequence-signature-text-el">Why people<br />love it</span>
                </div>
                <div className="sequence-signature-arrow">
                    <img src="/img/cdn/68b9b2bfdc8daf0458376a72_sequence-why-people-arrow.svg" loading="lazy" width="150" height="150" alt="sequence-why-people-arrow" className="sequence-signature-arrow-img" />
                    <img src="/img/cdn/68b9b2bfdc8daf0458376a72_sequence-why-people-arrow.svg" loading="lazy" width="150" height="150" alt="sequence-why-people-arrow" className="sequence-signature-arrow-img is-wiggle" />
                </div>
            </div>
            <div data-sequence-trigger="" className="sequence-scroll-wrap">
                <div data-sequence-stage="" className="sequence-sticky">
                    <canvas data-sequence-canvas-img-path="/img/" data-sequence-canvas="" className="sequence-canvas"></canvas>
                    <div data-typography-target="sequence-cards-text-field" className="sequence-cards">
                        {statementCards.map((card, index) => (
                            <div
                                key={index}
                                data-sequence-card-left={card.isLeft ? "" : undefined}
                                data-sequence-card=""
                                className={`statement-card ${card.position}`}
                            >
                                <div className={`statement-card-wrapper ${card.isLeft ? 'left' : ''}`}>
                                    <div
                                        data-sequence-smiley-left={card.isLeft ? "" : undefined}
                                        data-sequence-smiley=""
                                        className="top-smiley is-card"
                                    >
                                        <img src="/img/original-flavor-icon.png" loading="lazy" alt="Original flavor icon" />
                                    </div>
                                    <h2 className="statement-heading">{card.title}</h2>
                                    <div className="statement-card-paragraph-wrap">
                                        <div className={card.iconClass}>
                                            <img src={card.iconSrc} loading="lazy" alt="Icon" className={card.iconImgClass} />
                                            <img src={card.iconSrc} loading="lazy" alt="Icon" className={`${card.iconImgClass} is-wiggle`} />
                                        </div>
                                        <p className="paragraph center-align">{card.text}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="sequence-final">
                        <h2 data-sequence-title="" className="sequence-title">
                            Fuel The Rebel<br /><span data-sequence-title-split="" className="light-green-span">Let's Get Bam'ed</span><br />
                        </h2>
                    </div>

                    <div className="sequence-lines">
                        {/* HIDDEN RIG (opacity:0 in globals): app.js's sequence init queries
                            [data-sequence-svg] path and breaks the canvas if none exist, so
                            keep these stroked originals purely to satisfy it. */}
                        <svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 2000 691" fill="none" data-sequence-svg="" aria-hidden="true" className="sequence-line-rig">
                            <path d="M205.05 580.27 L405.14 634.84 L389.98 569.66 L706.78 634.84 L74.69 110.38 L677.98 174.04 L432.42 201.33 L1267.62 468.11 L955.37 319.56 L1825.43 -10.5" stroke="currentColor" strokeWidth="36" fill="none"></path>
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 2000 682" fill="none" data-sequence-svg="" aria-hidden="true" className="sequence-line-rig">
                            <path d="M1713.26 -51.26 L1247.92 286.76 L1480.59 217.03 L1232.76 382.25 L1651.12 605.07 L976.59 650.55 L1134.23 588.4 L280.84 51.81 L417.26 192.78 L91.37 83.64" stroke="currentColor" strokeWidth="36" fill="none"></path>
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 2000 750" fill="none" data-sequence-svg="" aria-hidden="true" className="sequence-line-rig">
                            <path d="M2650.41 661.58l-434.27-85.16 43.2 42.58-584.34-210.83 138.69-31.83h-250.11l-532.04 213.73-497.94 50.77 154.61-187.19-216 109.14L924.69 85.3l-497.94 50.02 163.71 75.03c-385.77 13.64-771.54 27.28-1157.31 40.93l109.14-45.47-241.01-95.49 90.95 11.37-129.6-210.11" stroke="currentColor" strokeWidth="36" fill="none"></path>
                        </svg>
                        {/* VISIBLE bolts = YOUR lightning art (img/Lines/lightning N.svg),
                            revealed by an SVG mask whose stroke is DRAWN along the bolt's own
                            centreline (data-bolt-reveal, animated by useAnimations →
                            stroke-dashoffset). So the exact artwork appears tip-to-tip along
                            the lightning path. Recolour + glow + placement in globals.css. */}
                        {BOLTS.map((b) => (
                            <svg key={b.cls} viewBox="0 0 1280 1024" data-lightning="" aria-hidden="true"
                                className={`sequence-line-svg ${b.cls}`}>
                                <defs>
                                    <mask id={b.mask} maskUnits="userSpaceOnUse">
                                        <path data-bolt-reveal="" d={b.path} stroke="#fff" strokeWidth={b.w}
                                            fill="none" strokeLinecap="round" strokeLinejoin="round"
                                            pathLength={1} style={{ strokeDasharray: 1, strokeDashoffset: 1 }} />
                                    </mask>
                                </defs>
                                <image href={b.img} width={1280} height={1024} mask={`url(#${b.mask})`} />
                            </svg>
                        ))}
                    </div>
                </div>

                {/* ─── MOBILE-ONLY BLOCKS (≤991px) ─────────────────────────────
                   SIBLINGS of .sequence-sticky (direct children of
                   .sequence-scroll-wrap), EXACTLY matching the original Webflow DOM.
                   This is what gives the mobile scroll a long runway:
                   scroll-wrap(height:auto) = sticky(100lvh) + cards-mobile(~360lvh)
                   + final-mobile(100lvh) ≈ 560lvh, so the canvas frame-scrub spans a
                   long scroll = controlled speed (not "too fast"). webflow.css's
                   margin-top:-100lvh overlaps the cards onto the pinned canvas.
                   display:none on desktop. DO NOT nest these inside .sequence-sticky
                   — that collapses the runway (its height is a fixed 100lvh). */}
                <div data-typography-target="sequence-cards-text-field" className="sequence-cards-mobile">
                    {statementCards.map((card, index) => (
                        <div
                            key={`m-${index}`}
                            className={`statement-card ${card.position}`}
                            data-sequence-mobile-card=""
                        >
                            <div className={`statement-card-wrapper ${card.isLeft ? 'left' : ''}`}>
                                <div className="top-smiley is-card">
                                    <img src="/img/original-flavor-icon.png" loading="lazy" alt="" />
                                </div>
                                <h2 className="statement-heading">{card.title}</h2>
                                <div className="statement-card-paragraph-wrap">
                                    <div className={card.iconClass}>
                                        <img src={card.iconSrc} loading="lazy" alt="" className={card.iconImgClass} />
                                        <img src={card.iconSrc} loading="lazy" alt="" className={`${card.iconImgClass} is-wiggle`} />
                                    </div>
                                    <p className="paragraph center-align">{card.text}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="sequence-final-mobile">
                    <h2 ref={mobileTitleRef} className="sequence-title">
                        Fuel The Rebel<br /><span className="light-green-span">Let&apos;s Get Bam&apos;ed</span><br />
                    </h2>
                    </div>
            </div>
        </div>
    );
};

export default SequenceSection;
