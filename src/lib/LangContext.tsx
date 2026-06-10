"use client";
import { createContext, useContext, useState, ReactNode } from "react";
import type { Lang } from "./translations";

type LangCtx = { lang: Lang; setLang: (l: Lang) => void };
const LangContext = createContext<LangCtx>({ lang: "sv", setLang: () => {} });

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("sv");
  return <LangContext.Provider value={{ lang, setLang }}>{children}</LangContext.Provider>;
}

export function useLang() {
  return useContext(LangContext);
}
