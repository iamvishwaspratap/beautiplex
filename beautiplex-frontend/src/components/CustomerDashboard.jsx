import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, Spinner, Button } from 'react-bootstrap';
import EditUserModal from './EditUserModal';
import ChangePasswordModal from './ChangePasswordModal';

const CustomerDashboard = () => {
  const [customer, setCustomer] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);

  const email = localStorage.getItem('userEmail'); // Assuming email is stored in local storage after login

  useEffect(() => {
    const fetchCustomerData = async () => {
      try {
        const response = await axios.get(`http://localhost:8082/api/users/me`, { params: { email } });
        setCustomer(response.data);
      } catch (error) {
        console.error('Error fetching customer data:', error);
      }
    };

    fetchCustomerData();
  }, [email]);

  if (!customer) {
    return <Spinner animation="border" className="d-block mx-auto mt-4" />;
  }

  return (
    <Container className="mt-4">
      <Row className="align-items-center mb-4">
        <Col md={6}>
          <Card className="shadow-sm p-3">
            <Card.Header className="bg-primary text-white text-center">
              <h5>Customer Details</h5>
            </Card.Header>
            <Card.Body>
              <p><strong>Name:</strong> {customer.name}</p>
              <p><strong>Email:</strong> {customer.email}</p>
              <Button variant="warning" onClick={() => setShowEditModal(true)}>
                Edit Details
              </Button>
              <Button variant="secondary" onClick={() => setShowChangePasswordModal(true)} className="ms-2">
                Change Password
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <EditUserModal
        show={showEditModal}
        handleClose={() => setShowEditModal(false)}
        user={customer}
        setUser={setCustomer}
      />
      <ChangePasswordModal
        show={showChangePasswordModal}
        handleClose={() => setShowChangePasswordModal(false)}
        email={email}
      />
    </Container>
  );
};

export default CustomerDashboard;