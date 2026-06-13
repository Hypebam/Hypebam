"use client";

import React from 'react';

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

export const SequenceSection: React.FC = () => {
    return (
        <div id="nutrition" data-sequence="" className="sequence-section">
            <div className="sequence-signature">
                <div className="sequence-signature-text">
                    <img src="/img/cdn/68b9b2bf0b05111fd229e95c_sequence-why-people-love-it.svg" loading="lazy" width="300" height="104" alt="sequence-why-people-love-it" className="sequence-signature-text-img" />
                    <img src="/img/cdn/68b9b2bf0b05111fd229e95c_sequence-why-people-love-it.svg" loading="lazy" width="300" height="104" alt="sequence-why-people-love-it" className="sequence-signature-text-img is-wiggle" />
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
                        {/* HIDDEN RIG (opacity:0): app.js's sequence init queries
                            [data-sequence-svg] path and throws (killing the canvas/can) if
                            none exist. Keep the original stroked paths purely to satisfy it —
                            they're invisible. The VISIBLE bolts are the lightning <img>s below. */}
                        <svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 2000 691" fill="none" data-sequence-svg="" aria-hidden="true" className="sequence-line-rig">
                            <path d="M205.05 580.27 L405.14 634.84 L389.98 569.66 L706.78 634.84 L74.69 110.38 L677.98 174.04 L432.42 201.33 L1267.62 468.11 L955.37 319.56 L1825.43 -10.5" stroke="currentColor" strokeWidth="36" fill="none"></path>
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 2000 682" fill="none" data-sequence-svg="" aria-hidden="true" className="sequence-line-rig">
                            <path d="M1713.26 -51.26 L1247.92 286.76 L1480.59 217.03 L1232.76 382.25 L1651.12 605.07 L976.59 650.55 L1134.23 588.4 L280.84 51.81 L417.26 192.78 L91.37 83.64" stroke="currentColor" strokeWidth="36" fill="none"></path>
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 2000 750" fill="none" data-sequence-svg="" aria-hidden="true" className="sequence-line-rig">
                            <path d="M2650.41 661.58l-434.27-85.16 43.2 42.58-584.34-210.83 138.69-31.83h-250.11l-532.04 213.73-497.94 50.77 154.61-187.19-216 109.14L924.69 85.3l-497.94 50.02 163.71 75.03c-385.77 13.64-771.54 27.28-1157.31 40.93l109.14-45.47-241.01-95.49 90.95 11.37-129.6-210.11" stroke="currentColor" strokeWidth="36" fill="none"></path>
                        </svg>
                        {/* VISIBLE lightning: your filled SVG art, untouched, as <img>. Same
                            is-first/second/third slots (size/rotation/placement). Recolored +
                            made to STRIKE & flicker by useAnimations.ts (initSequenceLightning). */}
                        <img src="/img/Lines/lightning%201.svg" alt="" aria-hidden="true" loading="lazy" data-lightning="" className="sequence-line-svg is-first" />
                        <img src="/img/Lines/lightning%202.svg" alt="" aria-hidden="true" loading="lazy" data-lightning="" className="sequence-line-svg is-second" />
                        <img src="/img/Lines/lightning%203.svg" alt="" aria-hidden="true" loading="lazy" data-lightning="" className="sequence-line-svg is-third" />
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
                    <h2 className="sequence-title">
                        Fuel The Rebel<br /><span className="light-green-span">Let&apos;s Get Bam&apos;ed</span><br />
                    </h2>
                    </div>
            </div>
        </div>
    );
};

export default SequenceSection;
