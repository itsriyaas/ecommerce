import React, { useEffect, useState } from 'react';
import {
  Container, Row, Col, Form, Button,
  Spinner, Offcanvas
} from 'react-bootstrap';
import axios from 'axios';
import { BsHeart, BsBag, BsFilter } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';

const ProductsPage = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [products, setProducts] = useState([]);
  const [displayed, setDisplayed] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [brandFilter, setBrandFilter] = useState('');
  const [ratingFilter, setRatingFilter] = useState(0);
  const [sortOption, setSortOption] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);

  const itemsPerPage = 8;

  useEffect(() => {
    setLoading(true);
    axios.get('https://dummyjson.com/products?limit=100')
      .then(res => {
        setProducts(res.data.products);
        setDisplayed(res.data.products);
      })
      .catch(err => {
        console.error("Failed to fetch products:", err);
        setError('Failed to load products. Please try again.');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    let filtered = products;

    if (searchTerm) {
      filtered = filtered.filter(p => p.title.toLowerCase().includes(searchTerm.toLowerCase()));
    }
    if (categoryFilter) {
      filtered = filtered.filter(p => p.category === categoryFilter);
    }
    if (brandFilter) {
      filtered = filtered.filter(p => p.brand === brandFilter);
    }
    if (ratingFilter > 0) {
      filtered = filtered.filter(p => p.rating >= ratingFilter);
    }

    if (sortOption === 'low') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortOption === 'high') {
      filtered.sort((a, b) => b.price - a.price);
    }

    setDisplayed(filtered);
    setCurrentPage(1);
  }, [searchTerm, categoryFilter, brandFilter, ratingFilter, sortOption, products]);

  const uniqueCategories = [...new Set(products.map(p => p.category))];
  const uniqueBrands = [...new Set(products.map(p => p.brand))];
  const paginatedItems = displayed.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const totalPages = Math.ceil(displayed.length / itemsPerPage);

  const FilterPanel = (
    <>
      <Container>
          <h5 className="mb-3">Filters</h5>
    
          <Form.Group className="mb-3">
            <Form.Label>Category</Form.Label>
            {uniqueCategories.map((cat, idx) => (
              <Form.Check
                key={idx}
                type="radio"
                label={cat}
                checked={categoryFilter === cat}
                onChange={() => setCategoryFilter(cat)}
              />
            ))}
          </Form.Group>
    
          <Form.Group className="mb-3">
            <Form.Label>Brands</Form.Label>
            {uniqueBrands.map((brand, idx) => (
              <Form.Check
                key={idx}
                type="radio"
                label={brand}
                checked={brandFilter === brand}
                onChange={() => setBrandFilter(brand)}
              />
            ))}
          </Form.Group>
    
          <Form.Group className="mb-3">
            <Form.Label>Minimum Rating</Form.Label>
            <Form.Range
              min={0}
              max={5}
              step={0.5}
              value={ratingFilter}
              onChange={e => setRatingFilter(parseFloat(e.target.value))}
            />
            <div>{ratingFilter} ★ & above</div>
          </Form.Group>
    
          <Button variant="outline-secondary" size="sm" onClick={() => {
            setSearchTerm('');
            setCategoryFilter('');
            setBrandFilter('');
            setRatingFilter(0);
          }}>Clear All</Button>
      </Container>
    </>
  );

  return (
    <Container fluid className="py-4">
      <Row>
        {/* Filter Toggle Button (Visible on Small Screens) */}
        <Col xs={12} className="d-md-none mb-3 text-end">
          <Button variant="outline-dark" size="sm" onClick={() => setShowFilters(true)}>
            <BsFilter /> Filters
          </Button>
        </Col>
        <Form.Group className="mb-3 mt-5">
            <Form.Label>Search</Form.Label>
            <Form.Control
              type="text"
              placeholder="Search products"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </Form.Group>

        {/* Filters Sidebar - Only Visible on Desktop */}
        <Col md={3} className="d-none d-md-block">
          {FilterPanel}
        </Col>

        {/* Product Grid */}
        <Col md={9}>
          <Row className="mb-3 justify-content-between">
            <Col xs="auto">
              <strong>{displayed.length} items found</strong>
            </Col>
            <Col xs="auto">
              <Form.Select size="sm" onChange={e => setSortOption(e.target.value)} value={sortOption}>
                <option value="">Sort by</option>
                <option value="low">Price: Low to High</option>
                <option value="high">Price: High to Low</option>
              </Form.Select>
            </Col>
          </Row>

          {loading ? (
            <div className="text-center">
              <Spinner animation="border" variant="primary" />
            </div>
          ) : (
            <Row>
              {paginatedItems.map(product => (
                <Col sm={6} md={4} lg={3} key={product.id} className="mb-4">
                  <div
                    className="border p-2 h-100 d-flex flex-column product-card"
                    style={{ cursor: 'pointer' }}
                    onClick={() => navigate(`/product/${product.id}`)}
                  >
                    <img
                      src={product.thumbnail}
                      alt={product.title}
                      className="img-fluid mb-2"
                      style={{ height: '200px', objectFit: 'cover', width: '100%' }}
                    />
                    <h6 className="mb-1">{product.title}</h6>
                    <p className="mb-1"><strong>${product.price}</strong></p>
                    <small className="text-muted mb-1"><del>${(product.price + 20).toFixed(2)}</del></small>
                    <small className="text-warning">{product.rating} ★</small>
                    <div className="mt-auto d-flex justify-content-between pt-2">
                      <Button size="sm" variant="outline-primary"><BsHeart /></Button>
                      <Button size="sm" variant="dark"><BsBag /></Button>
                    </div>
                  </div>
                </Col>
              ))}
            </Row>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="d-flex justify-content-center mt-4">
              {[...Array(totalPages)].map((_, idx) => (
                <Button
                  key={idx}
                  variant={currentPage === idx + 1 ? 'primary' : 'outline-secondary'}
                  size="sm"
                  className="mx-1"
                  onClick={() => setCurrentPage(idx + 1)}
                >
                  {idx + 1}
                </Button>
              ))}
            </div>
          )}
        </Col>
      </Row>

      {/* Offcanvas Filter for Mobile View */}
      <Offcanvas show={showFilters} onHide={() => setShowFilters(false)} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Filters</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {FilterPanel}
        </Offcanvas.Body>
      </Offcanvas>
    </Container>
  );
};

export default ProductsPage;
