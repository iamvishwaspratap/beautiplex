import React, { useState } from "react";
import { Modal, Button, Form, Alert } from "react-bootstrap";
import { FaUser, FaLock, FaEnvelope } from "react-icons/fa";
import axios from "axios";

const RegisterModal = ({ show, handleClose, showLogin }) => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    role: "customer", // Default role
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8082/api/users/register", user)
      .then(() => {
        alert("User registered successfully");
        handleClose(); // Close the modal after successful registration
      })
      .catch((error) => {
        setError("Registration failed. Please try again.");
        console.error("Error registering user:", error);
      });
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Body className="p-4">
        <h4 className="text-center mb-4">Create Account</h4>

        {error && <p className="text-danger text-center">{error}</p>}

        <form onSubmit={handleSubmit}>
          {/* Username Input */}
          <div className="input-group mb-3">
            <span className="input-group-text">
              <FaUser />
            </span>
            <input
              type="text"
              name="name"
              className="form-control"
              placeholder="Username"
              value={user.name}
              onChange={handleChange}
              required
            />
          </div>

          {/* Email Input */}
          <div className="input-group mb-3">
            <span className="input-group-text">
              <FaEnvelope />
            </span>
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="Email"
              value={user.email}
              onChange={handleChange}
              required
            />
          </div>

          {/* Password Input */}
          <div className="input-group mb-3">
            <span className="input-group-text">
              <FaLock />
            </span>
            <input
              type="password"
              name="password"
              className="form-control"
              placeholder="Password"
              value={user.password}
              onChange={handleChange}
              required
            />
          </div>

          {/* Role Selection */}
          <div className="input-group mb-3">
            <Form.Select
              name="role"
              value={user.role}
              onChange={handleChange}
              required
            >
              <option value="customer">Customer</option>
              <option value="shop_owner">Shop Owner</option>
            </Form.Select>
          </div>

          {/* Register Button */}
          <Button variant="success" className="w-100" type="submit">
            Register
          </Button>
        </form>

        {/* Already have an account? */}
        <div className="text-center mt-3">
          Already have an account?{" "}
          <a href="#" onClick={showLogin} className="text-primary">
            Sign In
          </a>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default RegisterModal;