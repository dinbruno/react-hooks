import { createContext, useCallback, useEffect, useState } from "react";
import {
  DefaultTheme as DefaultThemeType,
  ThemeProvider,
} from "styled-components";
import { GlobalStyle } from "../ui/styles/global";
import { dark, light } from "../ui/styles/themes";

type ContextType = {
  changeToDark: () => void;
  changeToLight: () => void;
  isDarkMode: boolean;
  switchTheme: () => void;
};

type ProviderProps = {
  children: React.ReactNode;
};

export const ThemeContext = createContext({} as ContextType);

export const ThemeContextProvider: React.FC<ProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<DefaultThemeType>(light);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const changeToDark = () => {
    setTheme(() => {
      localStorage.setItem("theme", "DARK");
      window.document.documentElement.className = "dark-mode";
      return dark;
    });
  };

  const changeToLight = () => {
    setTheme(() => {
      localStorage.setItem("theme", "LIGHT");
      window.document.documentElement.className = "light-mode";

      return light;
    });
  };

  const switchTheme = () => {
    setIsDarkMode((prev) => {
      if (prev) {
        changeToLight();
      } else {
        changeToDark();
      }

      return !prev;
    });
  };

  const onGetTheme = useCallback(() => {
    try {
      const storageTheme = localStorage.getItem("theme");
      setIsDarkMode(storageTheme === "DARK");
      storageTheme === "DARK" ? changeToDark() : changeToLight();
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    onGetTheme();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ThemeContext.Provider
      value={{
        changeToDark,
        changeToLight,
        isDarkMode,
        switchTheme,
      }}
    >
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};
