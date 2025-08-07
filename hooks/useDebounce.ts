import { useRef, useCallback, useState, useEffect } from 'react';

/**
 * useDebouncedValue - 값 디바운스 훅
 *
 * 지정한 delay(ms) 동안 값(value)의 변경을 지연시켜 최종 값만 업데이트합니다.
 * 주로 사용자 입력값에 따라 API 요청이나 무거운 작업을 디바운스할 때 유용합니다.
 *
 * @template T - 디바운스할 값의 타입
 * @param {T} value - 디바운스 대상 값
 * @param {number} delay - 지연 시간(밀리초)
 * @returns {T} - 디바운스된 값
 *
 * @example
 * ```tsx
 * const [search, setSearch] = useState('');
 * const debouncedSearch = useDebouncedValue(search, 300);
 *
 * useEffect(() => {
 *   if (debouncedSearch) {
 *     // debouncedSearch가 300ms 동안 변경이 없으면 실행됨
 *     fetchSearchResults(debouncedSearch);
 *   }
 * }, [debouncedSearch]);
 *
 * return <input value={search} onChange={e => setSearch(e.target.value)} />;
 * ```
 */
function useDebouncedValue<T>(value: T, delay: number): T {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounced(value);
    }, delay);

    // value 또는 delay가 변경되면 이전 타이머 클리어
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debounced;
}

/**
 * useDebouncedCallback - 콜백 함수 디바운스 훅
 *
 * 주어진 콜백 함수의 실행을 delay(ms) 동안 지연시키며,
 * 여러 번 호출되어도 마지막 호출만 실행됩니다.
 * 컴포넌트 언마운트 시 타이머를 정리하여 메모리 누수를 방지합니다.
 *
 * @template T - 콜백 함수 타입
 * @param {T} callback - 디바운스할 콜백 함수
 * @param {number} delay - 지연 시간(밀리초)
 * @returns {T} - 디바운스된 콜백 함수 (원래 콜백과 동일한 시그니처)
 *
 * @example
 * ```tsx
 * const debouncedLog = useDebouncedCallback((value: string) => {
 *   console.log('입력값:', value);
 * }, 300);
 *
 * return <input onChange={e => debouncedLog(e.target.value)} />;
 * ```
 */
function useDebouncedCallback<T extends (...args: unknown[]) => unknown>(
  callback: T,
  delay: number,
): (...args: Parameters<T>) => void {
  const timeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const debouncedFn = useCallback(
    (...args: Parameters<T>) => {
      if (timeout.current) clearTimeout(timeout.current);
      timeout.current = setTimeout(() => {
        callback(...args);
      }, delay);
    },
    [callback, delay],
  );

  useEffect(() => {
    return () => {
      if (timeout.current) clearTimeout(timeout.current);
    };
  }, []);

  return debouncedFn;
}

export { useDebouncedValue, useDebouncedCallback };
