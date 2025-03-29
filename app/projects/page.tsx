"use client";

import type React from "react";

import Image from "next/image";
import { ExternalLink } from "lucide-react";

// This would typically come from a database or CMS
const projects = [
  {
    id: 1,
    title: "Chaos Equations Simulation",
    description:
      "A simulation of chaotic attractors using React Three Fiber and Leva controls. Features modular components for Halvorsen and Lorenz attractors, with a particle system displaying smooth color gradient trails.",
    technologies: ["React", "React Three Fiber", "Leva", "React Three drei"],
    image: "/projects/chaos-equation-screenshot.png",
    githubUrl: "https://github.com/acharlas/Chaos-Equations",
    liveUrl: "https://acharlas.github.io/Chaos-Equations/",
  },
  {
    id: 2,
    title: "Transcendence",
    description:
      "A full-stack web application of the classic Pong game, developed as part of the 42 school curriculum. Includes user authentication, real-time gameplay, and a leaderboard.",
    technologies: ["React", "NestJS", "PostgreSQL", "Docker"],
    image: "/projects/transcendence-screenshot.png",
    githubUrl: "https://github.com/acharlas/42-transcendence",
    liveUrl: "",
  },
  {
    id: 3,
    title: "Vulkan Engine",
    description:
      "A custom rendering engine built with Vulkan and GLFW, demonstrating the setup of a Vulkan environment from window initialization to rendering a simple scene.",
    technologies: ["C++", "Vulkan", "GLFW", "GLSL"],
    image: "/projects/vulkanengine-water-screenshot.png",
    githubUrl: "https://github.com/acharlas/vulkan-engine",
    liveUrl: "",
  },
  {
    id: 4,
    title: "Battlemage Mod for Baldur's Gate 3",
    description:
      "A mod for Baldur's Gate 3 built using the Divinity Engine, integrating LUA scripting for dynamic interactions and gameplay adjustments.",
    technologies: ["Divinity Engine", "LUA", "Game Modding"],
    image: "/projects/battlemage-screenshot.png",
    githubUrl: "",
    liveUrl: "https://mod.io/g/baldursgate3/m/battlemage",
  },
];

export default function ProjectsPage() {
  return (
    <div className="flex flex-col items-center">
      <div className="w-full max-w-6xl">
        <div className="blue-divider w-full mb-16"></div>

        <h1 className="text-4xl md:text-5xl font-bold text-gray-300 mb-12">
          Projects
        </h1>

        <div className="grid gap-6 md:grid-cols-2 mb-16">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </div>
  );
}

function ProjectCard({ project }: { project: (typeof projects)[0] }) {
  // Determine the main link URL (GitHub or live URL if GitHub not available)
  const mainLinkUrl = project.githubUrl || project.liveUrl;

  const handleCardClick = () => {
    // Open the main link in a new tab
    window.open(mainLinkUrl, "_blank", "noopener,noreferrer");
  };

  const handleLiveDemoClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent the card click
    window.open(project.liveUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <div
      onClick={handleCardClick}
      className="bg-gray-900/80 rounded-lg overflow-hidden border border-gray-800 hover:border-gray-700 hover:bg-gray-800/90 transition-all flex flex-col cursor-pointer group"
    >
      {/* Project Image with 16:9 aspect ratio */}
      <div className="relative w-full aspect-video">
        <Image
          src={project.image || "/placeholder.svg?height=900&width=1600"}
          alt={`Screenshot of ${project.title}`}
          fill
          className="object-cover"
        />
      </div>

      {/* Project Content */}
      <div className="p-5 flex-grow flex flex-col">
        {/* Title */}
        <h2 className="text-xl font-bold mb-2 text-white">{project.title}</h2>

        {/* Technologies */}
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

        {/* Description */}
        <p className="text-gray-400 text-sm mb-4 flex-grow">
          {project.description}
        </p>

        {/* Links */}
        <div className="flex gap-4 mt-auto">
          {project.liveUrl && (
            <button
              onClick={handleLiveDemoClick}
              className="inline-flex items-center text-gray-400 hover:text-[#00a2ff]/80 transition-colors text-xs bg-transparent border-0 p-0 cursor-pointer"
              aria-label={`View live demo of ${project.title}`}
            >
              <ExternalLink className="mr-1 h-3.5 w-3.5" />
              Live Demo
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
