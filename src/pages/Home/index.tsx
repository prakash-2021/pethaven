import { BsStars } from "react-icons/bs";
import { FaArrowRight } from "react-icons/fa6";
import { PiDotsNineBold } from "react-icons/pi";
import { twMerge } from "tailwind-merge";
import { Button, PetCard } from "../../components";
import styles from "./index.module.scss";

const Home = () => {
  return (
    <main className="mt-14">
      <div className="ph-container">
        <section className="text-center">
          <h1 className="ph-heading--one mb-1.5">
            Say hi to your new <br />
            adopted pet
          </h1>

          <img src="/home/curveLine.svg" alt="" className="mx-auto mb-11" />

          <div className="max-w-[56rem] mx-auto mb-12">
            <p className="ph-body--medium">
              "PetHaven - Connecting loving homes with pets in need, while
              giving stray dogs a chance for a better life!" 🐾❤️
            </p>
          </div>

          <Button
            label={
              <div className="flex items-center gap-5">
                <span>Adopt you pet</span>
                <FaArrowRight color="#154C7E" size={20} />
              </div>
            }
            classNames="mx-auto"
          />
        </section>
      </div>

      <section
        className={twMerge(
          "mb-24 py-24 relative overflow-hidden",
          styles.dogBg
        )}
      >
        <div className="flex justify-center gap-24 mb-10">
          <PetCard image="/dog.webp" name="Pepsi" />
          <PetCard image="/dog.webp" name="Pepsi" />
          <PetCard image="/dog.webp" name="Pepsi" />
        </div>

        <div className="flex justify-center gap-24">
          <PetCard image="/dog.webp" name="Pepsi" />
          <PetCard image="/dog.webp" name="Pepsi" />
          <PetCard image="/dog.webp" name="Pepsi" />
        </div>
      </section>

      <section className="flex flex-col items-center mb-24">
        <div className="ph-container">
          <h2 className="ph-heading--three mb-6 text-center">
            Find the perfect pet for you
          </h2>

          <p className="ph-body--small max-w-[800px] mb-16 text-center mx-auto">
            Only a limited number of each minymon will be released. You can see
            which pets are up for adoption now, or contact our team to design a
            custom minymon.
          </p>

          <div className="flex items-center gap-6 mb-16">
            <img src="/home/dog1.png" alt="" />
            <img src="/home/dog1.png" alt="" />
            <img src="/home/dog1.png" alt="" />
            <img src="/home/dog1.png" alt="" />
          </div>

          <div className="flex gap-10 justify-center">
            <Button
              label={
                <div className="flex items-center gap-2">
                  <PiDotsNineBold size={20} />
                  <span>See Available Pet</span>
                </div>
              }
              variant="secondary"
            />

            <Button
              label={
                <div className="flex items-center gap-2">
                  <BsStars size={20} />
                  <span>See Pet stories</span>
                </div>
              }
              variant="secondary"
            />
          </div>
        </div>
      </section>

      <section className="flex flex-col items-center mb-24 bg-[#CAE5E0] py-24">
        <div className="ph-container">
          <h2 className="ph-heading--three mb-6 text-center">
            Have an confusion choosing pet?
          </h2>

          <p className="ph-body--small max-w-[800px] mb-16 text-center mx-auto">
            Only a limited number of each minymon will be released. You can see
            which pets are up for adoption now, or contact our team to design a
            custom minymon.
          </p>

          <div className="flex justify-center">
            <Button
              label={
                <div className="flex items-center gap-2">
                  <span>Take a quiz</span>
                  <FaArrowRight size={20} />
                </div>
              }
              variant="secondary"
            />
          </div>
        </div>
      </section>

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

export default Home;
