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
          bg-white/40 dark:bg-[#050816]/40 
          border border-gray-200/50 dark:border-white/10
          shadow-[0_8px_32px_0_rgba(31,38,135,0.07)] dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]
          ${blurStyles[blur]}
          ${gradientBorder ? "before:absolute before:inset-0 before:-z-10 before:rounded-[inherit] before:p-[1px] before:bg-gradient-to-br before:from-[#2563EB]/50 before:via-[#7C3AED]/50 before:to-[#06B6D4]/50 before:content-['']" : ""}
          ${hoverEffect ? "hover:shadow-xl hover:border-gray-300/50 dark:hover:border-white/20 transition-all duration-300 group" : ""}
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
