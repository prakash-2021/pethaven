import { useState } from "react";
import styles from "./index.module.scss";

const faqData = [
  {
    question: "What is petHaven?",
    answer:
      "petHaven is a platform where you can adopt pets, report strays, and share adoption stories.",
  },
  {
    question: "How do I adopt a pet?",
    answer:
      "Take our pet quiz to get matched with a pet that suits your lifestyle, then fill out the adoption form.",
  },
  {
    question: "Can I report a stray animal?",
    answer:
      "Yes, you can report stray animals through our report section, and nearby shelters will be notified.",
  },
];

export const CTA = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setActiveIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div className="ph-container">
      <div className={styles.faq}>
        <h2 className={`ph-heading--three ${styles.title}`}>FAQs</h2>
        <div className={styles.items}>
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
                  ▼
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
