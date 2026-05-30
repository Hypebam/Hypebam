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
                <img className="testimonial-top-img" src="/img/1/4.webp" width="1400" alt="Hype Bam Original can" data-testimonial-parallax-item="" loading="lazy" />
                <img className="bg-img" src="/img/1/6.webp" width="1400" alt="Hype Bam flame stage" data-testimonial-parallax-item="" loading="lazy" />
            </div>
            <div className="testimonial-container">
                <div className="grid-layout">
                    <div id="w-node-_188a35c2-2913-dd29-6c54-5bf8cbbe64f3-0ac01850" className="big-title-wrapper">
                        <h2 className="testimonial-big-heading">Sri Lankanized<br />Hydration</h2>
                    </div>
                    <div id="w-node-d56024cf-9b70-fc24-7ba0-e2b3ea8d1769-0ac01850" className="testimonial-slider">
                        <h3 className="testimonial-heading">why they keep<br />coming back</h3>
                        <div
                            data-testimonial-inview=""
                            className="testimonial-slider-wrapper"
                            data-typography-target="testimonial-cards-text-field"
                        >
                            <div data-slider-interface="" className="testimonial-slider-interface">
                                <div data-slider-arrows="" className="testimonial-slider-button-wrapper">
                                    <button type="button" data-slider-left-button="" className="testimonial-slider-button is-left">
                                        <img src="/img/cdn/68b2de0fba88460ab65187e9_icon-arrow-left.svg" loading="lazy" width="20" height="20" alt="icon-arrow-left" className="testimonial-slider-button-arrow" />
                                    </button>
                                    <button type="button" data-slider-right-button="" className="testimonial-slider-button is-right">
                                        <img src="/img/cdn/68b2de0f2245f238d5eb3226_icon-arrow-right.svg" loading="lazy" width="20" height="20" alt="icon-arrow-right" className="testimonial-slider-button-arrow" />
                                    </button>
                                </div>
                            </div>
                            <div data-slider="" className="testimonial-slider-inner">
                                {testimonials.map((testimonial, index) => (
                                    <div key={index} className="testimonial-slider-item-wrap">
                                        <div data-slider-item-inner="" className="testimonial-slider-item">
                                            <div className="testimonial-star-wrap">
                                                {[1, 2, 3, 4, 5].map(star => (
                                                    <img key={star} src="/img/cdn/68b2bdb3390600fa418ac907_icon-testimonial-star.svg" loading="lazy" width="20" height="20" alt="icon-testimonial-star" className="testimonial-star" />
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
                                                    <img src="/img/cdn/68b2c1be2762f3ffc1be06c5_icon-bubble-check.svg" loading="lazy" width="20" height="20" alt="icon-bubble-check" className="testimonial-verified-icon" />
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
