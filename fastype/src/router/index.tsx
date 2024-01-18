import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

import ProtectedRoute from "./ProtectedRoute";

// Importations dynamiques
const Home = React.lazy(() => import("../pages/Home"));
const Training = React.lazy(() => import("../pages/Training"));
const About = React.lazy(() => import("../pages/About"));
const Contact = React.lazy(() => import("../pages/Contact"));
const Results = React.lazy(() => import("../pages/Results"));

const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Header />
      <Suspense fallback={<div>Chargement...</div>}>
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
      </Suspense>
      <Footer />
    </BrowserRouter>
  );
};

export default Router;
