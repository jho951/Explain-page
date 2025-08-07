import { useEffect, useRef } from 'react';

/**
 * 자동 저장하는 훅입니다.
 * useAutosave 훅 사용법
 *
 * @template T
 * @param {T} value - 감시할 값(객체, 배열, 문자열 등)
 * @param {number} delay - debounce 시간(ms)
 * @param {(value: T) => void} onSave - debounce 후 실행할 콜백
 *
 * @example
 * useAutosave({ title, content }, 1000, (draft) => {
 *   // draft: { title, content }
 *   // API 호출 등 처리
 * });
 */
function useAutosave<T>(value: T, delay: number, onSave: (value: T) => void) {
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!value) return;
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      onSave(value);
    }, delay);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [value, delay, onSave]);
}

export { useAutosave };
