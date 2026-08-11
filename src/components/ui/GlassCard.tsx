"use client";

import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";

interface GlassCardProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  className?: string;
  gradientBorder?: boolean;
  padding?: "none" | "sm" | "md" | "lg";
  blur?: "sm" | "md" | "lg" | "xl";
  hoverEffect?: boolean;
}

const paddingStyles = {
  none: "p-0",
  sm: "p-4",
  md: "p-6 sm:p-8",
  lg: "p-8 sm:p-12",
};

const blurStyles = {
  sm: "backdrop-blur-sm",
  md: "backdrop-blur-md",
  lg: "backdrop-blur-lg",
  xl: "backdrop-blur-xl",
};

export const GlassCard = React.forwardRef<HTMLDivElement, GlassCardProps>(
  (
    { 
      children, 
      className = "", 
      gradientBorder = false, 
      padding = "md", 
      blur = "xl",
      hoverEffect = true,
      ...props 
    }, 
    ref
  ) => {
    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        whileHover={hoverEffect ? { y: -5, transition: { duration: 0.2 } } : {}}
        className={`
          relative rounded-2xl md:rounded-3xl overflow-hidden
          bg-white/70 dark:bg-[#12070D]/70 
          border border-rose-900/10 dark:border-rose-900/25
          shadow-[0_8px_32px_0_rgba(159,18,57,0.06)] dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.5)]
          ${blurStyles[blur]}
          ${gradientBorder ? "before:absolute before:inset-0 before:-z-10 before:rounded-[inherit] before:p-[1px] before:bg-gradient-to-br before:from-[#9F1239]/50 before:via-[#BE123C]/50 before:to-[#FB7185]/50 before:content-['']" : ""}
          ${hoverEffect ? "hover:shadow-2xl hover:shadow-rose-950/20 hover:border-rose-900/30 dark:hover:border-rose-800/40 transition-all duration-300 group" : ""}
          ${className}
        `}
        {...props}
      >
        <div className={`relative z-10 h-full ${paddingStyles[padding]}`}>
          {children}
        </div>
        
        {/* Hover Glow Effect */}
        {hoverEffect && (
          <div className="absolute inset-0 z-0 bg-gradient-to-br from-white/10 to-transparent dark:from-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
        )}
      </motion.div>
    );
  }
);
GlassCard.displayName = "GlassCard";
