"use client";
import confetti from "canvas-confetti";
import { gsap } from "gsap";
import { useEffect, useRef, useState } from "react";
import { BiX } from "react-icons/bi";
import { Button } from "../Button";
import { TextInput } from "../Input";
import styles from "./index.module.scss";
import { useCreateApplication } from "./queries";

export const Application = ({
  isModalOpen,
  handleClose: handleCloseAll,
  userId,
  petId,
}: {
  isModalOpen: boolean;
  handleClose: () => void;
  userId: string;
  petId: string;
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

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

    return () => ctx.revert();
  }, [isModalOpen]);

  const [form, setForm] = useState({
    reason: "",
    petExperience: "",
    homeType: "",
    hasOtherPets: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const { mutate, isSuccess } = useCreateApplication();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!form.reason.trim()) newErrors.reason = "Reason is required";
    if (!form.petExperience.trim())
      newErrors.petExperience = "Pet experience is required";
    if (!form.homeType.trim()) newErrors.homeType = "Home type is required";
    if (form.hasOtherPets.trim() === "")
      newErrors.hasOtherPets = "Please specify if you have other pets";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;

    mutate({
      hasOtherPets: form.hasOtherPets,
      homeType: form.homeType,
      reason: form.reason,
      petId,
      userId,
      hasPetExperience: form.petExperience,
    });
  };

  const handleClose = () => {
    handleCloseAll();
  };

  useEffect(() => {
    if (isSuccess) {
      const duration = 2 * 1000;
      const animationEnd = Date.now() + duration;

      const interval = setInterval(() => {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          clearInterval(interval);
          return;
        }

        confetti({
          particleCount: 50,
          startVelocity: 30,
          spread: 360,
          ticks: 60,
          origin: {
            x: Math.random(),
            y: Math.random() - 0.2,
          },
        });
      }, 250);
    }
  }, [isSuccess]);

  return (
    <div className={styles.modal} ref={modalRef} data-lenis-prevent>
      <div className={styles.modalHeader}>
        <div className="w-full mx-4 lg:mx-12">
          <div className="flex items-center justify-between w-full">
            <button
              className="flex items-center justify-center border rounded-full border-black cursor-pointer"
              onClick={handleClose}
            >
              <BiX color="black" size={24} />
            </button>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center w-full h-[100vh] ">
        {isSuccess ? (
          <div className="ph-container w-full">
            <h2 className="ph-heading--three mb-8 text-center">
              Your application has been submitted 🙂
            </h2>
            <Button
              label="Go back"
              size="small"
              variant="primary"
              onClick={handleClose}
              classNames="mx-auto"
            />
          </div>
        ) : (
          <div className="ph-container w-full">
            <h2 className="ph-heading--three mb-8 text-center">
              Apply to Adopt a Pet 🙂
            </h2>
            <div className="grid grid-cols-1 gap-6 max-w-lg mx-auto w-full">
              <TextInput
                name="reason"
                placeholder="Why do you want to adopt?"
                type="text"
                label="Reason for adoption *"
                value={form.reason}
                onChange={handleChange}
                error={errors.reason}
              />

              <TextInput
                name="petExperience"
                placeholder="Tell us about your experience with pets"
                type="text"
                label="Pet experience *"
                value={form.petExperience}
                onChange={handleChange}
                error={errors.petExperience}
              />

              <TextInput
                name="homeType"
                placeholder="What type of home do you live in? (e.g., apartment, house)"
                type="text"
                label="Type of home *"
                value={form.homeType}
                onChange={handleChange}
                error={errors.homeType}
              />

              <TextInput
                name="hasOtherPets"
                placeholder="Do you have other pets? If yes, tell us about them"
                type="text"
                label="Other pets *"
                value={form.hasOtherPets}
                onChange={handleChange}
                error={errors.hasOtherPets}
              />

              <Button label="Submit Application" onClick={handleSubmit} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
