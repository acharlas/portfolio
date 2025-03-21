import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Home() {
  // Tech stack items
  const techStack = [
    "JavaScript",
    "TypeScript",
    "React",
    "Next.js",
    "Node.js",
    "Express",
    "MongoDB",
    "Tailwind CSS",
  ];

  return (
    <div className="flex flex-col items-center">
      <div className="w-full max-w-6xl">
        <div className="blue-divider w-full"></div>

        <div className="flex flex-col items-center justify-center min-h-[80vh]">
          {/* Main content - moved higher */}
          <div className="flex flex-col items-center mt-[-10vh]">
            {/* Heading */}
            <h1
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold bg-clip-text text-transparent text-center mb-6
              bg-[linear-gradient(to_right,#061A2B_0%,white_25%,white_90%,#061A2B_100%)] "
            >
              Hi, I&apos;m Axel
            </h1>

            {/* #061A2B */}

            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-gray-500 mb-12">
              Full-Stack Web Developer
            </p>

            {/* Tech Stack */}
            <div className="mb-16">
              <h2 className="text-center text-gray-400 mb-4 text-sm uppercase tracking-wider">
                Tech Stack
              </h2>
              <div className="flex flex-wrap justify-center gap-3">
                {techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 bg-gray-900 text-[#00a2ff] text-sm rounded-full border border-gray-800"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/projects"
                className="group flex items-center bg-[#00a2ff] hover:bg-[#0080cc] text-white px-6 py-3 rounded-full transition-all"
              >
                See My Work
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/contact"
                className="group flex items-center bg-transparent hover:bg-white/10 text-white border border-white/20 px-6 py-3 rounded-full transition-all"
              >
                Contact Me
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full py-6 border-t border-gray-800 mt-auto">
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
