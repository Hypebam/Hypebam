import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Hook for the sequence section scroll animation
 * Shows 200-frame canvas animation tied to scroll
 * Also handles the statement cards animations
 */
export const useSequenceAnimation = () => {
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef(0);
  const isInitializedRef = useRef(false);

  useEffect(() => {
    if (isInitializedRef.current) return;
    isInitializedRef.current = true;

    const section = document.querySelector('[data-sequence]');
    const trigger = document.querySelector('[data-sequence-trigger]');
    const stage = document.querySelector('[data-sequence-stage]');
    const canvas = document.querySelector('[data-sequence-canvas]') as HTMLCanvasElement;
    const cards = document.querySelectorAll('[data-sequence-card]');
    const cardsLeft = document.querySelectorAll('[data-sequence-card-left]');
    const smileys = document.querySelectorAll('[data-sequence-smiley]');
    const smileysLeft = document.querySelectorAll('[data-sequence-smiley-left]');
    const title = document.querySelector('[data-sequence-title]');
    const titleSplit = document.querySelector('[data-sequence-title-split]');
    const finalSignatures = document.querySelectorAll('[data-sequence-final-signature]');
    const svgLines = document.querySelectorAll('[data-sequence-svg]');
    const innerSignature = document.querySelector('[data-sequence-signature]');
    const cookies = document.querySelectorAll('[data-sequence-cookie-first], [data-sequence-cookie-second]');
    const strawberries = document.querySelectorAll('[data-sequence-strawberry-first], [data-sequence-strawberry-second]');

    if (!canvas || !trigger || !stage) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    const imgPath = canvas.getAttribute('data-sequence-canvas-img-path') || '/img/';
    const frameCount = 90; // Sequence has 90 frames
    const images: HTMLImageElement[] = [];

    // Preload images
    const preloadImages = (): Promise<void> => {
      return new Promise((resolve) => {
        let loadedCount = 0;

        for (let i = 0; i < frameCount; i++) {
          const img = new Image();
          // Sequence images are named hypeBamvideo001.webp to hypeBamvideo090.webp
          img.src = `${imgPath}hypeBamvideo00${i + 1}.webp`;

          img.onload = () => {
            loadedCount++;
            if (loadedCount === frameCount) {
              resolve();
            }
          };

          img.onerror = () => {
            loadedCount++;
            if (loadedCount === frameCount) {
              resolve();
            }
          };

          images.push(img);
        }

        imagesRef.current = images;
      });
    };

    // Render frame
    const renderFrame = (frameIndex: number) => {
      const img = imagesRef.current[frameIndex];
      if (!img || !img.complete) return;

      const dpr = window.devicePixelRatio || 1;
      const width = canvas.width / dpr;
      const height = canvas.height / dpr;

      // Save, reset transform, draw, restore
      context.save();
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      context.clearRect(0, 0, width, height);

      // Cover fit
      const imgRatio = img.width / img.height;
      const canvasRatio = width / height;

      let drawWidth: number, drawHeight: number, drawX: number, drawY: number;

      if (imgRatio > canvasRatio) {
        drawHeight = height;
        drawWidth = drawHeight * imgRatio;
        drawX = (width - drawWidth) / 2;
        drawY = 0;
      } else {
        drawWidth = width;
        drawHeight = drawWidth / imgRatio;
        drawX = 0;
        drawY = (height - drawHeight) / 2;
      }

      context.drawImage(img, drawX, drawY, drawWidth, drawHeight);
      context.restore();
    };

    // Set canvas size
    const setCanvasSize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
    };

    // Create scroll animation
    const createScrollAnimation = () => {
      // Canvas frame animation
      const frameObj = { frame: 0 };

      gsap.to(frameObj, {
        frame: frameCount - 1,
        ease: 'none',
        scrollTrigger: {
          trigger: trigger,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.5,
          pin: stage,
          onUpdate: () => {
            const newFrame = Math.round(frameObj.frame);
            if (newFrame !== currentFrameRef.current) {
              currentFrameRef.current = newFrame;
              renderFrame(newFrame);
            }
          },
        },
      });

      // Card animations - appear and disappear based on scroll
      cards.forEach((card, index) => {
        const isLeft = card.hasAttribute('data-sequence-card-left');
        const startX = isLeft ? -100 : 100;

        gsap.set(card, { opacity: 0, x: startX, scale: 0.9 });

        // Calculate timing based on card index
        const cardStart = 0.1 + index * 0.2;
        const cardEnd = cardStart + 0.15;

        ScrollTrigger.create({
          trigger: trigger,
          start: `${cardStart * 100}% top`,
          end: `${cardEnd * 100}% top`,
          scrub: true,
          onUpdate: (self) => {
            const progress = self.progress;
            if (progress < 0.5) {
              // Fade in
              const fadeInProgress = progress * 2;
              gsap.set(card, {
                opacity: fadeInProgress,
                x: startX * (1 - fadeInProgress),
                scale: 0.9 + 0.1 * fadeInProgress,
              });
            } else {
              // Fade out
              const fadeOutProgress = (progress - 0.5) * 2;
              gsap.set(card, {
                opacity: 1 - fadeOutProgress,
                x: -startX * fadeOutProgress,
                scale: 1 - 0.1 * fadeOutProgress,
              });
            }
          },
        });
      });

      // Smiley rotations
      smileys.forEach((smiley) => {
        gsap.to(smiley, {
          rotation: 360,
          ease: 'none',
          scrollTrigger: {
            trigger: trigger,
            start: 'top top',
            end: 'bottom bottom',
            scrub: true,
          },
        });
      });

      smileysLeft.forEach((smiley) => {
        gsap.to(smiley, {
          rotation: -360,
          ease: 'none',
          scrollTrigger: {
            trigger: trigger,
            start: 'top top',
            end: 'bottom bottom',
            scrub: true,
          },
        });
      });

      // Title animation at the end
      if (title) {
        gsap.set(title, { opacity: 0, y: 50 });
        
        ScrollTrigger.create({
          trigger: trigger,
          start: '70% top',
          end: '80% top',
          scrub: true,
          onUpdate: (self) => {
            gsap.set(title, {
              opacity: self.progress,
              y: 50 * (1 - self.progress),
            });
          },
        });
      }

      // Final signatures fade in
      finalSignatures.forEach((sig, index) => {
        gsap.set(sig, { opacity: 0, y: 30 });
        
        ScrollTrigger.create({
          trigger: trigger,
          start: `${75 + index * 3}% top`,
          end: `${85 + index * 3}% top`,
          scrub: true,
          onUpdate: (self) => {
            gsap.set(sig, {
              opacity: self.progress,
              y: 30 * (1 - self.progress),
            });
          },
        });
      });

      // SVG line draw animations
      svgLines.forEach((svg, index) => {
        const path = svg.querySelector('path');
        if (path) {
          const length = (path as SVGPathElement).getTotalLength?.() || 2000;
          gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });

          ScrollTrigger.create({
            trigger: trigger,
            start: `${20 + index * 25}% top`,
            end: `${45 + index * 25}% top`,
            scrub: true,
            onUpdate: (self) => {
              gsap.set(path, {
                strokeDashoffset: length * (1 - self.progress),
              });
            },
          });
        }
      });

      // Inner signature
      if (innerSignature) {
        gsap.set(innerSignature, { opacity: 0, scale: 0.8 });
        
        ScrollTrigger.create({
          trigger: trigger,
          start: '50% top',
          end: '60% top',
          scrub: true,
          onUpdate: (self) => {
            gsap.set(innerSignature, {
              opacity: self.progress,
              scale: 0.8 + 0.2 * self.progress,
            });
          },
        });
      }

      // Cookies and strawberries floating animation
      cookies.forEach((cookie, index) => {
        gsap.set(cookie, { opacity: 0, y: 50, rotation: index * 15 });
        
        ScrollTrigger.create({
          trigger: trigger,
          start: '80% top',
          end: '95% top',
          scrub: true,
          onUpdate: (self) => {
            gsap.set(cookie, {
              opacity: self.progress,
              y: 50 * (1 - self.progress),
              rotation: (index * 15) + self.progress * 10,
            });
          },
        });
      });

      strawberries.forEach((strawberry, index) => {
        gsap.set(strawberry, { opacity: 0, y: 50, rotation: -index * 10 });
        
        ScrollTrigger.create({
          trigger: trigger,
          start: '80% top',
          end: '95% top',
          scrub: true,
          onUpdate: (self) => {
            gsap.set(strawberry, {
              opacity: self.progress,
              y: 50 * (1 - self.progress),
              rotation: (-index * 10) - self.progress * 10,
            });
          },
        });
      });

      // Mark sequence as ready
      document.documentElement.classList.add('has-seq-ready');
    };

    // Initialize
    const init = async () => {
      setCanvasSize();
      await preloadImages();
      renderFrame(0);
      createScrollAnimation();
    };

    // Wait for fonts and initial animations
    const startTimeout = setTimeout(() => {
      init();
    }, 500);

    // Handle resize
    const handleResize = () => {
      setCanvasSize();
      renderFrame(currentFrameRef.current);
      ScrollTrigger.refresh();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      clearTimeout(startTimeout);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return { currentFrame: currentFrameRef };
};

export default useSequenceAnimation;
