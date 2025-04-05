import { Link } from "react-router-dom";
import { Button } from "../../components";
import styles from "./index.module.scss";

export const Header = () => {
  return (
    <header>
      <div className="ph-container">
        <div className={styles.header}>
          <nav className="flex items-center justify-between w-full">
            <div className="flex items-center gap-14">
              <Link className="ph-text-large" to="/">
                Home
              </Link>
              <Link className="ph-text-large" to="/pets">
                Get pet
              </Link>
            </div>

            <img src="/Logo.svg" alt="logo" />

            <div className="flex items-center gap-14">
              <Link className="ph-text-large" to="/login">
                Log in
              </Link>
              <Link className="ph-text-large" to={""}>
                <Button label="Adopt" />
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};
