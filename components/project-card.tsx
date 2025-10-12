"use client";

import type React from "react";
import Image from "next/image";
import { ExternalLink } from "lucide-react";

export type Project = {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  image: string;
  githubUrl: string;
  liveUrl: string;
};

export default function ProjectCard({ project }: { project: Project }) {
  const mainLinkUrl = project.githubUrl || project.liveUrl;

  const handleCardClick = () => {
    if (!mainLinkUrl) return;
    window.open(mainLinkUrl, "_blank", "noopener,noreferrer");
  };

  const handleLiveDemoClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    if (!project.liveUrl) return;
    window.open(project.liveUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <div
      onClick={handleCardClick}
      className={`bg-gray-900/80 rounded-lg overflow-hidden border border-gray-800 transition-all flex flex-col group ${
        mainLinkUrl
          ? "hover:border-gray-700 hover:bg-gray-800/90 cursor-pointer"
          : "cursor-default"
      }`}
      role={mainLinkUrl ? "button" : undefined}
      tabIndex={mainLinkUrl ? 0 : -1}
      onKeyDown={(event) => {
        if (!mainLinkUrl) return;
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          handleCardClick();
        }
      }}
    >
      <div className="relative w-full aspect-video">
        <Image
          src={project.image}
          alt={`Screenshot of ${project.title}`}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>

      <div className="p-5 flex-grow flex flex-col">
        <h2 className="text-xl font-bold mb-2 text-white">{project.title}</h2>

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

        <p className="text-gray-400 text-sm mb-4 flex-grow">
          {project.description}
        </p>

        <div className="flex gap-4 mt-auto">
          {project.liveUrl && (
            <button
              type="button"
              onClick={handleLiveDemoClick}
              className="inline-flex items-center text-gray-400 hover:text-[#00a2ff]/80 transition-colors text-xs bg-transparent border-0 p-0 cursor-pointer"
              aria-label={`View live demo of ${project.title}`}
            >
              <ExternalLink className="mr-1 h-3.5 w-3.5" />
              Live Demo
            </button>
          )}
          {!mainLinkUrl && (
            <span className="text-xs text-gray-500" aria-live="polite">
              Links coming soon
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
