
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, Spinner, Button, Form } from 'react-bootstrap';
import EditUserModal from './EditUserModal';
import ChangePasswordModal from './ChangePasswordModal';

const CustomerDashboard = () => {
  const [customer, setCustomer] = useState(null);
  const [salons, setSalons] = useState([]);
  const [selectedSalon, setSelectedSalon] = useState('');
  const [services, setServices] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);

  const email = localStorage.getItem('userEmail');
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchCustomerData = async () => {
      try {
        const response = await axios.get(`http://localhost:8082/api/users/me`, { params: { id: userId } });
        setCustomer(response.data);
      } catch (error) {
        console.error('Error fetching customer data:', error);
      }
    };

    const fetchSalons = async () => {
      try {
        const response = await axios.get(`http://localhost:8082/api/salons`);
        setSalons(response.data);
      } catch (error) {
        console.error('Error fetching salons:', error);
      }
    };

    fetchCustomerData();
    fetchSalons();
  }, [userId]);

  const handleSalonChange = async (salonId) => {
    setSelectedSalon(salonId);
    try {
      const response = await axios.get(`http://localhost:8082/api/services/salon/${salonId}`);
      setServices(response.data);
    } catch (error) {
      console.error('Error fetching services:', error);
    }
  };

  const handleServiceSelection = (serviceId) => {
    setSelectedServices((prev) =>
      prev.includes(serviceId) ? prev.filter((id) => id !== serviceId) : [...prev, serviceId]
    );
  };

  const handleBooking = async () => {
    if (!selectedSalon || selectedServices.length === 0) {
      alert("Please select a salon and at least one service.");
      return;
    }

    try {
      await axios.post(`http://localhost:8082/api/bookings/create`, {
        customerId: userId,
        salonId: selectedSalon,
        serviceIds: selectedServices,
      });

      alert("Booking created successfully!");
    } catch (error) {
      console.error('Error creating booking:', error);
      alert("Failed to create booking. Please try again.");
    }
  };

  if (!customer) {
    return <Spinner animation="border" className="d-block mx-auto mt-4" />;
  }

  return (
    <Container className="mt-4">
      <Row>
        <Col md={6}>
          <Card>
            <Card.Header className="bg-primary text-white text-center">
              <h5>Customer Details</h5>
            </Card.Header>
            <Card.Body>
              <p><strong>Name:</strong> {customer.name}</p>
              <p><strong>Email:</strong> {customer.email}</p>
              <Button variant="warning" onClick={() => setShowEditModal(true)}>Edit Details</Button>
              <Button variant="secondary" onClick={() => setShowChangePasswordModal(true)} className="ms-2">
                Change Password
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mt-4">
        <Col md={6}>
          <Card>
            <Card.Header className="bg-success text-white text-center">
              <h5>Book a Salon Service</h5>
            </Card.Header>
            <Card.Body>
              <Form.Group className="mb-3">
                <Form.Label>Select Salon</Form.Label>
                <Form.Select onChange={(e) => handleSalonChange(e.target.value)} value={selectedSalon}>
                  <option value="">Choose a salon</option>
                  {salons.map((salon) => (
                    <option key={salon.id} value={salon.id}>{salon.name} - {salon.location}</option>
                  ))}
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Select Services</Form.Label>
                {services.map((service) => (
                  <Form.Check
                    key={service.id}
                    type="checkbox"
                    label={`${service.name} - ₹${service.price}`}
                    onChange={() => handleServiceSelection(service.id)}
                    checked={selectedServices.includes(service.id)}
                  />
                ))}
              </Form.Group>

              <Button variant="primary" onClick={handleBooking}>Add Booking</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <EditUserModal show={showEditModal} handleClose={() => setShowEditModal(false)} user={customer} setUser={setCustomer} />
      <ChangePasswordModal show={showChangePasswordModal} handleClose={() => setShowChangePasswordModal(false)} email={localStorage.getItem('userEmail')} />
    </Container>
  );
};

export default CustomerDashboard;
