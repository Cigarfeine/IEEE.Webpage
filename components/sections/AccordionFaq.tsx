"use client";

import React, { useState } from "react";
import { Plus, Minus, HelpCircle } from "lucide-react";

export default function AccordionFaq() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

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
    <section id="faq" className="py-24 sm:py-32 bg-obsidian text-white border-t border-white/10">
      <div className="max-w-5xl mx-auto px-6 sm:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="font-display font-bold text-3xl sm:text-5xl tracking-tight leading-tight text-white mb-4">
            Frequently Asked Questions.
          </h2>
          <p className="text-white/60 text-sm sm:text-base">
            Common questions regarding chapter enrollment, technical tracks, and membership
            perks.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? "bg-obsidian-surface border-lime/40 shadow-[0_0_25px_rgba(203,235,58,0.06)]"
                    : "bg-obsidian-surface/40 border-white/10 hover:border-white/20"
                }`}
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full px-6 sm:px-8 py-5 sm:py-6 flex items-center justify-between gap-4 text-left select-none cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="font-display font-bold text-base sm:text-xl text-white/90 hover:text-white transition-colors">
                    {faq.q}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full border flex items-center justify-center shrink-0 transition-transform duration-300 ${
                      isOpen
                        ? "bg-lime text-obsidian border-lime rotate-180"
                        : "bg-white/5 text-white/70 border-white/10"
                    }`}
                  >
                    {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </div>
                </button>

                <div
                  className={`grid transition-[grid-template-rows,opacity,padding] duration-300 ease-out px-6 sm:px-8 ${
                    isOpen ? "grid-rows-[1fr] opacity-100 pb-6" : "grid-rows-[0fr] opacity-0 pb-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="text-sm sm:text-base text-white/70 leading-relaxed font-normal pt-2 border-t border-white/5">
                      {faq.a}
                    </p>
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
