"use client";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

export const Navbar = () => {
  const navRef = useRef<HTMLElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (navRef.current) {
      const height = navRef.current.offsetHeight;
      document.documentElement.style.setProperty(
        "--navbar-height",
        `${height}px`
      );
    }
  }, []);

  // Handler for delayed navigation
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, href: string) => {
    e.preventDefault();
    if (href !== window.location.pathname) {
      setTimeout(() => {
        router.push(href);
      }, 1000); // 1.2 seconds
    }
  };

  return (
    <nav ref={navRef} className="fixed top-0 z-[10000] w-full bg-white shadow">
      <div className="container mx-auto flex items-center justify-between px-4 py-4">
        <Link
          href="/"
          className="hover:text-[#7b8f72] navbar-link"
          onClick={e => handleNavClick(e, "/")}
        >
          Welcome
        </Link>
        <div className="hidden md:flex space-x-6">
          <Link
            href="/portfolio"
            className="hover:text-[#7b8f72] navbar-link"
            onClick={e => handleNavClick(e, "/portfolio")}
          >
            Portfolio
          </Link>
          <Link
            href="/aboutme"
            className="hover:text-[#7b8f72] navbar-link"
            onClick={e => handleNavClick(e, "/aboutme")}
          >
            About Me
          </Link>
          <Link
            href="/contact"
            className="hover:text-[#7b8f72] navbar-link"
            onClick={e => handleNavClick(e, "/contact")}
          >
            Contact
          </Link>
        </div>
      </div>
    </nav>
  );
};