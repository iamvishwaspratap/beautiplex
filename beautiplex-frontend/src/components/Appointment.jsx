import React, { useState } from 'react';
import { Table, Button, Row, Col, Form } from 'react-bootstrap';
import Calendar from 'react-calendar'; // Importing react-calendar
import '../styles/Appointment.css';

const Appointments = () => {
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      customer: 'John Doe',
      date: '2025-02-20 10:00 AM',
      status: 'Upcoming',
    },
    {
      id: 2,
      customer: 'Jane Smith',
      date: '2025-02-19 02:00 PM',
      status: 'Completed',
    },
    {
      id: 3,
      customer: 'Tom Brown',
      date: '2025-02-21 09:00 AM',
      status: 'Upcoming',
    },
  ]);

  const handleCancelAppointment = (id) => {
    setAppointments(appointments.filter(app => app.id !== id));
  };

  // Convert appointment date to match calendar format (yyyy-mm-dd)
  const getAppointmentDates = () => {
    return appointments.map((appointment) => {
      const date = new Date(appointment.date);
      return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    });
  };

  return (
    <div>
      <h1>Appointments Dashboard</h1>

      {/* Appointment Statistics */}
      <Row>
        <Col md={4}>
          <div className="stat-box">
            <h4>Total Appointments</h4>
            <p>{appointments.length}</p>
          </div>
        </Col>
        <Col md={4}>
          <div className="stat-box">
            <h4>Upcoming Appointments</h4>
            <p>{appointments.filter(app => app.status === 'Upcoming').length}</p>
          </div>
        </Col>
        <Col md={4}>
          <div className="stat-box">
            <h4>Completed Appointments</h4>
            <p>{appointments.filter(app => app.status === 'Completed').length}</p>
          </div>
        </Col>
      </Row>

      {/* Calendar View */}
      <div className="calendar-section">
        <h3>Calendar View</h3>
        <Calendar
          value={new Date()} // The current date
          tileClassName={({ date, view }) => {
            // Check if the current date has an appointment
            const dateString = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
            if (getAppointmentDates().includes(dateString)) {
              return 'has-appointment'; // Add a class for dates with appointments
            }
            return '';
          }}
        />
      </div>

      {/* Appointment List */}
      <div className="filter-section">
        <Form.Control type="text" placeholder="Search by Customer Name" className="mb-3" />
        <Form.Control as="select" className="mb-3">
          <option>Status</option>
          <option>Upcoming</option>
          <option>Completed</option>
          <option>Cancelled</option>
        </Form.Control>
      </div>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Appointment ID</th>
            <th>Customer Name</th>
            <th>Date & Time</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appointment) => (
            <tr key={appointment.id}>
              <td>{appointment.id}</td>
              <td>{appointment.customer}</td>
              <td>{appointment.date}</td>
              <td>{appointment.status}</td>
              <td>
                <Button variant="primary" className="mr-2">View</Button>
                <Button variant="warning" className="mr-2">Edit</Button>
                <Button variant="danger" onClick={() => handleCancelAppointment(appointment.id)}>Cancel</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Appointments;