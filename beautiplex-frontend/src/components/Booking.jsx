
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Table, Spinner, Alert } from 'react-bootstrap';

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const userId = localStorage.getItem('userId');
console.log("User ID from localStorage:", userId);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
          const userId = localStorage.getItem("userId"); // Fetch user ID
          console.log("Fetching bookings for user ID:", userId);
  
          const response = await axios.get(`http://localhost:8082/api/bookings/user/${userId}`);
          
          console.log("Fetched bookings:", response.data[0].id);
          setBookings(response.data); // Assuming you have a setBookings state
      } catch (error) {
          console.error("Error fetching bookings:", error);
      }
  };
  

    fetchBookings();
  }, [userId]);

  if (loading) return <Spinner animation="border" className="d-block mx-auto mt-4" />;
  if (error) return <Alert variant="danger">{error}</Alert>;

  return (
    <div>
      <h2>My Bookings</h2>
      {bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <ul>
          {bookings.map((booking) => (
            <li key={booking.id}>
              <strong>Booking ID:</strong> {booking.id} <br />
              <strong>Customer Name:</strong> {booking.customer?.name} <br />
              <strong>Customer Email:</strong> {booking.customer?.email} <br />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}  

export default Bookings;
