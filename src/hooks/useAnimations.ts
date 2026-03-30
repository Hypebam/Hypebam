"use client";

import { useEffect } from 'react';

declare global {
    interface Window {
        Swiper: any;
        gsap: any;
        ScrollTrigger: any;
        lenis: any;
    }
}

export const useAnimations = () => {
    useEffect(() => {
        // =============================================
        // 1. LOAD APP.JS (Webflow animations)
        // =============================================
        const loadAppScript = () => {
            if (document.querySelector('script[src="/scripts/app.js"]')) return;

            const script = document.createElement('script');
            script.src = '/scripts/app.js';
            script.async = false;
            script.onload = () => console.log('app.js loaded successfully');
            script.onerror = () => {
                console.error('Failed to load app.js — enabling fallback');
                document.documentElement.classList.add('fonts-loaded', 'is-ready', 'has-seq-ready');
            };
            document.body.appendChild(script);
        };

        const appTimer = setTimeout(loadAppScript, 200);

        // =============================================
        // 2. SWIPER — Flavour Section
        // =============================================
        const initSwiper = () => {
            const flavourSliderEl = document.querySelector('[data-flavour-slider]');
            const contentSliderEl = document.querySelector('[data-flavour-content-slider]');
            if (!flavourSliderEl || !contentSliderEl) return;

            // Dynamically load Swiper CSS + JS if not already loaded
            if (!document.querySelector('link[href*="swiper"]')) {
                const swiperCSS = document.createElement('link');
                swiperCSS.rel = 'stylesheet';
                swiperCSS.href = 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css';
                document.head.appendChild(swiperCSS);
            }

            const loadSwiperJS = () => {
                if (window.Swiper) {
                    createSwipers();
                    return;
                }
                const script = document.createElement('script');
                script.src = 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js';
                script.onload = () => createSwipers();
                document.head.appendChild(script);
            };

            const createSwipers = () => {
                if (!window.Swiper) return;

                const contentSwiper = new window.Swiper('[data-flavour-content-slider]', {
                    slidesPerView: 1,
                    allowTouchMove: false,
                    effect: 'fade',
                    fadeEffect: { crossFade: true },
                    speed: 600,
                });

                const mainSwiper = new window.Swiper('[data-flavour-slider]', {
                    slidesPerView: 1,
                    centeredSlides: true,
                    speed: 800,
                    loop: false,
                    grabCursor: true,
                    breakpoints: {
                        992: { slidesPerView: 1.5 },
                    },
                    thumbs: { swiper: contentSwiper },
                });

                // Navigation buttons
                const leftBtn = document.querySelector('[data-flavour-slider-left-button]');
                const rightBtn = document.querySelector('[data-flavour-slider-right-button]');

                leftBtn?.addEventListener('click', () => {
                    mainSwiper.slidePrev();
                    contentSwiper.slidePrev();
                });
                rightBtn?.addEventListener('click', () => {
                    mainSwiper.slideNext();
                    contentSwiper.slideNext();
                });

                // Sync content slider on main slide change
                mainSwiper.on('slideChange', () => {
                    contentSwiper.slideTo(mainSwiper.activeIndex);
                });
            };

            setTimeout(loadSwiperJS, 500);
        };

        initSwiper();

        // =============================================
        // 3. TESTIMONIAL SLIDER
        // =============================================
        const initTestimonialSlider = () => {
            const slider = document.querySelector('[data-slider]') as HTMLElement;
            const leftBtn = document.querySelector('[data-slider-left-button]');
            const rightBtn = document.querySelector('[data-slider-right-button]');
            if (!slider) return;

            let currentIndex = 0;
            const items = slider.querySelectorAll('.testimonial-slider-item-wrap');
            const totalItems = items.length;

            const updateSlider = () => {
                items.forEach((item, i) => {
                    item.classList.toggle('is-active', i === currentIndex);
                });

                // Calculate scroll position
                const activeItem = items[currentIndex] as HTMLElement;
                if (!activeItem) return;

                const sliderRect = slider.getBoundingClientRect();
                const itemRect = activeItem.getBoundingClientRect();
                const scrollOffset = itemRect.left - sliderRect.left - (sliderRect.width / 2) + (itemRect.width / 2) + slider.scrollLeft;

                slider.scrollTo({ left: scrollOffset, behavior: 'smooth' });
            };

            leftBtn?.addEventListener('click', () => {
                currentIndex = Math.max(0, currentIndex - 1);
                updateSlider();
            });

            rightBtn?.addEventListener('click', () => {
                currentIndex = Math.min(totalItems - 1, currentIndex + 1);
                updateSlider();
            });

            // Set first item as active
            updateSlider();
        };

        setTimeout(initTestimonialSlider, 800);

        // =============================================
        // 4. VIDEO PLAY/PAUSE WITH SOUND TOGGLE
        // =============================================
        const initVideoButtons = () => {
            const buttons = document.querySelectorAll('[data-video-button]');
            const videos = document.querySelectorAll('[data-video]') as NodeListOf<HTMLVideoElement>;

            // Auto-play videos muted
            videos.forEach(video => {
                video.muted = true;
                video.play().catch(() => { /* autoplay blocked */ });
            });

            buttons.forEach((btn, index) => {
                btn.addEventListener('click', () => {
                    const video = videos[index];
                    if (!video) return;

                    btn.classList.toggle('is-clicked');

                    if (video.muted) {
                        // Unmute this, mute others
                        videos.forEach((v, i) => {
                            if (i !== index) {
                                v.muted = true;
                                buttons[i]?.classList.remove('is-clicked');
                            }
                        });
                        video.muted = false;
                    } else {
                        video.muted = true;
                    }
                });
            });
        };

        setTimeout(initVideoButtons, 600);

        // =============================================
        // 5. GOLD MOUSE-TRACKING SPOTLIGHT
        // =============================================
        let mouseX = 0, mouseY = 0;
        let currentX = 0, currentY = 0;
        let animationId: number;

        const handleMouseMove = (e: MouseEvent) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        };

        const animate = () => {
            currentX += (mouseX - currentX) * 0.08;
            currentY += (mouseY - currentY) * 0.08;

            const xPercent = (currentX / window.innerWidth) * 100;
            const yPercent = (currentY / window.innerHeight) * 100;

            const glowOverlay = document.getElementById('mouse-glow-overlay');
            if (glowOverlay) {
                glowOverlay.style.background = `
                    radial-gradient(
                        600px circle at ${xPercent}% ${yPercent}%,
                        rgba(230, 81, 0, 0.06) 0%,
                        rgba(230, 81, 0, 0.02) 40%,
                        transparent 70%
                    )
                `;
            }
            animationId = requestAnimationFrame(animate);
        };

        if (!document.getElementById('mouse-glow-overlay')) {
            const glowOverlay = document.createElement('div');
            glowOverlay.id = 'mouse-glow-overlay';
            glowOverlay.style.cssText = `
                position: fixed;
                top: 0; left: 0;
                width: 100%; height: 100%;
                pointer-events: none;
                z-index: 1;
                background: transparent;
            `;
            document.body.appendChild(glowOverlay);
        }

        const hasPointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
        if (hasPointer) {
            window.addEventListener('mousemove', handleMouseMove);
            animationId = requestAnimationFrame(animate);
        }

        // =============================================
        // 6. GSAP SCROLL ANIMATIONS (fallback if app.js fails)
        // =============================================
        const initGSAPAnimations = () => {
            const gsap = window.gsap;
            const ScrollTrigger = window.ScrollTrigger;
            if (!gsap || !ScrollTrigger) return;

            gsap.registerPlugin(ScrollTrigger);

            // Animate benefit table items on scroll
            const benefitItems = document.querySelectorAll('.benefit-table-item');
            benefitItems.forEach((item, i) => {
                gsap.fromTo(item,
                    { opacity: 0, y: 30 },
                    {
                        scrollTrigger: {
                            trigger: item,
                            start: 'top 90%',
                            toggleActions: 'play none none reverse',
                        },
                        opacity: 1,
                        y: 0,
                        duration: 0.6,
                        delay: i * 0.08,
                        ease: 'power2.out',
                    }
                );
            });

            // Animate benefit check marks
            const checks = document.querySelectorAll('[data-benefit-table-check]');
            checks.forEach((check, i) => {
                gsap.fromTo(check,
                    { scale: 0, opacity: 0 },
                    {
                        scrollTrigger: {
                            trigger: check,
                            start: 'top 90%',
                            toggleActions: 'play none none reverse',
                        },
                        scale: 1,
                        opacity: 1,
                        duration: 0.5,
                        delay: i * 0.1 + 0.3,
                        ease: 'back.out(1.7)',
                    }
                );
            });

            // Animate SVG lines (drawSVG-like effect)
            const svgPaths = document.querySelectorAll('[data-fill-line] path, [data-sequence-svg] path');
            svgPaths.forEach(path => {
                const el = path as SVGPathElement;
                if (!el.getTotalLength) return;
                const length = el.getTotalLength();
                el.style.strokeDasharray = `${length}`;
                el.style.strokeDashoffset = `${length}`;

                gsap.to(el, {
                    scrollTrigger: {
                        trigger: el.closest('svg'),
                        start: 'top 80%',
                        end: 'bottom 20%',
                        scrub: 1,
                    },
                    strokeDashoffset: 0,
                    duration: 2,
                    ease: 'none',
                });
            });

            // Parallax for testimonial background images
            const parallaxItems = document.querySelectorAll('[data-testimonial-parallax-item]');
            parallaxItems.forEach(item => {
                gsap.to(item, {
                    scrollTrigger: {
                        trigger: '[data-testimonial-parallax]',
                        start: 'top bottom',
                        end: 'bottom top',
                        scrub: 1,
                    },
                    y: -80,
                    ease: 'none',
                });
            });

            // Payment method items stagger animation — FIXED
            // Using fromTo() + immediateRender:false prevents items
            // from becoming invisible if GSAP loads after scroll
            const paymentItems = document.querySelectorAll('[data-payment-item]');
            if (paymentItems.length) {
                gsap.fromTo(paymentItems,
                    { scale: 0, opacity: 0 },
                    {
                        scrollTrigger: {
                            trigger: '[data-payment]',
                            start: 'top 85%',
                            toggleActions: 'play none none reverse',
                        },
                        scale: 1,
                        opacity: 1,
                        duration: 0.6,
                        stagger: 0.1,
                        ease: 'back.out(1.7)',
                        immediateRender: false,
                    }
                );
            }
        };

        // Wait for GSAP to be available, then init our custom animations
        const gsapTimer = setTimeout(initGSAPAnimations, 1500);

        // =============================================
        // 7. FOOTER CREDITS TOGGLE
        // =============================================
        const initFooterCredits = () => {
            const toggle = document.querySelector('.footer-credits-toggle');
            const credits = document.querySelector('.footer-credits');
            if (!toggle || !credits) return;

            toggle.addEventListener('click', () => {
                const inner = credits.querySelector('.footer-credits-inner') as HTMLElement;
                if (!inner) return;

                const isVisible = inner.style.opacity === '1';
                if (isVisible) {
                    inner.style.opacity = '0';
                    inner.style.pointerEvents = 'none';
                    inner.style.translate = '.5em 1.5em 0';
                } else {
                    inner.style.opacity = '1';
                    inner.style.pointerEvents = 'auto';
                    inner.style.translate = '0 0 0';
                    inner.style.scale = '.95';
                    inner.style.transform = 'scale(1.0526315789)';
                }
            });
        };

        setTimeout(initFooterCredits, 800);

        // =============================================
        // CLEANUP
        // =============================================
        return () => {
            clearTimeout(appTimer);
            clearTimeout(gsapTimer);
            window.removeEventListener('mousemove', handleMouseMove);
            if (animationId) cancelAnimationFrame(animationId);
            const overlay = document.getElementById('mouse-glow-overlay');
            if (overlay) overlay.remove();
        };
    }, []);
};

export default useAnimations;
