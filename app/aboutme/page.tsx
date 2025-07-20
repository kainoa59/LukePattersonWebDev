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
          className="w-full min-h-[60vh] bg-[#7b8f72] flex flex-col gap-3 items-center justify-center p-6 md:p-10 lg:p-12 xl:p-14 2xl:p-16 xl:px-28 2xl:px-32"
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

          <hr className="my-8 border-t-2 border-[#a3b18a]/40 w-full max-w-3xl" />

          <h1 className="w-full text-3xl font-bold text-white text-align-left pl-12">
            Profile:
          </h1>
          <p className="flex w-full text-white px-6 xl:px-24">
            <span className="block border-l-2 pl-12 border-[#a3b18a]/40">
              Full-stack web developer and Honors Computer Science graduate with
              hands-on experience in React (Next.js), Node.js,
              Tailwind/Bootstrap, and various SQL and NoSQL DBMS. Over two years
              experience in full-stack web evelopment, and two years of
              experience applying mathematical analysis to software projects in
              C++, Java, and Python. Strong communicator and team player with a
              background in leadership, logistics, and customer interactions.
              Able to quickly regain fluency in topics after focusing on other
              technologies.
              {/* I come from a family
            who loves to travel and have done so extensively — this
            has helped me thrive in dynamic, fast-changing environments and
            communicate cross-culturally. */}
            </span>
          </p>
          <h1 className="w-full text-3xl font-bold text-white text-align-left pl-12">
            Education:
          </h1>
          <div className="flex text-white w-full px-6 xl:px-24">
            <div className="border-l-2 pl-12 border-[#a3b18a]/40">
              - B.S. in Computer Science, Honors Program (Cum Laude), San Diego
              State University, Fall 2024
              <br />
              - Associates in Computer Science, Mathematics, and Natural
              Sciences, President&apos;s List, Grossmont Community College,
              Spring 2023
              <br />
              - Certificate of Web Development, UCSD Extension, Summer 2022
              <br />- Cummulative GPA:{" "}
              <span className="font-semibold"> 3.62 </span>
            </div>
          </div>
          <h1 className="w-full text-3xl font-bold text-white text-align-left pl-12">
            Skills & Achievements:
          </h1>
          <ul className="flex list-disc list-inside w-full px-6 xl:px-24 text-white">
            <span className="block border-l-2 pl-12 border-[#a3b18a]/40">
              <li>React, Node.js, JavaScript/TypeScript</li>
              <li>Tailwind CSS, Boostrap, Shadcn, Vanilla CSS and HTML</li>
              <li>Git & GitHub file and collaboration management</li>
              <li>MySQL, Firebase, and MongoDB</li>
              <li>Linux system administration</li>
              <li>Python 3.8+ (basic)</li>
            </span>
          </ul>

          <hr className="my-8 border-t-2 border-[#a3b18a]/40 w-full max-w-3xl" />

          <div className="block border-l-2 pl-12 border-[#a3b18a]/40">
            <h1 className="w-full text-3xl font-bold text-white text-align-left">
              Professional Experience:
            </h1>

            <p className="text-white mt-6 w-full px-6 xl:px-24 text-center">
              <strong>Personal Portfolio Website</strong> <br />
              <em>Front-End Web Development Project (2024)</em>
            </p>
            <ul className="list-disc list-inside text-white w-full px-6 xl:px-24 mt-2 space-y-2">
              <li>
                Designed and developed this personal portfolio using React.js,
                Next.js, and Tailwind CSS to showcase skills, projects, and
                contact information.
              </li>
              <li>
                Implemented smooth animations and transitions using custom React
                components for an engaging and responsive user experience.
              </li>
              <li>
                Structured content to highlight technical competencies,
                education, and project experience, making it easily navigable by
                potential employers.
              </li>
              <li>
                Integrated GitHub Pages deployment and custom domain
                configuration for professional presentation and accessibility.
              </li>
            </ul>

            <p className="text-white text-center mt-6">
              <strong>Tealium Hackathon – 2nd Place Finish</strong> <br />
              <em>La Jolla, CA (Summer 2022)</em>
            </p>
            <ul className="list-disc list-inside text-white w-full px-6 xl:px-24 mt-2 space-y-2">
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
                Built a data-driven advertising concept that recommended optimal
                ad placements based on real-time user behavior.
              </li>
              <li>
                Earned 2nd place out of 50+ participants, recognized for
                innovative thinking, rapid skill acquisition, and practical
                application of unfamiliar technologies.
              </li>
            </ul>

            <p className="text-white text-center mt-6">
              <strong>Freelance Web Developer – Dahlia Coastal Living</strong>{" "}
              <br />
              <em>San Diego, CA (Nov 2024 - Present)</em>
            </p>
            <ul className="list-disc list-inside text-white w-full px-6 xl:px-24 mt-2 space-y-2">
              <li>
                Built and deployed a responsive React and Bootstrap website for
                a local property management company to showcase duplexes,
                support marketing, and handle inquiries.
              </li>
              <li>
                Designed an accessible, mobile-friendly interface with a clean
                layout focused on usability and simplicity.
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
          </div>
          <hr className="h-32 my-8 border-t-2 border-[#a3b18a]/40 w-full max-w-3xl" />
          {/* <div className="w-full h-32"></div> */}
        </div>
        {/* Portfolio here */}
      </main>
    </>
  );
}
