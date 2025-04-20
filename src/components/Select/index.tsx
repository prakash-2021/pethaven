import { ReactNode, SelectHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";
import styles from "./index.module.scss";

interface SelectInputProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  placeholder?: string;
  options: { label: string; value: string }[];
  error?: string;
  endIcon?: ReactNode;
}

export const SelectInput = ({
  label,
  placeholder,
  options,
  error,
  endIcon,
  ...selectProps
}: SelectInputProps) => {
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
          <select
            {...selectProps}
            className="bg-transparent w-full text-[#154c7e] text-[20px] border-b-[2px] border-[#154b7e56] focus:border-[#154c7e] outline-none h-[64px]"
          >
            {placeholder && (
              <option value="" disabled selected hidden>
                {placeholder}
              </option>
            )}
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
        {endIcon && <span className={styles.endIcon}>{endIcon}</span>}
      </div>
      {error && (
        <p className={twMerge(styles.error, styles.errorMessage)}>{error}</p>
      )}
    </div>
  );
};
