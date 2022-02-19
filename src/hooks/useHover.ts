import React, { useState, useEffect } from "react";

interface Props<T> {
  handler?: (value: boolean) => void;
  ref: React.MutableRefObject<T | null>;
}

// Hook
export default function useHover<T extends HTMLElement>(props: Props<T>,) {
    const { ref, handler } = props;

    const [value, setValue] = useState(false);
    const node = ref.current;

    const handleMouseOver = () => setValue(true);
    const handleMouseOut = () => {
        setValue(false);

        if (handler) {
          handler(value);
        }
    };

    useEffect(
      () => {
        if (node) {
          node.addEventListener("mouseover", handleMouseOver);
          node.addEventListener("mouseout", handleMouseOut);
          return () => {
            node.removeEventListener("mouseover", handleMouseOver);
            node.removeEventListener("mouseout", handleMouseOut);
          };
        }
      },
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [node] // Recall only if ref changes
    );

    return [value];
  }