import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';

const EditUserModal = ({ show, handleClose, user, setUser }) => {
  const [editUser, setEditUser] = useState({ name: user.name, email: user.email, role: user.role });

  const handleEditUserChange = (e) => {
    const { name, value } = e.target;
    setEditUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleUpdateUser = async () => {
    try {
      const response = await axios.put('http://localhost:8082/api/users/update', {
        id: user.id,
        name: editUser.name,
        email: editUser.email,
        role: editUser.role
      });
      alert('User details updated successfully!');
      setUser(response.data);
      localStorage.setItem('userEmail', response.data.email); // Update local storage with new email
      handleClose();
    } catch (error) {
      console.error('Error updating user details:', error);
      alert('Failed to update user details.');
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit User Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formUserName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={editUser.name}
              onChange={handleEditUserChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="formUserEmail" className="mt-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={editUser.email}
              onChange={handleEditUserChange}
              required
            />
          </Form.Group>
          <Form.Control
            type="hidden"
            name="role"
            value={editUser.role}
          />
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleUpdateUser}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditUserModal;