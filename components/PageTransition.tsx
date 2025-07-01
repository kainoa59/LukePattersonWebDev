"use client";
import { useEffect, useState } from "react";

/**
 * PageTransition overlays a full-screen green div that slides down to reveal the page.
 * Place <PageTransition /> at the top of your page component.
 */
export default function PageTransition() {
  const [visible, setVisible] = useState(true);
  const [shouldRender, setShouldRender] = useState(true);

  useEffect(() => {
    // Start the slide-down animation after mount
    const hideTimeout = setTimeout(() => setVisible(false), 50); // Start animation after mount
    const unmountTimeout = setTimeout(() => setShouldRender(false), 1000); // Wait for animation to finish
    return () => {
      clearTimeout(hideTimeout);
      clearTimeout(unmountTimeout);
    };
  }, []);

  if (!shouldRender) return null;

  return (
    <div
      className="fixed left-0 top-0 w-full h-full z-[9999] bg-[#7b8f72]"
      style={{
        transition: "transform 1.2s cubic-bezier(.77,0,.18,1)",
        transform: visible ? "translateY(0)" : "translateY(100%)",
        borderBottomLeftRadius: "1rem",
        borderBottomRightRadius: "1rem",
        pointerEvents: "none",
      }}
    />
  );
}