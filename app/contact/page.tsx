// BASIC STYLING FOR THIS IS APPLIED THROUGHOUT ALL TSX FILES OTHER THAN HOME PAGE

"use client";
import { useEffect, useState } from "react";
import PageTransition from "@/components/PageTransition";
import CoverPageTransition from "@/components/CoverPageTransition";

export default function PortfolioPage() {
  const [showCover, setShowCover] = useState(false);
  const [fadeIn, setFadeIn] = useState(false);
  const [form, setForm] = useState({ subject: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/sendEmail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: form.email,
          subject: form.subject,
          message: form.message,
        }),
      });
      if (res.ok) {
        setSubmitted(true);
      } else {
        alert("Failed to send email. Please try again.");
      }
    } catch (err) {
      alert(`Error sending email: ${err}. Please try again.`);
    }
  };

  return (
    <>
      <PageTransition />
      {showCover && <CoverPageTransition />}
      <main>
        <div
          id="main-div"
          className="w-full min-h-[80vh] bg-[#7b8f72] flex flex-col items-center justify-start mt-12 p-6 xl:p-8"
          style={{
            opacity: fadeIn ? 1 : 0,
            transition: "opacity 1.5s cubic-bezier(.77,0,.18,1)",
          }}
        >
          <h1 className="text-3xl font-bold text-white pb-2">Contact</h1>
          <h3 className="text-sm font-semibold text-white italic pb-8">
            All form submissions are sent to my direct email
          </h3>
          {submitted ? (
            <div className="flex flex-col items-center justify-center bg-white/80 p-8 shadow-zinc-950/40 shadow-lg min-w-[300px] w-full max-w-3xl mt-4 border border-[#a3b18a]/40">
              <p className="text-zinc-800 text-xl font-semibold text-center">
                Thank you for reaching out!
              </p>
              <p className="text-zinc-700 text-base text-center mt-2">
                I will get back to you soon.
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col flex-1 gap-4 bg-white/80 shadow-zinc-950/80 shadow-lg p-8 min-w-[300px] w-full max-w-3xl"
            >
              <label className="flex flex-col font-semibold text-zinc-800/60">
                <input
                  type="text"
                  name="subject"
                  placeholder="Subject"
                  value={form.subject}
                  onChange={handleChange}
                  required
                  className="text-zinc-800 mt-1 p-2 rounded border border-[#a3b18a]/40 focus:outline-none"
                />
              </label>
              <label className="flex flex-col font-semibold text-zinc-800/60">
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="text-zinc-800 mt-1 p-2 rounded border border-[#a3b18a]/40 focus:outline-none"
                />
              </label>
              <label className="flex flex-col flex-1 font-semibold text-zinc-800/60">
                <textarea
                  name="message"
                  placeholder="Your message"
                  value={form.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="flex-1 text-zinc-800 mt-1 p-2 rounded border border-[#a3b18a]/40 focus:outline-none resize-none"
                />
              </label>
              <button
                type="submit"
                className="mt-2 w-[50%] self-center px-6 py-2 rounded bg-[#5a6b54] text-white font-bold transition-all duration-150 hover:scale-102 hover:bg-[#43513e] active:scale-98 active:bg-[#7b8f72]"
              >
                Send
              </button>
            </form>
          )}
        </div>
      </main>
    </>
  );
}
