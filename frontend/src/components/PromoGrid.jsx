import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const PromoGrid = () => {
  const navigate = useNavigate();

  const handleClick = (category) => {
    navigate(`/all-products?category=${category}`);
  };

  return (
    <Container fluid className="mt-5 px-3 promo-grid">
      <Row className="g-3">
        <Col md={6}>
          <div className="promo-card orange " onClick={() => handleClick('mens-shirts')} style={{ cursor: 'pointer' }}>
            <img src="https://chawkbazar.redq.io/_next/image?url=%2Fassets%2Fimages%2Fbanner%2Fmasonry%2Fbanner-1.jpg&w=1920&q=100" alt="Men" />
          </div>
        </Col>

        <Col md={3} sm={6}>
          <div className="promo-card blue" onClick={() => handleClick('sports-accessories')} style={{ cursor: 'pointer' }}>
            <img src="https://chawkbazar.redq.io/_next/image?url=%2Fassets%2Fimages%2Fbanner%2Fmasonry%2Fbanner-2.jpg&w=1920&q=100" alt="Sports" />
          </div>
        </Col>

        <Col md={3} sm={6}>
          <div className="promo-card red" onClick={() => handleClick('womens-dresses')} style={{ cursor: 'pointer' }}>
            <img src="https://chawkbazar.redq.io/_next/image?url=%2Fassets%2Fimages%2Fbanner%2Fmasonry%2Fbanner-3.jpg&w=1920&q=100" alt="Women" />
          </div>
        </Col>

        <Col md={3} sm={6}>
          <div className="promo-card red" onClick={() => handleClick('sunglasses')} style={{ cursor: 'pointer' }}>
            <img src="https://chawkbazar.redq.io/_next/image?url=%2Fassets%2Fimages%2Fbanner%2Fmasonry%2Fbanner-4.jpg&w=1920&q=100" alt="Sunglasses" />
          </div>
        </Col>

        <Col md={3} sm={6}>
          <div className="promo-card teal">
            <img src="https://chawkbazar.redq.io/_next/image?url=%2Fassets%2Fimages%2Fbanner%2Fmasonry%2Fbanner-5.jpg&w=1920&q=100" alt="Coupons" />
            <div className="promo-text small">
              <p>explore</p>
              <h4>COUPONS</h4>
              <span>#NEWYEAR2021</span>
            </div>
          </div>
        </Col>

        <Col md={6}>
          <div className="promo-card yellow" onClick={() => handleClick('womens-bags')} style={{ cursor: 'pointer' }}>
            <img src="https://chawkbazar.redq.io/_next/image?url=%2Fassets%2Fimages%2Fbanner%2Fmasonry%2Fbanner-6.jpg&w=1920&q=100" alt="Backpack" />
          </div>
        </Col>

      </Row>
    </Container>
  );
};

export default PromoGrid;
