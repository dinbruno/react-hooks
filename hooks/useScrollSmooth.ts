import { useEffect } from "react";

export const useScrollSmooth = () => {
  useEffect(() => {
    const hash = window.location.hash;

    if (hash.trim()) {
      const section = document.querySelector(hash);

      if (section) {
        section.scrollIntoView({
          behavior: "smooth",
          block: "start",
          inline: "nearest",
        });
      }
    }
  }, []);
};
