"use client";

import React from 'react';
import { Button, SocialLinks, ContactForm } from '@/components/ui';

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
                        {/* Moved here from the right-hand column (which is now the
                            contact form): the two shop shortcuts belong with the
                            product CTA, between the headline and the Buy-now pill. */}
                        <div className="footer-fact-wrapper">
                            <a href="#contact" className="footer-info is-first w-inline-block">
                                <img src="/img/footer/stack.svg" loading="lazy" width="70" height="70" alt="" className="footer-info-img is-first" />
                                <div className="footer-info-text">shop all<br />Products</div>
                            </a>
                            <a href="#contact" className="footer-info is-second w-inline-block">
                                <img src="/img/footer/can.svg" loading="lazy" width="70" height="70" alt="" className="footer-info-img is-second" />
                                <div className="footer-info-text">samples <br />&amp; Singles</div>
                            </a>
                        </div>
                        {/* Same shared Button every other section uses (hero, insider,
                            flavour). `aria-hidden` on the button (not the whole
                            card): .footer-product-link below is the actual, larger
                            tap target and already drives this button's hover state
                            via :has(), so the visible button stays decorative/inert
                            to assistive tech and isn't announced twice. */}
                        <Button href="#contact" variant="light" aria-hidden="true" tabIndex={-1}>
                            Buy now
                        </Button>
                    </div>
                    <a aria-label="Contact us to buy" href="#contact" className="footer-product-link w-inline-block"></a>
                </div>
                {/* Keep the w-node id — webflow assigns this column's grid
                    placement via ID-specificity rules (#w-node-…{grid-column}),
                    so replacing it collapses the column to auto width. The
                    #contact anchor therefore lives on .footer-contact-head
                    inside, which also puts the jump target right at the form. */}
                <div id="w-node-_52f3956c-463e-cf84-00da-ec073fe306cc-0ac01850" className="footer-content">
                    <div id="w-node-d7a8f3ad-3299-e0db-d6e1-45b4c5d40c53-0ac01850" className="footer-content-wrapper">
                        <div className="footer-contact-head" id="contact">
                            <h4 className="footer-heading">
                                Want to Get Your Hands on{' '}
                                <span data-highlight-text="" className="heading-line">Hype Bam?</span>
                            </h4>
                            <p className="footer-contact-sub">
                                Whether you&apos;re looking to stock Hype Bam, buy for your business,
                                or get your hands on some samples, drop us a message below and
                                we&apos;ll get back to you.
                            </p>
                        </div>

                        <ContactForm />
                    </div>
                </div>
                <img src="/img/cdn/6899e6d17cc0ae7334395045_Vector_5.svg" loading="lazy" id="w-node-_9cf1d991-93c8-9876-0a84-cf07ed027319-0ac01850" alt="Hype Bam Logo" className="footer-logo mobile" />
                <div id="w-node-_440e9322-e28d-ad9e-9ab8-9d51f2096f5d-0ac01850" className="footer-bottom">
                    <div className="footer-bottom-text">© Hype Bam. All Rights Reserved.</div>
                    {/* Social moved out of the content column to the footer's
                        bottom-right corner (and scaled up) — it now reads as the
                        page's sign-off rather than an afterthought in the form. */}
                    <div className="footer-social-media-wrap">
                        <SocialLinks variant="white" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;
