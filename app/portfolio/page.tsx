"use client";
import { useEffect, useState, useRef } from "react";
import PageTransition from "@/components/PageTransition";
import CoverPageTransition from "@/components/CoverPageTransition";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function PortfolioPage() {
  const [showCover, setShowCover] = useState(false);
  const [fadeIn, setFadeIn] = useState(false);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  // refs for each video
  const blockedRef = useRef<HTMLVideoElement>(null);
  const finalRef = useRef<HTMLVideoElement>(null);

  // Helper to check if screen is mobile
  const isMobile = () =>
    typeof window !== "undefined" && window.innerWidth < 640;

  useEffect(() => {
    // Trigger fade-in after mount
    const timeout = setTimeout(() => setFadeIn(true), 50);
    return () => clearTimeout(timeout);
  }, []);

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

  // Pause and reset video on mouse leave (desktop only)
  const handleMouseLeave = () => {
    if (!isMobile()) {
      if (hoveredIdx === 0 && blockedRef.current) {
        blockedRef.current.pause();
        blockedRef.current.currentTime = 0;
      }
      if (hoveredIdx === 1 && finalRef.current) {
        finalRef.current.pause();
        finalRef.current.currentTime = 0;
      }
      setHoveredIdx(null);
    }
  };

  // Only enable hover on desktop
  const handleMouseEnter = (idx: number) => {
    if (!isMobile()) setHoveredIdx(idx);
  };

  // On mobile, always show both videos, no hover
  const showBothVideos =
    typeof window !== "undefined" && window.innerWidth < 640;

  return (
    <>
      <PageTransition />
      {showCover && <CoverPageTransition />}
      <main>
        <div
          id="main-div"
          className="w-full min-h-[60vh] bg-[#7b8f72] rounded-b-xl flex items-center justify-center mt-6"
        >
          <div
            style={{
              opacity: fadeIn ? 1 : 0,
              transition: "opacity 1.5s cubic-bezier(.77,0,.18,1)",
            }}
            className="grid grid-cols-1 xl:grid-cols-2 gap-3 md:gap-5 lg:gap-7 p-6 md:p-10 lg:p-12 xl:p-14 2xl:p-16 w-full"
          >
            <Card>
              <CardHeader>
                <CardTitle className="justify-self-center mt-2 mb-4 sm:mb-6 text-xl sm:text-xl md:text-xl lg:text-2xl xl:text-lg 2xl:text-xl">C++ Robotics</CardTitle>
                <div
                  className="flex flex-col gap-3 md:gap-5 lg:gap-7 xl:gap-10 sm:flex-row px-4"
                  onMouseLeave={handleMouseLeave}
                >
                  {(showBothVideos ||
                    hoveredIdx === null ||
                    hoveredIdx === 0) && (
                    <div
                        className={`transition-all duration-300 flex flex-col items-center
                        ${hoveredIdx === 0 && !showBothVideos ? "mx-auto sm:w-1/2" : "w-full sm:w-1/2"}`}
                        >
                      <video
                        ref={blockedRef}
                        src="/videos/MutedBlocked.mp4"
                        controls
                        muted
                        autoPlay={false}
                        loop={false}
                        className="w-full max-w-80 h-auto rounded-lg justify-self-center"
                        onMouseEnter={() => handleMouseEnter(0)}
                      />
                      <CardDescription className="mt-6 mb-16 sm:mt-6 sm:mb-6 justify-self-center text-base sm:text-sm lg:text-lg xl:text-xs 2xl:text-md">Line Following and Object Avoidance</CardDescription>
                    </div>
                  )}
                  {(showBothVideos ||
                    hoveredIdx === null ||
                    hoveredIdx === 1) && (
                    <div
                        className={`transition-all duration-300 flex flex-col items-center
                        ${hoveredIdx === 1 && !showBothVideos ? "mx-auto sm:w-1/2" : "w-full sm:w-1/2"}`}
                        >
                      <video
                        ref={finalRef}
                        src="/videos/MutedFinal.mp4"
                        controls
                        controlsList="novolume"
                        muted
                        autoPlay={false}
                        loop={false}
                        className="w-full max-w-80 h-auto rounded-lg justify-self-center"
                        onMouseEnter={() => handleMouseEnter(1)}
                      />
                      <CardDescription className="mt-6 mb-16 sm:mt-6 sm:mb-6 justify-self-center text-base sm:text-sm lg:text-lg xl:text-xs 2xl:text-md">Maze Solving and Object Collection</CardDescription>
                    </div>
                  )}
                </div>
                {/* <CardAction>Action</CardAction> */}
              </CardHeader>
              <CardContent>
                <p>content for card one</p>
              </CardContent>
              <CardFooter>
                <p>footer one</p>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Web Development</CardTitle>
                <CardDescription>second card description</CardDescription>
                <CardAction>Action</CardAction>
              </CardHeader>
              <CardContent>
                <p>content for card two</p>
              </CardContent>
              <CardFooter>
                <p>footer two</p>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Virtualization</CardTitle>
                <CardDescription>third card description</CardDescription>
                <CardAction>Action</CardAction>
              </CardHeader>
              <CardContent>
                <p>content for card three</p>
              </CardContent>
              <CardFooter>
                <p>footer three</p>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>3D Game Programming</CardTitle>
                <CardDescription>fourth card description</CardDescription>
                <CardAction>Action</CardAction>
              </CardHeader>
              <CardContent>
                <p>content for card four</p>
              </CardContent>
              <CardFooter>
                <p>footer four</p>
              </CardFooter>
            </Card>
          </div>
        </div>
        {/* Portfolio content here */}
      </main>
    </>
  );
}
