import React from "react";
import "../styles/Offer.css"; // Ensure you create this file
import spa from "../assets/spa.jpeg";
import nail from "../assets/nail.jpg";
import hair from "../assets/hair.jpeg";
import facial from "../assets/facial.jpeg";
import makeup from "../assets/Bridalmakeup.jpg";
import skincare from "../assets/Skincare.jpeg";


const WhatWeOffer = () => {
    const services = [
        { name: "SPA", img: spa },
        { name: "NAIL", img: nail },
        { name: "HAIR", img: hair },
        { name: "FACIAL", img: facial },
        { name: "BRIDAL MAKEUP", img: makeup },
        { name: "SKINCARE", img: skincare },
      ];
      

  const handleClick = () => {
    const serviceSection = document.getElementById("services-section");
    if (serviceSection) {
      serviceSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="what-we-offer-section container py-5">
      <h2 className="section-title text-center">What We Offer!!</h2>
      <div className="row">
        {services.map((service, index) => (
          <div key={index} className="col-md-4 col-sm-6 mb-4">
            <div className="offer-card" onClick={handleClick}>
              <img src={service.img} alt={service.name} className="offer-image" />
              <div className="offer-overlay">
                <h3>{service.name}</h3>
                <button className="more-btn" onClick={handleClick}>More</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhatWeOffer;
