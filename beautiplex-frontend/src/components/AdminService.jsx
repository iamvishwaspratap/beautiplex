import React, { useState } from 'react';
import { Table, Button, Row, Col, Form } from 'react-bootstrap';
import '../styles/AdminService.css';

const AdminService = () => {
  const [services, setServices] = useState([
    { id: 1, name: 'Haircut', description: 'Basic haircut', price: 25, status: 'Active', category: 'Hair' },
    { id: 2, name: 'Facial', description: 'Facial treatment', price: 40, status: 'Inactive', category: 'Beauty' },
    { id: 3, name: 'Massage', description: 'Full body massage', price: 50, status: 'Active', category: 'Wellness' },
  ]);

  const [newService, setNewService] = useState({
    name: '',
    description: '',
    price: '',
    status: 'Active',
    category: 'Hair',
  });

  const handleDeleteService = (id) => {
    setServices(services.filter(service => service.id !== id));
  };

  const handleAddService = () => {
    const newServiceData = { ...newService, id: services.length + 1 };
    setServices([...services, newServiceData]);
    setNewService({ name: '', description: '', price: '', status: 'Active', category: 'Hair' }); // Reset form
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewService({ ...newService, [name]: value });
  };

  return (
    <div>
      <h1>Services Dashboard</h1>

      {/* Service Statistics */}
      <Row>
        <Col md={4}>
          <div className="stat-box">
            <h4>Total Services</h4>
            <p>{services.length}</p>
          </div>
        </Col>
        <Col md={4}>
          <div className="stat-box">
            <h4>Active Services</h4>
            <p>{services.filter(service => service.status === 'Active').length}</p>
          </div>
        </Col>
        <Col md={4}>
          <div className="stat-box">
            <h4>Inactive Services</h4>
            <p>{services.filter(service => service.status === 'Inactive').length}</p>
          </div>
        </Col>
      </Row>

      {/* Add New Service */}
      <div className="add-service-section">
        <h3>Add New Service</h3>
        <Form>
          <Form.Group controlId="formServiceName">
            <Form.Label>Service Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter service name"
              name="name"
              value={newService.name}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group controlId="formServiceDescription">
            <Form.Label>Service Description</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter service description"
              name="description"
              value={newService.description}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group controlId="formServicePrice">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter price"
              name="price"
              value={newService.price}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group controlId="formServiceCategory">
            <Form.Label>Category</Form.Label>
            <Form.Control
              as="select"
              name="category"
              value={newService.category}
              onChange={handleInputChange}
            >
              <option>Hair</option>
              <option>Beauty</option>
              <option>Wellness</option>
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="formServiceStatus">
            <Form.Label>Status</Form.Label>
            <Form.Control
              as="select"
              name="status"
              value={newService.status}
              onChange={handleInputChange}
            >
              <option>Active</option>
              <option>Inactive</option>
            </Form.Control>
          </Form.Group>

          <Button variant="success" onClick={handleAddService}>Add Service</Button>
        </Form>
      </div>

      {/* Services List */}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Service Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Category</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {services.map(service => (
            <tr key={service.id}>
              <td>{service.name}</td>
              <td>{service.description}</td>
              <td>{$`${service.price}`}</td>
              <td>{service.category}</td>
              <td>{service.status}</td>
              <td>
                <Button variant="primary" className="mr-2">Edit</Button>
                <Button variant="danger" onClick={() => handleDeleteService(service.id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default AdminService;