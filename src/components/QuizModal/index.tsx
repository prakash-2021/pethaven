"use client";
import { gsap } from "gsap";
import { useEffect, useRef } from "react";
import { BiArrowBack, BiCheck, BiX } from "react-icons/bi";
import { twMerge } from "tailwind-merge";
import { useCounter } from "usehooks-ts";
import { Button } from "../Button";
import styles from "./index.module.scss";

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

  const handleClose = () => {
    reset();
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
      autoAlpha: activeStep === 6 ? 0 : 1,
    });
  }, [activeStep]);

  useEffect(() => {
    gsap.set(modalRef.current, { autoAlpha: 0, duration: 0 });
  }, []);

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

      {/* <div className="flex items-center justify-center w-full h-[80%]">
        <div className="max-w-[600px] w-full">
          <h2 className="text-center ph-text-x-large">What is your name?</h2>

          <div className="mb-8">
            <TextInput
              placeholder="Enter your name"
              type="text"
              label="Full name"
            />
          </div>

          <div className="flex justify-center gap-4">
            <Button label={"Cancel"} variant="primary" size="small" />
            <Button label={"Next"} variant="secondary" size="small" />
          </div>
        </div>
      </div> */}

      <div className="flex items-center justify-center w-full h-[80%]">
        <div className="max-w-[600px] w-full">
          <h2 className="text-center ph-text-x-large mb-10">
            What is your name?
          </h2>

          <div className="flex justify-center gap-10 mb-10">
            <div
              className={twMerge(
                "relative flex flex-col items-center justify-center p-4 border gap-4 cursor-pointer border-black"
                //   faceShape.name === activeIndex && styles.shapeBoxActive
              )}
              // onClick={handleFaceShapeClick(faceShape.name)}
            >
              <img
                src={"/dog.webp"}
                height={100}
                width={100}
                className="pointer-events-none"
              />

              <span>{"faceShape.name"}</span>

              <span
                className={twMerge(
                  "absolute top-3 right-3 opacity-"
                  // faceShape.name === activeIndex && "opacity-100"
                )}
              >
                <BiCheck color="black" size={24} />
              </span>
            </div>
          </div>

          <div className="flex justify-center gap-10 mb-10">
            <Button label={"Cancel"} variant="primary" size="small" />
            <Button label={"Next"} variant="secondary" size="small" />
          </div>
        </div>
      </div>
    </div>
  );
};
