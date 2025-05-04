import { FaDog } from "react-icons/fa6";
import { twMerge } from "tailwind-merge";
import style from "./index.module.scss";

interface PetInfo {
  image: string;
  name: string;
  breed: string;
  age: number;
}

export const PetCardSlider = ({ age, breed, image, name }: PetInfo) => {
  return (
    <div
      className={twMerge(
        style.card,
        "cursor-pointer rounded-[4px] overflow-hidden w-full max-w-xs sm:max-w-sm"
      )}
    >
      <figure className="rounded-[12px] ph-figure relative overflow-hidden pt-[60%]">
        <img
          src={image}
          alt={name}
          className="ph-image object-cover w-full h-full rounded-md"
        />
      </figure>

      <span
        className={twMerge(
          style.name,
          "ph-text-x-large block text-[#154c7e] mt-3 font-semibold text-base sm:text-lg"
        )}
      >
        {name}
      </span>

      <div className="flex flex-wrap items-center gap-2 mt-2 text-sm text-[#F16849] font-medium">
        <FaDog className="text-base sm:text-lg" />
        <span className="w-1.5 h-1.5 rounded-full bg-[#F16849]"></span>
        <span>{age} years</span>
        <span className="w-1.5 h-1.5 rounded-full bg-[#F16849]"></span>
        <span>{breed} breed</span>
      </div>
    </div>
  );
};
