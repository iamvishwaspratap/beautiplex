import React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import "../styles/ContactUs.css"; // Import CSS for styling

const ContactUs = () => {
  return (
    <>
      {/* Background Section */}
      <div className="contact-header">
        <div className="overlay">
          <h1>Contact Us</h1>
        </div>
      </div>

      {/* Contact Form Section */}
      <Container className="mt-4 mb-4">
        <Row className="justify-content-center">
          <Col md={8} lg={6}>
            <Form className="p-4 border rounded shadow">
              <h4 className="text-center">Get in Touch</h4>
              <Form.Group className="mb-3">
                <Form.Control type="text" placeholder="Your Name" />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Control type="email" placeholder="Your Email" />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Control type="tel" placeholder="Enter Your Phone No.." />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Control as="textarea" rows={4} placeholder="Message" />
              </Form.Group>
              <Button variant="primary" className="w-100">
                Send Message
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ContactUs;
