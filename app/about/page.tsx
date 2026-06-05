"use client";

import { useLanguage } from "@/components/language-provider";

const content = {
  fr: {
    heading: "À propos",
    bio: "Développeur Backend / Full-Stack formé à l'École 42 et en classe préparatoire PSI. Compétent en Node.js, React, Python et PostgreSQL, avec une pratique concrète du CI/CD et de Docker. Orienté DevOps à moyen terme, disponible immédiatement.",
    education: "Formation",
    timeline: [
      {
        year: "2020 - 2023",
        title: "École 42",
        description:
          "Cursus par les pairs sans professeurs ni cours magistraux. Projets en programmation C, systèmes Unix, algorithmique, graphisme, réseau et développement web.",
      },
      {
        year: "2017 - 2019",
        title: "Classe Préparatoire PSI",
        description:
          "Deux années intensives en mathématiques, physique et sciences de l'ingénieur. Préparation aux concours des Grandes Écoles. Solides bases en algorithmique et résolution de problèmes.",
      },
    ],
  },
  en: {
    heading: "About me",
    bio: "Backend / Full-Stack Developer, graduate of École 42 with a PSI preparatory class background. Proficient in Node.js, React, Python, and PostgreSQL, with hands-on CI/CD and Docker experience. DevOps-oriented, available immediately.",
    education: "Education",
    timeline: [
      {
        year: "2020 - 2023",
        title: "École 42",
        description:
          "Peer-to-peer curriculum with no teachers or lectures. Projects spanning C programming, Unix systems, algorithms, graphics, networking, and web development.",
      },
      {
        year: "2017 - 2019",
        title: "PSI Preparatory Class",
        description:
          "Two-year intensive program in mathematics, physics, and engineering sciences. Preparation for Grandes Écoles entrance exams. Strong foundation in algorithms and problem-solving.",
      },
    ],
  },
};

export default function AboutPage() {
  const { lang } = useLanguage();
  const t = content[lang];

  return (
    <div className="flex flex-col items-center">
      <div className="w-full max-w-3xl">
        <div className="blue-divider w-full mb-16"></div>

        <h1 className="text-4xl md:text-5xl font-bold text-gray-300 mb-12">
          {t.heading}
        </h1>

        <div className="mb-16 border-l-2 border-[#00a2ff] pl-5">
          <p className="text-lg text-gray-400 leading-relaxed">{t.bio}</p>
        </div>

        <h2 className="text-2xl font-bold text-gray-300 mb-8">
          {t.education}
        </h2>

        <div className="relative mb-16">
          {t.timeline.map((item, i) => (
            <div key={item.title} className="relative grid grid-cols-[140px_1fr] pb-10">
              <span className="text-xs text-gray-500 font-mono pt-1 text-right pr-6">
                {item.year}
              </span>

              <div className="relative pl-6 border-l border-gray-800">
                <div className="absolute -left-[5px] top-1 w-2 h-2 rounded-full bg-[#00a2ff]" />

                <h3 className="text-lg font-semibold text-white">
                  {item.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed mt-1 max-w-xl">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
