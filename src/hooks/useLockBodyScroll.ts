import { useEffect } from "react";

// Hook
export default function useLockBodyScroll(isLocked: boolean): void {
  // useLayoutEffect callback return type is "() => void" type
  useEffect((): (() => void) => {
    // Get original body overflow
    const originalStyle: string = window.getComputedStyle(
      document.body
    ).overflow;

    // Prevent scrolling on mount
    document.body.style.overflow = isLocked ? "hidden" : originalStyle;
    // Re-enable scrolling when component unmounts
    return () => {
        document.body.style.overflow = originalStyle;
    };
  }, [isLocked]);
}
