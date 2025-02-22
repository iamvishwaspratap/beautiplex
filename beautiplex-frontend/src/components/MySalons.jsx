import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col, Card, Spinner, Alert } from "react-bootstrap";

const MySalons = () => {
  const [salons, setSalons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [ownerId, setOwnerId] = useState(localStorage.getItem("ownerId"));
  const [selectedSalonId, setSelectedSalonId] = useState(null);
  const [services, setServices] = useState([]);
  const [servicesLoading, setServicesLoading] = useState(false);

  // Fetch salons for the owner
  useEffect(() => {
    if (!ownerId) return;

    axios
      .get("http://localhost:8082/api/salons/owner", { params: { id: ownerId } })
      .then((response) => {
        console.log("Salons API Response:", response.data);
        if (Array.isArray(response.data) && response.data.length > 0) {
          setSalons(response.data);
          setSelectedSalonId(response.data[0].id); // Auto-select first salon
        } else {
          setSalons([]);
          setSelectedSalonId(null);
        }
      })
      .catch((error) => {
        console.error("Error fetching salons:", error);
        setSalons([]);
        setError("Failed to load salons.");
      })
      .finally(() => setLoading(false));
  }, [ownerId]);

  // Fetch services for the selected salon
  useEffect(() => {
    if (!selectedSalonId) {
      setServices([]);
      return;
    }

    setServicesLoading(true);

    axios
      .get(`http://localhost:8082/api/services/salon/${selectedSalonId}`)
      .then((response) => {
        console.log("Services API Response:", response.data);
        setServices(response.data);
      })
      .catch((error) => {
        console.error("Error fetching services:", error);
        setServices([]);
      })
      .finally(() => setServicesLoading(false));
  }, [selectedSalonId]);

  return (
    <Container className="mt-4">
      <h2 className="text-center">My Salons</h2>
      {loading && (
        <div className="text-center">
          <Spinner animation="border" />
        </div>
      )}
      {error && <Alert variant="danger">{error}</Alert>}
      <Row>
        {salons.length > 0 ? (
          salons.map((salon) => (
            <Col md={4} key={salon.id} className="mb-4">
              <Card
                className="shadow-sm"
                onClick={() => setSelectedSalonId(salon.id)} // Update selected salon
                style={{
                  cursor: "pointer",
                  border: selectedSalonId === salon.id ? "2px solid blue" : "",
                }}
              >
                <Card.Header className="text-center bg-primary text-white">
                  {salon.name}
                </Card.Header>
                <Card.Body>
                  <p>
                    <strong>Location:</strong> {salon.location}
                  </p>
                  <p>
                    <strong>Services:</strong>
                  </p>
                  {servicesLoading ? (
                    <Spinner animation="border" size="sm" />
                  ) : selectedSalonId === salon.id && services.length > 0 ? (
                    <ul>
                      {services.map((service) => (
                        <li key={service.id}>
                          {service.name} - ₹{service.price}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p>No services available</p>
                  )}
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          !loading && <p className="text-center">No salons found.</p>
        )}
      </Row>
    </Container>
  );
};

export default MySalons;
