import { useEffect } from 'react';

export const useIntersectionObserver = <T extends HTMLElement>(
  elems: Array<T>,
  callback: IntersectionObserverCallback,
  root?: Document | Element | null,
  rootMargin?: string,
  threshold?: number | number[]
) => {
  const observerOptions: IntersectionObserverInit = {
    root: root || null,
    rootMargin: rootMargin || '0px',
    threshold: threshold || 0
  };

  const observer = new IntersectionObserver(callback, observerOptions);

  useEffect(() => {
    elems.forEach((entry) => {
      observer.observe(entry);
    });

    return () => {
      elems.forEach((entry) => {
        observer.unobserve(entry);
      });
    };
  }, [elems]);
};
