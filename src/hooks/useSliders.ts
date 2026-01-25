import { useEffect, useRef } from 'react';
import Swiper from 'swiper';
import { Navigation, Pagination, EffectFade, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

/**
 * Hook for initializing Swiper sliders
 * Used for testimonials and flavour sliders
 */
export const useSliders = () => {
  const testimonialSwiperRef = useRef<Swiper | null>(null);
  const flavourSwiperRef = useRef<Swiper | null>(null);
  const flavourContentSwiperRef = useRef<Swiper | null>(null);
  const isInitializedRef = useRef(false);

  useEffect(() => {
    if (isInitializedRef.current) return;
    isInitializedRef.current = true;

    // Initialize testimonial slider
    const testimonialSlider = document.querySelector('[data-slider]');
    const testimonialLeftBtn = document.querySelector('[data-slider-left-button]');
    const testimonialRightBtn = document.querySelector('[data-slider-right-button]');

    if (testimonialSlider) {
      // Enable touch dragging on mobile and improve cursor UX
      const isMobile = typeof window !== 'undefined' && window.matchMedia('(max-width: 991px)').matches;

      testimonialSwiperRef.current = new Swiper(testimonialSlider as HTMLElement, {
        modules: [Navigation],
        slidesPerView: 1,
        spaceBetween: 20,
        loop: true,
        speed: 600,
        grabCursor: !!isMobile,
        allowTouchMove: !!isMobile,
        breakpoints: {
          768: {
            slidesPerView: 2,
            spaceBetween: 24,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
        },
        navigation: {
          prevEl: testimonialLeftBtn as HTMLElement,
          nextEl: testimonialRightBtn as HTMLElement,
        },
      });

      // Mark the DOM node to indicate Swiper was initialized to avoid duplicate custom slider init
      try {
        testimonialSlider.setAttribute('data-swiper-initialized', 'true');
      } catch (e) {
        // ignore
      }
    }

    // Initialize flavour product slider
    const flavourSlider = document.querySelector('[data-flavour-slider]');
    const flavourContentSlider = document.querySelector('[data-flavour-content-slider]');
    const flavourLeftBtn = document.querySelector('[data-flavour-slider-left-button]');
    const flavourRightBtn = document.querySelector('[data-flavour-slider-right-button]');

    if (flavourSlider && flavourContentSlider) {
      // Content slider (text/buttons)
      flavourContentSwiperRef.current = new Swiper(flavourContentSlider as HTMLElement, {
        modules: [EffectFade],
        slidesPerView: 1,
        effect: 'fade',
        fadeEffect: {
          crossFade: true,
        },
        speed: 600,
        allowTouchMove: false,
      });

      // Product image slider
      flavourSwiperRef.current = new Swiper(flavourSlider as HTMLElement, {
        modules: [Navigation],
        slidesPerView: 1,
        spaceBetween: 0,
        loop: true,
        speed: 600,
        navigation: {
          prevEl: flavourLeftBtn as HTMLElement,
          nextEl: flavourRightBtn as HTMLElement,
        },
        on: {
          slideChange: function (swiper) {
            // Sync content slider
            if (flavourContentSwiperRef.current) {
              flavourContentSwiperRef.current.slideTo(swiper.realIndex);
            }
          },
        },
      });
    }

    return () => {
      testimonialSwiperRef.current?.destroy(true, true);
      flavourSwiperRef.current?.destroy(true, true);
      flavourContentSwiperRef.current?.destroy(true, true);
    };
  }, []);

  return {
    testimonialSwiper: testimonialSwiperRef,
    flavourSwiper: flavourSwiperRef,
    flavourContentSwiper: flavourContentSwiperRef,
  };
};

export default useSliders;
