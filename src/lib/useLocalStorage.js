// lib/useLocalStorage.js
"use client";

import { useEffect, useState } from "react";

export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(initialValue);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    try {
      const item = window.localStorage.getItem(key);
      if (item) {
        setValue(JSON.parse(item));
      }
    } catch (err) {
      console.error(`Error reading localStorage key "${key}"`, err);
    } finally {
      setIsHydrated(true);
    }
  }, [key]);

  useEffect(() => {
    if (!isHydrated) return;
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (err) {
      console.error(`Error setting localStorage key "${key}"`, err);
    }
  }, [key, value, isHydrated]);

  return [value, setValue, isHydrated];
}
