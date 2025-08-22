import { useState, useEffect, RefObject } from 'react';

export default function useInViewTOC<T extends HTMLElement>(
  refs: RefObject<T>[],
  options?: IntersectionObserverInit
): number {
  const [activeIndex, setActiveIndex] = useState<number>(-1);

  useEffect(() => {
    const observerCallback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = refs.findIndex(ref => ref.current === entry.target);
          if (index !== -1) {
            setActiveIndex(index);
          }
        }
      });
    };

    const observer = new IntersectionObserver(
      observerCallback,
      {
        root: null,
        rootMargin: '0px 0px -70% 0px',
        threshold: 0.1,
        ...options
      }
    );

    // Observe all non-null refs
    refs.forEach((ref) => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [refs, options]);

  return activeIndex;
} 