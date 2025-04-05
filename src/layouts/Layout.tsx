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

      <img src="/cute-dog.gif" alt="" className="fixed right-4 w-40 bottom-7" />

      <Footer />
    </>
  );
};

export default Layout;
