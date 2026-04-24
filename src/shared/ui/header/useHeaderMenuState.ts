import { useCallback, useEffect, useState, type RefObject } from 'react';

interface UseHeaderMenuStateOptions {
  headerRef: RefObject<HTMLElement | null>;
}

function useHeaderMenuState({ headerRef }: UseHeaderMenuStateOptions) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [openCategoryId, setOpenCategoryId] = useState<string | null>(null);
  const [desktopOpenIndex, setDesktopOpenIndex] = useState<number | null>(null);

  const closeAll = useCallback(() => {
    setIsExpanded(false);
    setOpenCategoryId(null);
    setDesktopOpenIndex(null);
  }, []);

  const toggleMobileMenu = useCallback(() => {
    setIsExpanded(prev => !prev);
  }, []);

  const toggleCategory = useCallback((categoryId: string) => {
    setOpenCategoryId(prev => (prev === categoryId ? null : categoryId));
  }, []);

  const toggleDesktopMenu = useCallback((index: number) => {
    setDesktopOpenIndex(prev => (prev === index ? null : index));
  }, []);

  useEffect(() => {
    if (desktopOpenIndex === null) return;

    const handlePointerDown = (event: PointerEvent) => {
      if (headerRef.current?.contains(event.target as Node)) return;
      setDesktopOpenIndex(null);
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setDesktopOpenIndex(null);
    };

    window.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [desktopOpenIndex, headerRef]);

  return {
    closeAll,
    desktopOpenIndex,
    isExpanded,
    openCategoryId,
    toggleCategory,
    toggleDesktopMenu,
    toggleMobileMenu,
  };
}

export { useHeaderMenuState };
