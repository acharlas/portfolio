"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Github, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

type Project = {
  id: number;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  githubLink: string;
  liveLink: string;
};

const projects: Project[] = [
  {
    id: 1,
    title: "AI-Powered Personal Assistant",
    description:
      "An advanced AI assistant capable of understanding context, managing tasks, and providing personalized recommendations. Utilizes cutting-edge NLP techniques and machine learning algorithms to deliver human-like interactions.",
    image: "/placeholder.svg?height=400&width=600",
    technologies: [
      "Python",
      "TensorFlow",
      "Natural Language Processing",
      "Machine Learning",
    ],
    githubLink: "https://github.com/yourusername/ai-assistant",
    liveLink: "https://ai-assistant-demo.com",
  },
  {
    id: 2,
    title: "E-commerce Website",
    description:
      "A fully functional e-commerce platform with product catalog, shopping cart, and secure checkout process. Features responsive design and integration with popular payment gateways.",
    image: "/placeholder.svg?height=400&width=600",
    technologies: ["React", "Node.js", "Express", "MongoDB", "Stripe API"],
    githubLink: "https://github.com/yourusername/ecommerce-website",
    liveLink: "https://ecommerce-demo.com",
  },
  {
    id: 3,
    title: "Mobile Banking App",
    description:
      "A secure and user-friendly mobile banking application allowing users to manage accounts, transfer funds, and track expenses. Implements biometric authentication and real-time transaction notifications.",
    image: "/placeholder.svg?height=400&width=600",
    technologies: [
      "React Native",
      "Redux",
      "Node.js",
      "PostgreSQL",
      "Plaid API",
    ],
    githubLink: "https://github.com/yourusername/mobile-banking-app",
    liveLink: "https://mobile-banking-demo.com",
  },
  {
    id: 4,
    title: "Blockchain Voting System",
    description:
      "A decentralized voting system built on blockchain technology, ensuring transparency, security, and immutability of votes. Includes features for voter registration, vote casting, and result tabulation.",
    image: "/placeholder.svg?height=400&width=600",
    technologies: ["Solidity", "Ethereum", "Web3.js", "React", "Node.js"],
    githubLink: "https://github.com/yourusername/blockchain-voting",
    liveLink: "https://blockchain-voting-demo.com",
  },
];

export default function ProjectsPage() {
  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-12">My Projects</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden"
            >
              <div className="relative h-48 md:h-64">
                <Image
                  src={project.image}
                  alt={project.title}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <div className="p-6">
                <h2 className="text-2xl font-semibold mb-2">{project.title}</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {project.description}
                </p>
                <div className="mb-4">
                  <h3 className="text-lg font-semibold mb-2">
                    Technologies Used:
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <Link
                    href={project.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button variant="outline" size="sm">
                      <Github className="mr-2 h-4 w-4" />
                      View Code
                    </Button>
                  </Link>
                  <Link
                    href={project.liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button variant="default" size="sm">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Live Demo
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
