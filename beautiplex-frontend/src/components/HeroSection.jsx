import React, { useEffect, useState } from "react";
import "../styles/HeroSection.css";
import Slider from "./Slider";

const HeroSection = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Automatically detect system dark mode
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    setDarkMode(prefersDark);

    // Listen for changes in system preference
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e) => setDarkMode(e.matches);
    mediaQuery.addEventListener("change", handleChange);

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return (
    <section
      className={`container-fluid hero-section py-5 ${
        darkMode ? "dark-mode" : ""
      }`}
    >
      <div className="container">
        <div className="row align-items-center">
          {/* Left Side Content */}
          <div className="col-md-6 text-center text-md-start">
            <h3>In Just 30 Seconds</h3>
            <h1 className="fw-bold">
              See <span className="dark-pink">100s of Nearby Salons</span>
            </h1>
            <p
              className={`salon-text ${darkMode ? "text-light" : "text-muted"}`}
            >
              Find your perfect salon match, near you.
            </p>

            {/* Buttons */}
            <div className="d-flex flex-column flex-md-row gap-3 mt-3">
              <button className="btn btn-primary btn-lg">
                Book Appointment
              </button>
              <button
                className={`btn btn-lg salon-locator-btn ${
                  darkMode ? "dark-btn" : ""
                }`}
              >
                Salon Locator
              </button>
            </div>
          </div>

          {/* Right Side Slider */}
          <div className="col-md-6 text-center mt-4 mt-md-0">
            <Slider />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
