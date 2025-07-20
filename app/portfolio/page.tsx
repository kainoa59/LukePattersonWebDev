"use client";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import PageTransition from "@/components/PageTransition";
import CoverPageTransition from "@/components/CoverPageTransition";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function PortfolioPage() {
  const [showCover, setShowCover] = useState(false);
  const [fadeIn, setFadeIn] = useState(false);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  // refs for each robot video
  const blockedRef = useRef<HTMLVideoElement>(null);
  const finalRef = useRef<HTMLVideoElement>(null);

  // refs to control 3D image/video swap on hover
  const [showGameVideo, setShowGameVideo] = useState(false);
  const gameVideoRef = useRef<HTMLVideoElement>(null);

  // Store the dynamic height of the video
  const [videoHeight, setVideoHeight] = useState<number | null>(null);

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

  // Dynamically measure the height of the first video
  useEffect(() => {
    function updateHeight() {
      if (blockedRef.current) {
        setVideoHeight(blockedRef.current.clientHeight);
      }
    }
    updateHeight();
    window.addEventListener("resize", updateHeight);
    const video = blockedRef.current;
    if (video) {
      video.addEventListener("loadedmetadata", updateHeight);
    }
    return () => {
      window.removeEventListener("resize", updateHeight);
      if (video) {
        video.removeEventListener("loadedmetadata", updateHeight);
      }
    };
  }, []);

  return (
    <>
      <PageTransition />
      {showCover && <CoverPageTransition />}
      <main>
        <div
          id="main-div"
          className="w-full min-h-[60vh] bg-[#7b8f72] flex items-center justify-center mt-1 md:mt-6"
        >
          <div
            style={{
              opacity: fadeIn ? 1 : 0,
              transition: "opacity 1.5s cubic-bezier(.77,0,.18,1)",
            }}
            className="grid grid-cols-1 xl:grid-cols-2 gap-3 md:gap-5 lg:gap-7 p-6 md:p-10 lg:p-12 xl:p-14 2xl:p-16 xl:px-28 2xl:px-32 w-full"
          >
            <Card className="shadow-zinc-950/80 shadow-2xl">
              <CardHeader className="">
                <CardTitle className="mt-2 mb-4 sm:mb-6 text-zinc-800 text-xl sm:text-xl md:text-xl lg:text-2xl xl:text-lg 2xl:text-xl text-center">
                  <span className="inline-block pb-4 px-20 border-b">
                    C++ Robotics
                  </span>
                </CardTitle>
                <div
                  className="flex flex-col xl:min-h-100 xl:max-h-150 gap-3 md:gap-5 lg:gap-7 xl:gap-10 sm:flex-row px-4"
                  onMouseLeave={handleMouseLeave}
                >
                  {(showBothVideos ||
                    hoveredIdx === null ||
                    hoveredIdx === 0) && (
                    <div
                      className={`transition-all duration-300 flex flex-col items-center sm:w-1/2 w-full max-w-80 mx-auto`}
                    >
                      <video
                        ref={blockedRef}
                        src="/videos/MutedBlocked.mp4"
                        controls
                        muted
                        autoPlay={false}
                        loop={false}
                        className="w-full h-auto rounded-lg justify-self-center shadow-zinc-950/80 shadow-lg"
                        onMouseEnter={() => handleMouseEnter(0)}
                      />
                      <CardDescription className="mt-6 mb-16 sm:mb-6 pt-2 justify-self-center text-base sm:text-sm lg:text-lg xl:text-xs 2xl:text-md">
                        Line Following and Object Avoidance
                      </CardDescription>
                    </div>
                  )}
                  {(showBothVideos ||
                    hoveredIdx === null ||
                    hoveredIdx === 1) && (
                    <div
                      className={`transition-all duration-300 flex flex-col items-center w-full sm:w-1/2 max-w-80 mx-auto`}
                    >
                      <video
                        ref={finalRef}
                        src="/videos/MutedFinal.mp4"
                        controls
                        controlsList="novolume"
                        muted
                        autoPlay={false}
                        loop={false}
                        className="w-full h-auto rounded-lg justify-self-center shadow-zinc-950/80 shadow-lg"
                        onMouseEnter={() => handleMouseEnter(1)}
                      />
                      <CardDescription className="mt-6 mb-16 sm:mb-6 pt-2 justify-self-center text-base sm:text-sm lg:text-lg xl:text-xs 2xl:text-md">
                        Maze Solving and Object Collection
                      </CardDescription>
                    </div>
                  )}
                </div>
                {/* <CardAction>Action</CardAction> */}
              </CardHeader>
              <CardContent className="mt-auto">
                <p className="indent-8 text-justify text-zinc-700 shadow-[inset_0_10px_10px_-10px_#09090b80,inset_0_-10px_10px_-10px_#09090b80] px-4 py-4 -mt-4 border-t border-b border-t-zinc-500 border-b-zinc-900">
                  Watch the Pololu 3pi+32U4 robot in the first video as it uses
                  lidar to detect color changes beneath it, and sonar to sense
                  and avoid obstacles. The second video demonstates an advanced
                  version of this algorithm. Here the robot uses sonar sensors
                  to maintain a threshold distance from the walls, odometric
                  functions to determine distance traveled by each wheel and
                  individually adjust speeds, and lidar to detect and
                  &quot;collect&quot; objects. The robot is able to solve a maze
                  and collect objects with a smooth correction behavior
                  supported by its proportional, integral, and derivative
                  controllers.
                </p>
              </CardContent>
            </Card>
            <Card className="shadow-zinc-950/80 shadow-2xl">
              <CardHeader className="justify-center">
                <CardTitle className="mt-2 mb-4 sm:mb-6 text-zinc-800 text-xl sm:text-xl md:text-xl lg:text-2xl xl:text-lg 2xl:text-xl text-center">
                  <span className="inline-block pb-4 px-20 border-b">
                    Web Development
                  </span>
                </CardTitle>
                <div
                  className="relative w-full min-w-70 md:min-w-130"
                  style={{ height: videoHeight ? `${videoHeight}px` : "200px" }}
                >
                  <Image
                    src="/images/DahliaImage.png"
                    alt="Dahlia Image"
                    fill
                    className="object-contain shadow-zinc-950/80 shadow-lg"
                    sizes="1280px"
                  />
                </div>
                <CardDescription className="mt-6 mb-16 sm:mt-6 sm:mb-6 justify-self-center text-base sm:text-sm lg:text-lg xl:text-xs 2xl:text-md">
                  <a
                    href="https://dahliacoastallivinginib.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Dahlia Coastal Living in Imperial Beach
                  </a>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="indent-8 text-justify text-zinc-700 shadow-[inset_0_10px_10px_-10px_#09090b80,inset_0_-10px_10px_-10px_#09090b80] px-4 py-4 -mt-4 border-t border-b border-t-zinc-500 border-b-zinc-900">
                  Explore DahliaCoastalLivingInIB.com, a custom-built site
                  showcasing coastal-inspired duplexes and amenities. It
                  combines responsive design, Bootstrap components, React
                  functionality, and lightweight animations for smooth,
                  cross-device interactions. The site features product listings
                  coded simply enough for the site owner to maintain,
                  interactive hover effects, gradient color schemes, and a
                  cohesive color palette reflecting the complex’s serene
                  aesthetic. Designed with accessibility and simplicity in mind,
                  it ensures a modern yet user-friendly experience, while
                  emphasizing accessibility for elderly visitors.
                </p>
              </CardContent>
            </Card>
            <Card className="shadow-zinc-950/80 shadow-2xl">
              <CardHeader className="justify-center">
                <CardTitle className="mt-2 mb-4 sm:mb-6 text-zinc-800 text-xl sm:text-xl md:text-xl lg:text-2xl xl:text-lg 2xl:text-xl text-center">
                  <span className="inline-block pb-4 px-20 border-b">
                    Virtualization
                  </span>
                </CardTitle>
                <div className="relative w-full min-w-70 md:min-w-130 aspect-[4/3]">
                  <Image
                    src="/images/FreeBSDImage.png"
                    alt="FreeBSD Image"
                    fill
                    className="object-contain w-full max-w-100 md:max-w-500 lg:max-w-200 xl:max-w-100 2xl:max-w-150 align-middle justify-self-center shadow-zinc-950/80 shadow-lg"
                    sizes="1280px"
                  />
                </div>
                <CardDescription className="mt-6 mb-16 sm:mt-6 sm:mb-6 justify-self-center text-base sm:text-sm lg:text-lg xl:text-xs 2xl:text-md">
                  FreeBSD startup
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="indent-8 text-justify text-zinc-700 shadow-[inset_0_10px_10px_-10px_#09090b80,inset_0_-10px_10px_-10px_#09090b80] px-4 py-4 -mt-4 border-t border-b border-t-zinc-500 border-b-zinc-900">
                  Here I built and managed a suite of virtual machines across
                  OpenBSD, FreeBSD, Rocky Linux, Ubuntu, and Solaris
                  (OpenIndiana) using VMware Fusion. The labs focused on
                  configuring host-to-guest networking, SSH remote access, log
                  management, and service automation. I implemented an
                  Ansible-controlled environment to manage roles and packages
                  across systems, and used my Ubuntu VMs as jump hosts for
                  interacting with Proxmox and Azure deployments. Each VM was
                  configured with strict user-level permissions, and system logs
                  and cron job reports were routed through FreeBSD’s Sendmail
                  service. These labs deepened my understanding of
                  cross-platform administration, virtualization workflows, and
                  secure remote orchestration.
                </p>
              </CardContent>
            </Card>
            <Card className="shadow-zinc-950/80 shadow-2xl">
              <CardHeader className="justify-center">
                <CardTitle className="mt-2 mb-4 sm:mb-6 text-zinc-800 text-xl sm:text-xl md:text-xl lg:text-2xl xl:text-lg 2xl:text-xl text-center">
                  <span className="inline-block pb-4 px-20 border-b">
                    3D Game Programming
                  </span>
                </CardTitle>
                <div
                  className="relative w-full min-w-70 md:min-w-130 aspect-[4/3]"
                  onMouseEnter={() => {
                    setShowGameVideo(true);
                    if (gameVideoRef.current) {
                      gameVideoRef.current.currentTime = 0;
                      gameVideoRef.current.play();
                    }
                  }}
                  onMouseLeave={() => {
                    setShowGameVideo(false);
                    if (gameVideoRef.current) {
                      gameVideoRef.current.pause();
                      gameVideoRef.current.currentTime = 0;
                    }
                  }}
                >
                  {!showGameVideo ? (
                    <Image
                      src="/images/3DGameImage.png"
                      alt="3DGame Image"
                      fill
                      className="object-contain w-full max-w-100 md:max-w-500 lg:max-w-200 xl:max-w-100 2xl:max-w-150 align-middle justify-self-center shadow-zinc-950/80 shadow-lg"
                      sizes="1280px"
                    />
                  ) : (
                    <video
                      ref={gameVideoRef}
                      src="/videos/3DGameVideo720.mov"
                      controls
                      muted
                      autoPlay
                      loop
                      playsInline
                      className="object-contain w-full max-w-100 md:max-w-500 lg:max-w-200 xl:max-w-100 2xl:max-w-150 align-middle justify-self-center shadow-zinc-950/80 shadow-lg"
                    />
                  )}
                </div>
                <CardDescription className="mt-6 mb-16 sm:mt-6 sm:mb-6 justify-self-center text-base sm:text-sm lg:text-lg xl:text-xs 2xl:text-md">
                  Ball Maze created with Unity
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="indent-8 text-justify text-zinc-700 shadow-[inset_0_10px_10px_-10px_#09090b80,inset_0_-10px_10px_-10px_#09090b80] px-4 py-4 -mt-4 border-t border-b border-t-zinc-500 border-b-zinc-900">
                  In this project, my team developed a 3D physics-based ball
                  game using Unity and C#. Players navigate a rolling ball
                  through a series of obstacles and platforms to collect items
                  and reach the end goal. The game features real-time physics
                  interactions, trigger-based events, and smooth camera controls
                  to enhance playability. I implemented UI elements for score
                  tracking and level transitions, and designed each level to
                  test precision movement and player timing. Throughout the
                  project, we used GitHub for version control, regularly merging
                  branches, resolving conflicts, and coordinating feature
                  development across the team. This experience strengthened my
                  grasp of debugging, version control, and game-based physics
                  models.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
        {/* Portfolio content here */}
      </main>
    </>
  );
}
