import React, { ReactNode } from "react";
import { twMerge } from "tailwind-merge";
import style from "./index.module.scss";

interface ButtonProps {
  variant?: "primary" | "secondary";
  size?: "medium" | "small";
  label: ReactNode;
  onClick?: () => void;
  classNames?: string;
}

export const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  classNames,
  variant = "primary",
  size = "medium",
}) => {
  return (
    <button
      onClick={onClick}
      className={twMerge(style.button, style[variant], style[size], classNames)}
    >
      <span className="relative z-10">{label}</span>
    </button>
  );
};
