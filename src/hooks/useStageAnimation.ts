import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Hook for the stage/hero loading animation
 * Handles the initial page load animation and canvas sequence
 */
export const useStageAnimation = () => {
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef(0);
  const isInitializedRef = useRef(false);

  useEffect(() => {
    if (isInitializedRef.current) return;
    isInitializedRef.current = true;

    const stage = document.querySelector('[data-load-stage]');
    const canvas = document.querySelector('[data-load-stage-canvas]') as HTMLCanvasElement;
    const lottieLogo = document.querySelector('[data-load-stage-logo-lottie]') as any;
    const stageTitle = document.querySelector('[data-load-stage-title]');
    const stageText = document.querySelector('[data-load-stage-text]');
    const stageCta = document.querySelector('[data-load-stage-cta]');
    const stageFacts = document.querySelectorAll('[data-load-stage-fact]');
    const stageSvg = document.querySelector('[data-load-stage-svg]');
    const stageDecoText = document.querySelector('[data-load-stage-deco-text]');
    const stageDecoArrow = document.querySelector('[data-load-stage-deco-arrow]');
    const stageUnderline = document.querySelector('[data-load-stage-underline]');

    if (!canvas) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    const imgPath = canvas.getAttribute('data-load-stage-canvas-img-path') || '/img/';
    const frameCount = 90; // Stage animation has 23 frames
    const images: HTMLImageElement[] = [];

    // Preload images
    const preloadImages = (): Promise<void> => {
      return new Promise((resolve) => {
        let loadedCount = 0;

        for (let i = 1; i <= frameCount; i++) {
          const img = new Image();
          // Format image number with zero-padding: hypeBamvideo001.webp to hypeBamvideo090.webp
          const paddedNum = i.toString().padStart(3, '0');
          img.src = `${imgPath}hypeBamvideo${paddedNum}.webp`;

          img.onload = () => {
            loadedCount++;
            if (loadedCount === frameCount) {
              resolve();
            }
          };

          img.onerror = () => {
            console.error(`Failed to load image: ${img.src}`);
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

      // Use the canvas's style dimensions (which we set to match image aspect ratio)
      const width = parseFloat(canvas.style.width) || canvas.width / dpr;
      const height = parseFloat(canvas.style.height) || canvas.height / dpr;

      // Save, reset transform, draw, restore
      context.save();
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      context.clearRect(0, 0, width, height);

      // Contain fit - preserves original aspect ratio without cropping
      const imgRatio = img.width / img.height;
      const canvasRatio = width / height;

      let drawWidth: number, drawHeight: number, drawX: number, drawY: number;

      if (imgRatio > canvasRatio) {
        // Image is wider than canvas - fit to width
        drawWidth = width;
        drawHeight = drawWidth / imgRatio;
        drawX = 0;
        drawY = (height - drawHeight) / 2;
      } else {
        // Image is taller than canvas - fit to height
        drawHeight = height;
        drawWidth = drawHeight * imgRatio;
        drawX = (width - drawWidth) / 2;
        drawY = 0;
      }

      context.drawImage(img, drawX, drawY, drawWidth, drawHeight);
      context.restore();
    };

    // Set canvas size maintaining original image aspect ratio (1466 x 1822)
    const setCanvasSize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();

      // If we have a loaded image, use its aspect ratio
      const firstImage = imagesRef.current[0];
      if (firstImage && firstImage.complete && firstImage.naturalWidth && firstImage.naturalHeight) {
        const imageRatio = firstImage.naturalWidth / firstImage.naturalHeight;

        // Get the available container width
        const containerWidth = rect.width;

        // Calculate height to maintain aspect ratio
        const calculatedHeight = containerWidth / imageRatio;

        console.log('🖼️ Image dimensions:', {
          naturalWidth: firstImage.naturalWidth,
          naturalHeight: firstImage.naturalHeight,
          aspectRatio: `${firstImage.naturalWidth}:${firstImage.naturalHeight}`,
          ratioDecimal: imageRatio,
          containerWidth,
          calculatedHeight
        });

        // Set canvas buffer size (for rendering)
        canvas.width = containerWidth * dpr;
        canvas.height = calculatedHeight * dpr;

        // Set canvas display size with exact aspect ratio
        canvas.style.setProperty('width', '100%', 'important');
        canvas.style.setProperty('height', 'auto', 'important');
        canvas.style.setProperty('aspect-ratio', `${firstImage.naturalWidth} / ${firstImage.naturalHeight}`, 'important');
        canvas.style.setProperty('display', 'block', 'important');
        canvas.style.setProperty('max-width', 'none', 'important');

        // Set parent containers to allow full width and maintain aspect ratio
        let parent = canvas.parentElement;
        let depth = 0;
        while (parent && !parent.classList.contains('stage') && depth < 5) {
          parent.style.setProperty('width', '100%', 'important');
          parent.style.setProperty('height', 'auto', 'important');
          parent.style.setProperty('max-width', 'none', 'important');
          parent = parent.parentElement;
          depth++;
        }

        console.log('✅ Canvas aspect ratio set to:', `${firstImage.naturalWidth}:${firstImage.naturalHeight} (${imageRatio.toFixed(4)})`);
      } else {
        console.log('⚠️ Fallback: Image not loaded yet, using container dimensions');
        // Fallback: use container dimensions
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
      }
    };

    // Create loading animation timeline
    const createLoadingAnimation = () => {
      const tl = gsap.timeline({
        defaults: {
          ease: 'power3.out',
          duration: 1,
        },
      });

      // Animate canvas frames
      const frameObj = { frame: 0 };
      tl.to(frameObj, {
        frame: frameCount - 1,
        duration: 1.5,
        ease: 'power2.inOut',
        onUpdate: () => {
          const newFrame = Math.round(frameObj.frame);
          if (newFrame !== currentFrameRef.current) {
            currentFrameRef.current = newFrame;
            renderFrame(newFrame);
          }
        },
      }, 0);

      // Play lottie animation
      if (lottieLogo && typeof lottieLogo.play === 'function') {
        tl.add(() => {
          lottieLogo.play();
        }, 0.3);
      }

      // Animate stage title
      if (stageTitle) {
        gsap.set(stageTitle, { opacity: 0, y: 30 });
        tl.to(stageTitle, { opacity: 1, y: 0, duration: 0.8 }, 0.5);
      }

      // Animate stage text
      if (stageText) {
        gsap.set(stageText, { opacity: 0, y: 20 });
        tl.to(stageText, { opacity: 1, y: 0, duration: 0.8 }, 0.7);
      }

      // Animate CTA
      if (stageCta) {
        gsap.set(stageCta, { opacity: 0, y: 20 });
        tl.to(stageCta, { opacity: 1, y: 0, duration: 0.6 }, 0.9);
      }

      // Animate facts
      stageFacts.forEach((fact, index) => {
        gsap.set(fact, { opacity: 0, y: 30, scale: 0.9 });
        tl.to(fact, { opacity: 1, y: 0, scale: 1, duration: 0.6 }, 1 + index * 0.1);
      });

      // Animate SVG circle
      if (stageSvg) {
        const path = stageSvg.querySelector('path');
        if (path) {
          const length = (path as SVGPathElement).getTotalLength?.() || 1000;
          gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
          tl.to(path, { strokeDashoffset: 0, duration: 1.5, ease: 'power2.inOut' }, 0.3);
        }
      }

      // Animate decorative elements
      if (stageDecoText) {
        gsap.set(stageDecoText, { opacity: 0, x: -20 });
        tl.to(stageDecoText, { opacity: 1, x: 0, duration: 0.8 }, 1.2);
      }

      if (stageDecoArrow) {
        gsap.set(stageDecoArrow, { opacity: 0, scale: 0.8 });
        tl.to(stageDecoArrow, { opacity: 1, scale: 1, duration: 0.6 }, 1.4);
      }

      if (stageUnderline) {
        gsap.set(stageUnderline, { opacity: 0, scaleX: 0 });
        tl.to(stageUnderline, { opacity: 1, scaleX: 1, duration: 0.6, transformOrigin: 'left center' }, 1);
      }

      // Mark page as ready
      tl.add(() => {
        document.documentElement.classList.add('is-ready', 'fonts-loaded');
      }, 1.5);

      return tl;
    };

    // Initialize
    const init = async () => {
      // First load the images
      await preloadImages();

      // Now set canvas size based on loaded image dimensions
      setCanvasSize();

      // Render the first frame
      renderFrame(0);

      // Small delay to ensure everything is ready
      setTimeout(() => {
        createLoadingAnimation();
      }, 100);
    };

    init();

    // Handle resize
    const handleResize = () => {
      setCanvasSize();
      renderFrame(currentFrameRef.current);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return { currentFrame: currentFrameRef };
};

export default useStageAnimation;
