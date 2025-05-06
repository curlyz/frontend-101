import { useEffect } from "react";
import type { RefObject } from "react";

type Handler = (event: MouseEvent | TouchEvent) => void;

/**
 * A custom hook that triggers a handler function when a click or touch event
 * occurs outside of the specified element reference.
 *
 * @template T Extends HTMLElement.
 * @param {RefObject<T>} ref The React ref attached to the element to monitor.
 * @param {Handler} handler The function to call when an outside click/touch is detected.
 */
function useOnClickOutside<T extends HTMLElement = HTMLElement>(
  ref: RefObject<T>,
  handler: Handler,
): void {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      // Do nothing if clicking ref's element or descendent elements
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }
      handler(event);
    };

    // Add listeners
    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);
    console.log("useOnClickOutside: Listeners added.");

    // Cleanup listeners on unmount
    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
      console.log("useOnClickOutside: Listeners removed.");
    };
    // Re-run the effect if ref or handler changes
  }, [ref, handler]);
}

export default useOnClickOutside;
