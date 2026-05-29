"use client";

import React from 'react';

const benefits = [
    'Coffee-level caffeine (80mg)',
    'Lower sugar content',
    'Added electrolytes',
    'Hydration support',
    'Functional ingredients',
    'Smooth, everyday energy',
    'Multiple fruity flavours'
];

export const BenefitsSection: React.FC = () => {
    return (
        <div id="benefits" className="benefit-section">
            <div data-smiley="" className="top-smiley is-benefit">
                <img src="/img/original-flavor-icon.png" loading="lazy" alt="Original flavor icon" />
            </div>
            <div className="container smaller">
                <div className="grid-layout">
                    <div id="w-node-_6f3e86b5-5cf7-4a62-19af-d6d71a8517d6-0ac01850" className="img-wrapper">
                        <img src="/img/cdn/68953da4d0d5f048beedcb6e_4d640528cda9b637c74a05194f165bad1f5131c0.webp" loading="lazy" alt="Iced Matcha Latte - Hype Bam" className="top-img" />
                        <svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 2000 682" fill="none" data-fill-line="" style={{ overflow: 'visible' }} className="benefit-svg">
                            <path d="M-29.89,111.88c63.81,6.67,219.34,22.98,283.14,29.68,44.37,4.66,86.9,9.13,88.75,9.33l-76.07,10.18,950.85,420.59,101.42,49.18-44.37-59.36,469.09,35.61-466.97-356.15,152.14-59.36-80.29-6.78,274.69-94.97-114.1,18.66c85.22-32.79,170.45-65.58,255.67-98.36" stroke="currentColor" strokeWidth="18" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10" fill="none"></path>
                        </svg>
                        <img src="/img/cdn/68953755a9a7a338f1c66af8_2bc96c5443dd740a3309d483ae39d3da60cc7e2c.webp" loading="lazy" alt="Iced Matcha Latte - Hype Bam" className="img" />
                    </div>
                    <div
                        id="w-node-_32be253f-aa6e-8103-6d3f-40e63162832f-0ac01850"
                        className="benefit-wrapper"
                        data-typography-target="benefits-text-field"
                    >
                        <h2 className="benefit-heading"><span data-highlight-text="" className="light-green-span">What you get.</span><br />Hype Bam vs Typical Energy Drinks</h2>
                        <div data-benefit-table="" className="benefit-table">
                            <div id="w-node-_244ca70f-4fb8-4324-7d1f-6e5cebd97f1e-0ac01850" className="benefit-table-title-wrapper">
                                <div id="w-node-da33aad3-e9be-fd6f-a8b0-79237ed37994-0ac01850" className="benefit-table-title">Benefits</div>
                                <img src="/img/hypebam-logo-final-vector-02.svg" loading="lazy" id="w-node-d5a0031d-8b6e-5d4a-5e75-e26d1c40acd5-0ac01850" alt="Hype Bam Logo" className="benefit-table-title-img is-desktop" />
                                <div className="benefit-table-title is-mobile-only">Hype Bam</div>
                                <div id="w-node-_78d70ec8-c380-1f74-9296-fa312e5af0f4-0ac01850" className="benefit-table-title">Typical Energy Drinks</div>
                            </div>
                            <div data-benefit-table-line="" id="w-node-dabaf014-7b8f-d5cf-7507-3b9733e65ad8-0ac01850" className="sub-line"></div>
                            <div id="w-node-_89929daf-28b9-a774-1cdd-9d54c6ee4049-0ac01850" className="benefit-item-wrapper">
                                {benefits.map((benefit, index) => (
                                    <React.Fragment key={index}>
                                        <div className="benefit-table-item">
                                            <div className="benefit-item-title">{benefit}</div>
                                            <div className="benefit-checker-inner">
                                                <div className="benefit-item-check">
                                                    <img src="/img/cdn/68953a1b9a0c9299ece16c1e_check.svg" loading="lazy" data-benefit-table-check="" alt="Check" className="check" />
                                                </div>
                                                <div className="benefit-item-x">
                                                    <img src="/img/cdn/68953b9f3d54aaa40b14e92f_x.svg" loading="lazy" alt="X" className="check" />
                                                </div>
                                            </div>
                                        </div>
                                        <div data-benefit-table-line="" className="line"></div>
                                    </React.Fragment>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BenefitsSection;
