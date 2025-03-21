"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { FileText, ChevronDown } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function Header() {
  const pathname = usePathname()

  const links = [
    { href: "/", label: "About Me" },
    { href: "/projects", label: "Projects" },
    { href: "/contact", label: "Contact" },
  ]

  return (
    <div className="flex justify-center py-8">
      <nav className="bg-black/30 backdrop-blur-md rounded-full px-6 py-2 border border-white/10">
        <ul className="flex items-center space-x-6">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-[#00a2ff]",
                  pathname === link.href ? "text-[#00a2ff]" : "text-white/80",
                )}
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li>
            <ResumeDropdown />
          </li>
        </ul>
      </nav>
    </div>
  )
}

function ResumeDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center text-sm font-medium text-white/80 hover:text-[#00a2ff] transition-colors focus:outline-none">
        Resume <ChevronDown className="ml-1 h-4 w-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem asChild>
          <a
            href="https://drive.google.com/your-english-resume-link"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center cursor-pointer"
          >
            <FileText className="mr-2 h-4 w-4" />
            <span>English</span>
          </a>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <a
            href="https://drive.google.com/your-french-resume-link"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center cursor-pointer"
          >
            <FileText className="mr-2 h-4 w-4" />
            <span>French</span>
          </a>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

