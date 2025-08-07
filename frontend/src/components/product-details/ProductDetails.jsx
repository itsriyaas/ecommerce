import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Spinner, Image, Button, Toast, ToastContainer, Form } from 'react-bootstrap';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/cartSlice';
import styled from 'styled-components';
import { BiPurchaseTag } from 'react-icons/bi';
import { RiShoppingCart2Line } from 'react-icons/ri';

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
const [reviews, setReviews] = useState([]);
const [reviewForm, setReviewForm] = useState({ name: '', rating: '', comment: '' });

const [pincode, setPincode] = useState('');
const [deliveryDate, setDeliveryDate] = useState('');
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [wishlist, setWishlist] = useState([]);
  const [recommended, setRecommended] = useState([]);
  const [showToast, setShowToast] = useState(false);

  // Load product
  useEffect(() => {
  axios.get(`https://dummyjson.com/products/${id}`)
    .then(res => {
      setProduct(res.data);
      setLoading(false);

      // Fetch recommended
      axios.get(`https://dummyjson.com/products/category/${res.data.category}`)
        .then(r => {
          const filtered = r.data.products.filter(p => p.id !== res.data.id);
          const shuffled = filtered.sort(() => 0.5 - Math.random()).slice(0, 3);
          setRecommended(shuffled);
        });
    })
    .catch(err => {
      console.error('Failed to fetch product:', err);
      setLoading(false);
    });
}, [id]);


  // Load wishlist from localStorage
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('wishlist')) || [];
    setWishlist(stored);
  }, []);

  // Save wishlist to localStorage on change
  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const handleAddToCart = () => {
    dispatch(addToCart(product));
    setShowToast(true);
  };

  const handleBuyNow = () => {
    alert(`Proceeding to buy "${product.title}"`);
  };

  const toggleWishlist = () => {
    const updated = wishlist.includes(product.id)
      ? wishlist.filter(pid => pid !== product.id)
      : [...wishlist, product.id];
    setWishlist(updated);
  };

  const isWishlisted = wishlist.includes(product?.id);
  // Handle review form submit
const handleReviewSubmit = (e) => {
  e.preventDefault();
  setReviews([...reviews, reviewForm]);
  setReviewForm({ name: '', rating: '', comment: '' });
};

