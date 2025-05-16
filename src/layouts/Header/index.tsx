import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi"; // Install react-icons if not already
import { Link } from "react-router-dom";
import { Button } from "../../components";
import { useGetProfile } from "../../pages/Signup/queries";
import { useLocalStorageState } from "../../utils/use-localstorage";
import styles from "./index.module.scss";

export const Header = () => {
  const token = useLocalStorageState("token");
  const { data } = useGetProfile(token || "");

  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  return (
    <header>
      <div className="ph-container">
        <div className={styles.header}>
          <nav className={styles.nav}>
            {menuOpen && (
              <div
                className={`${styles.menuOverlay} ${
                  menuOpen ? styles.open : ""
                }`}
                onClick={toggleMenu}
              />
            )}

            {/* Logo */}
            <Link to={"/"}>
              <img src="/Logo.svg" alt="logo" className={styles.logo} />
            </Link>

            {/* Desktop Nav */}
            <div className={`${styles.links} ${menuOpen ? styles.open : ""}`}>
              <Link
                className="ph-text-large"
                to="/about"
                onClick={() => setMenuOpen(false)}
              >
                About
              </Link>
              <Link
                className="ph-text-large"
                to="/pets"
                onClick={() => setMenuOpen(false)}
              >
                Get pet
              </Link>
              <Link
                className="ph-text-large"
                to="/story"
                onClick={() => setMenuOpen(false)}
              >
                Story
              </Link>
              {data ? (
                <Link
                  className="ph-text-large"
                  to="/profile"
                  onClick={() => setMenuOpen(false)}
                >
                  Profile
                </Link>
              ) : (
                <Link
                  className="ph-text-large"
                  to="/login"
                  onClick={() => setMenuOpen(false)}
                >
                  Log in
                </Link>
              )}
              <Link
                className="ph-text-large"
                to=""
                onClick={() => setMenuOpen(false)}
              >
                <Button label="Adopt" />
              </Link>
            </div>

            {/* Hamburger Button */}
            <button className={styles.hamburger} onClick={toggleMenu}>
              {menuOpen ? <FiX size={28} /> : <FiMenu size={28} />}
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};
