"use client";

import type React from "react";
import type { ReactNode } from "react";
import { twMerge } from "tailwind-merge";
import style from "./index.module.scss";

interface ButtonProps {
  variant?: "primary" | "secondary";
  size?: "medium" | "small";
  label: ReactNode;
  onClick?: () => void;
  classNames?: string;
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  classNames,
  variant = "primary",
  size = "medium",
  disabled = false,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={twMerge(
        style.button,
        style[variant],
        style[size],
        disabled && style.disabled,
        classNames
      )}
    >
      <span className="relative z-10">{label}</span>
    </button>
  );
};
