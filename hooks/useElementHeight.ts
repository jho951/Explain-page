import { useEffect, useState, RefObject } from 'react';

/**
 * useElementHeight - 주어진 ref가 가리키는 HTMLElement의 높이를 측정하고 반환하는 React 훅입니다.
 * 요소 크기 변경시 자동으로 높이를 업데이트합니다.
 *
 * @template T - HTMLElement 또는 null 타입
 * @param {RefObject<T | null>} ref - 높이를 측정할 DOM 요소의 ref
 * @param {number} [defaultHeight=64] - 초기 높이 기본값 (픽셀 단위)
 * @returns {number} - 현재 요소의 높이(px)
 *
 * @example
 * ```tsx
 * import { useRef } from 'react';
 * import { useElementHeight } from './useElementHeight';
 *
 * function MyComponent() {
 *   const ref = useRef<HTMLDivElement>(null);
 *   const height = useElementHeight(ref, 0);
 *
 *   return (
 *     <div ref={ref} style={{ maxHeight: height, overflow: 'hidden' }}>
 *       내용
 *     </div>
 *   );
 * }
 * ```
 */
function useElementHeight<T extends HTMLElement | null>(
  ref: RefObject<T | null>,
  defaultHeight = 0,
): number {
  const [height, setHeight] = useState(defaultHeight);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const updateHeight = () => {
      if (ref.current) {
        setHeight(ref.current.offsetHeight);
      }
    };

    updateHeight();

    const observer = new ResizeObserver(updateHeight);
    observer.observe(element);

    return () => observer.disconnect();
  }, [ref]);

  return height;
}

export { useElementHeight };
