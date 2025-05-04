import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { twMerge } from "tailwind-merge";
import styles from "./index.module.scss";

const faqData = [
  {
    question: "What is PetHaven?",
    answer:
      "PetHaven is a platform where you can adopt pets, report strays, and share adoption stories.",
  },
  {
    question: "How do I adopt a pet?",
    answer:
      "Take our pet quiz to get matched with a pet that suits your lifestyle, then fill out the adoption form.",
  },
  {
    question: "Can I report a stray animal?",
    answer:
      "Yes, you can report stray animals through our report page, and nearby shelters will be notified.",
  },
  {
    question: "How can I share an inspirational adoption story?",
    answer:
      "You can share your pet adoption journey by creating a new story in the 'Story' page. Include a title, description, photos, and your experience to inspire others.",
  },
  {
    question: "Can I post about my lost dog?",
    answer:
      "Yes, PetHaven allows you to create a post in the 'Story' page to share details about your lost dog. This helps raise awareness and allows others to help find your pet.",
  },
];

export const CTA = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setActiveIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div className="ph-container mb-20">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
        <div className="col-span-2">
          <h2 className={`ph-heading--three mb-7`}>
            Any questions? <br /> We got you
          </h2>
          <p>
            We've compiled some of the most common queries about PetHaven to
            help you get started. Whether you're looking to adopt, report a
            stray, or just learn more, you'll find the answers below.
          </p>
        </div>
        <div className={twMerge("col-span-3", styles.items)}>
          {faqData.map((item, index) => (
            <div key={index} className={styles.item}>
              <button
                className={styles.question}
                onClick={() => toggle(index)}
                aria-expanded={activeIndex === index}
              >
                {item.question}
                <span
                  className={`${styles.icon} ${
                    activeIndex === index ? styles.rotate : ""
                  }`}
                >
                  <IoIosArrowDown />
                </span>
              </button>
              <div
                className={`${styles.answerWrapper} ${
                  activeIndex === index ? styles.open : ""
                }`}
              >
                <div className={styles.answer}>{item.answer}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
