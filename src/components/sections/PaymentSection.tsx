"use client";

import React from 'react';

const paymentMethods = [
    { img: '/img/cdn/689b2b15e9b7e50000f8cad0_Layer_1_5.svg', alt: 'Amex', class: 'is-amex' },
    { img: '/img/cdn/689b2b1554cf5d3d8dbbeb01_Group_102.svg', alt: 'Mastercard', class: 'is-mastercard' },
    { img: '/img/cdn/689b2b15a9a38cc10d995594_Group_96.svg', alt: 'PayPal', class: 'is-paypal' },
    { img: '/img/cdn/689734d5c258f310eceeeb26_Group_97.svg', alt: 'Apple Pay', class: 'is-apple-pay' },
    { img: '/img/cdn/689b2b15baf850f5dbcaba37_Group_106.svg', alt: 'Google Pay', class: 'is-google-pay' },
    { img: '/img/cdn/689b2b2738c618add8d9334b_Group_104.svg', alt: 'Visa', class: 'is-visa' },
    { img: '/img/cdn/689bad624fa04dfe23225ad3_Klarna_Payment_Badge_1.svg', alt: 'Klarna', class: '' },
];

export const PaymentSection: React.FC = () => {
    return (
        <div data-inertia="" className="payment-section">
            <div className="payment-container">
                <div className="grid-layout">
                    <div id="w-node-_041f45d4-47b7-9fbf-98ee-78b1c2254fcb-0ac01850" className="payment-wrapper">
                        <div id="w-node-_358aeb55-90b6-f7e1-a5ad-3d95f312e343-0ac01850" className="payment-signature-days is-desktop">
                            <img src="/img/cdn/68b2211dbd022ef87bf8047a_payment_3-5-days-delivery.svg" loading="lazy" width="269" height="150" alt="payment_3-5-days-delivery" className="payment-signature-days-img" />
                        </div>
                        <h2 id="w-node-_5aa7990f-3909-960f-ff04-09bf6fbaf58f-0ac01850" data-typography-target="payment-heading" className="insider-heading">Find us and<br /><span className="light-green-span">let's bam!</span></h2>
                        <div id="w-node-_3b9ad9e4-4de9-0d6f-0561-c6944df56da5-0ac01850" className="payment-methods-inner">
                            <div data-payment="" className="pament-methods">
                                {paymentMethods.map((method, index) => (
                                    <div key={index} data-inertia-item="" className="payment-method-item-outer">
                                        <div data-payment-item="" data-inertia-item-child="" className={`payment-method-item _${index + 1}`}>
                                            <img src={method.img} loading="lazy" alt={method.alt} className={`payment-method-img ${method.class}`} />
                                        </div>
                                    </div>
                                ))}
                                <div className="payment-signature-days is-mobile">
                                    <img src="/img/cdn/68b2211dbd022ef87bf8047a_payment_3-5-days-delivery.svg" loading="lazy" width="269" height="150" alt="payment_3-5-days-delivery" className="payment-signature-days-img" />
                                </div>
                                <div className="payment-signature-mobile">
                                    <img src="/img/cdn/68c321a0bcd661b9a1c1040e_free-shipping-mobile.svg" loading="lazy" width="300" height="150" alt="free-shipping-mobile" className="payment-signature-img is-mobile" />
                                </div>
                            </div>
                        </div>
                        <div id="w-node-a4554c61-f2f6-fed6-6652-44ed900999ad-0ac01850" className="payment-signature">
                            <img src="/img/cdn/689c6da07704668cebe17120_Group_150.svg" loading="lazy" alt="Free shipping" className="mobile" />
                            <img src="/img/cdn/68b2256a5ce0c9ca5c1aa015_payment_free-shipping.svg" loading="lazy" width="300" height="96" alt="payment_free-shipping" className="payment-signature-img" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentSection;
