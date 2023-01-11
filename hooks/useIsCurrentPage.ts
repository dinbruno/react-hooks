import { useEffect, useState } from "react";

type UseIsCurrentPageProps = {
  url: string;
  label: string;
};

export const useIsCurrentPage = ({ url, label }: UseIsCurrentPageProps) => {
  const [isCurrentPage, setIsCurrentPage] = useState(false);

  useEffect(() => {
    const pathname = window.location.pathname;

    // TODO: This should be improved to use a regex to match the url
    if (pathname.includes("service/") && url.includes("service/")) {
      setIsCurrentPage(true);
      return;
    }

    setIsCurrentPage(pathname === url);
  }, [url]);

  useEffect(() => {
    if (isCurrentPage) {
      document.title = `Name | ${label}`;
    }
  }, [isCurrentPage, label]);

  return { isCurrentPage };
};
