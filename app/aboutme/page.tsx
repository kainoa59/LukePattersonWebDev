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
          className="w-full min-h-[60vh] bg-[#7b8f72] rounded-b-xl flex flex-col items-center justify-center mt-12 px-6 lg:px-24"
          style={{
            opacity: fadeIn ? 1 : 0,
            // fade-in effect
            transition: "opacity 1.5s cubic-bezier(.77,0,.18,1)",
          }}
        >
          <h1 className="text-5xl font-extrabold text-white">Luke Patterson</h1>
          <h1 className="text-2xl font-semibold text-white">
            San Diego, CA • (619)-204-1260 • kainoa59@gmail.com
          </h1>
          <h1 className="text-3xl font-bold text-white">Profile:</h1>
          <p className="text-xl text-white">
            Full-stack web developer and Honors Computer Science graduate with
            hands-on experience in React (Next.js), Node.js, Tailwind/Bootstrap,
            and various SQL and NoSQL DBMS. Over two years experience in
            full-stack web evelopment, and two years of experience applying
            mathematical analysis to software projects in C++, Java, and Python.
            Strong communicator and team player with a background in leadership,
            logistics, and customer interactions. Able to quickly regain fluency
            in topics after focusing on other technologies.
            {/* I come from a family
            who loves to travel and have done so extensively — this
            has helped me thrive in dynamic, fast-changing environments and
            communicate cross-culturally. */}
          </p>
          <h1 className="text-3xl font-bold text-white">Education:</h1>
          <p className="text-xl text-white">
            B.S. in Computer Science, Honors Program (Cum Laude), San Diego
            State University, 2024
          </p>
          <h1 className="text-3xl font-bold text-white">
            Skills & Achievements:
          </h1>
          <ul className="list-disc list-inside text-xl text-white">
            <li>React, Node.js, JavaScript/TypeScript</li>
            <li>Tailwind CSS, Boostrap, Shadcn, Vanilla CSS and HTML</li>
            <li>Git & GitHub file and collaboration management</li>
            <li>MySQL, Firebase, and MongoDB</li>
            <li>Linux system administration</li>
            <li>Python 3.8+ (basic)</li>
          </ul>
          <h1 className="text-3xl font-bold text-white">
            Professional Experience:
          </h1>
        </div>
        {/* Portfolio here */}
      </main>
    </>
  );
}
