"use client";
import { useEffect, useState } from "react";
import PageTransition from "@/components/PageTransition";
import CoverPageTransition from "@/components/CoverPageTransition";

export default function PortfolioPage() {
  const [showCover, setShowCover] = useState(false);
  const [fadeIn, setFadeIn] = useState(false);

  // Trigger fade-in after mount
  useEffect(() => {
    const timeout = setTimeout(() => setFadeIn(true), 50);
    return () => clearTimeout(timeout);
  }, []);

  // Handle clicks on navbar links to show cover transition
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest(".navbar-link") as HTMLAnchorElement | null;
      if (link) {
        setShowCover(true);
      }
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);

  return (
    <>
      <PageTransition />
      {showCover && <CoverPageTransition />}
      <main>
        <div
          id="main-div"
          className="w-full min-h-[60vh] bg-[#7b8f72] rounded-b-xl flex items-center justify-center mt-12"
          style={{
            opacity: fadeIn ? 1 : 0,
            // fade-in effect
            transition: "opacity 1.5s cubic-bezier(.77,0,.18,1)",
          }}
        >
          <h1 className="text-3xl font-bold text-white p-8">About Me</h1>
        </div>
        {/* Portfolio here */}
      </main>
    </>
  );
}
