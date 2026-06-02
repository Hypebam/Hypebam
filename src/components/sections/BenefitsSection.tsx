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
                        <img src="/img/3/2.webp" loading="lazy" alt="Hype Bam flavour cans" className="top-img" />
                        <img src="/img/3/3.webp" loading="lazy" alt="Hype Bam flames" className="img" />
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
                                <div id="w-node-_78d70ec8-c380-1f74-9296-fa312e5af0f4-0ac01850" className="benefit-table-title"><span style={{ color: '#e30118' }}>Typical</span> <span style={{ color: '#3671c6' }}>Energy</span> <span style={{ color: '#c0bfbf' }}>Drinks</span></div>
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
