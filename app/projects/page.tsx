import type { Metadata } from "next";

import ProjectCard, { type Project } from "@/components/project-card";

export const metadata: Metadata = {
  title: "Projects | Axel Charlassier",
  description:
    "Explore full-stack and graphics projects including React Three Fiber simulations, NestJS applications, and game modding work.",
  openGraph: {
    title: "Projects | Axel Charlassier",
    description:
      "Selected projects showcasing experience with WebGL, NestJS, Vulkan, and Baldur's Gate 3 modding.",
    type: "website",
  },
};

const projects: Project[] = [
  {
    id: 1,
    title: "Chaos Equations Simulation",
    description:
      "A simulation of chaotic attractors using React Three Fiber and Leva controls. Features modular components for Halvorsen and Lorenz attractors, with a particle system displaying smooth color gradient trails.",
    technologies: ["React", "React Three Fiber", "Leva", "React Three drei"],
    image: "/projects/chaos-equation-screenshot.webp",
    githubUrl: "https://github.com/acharlas/Chaos-Equations",
    liveUrl: "https://acharlas.github.io/Chaos-Equations/",
  },
  {
    id: 2,
    title: "Transcendence",
    description:
      "A full-stack web application of the classic Pong game, developed as part of the 42 school curriculum. Includes user authentication, real-time gameplay, and a leaderboard.",
    technologies: ["React", "NestJS", "PostgreSQL", "Docker"],
    image: "/projects/transcendence-screenshot.webp",
    githubUrl: "https://github.com/acharlas/42-transcendence",
    liveUrl: "",
  },
  {
    id: 3,
    title: "Vulkan Engine",
    description:
      "A custom rendering engine built with Vulkan and GLFW, demonstrating the setup of a Vulkan environment from window initialization to rendering a simple scene.",
    technologies: ["C++", "Vulkan", "GLFW", "GLSL"],
    image: "/projects/vulkanengine-water-screenshot.webp",
    githubUrl: "https://github.com/acharlas/vulkan-engine",
    liveUrl: "",
  },
  {
    id: 4,
    title: "Battlemage Mod for Baldur's Gate 3",
    description:
      "A mod for Baldur's Gate 3 built using the Divinity Engine, integrating LUA scripting for dynamic interactions and gameplay adjustments.",
    technologies: ["Divinity Engine", "LUA", "Game Modding"],
    image: "/projects/battlemage-screenshot.webp",
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
