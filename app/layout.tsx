import type React from "react";
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { Github, Linkedin, Mail } from "lucide-react";
import "./globals.css";
import Header from "@/components/header";
import ParticleBackground from "@/components/particle-background";
import FooterYear from "@/components/footer-year";
import { withBasePath } from "@/lib/base-path";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://acharlas.dev"),
  title: "Axel Charlassier | Portfolio",
  description:
    "Full-Stack Web Developer Portfolio — React, Next.js, TypeScript, Python, Docker, and more.",
  keywords: ["portfolio", "web developer", "full-stack", "React", "Next.js"],
  authors: [{ name: "Axel Charlassier" }],
  openGraph: {
    title: "Axel Charlassier | Portfolio",
    description:
      "Full-Stack Web Developer Portfolio — React, Next.js, TypeScript, Python, Docker, and more.",
    url: "https://acharlas.dev",
    siteName: "Axel Charlassier",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Axel Charlassier | Portfolio",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Axel Charlassier | Portfolio",
    description:
      "Full-Stack Web Developer Portfolio — React, Next.js, TypeScript, Python, Docker, and more.",
    images: ["/og-image.png"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#000000",
};

// Helper function to get correct asset path
const getBackgroundImage = () => {
  return `url(${withBasePath("/mountains-bg.jpg")})`;
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" style={{ colorScheme: "dark" }}>
      <body
        className={`${inter.className} min-h-screen flex flex-col bg-cover bg-center bg-fixed`}
        style={{ backgroundImage: getBackgroundImage() }}
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-[#00a2ff] focus:text-white focus:rounded"
        >
          Skip to content
        </a>
        <div className="container mx-auto px-4 flex-grow">
          <ParticleBackground />
          <Header />
          <main id="main-content" className="flex-grow">{children}</main>
        </div>

        <footer className="w-full py-6 border-t border-gray-800 mt-auto">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-4 md:mb-0">
                <p className="text-gray-500 text-sm">
                  &copy; <FooterYear /> Axel Charlassier. All rights reserved.
                </p>
              </div>

              <div className="flex space-x-6">
                <a
                  href="https://github.com/acharlas"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-[#00a2ff] transition-colors"
                  aria-label="GitHub"
                >
                  <Github className="w-5 h-5" />
                </a>
                <a
                  href="https://www.linkedin.com/in/axel-charlassier-a475a8201/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-[#00a2ff] transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a
                  href="mailto:axel.charlassier@gmail.com"
                  className="text-gray-500 hover:text-[#00a2ff] transition-colors"
                  aria-label="Email"
                >
                  <Mail className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
