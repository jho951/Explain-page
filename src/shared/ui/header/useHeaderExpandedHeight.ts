import { useCallback, useEffect, useLayoutEffect, useState, type RefObject } from 'react';

interface UseHeaderExpandedHeightOptions {
  headerInnerRef: RefObject<HTMLDivElement | null>;
  isExpanded: boolean;
  isMobile: boolean;
  openCategoryId: string | null;
  panelRef: RefObject<HTMLDivElement | null>;
}

function useHeaderExpandedHeight({
  headerInnerRef,
  isExpanded,
  isMobile,
  openCategoryId,
  panelRef,
}: UseHeaderExpandedHeightOptions) {
  const [expandedHeight, setExpandedHeight] = useState<number | null>(null);

  const updateExpandedHeight = useCallback(() => {
    const headerInnerEl = headerInnerRef.current;
    const panelEl = panelRef.current;
    if (!headerInnerEl || !panelEl || !isMobile || !isExpanded) return;

    const headerInnerHeight = headerInnerEl.getBoundingClientRect().height;
    const panelHeight = panelEl.getBoundingClientRect().height;
    const next = Math.ceil(headerInnerHeight + panelHeight);

    setExpandedHeight(prev => (prev === next ? prev : next));
  }, [headerInnerRef, isExpanded, isMobile, panelRef]);

  useLayoutEffect(() => {
    if (!isMobile || !isExpanded) {
      setExpandedHeight(null);
      return;
    }

    const raf = requestAnimationFrame(updateExpandedHeight);
    return () => cancelAnimationFrame(raf);
  }, [isMobile, isExpanded, openCategoryId, updateExpandedHeight]);

  useEffect(() => {
    const panelEl = panelRef.current;
    if (!isMobile || !isExpanded || !panelEl) return;

    const observer = new ResizeObserver(() => updateExpandedHeight());
    observer.observe(panelEl);

    return () => observer.disconnect();
  }, [isMobile, isExpanded, panelRef, updateExpandedHeight]);

  useEffect(() => {
    const panelEl = panelRef.current;
    if (!isMobile || !isExpanded || !panelEl) return;

    const handleTransitionEnd = (event: TransitionEvent) => {
      if (!(event.target instanceof HTMLElement)) return;
      if (!panelEl.contains(event.target)) return;

      updateExpandedHeight();
    };

    panelEl.addEventListener('transitionend', handleTransitionEnd);
    return () => panelEl.removeEventListener('transitionend', handleTransitionEnd);
  }, [isMobile, isExpanded, panelRef, updateExpandedHeight]);

  return { expandedHeight };
}

export { useHeaderExpandedHeight };
