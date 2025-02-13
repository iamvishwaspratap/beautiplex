import React from "react";
import "../styles/About.css";
import feature1 from "../assets/feature1.jpeg";
import feature2 from "../assets/feature2.jpg";
import feature3 from "../assets/feature3.jpg";
import feature4 from "../assets/feature4.jpg";
import feature5 from "../assets/feature5.jpeg";
import feature6 from "../assets/feature6.jpeg";

const features = [
  {
    image: feature1,
    title: "Premium Beauty Products ",
    description: "Carefully curated skincare & makeup for a flawless look.",
  },
  {
    image: feature2,
    title: "Expert Beauty Tips ",
    description: "Get pro beauty advice for a radiant glow.",
  },
  {
    image: feature3,
    title: "Personalized Recommendations",
    description: "Personalized beauty services for a flawless experience.",
  },
  {
    image: feature4,
    title: "Trendy & Affordable",
    description: "Stay stylish without breaking the bank..",
  },
  {
    image: feature5,
    title: "Makeup & Styling",
    description: "Get a stunning makeover for every occasion!",
  },
  {
    image: feature6,
    title: "Fast & Secure ",
    description: "Seamless checkout with quick Appointment.",
  },
];

const AboutUs = () => {
  return (
    <section id="about-us" className="about-us-container">
      {/* Background Image with Text Overlay */}
      <div className="about-us-background">
        <div className="about-us-text">
          <h1> About Us</h1>
          <h3>
            BeautiPlex - Creating Your Salon Experience with Elegance and Care
          </h3>
        </div>
      </div>

      {/* White Box Section */}
      <div className="about-us-section">
        <h2 className="about-us-heading">The World of BeautiPlex</h2>

        <div className="about-us-boxes">
          {features.map((feature, index) => (
            <div className="about-us-box" key={index}>
              <img
                src={feature.image}
                alt={feature.title}
                className="feature-image"
              />
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
        <div className="about-us-buttons">
          <button className="btn enquire-now">Enquire Now</button>
          <button className="btn know-more">Know More</button>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
