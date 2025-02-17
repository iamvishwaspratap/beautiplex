import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Container, Row, Col, ListGroup, Button, Spinner } from "react-bootstrap";

const Bookings = ({ userId }) => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get(`http://localhost:8082/api/bookings/user/${userId}`);
        setBookings(response.data);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchBookings();
    }
  }, [userId]);

  const cancelBooking = async (bookingId) => {
    try {
      await axios.delete(`http://localhost:8082/api/bookings/${bookingId}`);
      setBookings(bookings.filter((booking) => booking.id !== bookingId));
    } catch (error) {
      console.error("Error cancelling booking:", error);
    }
  };

  if (loading) {
    return <Spinner animation="border" className="d-block mx-auto mt-4" />;
  }

  return (
    <Card className="shadow-sm p-3">
      <Card.Header className="bg-success text-white text-center">
        <h5>My Bookings</h5>
      </Card.Header>
      <Card.Body>
        <ListGroup variant="flush">
          {bookings.length > 0 ? (
            bookings.map((booking) => (
              <ListGroup.Item key={booking.id} className="p-3 shadow-sm rounded mb-2">
                <Card>
                  <Card.Body>
                    <h5 className="text-success">{booking.salon.name}</h5>
                    <p>{booking.salon.address}</p>
                    <p><strong>Time:</strong> {new Date(booking.bookingTime).toLocaleString()}</p>
                    <p><strong>Status:</strong> {booking.status}</p>
                    <Button variant="danger" size="sm" onClick={() => cancelBooking(booking.id)}>
                      Cancel Booking
                    </Button>
                  </Card.Body>
                </Card>
              </ListGroup.Item>
            ))
          ) : (
            <p className="text-center text-muted">No bookings found.</p>
          )}
        </ListGroup>
      </Card.Body>
    </Card>
  );
};

export default Bookings;