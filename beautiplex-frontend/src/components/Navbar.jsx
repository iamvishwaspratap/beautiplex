import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../assets/logo.png";
import { Dropdown } from "react-bootstrap";

const Navbar = ({ setShowLoginModal, setShowRegisterModal }) => {
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("userEmail"); // Check if user is logged in
  const userName = localStorage.getItem("userName"); // Assuming user name is stored in local storage after login
  const userRole = localStorage.getItem("userRole"); // Assuming user role is stored in local storage after login
  const userInitials = userName ? userName.split(' ').map(name => name[0]).join('') : '';

  // toggle function
  const toggleMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle("dark-mode");
  };

  // Scroll to About Us section on the homepage
  const scrollToAbout = (event) => {
    event.preventDefault(); // Prevent default page reload
    const aboutSection = document.getElementById("about-us");
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("userEmail"); // Remove user email from local storage
    localStorage.removeItem("userName"); // Remove user name from local storage
    localStorage.removeItem("userRole"); // Remove user role from local storage
    navigate("/"); // Redirect to home page
  };

  return (
    <nav
      className={`navbar navbar-expand-lg ${darkMode ? "navbar-dark bg-dark" : "navbar-light"}`}
      style={{ backgroundColor: darkMode ? "#333" : "#FFC0CB" }}
    >
      <div className="container">
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <img src={logo} alt="Logo" width="40" height="40" className="me-2" />
          <span>BeautiPlex</span>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <a href="#about-us" className="nav-link" onClick={scrollToAbout}>
                About Us
              </a>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/services">
                Services
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/contactus">
                ContactUs
              </Link>
            </li>
            {isLoggedIn ? (
              <Dropdown align="end">
                <Dropdown.Toggle variant="secondary" id="dropdown-basic" className="profile-dropdown">
                  {userInitials}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  {userRole === "customer" && (
                    <Dropdown.Item onClick={() => navigate("/customer-dashboard")}>Customer Dashboard</Dropdown.Item>
                  )}
                  {userRole === "customer" && (
                    <Dropdown.Item onClick={() => navigate("/booking")}>My Bookings</Dropdown.Item>//booking page
                  )}
                  {userRole === "shop_owner" && (
                    <Dropdown.Item onClick={() => navigate("/owner-dashboard")}>Owner Dashboard</Dropdown.Item>
                  )}

{userRole === "shop_owner" && (
                    <Dropdown.Item onClick={() => navigate("/MySalons")}>My Salons</Dropdown.Item>
                  )}

                  
                  <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                  <Dropdown.Item>
                    <button className="btn btn-outline-dark w-100" onClick={toggleMode}>
                      {darkMode ? "Light Mode ☀️" : "Dark Mode 🌙"}
                    </button>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              <>
                <li className="nav-item">
                  <span
                    className="nav-link"
                    style={{ cursor: "pointer" }}
                    onClick={() => setShowRegisterModal(true)}
                  >
                    Register
                  </span>
                </li>
                <li className="nav-item">
                  <span
                    className="nav-link"
                    style={{ cursor: "pointer" }}
                    onClick={() => setShowLoginModal(true)}
                  >
                    Login
                  </span>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;