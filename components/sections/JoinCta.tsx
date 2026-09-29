"use client";

import React, { useState, useRef } from "react";
import ButtonRoll from "@/components/ui/ButtonRoll";
import { CheckCircle2, ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

export default function JoinCta() {
  const [selectedTrack, setSelectedTrack] = useState("Machine Intelligence");
  const [submitted, setSubmitted] = useState(false);
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    dept: "",
    github: "",
  });

  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);

      gsap.fromTo(
        ".join-card",
        { y: 35, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".join-card",
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    },
    { scope: sectionRef }
  );

  const tracks = [
    "Machine Intelligence",
    "Distributed Systems",
    "Cyber-Physical Systems",
    "Open Source Infrastructure",
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section
      ref={sectionRef}
      id="join"
      className="py-24 sm:py-32 bg-obsidian text-white relative z-10 overflow-hidden shadow-[0_30px_70px_rgba(0,0,0,0.95)]"
    >
      {/* Background glow elements */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-petrol/15 rounded-full blur-[180px]"
      />

      <div className="max-w-4xl mx-auto px-6 sm:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.04] border border-white/10 ring-1 ring-white/5 font-mono text-[11px] uppercase tracking-widest text-white/70 mb-4 select-none">
            <span className="w-1.5 h-1.5 rounded-full bg-lime shadow-[0_0_8px_#CBEB3A]" />
            COHORT ADMISSIONS • 2026
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-5xl md:text-6xl tracking-tight leading-tight text-white mb-6">
            Ready to build with us?
          </h2>
          <p className="text-white/60 text-sm sm:text-base leading-relaxed font-normal">
            Submit your profile to join our active engineering cohorts. Our admissions
            panel reviews applications on a rolling basis.
          </p>
        </div>

        {submitted ? (
          <div className="p-10 rounded-[2.5rem] bg-gradient-to-b from-white/[0.08] to-white/[0.02] border border-white/10 text-center shadow-[0_20px_50px_rgba(0,0,0,0.7)]">
            <div className="p-8 sm:p-10 rounded-[calc(2.5rem-0.5rem)] bg-[#090d10]/95 border border-white/[0.04]">
              <CheckCircle2 className="w-14 h-14 text-lime mx-auto mb-4" />
              <h3 className="font-display font-bold text-2xl text-white mb-2">
                Application Ingested Successfully
              </h3>
              <p className="text-sm text-white/70 max-w-md mx-auto mb-6 font-normal">
                Thank you, {formState.name || "Engineer"}! Your candidate profile has been
                queued for Directorate review. Check your inbox for orientation coordinates.
              </p>
              <ButtonRoll
                onClick={() => {
                  setSubmitted(false);
                  setFormState({ name: "", email: "", dept: "", github: "" });
                }}
                variant="outline"
                size="sm"
              >
                SUBMIT ANOTHER APPLICATION
              </ButtonRoll>
            </div>
          </div>
        ) : (
          <div className="join-card relative p-1.5 sm:p-2.5 rounded-[2.5rem] bg-gradient-to-b from-white/[0.08] to-white/[0.02] border border-white/10 shadow-[0_25px_70px_rgba(0,0,0,0.85)]">
            {/* Inner Core Enclosure */}
            <form
              onSubmit={handleSubmit}
              className="relative rounded-[calc(2.5rem-0.625rem)] p-7 sm:p-11 bg-[#090d10]/95 backdrop-blur-2xl border border-white/[0.04] space-y-8 overflow-hidden"
            >
              {/* Diffused ambient backlights */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -top-32 -left-32 w-64 h-64 rounded-full bg-petrol/[0.08] blur-3xl"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-32 -right-32 w-64 h-64 rounded-full bg-lime/[0.03] blur-3xl"
              />

              {/* Track selector pills */}
              <div className="relative z-10">
                <label className="block font-mono text-xs uppercase tracking-wider text-white/60 mb-3">
                  Select Preferred Technical Track:
                </label>
                <div className="flex flex-wrap gap-2.5">
                  {tracks.map((track) => (
                    <button
                      key={track}
                      type="button"
                      onClick={() => setSelectedTrack(track)}
                      className={`px-4 py-2 rounded-full font-mono text-xs uppercase tracking-wider transition-all duration-300 ${
                        selectedTrack === track
                          ? "bg-lime text-obsidian font-bold shadow-[0_0_20px_rgba(203,235,58,0.25)] scale-[1.02]"
                          : "bg-white/[0.04] text-white/70 hover:text-white hover:bg-white/[0.08] border border-white/10"
                      }`}
                    >
                      {track}
                    </button>
                  ))}
                </div>
              </div>

              {/* Inputs grid with luxury nested enclosures */}
              <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="group space-y-2">
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="join-name"
                      className="font-mono text-xs uppercase tracking-wider text-white/60 group-focus-within:text-lime transition-colors"
                    >
                      Full Name
                    </label>
                    <span className="font-mono text-[10px] text-white/30">FIELD_01</span>
                  </div>
                  <div className="relative rounded-2xl bg-white/[0.03] p-1 border border-white/10 group-focus-within:border-lime/60 group-focus-within:ring-2 group-focus-within:ring-lime/10 transition-all duration-300">
                    <input
                      id="join-name"
                      name="fullName"
                      type="text"
                      required
                      placeholder="Ada Lovelace"
                      value={formState.name}
                      onChange={(e) =>
                        setFormState({ ...formState, name: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-xl bg-black/40 text-white placeholder-white/25 text-sm focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="group space-y-2">
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="join-email"
                      className="font-mono text-xs uppercase tracking-wider text-white/60 group-focus-within:text-lime transition-colors"
                    >
                      Email Address
                    </label>
                    <span className="font-mono text-[10px] text-white/30">FIELD_02</span>
                  </div>
                  <div className="relative rounded-2xl bg-white/[0.03] p-1 border border-white/10 group-focus-within:border-lime/60 group-focus-within:ring-2 group-focus-within:ring-lime/10 transition-all duration-300">
                    <input
                      id="join-email"
                      name="email"
                      type="email"
                      required
                      placeholder="engineer@institution.edu"
                      value={formState.email}
                      onChange={(e) =>
                        setFormState({ ...formState, email: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-xl bg-black/40 text-white placeholder-white/25 text-sm focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="group space-y-2">
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="join-dept"
                      className="font-mono text-xs uppercase tracking-wider text-white/60 group-focus-within:text-lime transition-colors"
                    >
                      Department &amp; Year
                    </label>
                    <span className="font-mono text-[10px] text-white/30">FIELD_03</span>
                  </div>
                  <div className="relative rounded-2xl bg-white/[0.03] p-1 border border-white/10 group-focus-within:border-lime/60 group-focus-within:ring-2 group-focus-within:ring-lime/10 transition-all duration-300">
                    <input
                      id="join-dept"
                      name="department"
                      type="text"
                      required
                      placeholder="Computer Science &amp; Engg · S5"
                      value={formState.dept}
                      onChange={(e) =>
                        setFormState({ ...formState, dept: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-xl bg-black/40 text-white placeholder-white/25 text-sm focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="group space-y-2">
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="join-github"
                      className="font-mono text-xs uppercase tracking-wider text-white/60 group-focus-within:text-lime transition-colors"
                    >
                      GitHub / Portfolio URL
                    </label>
                    <span className="font-mono text-[10px] text-white/30">FIELD_04</span>
                  </div>
                  <div className="relative rounded-2xl bg-white/[0.03] p-1 border border-white/10 group-focus-within:border-lime/60 group-focus-within:ring-2 group-focus-within:ring-lime/10 transition-all duration-300">
                    <input
                      id="join-github"
                      name="githubUrl"
                      type="url"
                      placeholder="https://github.com/username"
                      value={formState.github}
                      onChange={(e) =>
                        setFormState({ ...formState, github: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-xl bg-black/40 text-white placeholder-white/25 text-sm focus:outline-none transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* Submit button with Button-in-Button architecture */}
              <div className="relative z-10 pt-4 flex flex-col sm:flex-row items-center justify-between gap-6 border-t border-white/[0.06]">
                <div className="flex items-center gap-2 text-white/50 text-xs font-mono">
                  <span className="w-1.5 h-1.5 rounded-full bg-lime/80" />
                  <span>Protected by IEEE Student Ethics &amp; Data Guidelines</span>
                </div>
                <button
                  type="submit"
                  className="group relative cursor-pointer inline-flex items-center gap-3 pl-6 pr-2 py-2 rounded-full bg-lime text-obsidian font-mono text-xs font-bold uppercase tracking-wider transition-all duration-300 hover:bg-lime/95 hover:shadow-[0_0_24px_rgba(203,235,58,0.35)] hover:scale-[1.02] w-full sm:w-auto justify-center"
                >
                  <span>TRANSMIT APPLICATION</span>
                  <span className="w-8 h-8 rounded-full bg-obsidian/15 flex items-center justify-center text-obsidian transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                    <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
                  </span>
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </section>
  );
}
