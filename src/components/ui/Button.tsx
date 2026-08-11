"use client";

import React from "react";
import { motion } from "framer-motion";

type ButtonVariant = "primary" | "secondary" | "outline" | "danger";
type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  icon?: React.ReactNode;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: "bg-gradient-to-r from-[#9F1239] via-[#BE123C] to-[#E11D48] text-white shadow-lg shadow-rose-900/30 hover:shadow-rose-900/50 border-transparent",
  secondary: "bg-rose-950/10 dark:bg-white/5 backdrop-blur-md text-rose-950 dark:text-rose-100 border border-rose-900/20 dark:border-white/10 hover:bg-rose-950/20 dark:hover:bg-white/10",
  outline: "bg-transparent text-rose-950 dark:text-white border-2 border-rose-800/40 hover:border-rose-600 hover:bg-rose-500/10 hover:shadow-lg hover:shadow-rose-900/20",
  danger: "bg-gradient-to-r from-[#881337] to-red-700 text-white shadow-lg shadow-rose-900/30 hover:shadow-rose-900/50 border-transparent",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg font-semibold",
};

export function Button({ className = "", variant = "primary", size = "md", isLoading, icon, children, disabled, ...props }: ButtonProps) {
    return (
      <motion.button
        whileHover={{ scale: disabled || isLoading ? 1 : 1.02 }}
        whileTap={{ scale: disabled || isLoading ? 1 : 0.98 }}
        className={`
          relative inline-flex items-center justify-center font-manrope rounded-xl transition-all duration-200
          focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#9F1239] dark:focus:ring-offset-[#080406]
          disabled:opacity-60 disabled:cursor-not-allowed border z-0 overflow-hidden
          ${variantStyles[variant]}
          ${sizeStyles[size]}
          ${className}
        `}
        disabled={disabled || isLoading}
        onClick={props.onClick as any}
        type={props.type}
      >
        {isLoading && (
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        )}
        {!isLoading && icon && <span className="mr-2">{icon}</span>}
        {children}
      </motion.button>
    );
  }
