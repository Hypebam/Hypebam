"use client";

import React, { useEffect, useRef } from 'react';
import { Button } from '@/components/ui';

// Local compressed videos (served from /public/img/video/compressed/)
// Original: ~225 MB total → Compressed: ~11.4 MB total (94.9% reduction)
// Posters: native-resolution first frames — iOS Low Power Mode blocks
// autoplay, and without a poster those users saw a black box.
const testimonialVideos = [
    {
        src: "/img/video/compressed/Story_01.mp4",
        poster: "/img/video/posters/Story_01.jpg",
        position: "is-first",
        buttonPosition: "is-top"
    },
    {
        src: "/img/video/compressed/Story_02.mp4",
        poster: "/img/video/posters/Story_02.jpg",
        position: "is-second",
        buttonPosition: ""
    },
    {
        src: "/img/video/compressed/Story_03.mp4",
        poster: "/img/video/posters/Story_03.jpg",
        position: "is-third",
        buttonPosition: ""
    },
    {
        src: "/img/video/compressed/Story_04.mp4",
        poster: "/img/video/posters/Story_04.jpg",
        position: "is-fourth",
        buttonPosition: ""
    },
    {
        src: "/img/video/compressed/Story_05.mp4",
        poster: "/img/video/posters/Story_05.jpg",
        position: "is-fifth",
        buttonPosition: ""
    }
];

const SoundButtonIcons: React.FC = () => (
    <>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16" width="100%" className="testimonial-sound-button-icon is-first">
            <path fill="currentColor" d="M10.5 2v12a.5.5 0 0 1-.807.394L5.328 11H2.5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h2.828l4.365-3.394A.5.5 0 0 1 10.5 2Zm2 4a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 1 0v-3a.5.5 0 0 0-.5-.5Zm2-1a.5.5 0 0 0-.5.5v5a.5.5 0 0 0 1 0v-5a.5.5 0 0 0-.5-.5Z"></path>
        </svg>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16" width="100%" className="testimonial-sound-button-icon is-second">
            <path fill="currentColor" d="M13.87 13.164a.5.5 0 1 1-.74.672l-2.63-2.893v3.038a.518.518 0 0 1-.244.448.5.5 0 0 1-.563-.035L5.328 11H2.5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h2.597L3.13 2.836a.5.5 0 0 1 .74-.672l10 11ZM12.533 10A.51.51 0 0 0 13 9.484V6.517A.51.51 0 0 0 12.533 6a.5.5 0 0 0-.533.5v3a.499.499 0 0 0 .533.5Zm-2.47-2.508a.25.25 0 0 0 .437-.169V2.015a.515.515 0 0 0-.18-.4.5.5 0 0 0-.625-.01L6.989 3.709a.25.25 0 0 0-.03.366l3.104 3.418ZM14.466 5a.51.51 0 0 0-.467.517v4.966a.51.51 0 0 0 .467.516.498.498 0 0 0 .533-.5V5.5a.499.499 0 0 0-.533-.5Z"></path>
        </svg>
    </>
);

