"use client";

import React, { useRef } from "react";
import ButtonRoll from "@/components/ui/ButtonRoll";
import SectionOverlay from "@/components/ui/SectionOverlay";
import { Check, Cpu, Server, Terminal, Sparkles } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

export default function DirectorateTracks() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);

      gsap.fromTo(
        ".track-card",
        { y: 35, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.12,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".tracks-grid",
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    },
    { scope: sectionRef }
  );

  const tracks = [
    {
      id: "DIR-01",
      icon: Cpu,
      title: "Machine Intelligence & Neural Systems",
      desc: "Architecting transformer models, deep vision pipelines, and production MLOps systems.",
      items: [
        "Large Language Model Fine-Tuning",
        "Transformer & Attention Primitives",
        "Edge TPU & ONNX Runtime Inference",
        "Diffusion & Generative Architectures",
        "High-Throughput Vector Databases",
        "Automated Model Validation & CI",
        "Computer Vision & Segmentation",
        "MLOps & GPU Cluster Telemetry",
      ],
    },
    {
      id: "DIR-02",
      icon: Server,
      title: "Distributed Infrastructure & Cloud Core",
      desc: "Deploying high-concurrency microservices, consensus protocols, and resilient cloud networks.",
      items: [
        "Kubernetes Multi-Cluster Orchestration",
        "gRPC & High-Throughput Protobufs",
        "Rust & Go Low-Latency Backends",
        "Raft & Paxos Distributed Consensus",
        "Event-Driven Kafka Architecture",
        "Zero-Trust Network Perimeter",
        "Terraform & GitOps Automation",
        "eBPF Observability & Metrics",
      ],
    },
    {
      id: "DIR-03",
      icon: Terminal,
      title: "Cyber-Physical & Kernel Systems",
      desc: "Hardening operating systems, low-level firmware protocols, and cryptographic primitives.",
      items: [
        "Linux Kernel Module Engineering",
        "ARM & RISC-V Bare-Metal Firmware",
        "Cryptographic Primitives & ZK Proofs",
        "Hardware IoT & RTOS Embedded Loops",
        "Memory Safety & Static Verification",
        "Binary Exploitation & Defense",
        "Side-Channel Attack Mitigation",
        "Hardware Security Modules (HSM)",
      ],
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="tracks"
      className="relative z-30 py-24 sm:py-32 bg-obsidian-card text-white border-t border-white/10 overflow-hidden"
    >
      <SectionOverlay id="tracks-overlay" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-wrap items-end justify-between gap-6 pb-6 border-b border-white/10 mb-16">
          <div>
            <h2 className="font-display font-bold text-3xl sm:text-5xl md:text-6xl tracking-tight leading-none text-white">
              Engineering Tracks.
            </h2>
          </div>

          <div className="text-sm text-white/50 max-w-sm font-normal">
            Specialized engineering directorates focused on deep systems, machine intelligence, and kernel security.
          </div>
        </div>

        {/* 3-Column Tracks Grid */}
        <div className="tracks-grid grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {tracks.map((track) => {
            const Icon = track.icon;
            return (
              <div
                key={track.id}
                className="track-card group relative p-1.5 sm:p-2 rounded-[2.25rem] bg-gradient-to-b from-white/[0.08] to-white/[0.02] border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all duration-500 hover:border-white/20 hover:shadow-[0_25px_60px_rgba(0,0,0,0.7)]"
              >
                {/* Inner Core Enclosure */}
                <div className="relative rounded-[calc(2.25rem-0.5rem)] p-7 sm:p-8 bg-[#0a0e11]/95 border border-white/[0.04] shadow-[inset_0_1px_1px_rgba(255,255,255,0.08)] flex flex-col justify-between h-full overflow-hidden backdrop-blur-xl">
                  {/* Diffused ambient backlight (GPU radial gradient) */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -top-24 -right-24 w-48 h-48 rounded-full bg-[radial-gradient(circle_at_center,rgba(203,235,58,0.06)_0%,transparent_70%)] group-hover:bg-[radial-gradient(circle_at_center,rgba(203,235,58,0.14)_0%,transparent_70%)] transition-all duration-700 will-change-transform"
                  />

                  <div>
                    {/* Machined Hardware Pill & Icon */}
                    <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/[0.08]">
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10">
                        <span className="w-1.5 h-1.5 rounded-full bg-lime shadow-[0_0_8px_#CBEB3A]" />
                        <span className="font-mono text-xs font-semibold text-lime/90 tracking-wider">
                          {track.id}
                        </span>
                      </div>
                      <div className="w-10 h-10 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-white/70 group-hover:text-lime group-hover:border-lime/30 group-hover:bg-lime/10 transition-all duration-300">
                        <Icon className="w-5 h-5 stroke-[1.75]" />
                      </div>
                    </div>

                    <h3 className="font-display font-bold text-2xl text-white mb-3 group-hover:text-lime transition-colors leading-snug">
                      {track.title}
                    </h3>
                    <p className="text-sm text-white/60 leading-relaxed mb-6 font-normal">
                      {track.desc}
                    </p>

                    <div className="space-y-3 pt-4 border-t border-white/[0.06]">
                      {track.items.map((item, idx) => (
                        <div key={idx} className="flex items-start gap-3 group/item">
                          <div className="w-4 h-4 rounded-full bg-white/[0.06] border border-white/10 text-lime flex items-center justify-center shrink-0 mt-0.5 group-hover/item:border-lime/40 group-hover/item:bg-lime/10 transition-colors">
                            <Check className="w-2.5 h-2.5 stroke-[3]" />
                          </div>
                          <span className="text-xs text-white/75 leading-tight group-hover/item:text-white transition-colors">
                            {item}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-white/[0.08]">
                    <ButtonRoll
                      href="#join"
                      variant="outline"
                      size="sm"
                      withArrow
                      className="w-full justify-center group-hover:bg-lime group-hover:text-obsidian group-hover:border-lime transition-all duration-300"
                    >
                      SELECT TRACK
                    </ButtonRoll>
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
