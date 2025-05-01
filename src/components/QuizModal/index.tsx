"use client";
import { gsap } from "gsap";
import { useEffect, useRef, useState } from "react";
import { BiArrowBack, BiCheck, BiX } from "react-icons/bi";
import { twMerge } from "tailwind-merge";
import { useCounter } from "usehooks-ts";
import { mergePets } from "../../utils/petFinder";
import { Button } from "../Button";
import { PetCard } from "../PetCard";
import styles from "./index.module.scss";
import { useGetQuiz, usePetsByAnswerId } from "./queries";

export const QuizModal = ({
  isModalOpen,
  handleClose: handleCloseAll,
}: {
  isModalOpen: boolean;
  handleClose: () => void;
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  const { count: activeStep, increment, decrement, reset } = useCounter(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string>("");
  const [selectedAnswerTotal, setSelectedAnswerTotal] = useState<string[]>([]);

  const { data: matchPet, mutate } = usePetsByAnswerId();

  useEffect(() => {
    if (activeStep === 8) {
      mutate({ answerIds: selectedAnswerTotal });
    }
  }, [mutate, activeStep, selectedAnswerTotal]);

  const handleClose = () => {
    reset();
    setSelectedAnswer("");
    setSelectedAnswerTotal([]);
    handleCloseAll();
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (isModalOpen) {
        gsap
          .timeline()
          .to("body", { overflow: "hidden", duration: 0 })
          .to(modalRef.current, { autoAlpha: 1, duration: 0.25 }, "<");
      } else {
        gsap
          .timeline()
          .to("body", { overflow: "unset", duration: 0 })
          .to(modalRef.current, { autoAlpha: 0, duration: 0.25 }, "<");
      }
    });

    return () => {
      ctx.revert();
    };
  }, [isModalOpen]);

  useEffect(() => {
    gsap.to(progressBarRef.current, {
      width: (100 / 9) * (activeStep + 1) + "%",
      autoAlpha: activeStep === 9 ? 0 : 1,
    });
  }, [activeStep]);

  useEffect(() => {
    gsap.set(modalRef.current, { autoAlpha: 0, duration: 0 });
  }, []);

  const handleNext = () => {
    if (selectedAnswer) {
      increment();
      setSelectedAnswer("");
    }
  };

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer);
  };

  const { data } = useGetQuiz();

  return (
    <div className={styles.modal} ref={modalRef} data-lenis-prevent>
      <div className={styles.modalHeader}>
        <div className="w-full mx-4 lg:mx-12">
          <div className="flex items-center justify-between w-full">
            <button
              className="flex gap-3 cursor-pointer"
              onClick={activeStep ? decrement : handleClose}
            >
              <BiArrowBack color="black" size={20} />
              <span className="text-black cnc-body--sm">BACK</span>
            </button>

            <button
              className="flex items-center justify-center border rounded-full border-black cursor-pointer"
              onClick={handleClose}
            >
              <BiX color="black" size={24} />
            </button>
          </div>
        </div>
      </div>

      <div className={styles.progressBar} ref={progressBarRef} />

      {!!data?.length && activeStep < 8 && (
        <div className="flex items-center justify-center w-full h-[80%]">
          <div className="max-w-[900px] w-full">
            <h2 className="text-center ph-text-x-large mb-10">
              {data[activeStep].questionText}
            </h2>

            <div className="flex justify-center gap-10 mb-10">
              <div className="grid grid-cols-2 gap-10 w-full">
                {data[activeStep].answers.map((option, index) => (
                  <div
                    key={index}
                    className={twMerge(
                      "relative flex flex-col items-center justify-center p-4 border gap-4 cursor-pointer",
                      selectedAnswer === option.answerId && "border-2"
                    )}
                    onClick={() => {
                      handleAnswerSelect(option.answerId);
                      setSelectedAnswerTotal((prev) => [
                        ...prev,
                        option.answerId,
                      ]);
                    }}
                  >
                    <span>{option.answerText}</span>
                    {selectedAnswer === option.answerId && (
                      <span className="absolute top-3 right-3 opacity-100">
                        <BiCheck color="black" size={24} />
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-center gap-10 mb-10">
              <Button label={"Cancel"} variant="primary" size="small" />
              <Button
                label={"Next"}
                variant="secondary"
                size="small"
                onClick={handleNext}
              />
            </div>
          </div>
        </div>
      )}

      {activeStep === 8 && (
        <>
          <div className="flex items-center justify-center w-full h-auto overflow-y-scroll mt-10">
            <div className="max-w-[900px] w-full">
              <h2 className="mb-8 ph-heading--three">Recommended Pets</h2>
              {matchPet && (
                <div className="grid grid-cols-3 gap-8 mb-16">
                  {mergePets(matchPet).pets.items.map((pet) => (
                    <div
                      className="flex items-center justify-center flex-col"
                      key={pet.petId}
                    >
                      <PetCard
                        image={pet.images[0]}
                        name={pet.name}
                        id={pet.petId}
                      />
                      <p className="text-xl">
                        {(pet.count / 8) * 100}% matched
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};
