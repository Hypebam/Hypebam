"use client";

import React from 'react';

const paymentMethods = [
    { img: '/img/Payment/Keells.jpg', alt: 'Keells', class: 'is-keells' },
    { img: '/img/Payment/spar.jpg', alt: 'SPAR', class: 'is-spar' },
    { img: '/img/Payment/LaugfsSuper.jpg', alt: 'Laugfs Super', class: 'is-laugfs' },
    { img: '/img/Payment/Softlogic.jpg', alt: 'Softlogic Glomark', class: 'is-softlogic' },
    { img: '/img/Payment/MahajanaSuper.jpg', alt: 'Mahajana Super', class: 'is-mahajana' },
    { img: '/img/Payment/OnlineKade.jpg', alt: 'Online Kade', class: 'is-onlinekade' },
    { img: '/img/Payment/CelesteDaily.jpg', alt: 'Celeste Daily', class: 'is-celeste' },
    { img: '/img/Payment/CrepeRunner.jpg', alt: 'Crepe Runner', class: 'is-creperunner' },
];

export const PaymentSection: React.FC = () => {
    return (
        <div data-inertia="" className="payment-section">
            <div className="payment-container">
                <div className="grid-layout">
                    <div id="w-node-_041f45d4-47b7-9fbf-98ee-78b1c2254fcb-0ac01850" className="payment-wrapper">
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
                            </div>
                        </div>
                        <div id="w-node-a4554c61-f2f6-fed6-6652-44ed900999ad-0ac01850" className="payment-signature">
                            <img src="/img/cdn/689c6da07704668cebe17120_Group_150.svg" loading="lazy" alt="Free shipping" className="mobile" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentSection;
