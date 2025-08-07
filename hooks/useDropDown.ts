import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * useDropdown 훅
 *
 * 드롭다운(혹은 팝오버/메뉴 등)의 열림/닫힘 상태, 접근성(ESC 닫기, 포커스), container ref 등을 관리하는 커스텀 훅입니다.
 *
 * - ESC 키로 닫기 기능 내장
 * - 드롭다운 오픈 시 첫 번째 focusable 엘리먼트에 자동 포커스
 * - containerRef를 반환하여 드롭다운 wrapper에 적용
 *
 * @param {boolean} [initialOpen=false] - 최초 open 여부 (default: false)
 * @returns {{
 *   isOpen: boolean;
 *   setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
 *   toggle: () => void;
 *   close: () => void;
 *   open: () => void;
 *   containerRef: React.RefObject<HTMLDivElement>;
 * }}
 *
 * @example
 * // 사용 예시
 * import { useDropdown } from '@/hooks/useDropdown';
 *
 * function DropdownMenu() {
 *   const dropdown = useDropdown();
 *
 *   return (
 *     <div ref={dropdown.containerRef}>
 *       <button onClick={dropdown.toggle}>
 *         메뉴 열기
 *       </button>
 *       {dropdown.isOpen && (
 *         <div className="dropdown-panel">
 *           <button>첫 버튼</button>
 *           <button onClick={dropdown.close}>닫기</button>
 *         </div>
 *       )}
 *     </div>
 *   );
 * }
 */
export function useDropdown(initialOpen = false) {
  const [isOpen, setIsOpen] = useState(initialOpen);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsOpen(false);
    }
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    window.addEventListener('keydown', handleKeyDown);

    // 드롭다운 열리면 첫 focusable 요소에 포커스
    const focusable = containerRef.current?.querySelector<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    );
    focusable?.focus();

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, handleKeyDown]);

  return {
    isOpen,
    setIsOpen,
    toggle: () => setIsOpen(prev => !prev),
    close: () => setIsOpen(false),
    open: () => setIsOpen(true),
    containerRef,
  };
}
