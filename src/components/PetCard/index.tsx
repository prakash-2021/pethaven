import { Link } from "react-router-dom";
import { Button } from "../Button";

interface PetCardProps {
  name: string;
  image: string;
  id: string;
  onClick?: () => void;
  status?: string;
}

export const PetCard = ({ image, name, onClick, id, status }: PetCardProps) => {
  return (
    <div className="w-fit flex flex-col items-center relative">
      <div className="">
        <figure className="w-[160px] h-[160px] lg:w-[280px] lg:h-[280px] rounded-[12px] overflow-hidden relative">
          <img src={image} alt="" className="ph-image" />
        </figure>
        <Link to={`/pets/${id}`}>
          <Button
            label={status === "ADOPTED" ? "Details" : "Adopt"}
            onClick={onClick}
            classNames="transform -translate-y-1/2 mx-auto"
            variant="secondary"
          />
        </Link>
      </div>

      <span className="ph-body--small text-[#F16849] lg:mt-2 text-center">
        {name}
      </span>

      {status === "ADOPTED" && (
        <div className="absolute right-2 top-2 bg-white rounded-sm px-2 py-1 shadow-sm">
          <span className="text-xs font-medium text-gray-700">Adopted</span>
        </div>
      )}
    </div>
  );
};
