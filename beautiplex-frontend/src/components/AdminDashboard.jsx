import React from "react";
import {  Link, useNavigate } from "react-router-dom";
import {
 
  Card,
  Button,
  Row,
  Col,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import '../styles/Dashboard.css';

const AdminDashboard = () => {
  const navigate = useNavigate(); // Use useNavigate hook for programmatic navigation

  // Handler functions for button clicks to navigate
  const handleUserManagement = () => navigate("/users");
  const handleAppointments = () => navigate("/appointments");
  const handleServices = () => navigate("/admin-services");
  const handlePayments = () => navigate("/payments");

  return (
    <>
      <div className="dashboard-container">
        {/* Sidebar */}
        <div className="sidebar">
          <h5>Menu</h5>
          <ul>
            <li>
              <Link className="nav-link" to="/users">
                User Management
              </Link>
            </li>
            <li>
              <Link className="nav-link" to="/appointments">
                Appointments
              </Link>
            </li>
            <li>
              <Link className="nav-link" to="/admin-services">
                Services
              </Link>
            </li>
            <li>
              <Link className="nav-link" to="/payments">
                Payments
              </Link>
            </li>
          </ul>
        </div>

        {/* Main Content */}
        <div className="main-content">
          <h2>Welcome Admin</h2> {/* Display Welcome Admin heading */}

          <Row>
            <Col md={6} lg={3}>
              <Card className="stat-card">
                <Card.Body>
                  <Card.Title>Users</Card.Title>
                  <Card.Text>1000+</Card.Text>
                  <Button variant="primary" onClick={handleUserManagement}>
                    Manage
                  </Button>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6} lg={3}>
              <Card className="stat-card">
                <Card.Body>
                  <Card.Title>Appointments</Card.Title>
                  <Card.Text>500+</Card.Text>
                  <Button variant="success" onClick={handleAppointments}>
                    View
                  </Button>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6} lg={3}>
              <Card className="stat-card">
                <Card.Body>
                  <Card.Title>Services</Card.Title>
                  <Card.Text>20+</Card.Text>
                  <Button variant="warning" onClick={handleServices}>
                    Edit
                  </Button>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6} lg={3}>
              <Card className="stat-card">
                <Card.Body>
                  <Card.Title>Payments</Card.Title>
                  <Card.Text>$50K+</Card.Text>
                  <Button variant="danger" onClick={handlePayments}>
                    Transactions
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;