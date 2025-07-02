// BASIC STYLING FOR THIS IS APPLIED THROUGHOUT ALL TSX FILES OTHER THAN HOME PAGE

"use client";
import { useEffect, useState } from "react";
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
            transition: "opacity 1.5s cubic-bezier(.77,0,.18,1)",
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-15 lg:gap-20 p-10 md:p-15 lg:p-20  w-full">
            <Card>
              <CardHeader>
                <CardTitle>C++ Robotics</CardTitle>
                <CardDescription>first card description</CardDescription>
                <CardAction>Action</CardAction>
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
