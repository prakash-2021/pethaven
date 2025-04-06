import { useState } from "react";
import { BsStars } from "react-icons/bs";
import { FaArrowRight } from "react-icons/fa6";
import { PiDotsNineBold } from "react-icons/pi";
import { Link } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import { Button, CTA, PetCard, QuizModal, ScrollToTop } from "../../components";
import { useGetAllPets } from "../Pet/queries";
import styles from "./index.module.scss";

const Home = () => {
  const [showModal, setShowModal] = useState(false);

  const { data } = useGetAllPets(1, 6);

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
          {data?.pets.slice(0, 3).map((pet) => (
            <PetCard
              image={pet.images[0]}
              name={pet.name}
              key={pet.petId}
              id={pet.petId}
            />
          ))}
        </div>

        <div className="flex justify-center gap-24">
          {data?.pets.slice(3, 6).map((pet) => (
            <PetCard
              image={pet.images[0]}
              name={pet.name}
              key={pet.petId}
              id={pet.petId}
            />
          ))}
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
            <img src="/home/dog1.png" alt="" className="max-w-[300px]" />
            <img src="/home/dog3.png" alt="" className="max-w-[230px]" />
            <img src="/home/cat4.png" alt="" className="max-w-[200px]" />
            <img src="/home/dog4.png" alt="" className="max-w-[140px]" />
          </div>

          <div className="flex gap-10 justify-center">
            <Link to={"/pets"}>
              <Button
                label={
                  <div className="flex items-center gap-2">
                    <PiDotsNineBold size={20} />
                    <span>See Available Pet</span>
                  </div>
                }
                variant="secondary"
              />
            </Link>

            <Link to={"/stories"}>
              <Button
                label={
                  <div className="flex items-center gap-2">
                    <BsStars size={20} />
                    <span>See Pet stories</span>
                  </div>
                }
                variant="secondary"
              />
            </Link>
          </div>
        </div>
      </section>

      <section className="flex flex-col items-center mb-24 bg-[#CAE5E0] py-24">
        <div className="ph-container">
          <h2 className="ph-heading--three mb-6 text-center">
            Have an confusion choosing pet?
          </h2>

          <p className="ph-body--small max-w-[800px] mb-16 text-center mx-auto">
            Finding the perfect pet can be tricky, but we’re here to guide you!
            Take our quiz to discover a pet that matches your lifestyle, energy
            levels, and home environment. Whether you're looking for an active
            companion or a relaxed cuddle buddy, we’ll help you find the ideal
            furry friend!
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
              onClick={() => setShowModal(true)}
            />
          </div>
        </div>
      </section>

      <CTA />

      <QuizModal
        handleClose={() => setShowModal(false)}
        isModalOpen={showModal}
      />

      <ScrollToTop />
    </main>
  );
};

export default Home;
