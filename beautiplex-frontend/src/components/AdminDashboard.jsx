import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, Table, Spinner, Button } from 'react-bootstrap';
import EditUserModal from './EditUserModal';
import ChangePasswordModal from './ChangePasswordModal';

const AdminDashboard = () => {
  const [admin, setAdmin] = useState(null);
  const [users, setUsers] = useState([]); 
  const [salons, setSalons] = useState([]); // State for salons
  const [loading, setLoading] = useState(true);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);

  const id = Number(localStorage.getItem('userId'));
  const userId = Number(localStorage.getItem('userId'));

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const response = await axios.get(`http://localhost:8082/api/users/me`, { params: { id } });
        setAdmin(response.data);
      } catch (error) {
        console.error('Error fetching admin data:', error);
      }
    };

    const fetchUsers = async () => {
      try {
        const response = await axios.get(`http://localhost:8082/api/users/all`);
        // Filter out the current admin
        const filteredUsers = response.data.filter(user => user.id !== id);
        setUsers(filteredUsers);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    

    const fetchSalons = async () => {
      try {
        const response = await axios.get(`http://localhost:8082/api/salons`);
        setSalons(response.data);
      } catch (error) {
        console.error('Error fetching salons:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAdminData();
    fetchUsers();
    fetchSalons();
  }, [id]);

  // Function to delete a user
  const deleteUser = async (userId) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;

    try {
      await axios.delete(`http://localhost:8082/api/users/${userId}`);
      setUsers(users.filter(user => user.id !== userId)); // Remove user from state
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  // Function to delete a salon (Admin & Owner can delete)
  const deleteSalon = async (salonId) => {
    if (!window.confirm('Are you sure you want to delete this salon?')) return;

    try {
      await axios.delete(`http://localhost:8082/api/salons/delete/${salonId}`,{params: { userId }});
      setSalons(salons.filter(salon => salon.id !== salonId)); // Remove salon from state
    } catch (error) {
      console.error('Error deleting salon:', error);
    }
  };

  if (!admin || loading) {
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
              <Button variant="warning" onClick={() => setShowEditModal(true)}>Edit Details</Button>
              <Button variant="secondary" onClick={() => setShowChangePasswordModal(true)} className="ms-2">
                Change Password
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Users Table */}
      <Row>
        <Col>
          <Card className="shadow-sm p-3">
            <Card.Header className="bg-success text-white text-center">
              <h5>Registered Users</h5>
            </Card.Header>
            <Card.Body>
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.length > 0 ? (
                    users.map(user => (
                      <tr key={user.id}>
                        <td>{user.id}</td>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.role}</td>
                        <td>
                          <Button variant="danger" size="sm" onClick={() => deleteUser(user.id)}>
                            Delete
                          </Button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="text-center">No users found.</td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Salons Table */}
      <Row className="mt-4">
        <Col>
          <Card className="shadow-sm p-3">
            <Card.Header className="bg-info text-white text-center">
              <h5>Registered Salons</h5>
            </Card.Header>
            <Card.Body>
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Location</th>
                    <th>Owner</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {salons.length > 0 ? (
                    salons.map(salon => (
                      <tr key={salon.id}>
                        <td>{salon.id}</td>
                        <td>{salon.name}</td>
                        <td>{salon.location}</td>
                        <td>{salon.owner?.name || "N/A"}</td>
                        <td>
                          <Button variant="danger" size="sm" onClick={() => deleteSalon(salon.id)}>
                            Delete
                          </Button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="text-center">No salons found.</td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <EditUserModal show={showEditModal} handleClose={() => setShowEditModal(false)} user={admin} setUser={setAdmin} />
      <ChangePasswordModal show={showChangePasswordModal} handleClose={() => setShowChangePasswordModal(false)} email={localStorage.getItem('userEmail')} />
    </Container>
  );
};

export default AdminDashboard;
