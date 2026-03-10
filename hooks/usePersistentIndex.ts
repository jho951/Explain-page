import { useState, useEffect } from 'react';

export function usePersistentIndex(
  key: string,
  length: number,
): [number, React.Dispatch<React.SetStateAction<number>>] {
  const [index, setIndexRaw] = useState<number>(() => {
    const stored = Number(localStorage.getItem(key));
    return isNaN(stored) ? 0 : Math.min(Math.max(stored, 0), length - 1);
  });

  useEffect(() => {
    localStorage.setItem(key, String(index));
  }, [key, index]);

  const setIndex: React.Dispatch<React.SetStateAction<number>> = value => {
    setIndexRaw(prev => {
      const next = typeof value === 'function' ? (value as (prev: number) => number)(prev) : value;
      localStorage.setItem(key, String(next));
      return next;
    });
  };

  return [index, setIndex];
}
