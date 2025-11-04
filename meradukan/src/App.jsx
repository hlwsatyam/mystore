import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { notification } from "antd";
import FeaturesPage from "./pages/Features";
import PricingPage from "./pages/PricingPage";
import TestimonialsPage from "./pages/TestimonialsPage";
import ContactPage from "./pages/ContactPage";
import AboutPage from "./pages/AboutPage";
import AdminPanel from "./pages/AdminPanel";
import StorePage from "./pages/StorePage";
import CartPage from "./pages/CartPage";

const App = () => {
  const [api, contextHolder] = notification.useNotification();

  return (
    <>
      {contextHolder}
      <Routes>
        <Route path="/" element={<Home />} />
      
        <Route path="/features" element={<FeaturesPage />} />
       <Route path="/pricing" element={<PricingPage />} />
       <Route path="/testimonials" element={<TestimonialsPage />} />
       <Route path="/about" element={<AboutPage />} />
       <Route path="/contact" element={<ContactPage />} />

<Route path="/admin" element={<AdminPanel />} />
        <Route path="/login" element={<Login notify={api} />} />
        <Route path="/signup" element={<Signup notify={api} />} />

  <Route path="/cart" element={<CartPage />} />

  <Route path="/:storeName" element={<StorePage />} />




        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
};

export default App;
