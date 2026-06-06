"use client";

import { useLanguage } from "@/components/language-provider";

const content = {
  fr: {
    heading: "À propos",
    bio: "Développeur Backend / Full-Stack formé à l'École 42 et en classe préparatoire PSI. Compétent en Node.js, React, Python et PostgreSQL, avec une pratique concrète du CI/CD et de Docker. Orienté DevOps à moyen terme, disponible immédiatement.",
    education: "Formation",
    timeline: [
      {
        year: "2020 — 2023",
        title: "École 42",
        description:
          "Cursus par les pairs sans professeurs ni cours magistraux. Projets en programmation C, systèmes Unix, algorithmique, graphisme, réseau et développement web.",
      },
      {
        year: "2017 — 2019",
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
        year: "2020 — 2023",
        title: "École 42",
        description:
          "Peer-to-peer curriculum with no teachers or lectures. Projects spanning C programming, Unix systems, algorithms, graphics, networking, and web development.",
      },
      {
        year: "2017 — 2019",
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
    <div>
      <div className="w-full max-w-3xl mx-auto">
        <div className="blue-divider w-full mb-16"></div>
      </div>

      <div className="w-screen relative left-1/2 -translate-x-1/2 backdrop-blur-md py-16 bg-[linear-gradient(180deg,transparent_0%,rgba(0,0,0,0.2)_15%,rgba(0,0,0,0.2)_85%,transparent_100%)]">
        <div className="max-w-3xl mx-auto px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-300 mb-10 text-pretty text-readable-strong">
          {t.heading}
        </h1>

        <p className="text-lg text-gray-400 leading-relaxed mb-16 text-pretty max-w-2xl text-readable">
          {t.bio}
        </p>

        <h2 className="text-sm font-semibold text-[#00a2ff] uppercase tracking-wider mb-6 text-readable-strong">
          {t.education}
        </h2>

        <div className="mb-16">
          {t.timeline.map((item, i) => (
            <div
              key={item.title}
              className={`grid grid-cols-[120px_1fr] gap-x-6 gap-y-1 py-6 ${
                i < t.timeline.length - 1
                  ? "border-b border-gray-800/50"
                  : ""
              }`}
            >
              <span className="text-sm text-gray-500 font-mono text-readable">
                {item.year}
              </span>

              <div>
                <h3 className="text-base font-semibold text-white text-readable-strong">
                  {item.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed mt-1 max-w-xl text-readable">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
        </div>
      </div>
    </div>
  );
}
