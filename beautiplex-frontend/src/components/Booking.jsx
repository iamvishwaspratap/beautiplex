import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Table, Spinner, Alert } from 'react-bootstrap';

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const userId = localStorage.getItem('userId'); // Fetch user ID from localStorage
        console.log("Fetching bookings for user ID:", userId);

        const response = await axios.get(`http://localhost:8082/api/bookings/user/${userId}`);
        console.log("Fetched bookings:", response.data);

        setBookings(response.data);
      } catch (error) {
        console.error("Error fetching bookings:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  if (loading) return <Spinner animation="border" className="d-block mx-auto mt-4" />;
  if (error) return <Alert variant="danger">{error}</Alert>;

  return (
    <Container>
      <h2>My Bookings</h2>
      {bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Booking ID</th>
              <th>Salon Name</th>
              <th>Salon Location</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking.id}>
                <td>{booking.id}</td>
                <td>{booking.salon?.name}</td>
                <td>{booking.salon?.location}</td>
                <td>{booking.status}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default Bookings;