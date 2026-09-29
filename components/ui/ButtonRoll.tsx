"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import clsx from "clsx";

interface ButtonRollProps {
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  variant?: "lime" | "dark" | "outline" | "paper" | "ghost";
  size?: "sm" | "md" | "lg";
  withArrow?: boolean;
  withDot?: boolean;
  className?: string;
}

export default function ButtonRoll({
  href,
  onClick,
  children,
  variant = "lime",
  size = "md",
  withArrow = false,
  withDot = false,
  className,
}: ButtonRollProps) {
  const sizeStyles = {
    sm: "px-4 py-2 text-xs",
    md: "px-6 py-3.5 text-sm",
    lg: "px-8 py-4 text-base",
  }[size];

  const variantStyles = {
    lime: "bg-lime text-obsidian hover:bg-lime-hover font-semibold border border-lime shadow-[0_0_20px_rgba(203,235,58,0.25)]",
    dark: "bg-obsidian-surface text-white hover:border-lime/60 border border-white/10",
    outline: "bg-transparent text-white hover:text-lime border border-white/20 hover:border-lime",
    paper: "bg-paper text-ink hover:bg-white border border-black/10 font-medium",
    ghost: "bg-transparent text-white hover:text-lime",
  }[variant];

  const sharedClassName = clsx(
    "group relative inline-flex items-center justify-center overflow-hidden rounded-full transition-all duration-300 select-none cursor-pointer",
    sizeStyles,
    variantStyles,
    className
  );

  const content = (
    <>
      {/* Content wrapper with dual-line roll */}
      <div className="relative overflow-hidden flex items-center justify-center bg-inherit text-inherit">
        {/* Main visible text that slides UP on hover */}
        <span className="inline-flex items-center gap-2 bg-inherit text-inherit transform transition-transform duration-500 ease-[cubic-bezier(0.62,0.05,0.01,0.99)] group-hover:-translate-y-[150%]">
          {withDot && (
            <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
          )}
          <span className="bg-inherit text-inherit">{children}</span>
        </span>

        {/* Duplicate absolute text that rolls IN from bottom on hover */}
        <span
          aria-hidden="true"
          className="absolute inset-0 inline-flex items-center justify-center gap-2 transform translate-y-[150%] transition-transform duration-500 ease-[cubic-bezier(0.62,0.05,0.01,0.99)] group-hover:translate-y-0"
        >
          {withDot && (
            <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
          )}
          <span>{children}</span>
        </span>
      </div>

      {withArrow && (
        <div aria-hidden="true" className="ml-2 relative overflow-hidden w-4 h-4 flex items-center justify-center">
          <ArrowUpRight className="w-4 h-4 transform transition-transform duration-500 ease-[cubic-bezier(0.62,0.05,0.01,0.99)] group-hover:translate-x-3 group-hover:-translate-y-3" />
          <ArrowUpRight className="w-4 h-4 absolute transform -translate-x-3 translate-y-3 transition-transform duration-500 ease-[cubic-bezier(0.62,0.05,0.01,0.99)] group-hover:translate-x-0 group-hover:translate-y-0" />
        </div>
      )}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={sharedClassName}>
        {content}
      </Link>
    );
  }

  return (
    <button type="button" onClick={onClick} className={sharedClassName}>
      {content}
    </button>
  );
}
