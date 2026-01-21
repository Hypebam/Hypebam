import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface CanvasAnimationConfig {
  canvasSelector: string;
  triggerSelector: string;
  frameCount: number;
  imagePath: string;
  imagePrefix?: string;
  imageExtension?: string;
  scrub?: number | boolean;
  start?: string;
  end?: string;
  pin?: boolean;
}

/**
 * Hook for canvas-based frame sequence animations
 * Used for the stage hero animation and sequence section
 */
export const useCanvasSequence = (config: CanvasAnimationConfig) => {
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const currentFrameRef = useRef(0);

  useEffect(() => {
    const canvas = document.querySelector(config.canvasSelector) as HTMLCanvasElement;
    const trigger = document.querySelector(config.triggerSelector);

    if (!canvas || !trigger) return;

    const context = canvas.getContext('2d');
    if (!context) return;
    contextRef.current = context;

    // Build image paths
    const images: HTMLImageElement[] = [];
    const ext = config.imageExtension || 'webp';
    const prefix = config.imagePrefix || '';

    // Preload all images
    const preloadImages = (): Promise<void[]> => {
      const loadPromises: Promise<void>[] = [];

      for (let i = 0; i < config.frameCount; i++) {
        const img = new Image();
        const paddedIndex = String(i).padStart(4, '0');
        img.src = `${config.imagePath}${prefix}${paddedIndex}.${ext}`;
        
        const promise = new Promise<void>((resolve) => {
          img.onload = () => resolve();
          img.onerror = () => resolve(); // Continue even if image fails
        });
        
        loadPromises.push(promise);
        images.push(img);
      }

      imagesRef.current = images;
      return Promise.all(loadPromises);
    };

    // Render a specific frame
    const renderFrame = (frameIndex: number) => {
      const img = imagesRef.current[frameIndex];
      if (!img || !img.complete || !contextRef.current) return;

      const ctx = contextRef.current;
      const canvasEl = ctx.canvas;

      // Clear canvas
      ctx.clearRect(0, 0, canvasEl.width, canvasEl.height);

      // Calculate dimensions to cover canvas while maintaining aspect ratio
      const imgRatio = img.width / img.height;
      const canvasRatio = canvasEl.width / canvasEl.height;

      let drawWidth: number, drawHeight: number, drawX: number, drawY: number;

      if (imgRatio > canvasRatio) {
        // Image is wider - fit height
        drawHeight = canvasEl.height;
        drawWidth = drawHeight * imgRatio;
        drawX = (canvasEl.width - drawWidth) / 2;
        drawY = 0;
      } else {
        // Image is taller - fit width
        drawWidth = canvasEl.width;
        drawHeight = drawWidth / imgRatio;
        drawX = 0;
        drawY = (canvasEl.height - drawHeight) / 2;
      }

      ctx.drawImage(img, drawX, drawY, drawWidth, drawHeight);
    };

    // Set canvas size
    const setCanvasSize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      context.scale(dpr, dpr);
      renderFrame(currentFrameRef.current);
    };

    // Initialize
    const init = async () => {
      setCanvasSize();
      await preloadImages();

      // Render first frame
      renderFrame(0);

      // Create animation object for GSAP to animate
      const frameObj = { frame: 0 };

      // Create ScrollTrigger animation
      gsap.to(frameObj, {
        frame: config.frameCount - 1,
        ease: 'none',
        snap: 'frame',
        scrollTrigger: {
          trigger: config.triggerSelector,
          start: config.start || 'top top',
          end: config.end || 'bottom bottom',
          scrub: config.scrub ?? 0.5,
          pin: config.pin ?? false,
        },
        onUpdate: () => {
          const newFrame = Math.round(frameObj.frame);
          if (newFrame !== currentFrameRef.current) {
            currentFrameRef.current = newFrame;
            renderFrame(newFrame);
          }
        },
      });

      // Add HTML class to indicate sequence is ready
      document.documentElement.classList.add('has-seq-ready');
    };

    init();

    // Handle resize
    const handleResize = () => {
      setCanvasSize();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, [config]);

  return { currentFrame: currentFrameRef };
};

export default useCanvasSequence;
