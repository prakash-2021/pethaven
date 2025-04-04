import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Layout from "./layouts/Layout";
import About from "./pages/About";
import Home from "./pages/Home";
import Pet from "./pages/Pet";
import PetDetails from "./pages/PetDetails";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/pets" element={<Pet />} />
          <Route path="/pets/:id" element={<PetDetails />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
