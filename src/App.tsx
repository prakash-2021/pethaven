import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Layout from "./layouts/Layout";
import { About } from "./pages/About";
import Home from "./pages/Home";
import { Login } from "./pages/LogIn";
import Pet from "./pages/Pet";
import PetDetails from "./pages/PetDetails";
import { Profile } from "./pages/Profile";
import { SignUp } from "./pages/Signup";
import Stories from "./pages/Stories";
import { StoryDetail } from "./pages/StoryDetail";
import { VerifyEmail } from "./pages/VerifyEmail";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/pets" element={<Pet />} />
          <Route path="/pets/:id" element={<PetDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/story" element={<Stories />} />
          <Route path="/story/:id" element={<StoryDetail />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
