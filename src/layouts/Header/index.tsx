import { Button } from "../../components";
import styles from "./index.module.scss";

export const Header = () => {
  return (
    <header>
      <div className="ph-container">
        <div className={styles.header}>
          <nav className="flex items-center justify-between w-full">
            <div className="flex items-center gap-14">
              <a className="ph-text-large" href="/">
                Home
              </a>
              <a className="ph-text-large" href="/pets">
                Get pet
              </a>
            </div>

            <img src="/Logo.svg" alt="logo" />

            <div className="flex items-center gap-14">
              <a className="ph-text-large">Log in</a>
              <a className="ph-text-large">
                <Button label="Adopt" />
              </a>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};
