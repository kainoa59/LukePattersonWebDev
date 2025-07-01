"use client";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

export default function CoverPageTransition() {
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    setExpanded(true);

    // Fade out the first <main> element
    const main = document.querySelector("main");
    if (main) {
      main.style.transition = "opacity 1s cubic-bezier(.77,0,.18,1)";
      main.style.opacity = "0";
    }

    // Optional: Clean up by restoring opacity when unmounted
    return () => {
      if (main) {
        main.style.transition = "";
        main.style.opacity = "";
      }
    };
  }, []);

  if (typeof window === "undefined") return null;

  return createPortal(
    <div
      className="fixed left-0 bottom-0 w-full h-full z-[9999] bg-[#7b8f72]"
      style={{
        transition: "transform 1.2s cubic-bezier(.77,0,.18,1)",
        transform: expanded ? "translateY(0)" : "translateY(100%)",
        borderTopLeftRadius: "1rem",
        borderTopRightRadius: "1rem",
        pointerEvents: "auto",
      }}
    />,
    document.body
  );
}