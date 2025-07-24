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
          className="w-full min-h-[60vh] bg-[#7b8f72] rounded-b-xl flex flex-col items-center justify-center mt-12 px-6 xl:px-24"
          style={{
            opacity: fadeIn ? 1 : 0,
            transition: "opacity 1.5s cubic-bezier(.77,0,.18,1)",
          }}
        >
          <h1 className="text-3xl font-bold text-white p-8">Contact</h1>
          {submitted ? (
            <p className="text-white text-lg mt-4">
              Thank you for reaching out! I will get back to you soon.
            </p>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-4 bg-white/80 rounded-lg p-8 shadow-lg min-w-[300px] w-full max-w-3xl"
            >
              <label className="flex flex-col font-semibold text-[#7b8f72]">
                Subject
                <input
                  type="text"
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  required
                  className="mt-1 p-2 rounded border border-[#a3b18a]/40 focus:outline-none"
                />
              </label>
              <label className="flex flex-col font-semibold text-[#7b8f72]">
                Email
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="mt-1 p-2 rounded border border-[#a3b18a]/40 focus:outline-none"
                />
              </label>
              <label className="flex flex-col font-semibold text-[#7b8f72]">
                Message
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="mt-1 p-2 rounded border border-[#a3b18a]/40 focus:outline-none resize-none"
                />
              </label>
              <button
                type="submit"
                className="mt-2 px-6 py-2 rounded bg-[#7b8f72] text-white font-bold hover:bg-[#a3b18a] transition"
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
