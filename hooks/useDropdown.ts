import { useEffect, useRef, useState } from "react";

export const useDropdown = () => {
  const [isOpened, setIsOpened] = useState(false);
  const dropdownRef = useRef<HTMLUListElement>(null);

  const handleClick = () => {
    setIsOpened(!isOpened);
  };

  // TODO: event type
  const handleClickOutside = (event: any) => {
    if (dropdownRef.current && dropdownRef.current.contains(event?.target)) {
      return;
    }
    setIsOpened(false);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return { handleClick, isOpened, dropdownRef };
};