export const InsiderSection: React.FC = () => {
    const wrapperRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const wrapper = wrapperRef.current;
        if (!wrapper) return;

        // Lazy-play videos only when they scroll into view
        const videos = wrapper.querySelectorAll<HTMLVideoElement>('video[data-video]');

        // Lazy-load source + pause when off-screen. Initial play() is owned by
        // useAnimations.ts initVideoButtons so unmute-via-click works correctly.
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    const video = entry.target as HTMLVideoElement;
                    if (entry.isIntersecting) {
                        if (video.dataset.poster && !video.poster) video.poster = video.dataset.poster;
                        const source = video.querySelector('source');
                        if (source && source.dataset.src && !source.src) {
                            source.src = source.dataset.src;
                            video.load();
                        }
                        if (video.paused) {
                            video.play().catch(() => { /* muted videos usually allowed */ });
                        }
                    } else {
                        video.pause();
                    }
                });
            },
            { threshold: 0.25 }
        );

        videos.forEach((video) => observer.observe(video));

        return () => observer.disconnect();
    }, []);

    return (
        <div data-inertia="" className="insider-section">
            <div className="insider-container">
                <div className="grid-layout">
                    <h2 id="w-node-_3e09cbcc-bb63-d8d5-fc92-5249d862c0ff-0ac01850" className="insider-heading">
                        Sri Lankanized Taste<br /><span className="light-green-span">that&apos;s out of this world</span><br />Energy to conquer the day<br />Sri-Lankanized just for you
                    </h2>
                    <div id="w-node-e1fee9ee-097a-d41e-6a8c-8fb81a411381-0ac01850" className="insider-wrapper" ref={wrapperRef}>
                        <div id="w-node-_93a09ee3-b180-b755-d23e-d7d2b5f676da-0ac01850" className="testimonial-wrapper">
                            {testimonialVideos.map((video, index) => (
                                <div
                                    key={index}
                                    data-inertia-item=""
                                    id={index > 0 ? `w-node-testimonial-${index}` : undefined}
                                    className={`testimonial-inner-wrap ${video.position}`}
                                >
                                    <div data-inertia-item-child="" className={`testimonial-inner _${index + 1}`}>
                                        <div className="testimonial-media w-embed">
                                            {/* poster is hydrated from data-poster together with the
                                                source (IO below / ResourcePreloader) so the ~1 MB of
                                                poster JPEGs never load before the section approaches */}
                                            <video
                                                playsInline
                                                loop
                                                muted
                                                preload="none"
                                                data-poster={video.poster}
                                                data-video=""
                                                data-video-id={`v${index}`}
                                            >
                                                {/* NO src on first paint — the IntersectionObserver below
                                                    (and ResourcePreloader as you approach) injects it from
                                                    data-src, so mobile browsers never fetch video bytes for
                                                    off-screen cards. */}
                                                <source data-src={video.src} type="video/mp4" />
                                            </video>
                                        </div>
                                        <button
                                            type="button"
                                            data-video-button=""
                                            data-video-button-id={`v${index}`}
                                            aria-label="Sound on/off"
                                            className={`testimonial-sound-btn ${video.buttonPosition}`}
                                        >
                                            <SoundButtonIcons />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    {/* Text section — inside grid-layout but after insider-wrapper so it renders below */}
                    <div id="w-node-_1ac78251-f73b-1f50-5984-75b855ef30eb-0ac01850" data-typography-target="insider-text-field" className="insider-text-inner" style={{ textAlign: 'center', justifyContent: 'center', alignItems: 'center' }}>
                        <h3 className="insider-subheading">Taste as Bold as Your Ambitions</h3>
                        <p className="paragraph">Hype Bam is more than just an energy drink; it&apos;s a symbol of Sri Lankan resilience. We&apos;ve faced countless challenges, yet we rise stronger every time. We defy the odds, push boundaries, and keep moving forward…and that&apos;s the spirit we&apos;ve infused into every can.</p>
                        <div className="insider-cta">
                            <Button href="#">
                                Buy now
                            </Button>
                            <div className="rating-inner">
                                <a href="#reviews" className="rating-link w-inline-block">
                                    <div className="rating-star-wrap">
                                        {[1, 2, 3, 4].map(i => (
                                            <img key={i} src="/img/cdn/68ae178a6c618dbc4bb25c48_icon-star.svg" loading="lazy" width="20" height="20" alt="icon-star" className="rating-star" />
                                        ))}
                                        <img src="/img/cdn/68ae178a30a512b269607fbe_icon-star-half.svg" loading="lazy" width="20" height="20" alt="icon-star" className="rating-star" />
                                    </div>
                                    <div className="rating-text-wrap">
                                        <div className="rating-text">1000+ Reviews</div>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InsiderSection;
