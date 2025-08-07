import { useEffect } from 'react';

/**
 * useIntersectionObserver - Intersection Observer API를 활용해
 * 주어진 ref 요소가 뷰포트에 진입했을 때 콜백 함수를 실행하는 React 훅입니다.
 *
 * @param {React.RefObject<Element | null>} ref - 관찰할 DOM 요소의 ref
 * @param {() => void} callback - 요소가 뷰포트에 진입할 때 호출할 함수
 * @param {IntersectionObserverInit} [options] - IntersectionObserver 옵션 (threshold, root, rootMargin 등)
 *
 * @example
 * ```tsx
 * import { useRef } from 'react';
 * import { useIntersectionObserver } from './useIntersectionObserver';
 *
 * function MyComponent() {
 *   const ref = useRef<HTMLDivElement>(null);
 *
 *   useIntersectionObserver(ref, () => {
 *     console.log('요소가 화면에 진입했습니다!');
 *   }, { threshold: 0.5 });
 *
 *   return <div ref={ref}>관찰 대상 요소</div>;
 * }
 * ```
 */
function useIntersectionObserver(
  ref: React.RefObject<Element | null>,
  callback: () => void,
  options?: IntersectionObserverInit,
) {
  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) callback();
    }, options);

    observer.observe(node);
    return () => observer.disconnect();
  }, [ref, callback, options]);
}

export { useIntersectionObserver };
