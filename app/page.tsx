import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Home() {
  // Tech stack items
  const techStack = [
    "Python",
    "JavaScript",
    "TypeScript",
    "C/C++",
    "Docker",
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
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-[#e9e1d3] text-center mb-6">
              Hi, I&apos;m Axel
            </h1>

            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-gray-500 mb-12">
              Full-Stack Web Developer
            </p>

            {/* Tech Stack */}
            <div className="mb-16 w-full">
              <h2 className="text-center text-gray-400 mb-4 text-sm uppercase tracking-wider">
                Tech Stack
              </h2>
              <div className="mx-auto w-4/5 flex flex-wrap justify-center gap-3">
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
                className="group flex items-center bg-[#2490cebb] hover:bg-[#0081cc] text-[#eee9e3] px-6 py-3 rounded-full transition-all"
              >
                See My Work
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/contact"
                className="group flex items-center bg-[#1118276b] hover:bg-white/10 text-[#eee9e3] border border-white/20 px-6 py-3 rounded-full transition-all"
              >
                Contact Me
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
