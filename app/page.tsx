"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import PageTransition from "@/components/PageTransition";

export default function Home() {
  // green cover animation states
  const [covering, setCovering] = useState(false);
  const [phase, setPhase] = useState<0 | 1 | 2>(0);
  const [phase1Started, setPhase1Started] = useState(false);

  // green section dimensions and position
  const [greenTop, setGreenTop] = useState(0);
  const [greenHeight, setGreenHeight] = useState(0);
  const [greenLeft, setGreenLeft] = useState(0);
  const [greenWidth, setGreenWidth] = useState(0);

  // redirect path for navigation
  const [redirectPath, setRedirectPath] = useState<string>("/portfolio");
  const router = useRouter();
  const greenRef = useRef<HTMLDivElement>(null);

  // scroll-based fade and progress
  const [scrollY, setScrollY] = useState(0);
  const [scrollRange, setScrollRange] = useState(0);

  // mobile detection
  const [isMobile, setIsMobile] = useState(false);

  // detect if the viewport is mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleAnimatedRedirect = (targetPath: string) => {
    setRedirectPath(targetPath);
    if (greenRef.current) {
      const rect = greenRef.current.getBoundingClientRect();
      const extraMobileMargin = isMobile ? 16 : 0; // 16px = Tailwind's mb-4
      setGreenTop(rect.top);
      setGreenHeight(rect.height + extraMobileMargin); // Include extra spacing
      setGreenLeft(rect.left);
      setGreenWidth(rect.width);
      setCovering(true);
      setPhase1Started(false);
      setPhase(1);
    }
  };

  // triggers horizontal expansion after phase 1 starts
  useEffect(() => {
    if (covering && phase === 1 && !phase1Started) {
      requestAnimationFrame(() => setPhase1Started(true));
    }
  }, [covering, phase, phase1Started]);

  // handles phase changes and redirect after animation
  useEffect(() => {
    if (!covering) return;
    if (phase === 1 && phase1Started) {
      const timeout = setTimeout(() => setPhase(2), 500);
      return () => clearTimeout(timeout);
    }
    if (phase === 2) {
      const timeout = setTimeout(() => {
        router.push(redirectPath);
      }, 700);
      return () => clearTimeout(timeout);
    }
  }, [phase, covering, phase1Started, router, redirectPath]);

  // listens for navbar link clicks and triggers animation
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest(".navbar-link") as HTMLAnchorElement | null;
      if (link) {
        e.preventDefault();
        const href = link.getAttribute("href");
        if (href) {
          handleAnimatedRedirect(href);
        }
      }
    };
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  useEffect(() => {
    const updateScrollRange = () => {
      setScrollRange(document.body.scrollHeight - window.innerHeight);
    };
    updateScrollRange();
    window.addEventListener("resize", updateScrollRange);

    // Force update after paint to fix overlay animation on load
    const timeout = setTimeout(updateScrollRange, 500);

    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("resize", updateScrollRange);
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timeout);
    };
  }, []);

  // how much to fade based on scroll
  const fade = Math.min(scrollY / 200, 1);
  // progress for bar and green section
  const barAndGreenProgress =
    scrollRange > 0 ? Math.min(scrollY / scrollRange, 1) : 0;

  // green cover style for each phase
  let greenCoverStyle: React.CSSProperties = {};
  if (covering) {
    if (phase === 1) {
      greenCoverStyle = phase1Started
        ? {
            position: "fixed",
            left: 0,
            width: "100vw",
            top: greenTop,
            height: greenHeight,
            zIndex: 9999,
            marginTop: 0,
            transition:
              "width 0.5s cubic-bezier(.77,0,.18,1), left 0.5s cubic-bezier(.77,0,.18,1)",
            overflow: "hidden",
            boxShadow: "0 -5px 20px -4px black",
          }
        : {
            position: "fixed",
            left: greenLeft,
            width: greenWidth,
            top: greenTop,
            height: greenHeight,
            zIndex: 9999,
            marginTop: 0,
            transition: "none",
            overflow: "hidden",
            boxShadow: "0 -5px 20px -4px black",
          };
    } else if (phase === 2) {
      greenCoverStyle = {
        position: "fixed",
        left: 0,
        width: "100vw",
        top: 0,
        height: "100vh",
        zIndex: 9999,
        marginTop: 0,
        borderRadius: "0px",
        transition:
          "top 0.7s cubic-bezier(.77,0,.18,1), height 0.7s cubic-bezier(.77,0,.18,1)",
        overflow: "hidden",
        boxShadow: "0 -5px 20px -4px black",
      };
    } else {
      greenCoverStyle = {
        position: "fixed",
        left: greenLeft,
        width: greenWidth,
        top: greenTop,
        height: greenHeight,
        zIndex: 9999,
        marginTop: 0,
        transition: "none",
        overflow: "hidden",
        boxShadow: "0 -5px 20px -4px black",
      };
    }
  }

  // animate marginTop and height together for green section
  const animatedMarginTop = barAndGreenProgress * 72;
  // const animatedHeight = `calc(60vh - ${animatedMarginTop}px)`;

  return (
    <>
      <PageTransition />
      <div
        className="home-main px-8 sm:px-12 md:px-20 lg:px-24 xl:px-28 2xl:px-32"
        style={{ overscrollBehavior: "none" }}
      >
        {/* three-column section */}
        <div className="relative flex flex-col md:flex-row w-full h-auto max-h-[70vh] mx-auto mt-12 mb-4 md:my-0 md:mt-8 items-center md:items-stretch">
          {/* left column */}
          <div
            className="w-1/3 text-right pr-4 z-20 flex flex-col justify-center items-center"
            style={{
              opacity: 1 - fade,
              transition:
                "opacity 0.3s, transform 0.3s cubic-belzier(.77,0,.18,1)",
              transform: `translateX(-${barAndGreenProgress * 125}%)`,
            }}
          >
            <span
              className="bg-white/60 p-4"
              style={{ boxShadow: "0 8px 16px -10px rgba(71,85,105,0.7)" }}
            >
              <h1
                className="text-zinc-800 pb-1 lg:pb-4 px-2 lg:px-8 text-4xl lg:text-5xl tracking-wide font-extrabold text-center whitespace-nowrap"
                style={{ textShadow: "0 1px 4px #7b8f72, 0 2px 3px #7b8f72" }}
              >
                Luke Patterson
              </h1>
              <h3
                className="text-zinc-800 pt-1 lg:pt-4 px-2 lg:px-8 text-lg lg:text-2xl tracking-wide font-semibold text-center whitespace-nowrap"
                style={{ textShadow: "0 1px 1px #7b8f72, 0 1px 2px #7b8f72" }}
              >
                Full stack web developer
              </h3>
            </span>
          </div>
          {/* center column */}
          <div className="w-1/3 relative z-10 overflow-visible flex items-center justify-center">
            <div
              className="h-full flex items-center justify-center fade-edges"
              style={{
                minWidth: 0,
                ...(isMobile
                  ? {
                      opacity: 1 - barAndGreenProgress * 2,
                      transition: "opacity 0.3s",
                    }
                  : {
                      marginBottom:
                        barAndGreenProgress >= 0.5
                          ? `${((barAndGreenProgress - 0.5) / 0.5) * 100}vh`
                          : "0vh",
                      transition: "margin-bottom 0.3s",
                    }),
              }}
            >
              <Image
                src="/portfolioCover.jpg"
                alt="center"
                width={2000}
                height={2000}
                style={{
                  height: "auto",
                  width: "auto",
                  maxWidth: "50vw",
                }}
                className="shadow-lg max-h-[40vh] md:max-h-[60vh] my-8 md:my-0"
                priority
              />
            </div>
          </div>
          {/* right column */}
          <div
            className="w-full md:w-1/3 text-left z-20 flex justify-center items-center"
            style={{
              opacity: 1 - fade,
              transition:
                "opacity 0.3s, transform 0.3s cubic-belzier(.77,0,.18,1)",
              transform: `translateX(${barAndGreenProgress * 125}%)`,
            }}
          >
            {" "}
            <span
              className="bg-white/60 p-4"
              style={{ boxShadow: "0 8px 16px -10px rgba(71,85,105,0.7)" }}
            >
              <p
                className="text-zinc-800 text-xs sm:text-base md:text-sm tracking-wide font-semibold text-center whitespace-nowrap px-2 lg:px-8"
                style={{ textShadow: "0 1px 1px #7b8f72, 0 1px 1px #7b8f72" }}
              >
                Bachelor of Science in Computer Science, SDSU
                <br />
                Web Developer for Dahlia Coastal Living Properties
              </p>
            </span>
          </div>
        </div>
        {/* white bar overlays the green section */}
        <div
          style={{
            position: "relative",
            width: "100vw",
            left: "50%",
            right: "50%",
            marginLeft: "-50vw",
          }}
        >
          <div
            style={{
              boxShadow: "0 10px 5px -4px rgba(71, 85, 105, 0.7)",
              position: "absolute",
              left: 0,
              top: 0,
              width: `${barAndGreenProgress * 100}%`,
              height: "72px",
              background: "#fff",
              transition: "width 0.2s, height 0.2s, opacity 0.2s",
              zIndex: 100,
              opacity: barAndGreenProgress > 0 ? 1 : 0,
              pointerEvents: "none",
            }}
          />
        </div>
        {/* green section, shrinks from bottom as marginTop increases */}
        <div
          ref={greenRef}
          className="w-full bg-[#7b8f72]"
          style={
            covering
              ? greenCoverStyle
              : {
                  boxShadow: "inset 0 4px 10px 5px rgba(71, 85, 105, 0.7)",
                  marginTop: `${animatedMarginTop + (isMobile ? 16 : 0)}px`,
                  height: "60vh",
                  position: "relative",
                  zIndex: 1,
                  transition:
                    "margin-top 0.7s cubic-bezier(.77,0,.18,1), height 0.7s cubic-bezier(.77,0,.18,1)",
                }
          }
        >
          {/* centered button */}
          {!covering && (
            <div
              className="absolute inset-0 flex items-center justify-center"
              style={{
                opacity: fade,
                transition:
                  "opacity 0.3s, transform 0.3s cubic-bezier(.77,0,.18,1)",
                willChange: "opacity",
              }}
            >
              <button
                onClick={() => handleAnimatedRedirect("/portfolio")}
                className="px-8 py-4 z-20 rounded-lg bg-white text-zinc-800 font-bold text-2xl shadow-zinc-600/70 shadow-xl transition-all duration-150 hover:scale-105 hover:bg-zinc-200 active:scale-95 active:bg-[#43513e] active:text-white"
              >
                View Portfolio
              </button>
            </div>
          )}
        </div>
        {/* placeholder to prevent layout shift during covering */}
        {covering && (
          <div
            style={{
              width: greenWidth,
              height: greenHeight,
              marginTop: `${barAndGreenProgress * 72}px`,
              transition: "height 0.7s cubic-bezier(.77,0,.18,1)",
            }}
          />
        )}
      </div>
    </>
  );
}
