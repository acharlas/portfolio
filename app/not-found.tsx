import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "404 | Axel Charlassier",
};

export default function NotFound() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center text-center">
      <h1 className="text-8xl font-bold text-[#e9e1d3] mb-4">404</h1>
      <p className="text-xl text-gray-500 mb-8">Page not found</p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-[#00a2ff] hover:text-[#0081cc] transition-colors text-lg"
      >
        <ArrowLeft className="h-5 w-5" />
        Back home
      </Link>
    </div>
  );
}
