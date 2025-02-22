import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, Spinner, Button, Form, Modal } from 'react-bootstrap';
import EditUserModal from './EditUserModal';
import ChangePasswordModal from './ChangePasswordModal';

const OwnerDashboard = () => {
  const [owner, setOwner] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
  const [showAddSalonModal, setShowAddSalonModal] = useState(false);
  const [newSalon, setNewSalon] = useState({ name: '', location: '', services: [] });
  const [serviceOptions, setServiceOptions] = useState([
    { name: 'Hair', price: '' },
    { name: 'Facial', price: '' },
    { name: 'Makeup', price: '' },
    { name: 'Spa', price: '' },
    { name: 'Nail', price: '' },
    { name: 'Bridal Makeup', price: '' },
    { name: 'Skincare', price: '' },
  ]);

  const id = localStorage.getItem('ownerId'); // Assuming email is stored in local storage after login
const email = localStorage.getItem('userEmail'); // Assuming email is stored in local storage after login
  useEffect(() => {
    if (!id) {
      console.error("id is undefined!");
      return;
    }
  
    const fetchOwnerData = async () => {
      try {
        console.log("Fetching user for id:", id);  // Debugging log
        const response = await axios.get("http://localhost:8082/api/users/me", { 
          params: { id: id }, 
        });
  
        console.log("API Response:", response.data);  // Debugging log
        setOwner(response.data);
      } catch (error) {
        console.error("Error fetching owner data:", error);
      }
    };
  
    fetchOwnerData();
  }, [id]);
  

  const handleServiceChange = (index, e) => {
    const { name, value } = e.target;
    const updatedServiceOptions = [...serviceOptions];
    updatedServiceOptions[index][name] = value;
    setServiceOptions(updatedServiceOptions);
  };

  const handleServiceCheckboxChange = (index, e) => {
    const { checked } = e.target;
    const updatedServiceOptions = [...serviceOptions];
    updatedServiceOptions[index].selected = checked;
    setServiceOptions(updatedServiceOptions);
  };

  const handleNewSalonChange = (e) => {
    const { name, value } = e.target;
    setNewSalon((prevSalon) => ({
      ...prevSalon,
      [name]: value,
    }));
  };

  const handleAddSalon = async () => {
    const selectedServices = serviceOptions
      .filter((service) => service.selected)
      .map((service) => ({ name: service.name, price: service.price }));

    if (!owner || !owner.email) {
      console.error("Owner information is missing!");
      alert("Owner data is not loaded. Please try again.");
      return;
    }

    const salonData = {
      name: newSalon.name,
      location: newSalon.location,
      services: selectedServices,
      owner: { email: owner.email } // ✅ Ensure the owner object is included
    };

    console.log("Sending salon data:", JSON.stringify(salonData, null, 2)); // Debugging log

    try {
        const response = await axios.post('http://localhost:8082/api/salons/create', salonData, {
            headers: {
                "Content-Type": "application/json",
            }
        });
        console.log("Salon created successfully:", response.data);
        
        alert('Salon added successfully!');
        setShowAddSalonModal(false);
        setNewSalon({ name: '', location: '', services: [] });
        setServiceOptions([
            { name: 'Hair', price: '' },
            { name: 'Facial', price: '' },
            { name: 'Makeup', price: '' },
            { name: 'Spa', price: '' },
            { name: 'Nail', price: '' },
            { name: 'Bridal Makeup', price: '' },
            { name: 'Skincare', price: '' },
        ]);
    } catch (error) {
        console.error("Error adding salon:", error.response ? error.response.data : error.message);
        alert('Failed to add salon.');
    }
};



  if (!owner) {
    return <Spinner animation="border" className="d-block mx-auto mt-4" />;
  }

  return (
    <Container className="mt-4">
      <Row className="align-items-center mb-4">
        <Col md={6}>
          <Card className="shadow-sm p-3">
            <Card.Header className="bg-primary text-white text-center">
              <h5>Owner Details</h5>
            </Card.Header>
            <Card.Body>
              <p><strong>Name:</strong> {owner.name}</p>
              <p><strong>Email:</strong> {owner.email}</p>
              <Button variant="warning" onClick={() => setShowEditModal(true)}>
                Edit Details
              </Button>
              <Button variant="secondary" onClick={() => setShowChangePasswordModal(true)} className="ms-2">
                Change Password
              </Button>
              <Button variant="success" onClick={() => setShowAddSalonModal(true)} className="ms-2">
                Add Salon
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <EditUserModal
        show={showEditModal}
        handleClose={() => setShowEditModal(false)}
        user={owner}
        setUser={setOwner}
      />
      <ChangePasswordModal
        show={showChangePasswordModal}
        handleClose={() => setShowChangePasswordModal(false)}
        email={email}
      />
      <Modal show={showAddSalonModal} onHide={() => setShowAddSalonModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Salon</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formSalonName">
              <Form.Label>Salon Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={newSalon.name}
                onChange={handleNewSalonChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formSalonLocation" className="mt-3">
              <Form.Label>Location</Form.Label>
              <Form.Control
                type="text"
                name="location"
                value={newSalon.location}
                onChange={handleNewSalonChange}
                required
              />
            </Form.Group>
            <Form.Label className="mt-3">Services</Form.Label>
            {serviceOptions.map((service, index) => (
              <Row key={index} className="mb-3">
                <Col>
                  <Form.Check
                    type="checkbox"
                    label={service.name}
                    checked={service.selected || false}
                    onChange={(e) => handleServiceCheckboxChange(index, e)}
                  />
                </Col>
                <Col>
                  <Form.Control
                    type="number"
                    name="price"
                    placeholder="Price"
                    value={service.price}
                    onChange={(e) => handleServiceChange(index, e)}
                    disabled={!service.selected}
                    required={service.selected}
                  />
                </Col>
              </Row>
            ))}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAddSalonModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAddSalon}>
            Add Salon
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default OwnerDashboard;