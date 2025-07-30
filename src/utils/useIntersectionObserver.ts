import { useState, useEffect, RefObject, useRef } from 'react';

interface IntersectionObserverOptions {
  threshold?: number | number[];
  root?: Element | null;
  rootMargin?: string;
  triggerOnce?: boolean;
}

const useIntersectionObserver = (
  options?: IntersectionObserverOptions
): [RefObject<HTMLDivElement | null>, boolean] => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true);
          if (options?.triggerOnce) {
            observer.unobserve(element);
          }
        } else {
          if (!options?.triggerOnce) {
             setIsIntersecting(false); // Optionally reset if triggerOnce is false
          }
        }
      },
      {
        threshold: options?.threshold ?? 0.1,
        root: options?.root ?? null,
        rootMargin: options?.rootMargin ?? '0px',
      }
    );

    observer.observe(element);

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [options]); // Re-run effect if options change

  return [elementRef, isIntersecting];
};

export default useIntersectionObserver; 