import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-light text-dark pt-5 border-top">
      <Container>
        <Row className="text-start gy-4">
          <Col md={4} lg={2}>
            <h6 className="fw-bold mb-3">Social</h6>
            <p className="mb-1"><FaFacebookF /> &nbsp;/MayukhaFashion</p>
            <p className="mb-1"><FaTwitter /> &nbsp;/MayukhaFashion</p>
            <p className="mb-1"><FaInstagram /> &nbsp;/MayukhaFashion</p>
          </Col>

          <Col md={4} lg={2}>
            <h6 className="fw-bold mb-3">Contact</h6>
            <p className="mb-1">Contact Us</p>
            <p className="mb-1">Website: <a href="" target="_blank" rel="noreferrer">https://Mayukha.fashion</a></p>
          </Col>

          <Col md={4} lg={2}>
            <h6 className="fw-bold mb-3">About</h6>
            <p className="mb-1">Support Center</p>
            <p className="mb-1">Customer Support</p>
            <p className="mb-1">About Us</p>
            <p className="mb-1">Copyright</p>
          </Col>

          <Col md={4} lg={2}>
            <h6 className="fw-bold mb-3">Customer Care</h6>
            <p className="mb-1">FAQ & Helps</p>
            <p className="mb-1">Shipping & Delivery</p>
            <p className="mb-1">Return & Exchanges</p>
          </Col>

          <Col md={4} lg={2}>
            <h6 className="fw-bold mb-3">Our Information</h6>
            <p className="mb-1">Privacy policy update</p>
            <p className="mb-1">Terms & conditions</p>
            <p className="mb-1">Return Policy</p>
            <p className="mb-1">Site Map</p>
          </Col>

          <Col md={4} lg={2}>
            <h6 className="fw-bold mb-3">Community</h6>
            <p className="mb-1">Announcements</p>
            <p className="mb-1">Answer center</p>
            <p className="mb-1">Discussion boards</p>
            <p className="mb-1">Giving works</p>
          </Col>
        </Row>

        <Row className="text-center mt-4">
          <Col>
            <hr />
            <p className="text-muted mb-3">
              ©2025 <strong>MayukhaFashion</strong>. Designed By <a href='' target='_blank' className='text-info'>Thea IT Solutions</a>. All rights reserved.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
