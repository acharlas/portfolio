"use client";

import { useLanguage, type Lang } from "@/components/language-provider";

export default function LanguageSwitcher() {
  const { lang, toggleLang } = useLanguage();

  const btn = (code: Lang, label: string) => (
    <button
      onClick={() => toggleLang(code)}
      className={`text-sm transition-colors ${
        lang === code
          ? "text-[#00a2ff]"
          : "text-gray-600 hover:text-gray-400"
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="fixed bottom-4 right-2 sm:top-4 sm:bottom-auto sm:right-4 z-50 flex items-center gap-2 bg-black/40 backdrop-blur-sm rounded-full px-3 py-1.5 border border-white/10">
      {btn("fr", "FR")}
      <span className="text-gray-600 text-sm">|</span>
      {btn("en", "EN")}
    </div>
  );
}
