import React from 'react';
import { Nav, Badge, Container } from 'react-bootstrap';
import { BsBag, BsHeart, BsPerson } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const MobileBottomNav = ({ onProfileClick }) => {
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart?.items || []);

  return (
    <Container>
        <Nav className="mobile-bottom-nav d-flex justify-content-around align-items-center d-md-none">
          <Nav.Link onClick={() => navigate('/wishlist')}>
            <BsHeart size={22} />
          </Nav.Link>
    
          <Nav.Link onClick={() => navigate('/cart')} className="position-relative">
            <BsBag size={22} />
            {cartItems.length > 0 && (
              <Badge pill bg="dark" className="position-absolute top-0 start-100 translate-middle">
                {cartItems.length}
              </Badge>
            )}
          </Nav.Link>
    
          <Nav.Link onClick={onProfileClick}>
            <BsPerson size={22} />
          </Nav.Link>
        </Nav>
    </Container>
  );
};

export default MobileBottomNav;
