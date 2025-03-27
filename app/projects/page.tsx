import Image from "next/image";
import { ExternalLink, Github } from "lucide-react";

// This would typically come from a database or CMS
// For easy modification, you could use a JSON file or a database
const projects = [
  {
    id: 1,
    title: "Project One",
    description:
      "A description of your first project. This could be a web application, mobile app, or any other type of project you've worked on.",
    technologies: ["React", "Next.js", "Tailwind CSS"],
    image: "/placeholder.svg?height=300&width=600",
    githubUrl: "https://github.com/yourusername/project-one",
    liveUrl: "https://project-one.example.com",
  },
  {
    id: 2,
    title: "Project Two",
    description:
      "A description of your second project. Highlight the problem it solves and your role in developing it.",
    technologies: ["TypeScript", "Node.js", "MongoDB"],
    image: "/placeholder.svg?height=300&width=600",
    githubUrl: "https://github.com/yourusername/project-two",
    liveUrl: "https://project-two.example.com",
  },
  {
    id: 3,
    title: "Project Three",
    description:
      "A description of your third project. Mention any challenges you faced and how you overcame them.",
    technologies: ["Vue.js", "Firebase", "SCSS"],
    image: "/placeholder.svg?height=300&width=600",
    githubUrl: "https://github.com/yourusername/project-three",
    liveUrl: "https://project-three.example.com",
  },
  {
    id: 4,
    title: "Project Four",
    description:
      "A description of your fourth project. Talk about the impact it had or the problem it solved.",
    technologies: ["React Native", "Redux", "Express"],
    image: "/placeholder.svg?height=300&width=600",
    githubUrl: "https://github.com/yourusername/project-four",
    liveUrl: "https://project-four.example.com",
  },
];

export default function ProjectsPage() {
  return (
    <div className="flex flex-col items-center">
      <div className="w-full max-w-6xl">
        <div className="blue-divider w-full mb-16"></div>

        <h1 className="text-4xl md:text-5xl font-bold text-gray-300 mb-8">
          Projects
        </h1>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </div>
  );
}

function ProjectCard({ project }: { project: (typeof projects)[0] }) {
  return (
    <div className="bg-gray-900 rounded-lg overflow-hidden border border-gray-800 hover:border-[#00a2ff]/30 transition-all">
      <div className="relative h-48">
        <Image
          src={project.image || "/placeholder.svg"}
          alt={`Screenshot of ${project.title}`}
          fill
          className="object-cover"
        />
      </div>

      <div className="p-6">
        <h2 className="text-xl font-bold mb-2">{project.title}</h2>

        <p className="text-gray-400 mb-4">{project.description}</p>

        <div className="mb-4 flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="text-xs bg-black/50 text-[#00a2ff] px-2 py-1 rounded-full"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="flex gap-4">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-gray-400 hover:text-[#00a2ff] transition-colors"
              aria-label={`View ${project.title} source code on GitHub`}
            >
              <Github className="mr-1 h-4 w-4" />
              Source
            </a>
          )}

          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-gray-400 hover:text-[#00a2ff] transition-colors"
              aria-label={`View live demo of ${project.title}`}
            >
              <ExternalLink className="mr-1 h-4 w-4" />
              Live Demo
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
