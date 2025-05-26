"use client";

import { useState, useEffect } from "react";

interface ImagePreloaderProps {
  src: string;
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

// Global cache with sessionStorage persistence
const imageCache = (() => {
  const cache = new Set<string>();

  // Load from sessionStorage on initialization
  if (typeof window !== "undefined") {
    try {
      const stored = sessionStorage.getItem("imageCache");
      if (stored) {
        JSON.parse(stored).forEach((src: string) => cache.add(src));
      }
    } catch (e) {
      // Ignore parsing errors
    }
  }

  return {
    has: (src: string) => cache.has(src),
    add: (src: string) => {
      cache.add(src);
      if (typeof window !== "undefined") {
        try {
          sessionStorage.setItem("imageCache", JSON.stringify([...cache]));
        } catch (e) {
          // Ignore storage errors
        }
      }
    },
  };
})();

export default function ImagePreloader({
  src,
  children,
  fallback,
}: ImagePreloaderProps) {
  const [isLoaded, setIsLoaded] = useState(() => imageCache.has(src));

  useEffect(() => {
    if (imageCache.has(src)) {
      setIsLoaded(true);
      return;
    }

    const img = new Image();

    img.onload = () => {
      imageCache.add(src);
      setIsLoaded(true);
    };

    img.onerror = () => {
      imageCache.add(src);
      setIsLoaded(true);
    };

    img.src = src;

    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [src]);

  if (!isLoaded) {
    return (
      fallback || (
        <div className="min-h-screen bg-black flex items-center justify-center">
          <div className="flex flex-col items-center space-y-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#00a2ff]"></div>
            <p className="text-gray-400 text-sm">Loading...</p>
          </div>
        </div>
      )
    );
  }

  return <>{children}</>;
}