// Calculate dummy delivery date
const handleCheckDelivery = () => {
  if (pincode.length !== 6) {
    alert('Please enter a valid 6-digit pincode');
    return;
  }
  const today = new Date();
  today.setDate(today.getDate() + 5); // assume 5-day delivery
  setDeliveryDate(today.toDateString());
};

  if (loading) return <div className="text-center mt-5"><Spinner animation="border" /></div>;
  if (!product) return <div className="text-center mt-5">Product not found.</div>;

  return (
    <Container className="mt-5">
      {/* Toast Notification */}
      <ToastContainer position="top-end" className="p-3">
        <Toast show={showToast} onClose={() => setShowToast(false)} delay={3000} autohide bg="light">
          <Toast.Header closeButton={false}>
            <strong className="me-auto"><RiShoppingCart2Line className='fs-5 me-2 text-danger'/>Added to Cart</strong>
          </Toast.Header>
          <Toast.Body className="d-flex justify-content-between align-items-center">
            {product.title}
            <Button
              size="sm"
              variant="outline-success"
              className="ms-3"
              onClick={() => navigate('/cart')}
            >
              View Cart
            </Button>
          </Toast.Body>
        </Toast>
      </ToastContainer>

      <Row className="g-4 mt-5">
        <Col md={6} className="position-relative">
          {/* Wishlist Icon */}
          <button
            className="position-absolute top-0 end-0 m-3 btn btn-light rounded-circle shadow-sm"
            onClick={toggleWishlist}
          >
            <i
              className={`bi ${isWishlisted ? 'bi-heart-fill text-danger' : 'bi-heart'}`}
              style={{ fontSize: '1.5rem' }}
            ></i>
          </button>

          {/* Main Image */}
          <Image src={product.thumbnail} fluid rounded />

          {/* Additional Images */}
          <div className="d-flex gap-2 mt-3 overflow-auto">
            {product.images?.map((img, index) => (
              <Image
                key={index}
                src={img}
                thumbnail
                style={{ width: '80px', height: '80px', objectFit: 'cover', cursor: 'pointer' }}
                onClick={() => setProduct(prev => ({ ...prev, thumbnail: img }))}
              />
            ))}
          </div>
        </Col>

        <Col md={6} className="mt-5">
          <h2>{product.title}</h2>
          <p className="text-muted">{product.description}</p>
          <h4 className="text-success">${product.price}</h4>

          {product.discountPercentage && (
            <div className="mb-2 text-muted">
              Original: <del>${(product.price / (1 - product.discountPercentage / 100)).toFixed(2)}</del>
            </div>
          )}

          <p><strong>Brand:</strong> {product.brand}</p>
          <p><strong>Category:</strong> {product.category}</p>
          <p><strong>Rating:</strong> {product.rating} ⭐</p>
          <p><strong>Stock:</strong> {product.stock}</p>
{/* Delivery Check Section */}
<div className="mt-5">
  <h6>Check Delivery Date</h6>
  <Form className="d-flex gap-2 mt-2" onSubmit={(e) => e.preventDefault()}>
    <Form.Control
      type="text"
      maxLength={6}
      placeholder="Enter Pincode"
      value={pincode}
      onChange={(e) => setPincode(e.target.value)}
      style={{ width: '200px' }}
    />
    <Button onClick={handleCheckDelivery} variant='warning'>Check</Button>
  </Form>
  {deliveryDate && (
    <p className="mt-2 text-success">Estimated Delivery: <strong>{deliveryDate}</strong></p>
  )}
</div>
          {/* Action Buttons */}
          <div className="mt-4 d-flex gap-3">
            <Button variant="primary" className='rounded-5' onClick={handleAddToCart}>Add to Cart</Button>
            <StyledWrapper>
      <button className="button" onClick={handleBuyNow}>
        Buy Now
        <BiPurchaseTag />
      </button>
    </StyledWrapper>
          </div>
        </Col>
      </Row>
      {/* Reviews Section */}
<div className="mt-5 mb-5">
  <h4>Customer Reviews</h4>

  {/* Existing Reviews */}
  {reviews.length === 0 && <p>No reviews yet. Be the first to review!</p>}
  {reviews.map((rev, idx) => (
    <div key={idx} className="border rounded p-3 mb-3">
      <strong>{rev.name}</strong> - <span>{rev.rating} ⭐</span>
      <p className="mb-0">{rev.comment}</p>
    </div>
  ))}

  {/* Add Review */}
  <Form onSubmit={handleReviewSubmit} className="mt-4">
    <Form.Group className="mb-2">
      <Form.Control
        type="text"
        placeholder="Your Name"
        value={reviewForm.name}
        required
        onChange={(e) => setReviewForm({ ...reviewForm, name: e.target.value })}
      />
    </Form.Group>
    <Form.Group className="mb-2">
      <Form.Select
        value={reviewForm.rating}
        required
        onChange={(e) => setReviewForm({ ...reviewForm, rating: e.target.value })}
      >
        <option value="">Select Rating</option>
        {[5, 4, 3, 2, 1].map(r => (
          <option key={r} value={r}>{r} Star</option>
        ))}
      </Form.Select>
    </Form.Group>
    <Form.Group className="mb-2">
      <Form.Control
        as="textarea"
        placeholder="Your Review"
        value={reviewForm.comment}
        required
        rows={3}
        onChange={(e) => setReviewForm({ ...reviewForm, comment: e.target.value })}
      />
    </Form.Group>
    <Button type="submit">Submit Review</Button>
  </Form>
</div>
      {recommended.length > 0 && (
  <div className="mt-5 mb-5">
    <h4>You may also like</h4>
    <Row className="mt-3 g-3">
      {recommended.map(item => (
        <Col key={item.id} md={4}>
          <div
            className="border rounded p-3 h-100 shadow-sm"
            style={{ cursor: 'pointer' }}
            onClick={() => navigate(`/product/${item.id}`)}
          >
            <Image
              src={item.thumbnail}
              fluid
              rounded
              style={{ height: '200px', objectFit: 'cover', width: '100%' }}
            />
            <h6 className="mt-2 fw-bold">{item.title}</h6>
            <p className="mb-1 text-success">${item.price}</p>
            <p className="text-muted small">{item.category}</p>
          </div>
        </Col>
      ))}
      
    </Row>
  </div>
)}

    </Container>
  );
};
const StyledWrapper = styled.div`
  .button {
    position: relative;
    transition: all 0.3s ease-in-out;
    box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.2);
    padding-block: 0.5rem;
    padding-inline: 1.25rem;
    background-color: green;
    border-radius: 9999px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    color: #ffff;
    gap: 10px;
    font-weight: bold;
    border: 3px solid #ffffff4d;
    outline: none;
    overflow: hidden;
    font-size: 15px;
  }

  .icon {
    width: 24px;
    height: 24px;
    transition: all 0.3s ease-in-out;
  }

  .button:hover {
    transform: scale(1.05);
    border-color: #fff9;
  }

  .button:hover .icon {
    transform: translate(4px);
  }

  .button:hover::before {
    animation: shine 1.5s ease-out infinite;
  }

  .button::before {
    content: "";
    position: absolute;
    width: 100px;
    height: 100%;
    background-image: linear-gradient(
      120deg,
      rgba(255, 255, 255, 0) 30%,
      rgba(255, 255, 255, 0.8),
      rgba(255, 255, 255, 0) 70%
    );
    top: 0;
    left: -100px;
    opacity: 0.6;
  }

  @keyframes shine {
    0% {
      left: -100px;
    }

    60% {
      left: 100%;
    }

    to {
      left: 100%;
    }
  }`;
export default ProductDetails;
