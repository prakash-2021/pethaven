import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import { Header } from "./Header";

const Layout = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet />{" "}
        {/* This will render the child components (Home, About, etc.) */}
      </main>

      <Footer />
    </>
  );
};

export default Layout;
