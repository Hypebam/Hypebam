"use client";

import React from 'react';
import { Button, SocialLinks } from '@/components/ui';

export const Footer: React.FC = () => {
    return (
        <div className="footer">
            <div id="w-node-_01191fa0-2abf-23ff-44da-acbdf6476df4-0ac01850" className="footer-full-height-container w-layout-grid">
                <div id="w-node-f35c7284-aa91-03b1-62fc-d15dd1353c80-0ac01850" className="footer-product">
                    <div className="absolute-background">
                        <img src="/img/2/2.webp" loading="lazy" width="700" height="700" alt="Hype Bam flavour cans" className="footer-img top" />
                        <img src="/img/2/3.webp" loading="lazy" width="700" height="700" alt="Hype Bam flames" className="footer-img" />
                    </div>
                    <div className="footer-product-text-inner">
                        <h3 className="footer-product-heading">Fuel<br />The<br />Rebel!</h3>
                        {/* Same shared Button every other section uses (hero, insider,
                            flavour) — was hand-rolled markup with the wrong icon
                            (ArrowIcon chevron instead of the brand mascot) and wasn't
                            a real link. `aria-hidden` on the button (not the whole
                            card): .footer-product-link below is the actual, larger
                            tap target and already drives this button's hover state
                            via :has(), so the visible button stays decorative/inert
                            to assistive tech and isn't announced twice. */}
                        <Button href="#" variant="light" aria-hidden="true" tabIndex={-1}>
                            Buy now
                        </Button>
                    </div>
                    <a aria-label="Buy now" href="#" className="footer-product-link w-inline-block"></a>
                </div>
                <div id="w-node-_52f3956c-463e-cf84-00da-ec073fe306cc-0ac01850" className="footer-content">
                    <div id="w-node-_103e8af5-3d0c-0c66-5f7b-cd9c707fa04f-0ac01850" className="footer-fact-wrapper">
                        <a href="#" className="footer-info is-first w-inline-block">
                            <img src="/img/footer/stack.svg" loading="lazy" width="70" height="70" alt="Hype Bam can stack" className="footer-info-img is-first" />
                            <div className="footer-info-text">shop all<br />Products</div>
                        </a>
                        <a href="#" className="footer-info is-second w-inline-block">
                            <img src="/img/footer/can.svg" loading="lazy" width="70" height="70" alt="Hype Bam can" className="footer-info-img is-second" />
                            <div className="footer-info-text">samples <br />&amp; Singles</div>
                        </a>
                    </div>
                    <div id="w-node-d7a8f3ad-3299-e0db-d6e1-45b4c5d40c53-0ac01850" className="footer-content-wrapper">
                        <h4 className="footer-heading"><span data-highlight-text="" className="heading-line">Hype Bam</span> <br />Energy Drink</h4>
                        <div className="footer-shipping-wrapper">
                            <a href="#" className="shipping-link w-inline-block">
                                <div className="shipping-link-wrap">
                                    <div data-typography-target="footer-shipping-text" className="shipping-link-text">Shipping and Delivery</div>
                                </div>
                            </a>
                            <a href="#" className="shipping-link w-inline-block">
                                <div className="shipping-link-wrap">
                                    <div data-typography-target="footer-shipping-text" className="shipping-link-text">Returns and Exchanges</div>
                                </div>
                            </a>
                        </div>
                        <div className="footer-social-media-wrap">
                            <SocialLinks variant="white" />
                        </div>
                    </div>
                </div>
                <img src="/img/cdn/6899e6d17cc0ae7334395045_Vector_5.svg" loading="lazy" id="w-node-_9cf1d991-93c8-9876-0a84-cf07ed027319-0ac01850" alt="Hype Bam Logo" className="footer-logo mobile" />
                <div id="w-node-_440e9322-e28d-ad9e-9ab8-9d51f2096f5d-0ac01850" className="footer-bottom">
                    <div className="footer-bottom-text">© Hype Bam. All Rights Reserved.</div>
                </div>
            </div>
        </div>
    );
};

export default Footer;
