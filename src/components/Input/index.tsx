import React, { ReactNode } from "react";
import { twMerge } from "tailwind-merge";
import styles from "./index.module.scss";

interface Input {
  label?: string;
  placeholder: string;
  type: string;
  inputProps?: React.HTMLProps<HTMLInputElement>;
  errorMessage?: string;
  endIcon?: ReactNode;
}

export const TextInput = ({
  label,
  placeholder,
  type,
  inputProps,
  errorMessage,
  endIcon,
}: Input) => {
  return (
    <div className="text-left w-full">
      <div className={twMerge(styles.input, errorMessage && styles.error)}>
        {!!label && <label className="font-medium">{label}</label>}
        <input
          type={type}
          placeholder={placeholder}
          {...inputProps}
          onWheel={(e) => e.currentTarget.blur()}
        />
        {endIcon && <span className={styles.endIcon}>{endIcon}</span>}
      </div>
      {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
    </div>
  );
};
