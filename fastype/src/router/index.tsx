import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Home from "../pages/Home";
import Training from "../pages/Training";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Results from "../pages/Results";

import ProtectedRoute from "./ProtectedRoute";

const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/training"
          element={<ProtectedRoute component={Training} />}
        />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route
          path="/results"
          element={<ProtectedRoute component={Results} />}
        />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default Router;
