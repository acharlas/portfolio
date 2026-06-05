import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Header from "@/components/header";
import ParticleBackground from "@/components/particle-background";
import { withBasePath } from "@/lib/base-path";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "404 | Axel Charlassier",
};

export default function NotFound() {
  return (
    <html lang="en" style={{ colorScheme: "dark" }}>
      <body
        className={`${inter.className} min-h-screen flex flex-col bg-cover bg-center bg-fixed`}
        style={{
          backgroundImage: `url(${withBasePath("/mountains-bg.jpg")})`,
        }}
      >
        <ParticleBackground />
        <Header />
        <main className="flex flex-col items-center justify-center flex-1 text-center px-4">
          <h1 className="text-8xl font-bold text-[#e9e1d3] mb-4">404</h1>
          <p className="text-xl text-gray-500 mb-8">Page not found</p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[#00a2ff] hover:text-[#0081cc] transition-colors text-lg"
          >
            <ArrowLeft className="h-5 w-5" />
            Back home
          </Link>
        </main>
      </body>
    </html>
  );
}
