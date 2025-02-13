import React, { useState } from "react";
import { Form, Button, Container, Alert } from "react-bootstrap";
import axios from "axios";

const AddSalon = () => {
  const [salon, setSalon] = useState({
    name: "",
    address: "",
    latitude: "",
    longitude: "",
    category: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSalon({ ...salon, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8082/api/salons", salon);
      setMessage("Salon added successfully.");
      setError("");
    } catch (error) {
      setError("Error adding salon. Please try again.");
      setMessage("");
    }
  };

  return (
    <Container>
      <h2>Add Salon</h2>
      {message && <Alert variant="success">{message}</Alert>}
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter salon name"
            name="name"
            value={salon.name}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Address</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter salon address"
            name="address"
            value={salon.address}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Latitude</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter latitude"
            name="latitude"
            value={salon.latitude}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Longitude</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter longitude"
            name="longitude"
            value={salon.longitude}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Category</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter category"
            name="category"
            value={salon.category}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Add Salon
        </Button>
      </Form>
    </Container>
  );
};

export default AddSalon;