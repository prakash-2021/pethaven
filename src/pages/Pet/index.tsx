import { useState } from "react";
import { BiSearch } from "react-icons/bi";
import { useDebounceValue } from "usehooks-ts";
import {
  Button,
  CTA,
  PetCard,
  ScrollToTop,
  SelectInput,
  TextInput,
} from "../../components";
import { useGetAllPets } from "./queries";

const Pet = () => {
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");
  const [searchDebounced] = useDebounceValue(search, 400);
  const [adoptionStatus, setAdoptionStatus] = useState("AVAILABLE");
  const { data } = useGetAllPets(1, limit, searchDebounced, adoptionStatus);

  return (
    <main className="mt-14">
      <div className="ph-container">
        <h2 className="ph-heading--three mb-6 text-center">
          Find the perfect pet for you
        </h2>

        <p className="ph-body--small max-w-[800px] mb-10 text-center mx-auto">
          Take our quick quiz to discover pets that match your lifestyle and
          preferences. We’ll help you find your ideal furry friend in no time!
        </p>

        <div className="mx-auto mb-12 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
          <div className="min-w-[20rem] sm:min-w-[30rem]">
            <TextInput
              placeholder="Search by name, breed or species"
              type="text"
              endIcon={<BiSearch size={18} />}
              onChange={(e) => setSearch(e.target.value)}
              value={search}
            />
          </div>
          <div className="min-w-[10rem]">
            <SelectInput
              options={[
                { label: "Available", value: "AVAILABLE" },
                { label: "Adopted", value: "ADOPTED" },
              ]}
              onChange={(e) => setAdoptionStatus(e.target.value)}
              value={adoptionStatus}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {data?.pets.map((pet) => (
            <div className="flex items-center justify-center" key={pet.petId}>
              <PetCard
                image={pet.images[0]}
                name={pet.name}
                id={pet.petId}
                status={pet.adoptionStatus}
              />
            </div>
          ))}
        </div>

        {(data?.meta.totalPets || 0) > limit && (
          <Button
            label="Explore more pets"
            size="small"
            classNames="mx-auto mb-16"
            onClick={() => setLimit(limit + 10)}
          />
        )}
      </div>

      <CTA />

      <ScrollToTop />
    </main>
  );
};

export default Pet;
