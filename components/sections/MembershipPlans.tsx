"use client";

import React, { useState, useRef } from "react";
import ButtonRoll from "@/components/ui/ButtonRoll";
import SectionOverlay from "@/components/ui/SectionOverlay";
import { Check, Flame, Sparkles } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

export default function MembershipPlans() {
  const [billingPeriod, setBillingPeriod] = useState<"annual" | "semester">("annual");
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);

      gsap.fromTo(
        ".plan-card",
        { y: 35, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.12,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".plans-grid",
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    },
    { scope: sectionRef }
  );

  const plans = [
    {
      name: "Student Member",
      tag: "Best for Beginners",
      price: billingPeriod === "annual" ? "₹1,200" : "₹750",
      period: billingPeriod === "annual" ? "/year" : "/semester",
      desc: "Entryway into the IEEE global community, student chapter workshops, and local repository access.",
      popular: false,
      features: [
        "IEEE CS Global Membership Number & ID Card",
        "Free Admission to All Technical Workshops",
        "Access to Chapter GitHub Repositories & Resources",
        "Entry into Regional IEEE Student Competitions",
        "IEEE Computer Society Digital Library Access",
        "Mentorship from Senior Chapter Engineers",
      ],
    },
    {
      name: "Core Fellow",
      tag: "Most Popular 🔥",
      price: billingPeriod === "annual" ? "₹2,400" : "₹1,400",
      period: billingPeriod === "annual" ? "/year" : "/semester",
      desc: "For serious builders and researchers actively executing projects and competitive hackathons.",
      popular: true,
      features: [
        "All Student Member Privileges Included",
        "Priority Access to Dedicated GPU Compute Clusters",
        "HackGenesis & Hackathon Travel Subsidy",
        "IEEE Global Certification Sponsorship Support",
        "Co-authoring on Indexed Research Conference Papers",
        "Direct Industry Referral Pipeline & Portfolio Reviews",
        "Custom @ieee.org Alias & Chapter Credentials",
      ],
    },
    {
      name: "Executive Fellow",
      tag: "Leadership & Research",
      price: "By Council",
      period: "Selection",
      desc: "For chapter directors, lab leads, and research fellows driving branch initiatives and sponsorships.",
      popular: false,
      features: [
        "All Core Fellow Privileges Included",
        "Executive Council Voting Rights & Chapter Steering",
        "Budget Allocation for Hardware Labs & Cloud Credits",
        "Keynote Speaker Invitation at Chapter Symposiums",
        "Direct Advisory from IEEE Kerala Section Leadership",
        "Distinguished Chapter Fellowship Plaque",
      ],
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="membership"
      className="relative z-30 py-24 sm:py-32 bg-paper text-ink rounded-t-[2.5rem] sm:rounded-t-[3.5rem] shadow-[0_-25px_60px_rgba(0,0,0,0.6)] overflow-hidden"
    >
      <SectionOverlay id="membership-overlay" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-display font-bold text-3xl sm:text-5xl md:text-6xl tracking-tight leading-tight text-black mb-4">
            Fellowship Plans.
          </h2>
          <p className="text-black/60 text-base sm:text-lg max-w-xl">
            Choose your fellowship tier, join an active technical directorate, and
            commence production development.
          </p>

          {/* Habito-style Interactive Sliding Pill Switch */}
          <div className="mt-8 inline-flex items-center gap-3 p-1.5 rounded-full bg-black/5 border border-black/10">
            <button
              onClick={() => setBillingPeriod("annual")}
              className={`px-5 py-2 rounded-full font-mono text-xs uppercase tracking-wider transition-all duration-300 ${
                billingPeriod === "annual"
                  ? "bg-petrol text-white shadow-md"
                  : "text-black/60 hover:text-black"
              }`}
            >
              Annual Fellowship (Save 20%)
            </button>
            <button
              onClick={() => setBillingPeriod("semester")}
              className={`px-5 py-2 rounded-full font-mono text-xs uppercase tracking-wider transition-all duration-300 ${
                billingPeriod === "semester"
                  ? "bg-petrol text-white shadow-md"
                  : "text-black/60 hover:text-black"
              }`}
            >
              Semester Pass
            </button>
          </div>
        </div>

        {/* 3 Plans Grid */}
        <div className="plans-grid grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {plans.map((plan, idx) => (
            <div
              key={idx}
              className={`plan-card relative flex flex-col justify-between p-8 rounded-3xl transition-all duration-300 ${
                plan.popular
                  ? "bg-white border-2 border-petrol shadow-xl shadow-petrol/10 lg:-translate-y-2"
                  : "bg-white/70 border border-black/10 hover:border-black/30 shadow-sm"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-lime text-obsidian font-mono text-[11px] font-black uppercase tracking-wider shadow-md flex items-center gap-1.5">
                  <Flame className="w-3.5 h-3.5 fill-current" />
                  {plan.tag}
                </div>
              )}

              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-display font-bold text-2xl text-black">
                    {plan.name}
                  </h3>
                  {!plan.popular && (
                    <span className="font-mono text-[10px] text-black/50 uppercase px-2.5 py-1 rounded-full bg-black/5 border border-black/5">
                      {plan.tag}
                    </span>
                  )}
                </div>

                <div className="flex items-baseline gap-1 mb-4">
                  <span className="font-display font-extrabold text-4xl sm:text-5xl text-black">
                    {plan.price}
                  </span>
                  <span className="font-mono text-xs text-black/50">
                    {plan.period}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-black/70 leading-relaxed mb-8 pb-6 border-b border-black/10">
                  {plan.desc}
                </p>

                <div className="space-y-3.5 mb-8">
                  {plan.features.map((feature, fIdx) => (
                    <div key={fIdx} className="flex items-start gap-3">
                      <div
                        className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                          plan.popular
                            ? "bg-petrol text-white"
                            : "bg-black/10 text-black"
                        }`}
                      >
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </div>
                      <span className="text-xs text-black/80 font-medium leading-tight">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6 border-t border-black/10">
                <ButtonRoll
                  href="#join"
                  variant={plan.popular ? "dark" : "paper"}
                  size="md"
                  withArrow
                  className={`w-full justify-center ${
                    plan.popular ? "!bg-petrol !text-white hover:!bg-petrol-dark" : ""
                  }`}
                >
                  JOIN NOW
                </ButtonRoll>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
