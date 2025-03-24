import { useEffect, useRef, useState } from "react";
import { IntersectionObserverProps } from "../interfaces/IntersectionObserverProps";

/**
 * Intersection observer hook
 * @param {IntersectionObserverProps} props The scrollable parent container
 * @returns A refrence object and a boolean value indicating whether that element is intersecting
 */
const useIntersectionObserverHook = (props: IntersectionObserverProps) => {
  const { rootElement, threshold } = props;
  const ref = useRef<HTMLDivElement>(null); //The element to observe
  const [isVisible, setIsVisible] = useState(false); //Boolean flags

  useEffect(() => {
    const element = ref.current;

    if (!element) return;

    const options = {
      root: rootElement.current,
      threshold: threshold,
      rootMargin: "0px",
    };

    const observe = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      options
    );

    observe.observe(element);

    return () => {
      if (element) observe.unobserve(element);
    };
  }, [rootElement, threshold]);

  return [ref, isVisible];
};

export default useIntersectionObserverHook;
