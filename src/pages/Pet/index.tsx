import { CTA, PetCard, ScrollToTop } from "../../components";
import { useGetAllPets } from "./queries";

const Pet = () => {
  const { data } = useGetAllPets();

  return (
    <main className="mt-14">
      <div className="ph-container">
        <h2 className="ph-heading--three mb-6 text-center">
          Find the perfect pet for you
        </h2>

        <p className="ph-body--small max-w-[800px] mb-16 text-center mx-auto">
          Take our quick quiz to discover pets that match your lifestyle and
          preferences. We’ll help you find your ideal furry friend in no time!
        </p>

        <div className="grid grid-cols-3 gap-6 mb-16">
          {data?.pets.map((pet) => (
            <div className="flex items-center justify-center" key={pet.petId}>
              <PetCard image={pet.images[0]} name={pet.name} id={pet.petId} />
            </div>
          ))}
        </div>
      </div>

      <CTA />

      <ScrollToTop />
    </main>
  );
};

export default Pet;
