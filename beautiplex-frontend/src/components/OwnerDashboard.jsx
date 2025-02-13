import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col, Card, Button, ListGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const OwnerDashboard = () => {
  const [user, setUser] = useState(null);
  const [salons, setSalons] = useState([]);
  const email = localStorage.getItem("userEmail"); // Assuming email is stored in local storage after login
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userResponse = await axios.get(`http://localhost:8082/api/users/me`, {
          params: { email },
        });
        setUser(userResponse.data);
        const salonsResponse = await axios.get(`http://localhost:8082/api/salons/owner/${userResponse.data.id}`);
        setSalons(salonsResponse.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [email]);

  const handleAddSalon = () => {
    navigate("/add-salon", { state: { ownerId: user.id } });
  };

  const handleAddService = (salonId) => {
    // Logic to add services to a salon
  };

  const handleViewBookings = (salonId) => {
    // Logic to view bookings for a salon
  };

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <Container>
      <Row>
        <Col md={4}>
          <Card>
            <Card.Header>Owner Details</Card.Header>
            <ListGroup variant="flush">
              <ListGroup.Item>Name: {user.name}</ListGroup.Item>
              <ListGroup.Item>Email: {user.email}</ListGroup.Item>
              <ListGroup.Item>Role: {user.role}</ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
        <Col md={8}>
          <Card>
            <Card.Header>My Salons</Card.Header>
            <ListGroup variant="flush">
              {salons.length > 0 ? (
                salons.map((salon) => (
                  <ListGroup.Item key={salon.id}>
                    <div>Salon: {salon.name}</div>
                    <div>Address: {salon.address}</div>
                    <Button variant="primary" className="mt-2" onClick={() => handleAddService(salon.id)}>
                      Add Service
                    </Button>
                    <Button variant="secondary" className="mt-2 ms-2" onClick={() => handleViewBookings(salon.id)}>
                      View Bookings
                    </Button>
                  </ListGroup.Item>
                ))
              ) : (
                <ListGroup.Item>No salons found.</ListGroup.Item>
              )}
            </ListGroup>
            <Button variant="success" className="mt-3" onClick={handleAddSalon}>
              Add Salon
            </Button>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default OwnerDashboard;