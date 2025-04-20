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
        <figure className="w-[280px] h-[280px] rounded-[12px] overflow-hidden relative">
          <img src={image} alt="" className="ph-image" />
        </figure>
        <Link to={"/pets/" + id}>
          <Button
            label={status === "ADOPTED" ? "Details" : "Adopt"}
            onClick={onClick}
            classNames="-translate-y-1/2 mx-auto"
            variant="secondary"
          />
        </Link>
      </div>

      <span className="ph-body--small text-[#F16849]">{name}</span>

      {status === "ADOPTED" && (
        <div className="absolute right-4 top-4 bg-white rounded-sm p-1">
          <span className="text-sm">Adopted</span>
        </div>
      )}
    </div>
  );
};
