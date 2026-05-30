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
                        <div style={{ '--animation-delay': '.05s' } as React.CSSProperties} data-sequence-final-signature="" className="sequence-final-signature">
                            <img src="/img/cdn/68bb4a56d6965dfedaaf9bbb_sequence-vanilla-crumble.svg" loading="lazy" width="285" height="150" alt="sequence-vanilla-crumble" className="sequence-final-signature-img" />
                            <img src="/img/cdn/68bb4a56d6965dfedaaf9bbb_sequence-vanilla-crumble.svg" loading="lazy" width="285" height="150" alt="sequence-vanilla-crumble" className="sequence-final-signature-img is-wiggle" />
                        </div>
                        <div data-sequence-final-signature="" className="sequence-final-signature is-first-arrow">
                            <img src="/img/cdn/68bb4d0addb7dabb6793ee05_sequence-vanilla-crumble-arrow.svg" loading="lazy" width="300" height="92" alt="sequence-vanilla-crumble-arrow" className="sequence-final-signature-img" />
                            <img src="/img/cdn/68bb4d0addb7dabb6793ee05_sequence-vanilla-crumble-arrow.svg" loading="lazy" width="300" height="92" alt="sequence-vanilla-crumble-arrow" className="sequence-final-signature-img is-wiggle" />
                        </div>
                        <div style={{ '--animation-delay': '.075s' } as React.CSSProperties} data-sequence-final-signature="" className="sequence-final-signature is-second">
                            <img src="/img/cdn/68bb4ef605d3c803020c0a8c_sequence-strawberry-cheesecake.svg" loading="lazy" width="300" height="125" alt="sequence-strawberry-cheesecake" className="sequence-final-signature-img" />
                            <img src="/img/cdn/68bb4ef605d3c803020c0a8c_sequence-strawberry-cheesecake.svg" loading="lazy" width="300" height="125" alt="sequence-strawberry-cheesecake" className="sequence-final-signature-img is-wiggle" />
                        </div>
                        <div style={{ '--animation-delay': '.025s' } as React.CSSProperties} data-sequence-final-signature="" className="sequence-final-signature is-second-arrow">
                            <img src="/img/cdn/68bb51400be6f0687f9cb522_sequence-strawberry-cheesecake-arrow.svg" loading="lazy" width="153" height="150" alt="sequence-strawberry-cheesecake-arrow" className="sequence-final-signature-img" />
                            <img src="/img/cdn/68bb51400be6f0687f9cb522_sequence-strawberry-cheesecake-arrow.svg" loading="lazy" width="153" height="150" alt="sequence-strawberry-cheesecake-arrow" className="sequence-final-signature-img is-wiggle" />
                        </div>
                        <img src="/img/cdn/68bb559a04860444181393aa_sequence-cookie.webp" loading="lazy" width="340" height="344" alt="sequence-cookie" data-sequence-cookie-first="" className="sequence-final-cookie" />
                        <img src="/img/cdn/68bb559a04860444181393aa_sequence-cookie.webp" loading="lazy" width="340" height="344" alt="sequence-cookie" data-sequence-cookie-second="" className="sequence-final-cookie is-second" />
                        <img src="/img/cdn/68bb559a1333de45c53ee927_sequence-strawberry.webp" loading="lazy" width="594" height="594" alt="sequence-strawberry" data-sequence-strawberry-first="" className="sequence-final-strawberry" />
                        <img src="/img/cdn/68bb559a1333de45c53ee927_sequence-strawberry.webp" loading="lazy" width="594" height="594" alt="sequence-strawberry" data-sequence-strawberry-second="" className="sequence-final-strawberry is-second" />
                    </div>

                    <div className="sequence-lines">
                        {/* Lightning "story": three bolts share ONE coordinate space and are
                            CHAINED — bolt 1 strikes right->left and ends at (1500,400); bolt 2
                            starts exactly there and ends at (1030,460); bolt 3 starts there and
                            runs to the far left. app.js draws them one-at-a-time, each travelling
                            from its start into its end (= the next bolt's start), so it reads as a
                            single lightning propagating across the screen. CSS (globals) forces all
                            three into the same box (no per-bolt rotation) so the endpoints meet. */}
                        <svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 2000 700" fill="none" data-sequence-svg="" style={{ overflow: 'visible' }} className="sequence-line-svg is-first">
                            <path d="M1950 140 L1790 300 L1870 330 L1610 440 L1690 470 L1500 400" stroke="currentColor" strokeWidth="16" strokeLinecap="round" strokeLinejoin="round" fill="none"></path>
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 2000 700" fill="none" data-sequence-svg="" style={{ overflow: 'visible' }} className="sequence-line-svg is-second">
                            <path d="M1500 400 L1340 250 L1270 360 L1110 290 L1180 420 L1030 460" stroke="currentColor" strokeWidth="16" strokeLinecap="round" strokeLinejoin="round" fill="none"></path>
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 2000 700" fill="none" data-sequence-svg="" style={{ overflow: 'visible' }} className="sequence-line-svg is-third">
                            <path d="M1030 460 L880 310 L820 430 L600 330 L470 470 L300 380 L120 440" stroke="currentColor" strokeWidth="16" strokeLinecap="round" strokeLinejoin="round" fill="none"></path>
                        </svg>
                        <div data-sequence-signature="" className="sequence-inner-signature">
                            <img src="/img/cdn/68b9fcc383366c0bb0fe9ca6_sequence-more-for-coffee-lovers.svg" loading="lazy" width="300" height="132" alt="sequence-more-for-coffee-lovers" className="sequence-inner-signature-img" />
                            <img src="/img/cdn/68b9fcc383366c0bb0fe9ca6_sequence-more-for-coffee-lovers.svg" loading="lazy" width="300" height="132" alt="sequence-more-for-coffee-lovers" className="sequence-inner-signature-img is-wiggle" />
                        </div>
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
                    <div style={{ '--animation-delay': '.05s' } as React.CSSProperties} className="sequence-final-signature">
                        <img src="/img/cdn/68bb4a56d6965dfedaaf9bbb_sequence-vanilla-crumble.svg" loading="lazy" width="285" height="150" alt="" className="sequence-final-signature-img" />
                        <img src="/img/cdn/68bb4a56d6965dfedaaf9bbb_sequence-vanilla-crumble.svg" loading="lazy" width="285" height="150" alt="" className="sequence-final-signature-img is-wiggle" />
                    </div>
                    <div className="sequence-final-signature is-first-arrow">
                        <img src="/img/cdn/68bb4d0addb7dabb6793ee05_sequence-vanilla-crumble-arrow.svg" loading="lazy" width="300" height="92" alt="" className="sequence-final-signature-img" />
                        <img src="/img/cdn/68bb4d0addb7dabb6793ee05_sequence-vanilla-crumble-arrow.svg" loading="lazy" width="300" height="92" alt="" className="sequence-final-signature-img is-wiggle" />
                    </div>
                    <div style={{ '--animation-delay': '.075s' } as React.CSSProperties} className="sequence-final-signature is-second">
                        <img src="/img/cdn/68bb4ef605d3c803020c0a8c_sequence-strawberry-cheesecake.svg" loading="lazy" width="300" height="125" alt="" className="sequence-final-signature-img" />
                        <img src="/img/cdn/68bb4ef605d3c803020c0a8c_sequence-strawberry-cheesecake.svg" loading="lazy" width="300" height="125" alt="" className="sequence-final-signature-img is-wiggle" />
                    </div>
                    <div style={{ '--animation-delay': '.025s' } as React.CSSProperties} className="sequence-final-signature is-second-arrow">
                        <img src="/img/cdn/68bb51400be6f0687f9cb522_sequence-strawberry-cheesecake-arrow.svg" loading="lazy" width="153" height="150" alt="" className="sequence-final-signature-img" />
                        <img src="/img/cdn/68bb51400be6f0687f9cb522_sequence-strawberry-cheesecake-arrow.svg" loading="lazy" width="153" height="150" alt="" className="sequence-final-signature-img is-wiggle" />
                    </div>
                    </div>
            </div>
        </div>
    );
};

export default SequenceSection;
