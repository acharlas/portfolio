import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import ParticleBackground from "@/components/particle-background";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Axel Charlassier | Portfolio",
  description: "Full-Stack Web Developer Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className}  min-h-screen flex flex-col bg-cover bg-center bg-fixed`}
        style={{ backgroundImage: "url('/background.jpg')" }}
      >
        <div className="container mx-auto px-4 flex-grow">
          <Header />
          <ParticleBackground />
          <main className="flex-grow">{children}</main>
        </div>
      </body>
    </html>
  );
}

import "./globals.css";
