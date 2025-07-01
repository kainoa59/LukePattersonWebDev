"use client";
import { useEffect, useState } from "react";

const FINAL_HEIGHT = "0vh"; // Match your green section's height

export default function GreenCoverTransition({ expandUp = false }: { expandUp?: boolean }) {
  const [coverAnim, setCoverAnim] = useState(expandUp ? false : true);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (expandUp) {
      // Animate from FINAL_HEIGHT to 100vh (expand up)
      setCoverAnim(true);
      timeout = setTimeout(() => setCoverAnim(false), 1200);
    } else {
      // Animate from 100vh to FINAL_HEIGHT (cover down)
      timeout = setTimeout(() => setCoverAnim(false), 100);
    }
    return () => clearTimeout(timeout);
  }, [expandUp]);

  return (
    <div
      className="fixed left-0 bottom-0 w-full z-[9999] bg-[#7b8f72] rounded-t-xl"
      style={{
        height: coverAnim ? "100vh" : FINAL_HEIGHT,
        transition: "height 1.2s cubic-bezier(.77,0,.18,1)",
        pointerEvents: "none",
      }}
    />
  );
}