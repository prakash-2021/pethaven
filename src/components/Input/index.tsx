import React, { InputHTMLAttributes, ReactNode } from "react";
import { twMerge } from "tailwind-merge";
import styles from "./index.module.scss";

interface Input extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  placeholder: string;
  type: string;
  inputProps?: React.HTMLProps<HTMLInputElement>;
  error?: string;
  endIcon?: ReactNode;
}

export const TextInput = ({
  label,
  placeholder,
  type,
  inputProps,
  error,
  endIcon,
  ...InputProps
}: Input) => {
  return (
    <div className="text-left w-full">
      <div
        className={twMerge(
          styles.input,
          error && styles.error,
          endIcon && "pr-5"
        )}
      >
        <div className="w-full">
          {!!label && <label className="font-medium">{label}</label>}
          <input
            type={type}
            placeholder={placeholder}
            {...inputProps}
            onWheel={(e) => e.currentTarget.blur()}
            {...InputProps}
          />
        </div>
        {endIcon && <span className={styles.endIcon}>{endIcon}</span>}
      </div>
      {error && (
        <p className={twMerge(styles.error, styles.errorMessage)}>{error}</p>
      )}
    </div>
  );
};
