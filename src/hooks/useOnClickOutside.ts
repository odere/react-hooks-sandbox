import React, { useEffect, useState } from "react";

interface Props<T> {
  handler?: () => void;
  ref: React.MutableRefObject<T | null>;
}

export default function useOnClickOutside<T extends HTMLElement>(
  props: Props<T>
) {
  const { ref, handler } = props;
  const [clickOutsideCount, setClickOutsideCount] = useState(0);

  useEffect(() => {
    const listener = (event: any) => {
      if (!ref.current || ref.current.contains(event.target)) {
        setClickOutsideCount(0);
        return;
      }

      setClickOutsideCount(clickOutsideCount + 1);

      if (handler) {
        handler();
      }
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler, clickOutsideCount, setClickOutsideCount]);

  return [clickOutsideCount];
}
