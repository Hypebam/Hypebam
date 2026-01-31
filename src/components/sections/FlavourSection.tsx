"use client";

import React from 'react';
import { ArrowIcon } from '@/components/icons';

const flavours = [
    { name: 'Strawberry', dose: 'https://cdn.prod.website-files.com/686c09a33211842a0ac0183d/68c958d0422452a42640ce1a_slider-flavour-strawberry-dose.webp', pack: 'https://cdn.prod.website-files.com/686c09a33211842a0ac0183d/68c958d08fd58d9f97c0a559_slider-flavour-strawberry-pack.webp' },
    { name: 'Fudge Brownie', dose: 'https://cdn.prod.website-files.com/686c09a33211842a0ac0183d/68c9bd8833449d96f96a8b2f_slider-flavour-fudge-brownie-dose.webp', pack: 'https://cdn.prod.website-files.com/686c09a33211842a0ac0183d/68c9bd899ab270ca74992378_slider-flavour-fudge-brownie-pack.webp' },
    { name: 'Vanilla Choc Chip', dose: 'https://cdn.prod.website-files.com/686c09a33211842a0ac0183d/68c9bd89c0ba63f9f1a0474f_slider-flavour-vanilla-choc-chip-dose.webp', pack: 'https://cdn.prod.website-files.com/686c09a33211842a0ac0183d/68c9bd8966162a74314fbec6_slider-flavour-vanilla-choc-chip-pack.webp' },
    { name: 'Salted Caramel', dose: 'https://cdn.prod.website-files.com/686c09a33211842a0ac0183d/68c9be3296b7aa51aad8dd5d_slider-flavour-salted-caramel-dose.webp', pack: 'https://cdn.prod.website-files.com/686c09a33211842a0ac0183d/68c9bd886d19ccf79464c844_slider-flavour-salted-caramel-pack.webp' },
    { name: 'Vanilla Perfection', dose: 'https://cdn.prod.website-files.com/686c09a33211842a0ac0183d/68c9bd88dfdd73be537ddc99_slider-flavour-vanilla-perfection-dose.webp', pack: 'https://cdn.prod.website-files.com/686c09a33211842a0ac0183d/68c9bd88efee0e997f4efce6_slider-flavour-vanilla-perfection-pack.webp' },
];

const flavourContent = [
    { title: 'Strawberry\nPerfection', link: 'https://morenutrition.co.uk/products/chunky-flavour?_psq=chunky&_v=1.0' },
    { title: 'Fudge\nBrownie', link: 'https://morenutrition.co.uk/products/chunky-flavour?variant=51094746005668' },
    { title: 'Vanilla Choc\nChip Cookie', link: 'https://morenutrition.co.uk/products/chunky-flavour?variant=51094747578532' },
    { title: 'Salted\nCaramel', link: 'https://morenutrition.co.uk/products/chunky-flavour?variant=51094765076644' },
    { title: 'Vanilla\nPerfection', link: 'https://morenutrition.co.uk/products/chunky-flavour?variant=51094761996452' },
];

export const FlavourSection: React.FC = () => {
    return (
        <section data-inertia="" className="flavour">
            <div className="flavour-container">
                <div className="flavour-header">
                    <div className="flavour-heading-wrap">
                        <h2 className="flavour-title">Sri Lankanized</h2>
                        <h3 data-highlight-text="" className="flavour-subline">5 Flavours to make you go 'aaaahhh'</h3>
                    </div>
                    <p className="flavour-paragraph">Hype Bam is a testament to our limitless potential. We can create something extraordinary that rivals the best in the world.</p>
                </div>
                <div data-flavour-content="" className="flavour-content" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '10rem' }}>
                    <div className="flavour-center-wrapper" style={{ maxWidth: '800px', width: '100%' }}>
                        <div className="flavour-navigation" style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'center', gap: '1rem' }}>
                            <button type="button" data-flavour-slider-left-button="" className="flavour-slider-button is-left">
                                <img src="https://cdn.prod.website-files.com/686c09a33211842a0ac0183d/68b2de0fba88460ab65187e9_icon-arrow-left.svg" loading="lazy" width="20" height="20" alt="icon-arrow-left" className="flavour-slider-button-arrow" />
                            </button>
                            <button type="button" data-flavour-slider-right-button="" className="flavour-slider-button is-right">
                                <img src="https://cdn.prod.website-files.com/686c09a33211842a0ac0183d/68b2de0f2245f238d5eb3226_icon-arrow-right.svg" loading="lazy" width="20" height="20" alt="icon-arrow-right" className="flavour-slider-button-arrow" />
                            </button>
                        </div>
                        
                        <div data-flavour-slider="" className="flavour-swiper swiper" style={{ marginTop: '10rem' }}>
                            <div className="flavour-swiper-wrapper swiper-wrapper">
                                {flavours.map((flavour, index) => (
                                    <div key={index} className="flavour-slide swiper-slide">
                                        <div className="flavour-slide-inner">
                                            <div data-inertia-item="" className="flavour-slide-dose">
                                                <img className="flavour-slide-dose-img" src={flavour.dose} width="723" height="615" alt={`${flavour.name}-dose`} data-inertia-item-child="" loading="lazy" />
                                            </div>
                                            <div data-inertia-item="" className="flavour-slide-pack is-first">
                                                <img className="flavour-slide-pack-img" src={flavour.pack} width="653" height="478" alt={`${flavour.name}-pack`} data-inertia-item-child="" loading="lazy" />
                                            </div>
                                            <div data-inertia-item="" className="flavour-slide-pack is-second">
                                                <img className="flavour-slide-pack-img" src={flavour.pack} width="653" height="478" alt={`${flavour.name}-pack`} data-inertia-item-child="" loading="lazy" />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        
                        <div className="flavour-center" style={{ marginTop: '2rem' }}>
                            <div data-flavour-content-slider="" className="flavour-content-swiper swiper">
                                <div className="flavour-content-swiper-wrapper swiper-wrapper">
                                    {flavourContent.map((item, index) => (
                                        <div key={index} className="flavour-content-slide swiper-slide">
                                            <div className="flavour-content-slide-inner">
                                                <div className="flavour-content-slide-header">
                                                    <h3 className="flavour-content-slider-title" dangerouslySetInnerHTML={{ __html: item.title.replace('\n', '<br/>') }}></h3>
                                                    <p className="flavour-content-slider-subline">Chunky Flavour®</p>
                                                </div>
                                                <a href={item.link} target="_blank" rel="noreferrer" className="button w-inline-block">
                                                    <div className="button-cycle is-first">
                                                        <ArrowIcon />
                                                        <div className="button-cycle-bg"></div>
                                                    </div>
                                                    <div className="button-bg">
                                                        <div className="button-text">Buy now</div>
                                                    </div>
                                                    <div className="button-cycle is-second">
                                                        <ArrowIcon />
                                                        <div className="button-cycle-bg"></div>
                                                    </div>
                                                </a>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FlavourSection;
