"use client";
import { useEffect, useState } from "react";
import PageTransition from "@/components/PageTransition";
import CoverPageTransition from "@/components/CoverPageTransition";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

export default function PortfolioPage() {
  const [showCover, setShowCover] = useState(false);
  const [fadeIn, setFadeIn] = useState(false);
  const [topSectionOpacity, setTopSectionOpacity] = useState(1);
  const [bottomSectionOpacity, setBottomSectionOpacity] = useState(0);
  
  // chevron state for autoscroll
  const [chevronActive, setChevronActive] = useState(false);

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

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const fadeRange = docHeight * 0.15 || 1;

      // Top section: fade out from 0% to 15%
      setTopSectionOpacity(1 - Math.min(scrollY / fadeRange, 1));

      // Bottom section: fade in from 85% to 100%
      setBottomSectionOpacity(
        Math.max(0, Math.min((scrollY - docHeight * 0.85) / fadeRange, 1))
      );
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Auto scroll function
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      const scrollY = window.scrollY;
      const scrollRange =
        document.documentElement.scrollHeight - window.innerHeight;
      const halfway = scrollRange / 2;

      // If in top 50% and scrolling down, go to bottom
      if (scrollY < halfway && e.deltaY > 0) {
        window.scrollTo({ top: scrollRange, behavior: "smooth" });
      }
      // If in bottom 50% and scrolling up, go to top
      else if (scrollY >= halfway && e.deltaY < 0) {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    };
    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, []);


  return (
    <>
      <PageTransition />
      {showCover && <CoverPageTransition />}
      <main>
        <div
          id="main-div"
          className="w-full min-h-[200vh] bg-[#7b8f72] flex flex-col items-center justify-between p-2 sm:p-6 "
          style={{
            opacity: fadeIn ? 1 : 0,
            // fade-in effect
            transition: "opacity 1.5s cubic-bezier(.77,0,.18,1)",
          }}
        >
          <div
            className="top-section min-h-[80vh] md:max-h-[60vh] flex flex-col gap-1 md:gap-3 items-center justify-start"
            style={{
              opacity: topSectionOpacity,
              transition: "opacity 0.5s, transform 0.3s",
              transform: `translateX(${(1 - topSectionOpacity) * -500}px)`,
            }}
          >
            <div
              className="bg-white/10 py-4 px-8"
              style={{
                boxShadow: "inset 0 1px 10px -1px rgba(71, 85, 105, 0.7)",
              }}
            >
              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white text-center mt-6">
                Luke Patterson
              </h1>
              <h1 className="mb-4 text-[0.8rem] sm:text-lg lg:text-2xl font-semibold text-white">
                San Diego,
                CA&nbsp;&nbsp;•&nbsp;&nbsp;LukePattersonWebDev@gmail.com
              </h1>
            </div>
            <div className="flex-1 flex flex-col gap-1 sm:gap-3 px-12 xl:px-36 items-center justify-center">
              <hr className="mt-1 lg:mt-8 mx-auto border-t-2 border-[#a3b18a]/40 w-full max-w-[200px] sm:max-w-sm xl:max-w-3xl" />

              <h1 className="w-full font-bold text-white text-base md:text-lg text-align-left pl-4 sm:pl-12">
                Profile:
              </h1>
              <p className="flex w-full text-white text-[0.6rem] md:text-[0.75rem] lg:text-[0.9rem] px-2 md:px-12 xl:px-24 mb-4">
                <span className="block border-l-2 px-6 sm:px-12 border-[#a3b18a]/40">
                  Full-stack web developer and Honors Computer Science graduate
                  with hands-on experience in React (Next.js), Node.js,
                  Tailwind/Bootstrap, and various SQL and NoSQL DBMS. Over two
                  years experience in full-stack web evelopment, and two years
                  of experience applying mathematical analysis to software
                  projects in C++, Java, and Python. Strong communicator and
                  team player with a background in leadership, logistics, and
                  customer interactions. Able to quickly regain fluency in
                  topics after focusing on other technologies.
                  {/* I come from a family
            who loves to travel and have done so extensively — this
            has helped me thrive in dynamic, fast-changing environments and
            communicate cross-culturally. */}
                </span>
              </p>
              <h1 className="w-full font-bold text-white text-base md:text-lg text-align-left pl-4 sm:pl-12">
                Education:
              </h1>
              <ul className="flex list-disc list-inside w-full px-2 md:px-12 xl:px-24 text-white">
                <span className="w-full text-white text-[0.6rem] md:text-[0.75rem] lg:text-[0.9rem] block border-l-2 px-6 sm:px-12 mb-4 border-[#a3b18a]/40">
                  <li>
                    B.S. in Computer Science, Honors Program (Cum Laude), San
                    Diego State University, Fall 2024
                  </li>
                  <li>
                    Associates in Computer Science, Mathematics, and Natural
                    Sciences, President&apos;s List, Grossmont Community
                    College, Spring 2023
                  </li>
                  <li>
                    Certificate of Web Development, UCSD Extension, Summer 2022
                  </li>
                  <li>
                    Cummulative GPA:{" "}
                    <span className="font-extrabold">3.62</span>
                  </li>
                </span>
              </ul>
              <h1 className="w-full font-bold text-white text-base md:text-lg text-align-left pl-4 sm:pl-12">
                Skills & Achievements:
              </h1>
              <ul className="flex list-disc list-inside w-full px-2 md:px-12 xl:px-24 text-white">
                <span className="w-full text-white text-[0.6rem] md:text-[0.75rem] lg:text-[0.9rem] block border-l-2 px-6 sm:px-12 border-[#a3b18a]/40">
                  <li>React, Node.js, JavaScript/TypeScript</li>
                  <li>Tailwind CSS, Boostrap, Shadcn, Vanilla CSS and HTML</li>
                  <li>Git & GitHub file and collaboration management</li>
                  <li>MySQL, Firebase, and MongoDB</li>
                  <li>Linux system administration</li>
                  <li>Python 3.8+ (basic)</li>
                </span>
              </ul>
              <div className="w-full flex flex-col items-center justify-center">
                <hr className="my-1 lg:my-8 mx-auto border-t-2 border-[#a3b18a]/40 w-full max-w-[200px] sm:max-w-sm xl:max-w-3xl" />
                <ChevronDownIcon
                  className={`size-10 sm:size-15 text-[#a3b18a]/40 hover:text-white chevron-bounce ${
                    chevronActive ? "bg-white/10" : ""
                  }`}
                  strokeWidth={1}
                  onMouseDown={() => setChevronActive(true)}
                  onMouseUp={() => setChevronActive(false)}
                  onClick={() => {
                    setChevronActive(true);
                    window.scrollTo({
                      top: document.body.scrollHeight,
                      behavior: "smooth",
                    });
                    setTimeout(() => setChevronActive(false), 300); // Remove highlight after 0.6s
                  }}
                />
              </div>
            </div>
          </div>
          <div
            className="bottom-section min-h-[90vh] flex flex-col items-center justify-evenly"
            style={{
              opacity: bottomSectionOpacity,
              willChange: "opacity, transform",
              transform: `translateX(${(1 - bottomSectionOpacity) * 500}px)`,
              transition: "opacity 0.5s, transform 0.3s",
            }}
          >
            <hr className="lg:mb-8 border-t-2 border-[#a3b18a]/40 w-full max-w-[200px] sm:max-w-sm xl:max-w-3xl" />

            <div className="block border-l-2 px-2 sm:px-12 border-[#a3b18a]/40">
              <h1 className="w-full text-lg md:text-2xl font-bold underline underline-offset-4 decoration-[#a3b18a]/40 text-white text-align-left mb-12 md:mb-4 lg:mb-8 mx-4 lg:mx-10">
                Professional Experience:
              </h1>
              <span className="block border-b-2 border-r-2 border-zinc-950/20 shadow-md px-2 sm:px-6 mb-4 sm:mb-8 mx-0 sm:mx-4 lg:mx-10">
                <div className="text-white text-center my-2 md:my-4 w-full px-6 xl:px-24">
                  <strong className="block text-[0.7rem] sm:text-sm md:text-base lg:text-lg leading-tight">
                    Personal Portfolio Website
                  </strong>
                  <em className="block text-[0.55rem] sm:text-[0.65rem] md:text-sm leading-tight">
                    Front-End Web Development Project (2024)
                  </em>
                </div>
                <ul className="list-disc list-inside text-white text-center text-[0.6rem] md:text-[0.75rem] lg:text-[0.9rem] w-full mt-3 pb-3 space-y-0.5">
                  <li>
                    Designed and developed this personal portfolio using
                    React.js, Next.js, and Tailwind CSS to showcase skills,
                    projects, and contact information.
                  </li>
                  <li>
                    Implemented smooth animations and transitions using custom
                    React components for an engaging and responsive user
                    experience.
                  </li>
                  <li>
                    Structured content to highlight technical competencies,
                    education, and project experience, making it easily
                    navigable by potential employers.
                  </li>
                  <li>
                    Integrated GitHub Pages deployment and custom domain
                    configuration for professional presentation and
                    accessibility.
                  </li>
                </ul>
              </span>
              <span className="block border-b-2 border-r-2 border-zinc-950/20 shadow-md px-2 sm:px-6 mb-4 sm:mb-8 mx-0 sm:mx-4 lg:mx-10">
                <p className="text-white text-center text-[0.75rem] md:text-base my-2 md:my-4">
                  <strong className="block text-[0.7rem] sm:text-sm md:text-base lg:text-lg leading-tight">
                    Tealium Hackathon – 2nd Place Finish
                  </strong>
                  <em className="block text-[0.55rem] sm:text-[0.65rem] md:text-sm leading-tight">
                    La Jolla, CA (Summer 2022)
                  </em>
                </p>
                <ul className="list-disc list-inside text-white text-center text-[0.6rem] md:text-[0.75rem] lg:text-[0.9rem] w-full mt-3 pb-3 space-y-0.5">
                  <li>
                    Collaborated in a team of three to design a product using
                    Tealium’s Customer Data Hub within a 48-hour window.
                  </li>
                  <li>
                    Quickly learned and applied Tealium’s tag management and
                    customer data tools without prior exposure, demonstrating
                    adaptability and fast technical onboarding.
                  </li>
                  <li>
                    Built a data-driven advertising concept that recommended
                    optimal ad placements based on real-time user behavior.
                  </li>
                  <li>
                    Earned 2nd place out of 50+ participants, recognized for
                    innovative thinking, rapid skill acquisition, and practical
                    application of unfamiliar technologies.
                  </li>
                </ul>
              </span>
              <span className="block border-b-2 border-r-2 border-zinc-950/20 shadow-md px-2 sm:px-6 mb-4 sm:mb-8 mx-0 sm:mx-4 lg:mx-10">
                <p className="text-white text-center text-[0.75rem] md:text-base my-2 md:my-4">
                  <strong className="block text-[0.7rem] sm:text-sm md:text-base lg:text-lg leading-tight">
                    Freelance Web Developer – Dahlia Coastal Living
                  </strong>{" "}
                  <em className="block text-[0.55rem] sm:text-[0.65rem] md:text-sm leading-tight">
                    San Diego, CA (Nov 2024 - Present)
                  </em>
                </p>
                <ul className="list-disc list-inside text-white text-center text-[0.6rem] md:text-[0.75rem] lg:text-[0.9rem] h-auto my-3 space-y-0.5">
                  <li>
                    Built and deployed a responsive React and Bootstrap website
                    for a local property management company to showcase
                    duplexes, support marketing, and handle inquiries.
                  </li>
                  <li>
                    Designed an accessible, mobile-friendly interface with a
                    clean layout focused on usability and simplicity.
                  </li>
                  <li>
                    Created a lightweight inventory system editable directly in
                    code, eliminating the need for a database and simplifying
                    property updates for non-technical users.
                  </li>
                  <li>
                    Collaborated with the client to define project goals and
                    requirements, iterating on feedback to deliver a tailored
                    solution.
                  </li>
                  <li>
                    Utilized Git for version control and deployed the site via
                    GitHub Pages with a custom domain hosted on GoDaddy.
                  </li>
                </ul>
              </span>
            </div>
            <hr className="border-t-2 border-[#a3b18a]/40 w-full max-w-[200px] sm:max-w-sm xl:max-w-3xl" />
          </div>
          {/* <div className="w-full h-32"></div> */}
        </div>
        {/* Portfolio here */}
      </main>
    </>
  );
}
