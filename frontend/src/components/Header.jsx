import { useState } from 'react';
import { Navbar, Nav, Container, Badge } from 'react-bootstrap';
import { BsBag, BsHeart } from 'react-icons/bs';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import LoginSignupModal from './LoginSignup';

const Header = () => {
  const navigate = useNavigate();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [expanded, setExpanded] = useState(false); // <-- control navbar open/close

  const cartItems = useSelector((state) => state.cart?.items || []);

  const handleClick = (category) => {
    navigate(`/all-products?category=${category}`);
    setExpanded(false); // <-- collapse menu after click
  };

  return (
    <Container>
      <Navbar
        expand="lg"
        bg="white"
        fixed="top"
        className="shadow-sm"
        expanded={expanded}
        onToggle={setExpanded}
      >
        <Container fluid className="px-3">
          {/* Logo */}
          <Navbar.Brand as={Link} to="/" className="fw-bold text-uppercase">
            MAYURI <span className="fw-light fs-6">Fashion</span>
          </Navbar.Brand>
  
          {/* Toggle */}
          <Navbar.Toggle aria-controls="main-navbar" />
  
          {/* Collapse content */}
          <Navbar.Collapse id="main-navbar" className="justify-content-between">
            {/* Center Nav */}
            <Nav className="tabs mx-auto gap-1 text-dark">
              <Nav.Link onClick={() => handleClick('mens-shirts')}>Men Wear</Nav.Link>
              <Nav.Link onClick={() => handleClick('womens-dresses')}>Women Wear</Nav.Link>
              <Nav.Link onClick={() => handleClick('mens-shirts')}>Casual Wear</Nav.Link>
              <Nav.Link onClick={() => handleClick('mens-shirts')}>Kids Wear</Nav.Link>
              <Nav.Link as={Link} to="/allproducts" onClick={() => setExpanded(false)}>Search</Nav.Link>
            </Nav>
  
            {/* Right Icons */}
           <Nav
  className="align-items-center gap-3 flex-nowrap overflow-auto d-md-flex d-none"
  style={{ whiteSpace: 'nowrap' }}
>
  <Nav.Link as={Link} to="/wishlist" onClick={() => setExpanded(false)}>
    <BsHeart size={25} />
  </Nav.Link>
  <Nav.Link className="position-relative" as={Link} to="/cart" onClick={() => setExpanded(false)}>
    <BsBag size={25} />
    {cartItems.length > 0 && (
      <Badge bg="dark" pill className="position-absolute top-10 start-100 translate-middle">
        {cartItems.length}
      </Badge>
    )}
  </Nav.Link>
  <Nav.Link onClick={() => {
    setShowAuthModal(true);
    setExpanded(false);
  }}>
    <img
      src="assets/user-placeholder.png"
      alt="user"
      className="rounded-circle"
      width="32"
      height="32"
    />
  </Nav.Link>
</Nav>

          </Navbar.Collapse>
        </Container>
  
        <LoginSignupModal
          show={showAuthModal}
          handleClose={() => setShowAuthModal(false)}
        />
      </Navbar>
    </Container>
  );
};

export default Header;
