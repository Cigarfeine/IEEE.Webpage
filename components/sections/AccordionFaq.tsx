"use client";

import React, { useState, useRef } from "react";
import { Plus, Minus } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

export default function AccordionFaq() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);

      gsap.fromTo(
        ".faq-item",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.08,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".faq-list",
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    },
    { scope: sectionRef }
  );

  const faqs = [
    {
      q: "What is IEEE Computer Society MBITS and who is eligible to join?",
      a: "IEEE CS MBITS is the official collegiate chapter of the IEEE Computer Society at Mar Athanasius College of Engineering Kothamangalam / MBITS campus. Any undergraduate or postgraduate student enrolled in engineering or technology disciplines with a passion for software, computing systems, or AI is eligible to apply.",
    },
    {
      q: "Do I need prior advanced systems or machine learning experience?",
      a: "No prior mastery is required. We structure our cohorts with dedicated onboarding tracks, junior-to-senior pair programming sprints, and beginner-friendly foundational workshops before advancing to complex production systems.",
    },
    {
      q: "How do technical directorates and project teams operate?",
      a: "Our chapter operates across three specialized directorates: Machine Intelligence, Distributed Systems, and Cyber-Physical Computing. Each team works on semester-long open-source projects, participates in national hackathons, and conducts internal peer code reviews.",
    },
    {
      q: "What are the benefits of an official global IEEE membership number?",
      a: "An official IEEE CS membership grants full access to the IEEE Xplore digital library, IEEE Computer magazine, an official @ieee.org email alias, eligibility for global student branch travel grants, and discounted entry to flagship IEEE conferences worldwide.",
    },
    {
      q: "Can I publish research papers through the chapter?",
      a: "Yes. Our Research & Publications wing actively supports student researchers in literature review, experimental validation, and paper drafting targeted at IEEE-sponsored and Scopus-indexed conferences.",
    },
    {
      q: "How do I join the executive council or directorate leadership?",
      a: "Leadership selections occur annually during our chapter symposium. Active members who have demonstrated exceptional technical contribution, project leadership, and event execution are nominated by the outgoing council and faculty advisors.",
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="faq"
      className="py-24 sm:py-32 bg-obsidian text-white border-t border-white/10 relative overflow-hidden"
    >
      <div className="max-w-4xl mx-auto px-6 sm:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.04] border border-white/10 ring-1 ring-white/5 font-mono text-[11px] uppercase tracking-widest text-white/70 mb-4 select-none">
            <span className="w-1.5 h-1.5 rounded-full bg-lime shadow-[0_0_8px_#CBEB3A]" />
            PROTOCOL ARCHIVES
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-5xl tracking-tight leading-tight text-white mb-4">
            Frequently Asked Questions.
          </h2>
          <p className="text-white/60 text-sm sm:text-base font-normal">
            Common questions regarding chapter enrollment, technical tracks, and membership
            perks.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="faq-list space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className={`faq-item group relative p-1 rounded-2xl transition-all duration-300 ${
                  isOpen
                    ? "bg-gradient-to-b from-white/[0.1] to-white/[0.03] border border-lime/30 shadow-[0_10px_30px_-5px_rgba(203,235,58,0.06)]"
                    : "bg-white/[0.03] border border-white/10 hover:border-white/20"
                }`}
              >
                <div className="rounded-[calc(1rem-1px)] bg-[#0b0f12]/95 backdrop-blur-xl border border-white/[0.02] overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setOpenIdx(isOpen ? null : idx)}
                    className="w-full px-6 sm:px-8 py-5 sm:py-6 flex items-center justify-between gap-4 text-left select-none cursor-pointer"
                    aria-expanded={isOpen}
                  >
                    <div className="flex items-center gap-4 min-w-0">
                      <span className="font-mono text-xs font-semibold text-white/35 shrink-0">
                        0{idx + 1}
                      </span>
                      <span className="font-display font-semibold text-base sm:text-lg text-white/90 group-hover:text-white transition-colors">
                        {faq.q}
                      </span>
                    </div>

                    <div
                      className={`w-8 h-8 rounded-full border flex items-center justify-center shrink-0 transition-all duration-300 ${
                        isOpen
                          ? "bg-lime/15 text-lime border-lime/40 rotate-180"
                          : "bg-white/[0.04] text-white/70 border-white/10 group-hover:text-lime group-hover:border-lime/30"
                      }`}
                    >
                      {isOpen ? <Minus className="w-4 h-4 stroke-[2]" /> : <Plus className="w-4 h-4 stroke-[2]" />}
                    </div>
                  </button>

                  <div
                    className={`grid transition-[grid-template-rows,opacity,padding] duration-300 ease-out px-6 sm:px-8 ${
                      isOpen ? "grid-rows-[1fr] opacity-100 pb-6 pl-14 sm:pl-16" : "grid-rows-[0fr] opacity-0 pb-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="text-sm sm:text-base text-white/65 leading-relaxed font-normal pt-2 border-t border-white/[0.06]">
                        {faq.a}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
