import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { withBasePath } from "@/lib/base-path";

const projects = [
  {
    id: 1,
    title: "Chaos Equations Simulation",
    description:
      "A simulation of chaotic attractors using React Three Fiber and Leva controls. Features modular components for Halvorsen and Lorenz attractors, with a particle system displaying smooth color gradient trails.",
    technologies: ["React", "React Three Fiber", "Leva", "React Three drei"],
    image: withBasePath("/projects/chaos-equation-screenshot.webp"),
    githubUrl: "https://github.com/acharlas/Chaos-Equations",
    liveUrl: "https://acharlas.github.io/Chaos-Equations/",
  },
  {
    id: 2,
    title: "Transcendence",
    description:
      "A full-stack web application of the classic Pong game, developed as part of the 42 school curriculum. Includes user authentication, real-time gameplay, and a leaderboard.",
    technologies: ["React", "NestJS", "PostgreSQL", "Docker"],
    image: withBasePath("/projects/transcendence-screenshot.webp"),
    githubUrl: "https://github.com/acharlas/42-transcendence",
    liveUrl: null,
  },
  {
    id: 3,
    title: "MyStagram",
    description:
      "MyStagram is a lightweight Instagram-style demo that focuses on the essentials: authenticated users can publish posts, react with likes, leave comments, and follow each other. Everything runs locally via Docker Compose with a FastAPI backend, a Next.js frontend, and a handful of supporting services (PostgreSQL, Redis, MinIO).",
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
    liveUrl: null,
  },
  {
    id: 4,
    title: "Vulkan Engine",
    description:
      "A custom rendering engine built with Vulkan and GLFW, demonstrating the setup of a Vulkan environment from window initialization to rendering a simple scene.",
    technologies: ["C++", "Vulkan", "GLFW", "GLSL"],
    image: withBasePath("/projects/vulkanengine-water-screenshot.webp"),
    githubUrl: "https://github.com/acharlas/vulkan-engine",
    liveUrl: null,
  },
  {
    id: 5,
    title: "Battlemage Mod for Baldur's Gate 3",
    description:
      "A mod for Baldur's Gate 3 built using the Divinity Engine, integrating LUA scripting for dynamic interactions and gameplay adjustments.",
    technologies: ["Divinity Engine", "LUA", "Game Modding"],
    image: withBasePath("/projects/battlemage-screenshot.webp"),
    githubUrl: null,
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

        <p className="text-gray-400 text-sm flex-1">{project.description}</p>
      </div>
    </>
  );

  return (
    <article className="bg-gray-900/80 rounded-lg overflow-hidden border border-gray-800 flex flex-col transition-colors hover:border-gray-700">
      {isClickable ? (
        <a
          href={primaryLinkUrl ?? undefined}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Open ${project.title}`}
          className="flex flex-col flex-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00a2ff] focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900 hover:bg-gray-800/90 transition-colors cursor-pointer"
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
            className="inline-flex items-center text-gray-400 hover:text-[#00a2ff]/80 transition-colors text-xs"
            aria-label={`View GitHub repository for ${project.title}`}
          >
            <ExternalLink className="mr-1 h-3.5 w-3.5" />
            GitHub
          </a>
        </div>
      )}
    </article>
  );
}
