import React, { createContext, useContext, useState, useEffect } from "react";

type Locale = "en" | "fr";
type Translations = Record<string, any>;

interface I18nContextValue {
  locale: Locale;
  t: (key: string, params?: Record<string, string>) => string;
  setLocale: (l: Locale) => void;
}

const I18nContext = createContext<I18nContextValue | undefined>(undefined);

const translations: Record<Locale, Translations> = {
  en: await import("../locales/en.json").then(m => m.default),
  fr: await import("../locales/fr.json").then(m => m.default),
};

export const I18nProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [locale, setLocale] = useState<Locale>(() => {
    const saved = localStorage.getItem("locale") as Locale | null;
    return saved && saved in translations ? saved : "en";
  });

  useEffect(() => {
    localStorage.setItem("locale", locale);
  }, [locale]);

  const t = (key: string, params?: Record<string, string>) => {
    let value = key.split(".").reduce((obj, k) => obj?.[k], translations[locale]) ?? key;
    if (params) {
      Object.entries(params).forEach(([k, v]) => {
        value = value.replace(`{${k}}`, v);
      });
    }
    return value as unknown as string;
  };

  return (
    <I18nContext.Provider value={{ locale, t, setLocale }}>
      {children}
    </I18nContext.Provider>
  );
};

export const useI18n = () => {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
};