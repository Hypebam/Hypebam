"use client";

import React from 'react';

const testimonials = [
    { name: 'Original', heading: 'Original', text: 'A crisp, lightly sweet blend with subtle berry notes and a smooth finish.' },
    { name: 'Apple Berry', heading: 'Apple Berry', text: 'A fresh, lightly sweet blend of juicy apple and soft berry notes with a smooth finish.' },
    { name: 'Lemon Lime', heading: 'Lemon Lime', text: 'Bright, citrus-forward and refreshing, with a clean, zesty finish.' },
    { name: 'Mango Peach', heading: 'Mango Peach', text: 'Smooth and lightly tropical, balancing ripe mango with soft peach notes.' },
    { name: 'Pineapple Passion', heading: 'Pineapple Passion', text: 'Vibrant and juicy, blending tropical pineapple with a hint of passionfruit.' },
    { name: 'Find Us', heading: "Find us and let's bam!", text: 'Available at stores near you. Experience the rebellious energy of Sri Lanka.' },
];

export const TestimonialsSection: React.FC = () => {
    return (
        <div id="reviews" className="testimonial-section">
            <div data-testimonial-parallax="" className="bg-img-wrapper">
                <img className="testimonial-top-img" src="https://cdn.prod.website-files.com/686c09a33211842a0ac0183d/689541efc32332b4d96332e4_5aa593a5c181883619e1ec2e48b9a77009ae6ddd.webp" width="2048" alt="Hype Bam Energy Drink" data-testimonial-parallax-item="" loading="lazy" />
                <img className="bg-img" src="https://cdn.prod.website-files.com/686c09a33211842a0ac0183d/689541d1c4bb0b452cb46e3e_b525d1f05540193d88caa60b825b8887a650d649.webp" width="2048" alt="Hype Bam Energy Drink" data-testimonial-parallax-item="" loading="lazy" />
            </div>
            <div className="testimonial-container">
                <div className="grid-layout">
                    <div id="w-node-_188a35c2-2913-dd29-6c54-5bf8cbbe64f3-0ac01850" className="big-title-wrapper">
                        <div className="testimonial-signature">
                            <img src="https://cdn.prod.website-files.com/686c09a33211842a0ac0183d/68b2e8120f5b95bfbd87aebf_testimonial-signature.svg" loading="lazy" width="300" height="27" alt="testimonial-signature" className="testimonial-signature-img" />
                            <img src="https://cdn.prod.website-files.com/686c09a33211842a0ac0183d/68b2e8120f5b95bfbd87aebf_testimonial-signature.svg" loading="lazy" width="300" height="27" alt="testimonial-signature" className="testimonial-signature-img is-wiggle" />
                        </div>
                        <h2 className="testimonial-big-heading">Sri Lankanized<br />Hydration</h2>
                    </div>
                    <div id="w-node-d56024cf-9b70-fc24-7ba0-e2b3ea8d1769-0ac01850" className="testimonial-slider">
                        <h3 className="testimonial-heading">why they keep<br />coming back</h3>
                        <div data-testimonial-inview="" className="testimonial-slider-wrapper">
                            <div data-slider-interface="" className="testimonial-slider-interface">
                                <div data-slider-arrows="" className="testimonial-slider-button-wrapper">
                                    <button type="button" data-slider-left-button="" className="testimonial-slider-button is-left">
                                        <img src="https://cdn.prod.website-files.com/686c09a33211842a0ac0183d/68b2de0fba88460ab65187e9_icon-arrow-left.svg" loading="lazy" width="20" height="20" alt="icon-arrow-left" className="testimonial-slider-button-arrow" />
                                    </button>
                                    <button type="button" data-slider-right-button="" className="testimonial-slider-button is-right">
                                        <img src="https://cdn.prod.website-files.com/686c09a33211842a0ac0183d/68b2de0f2245f238d5eb3226_icon-arrow-right.svg" loading="lazy" width="20" height="20" alt="icon-arrow-right" className="testimonial-slider-button-arrow" />
                                    </button>
                                </div>
                            </div>
                            <div data-slider="" className="testimonial-slider-inner">
                                {testimonials.map((testimonial, index) => (
                                    <div key={index} className="testimonial-slider-item-wrap">
                                        <div data-slider-item-inner="" className="testimonial-slider-item">
                                            <div className="testimonial-star-wrap">
                                                {[1, 2, 3, 4, 5].map(star => (
                                                    <img key={star} src="https://cdn.prod.website-files.com/686c09a33211842a0ac0183d/68b2bdb3390600fa418ac907_icon-testimonial-star.svg" loading="lazy" width="20" height="20" alt="icon-testimonial-star" className="testimonial-star" />
                                                ))}
                                            </div>
                                            <div className="testimonial-item-inner-text">
                                                <h3 className="testimonial-item-heading">{testimonial.heading}</h3>
                                                <p className="testimonial-item-text">{testimonial.text}</p>
                                            </div>
                                            <div className="testimonial-line"></div>
                                            <div className="testimonial-item-bottom">
                                                <div className="testimonial-client-name">{testimonial.name}</div>
                                                <div className="testimonial-verified-wrap">
                                                    <img src="https://cdn.prod.website-files.com/686c09a33211842a0ac0183d/68b2c1be2762f3ffc1be06c5_icon-bubble-check.svg" loading="lazy" width="20" height="20" alt="icon-bubble-check" className="testimonial-verified-icon" />
                                                    <div className="testimonial-verified-text">Verified</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TestimonialsSection;
