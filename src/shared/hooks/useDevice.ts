import { useEffect, useState } from 'react';

/** 마우스 hover 지원 여부 (정적 함수) */
function isHoverSupported(): boolean {
  return typeof window !== 'undefined' && window.matchMedia?.('(hover: hover)').matches;
}

/** 커스텀 훅: hover 지원 여부 */
function useIsHoverSupported(): boolean {
  const [isHover, setIsHover] = useState(false);

  useEffect(() => {
    setIsHover(isHoverSupported());
  }, []);

  return isHover;
}

/** 터치 디바이스 여부 */
function isTouchDevice(): boolean {
  if (typeof window === 'undefined') return false;
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
}

/** 커스텀 훅: 터치 디바이스 여부 */
function useIsTouchDevice(): boolean {
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    setIsTouch(isTouchDevice());
  }, []);

  return isTouch;
}

/** 커스텀 훅: 화면 크기 기반 모바일 여부 판단 */
function useIsMobile(): boolean {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const checkMobile = () => setIsMobile(window.innerWidth < 768);

    checkMobile(); // 최초 체크
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return isMobile;
}

/** 통합된 디바이스 정보 제공 훅 */
function useDeviceType(): {
  isMobile: boolean;
  isDesktop: boolean;
  isTouch: boolean;
  isHover: boolean;
} {
  const isMobile = useIsMobile();
  const isTouch = useIsTouchDevice();
  const isHover = useIsHoverSupported();

  return {
    isMobile,
    isDesktop: !isMobile,
    isTouch,
    isHover,
  };
}

export { useIsHoverSupported, useIsTouchDevice, useIsMobile, useDeviceType };
