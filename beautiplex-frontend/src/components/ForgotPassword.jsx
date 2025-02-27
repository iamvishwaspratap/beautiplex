import React, { useState } from "react";
import { Modal, Button, Form, Alert } from "react-bootstrap";
import axios from "axios";

const ForgotPassword = ({ show, handleClose, showLogin }) => {
  const [formData, setFormData] = useState({
    email: "",
    token: "", // New field for reset token
    newPassword: "",
  });

  const [step, setStep] = useState(1); // Step 1: Request Reset, Step 2: Enter Token & Password
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Step 1: Request Password Reset (Forgot Password API)
  const handleRequestReset = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:8082/api/users/forgot-password?email=${formData.email}`);
      setMessage("Password reset link sent to your email.");
      setError("");
      setStep(2); // Move to the next step
    } catch (error) {
      setError(error.response?.data || "Error sending reset email.");
      setMessage("");
    }
  };

  // Step 2: Reset Password using Token
  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      await axios.put("http://localhost:8082/api/users/reset-password", {
        token: formData.token, // Token from email
        newPassword: formData.newPassword,
      });

      setMessage("Password reset successfully. Please log in with your new password.");
      setError("");

      setTimeout(() => {
        handleClose();
        showLogin();
      }, 2000);
    } catch (error) {
      setError(error.response?.data || "Invalid token or password.");
      setMessage("");
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title className="w-100 text-center">
          {step === 1 ? "Forgot Password" : "Reset Password"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="p-4">
        {message && <Alert variant="success">{message}</Alert>}
        {error && <Alert variant="danger">{error}</Alert>}

        {step === 1 ? (
          // Step 1: Request Reset Link
          <Form onSubmit={handleRequestReset}>
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
            <Button variant="primary" className="w-100" type="submit">
              Send Reset Link
            </Button>
          </Form>
        ) : (
          // Step 2: Enter Token & New Password
          <Form onSubmit={handleResetPassword}>
            <Form.Group className="mb-3">
              <Form.Label>Reset Token</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter reset token from email"
                name="token"
                value={formData.token}
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
        )}
      </Modal.Body>
    </Modal>
  );
};

export default ForgotPassword;
