import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col, Card, Spinner, Alert } from "react-bootstrap";

const MySalons = () => {
  const [salons, setSalons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [ownerEmail, setOwnerEmail] = useState(null);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const response = await axios.get("http://localhost:8082/api/user/me");
        setOwnerEmail(response.data.email);
      } catch (error) {
        console.error("Error fetching current user:", error);
        setError("Failed to load user data. Please try again.");
      }
    };
    
    fetchCurrentUser();
  }, []);

  useEffect(() => {
    const fetchSalons = async () => {
      try {
        const response = await axios.get("http://localhost:8082/api/salons", {
          params: { email: ownerEmail },
        });
        console.log(response);
        setSalons(response.data);
      } catch (error) {
        console.error("Error fetching salons:", error);
        setError("Failed to load salons. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    if (ownerEmail) {
      fetchSalons();
    }
  }, [ownerEmail]);

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
                  <p>
                    <strong>Location:</strong> {salon.location}
                  </p>
                  <p>
                    <strong>Services:</strong>
                  </p>
                  <ul>
                    {salon.services && salon.services.length > 0 ? (
                      salon.services.map((service, index) => (
                        <li key={index}>
                          {service.name} - ₹{service.price}
                        </li>
                      ))
                    ) : (
                      <p>No services available</p>
                    )}
                  </ul>
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