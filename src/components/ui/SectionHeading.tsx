"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  showLine?: boolean;
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  title,
  subtitle,
  align = "center",
  showLine = true,
  className = "",
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const isCenter = align === "center";

  return (
    <div ref={ref} className={`mb-12 md:mb-16 ${isCenter ? "text-center flex flex-col items-center" : "text-left"} ${className}`}>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="font-poppins font-black text-3xl md:text-4xl lg:text-5xl tracking-tight text-slate-900 dark:text-rose-100 mb-4"
      >
        {title.split(' ').map((word, i) => (
          <span key={i} className="inline-block mr-[0.25em]">
            {i % 2 !== 0 ? (
              <span className="bg-gradient-to-r from-[#9F1239] via-[#BE123C] to-[#FDA4AF] bg-clip-text text-transparent">
                {word}
              </span>
            ) : (
              word
            )}
          </span>
        ))}
      </motion.h2>

      {subtitle && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className={`font-inter text-slate-600 dark:text-rose-200/70 text-base md:text-lg max-w-2xl ${isCenter ? "mx-auto" : ""}`}
        >
          {subtitle}
        </motion.p>
      )}

      {showLine && (
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={isInView ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeInOut" }}
          style={{ originX: isCenter ? 0.5 : 0 }}
          className={`mt-6 h-1.5 w-24 rounded-full bg-gradient-to-r from-[#9F1239] via-[#BE123C] to-[#FDA4AF] opacity-90 shadow-md shadow-rose-900/30`}
        />
      )}
    </div>
  );
};
