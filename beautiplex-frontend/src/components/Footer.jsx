import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FaInstagram, FaYoutube, FaFacebookF } from "react-icons/fa";
import "../styles/Footer.css"

const Footer = () => {
  return (
    <footer className="bg-dark text-light py-4" style={{position:"relative", bottom:"-250px", width:"100%"}}>
      <Container>
        <Row>
          <Col md={3}>
            <h5>LINK INFO</h5>
            <ul className="list-unstyled">
              <li>Skin Care</li>
              <li>Makeup</li>
              <li>New Product</li>
            </ul>
          </Col>
          <Col md={3}>
            <h5>SUPPORT</h5>
            <ul className="list-unstyled">
              <li>Careers</li>
              <li>Contact Us</li>
              <li>Privacy & Policy</li>
            </ul>
          </Col>
          <Col md={3}>
            <h5>ABOUT</h5>
            <ul className="list-unstyled">
              <li>Team</li>
              <li>Delivery And Returns</li>
              <li>FAQ</li>
            </ul>
          </Col>
          <Col md={3} className="text-center">
            <h5>FOLLOW US</h5>
            <div className="d-flex justify-content-center gap-3">
              <a
                href="https://www.instagram.com/"
                className="text-light"
                target="blank"
              >
                <FaInstagram size={24} />
              </a>
              <a
                href="https://www.youtube.com/?gl=IN"
                className="text-light"
                target="blank"
              >
                <FaYoutube size={24} />
              </a>
              <a
                href="https://www.facebook.com/"
                className="text-light"
                target="blank"
              >
                <FaFacebookF size={24} />
              </a>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;