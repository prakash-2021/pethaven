import { Outlet } from "react-router-dom";
import { ChatUI } from "../components/ChatUI";
import Footer from "./Footer";
import { Header } from "./Header";

const Layout = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>

      <ChatUI />

      <Footer />
    </>
  );
};

export default Layout;
