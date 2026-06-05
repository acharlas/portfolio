"use client";

import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { withBasePath } from "@/lib/base-path";
import { useLanguage } from "@/components/language-provider";

const projects = [
  {
    id: 1,
    title: "Chaos Equations Simulation",
    descriptionEn:
      "A simulation of chaotic attractors using React Three Fiber and Leva controls. Features modular components for Halvorsen and Lorenz attractors, with a particle system displaying smooth color gradient trails.",
    descriptionFr:
      "Une simulation d'attracteurs chaotiques utilisant React Three Fiber et les contrôles Leva. Composants modulaires pour les attracteurs de Halvorsen et de Lorenz, avec un système de particules affichant des traînées de dégradé de couleurs fluides.",
    technologies: ["React", "React Three Fiber", "Leva", "React Three drei"],
    image: withBasePath("/projects/chaos-equation-screenshot.webp"),
    githubUrl: "https://github.com/acharlas/Chaos-Equations",
    liveUrl: "https://acharlas.github.io/Chaos-Equations/",
  },
  {
    id: 2,
    title: "MyStagram",
    descriptionEn:
      "MyStagram is a lightweight Instagram-style demo that focuses on the essentials: authenticated users can publish posts, react with likes, leave comments, and follow each other. Everything runs locally via Docker Compose with a FastAPI backend, a Next.js frontend, and a handful of supporting services (PostgreSQL, Redis, MinIO).",
    descriptionFr:
      "MyStagram est une démo légère de style Instagram axée sur l'essentiel : les utilisateurs authentifiés peuvent publier des posts, réagir avec des likes, laisser des commentaires et se suivre. Le tout fonctionne localement via Docker Compose avec un backend FastAPI, un frontend Next.js et quelques services complémentaires (PostgreSQL, Redis, MinIO).",
    technologies: [
      "React",
      "Docker",
      "MinIO",
      "PostgreSQL",
      "Redis",
      "Python",
    ],
    image: withBasePath("/projects/MyStagram-screenshot.webp"),
    githubUrl: "https://github.com/acharlas/MyStagram",
    liveUrl: "https://mystagram.acharlas.dev",
  },
  {
    id: 3,
    title: "DockGuard",
    descriptionEn:
      "A container image analysis dashboard with two lenses: Security (vulnerability scanning via Trivy) and Build (layer efficiency analysis via Dive). Paste a Docker image reference and inspect vulnerabilities and build optimization results in a unified UI.",
    descriptionFr:
      "Un tableau de bord d'analyse d'images de conteneurs avec deux angles : Sécurité (scan de vulnérabilités via Trivy) et Build (analyse d'efficacité des couches via Dive). Collez une référence d'image Docker et inspectez les vulnérabilités et les résultats d'optimisation de build dans une interface unifiée.",
    technologies: [
      "Python",
      "FastAPI",
      "Next.js",
      "TypeScript",
      "PostgreSQL",
      "Redis",
      "Docker",
      "Prometheus",
      "Grafana",
      "Terraform",
    ],
    image: withBasePath("/projects/dockguard-screenshot.webp"),
    githubUrl: "https://github.com/acharlas/DockGuard",
    liveUrl: "https://dockguard.acharlas.dev",
  },
  {
    id: 4,
    title: "Transcendence",
    descriptionEn:
      "A full-stack web application of the classic Pong game, developed as part of the 42 school curriculum. Includes user authentication, real-time gameplay, and a leaderboard.",
    descriptionFr:
      "Une application web full-stack du jeu classique Pong, développée dans le cadre du cursus de l'école 42. Inclut l'authentification des utilisateurs, le jeu en temps réel et un classement.",
    technologies: ["React", "NestJS", "PostgreSQL", "Docker"],
    image: withBasePath("/projects/transcendence-screenshot.webp"),
    githubUrl: "https://github.com/acharlas/42-transcendence",
    liveUrl: null,
  },
  {
    id: 5,
    title: "Vulkan Engine",
    descriptionEn:
      "A custom rendering engine built with Vulkan and GLFW, demonstrating the setup of a Vulkan environment from window initialization to rendering a simple scene.",
    descriptionFr:
      "Un moteur de rendu personnalisé construit avec Vulkan et GLFW, démontrant la mise en place d'un environnement Vulkan, de l'initialisation de la fenêtre au rendu d'une scène simple.",
    technologies: ["C++", "Vulkan", "GLFW", "GLSL"],
    image: withBasePath("/projects/vulkanengine-water-screenshot.webp"),
    githubUrl: "https://github.com/acharlas/vulkan-engine",
    liveUrl: null,
  },
  {
    id: 6,
    title: "Battlemage Mod for Baldur's Gate 3",
    descriptionEn:
      "A top 20 class mod for Baldur's Gate 3 built using the Divinity Engine, integrating LUA scripting for dynamic interactions and gameplay adjustments. Downloaded over 600K times.",
    descriptionFr:
      "Un mod de classe classé dans le top 20 pour Baldur's Gate 3, construit avec le Divinity Engine et intégrant des scripts LUA pour des interactions dynamiques et des ajustements de gameplay. Téléchargé plus de 600 000 fois.",
    technologies: ["Divinity Engine", "LUA", "Game Modding"],
    image: withBasePath("/projects/battlemage-screenshot.webp"),
    githubUrl: null,
    liveUrl: "https://mod.io/g/baldursgate3/m/battlemage",
  },
];

