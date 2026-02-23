import { useState, useRef, useCallback } from 'react';

export function useAsyncAction() {
  const [loading, setLoading] = useState(false);
  const lockRef = useRef(false);

  const execute = useCallback(async <T>(fn: () => Promise<T>): Promise<T | undefined> => {
    if (lockRef.current) return;
    lockRef.current = true;
    setLoading(true);
    try {
      return await fn();
    } finally {
      lockRef.current = false;
      setLoading(false);
    }
  }, []);

  return { execute, loading };
}
