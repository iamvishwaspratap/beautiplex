import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, Spinner, Button } from 'react-bootstrap';
import EditUserModal from './EditUserModal';
import ChangePasswordModal from './ChangePasswordModal';

const AdminDashboard = () => {
  const [admin, setAdmin] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);

  const email = localStorage.getItem('userEmail'); // Assuming email is stored in local storage after login

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const response = await axios.get(`http://localhost:8082/api/users/me`, { params: { email } });
        setAdmin(response.data);
      } catch (error) {
        console.error('Error fetching admin data:', error);
      }
    };

    fetchAdminData();
  }, [email]);

  if (!admin) {
    return <Spinner animation="border" className="d-block mx-auto mt-4" />;
  }

  return (
    <Container className="mt-4">
      <Row className="align-items-center mb-4">
        <Col md={6}>
          <Card className="shadow-sm p-3">
            <Card.Header className="bg-primary text-white text-center">
              <h5>Admin Details</h5>
            </Card.Header>
            <Card.Body>
              <p><strong>Name:</strong> {admin.name}</p>
              <p><strong>Email:</strong> {admin.email}</p>
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
        user={admin}
        setUser={setAdmin}
      />
      <ChangePasswordModal
        show={showChangePasswordModal}
        handleClose={() => setShowChangePasswordModal(false)}
        email={localStorage.getItem('userEmail')} // Ensure the latest email is used
      />
    </Container>
  );
};

export default AdminDashboard;