export default function ProjectsPage() {
  const { lang } = useLanguage();

  return (
    <div className="flex flex-col items-center">
      <div className="w-full max-w-6xl">
        <div className="blue-divider w-full mb-16"></div>

        <h1 className="text-4xl md:text-5xl font-bold text-gray-300 mb-12">
          {lang === "fr" ? "Projets" : "Projects"}
        </h1>

        <div className="grid gap-6 md:grid-cols-2 mb-16">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} lang={lang} />
          ))}
        </div>
      </div>
    </div>
  );
}

function ProjectCard({ project, lang }: { project: (typeof projects)[0]; lang: "en" | "fr" }) {
  const description = lang === "fr" ? project.descriptionFr : project.descriptionEn;
  const primaryLinkUrl = project.liveUrl ?? project.githubUrl ?? null;
  const secondaryLinkUrl =
    project.liveUrl && project.githubUrl ? project.githubUrl : null;
  const isClickable = Boolean(primaryLinkUrl);

  const cardBody = (
    <>
      <div className="relative w-full aspect-video">
        <Image
          src={project.image}
          alt={`Screenshot of ${project.title}`}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>

      <div className="p-5 flex-1 flex flex-col">
        <h2 className="text-xl font-bold mb-2 text-white">
          {project.title}
        </h2>

        <div className="mb-3 flex flex-wrap gap-1.5">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="text-xs bg-black/50 text-[#00a2ff]/80 px-2 py-0.5 rounded-full"
            >
              {tech}
            </span>
          ))}
        </div>

        <p className="text-gray-400 text-sm flex-1">{description}</p>
      </div>
    </>
  );

  return (
    <article className="bg-gray-900/80 rounded-md overflow-hidden border border-gray-800 flex flex-col transition-colors hover:bg-gray-800/90 hover:border-gray-700">
      {isClickable ? (
        <a
          href={primaryLinkUrl ?? undefined}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Open ${project.title}`}
          className="flex flex-col flex-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00a2ff] focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900 cursor-pointer"
        >
          {cardBody}
        </a>
      ) : (
        <div className="flex flex-col flex-1">{cardBody}</div>
      )}

      {secondaryLinkUrl && (
        <div className="px-5 pb-5 flex gap-4">
          <a
            href={secondaryLinkUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-[#00a2ff]/80 transition-colors text-sm"
            aria-label={`View GitHub repository for ${project.title}`}
          >
            <ExternalLink className="h-4 w-4" />
            GitHub
          </a>
        </div>
      )}
    </article>
  );
}
