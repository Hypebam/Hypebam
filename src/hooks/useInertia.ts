import { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface Point {
  x: number;
  y: number;
}

/**
 * Hook for mouse inertia/parallax effects on elements
 * Elements with [data-inertia-item] will move based on mouse position
 */
export const useInertia = () => {
  const mouseRef = useRef<Point>({ x: 0, y: 0 });
  const targetRef = useRef<Point>({ x: 0, y: 0 });
  const isInitializedRef = useRef(false);

  useEffect(() => {
    if (isInitializedRef.current) return;
    isInitializedRef.current = true;

    const inertiaContainers = document.querySelectorAll('[data-inertia]');

    if (inertiaContainers.length === 0) return;

    // Store original positions and settings for each item
    const itemsData: Array<{
      element: HTMLElement;
      child: HTMLElement | null;
      speed: number;
      maxMove: number;
    }> = [];

    inertiaContainers.forEach((container) => {
      const items = container.querySelectorAll('[data-inertia-item]');
      items.forEach((item) => {
        const child = item.querySelector('[data-inertia-item-child]') as HTMLElement;
        const speed = parseFloat(item.getAttribute('data-inertia-speed') || '0.05');
        const maxMove = parseFloat(item.getAttribute('data-inertia-max') || '15');

        itemsData.push({
          element: item as HTMLElement,
          child: child,
          speed,
          maxMove,
        });
      });
    });

    // Handle mouse move
    const handleMouseMove = (e: MouseEvent) => {
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;

      // Normalize mouse position to -1 to 1
      targetRef.current = {
        x: (e.clientX / windowWidth - 0.5) * 2,
        y: (e.clientY / windowHeight - 0.5) * 2,
      };
    };

    // Animation loop for smooth interpolation
    let animationId: number;

    const animate = () => {
      // Lerp towards target
      const lerpFactor = 0.08;
      mouseRef.current.x += (targetRef.current.x - mouseRef.current.x) * lerpFactor;
      mouseRef.current.y += (targetRef.current.y - mouseRef.current.y) * lerpFactor;

      // Apply transforms to items
      itemsData.forEach((item, index) => {
        const target = item.child || item.element;
        const multiplier = 1 + index * 0.2; // Varying effect per item
        const maxMove = item.maxMove * multiplier;

        const moveX = mouseRef.current.x * maxMove;
        const moveY = mouseRef.current.y * maxMove;

        gsap.set(target, {
          x: moveX,
          y: moveY,
        });
      });

      animationId = requestAnimationFrame(animate);
    };

    // Start animation loop
    animate();

    // Add event listeners
    window.addEventListener('mousemove', handleMouseMove);

    // Touch support
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        handleMouseMove({ clientX: touch.clientX, clientY: touch.clientY } as MouseEvent);
      }
    };

    window.addEventListener('touchmove', handleTouchMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      cancelAnimationFrame(animationId);
    };
  }, []);
};

export default useInertia;
