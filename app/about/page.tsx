"use client";

import { useLanguage } from "@/components/language-provider";

const content = {
  fr: {
    heading: "À propos",
    bio: "Développeur Backend / Full-Stack formé à l'École 42 et en classe préparatoire PSI. Compétent en Node.js, React, Python et PostgreSQL, avec une pratique concrète du CI/CD et de Docker. Orienté DevOps à moyen terme, disponible immédiatement.",
  },
  en: {
    heading: "About me",
    bio: "Backend / Full-Stack Developer, graduate of École 42 with a PSI preparatory class background. Proficient in Node.js, React, Python, and PostgreSQL, with hands-on CI/CD and Docker experience. DevOps-oriented, available immediately.",
  },
};

export default function AboutPage() {
  const { lang } = useLanguage();
  const t = content[lang];

  return (
    <div className="flex flex-col items-center">
      <div className="w-full max-w-6xl">
        <div className="blue-divider w-full mb-12"></div>

        <h1 className="text-4xl md:text-5xl font-bold text-gray-300 mb-8">
          {t.heading}
        </h1>

        <p className="text-lg text-gray-400 leading-relaxed max-w-2xl">
          {t.bio}
        </p>
      </div>
    </div>
  );
}
