import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Results from "../pages/Results";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/results" element={<Results />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default Router;
