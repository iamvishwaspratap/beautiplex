import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col, Card, Spinner, Alert, Button, Form } from "react-bootstrap";

const MySalons = () => {
  const [salons, setSalons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [ownerId, setOwnerId] = useState(null);
  const [editingSalon, setEditingSalon] = useState(null);
  const [editedSalonData, setEditedSalonData] = useState({ name: "", location: "" });

  useEffect(() => {
    const id = localStorage.getItem("ownerId");
    if (id) {
      setOwnerId(id);
    } else {
      setError("Owner ID not found. Please log in again.");
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const fetchSalons = async () => {
      if (!ownerId) return;
      try {
        const response = await axios.get("http://localhost:8082/api/salons/owner", {
          params: { id: ownerId },
        });

        const salonsWithServices = await Promise.all(
          response.data.map(async (salon) => {
            try {
              const servicesResponse = await axios.get(
                `http://localhost:8082/api/services/salon/${salon.id}`
              );
              return { ...salon, services: servicesResponse.data || [] };
            } catch (error) {
              return { ...salon, services: [] };
            }
          })
        );

        setSalons(salonsWithServices);
      } catch (error) {
        setError("Failed to load salons. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchSalons();
  }, [ownerId]);

  const handleDelete = async (salonId) => {
    if (window.confirm("Are you sure you want to delete this salon?")) {
      try {
        const userId = localStorage.getItem("ownerId");
        await axios.delete(`http://localhost:8082/api/salons/delete/${salonId}`,{params: {userId }});
        setSalons(salons.filter(salon => salon.id !== salonId));
      } catch (error) {
        alert("Failed to delete salon. Please try again.");
      }
    }
  };

  const handleEditClick = (salon) => {
    setEditingSalon(salon.id);
    setEditedSalonData({ name: salon.name, location: salon.location });
  };

  const handleSaveEdit = async (salonId) => {
    try {
      await axios.put(`http://localhost:8082/api/salons/update/${salonId}`, editedSalonData);
      setSalons(salons.map(salon => salon.id === salonId ? { ...salon, ...editedSalonData } : salon));
      setEditingSalon(null);
    } catch (error) {
      alert("Failed to update salon.");
    }
  };

  return (
    <Container className="mt-4">
      <h2 className="text-center">My Salons</h2>
      {loading && (
        <div className="text-center">
          <Spinner animation="border" />
        </div>
      )}
      {error && <Alert variant="danger">{error}</Alert>}
      <Row>
        {salons.length > 0 ? (
          salons.map((salon) => (
            <Col md={4} key={salon.id} className="mb-4">
              <Card className="shadow-sm">
                <Card.Header className="text-center bg-primary text-white">
                  {editingSalon === salon.id ? (
                    <Form.Control
                      type="text"
                      value={editedSalonData.name}
                      onChange={(e) => setEditedSalonData({ ...editedSalonData, name: e.target.value })}
                    />
                  ) : (
                    salon.name
                  )}
                </Card.Header>
                <Card.Body>
                  <p>
                    <strong>Location:</strong>{" "}
                    {editingSalon === salon.id ? (
                      <Form.Control
                        type="text"
                        value={editedSalonData.location}
                        onChange={(e) => setEditedSalonData({ ...editedSalonData, location: e.target.value })}
                      />
                    ) : (
                      salon.location
                    )}
                  </p>
                  <p><strong>Services:</strong></p>
                  {Array.isArray(salon.services) && salon.services.length > 0 ? (
                    <ul>
                      {salon.services.map((service) => (
                        <li key={service.id}>{service.name} - ₹{service.price}</li>
                      ))}
                    </ul>
                  ) : (
                    <p>No services available</p>
                  )}
                  <div className="d-flex justify-content-between">
                    {editingSalon === salon.id ? (
                      <>
                        <Button variant="success" onClick={() => handleSaveEdit(salon.id)}>Save</Button>
                        <Button variant="secondary" onClick={() => setEditingSalon(null)}>Cancel</Button>
                      </>
                    ) : (
                      <>
                        <Button variant="warning" onClick={() => handleEditClick(salon)}>Edit</Button>
                        <Button variant="danger" onClick={() => handleDelete(salon.id)}>Delete</Button>
                      </>
                    )}
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          !loading && <p className="text-center">No salons found.</p>
        )}
      </Row>
    </Container>
  );
};

export default MySalons;
