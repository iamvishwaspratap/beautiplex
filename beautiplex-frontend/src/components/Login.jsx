import React, { useState } from "react";
import { Modal, Button, Form, Alert } from "react-bootstrap";
import { FaUser, FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ForgotPassword from "./ForgotPassword";

const LoginModal = ({ show, handleClose, showRegister }) => {
  const [user, setUser] = useState({
    email: "",
    password: "",
    role: "customer", // Default role
  });

  const [error, setError] = useState("");
  const [showForgotModal, setShowForgotModal] = useState(false); // Manage forgot password modal visibility
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8082/api/users/login", user)
      .then((response) => {
        alert("Login successful");
        localStorage.setItem("userEmail", user.email); // Store email in local storage
        localStorage.setItem("userName", response.data.name); // Store user name in local storage
        handleClose(); // Close the login modal
        navigate("/"); // Redirect to home page
      })
      .catch(() => {
        setError("Invalid email or password");
      });
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title className="w-100 text-center">Login</Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-4">
          {error && <Alert variant="danger">{error}</Alert>}

          {/* Role Selection Dropdown */}
          <Form.Group className="mb-3">
            <Form.Label>Select Role</Form.Label>
            <Form.Select name="role" value={user.role} onChange={handleChange}>
              <option value="customer">Customer</option>
              <option value="shop_owner">Shop Owner</option>
              <option value="admin">Admin</option>
            </Form.Select>
          </Form.Group>

          {/* Email Input */}
          <div className="input-group mb-3">
            <span className="input-group-text">
              <FaUser />
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

          {/* Login Button */}
          <Button variant="success" className="w-100" onClick={handleSubmit}>
            Sign In
          </Button>

          {/* Forgot Password Link */}
          <div className="text-center mt-3">
            <a
              href="#"
              className="text-primary"
              onClick={() => {
                handleClose();
                setShowForgotModal(true);
              }}
            >
              Forgot Password?
            </a>
          </div>

          {/* Register Link */}
          <div className="text-center mt-3">
            Do not have an account?{" "}
            <a href="#" onClick={showRegister} className="text-primary">
              Create one
            </a>
          </div>
        </Modal.Body>
      </Modal>

      {/* Forgot Password Modal */}
      <ForgotPassword
        show={showForgotModal}
        handleClose={() => setShowForgotModal(false)}
        showLogin={() => setShowForgotModal(false) || handleClose()} // Show login modal after reset
      />
    </>
  );
};

export default LoginModal;