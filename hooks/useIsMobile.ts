import { useEffect, useState } from "react";

const BREAKPOINT = 768;

export const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWidth(() => {
        const w = window.innerWidth;
        setIsMobile(() => w <= BREAKPOINT);

        return w;
      });
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (window) {
      setIsMobile(() => window.innerWidth <= BREAKPOINT);
    }
  }, []);

  return { isMobile, width };
};
