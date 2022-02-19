import { Dispatch, useCallback, useState } from "react";

interface Props<T> {
  key: string;
  keyPrefix?: string;
  initialValue: T;
}

// Hook
export default function useLocalStorage<T>(
  props: Props<T>
): [T, (value: T) => void] {
  const { key, keyPrefix = "", initialValue } = props;
  const generatedKey = `${keyPrefix}:${key}`;

  const setByPath = (value: T, setStoredValue?: Dispatch<T>) => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;

      if (setStoredValue) {
        // Save state
        setStoredValue(valueToStore);
      }

      // Save to local storage
      if (typeof window !== "undefined") {
        window.localStorage.setItem(generatedKey, JSON.stringify(valueToStore));
      }
    } catch (error) {
      // A more advanced implementation would handle the error case
      console.log(error);
    }
  };

  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === "undefined") {
      return initialValue;
    }

    try {
      // Get from local storage by generatedKey
      const item = window.localStorage.getItem(generatedKey);

      if (item) {
        // Parse stored json or if none return initialValue
        return JSON.parse(item);
      }

      setByPath(initialValue);
      return initialValue;
    } catch (error) {
      // If error also return initialValue
      console.log(error);
      setByPath(initialValue);
      return initialValue;
    }
  });

  // Return a wrapped version of useState's setter function that persists the new value to localStorage.
  const setValue: (value: T) => void = useCallback(
    (value) => setByPath(value, setStoredValue),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return [storedValue, setValue];
}
