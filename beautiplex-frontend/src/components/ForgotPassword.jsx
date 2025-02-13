import React, { useState } from "react";
import { Modal, Button, Form, Alert } from "react-bootstrap";
import axios from "axios";

const ForgotPassword = ({ show, handleClose, showLogin }) => {
  const [formData, setFormData] = useState({
    email: "",
    newPassword: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:8082/api/users/change-password?email=${formData.email}`,
        { newPassword: formData.newPassword }
      );
      setMessage("Password changed successfully.");
      setError("");
      setTimeout(() => {
        handleClose();
        showLogin(); // Show login modal after password reset
      }, 2000);
    } catch (error) {
      setError("Invalid details. Please try again.");
      setMessage("");
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title className="w-100 text-center">Reset Password</Modal.Title>
      </Modal.Header>
      <Modal.Body className="p-4">
        {message && <Alert variant="success">{message}</Alert>}
        {error && <Alert variant="danger">{error}</Alert>}

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter registered email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>New Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter new password"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Button variant="primary" className="w-100" type="submit">
            Reset Password
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ForgotPassword;