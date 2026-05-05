"use client";

import React from 'react';

const statementCards = [
    {
        position: 'is-first',
        title: <>Energy that<br />hits just right</>,
        iconSrc: 'https://cdn.prod.website-files.com/686c09a33211842a0ac0183d/689bbc7e54e7ae27ef30fe2a_Layer_1%20(7).svg',
        iconClass: 'first-statement-icon',
        iconImgClass: 'first-statement-icon-img',
        text: <>
            <span className="sequence-text-target is-caffeine">80mg of caffeine<img
                src="https://cdn.prod.website-files.com/686c09a33211842a0ac0183d/689bbc7e54e7ae27ef30fe2a_Layer_1%20(7).svg"
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
        iconSrc: 'https://cdn.prod.website-files.com/686c09a33211842a0ac0183d/689c4dc54e2bba0f8a77b238_Layer_1%20(9).svg',
        iconClass: 'second-icon',
        iconImgClass: 'second-icon-img',
        text: <>200mg of electrolytes to help you<br />stay balanced, refreshed,<br />and moving.</>,
        isLeft: true
    },
    {
        position: 'is-third',
        title: <>Sweetness,<br />kept light</>,
        iconSrc: 'https://cdn.prod.website-files.com/686c09a33211842a0ac0183d/689c4ee13616a5bb6e89d831_Vector%20(6).svg',
        iconClass: 'third-statement-icon',
        iconImgClass: 'third-statement-icon-img',
        text: <>
            Just{' '}
            <span className="sequence-text-target is-sugar">5g<img
                src="https://cdn.prod.website-files.com/686c09a33211842a0ac0183d/689c4ee13616a5bb6e89d831_Vector%20(6).svg"
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
        iconSrc: 'https://cdn.prod.website-files.com/686c09a33211842a0ac0183d/689c4f47af9547f0f5223089_Vector%20(7).svg',
        iconClass: 'fourth-statement-icon',
        iconImgClass: 'fourth-statement-icon-img',
        text: <>
            <span className="sequence-text-target is-flavours">5<img
                src="https://cdn.prod.website-files.com/686c09a33211842a0ac0183d/689c4f47af9547f0f5223089_Vector%20(7).svg"
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
                    <img src="https://cdn.prod.website-files.com/686c09a33211842a0ac0183d/68b9b2bf0b05111fd229e95c_sequence-why-people-love-it.svg" loading="lazy" width="300" height="104" alt="sequence-why-people-love-it" className="sequence-signature-text-img" />
                    <img src="https://cdn.prod.website-files.com/686c09a33211842a0ac0183d/68b9b2bf0b05111fd229e95c_sequence-why-people-love-it.svg" loading="lazy" width="300" height="104" alt="sequence-why-people-love-it" className="sequence-signature-text-img is-wiggle" />
                </div>
                <div className="sequence-signature-arrow">
                    <img src="https://cdn.prod.website-files.com/686c09a33211842a0ac0183d/68b9b2bfdc8daf0458376a72_sequence-why-people-arrow.svg" loading="lazy" width="150" height="150" alt="sequence-why-people-arrow" className="sequence-signature-arrow-img" />
                    <img src="https://cdn.prod.website-files.com/686c09a33211842a0ac0183d/68b9b2bfdc8daf0458376a72_sequence-why-people-arrow.svg" loading="lazy" width="150" height="150" alt="sequence-why-people-arrow" className="sequence-signature-arrow-img is-wiggle" />
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

                    {/* app.js expects this element to exist — without it GSAP crashes */}
                    <div className="sequence-cards-mobile"></div>

                    <div className="sequence-final">
                        <h2 data-sequence-title="" className="sequence-title">
                            Fuel The Rebel<br /><span data-sequence-title-split="" className="light-green-span">Let's Get Bam'ed</span><br />
                        </h2>
                        <div style={{ '--animation-delay': '.05s' } as React.CSSProperties} data-sequence-final-signature="" className="sequence-final-signature">
                            <img src="https://cdn.prod.website-files.com/686c09a33211842a0ac0183d/68bb4a56d6965dfedaaf9bbb_sequence-vanilla-crumble.svg" loading="lazy" width="285" height="150" alt="sequence-vanilla-crumble" className="sequence-final-signature-img" />
                            <img src="https://cdn.prod.website-files.com/686c09a33211842a0ac0183d/68bb4a56d6965dfedaaf9bbb_sequence-vanilla-crumble.svg" loading="lazy" width="285" height="150" alt="sequence-vanilla-crumble" className="sequence-final-signature-img is-wiggle" />
                        </div>
                        <div data-sequence-final-signature="" className="sequence-final-signature is-first-arrow">
                            <img src="https://cdn.prod.website-files.com/686c09a33211842a0ac0183d/68bb4d0addb7dabb6793ee05_sequence-vanilla-crumble-arrow.svg" loading="lazy" width="300" height="92" alt="sequence-vanilla-crumble-arrow" className="sequence-final-signature-img" />
                            <img src="https://cdn.prod.website-files.com/686c09a33211842a0ac0183d/68bb4d0addb7dabb6793ee05_sequence-vanilla-crumble-arrow.svg" loading="lazy" width="300" height="92" alt="sequence-vanilla-crumble-arrow" className="sequence-final-signature-img is-wiggle" />
                        </div>
                        <div style={{ '--animation-delay': '.075s' } as React.CSSProperties} data-sequence-final-signature="" className="sequence-final-signature is-second">
                            <img src="https://cdn.prod.website-files.com/686c09a33211842a0ac0183d/68bb4ef605d3c803020c0a8c_sequence-strawberry-cheesecake.svg" loading="lazy" width="300" height="125" alt="sequence-strawberry-cheesecake" className="sequence-final-signature-img" />
                            <img src="https://cdn.prod.website-files.com/686c09a33211842a0ac0183d/68bb4ef605d3c803020c0a8c_sequence-strawberry-cheesecake.svg" loading="lazy" width="300" height="125" alt="sequence-strawberry-cheesecake" className="sequence-final-signature-img is-wiggle" />
                        </div>
                        <div style={{ '--animation-delay': '.025s' } as React.CSSProperties} data-sequence-final-signature="" className="sequence-final-signature is-second-arrow">
                            <img src="https://cdn.prod.website-files.com/686c09a33211842a0ac0183d/68bb51400be6f0687f9cb522_sequence-strawberry-cheesecake-arrow.svg" loading="lazy" width="153" height="150" alt="sequence-strawberry-cheesecake-arrow" className="sequence-final-signature-img" />
                            <img src="https://cdn.prod.website-files.com/686c09a33211842a0ac0183d/68bb51400be6f0687f9cb522_sequence-strawberry-cheesecake-arrow.svg" loading="lazy" width="153" height="150" alt="sequence-strawberry-cheesecake-arrow" className="sequence-final-signature-img is-wiggle" />
                        </div>
                        <img src="https://cdn.prod.website-files.com/686c09a33211842a0ac0183d/68bb559a04860444181393aa_sequence-cookie.webp" loading="lazy" width="340" height="344" alt="sequence-cookie" data-sequence-cookie-first="" className="sequence-final-cookie" />
                        <img src="https://cdn.prod.website-files.com/686c09a33211842a0ac0183d/68bb559a04860444181393aa_sequence-cookie.webp" loading="lazy" width="340" height="344" alt="sequence-cookie" data-sequence-cookie-second="" className="sequence-final-cookie is-second" />
                        <img src="https://cdn.prod.website-files.com/686c09a33211842a0ac0183d/68bb559a1333de45c53ee927_sequence-strawberry.webp" loading="lazy" width="594" height="594" alt="sequence-strawberry" data-sequence-strawberry-first="" className="sequence-final-strawberry" />
                        <img src="https://cdn.prod.website-files.com/686c09a33211842a0ac0183d/68bb559a1333de45c53ee927_sequence-strawberry.webp" loading="lazy" width="594" height="594" alt="sequence-strawberry" data-sequence-strawberry-second="" className="sequence-final-strawberry is-second" />
                    </div>

                    <div className="sequence-lines">
                        <svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 1440 691" fill="none" data-sequence-svg="" style={{ overflow: 'visible' }} className="sequence-line-svg is-first">
                            <path d="M-11 627.781C31.2318 652.606 151.814 698.642 199.05 645.884C264.5 572.781 199.05 472.107 47.547 363.054C-103.956 254 -52.529 150.083 24.5115 108.595C210.583 8.39218 434.763 502.251 720.049 329.362C981.436 170.957 1134 -69.7188 1490 2.78121" stroke="currentColor" strokeWidth="40"></path>
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 1440 682" fill="none" data-sequence-svg="" style={{ overflow: 'visible' }} className="sequence-line-svg is-second">
                            <path d="M1442.05 19.9995C1346.05 34.4995 1170.99 110.452 1098.05 191.999C975.047 329.499 1257.15 515.709 1159 626.498C1027 775.498 571.87 408.445 484.498 347.293C244.047 178.999 15 -12.5016 -102 87.9984" stroke="currentColor" strokeWidth="40"></path>
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 1440 750" fill="none" data-sequence-svg="" style={{ overflow: 'visible' }} className="sequence-line-svg is-third">
                            <path d="M-918.224 5.00043C-948.225 142 -730.728 264 -473.726 252.501C-271.374 243.446 29.7721 170.716 170.275 135.501C1143.77 -108.499 460.741 462.659 570.773 634.5C651.773 761 1056.77 396 1392.27 396C1513.27 396 1835.87 454.857 2022.77 607.501C2178.27 734.5 2312.44 743.001 2363.77 718.001" stroke="currentColor" strokeWidth="40"></path>
                        </svg>
                        <div data-sequence-signature="" className="sequence-inner-signature">
                            <img src="https://cdn.prod.website-files.com/686c09a33211842a0ac0183d/68b9fcc383366c0bb0fe9ca6_sequence-more-for-coffee-lovers.svg" loading="lazy" width="300" height="132" alt="sequence-more-for-coffee-lovers" className="sequence-inner-signature-img" />
                            <img src="https://cdn.prod.website-files.com/686c09a33211842a0ac0183d/68b9fcc383366c0bb0fe9ca6_sequence-more-for-coffee-lovers.svg" loading="lazy" width="300" height="132" alt="sequence-more-for-coffee-lovers" className="sequence-inner-signature-img is-wiggle" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SequenceSection;
