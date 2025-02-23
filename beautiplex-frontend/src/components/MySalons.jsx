import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col, Card, Spinner, Alert } from "react-bootstrap";

const MySalons = () => {
  const [salons, setSalons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [ownerId, setOwnerId] = useState(null);

  useEffect(() => {
    const id = localStorage.getItem("ownerId");
    console.log("Owner ID:", id);
    if (id) {
      setOwnerId(id);
    } else {
      setError("Owner ID not found. Please log in again.");
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const response = await axios.get("http://localhost:8082/api/users/me", {
          params: { id: ownerId },
        });
        console.log("Current user:", response.data.id);
        setOwnerId(response.data.id);
      } catch (error) {
        console.error("Error fetching current user:", error);
        setError("Failed to load user data. Please try again.");
      }
    };

    if (ownerId) {
      fetchCurrentUser();
    }
  }, [ownerId]);

  useEffect(() => {
    const fetchSalons = async () => {
      if (!ownerId) return;
      
      try {
        const response = await axios.get("http://localhost:8082/api/salons/owner", {
          params: { id: ownerId },
        });
        console.log("Salons Data:", response.data);

        const salonsWithServices = await Promise.all(
          response.data.map(async (salon) => {
            try {
              const servicesResponse = await axios.get(
                `http://localhost:8082/api/services/salon/${salon.id}`
              );
              console.log(`Services for Salon ${salon.id}:`, servicesResponse.data);
              return { ...salon, services: Array.isArray(servicesResponse.data) ? servicesResponse.data : [] };
            } catch (error) {
              console.error(`Error fetching services for salon ${salon.id}:`, error);
              return { ...salon, services: [] };
            }
          })
        );

        setSalons(salonsWithServices);
      } catch (error) {
        console.error("Error fetching salons:", error);
        setError("Failed to load salons. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchSalons();
  }, [ownerId]);

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
              <Card className="shadow-sm">
                <Card.Header className="text-center bg-primary text-white">
                  {salon.name}
                </Card.Header>
                <Card.Body>
                  <p><strong>Location:</strong> {salon.location}</p>
                  <p><strong>Services:</strong></p>
                  {Array.isArray(salon.services) && salon.services.length > 0 ? (
                    <ul>
                      {salon.services.map((service) => (
                        <li key={service.id}>{service.name} - ₹{service.price}</li>
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