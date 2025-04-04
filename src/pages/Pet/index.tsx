import { FaArrowRight } from "react-icons/fa6";
import { Button, PetCard } from "../../components";

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

      <section className="mb-24">
        <div className="ph-container">
          <div className="grid grid-cols-12">
            <div className="col-span-8 col-start-3 bg-[#FFCDC1] py-24 rounded-2xl">
              <div className="flex flex-col items-center">
                <h2 className="ph-heading--three mb-6 text-center">
                  Get notified when new pet are released
                </h2>

                <p className="ph-body--small max-w-[800px] mb-16 text-center mx-auto">
                  New pets are released periodically in small batches, so the
                  best way to get ahold of one is to watch out for our email
                  newsletter.
                </p>

                <input type="text" />

                <Button
                  label={
                    <div className="flex items-center gap-2">
                      <span>Sign up</span>
                      <FaArrowRight size={20} />
                    </div>
                  }
                  variant="secondary"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Pet;
