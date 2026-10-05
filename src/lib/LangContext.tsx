"use client";
import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { t, type Lang } from "./i18n";

type Ctx = { lang: Lang; setLang: (l: Lang) => void; tr: (typeof t)["sv"] };
const LangContext = createContext<Ctx>({ lang: "sv", setLang: () => {}, tr: t.sv });

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("sv");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("stalco-lang");
      if (saved === "en" || saved === "sv") setLangState(saved);
    } catch {}
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = (l: Lang) => {
    setLangState(l);
    try { localStorage.setItem("stalco-lang", l); } catch {}
  };

  return <LangContext.Provider value={{ lang, setLang, tr: t[lang] }}>{children}</LangContext.Provider>;
}

export const useLang = () => useContext(LangContext);
