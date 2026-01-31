"use client";

import React from 'react';
import { ArrowIcon } from '@/components/icons';
import { SocialLinks } from '@/components/ui';

// Credits data
const credits = [
    { role: '3D Design', name: 'Tobias Anderssohn', link: 'https://www.tobias-anderssohn.com/en/' },
    { role: 'Web Design', name: 'Somefolk®', link: 'https://www.somefolk.co/' },
    { role: 'Web Development', name: 'Future Three®', link: 'https://www.futurethree.studio/' },
    { role: 'Web Animation', name: 'Eduard Bodak', link: 'https://www.eduardbodak.com/' },
    { role: 'Copywriting', name: 'Psychologie.Biz', link: 'https://psychologie.biz/' },
];

/**
 * Footer section with product showcase, links, and credits
 */
export const Footer: React.FC = () => {
    return (
        <div className="footer">
            <div id="w-node-_01191fa0-2abf-23ff-44da-acbdf6476df4-0ac01850" className="footer-full-height-container">
                <div id="w-node-f35c7284-aa91-03b1-62fc-d15dd1353c80-0ac01850" className="footer-product">
                    <div className="absolute-background">
                        <img src="https://cdn.prod.website-files.com/686c09a33211842a0ac0183d/68b2fe215f8a5cce19bfe408_footer_product-bg-top.webp" loading="lazy" width="700" height="700" alt="footer_product-bg-top" srcSet="https://cdn.prod.website-files.com/686c09a33211842a0ac0183d/68b2fe215f8a5cce19bfe408_footer_product-bg-top-p-500.webp 500w, https://cdn.prod.website-files.com/686c09a33211842a0ac0183d/68b2fe215f8a5cce19bfe408_footer_product-bg-top-p-800.webp 800w, https://cdn.prod.website-files.com/686c09a33211842a0ac0183d/68b2fe215f8a5cce19bfe408_footer_product-bg-top-p-1080.webp 1080w, https://cdn.prod.website-files.com/686c09a33211842a0ac0183d/68b2fe215f8a5cce19bfe408_footer_product-bg-top.webp 1400w" sizes="(max-width: 767px) 100vw, 700px" className="footer-img top" />
                        <img src="https://cdn.prod.website-files.com/686c09a33211842a0ac0183d/68b2fe215f8a5cce19bfe3f1_footer_product-bg.webp" loading="lazy" width="700" height="700" alt="footer_product-bg" srcSet="https://cdn.prod.website-files.com/686c09a33211842a0ac0183d/68b2fe215f8a5cce19bfe3f1_footer_product-bg-p-500.webp 500w, https://cdn.prod.website-files.com/686c09a33211842a0ac0183d/68b2fe215f8a5cce19bfe3f1_footer_product-bg-p-800.webp 800w, https://cdn.prod.website-files.com/686c09a33211842a0ac0183d/68b2fe215f8a5cce19bfe3f1_footer_product-bg-p-1080.webp 1080w, https://cdn.prod.website-files.com/686c09a33211842a0ac0183d/68b2fe215f8a5cce19bfe3f1_footer_product-bg.webp 1400w" sizes="(max-width: 767px) 100vw, 700px" className="footer-img" />
                    </div>
                    <div className="footer-product-text-inner">
                        <h3 className="footer-product-heading">Matcha<br />meets...<br />Sri Lankanized</h3>
                        <div aria-hidden="true" className="button is-light">
                            <div className="button-cycle is-first">
                                <ArrowIcon />
                                <div className="button-cycle-bg light-bg"></div>
                            </div>
                            <div className="button-bg light-bg">
                                <div className="button-text dark-font">Buy now</div>
                            </div>
                            <div className="button-cycle is-second">
                                <ArrowIcon />
                                <div className="button-cycle-bg light-bg"></div>
                            </div>
                        </div>
                    </div>
                    <a aria-label="Buy now" href="https://morenutrition.co.uk/products/more-protein-iced-matcha-latte?country=GB&shpxid=9a9ac546-be7d-41d1-b2d0-0e58e2adcb2d" target="_blank" rel="noreferrer" className="footer-product-link w-inline-block"></a>
                </div>
                <div id="w-node-_52f3956c-463e-cf84-00da-ec073fe306cc-0ac01850" className="footer-content">
                    <div id="w-node-_103e8af5-3d0c-0c66-5f7b-cd9c707fa04f-0ac01850" className="footer-fact-wrapper">
                        <a href="https://morenutrition.co.uk/collections/all-products-uk" target="_blank" rel="noreferrer" className="footer-info is-first w-inline-block">
                            <img src="https://cdn.prod.website-files.com/686c09a33211842a0ac0183d/689754d9448e952a9e6c0aeb_Alle-Produkte_f1ba7a0d-4d19-4202-af26-db495d4d8559_100x100%201.svg" loading="lazy" width="57" height="70" alt="More Nutrition Icon" className="footer-info-img is-first" />
                            <div className="footer-info-text">shop all<br />Products</div>
                        </a>
                        <a href="https://morenutrition.co.uk/collections/samples-and-singlepacks-uk" target="_blank" rel="noreferrer" className="footer-info is-second w-inline-block">
                            <img src="https://cdn.prod.website-files.com/686c09a33211842a0ac0183d/689754d9d94ba5b480581df7_Group%2084.svg" loading="lazy" width="58" height="49" alt="More Nutrition Icon" className="footer-info-img is-second" />
                            <div className="footer-info-text">samples <br />&amp; Singles</div>
                        </a>
                    </div>
                    <div id="w-node-d7a8f3ad-3299-e0db-d6e1-45b4c5d40c53-0ac01850" className="footer-content-wrapper">
                        <h4 className="footer-heading"><span data-highlight-text="" className="heading-line">Hype Bam</span> <br />Energy Drink</h4>
                        <div className="footer-shipping-wrapper">
                            <a href="https://service.morenutrition.de/hc/en-us/sections/15534294234257-Shipping-and-Delivery" target="_blank" rel="noreferrer" className="shipping-link w-inline-block">
                                <div className="shipping-link-wrap">
                                    <div className="shipping-link-text">Shipping and Delivery</div>
                                </div>
                            </a>
                            <a href="https://service.morenutrition.de/hc/en-us/sections/15534281016465-Return-Refund" target="_blank" rel="noreferrer" className="shipping-link w-inline-block">
                                <div className="shipping-link-wrap">
                                    <div className="shipping-link-text">Returns and Exchanges</div>
                                </div>
                            </a>
                        </div>
                        <div className="footer-social-media-wrap">
                            <SocialLinks variant="white" />
                        </div>
                    </div>
                </div>
                <img src="https://cdn.prod.website-files.com/686c09a33211842a0ac0183d/6899e6d17cc0ae7334395045_Vector%20(5).svg" loading="lazy" id="w-node-_9cf1d991-93c8-9876-0a84-cf07ed027319-0ac01850" alt="More Nutrition Logo" className="footer-logo mobile" />
                <div id="w-node-_440e9322-e28d-ad9e-9ab8-9d51f2096f5d-0ac01850" className="footer-bottom">
                    <div className="footer-bottom-text">© Hype Bam. All Rights Reserved.</div>
                    <button type="button" className="footer-credits-toggle"><span className="footer-credits-toggle-wrap"><span className="footer-credits-toggle-text">Site Credits</span></span></button>
                    <div className="footer-credits">
                        <div className="footer-credits-inner">
                            {credits.map((credit, index) => (
                                <div key={index} className="footer-credits-detail">
                                    <div className="footer-credits-text">{credit.role}</div>
                                    <a href={credit.link} target="_blank" rel="noreferrer" className="credits-link w-inline-block">
                                        <div className="credits-link-wrap">
                                            <div className="credits-link-text">{credit.name}</div>
                                        </div>
                                    </a>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;
