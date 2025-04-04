import { CTA, PetCard } from "../../components";

const Pet = () => {
  return (
    <main className="mt-14">
      <div className="ph-container">
        <h2 className="ph-heading--three mb-6 text-center">
          Find the perfect pet for you
        </h2>

        <p className="ph-body--small max-w-[800px] mb-16 text-center mx-auto">
          Only a limited number of each minymon will be released. You can see
          which pets are up for adoption now, or contact our team to design a
          custom minymon.
        </p>

        <div className="grid grid-cols-3 gap-6 mb-16">
          <div className="flex items-center justify-center">
            <PetCard image="/dog.webp" name="Pepsi" />
          </div>
          <div className="flex items-center justify-center">
            <PetCard image="/dog.webp" name="Pepsi" />
          </div>
          <div className="flex items-center justify-center">
            <PetCard image="/dog.webp" name="Pepsi" />
          </div>
          <div className="flex items-center justify-center">
            <PetCard image="/dog.webp" name="Pepsi" />
          </div>
          <div className="flex items-center justify-center">
            <PetCard image="/dog.webp" name="Pepsi" />
          </div>
          <div className="flex items-center justify-center">
            <PetCard image="/dog.webp" name="Pepsi" />
          </div>
          <div className="flex items-center justify-center">
            <PetCard image="/dog.webp" name="Pepsi" />
          </div>
          <div className="flex items-center justify-center">
            <PetCard image="/dog.webp" name="Pepsi" />
          </div>
          <div className="flex items-center justify-center">
            <PetCard image="/dog.webp" name="Pepsi" />
          </div>
        </div>
      </div>

      <CTA />
    </main>
  );
};

export default Pet;
