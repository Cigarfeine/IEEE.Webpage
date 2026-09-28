"use client";

import React, { useState } from "react";
import ButtonRoll from "@/components/ui/ButtonRoll";
import { CheckCircle2, Send, Sparkles } from "lucide-react";

export default function JoinCta() {
  const [selectedTrack, setSelectedTrack] = useState("Machine Intelligence");
  const [submitted, setSubmitted] = useState(false);
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    dept: "",
    github: "",
  });

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
    <section id="join" className="py-24 sm:py-32 bg-obsidian text-white border-t border-white/10 relative overflow-hidden">
      {/* Background glow elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-petrol/20 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 sm:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="font-display font-bold text-3xl sm:text-5xl md:text-6xl tracking-tight leading-tight text-white mb-6">
            Ready to build with us?
          </h2>
          <p className="text-white/60 text-sm sm:text-base leading-relaxed">
            Submit your profile to join our active engineering cohorts. Our admissions
            panel reviews applications on a rolling basis.
          </p>
        </div>

        {submitted ? (
          <div className="p-10 rounded-3xl bg-obsidian-surface border border-lime/50 text-center shadow-[0_0_40px_rgba(203,235,58,0.15)]">
            <CheckCircle2 className="w-14 h-14 text-lime mx-auto mb-4" />
            <h3 className="font-display font-bold text-2xl text-white mb-2">
              Application Ingested Successfully
            </h3>
            <p className="text-sm text-white/70 max-w-md mx-auto mb-6">
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
        ) : (
          <form
            onSubmit={handleSubmit}
            className="p-8 sm:p-10 rounded-3xl bg-obsidian-surface/80 backdrop-blur-xl border border-white/10 shadow-2xl space-y-8"
          >
            {/* Track selector pills */}
            <div>
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
                        ? "bg-lime text-obsidian font-bold shadow-[0_0_15px_rgba(203,235,58,0.3)]"
                        : "bg-white/5 text-white/70 hover:bg-white/10 border border-white/10"
                    }`}
                  >
                    {track}
                  </button>
                ))}
              </div>
            </div>

            {/* Inputs grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label htmlFor="join-name" className="block font-mono text-xs uppercase tracking-wider text-white/60 mb-2">
                  Full Name
                </label>
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
                  className="w-full px-4 py-3 rounded-xl bg-obsidian-pure border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-lime transition-colors"
                />
              </div>

              <div>
                <label htmlFor="join-email" className="block font-mono text-xs uppercase tracking-wider text-white/60 mb-2">
                  Email Address
                </label>
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
                  className="w-full px-4 py-3 rounded-xl bg-obsidian-pure border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-lime transition-colors"
                />
              </div>

              <div>
                <label htmlFor="join-dept" className="block font-mono text-xs uppercase tracking-wider text-white/60 mb-2">
                  Department &amp; Year
                </label>
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
                  className="w-full px-4 py-3 rounded-xl bg-obsidian-pure border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-lime transition-colors"
                />
              </div>

              <div>
                <label htmlFor="join-github" className="block font-mono text-xs uppercase tracking-wider text-white/60 mb-2">
                  GitHub / Portfolio URL
                </label>
                <input
                  id="join-github"
                  name="githubUrl"
                  type="url"
                  placeholder="https://github.com/username"
                  value={formState.github}
                  onChange={(e) =>
                    setFormState({ ...formState, github: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-xl bg-obsidian-pure border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-lime transition-colors"
                />
              </div>
            </div>

            {/* Submit button */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="font-mono text-xs text-white/40">
                🔒 Protected by IEEE Student Ethics &amp; Data Guidelines.
              </span>
              <ButtonRoll variant="lime" size="lg" withArrow className="w-full sm:w-auto">
                TRANSMIT APPLICATION
              </ButtonRoll>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
