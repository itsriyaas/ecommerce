import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Spinner } from 'react-bootstrap';
import axios from 'axios';
import { Link } from 'react-router-dom';

const FlashSale = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('https://dummyjson.com/products/category/womens-dresses')
      .then(res => {
        setProducts(res.data.products);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch products:', err);
        setLoading(false);
      });
  }, []);

  return (
    <Container className="mt-5">
      <h3 className="mb-4 fw-bold">Flash Sale</h3>
      {loading ? (
        <div className="text-center"><Spinner animation="border" /></div>
      ) : (
        <Row className="g-4">
          {products.map(product => (
            <Col key={product.id} xs={6} sm={4} md={3} lg={3}>
              <Link to={`/product/${product.id}`} className="text-decoration-none text-dark">
  <Card className="h-100">
    <Card.Img variant="top" src={product.thumbnail} style={{ objectFit: 'cover', height: '220px' }} />
    <Card.Body className="d-flex flex-column justify-content-between">
      <Card.Title className="fs-6">{product.title}</Card.Title>
      <div>
        <span className="fw-bold">${product.price}</span>
        {product.discountPercentage && (
          <span className="text-muted text-decoration-line-through ms-2">
            ${(product.price / (1 - product.discountPercentage / 100)).toFixed(2)}
          </span>
        )}
      </div>
    </Card.Body>
  </Card>
</Link>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default FlashSale;
