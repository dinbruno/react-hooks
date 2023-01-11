import i18nCore from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { createContext, useEffect } from "react";
import {
  I18nextProvider,
  initReactI18next,
  useTranslation,
} from "react-i18next";
import EN from "../config/languages/en.json";
import PT_BR from "../config/languages/pt-BR.json";

type LanguageContextType = {
  handleChangeLanguage: (language: LanguageType) => void;
};

type LanguageContextProps = {
  children: React.ReactNode;
};

type LanguageType = "en" | "pt-BR";

const STORED_LANGUAGE_KEY = localStorage.getItem("i18nextLng") || "pt-BR";

i18nCore
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    resources: {
      en: {
        translation: EN,
      },
      pt: {
        translation: PT_BR,
      },
    },
    lng: STORED_LANGUAGE_KEY,
  });

export const LanguageContext = createContext({} as LanguageContextType);

export const LanguageContextProvider: React.FC<LanguageContextProps> = ({
  children,
}) => {
  const { i18n } = useTranslation();

  const handleChangeLanguage = (lang: LanguageType): void => {
    i18n.changeLanguage(lang);
    window.document.documentElement.lang = i18n.language;
  };

  useEffect(() => {
    window.document.documentElement.lang = STORED_LANGUAGE_KEY;
  }, []);

  return (
    <LanguageContext.Provider value={{ handleChangeLanguage }}>
      <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
    </LanguageContext.Provider>
  );
};
