import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Image, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const MyWishlist = () => {
  const [wishlistIds, setWishlistIds] = useState([]);
  const [wishlistProducts, setWishlistProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedWishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    setWishlistIds(storedWishlist);
  }, []);

  useEffect(() => {
    if (wishlistIds.length > 0) {
      // Fetch all wishlist products
      Promise.all(
        wishlistIds.map(id =>
          axios.get(`https://dummyjson.com/products/${id}`).then(res => res.data)
        )
      )
        .then(data => setWishlistProducts(data))
        .catch(err => console.error('Failed to fetch wishlist products:', err));
    } else {
      setWishlistProducts([]);
    }
  }, [wishlistIds]);

  const removeFromWishlist = (id) => {
    const updated = wishlistIds.filter(pid => pid !== id);
    setWishlistIds(updated);
    localStorage.setItem('wishlist', JSON.stringify(updated));
  };

  return (
    <Container className="mt-5 mb-5">
      <h2>My Wishlist</h2>
      {wishlistProducts.length === 0 ? (
        <p className="text-muted mt-3">Your wishlist is empty.</p>
      ) : (
        <Row className="mt-4 g-4">
          {wishlistProducts.map(product => (
            <Col key={product.id} md={4}>
              <div className="border rounded shadow-sm p-3 h-100">
                <Image
                  src={product.thumbnail}
                  fluid
                  rounded
                  style={{ height: '200px', objectFit: 'cover', width: '100%' }}
                  onClick={() => navigate(`/product/${product.id}`)}
                />
                <h5 className="mt-3">{product.title}</h5>
                <p className="text-success">${product.price}</p>
                <div className="d-flex justify-content-between">
                  <Button variant="danger" size="sm" onClick={() => removeFromWishlist(product.id)}>
                    Remove
                  </Button>
                  <Button variant="primary" size="sm" onClick={() => navigate(`/product/${product.id}`)}>
                    View
                  </Button>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default MyWishlist;
