import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Hook for various ScrollTrigger-based animations throughout the page
 * Includes: marquee, benefit table, testimonial parallax, highlight text, etc.
 */
export const useScrollAnimations = () => {
  const isInitializedRef = useRef(false);

  useEffect(() => {
    if (isInitializedRef.current) return;
    isInitializedRef.current = true;

    // Wait for DOM to be ready
    const initAnimations = () => {
      initMarquee();
      initBenefitTable();
      initTestimonialParallax();
      initHighlightText();
      initPaymentSection();
      initFillLines();
      initNavbar();
      initVideoControls();
    };

    // Marquee text animation
    const initMarquee = () => {
      const marquee = document.querySelector('[data-marquee]');
      const marqueeSvg = document.querySelector('[data-marquee-svg]');

      if (!marquee || !marqueeSvg) return;

      const textPath = marqueeSvg.querySelector('textPath');
      if (!textPath) return;

      // Animate text along path
      gsap.to(textPath, {
        attr: { startOffset: '-100%' },
        ease: 'none',
        scrollTrigger: {
          trigger: marquee,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      });
    };

    // Benefit table animations
    const initBenefitTable = () => {
      const benefitTable = document.querySelector('[data-benefit-table]');
      if (!benefitTable) return;

      const lines = benefitTable.querySelectorAll('[data-benefit-table-line]');
      const checks = benefitTable.querySelectorAll('[data-benefit-table-check]');

      // Animate lines
      lines.forEach((line, index) => {
        gsap.set(line, { scaleX: 0, transformOrigin: 'left center' });

        ScrollTrigger.create({
          trigger: line,
          start: 'top 85%',
          onEnter: () => {
            gsap.to(line, {
              scaleX: 1,
              duration: 0.6,
              delay: index * 0.05,
              ease: 'power2.out',
            });
          },
        });
      });

      // Animate checkmarks
      checks.forEach((check, index) => {
        gsap.set(check, { scale: 0, rotation: -45 });

        ScrollTrigger.create({
          trigger: check,
          start: 'top 85%',
          onEnter: () => {
            gsap.to(check, {
              scale: 1,
              rotation: 0,
              duration: 0.4,
              delay: 0.2 + index * 0.08,
              ease: 'back.out(2)',
            });
          },
        });
      });
    };

    // Testimonial section parallax
    const initTestimonialParallax = () => {
      const parallaxContainer = document.querySelector('[data-testimonial-parallax]');
      if (!parallaxContainer) return;

      const parallaxItems = parallaxContainer.querySelectorAll('[data-testimonial-parallax-item]');

      parallaxItems.forEach((item, index) => {
        const speed = 50 + index * 30; // Different speed for each layer

        gsap.to(item, {
          y: -speed,
          ease: 'none',
          scrollTrigger: {
            trigger: parallaxContainer,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        });
      });
    };

    // Highlight text animation (color fill on scroll)
    const initHighlightText = () => {
      const highlights = document.querySelectorAll('[data-highlight-text]');

      highlights.forEach((highlight) => {
        // Create a clip-path animation for color reveal
        gsap.set(highlight, { 
          backgroundSize: '0% 100%',
          backgroundPosition: 'left center',
        });

        ScrollTrigger.create({
          trigger: highlight,
          start: 'top 80%',
          end: 'top 50%',
          scrub: true,
          onUpdate: (self) => {
            // Animate background gradient for highlight effect
            gsap.set(highlight, {
              backgroundSize: `${self.progress * 100}% 100%`,
            });
          },
        });
      });
    };

    // Payment section animations
    const initPaymentSection = () => {
      const payment = document.querySelector('[data-payment]');
      if (!payment) return;

      const items = payment.querySelectorAll('[data-payment-item]');

      items.forEach((item, index) => {
        gsap.set(item, { opacity: 0, y: 40, scale: 0.9 });

        ScrollTrigger.create({
          trigger: item,
          start: 'top 85%',
          onEnter: () => {
            gsap.to(item, {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.5,
              delay: index * 0.08,
              ease: 'power2.out',
            });
          },
        });
      });
    };

    // Fill line SVG animations
    const initFillLines = () => {
      const fillLines = document.querySelectorAll('[data-fill-line]');

      fillLines.forEach((svg) => {
        const path = svg.querySelector('path');
        if (!path) return;

        const length = (path as SVGPathElement).getTotalLength?.() || 1000;
        gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });

        ScrollTrigger.create({
          trigger: svg,
          start: 'top 80%',
          end: 'bottom 50%',
          scrub: true,
          onUpdate: (self) => {
            gsap.set(path, {
              strokeDashoffset: length * (1 - self.progress),
            });
          },
        });
      });
    };

    // Navbar show/hide on scroll
    const initNavbar = () => {
      const navbar = document.querySelector('[data-load-nav]');
      if (!navbar) return;

      let lastScrollY = 0;

      ScrollTrigger.create({
        start: 'top top',
        end: 'max',
        onUpdate: (self) => {
          const currentScrollY = self.scroll();
          const direction = currentScrollY > lastScrollY ? 'down' : 'up';
          
          if (currentScrollY > 100) {
            if (direction === 'down') {
              gsap.to(navbar, { y: -100, duration: 0.3, ease: 'power2.out' });
            } else {
              gsap.to(navbar, { y: 0, duration: 0.3, ease: 'power2.out' });
            }
          } else {
            gsap.to(navbar, { y: 0, duration: 0.3, ease: 'power2.out' });
          }

          lastScrollY = currentScrollY;
        },
      });
    };

    // Video controls (sound toggle)
    const initVideoControls = () => {
      const videoButtons = document.querySelectorAll('[data-video-button]');
      const videos = document.querySelectorAll('[data-video]');

      // Autoplay videos when in view
      videos.forEach((video) => {
        ScrollTrigger.create({
          trigger: video,
          start: 'top 80%',
          end: 'bottom 20%',
          onEnter: () => {
            (video as HTMLVideoElement).play?.();
          },
          onLeave: () => {
            (video as HTMLVideoElement).pause?.();
          },
          onEnterBack: () => {
            (video as HTMLVideoElement).play?.();
          },
          onLeaveBack: () => {
            (video as HTMLVideoElement).pause?.();
          },
        });
      });

      // Sound toggle buttons
      videoButtons.forEach((button) => {
        button.addEventListener('click', () => {
          const container = button.closest('[data-inertia-item-child]') || button.parentElement;
          const video = container?.querySelector('[data-video]') as HTMLVideoElement;

          if (video) {
            video.muted = !video.muted;
            button.classList.toggle('is-active', !video.muted);
          }
        });
      });
    };

    // Initialize after a short delay to ensure DOM is ready
    const timeout = setTimeout(initAnimations, 300);

    return () => {
      clearTimeout(timeout);
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);
};

export default useScrollAnimations;
