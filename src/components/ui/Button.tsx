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
  primary: "bg-gradient-to-r from-[#2563EB] to-[#7C3AED] text-white shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 border-transparent",
  secondary: "bg-white/10 dark:bg-white/5 backdrop-blur-md text-gray-900 dark:text-white border-gray-200 dark:border-white/10 hover:bg-white/20 dark:hover:bg-white/10",
  outline: "bg-transparent text-gray-900 dark:text-white border-2 border-transparent bg-clip-padding relative before:absolute before:inset-0 before:-m-[2px] before:rounded-[inherit] before:bg-gradient-to-r before:from-[#06B6D4] before:to-[#7C3AED] before:-z-10 hover:shadow-lg hover:shadow-cyan-500/20",
  danger: "bg-gradient-to-r from-[#C41E3A] to-red-600 text-white shadow-lg shadow-red-500/25 hover:shadow-red-500/40 border-transparent",
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
          focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2563EB] dark:focus:ring-offset-[#050816]
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
