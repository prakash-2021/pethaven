import { Button } from "../Button";

interface PetCardProps {
  name: string;
  image: string;
  onClick?: () => void;
}

export const PetCard = ({ image, name, onClick }: PetCardProps) => {
  return (
    <div className="w-fit flex flex-col items-center">
      <div className="">
        <figure className="w-[280px] h-[280px] rounded-[12px] overflow-hidden relative">
          <img src={image} alt="" className="ph-image" />
        </figure>

        <Button
          label="Adopt"
          onClick={onClick}
          classNames="-translate-y-1/2 mx-auto"
          variant="secondary"
        />
      </div>

      <span className="ph-body--small text-[#F16849]">{name}</span>
    </div>
  );
};
