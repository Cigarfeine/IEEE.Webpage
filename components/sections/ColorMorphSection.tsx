"use client";

import React, { useRef } from "react";
import ButtonRoll from "@/components/ui/ButtonRoll";
import SectionOverlay from "@/components/ui/SectionOverlay";
import { Quote, Star, Award, TrendingUp, Users } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

export default function ColorMorphSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);

      // Scrubbed Background Color Morph into Habito's Signature Petrol Teal (#01565B)
      gsap.to(sectionRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          end: "top 20%",
          scrub: 1,
        },
        backgroundColor: "#01565B",
        ease: "none",
      });

      gsap.fromTo(
        ".stat-box",
        { y: 35, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.12,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".stats-wrapper",
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );

      // Kinetic animated count-up
      const statElements = gsap.utils.toArray<HTMLElement>(".stat-num");
      statElements.forEach((el) => {
        const target = parseFloat(el.getAttribute("data-target") || "0");
        const prefix = el.getAttribute("data-prefix") || "";
        const suffix = el.getAttribute("data-suffix") || "";
        const isDecimal = el.getAttribute("data-decimal") === "true";

        const counterObj = { val: 0 };
        gsap.to(counterObj, {
          val: target,
          duration: 1.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".stats-wrapper",
            start: "top 85%",
            toggleActions: "play none none none",
          },
          onUpdate: () => {
            el.innerText = `${prefix}${isDecimal ? counterObj.val.toFixed(1) : Math.round(counterObj.val)}${suffix}`;
          },
        });
      });
    },
    { scope: sectionRef }
  );

  const stats = [
    {
      icon: Users,
      value: "450+",
      target: 450,
      prefix: "",
      suffix: "+",
      decimal: false,
      label: "Active Student Engineers",
      sub: "Across computing disciplines",
    },
    {
      icon: Award,
      value: "14",
      target: 14,
      prefix: "",
      suffix: "",
      decimal: false,
      label: "National Hackathon Podiums",
      sub: "In competitive systems tracks",
    },
    {
      icon: TrendingUp,
      value: "₹1.8M",
      target: 1.8,
      prefix: "₹",
      suffix: "M",
      decimal: true,
      label: "Sponsorships & Lab Grants",
      sub: "For student hardware & compute",
    },
    {
      icon: Star,
      value: "100%",
      target: 100,
      prefix: "",
      suffix: "%",
      decimal: false,
      label: "Open Source Deliverables",
      sub: "Publicly auditable on GitHub",
    },
  ];

  const testimonials = [
    {
      quote:
        "IEEE CS MBITS provided the exact architectural rigor needed to shift from simple hobby coding to building resilient, fault-tolerant distributed systems that operate under real production constraints.",
      author: "Aditya Nair",
      role: "Class of 2024 · Distributed Systems Engineer at CloudCore",
    },
    {
      quote:
        "The collaborative research sprints and peer review culture helped our team publish indexed IEEE conference papers and win national hackathons back-to-back.",
      author: "Sneha Menon",
      role: "Class of 2025 · Machine Intelligence Directorate Lead",
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="impact"
      className="relative z-30 py-24 sm:py-32 bg-obsidian-surface text-white transition-colors duration-700 overflow-hidden border-t border-white/10"
    >
      <SectionOverlay id="impact-overlay" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 border border-white/20 font-mono text-xs uppercase tracking-widest text-lime mb-4">
            <Quote className="w-3.5 h-3.5" />
            CHAPTER IMPACT &amp; ALUMNI VOICES
          </div>
          <h2 className="font-display font-extrabold uppercase text-3xl sm:text-5xl md:text-6xl tracking-tighter leading-tight text-white">
            ENGINEERED FOR <br />
            <span className="font-serif italic font-normal text-lime lowercase tracking-normal">
              long-term
            </span>{" "}
            EXCELLENCE.
          </h2>
        </div>

        {/* Stats Row */}
        <div className="stats-wrapper grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className="stat-box group p-1 rounded-2xl bg-gradient-to-b from-white/[0.08] to-white/[0.02] border border-white/10 transition-all duration-500 hover:border-white/20 shadow-lg"
              >
                <div className="rounded-[calc(1rem-2px)] p-6 bg-black/40 backdrop-blur-xl border border-white/[0.02] flex flex-col justify-between h-full">
                  <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-lime mb-4 group-hover:scale-105 transition-transform duration-300">
                    <Icon className="w-5 h-5 stroke-[1.75]" />
                  </div>
                  <div>
                    <span
                      className="stat-num font-sans font-extrabold text-3xl sm:text-4xl text-white block mb-1 tracking-tight"
                      data-target={stat.target}
                      data-prefix={stat.prefix}
                      data-suffix={stat.suffix}
                      data-decimal={stat.decimal ? "true" : "false"}
                    >
                      {stat.value}
                    </span>
                    <span className="font-semibold text-sm text-white/90 block">
                      {stat.label}
                    </span>
                    <span className="font-mono text-xs text-white/50 block mt-1">
                      {stat.sub}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* 2-Column Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-12 border-t border-white/15">
          {testimonials.map((item, idx) => (
            <div
              key={idx}
              className="group p-1.5 rounded-3xl bg-gradient-to-b from-white/[0.08] to-white/[0.02] border border-white/10 transition-all duration-500 hover:border-white/20 shadow-xl"
            >
              <div className="rounded-[calc(1.5rem-2px)] p-7 sm:p-8 bg-black/40 backdrop-blur-xl border border-white/[0.02] flex flex-col justify-between h-full">
                <div className="mb-6">
                  <div className="flex gap-1 text-lime/90 mb-4">
                    {[...Array(5)].map((_, starIdx) => (
                      <Star key={starIdx} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <p className="text-base sm:text-lg text-white/85 leading-relaxed italic font-serif">
                    &ldquo;{item.quote}&rdquo;
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10">
                  <span className="font-display font-bold text-white block">
                    {item.author}
                  </span>
                  <span className="font-mono text-xs text-lime/80 block mt-0.5">
                    {item.role}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
