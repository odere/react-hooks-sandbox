import React, { useState, useEffect } from "react";

interface Props<T> {
  targetKey: string;
  handler?: (value: boolean) => void;
  ref?: React.MutableRefObject<T | null>;
}

// Hook
export default function useKeyPress<T extends HTMLElement>(
  props: Props<T>,
) {
  const { targetKey, ref, handler } = props;

  // State for keeping track of whether key is pressed
  const [keyPressed, setKeyPressed] = useState(false);
  // If pressed key is our target key then set to true
  const downHandler = (event: any) => {
    const isTracked = ref && (!ref.current || ref.current.contains(event.target));
    const value = event.key === targetKey;

    if (isTracked) {
      setKeyPressed(value);

      return;
    }

    setKeyPressed(value);
  };
  // If released key is our target key then set to false
  const upHandler = (event: any) => {
    const value = event.key === targetKey;

    setKeyPressed(value);

    if (handler) {
      handler(value);
    }
  };

  // Add event listeners
  useEffect(() => {
    window.addEventListener("keydown", downHandler);
    window.addEventListener("keyup", upHandler);
    // Remove event listeners on cleanup
    return () => {
      window.removeEventListener("keydown", downHandler);
      window.removeEventListener("keyup", upHandler);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty array ensures that effect is only run on mount and unmount

  return [keyPressed];
}
