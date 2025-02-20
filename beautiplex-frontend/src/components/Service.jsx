import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import backgroundImage from "../assets/Parlour.jpg"; // Add your background image

const Service = () => {
  const [location, setLocation] = useState("");
  const [service, setService] = useState("");
  const [salons, setSalons] = useState([]);

  const allSalons = [
    { id: 1, name: "Glow Beauty Salon", location: "Delhi", service: "Haircut" },
    { id: 2, name: "Style Hub", location: "Mumbai", service: "Facial" },
    { id: 3, name: "Elite Spa", location: "Delhi", service: "Massage" },
    { id: 4, name: "Luxury Look", location: "Mumbai", service: "Haircut" },
  ];

  const handleSearch = () => {
    const filteredSalons = allSalons.filter(
      (salon) =>
        (location === "" || salon.location.toLowerCase() === location.toLowerCase()) &&
        (service === "" || salon.service.toLowerCase() === service.toLowerCase())
    );
    setSalons(filteredSalons);
  };

  return (
    <div
      className="service-section text-center text-white"
      style={{
        background: `url(${backgroundImage}) center/cover no-repeat`,
        padding: "100px 0",
        position: "relative",
      }}
    >
      <div className="overlay" style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", backgroundColor: "rgba(0,0,0,0.5)" }}></div>
      <div className="container position-relative">
        <h2 className="fw-bold display-3">Find the Best Salons</h2>
        <div className="row mt-4 justify-content-center">
          <div className="col-md-3">
            <input
              type="text"
              className="form-control"
              placeholder="Select Your City"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
          <div className="col-md-3">
            <select className="form-select" value={service} onChange={(e) => setService(e.target.value)}>
              <option value="">Select Service</option>
              <option value="Haircut">Haircut</option>
              <option value="Facial">Facial</option>
              <option value="Massage">Massage</option>
              <option value="Makeup">Makeup</option>
              <option value="Spa">Spa</option>
              <option value="Nail Art">Nail Art</option>
              <option value="Bridal Makeup">Bridal Makeup</option>
            </select>
          </div>
          <div className="col-md-1">
            <button className="btn btn-primary  "  onClick={handleSearch}>Search</button>
          </div>
        </div>

        {salons.length > 0 ? (
          <div className="mt-5">
            <h3>Salons Near You</h3>
            <ul className="list-group mt-3">
              {salons.map((salon) => (
                <li key={salon.id} className="list-group-item">{salon.name} - {salon.location} ({salon.service})</li>
              ))}
            </ul>
          </div>
        ) : (
          <p className="mt-4">No salons available for selected criteria.</p>
        )}
      </div>
    </div>
  );
};

export default Service;