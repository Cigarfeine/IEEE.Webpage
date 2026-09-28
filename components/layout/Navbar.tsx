"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import ButtonRoll from "@/components/ui/ButtonRoll";
import { Menu, X, ArrowUpRight } from "lucide-react";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "About", href: "#manifesto" },
    { name: "Works", href: "#works" },
    { name: "Reveal", href: "#reveal" },
    { name: "Tracks", href: "#tracks" },
    { name: "Membership", href: "#membership" },
    { name: "FAQ", href: "#faq" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "py-3 bg-obsidian/80 backdrop-blur-xl border-b border-white/10 shadow-lg"
            : "py-6 bg-transparent"
        }`}
      >
        <div className="max-w-[1560px] 2xl:max-w-[1720px] mx-auto px-6 sm:px-10 lg:px-12 xl:px-16 flex items-center justify-between">
          {/* Logo brand lockup: Pure Minimal Seamless Branding */}
          <div className="flex items-center gap-3 sm:gap-4 select-none">
            {/* IEEE CS Official Vector Logo */}
            <Link
              href="/"
              className="group flex items-center transition-all duration-300 hover:opacity-90"
              title="IEEE Computer Society - Home"
            >
              <img
                src="/assets/logos/ieee-cs.svg"
                alt="IEEE Computer Society"
                className="h-7 sm:h-8 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </Link>

            {/* Subtle hairline divider */}
            <div className="h-5 sm:h-6 w-px bg-white/20" />

            {/* Official MBITS Institution Logo */}
            <a
              href="https://mbits.ac.in"
              target="_blank"
              rel="noreferrer"
              className="group flex items-center gap-2.5 transition-all duration-300 opacity-75 hover:opacity-100"
              title="Mar Baselios Institute of Technology and Science"
            >
              <img
                src="/assets/logos/mbits-official.png"
                alt="Mar Baselios Institute of Technology and Science"
                className="h-6 sm:h-7 w-auto object-contain brightness-0 invert transition-transform duration-300 group-hover:scale-105"
              />
              <span className="hidden xl:inline-flex items-center font-mono text-[9px] uppercase tracking-widest text-lime/90 font-bold px-1.5 py-0.5 rounded-full bg-lime/10 border border-lime/25">
                #14591
              </span>
            </a>
          </div>

          {/* Center Navigation Links - Desktop */}
          <nav className="hidden md:flex items-center gap-8 px-6 py-2 rounded-full bg-obsidian-surface/60 backdrop-blur-md border border-white/5">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="relative text-sm text-white/70 hover:text-white transition-colors duration-200 group py-1"
              >
                <span>{link.name}</span>
                {/* Habito Underline Expand Hover */}
                <span className="absolute bottom-0 left-0 w-full h-[1px] bg-lime scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              </a>
            ))}
          </nav>

          {/* Right Action Button - Habito Rolling CTA */}
          <div className="hidden md:flex items-center gap-4">
            <ButtonRoll href="#join" variant="lime" size="sm" withArrow>
              JOIN CHAPTER
            </ButtonRoll>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden flex items-center justify-center w-10 h-10 rounded-full bg-obsidian-surface border border-white/10 text-white hover:text-lime transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Fullscreen Mobile Drawer */}
      <div
        className={`fixed inset-0 z-40 bg-obsidian/95 backdrop-blur-2xl md:hidden flex flex-col justify-between p-8 pt-28 transition-all duration-500 ease-[cubic-bezier(0.62,0.05,0.01,0.99)] ${
          mobileMenuOpen
            ? "opacity-100 pointer-events-auto translate-y-0"
            : "opacity-0 pointer-events-none -translate-y-4"
        }`}
      >
        <div className="flex flex-col gap-6">
          <span className="font-mono text-xs uppercase tracking-widest text-lime">
            // NAVIGATION DIRECTORY
          </span>
          {navLinks.map((link, idx) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="font-display font-extrabold text-3xl sm:text-4xl text-white hover:text-lime transition-colors flex items-center justify-between group"
            >
              <span>{link.name}</span>
              <span className="font-mono text-xs text-white/40 group-hover:text-lime">
                0{idx + 1}
              </span>
            </a>
          ))}
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col gap-4">
          {/* Dual logos lockup for mobile */}
          <div className="flex items-center justify-between py-3 px-2 border-b border-white/10 mb-2">
            <div className="flex items-center gap-3">
              <img
                src="/assets/logos/ieee-cs.svg"
                alt="IEEE CS"
                className="h-6 w-auto object-contain"
              />
              <div className="h-4 w-px bg-white/20" />
              <img
                src="/assets/logos/mbits-official.png"
                alt="MBITS"
                className="h-5 w-auto object-contain brightness-0 invert opacity-80"
              />
            </div>
            <span className="font-mono text-[9px] uppercase tracking-wider text-lime font-bold px-2 py-0.5 rounded-full bg-lime/10 border border-lime/25">
              #14591
            </span>
          </div>

          <ButtonRoll
            href="#join"
            variant="lime"
            size="lg"
            withArrow
            onClick={() => setMobileMenuOpen(false)}
            className="w-full justify-center"
          >
            JOIN CHAPTER NOW
          </ButtonRoll>
          <div className="flex items-center justify-between text-xs font-mono text-white/40">
            <span>IEEE CS MBITS © 2026</span>
            <span>SYSTEMS V2.0</span>
          </div>
        </div>
      </div>
    </>
  );
}
