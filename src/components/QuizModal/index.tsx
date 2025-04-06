"use client";
import { gsap } from "gsap";
import { useEffect, useRef, useState } from "react";
import { BiArrowBack, BiCheck, BiX } from "react-icons/bi";
import { twMerge } from "tailwind-merge";
import { useCounter } from "usehooks-ts";
import { Button } from "../Button";
import styles from "./index.module.scss";

const quizQuestions = [
  {
    question: "What is your ideal pet's activity level?",
    options: [
      "Very active, loves to run and play outside.",
      "Moderately active, enjoys walks and short play sessions.",
      "Relaxed, prefers lounging and short walks.",
      "Low energy, enjoys sitting by your side or on your lap.",
    ],
  },
  {
    question: "How much time can you dedicate to grooming your pet?",
    options: [
      "I enjoy grooming and can do it regularly.",
      "I don't mind grooming a little bit.",
      "I would prefer a low-maintenance pet with minimal grooming needs.",
      "I prefer pets that don’t require any grooming.",
    ],
  },
  {
    question: "How much space do you have for your pet?",
    options: [
      "I have a large house with a yard.",
      "I live in an apartment with some outdoor space nearby.",
      "I live in an apartment and don’t have much outdoor space.",
      "I have a small space but love to take my pet outside regularly.",
    ],
  },
  {
    question: "How would you describe your ideal pet's personality?",
    options: [
      "Friendly, playful, and loves everyone.",
      "Calm, affectionate, and enjoys cuddles.",
      "Independent, but enjoys occasional attention.",
      "Protective, loyal, and always by my side.",
    ],
  },
  {
    question: "Do you prefer a dog or a cat as a pet?",
    options: [
      "I prefer a dog—someone who loves adventure and outdoor activities.",
      "I prefer a cat—independent and easygoing.",
      "I like both, depending on personality and energy levels.",
      "I have no preference.",
    ],
  },
  {
    question: "How do you feel about pets that bark or meow loudly?",
    options: [
      "I don’t mind some noise—it adds personality.",
      "I’d prefer a quieter pet.",
      "I need a pet that is almost silent.",
      "I enjoy interacting with vocal pets.",
    ],
  },
  {
    question: "Are you looking for a pet with specific training needs?",
    options: [
      "Yes, I want a pet that I can train easily.",
      "I’m okay with a pet that needs some training but can manage.",
      "I’d prefer a pet that doesn’t require much training.",
      "I want a pet that already knows basic commands and is easy to handle.",
    ],
  },
  {
    question: "How do you feel about shedding?",
    options: [
      "I don’t mind shedding—regular cleaning is okay.",
      "I prefer a pet that sheds less.",
      "I prefer no shedding at all.",
      "I love pets with thick, fluffy coats, shedding included!",
    ],
  },
];

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

  const handleClose = () => {
    reset();
    setSelectedAnswer("");
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
      width: (100 / 7) * (activeStep + 1) + "%",
      autoAlpha: activeStep === 7 ? 0 : 1,
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

      <div className="flex items-center justify-center w-full h-[80%]">
        <div className="max-w-[900px] w-full">
          <h2 className="text-center ph-text-x-large mb-10">
            {quizQuestions[activeStep].question}
          </h2>

          <div className="flex justify-center gap-10 mb-10">
            <div className="grid grid-cols-2 gap-10 w-full">
              {quizQuestions[activeStep].options.map((option, index) => (
                <div
                  key={index}
                  className={twMerge(
                    "relative flex flex-col items-center justify-center p-4 border gap-4 cursor-pointer",
                    selectedAnswer === option && "border-2"
                  )}
                  onClick={() => handleAnswerSelect(option)}
                >
                  <span>{option}</span>
                  {selectedAnswer === option && (
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
    </div>
  );
};
