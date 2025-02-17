import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Container, Form, Button, Row, Col, Card } from "react-bootstrap";

const serviceOptions = [
  { name: "Spa", category: "spa" },
  { name: "Nail", category: "nail" },
  { name: "Hair", category: "hair" },
  { name: "Facial", category: "facial" },
  { name: "Bridal Makeup", category: "bridal-makeup" },
  { name: "Skincare", category: "skincare" },
];

const AddSalon = () => {
  const [salon, setSalon] = useState({
    name: "",
    address: "",
  });
  const [selectedServices, setSelectedServices] = useState([]);
  const [servicePrices, setServicePrices] = useState({});
  const navigate = useNavigate();
  const ownerId = localStorage.getItem("userId");

  const handleSalonChange = (e) => {
    const { name, value } = e.target;
    setSalon({ ...salon, [name]: value });
  };

  const handleServiceChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedServices([...selectedServices, value]);
    } else {
      setSelectedServices(selectedServices.filter((service) => service !== value));
    }
  };

  const handlePriceChange = (e) => {
    const { name, value } = e.target;
    setServicePrices({ ...servicePrices, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const salonResponse = await axios.post("http://localhost:8082/api/salons/add", {
        ...salon,
        owner: { id: ownerId ,email: localStorage.getItem("userEmail") }
      });
      const salonId = salonResponse.data.id;
      await Promise.all(
        selectedServices.map((service) =>
          axios.post("http://localhost:8082/api/salon-services", {
            name: serviceOptions.find((option) => option.category === service).name,
            category: service,
            price: parseFloat(servicePrices[service]),
            address: salon.address,
            salon: { id: salonId },
          })
        )
      );
      alert("Salon and services added successfully");
      navigate("/owner-dashboard");
    } catch (error) {
      console.error("Error adding salon and services:", error);
      alert("Failed to add salon and services. Please try again.");
    }
  };

  return (
    <Container>
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <Card>
            <Card.Header>Register New Salon</Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Salon Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={salon.name}
                    onChange={handleSalonChange}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    type="text"
                    name="address"
                    value={salon.address}
                    onChange={handleSalonChange}
                    required
                  />
                </Form.Group>
                <Card>
                  <Card.Header>Services</Card.Header>
                  <Card.Body>
                    {serviceOptions.map((service, index) => (
                      <div key={index}>
                        <Form.Check
                          type="checkbox"
                          label={service.name}
                          value={service.category}
                          onChange={handleServiceChange}
                        />
                        {selectedServices.includes(service.category) && (
                          <Form.Group className="mb-3">
                            <Form.Label>{service.name} Price (Rs)</Form.Label>
                            <Form.Control
                              type="number"
                              name={service.category}
                              value={servicePrices[service.category] || ""}
                              onChange={handlePriceChange}
                              required
                            />
                          </Form.Group>
                        )}
                      </div>
                    ))}
                  </Card.Body>
                </Card>
                <Button variant="primary" type="submit" className="mt-3">
                  Register Salon
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AddSalon;