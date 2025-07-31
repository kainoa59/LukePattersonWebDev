"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const router = useRouter();
  const pathname = usePathname();

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
  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    href: string
  ) => {
    e.preventDefault();
    setMenuOpen(false); // Close the menu on click
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
          className={`text-zinc-800 hover:text-[#7b8f72] active:text-[#43513e] navbar-link ${
            pathname === "/"
              ? "pointer-events-none cursor-default text-zinc-800 font-bold"
              : ""
          }`}
          onClick={(e) => handleNavClick(e, "/")}
        >
          Welcome
        </Link>
        {/* Hamburger for mobile */}
        <button
          className="md:hidden flex flex-col group justify-center items-center w-8 h-8"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span
            className={`
              block w-6 h-0.5 mb-1 transition-all
             bg-zinc-800
             group-active:bg-white
              ${menuOpen ? "rotate-45 translate-y-2" : ""}
            `}
          />
          <span
            className={`
              block w-6 h-0.5 mb-1 transition-all
             bg-zinc-800
             group-active:bg-white
             ${menuOpen ? "opacity-0" : ""}
           `}
          />
          <span
            className={`
              block w-6 h-0.5 transition-all
              bg-zinc-800
              group-active:bg-white
              ${menuOpen ? "-rotate-45 -translate-y-2" : ""}
            `}
          />
        </button>
        <div className="hidden md:flex space-x-6">
          <Link
            href="/portfolio"
            className={`text-zinc-800 hover:text-[#7b8f72] active:text-[#43513e] navbar-link ${
              pathname === "/portfolio"
                ? "pointer-events-none cursor-default text-zinc-800 font-bold"
                : ""
            }`}
            onClick={(e) => handleNavClick(e, "/portfolio")}
          >
            Portfolio
          </Link>
          <Link
            href="/aboutme"
            className={`text-zinc-800 hover:text-[#7b8f72] active:text-[#43513e] navbar-link ${
              pathname === "/aboutme"
                ? "pointer-events-none cursor-default text-zinc-800 font-bold"
                : ""
            }`}
            onClick={(e) => handleNavClick(e, "/aboutme")}
          >
            About Me
          </Link>
          <Link
            href="/contact"
            className={`text-zinc-800 hover:text-[#7b8f72] active:text-[#43513e] navbar-link ${
              pathname === "/contact"
                ? "pointer-events-none cursor-default text-zinc-800 font-bold"
                : ""
            }`}
            onClick={(e) => handleNavClick(e, "/contact")}
          >
            Contact
          </Link>
        </div>
      </div>
      {/* Mobile menu */}
      <div
        className="md:hidden absolute top-full left-0 w-full bg-white border-zinc-800 border-t-2 shadow-lg flex flex-col items-center py-4 space-y-2 z-[10001] transition-all duration-300 origin-top"
        style={{
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? "auto" : "none",
          transform: menuOpen ? "scaleY(1)" : "scaleY(0.8)",
          maxHeight: menuOpen ? "400px" : "0px",
          overflow: "hidden",
        }}
      >
        <Link
          href="/portfolio"
          className={`text-zinc-800 hover:text-[#7b8f72] active:text-[#43513e] navbar-link ${
            pathname === "/portfolio"
              ? "pointer-events-none cursor-default text-zinc-800 font-bold"
              : ""
          }`}
          onClick={(e) => handleNavClick(e, "/portfolio")}
        >
          Portfolio
        </Link>
        <Link
          href="/aboutme"
          className={`text-zinc-800 hover:text-[#7b8f72] active:text-[#43513e] navbar-link ${
            pathname === "/aboutme"
              ? "pointer-events-none cursor-default text-zinc-800 font-bold"
              : ""
          }`}
          onClick={(e) => handleNavClick(e, "/aboutme")}
        >
          About Me
        </Link>
        <Link
          href="/contact"
          className={`text-zinc-800 hover:text-[#7b8f72] active:text-[#43513e] navbar-link ${
            pathname === "/contact"
              ? "pointer-events-none cursor-default text-zinc-800 font-bold"
              : ""
          }`}
          onClick={(e) => handleNavClick(e, "/contact")}
        >
          Contact
        </Link>
      </div>
    </nav>
  );
};
