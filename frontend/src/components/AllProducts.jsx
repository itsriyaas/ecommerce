import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Spinner, Alert } from 'react-bootstrap';

const AllProducts = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const category = searchParams.get('category');

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductsByCategory = async () => {
      if (!category) return;

      setLoading(true);
      setError(null);

      try {
        const res = await fetch(`https://dummyjson.com/products/category/${category}`);
        if (!res.ok) throw new Error('Failed to fetch');
        const data = await res.json();
        setProducts(data.products || []);
      } catch (err) {
        setError('Error fetching products. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchProductsByCategory();
  }, [category]);

  const handleProductClick = (product) => {
    navigate(`/product/${product.id}`, { state: product });
  };

  return (
    <Container className="py-4">
      <h3 className="mb-4">All Products {category && ` - ${category.toUpperCase()}`}</h3>

      {loading && (
        <div className="text-center my-4">
          <Spinner animation="border" />
        </div>
      )}

      {error && <Alert variant="danger">{error}</Alert>}

      {!loading && !error && (
        <Row className="g-4">
          {products.length > 0 ? (
            products.map((product) => (
              <Col key={product.id} sm={6} md={4} lg={3}>
                <div
                  className="border p-3 rounded shadow-sm h-100 cursor-pointer"
                  style={{ transition: '0.3s', cursor: 'pointer' }}
                  onClick={() => handleProductClick(product)}
                >
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="img-fluid rounded mb-2"
                    style={{ height: '200px', objectFit: 'cover', width: '100%' }}
                  />
                  <h6 className="fw-bold">{product.title}</h6>
                  <p className="text-muted small mb-1">{product.category}</p>
                  <p className="mb-0 fw-semibold">${product.price}</p>
                </div>
              </Col>
            ))
          ) : (
            <p>No products found.</p>
          )}
        </Row>
      )}
    </Container>
  );
};

export default AllProducts;
