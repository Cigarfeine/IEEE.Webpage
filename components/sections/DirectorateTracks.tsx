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
        <div className="flex flex-wrap items-end justify-between gap-6 pb-8 border-b border-white/10 mb-16">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-4 h-4 text-lime" />
              <span className="font-mono text-xs uppercase tracking-widest text-lime">
                *SPECIALIZED DIRECTORATES
              </span>
            </div>
            <h2 className="font-display font-extrabold uppercase text-3xl sm:text-5xl md:text-6xl tracking-tighter leading-none">
              TECHNICAL TRACKS &amp; <br />
              <span className="font-serif italic font-normal text-lime lowercase tracking-normal">
                engineering
              </span>{" "}
              DISCIPLINES
            </h2>
          </div>

          <div className="font-mono text-xs text-white/50 max-w-xs">
            Every member selects a primary and secondary technical track to focus their
            research and project execution.
          </div>
        </div>

        {/* 3-Column Tracks Grid */}
        <div className="tracks-grid grid grid-cols-1 lg:grid-cols-3 gap-8">
          {tracks.map((track) => {
            const Icon = track.icon;
            return (
              <div
                key={track.id}
                className="track-card group flex flex-col justify-between p-7 rounded-3xl bg-obsidian-surface border border-white/10 hover:border-lime/40 transition-all duration-300 hover:shadow-[0_0_35px_rgba(203,235,58,0.08)]"
              >
                <div>
                  <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
                    <span className="font-mono text-xs font-bold text-lime">
                      {track.id}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white/70 group-hover:text-lime group-hover:bg-lime/10 transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="font-display font-bold text-2xl text-white mb-3 group-hover:text-lime transition-colors">
                    {track.title}
                  </h3>
                  <p className="text-sm text-white/60 leading-relaxed mb-6">
                    {track.desc}
                  </p>

                  <div className="space-y-3 pt-4 border-t border-white/5">
                    {track.items.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <div className="w-4 h-4 rounded-full bg-lime/10 text-lime flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="w-2.5 h-2.5 stroke-[3]" />
                        </div>
                        <span className="text-xs text-white/80 leading-tight">
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-white/10">
                  <ButtonRoll
                    href="#join"
                    variant="outline"
                    size="sm"
                    withArrow
                    className="w-full justify-center group-hover:bg-lime group-hover:text-obsidian group-hover:border-lime"
                  >
                    SELECT TRACK
                  </ButtonRoll>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
