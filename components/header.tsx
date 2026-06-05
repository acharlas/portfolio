"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { FileText } from "lucide-react";
import { BASE_PATH } from "@/lib/base-path";
import { useLanguage } from "@/components/language-provider";

const normalizePath = (path: string) => {
  const withoutBase =
    BASE_PATH && path.startsWith(BASE_PATH)
      ? path.slice(BASE_PATH.length) || "/"
      : path;
  return withoutBase === "/" ? "/" : withoutBase.replace(/\/$/, "");
};

type NavLabelKey = "home" | "about" | "projects" | "contact";

const navLabels: Record<"en" | "fr", Record<NavLabelKey, string>> = {
  en: { home: "Home", about: "About me", projects: "Projects", contact: "Contact" },
  fr: { home: "Accueil", about: "À propos", projects: "Projets", contact: "Contact" },
};

export default function Header() {
  const { lang } = useLanguage();
  const pathname = usePathname();
  const currentPath = normalizePath(pathname ?? "/");

  const links: { href: string; labelKey: NavLabelKey }[] = [
    { href: "/", labelKey: "home" },
    { href: "/about", labelKey: "about" },
    { href: "/projects", labelKey: "projects" },
    { href: "/contact", labelKey: "contact" },
  ];

  return (
    <div className="sticky top-0 z-50 flex justify-center py-4 w-full">
      <nav className="bg-black/30 backdrop-blur-md rounded-full px-6 py-2 border border-white/10">
        <ul className="flex items-center space-x-6">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-[#00a2ff] focus-visible:ring-2 focus-visible:ring-[#00a2ff] focus-visible:ring-offset-2 focus-visible:ring-offset-black rounded",
                  normalizePath(link.href) === currentPath
                    ? "text-[#00a2ff]"
                    : "text-white/80"
                )}
              >
                {navLabels[lang][link.labelKey]}
              </Link>
            </li>
          ))}
          <li>
            <ResumeLink />
          </li>
        </ul>
      </nav>
    </div>
  );
}

const resumeLinks: Record<"en" | "fr", { label: string; url: string }> = {
  en: {
    label: "Resume",
    url: "https://drive.google.com/file/d/1DXmWEk-c-Eg7olLezuHYqHxux81EtMnv/view?usp=sharing",
  },
  fr: {
    label: "CV",
    url: "https://drive.google.com/file/d/1pQ25K4UvRM-8UU_GoJwCOhwxgQwNyL76/view?usp=sharing",
  },
};

function ResumeLink() {
  const { lang } = useLanguage();
  const { label, url } = resumeLinks[lang];

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center text-sm font-medium text-white/80 hover:text-[#00a2ff] transition-colors focus-visible:ring-2 focus-visible:ring-[#00a2ff] focus-visible:ring-offset-2 focus-visible:ring-offset-black rounded"
    >
      <FileText className="mr-1 h-4 w-4" />
      {label}
    </a>
  );
}
