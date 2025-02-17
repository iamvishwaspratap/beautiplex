import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col, Card, Spinner,ListGroup } from "react-bootstrap";
import Bookings from"./Booking";
const CustomerDashboard = () => {
  const [user, setUser] = useState(null);
  const email = localStorage.getItem("userEmail"); // Assuming email is stored in local storage after login

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userResponse = await axios.get(`http://localhost:8082/api/users/me`, {
          params: { email }
        });
        setUser(userResponse.data);
        
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [email]);

  if (!user) {
    return <Spinner animation="border" className="d-block mx-auto mt-4" />;
  }

  return (
    <Container className="mt-4 ">
      {/* First Half - Image & Heading Section */}
      <Row className="align-items-center mb-4 bg-transparent" style={{ height: "300px" }}>
        <Col md={6} className="text-center bg-transparent">
          <img
            src="/src/assets/Parlour.jpg"
            alt="Dashboard"
            className="img-fluid rounded shadow"
            style={{ maxHeight: "250px", width: "100%", objectFit: "cover" , backgroundColor:"transparent",   }}
          />
        </Col>
        <Col md={6} className="text-center">
          <h1 className="fw-bold " style={{color:"#d63384"}}>Hii {user.name} !!</h1>
        </Col>
      </Row>

      {/* Second Half - User Details & My Bookings */}
      <Row>
        {/* User Details Section */}
        <Col md={6}>
          <Card className="shadow-sm p-3">
            <Card.Header className="bg-primary text-white text-center">
              <h5>User Details</h5>
            </Card.Header>
            <Card.Body>
              <p><strong>Name:</strong> {user.name}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Role:</strong> {user.role}</p>
            </Card.Body>
          </Card>
        </Col>

        {/* My Bookings Section */}
        <Col md={6}>
          <Bookings userId={user.id} /> {/* Make sure this is not duplicated */}
        </Col>
      </Row>
    </Container>
  );
};


export default CustomerDashboard;