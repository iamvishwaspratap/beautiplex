import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import WhatWeOffer from "./components/Offer";
import AboutUs from "./components/About";
import Footer from "./components/Footer";
import LoginModal from "./components/Login"; // Import LoginModal
import RegisterModal from "./components/RegisterModal";
import ServiceSection from "./components/Service";
import ContactUs from "./components/Contactus";
import ForgotPassword from "./components/ForgotPassword";
import AddSalon from "./components/AddSalon"; // Import AddSalon
import CustomerDashboard from "./components/CustomerDashboard"; // Import CustomerDashboard
import OwnerDashboard from "./components/OwnerDashboard"; // Import OwnerDashboard
import AdminDashboard from "./components/AdminDashboard"; // Import AdminDashboard
import UserManagement from "./components/UserManagement";
import Appointments from "./components/Appointment";
import AdminService from "./components/Appointment";
import MySalons from "./components/MySalons";
import Booking from "./components/Booking"; // Import Booking


const HomePage = () => {
  return (
    <>
      <HeroSection />
      <WhatWeOffer />
      <AboutUs />
    </>
  );
};

const App = () => {
  const [showLoginModal, setShowLoginModal] = useState(false); // State for modal
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showForgotModal, setShowForgotModal] = useState(false);

  const isLoggedIn = localStorage.getItem("userEmail"); // Check if user is logged in

  return (
    <Router>
      {/* Pass setShowLoginModal to Navbar */}
      <Navbar
        setShowLoginModal={setShowLoginModal}
        setShowRegisterModal={setShowRegisterModal}
      />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/AboutUs" element={<AboutUs />} />
        <Route path="/services" element={<ServiceSection />} />
        <Route path="/contactus" element={<ContactUs />} />
        <Route path="/bookings" element={<CustomerDashboard />} /> {/* Display CustomerDashboard for bookings */}
        <Route path="/add-salon" element={<AddSalon />} /> {/* Add route for AddSalon */}
        <Route path="/customer-dashboard" element={<CustomerDashboard />} /> {/* Add route for CustomerDashboard */}
        <Route path="/owner-dashboard" element={<OwnerDashboard />} /> {/* Add route for OwnerDashboard */}
        <Route path="/admin-dashboard" element={<AdminDashboard />} /> {/* Add route for AdminDashboard */}
        <Route path="/users" element={<UserManagement />} />
        <Route path="/appointments" element={<Appointments />} />
        <Route path="/admin-services" element={<AdminService />} />
        <Route path="/MySalons" element={<MySalons />} />
        <Route path="/booking" element={<Booking/>} />
        
      </Routes>
      <Footer /> {/* Footer at bottom */}
      {/* Login and Register Modals */}
      <LoginModal
        show={showLoginModal}
        handleClose={() => setShowLoginModal(false)}
        showRegister={() => {
          setShowLoginModal(false);
          setShowRegisterModal(true);
        }}
      />
      <RegisterModal
        show={showRegisterModal}
        handleClose={() => setShowRegisterModal(false)}
        showLogin={() => {
          setShowRegisterModal(false);
          setShowLoginModal(true);
        }}
      />
      {/* Forgot Password Modal */}
      <ForgotPassword
        show={showForgotModal}
        handleClose={() => setShowForgotModal(false)}
      />
    </Router>
  );
};

export default App;