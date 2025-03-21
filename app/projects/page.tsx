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

      {/* Footer */}
      <footer className="w-full py-6 border-t border-gray-800 mt-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-gray-500 text-sm">
                &copy; {new Date().getFullYear()} Axel Charlassier. All rights
                reserved.
              </p>
            </div>

            <div className="flex space-x-6">
              <a
                href="https://github.com/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-[#00a2ff] transition-colors"
                aria-label="GitHub"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-github"
                >
                  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                  <path d="M9 18c-4.51 2-5-2-7-2" />
                </svg>
              </a>
              <a
                href="https://linkedin.com/in/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-[#00a2ff] transition-colors"
                aria-label="LinkedIn"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-linkedin"
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect width="4" height="12" x="2" y="9" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>
              <a
                href="mailto:your.email@example.com"
                className="text-gray-500 hover:text-[#00a2ff] transition-colors"
                aria-label="Email"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-mail"
                >
                  <rect width="20" height="16" x="2" y="4" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
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
