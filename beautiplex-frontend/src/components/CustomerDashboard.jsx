import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col, Card, ListGroup } from "react-bootstrap";

const CustomerDashboard = () => {
  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState([]);
  const email = localStorage.getItem("userEmail"); // Assuming email is stored in local storage after login

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userResponse = await axios.get(`http://localhost:8082/api/users/me`, {
          params: { email }
        });
        setUser(userResponse.data);
        const bookingsResponse = await axios.get(`http://localhost:8082/api/bookings/user/${userResponse.data.id}`);
        setBookings(bookingsResponse.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [email]);

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <Container>
      <Row>
        <Col md={4}>
          <Card>
            <Card.Header>User Details</Card.Header>
            <ListGroup variant="flush">
              <ListGroup.Item>Name of user: {user.name}</ListGroup.Item>
              <ListGroup.Item>Email: {user.email}</ListGroup.Item>
              <ListGroup.Item>Role: {user.role}</ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
        <Col md={8}>
          <Card>
            <Card.Header>My Bookings</Card.Header>
            <ListGroup variant="flush">
              {bookings.length > 0 ? (
                bookings.map((booking) => (
                  <ListGroup.Item key={booking.id}>
                    <div>Salon: {booking.salon.name}</div>
                    <div>Address: {booking.salon.address}</div>
                    <div>Booking Time: {new Date(booking.bookingTime).toLocaleString()}</div>
                  </ListGroup.Item>
                ))
              ) : (
                <ListGroup.Item>No bookings found.</ListGroup.Item>
              )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default CustomerDashboard;