'use client';

import { useState, useEffect, Dispatch, SetStateAction } from 'react';

type SetValue<T> = Dispatch<SetStateAction<T>>;

export function useLocalStorage<T>(key: string, initialValue: T): [T, SetValue<T>] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') {
      return initialValue;
    }
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
        try {
            const serializedState = JSON.stringify(storedValue);
            window.localStorage.setItem(key, serializedState);
        } catch (error) {
            console.error('Error setting localStorage key “' + key + '”:', error);
        }
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}
