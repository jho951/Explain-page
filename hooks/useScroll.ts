import { useEffect, useState } from 'react';

function useScrollY() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return scrollY;
}

function useScrollThresholdReached(threshold: number) {
  const [reached, setReached] = useState(false);

  useEffect(() => {
    const handler = () => {
      setReached(window.scrollY >= threshold);
    };
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, [threshold]);

  return reached;
}

/**
 * 스크롤 잠금 훅
 * @param lock - true일 때 document.body의 스크롤을 막습니다.
 */

function useScrollLock(lock: boolean) {
  useEffect(() => {
    const originalStyle = document.body.style.overflow;
    if (lock) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, [lock]);
}
function useScrollSyncIndex(
  containerRef: React.RefObject<HTMLElement | null>,
  setIndex: (index: number) => void,
  debounceMs = 100, // ⏱️ 기본값 100ms
) {
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let timeoutId: number | undefined;

    const handleScroll = () => {
      if (timeoutId) clearTimeout(timeoutId);

      timeoutId = window.setTimeout(() => {
        if (!container) return;
        const newIndex = Math.round(container.scrollLeft / container.offsetWidth);
        setIndex(newIndex);
      }, debounceMs);
    };

    container.addEventListener('scroll', handleScroll);
    return () => {
      container.removeEventListener('scroll', handleScroll);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [containerRef, setIndex, debounceMs]);
}

function useScrollDetect(delay = 100): boolean {
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    const handleScroll = () => {
      setIsScrolling(true);
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        setIsScrolling(false);
      }, delay);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timeout);
    };
  }, [delay]);

  return isScrolling;
}

export {
  useScrollY,
  useScrollThresholdReached,
  useScrollLock,
  useScrollDetect,
  useScrollSyncIndex,
};
