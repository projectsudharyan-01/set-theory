import { useEffect, useRef } from 'react';

/**
 * Adds the `revealed` class to any descendant element with a `reveal`,
 * `reveal-scale`, `reveal-spin` or `stagger` class when it scrolls into view.
 * Returns a ref to attach to the scrollable root (defaults to window).
 */
export function useScrollReveal<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const root = ref.current ?? document;
    const els = Array.from(root.querySelectorAll<HTMLElement>(
      '.reveal, .reveal-scale, .reveal-spin, .stagger'
    ));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
    );

    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return ref;
}
