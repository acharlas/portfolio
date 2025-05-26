"use client";

import { useState, useEffect } from "react";

interface ImagePreloaderProps {
  src: string;
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export default function ImagePreloader({
  src,
  children,
  fallback,
}: ImagePreloaderProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();

    img.onload = () => {
      setIsLoaded(true);
    };

    img.onerror = () => {
      setIsLoaded(true); // Still show content even if image fails
    };

    img.src = src;

    // Cleanup
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

  return (
    <div
      className={`transition-opacity duration-500 ${
        isLoaded ? "opacity-100" : "opacity-0"
      }`}
    >
      {children}
    </div>
  );
}
