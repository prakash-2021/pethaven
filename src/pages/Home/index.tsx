import { useState } from "react";
import { BsStars } from "react-icons/bs";
import { FaArrowRight } from "react-icons/fa6";
import { PiDotsNineBold } from "react-icons/pi";
import { Link } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import { useMediaQuery } from "usehooks-ts";
import { Button, CTA, PetCard, QuizModal, ScrollToTop } from "../../components";
import { useGetAllPets } from "../Pet/queries";
import styles from "./index.module.scss";

const Home = () => {
  const [showModal, setShowModal] = useState(false);

  const { data } = useGetAllPets(1, 6);

  const isMobile = useMediaQuery("(max-width: 768px)");

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
              giving stray dogs a chance for a better life!" 🐾
            </p>
          </div>
          <a href={"/#quiz"}>
            <Button
              label={
                <div className="flex items-center gap-5">
                  <span>Adopt your pet</span>
                  <FaArrowRight color="#154C7E" size={20} />
                </div>
              }
              classNames="mx-auto"
            />
          </a>
        </section>
      </div>

      <section
        className={twMerge(
          "py-12 md:py-16 lg:py-24 mb-12 md:mb-16 lg:mb-24 relative overflow-hidden",
          styles.dogBg
        )}
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-12 mb-6 md:mb-8 lg:mb-10">
            {data?.pets.slice(0, isMobile ? 2 : 3).map((pet) => (
              <div className="flex justify-center" key={pet.petId}>
                <PetCard
                  image={pet.images[0]}
                  name={pet.name}
                  id={pet.petId}
                  status={pet.adoptionStatus}
                />
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-12">
            {data?.pets.slice(isMobile ? 2 : 3, isMobile ? 4 : 6).map((pet) => (
              <div className="flex justify-center" key={pet.petId}>
                <PetCard
                  image={pet.images[0]}
                  name={pet.name}
                  id={pet.petId}
                  status={pet.adoptionStatus}
                />
              </div>
            ))}
          </div>
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

          <div className="grid grid-cols-2 lg:grid-cols-4 items-center gap-6 mb-16">
            <figure className="flex items-center justify-center">
              <img src="/home/dog1.png" alt="" className="max-w-[300px]" />
            </figure>
            <figure className=" items-center justify-center hidden lg:flex">
              <img
                src="/home/dog3.png"
                alt=""
                className="max-w-[230px] hidden lg:block"
              />
            </figure>
            <figure className="flex items-center justify-center">
              <img src="/home/cat4.png" alt="" className="max-w-[180px]" />
            </figure>
            <figure className=" items-center justify-center hidden lg:flex">
              <img src="/home/dog4.png" alt="" className="max-w-[130px]" />
            </figure>
          </div>

          <div className="flex gap-10 flex-col lg:flex-row justify-center">
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

      <section
        className="flex flex-col items-center mb-24 bg-[#CAE5E0] py-24"
        id="quiz"
      >
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
