import { Nav, Badge } from 'react-bootstrap';
import { BsHeart, BsBag } from 'react-icons/bs';

const BottomNavbar = ({ cartItems }) => {
  return (
    <Nav
      className="d-flex justify-content-around align-items-center fixed-bottom bg-light border-top py-2 d-md-none"
      style={{ zIndex: 1030 }}
    >
      {/* Wishlist Icon */}
      <Nav.Link>
        <BsHeart size={24} />
      </Nav.Link>

      {/* Cart Icon with Badge */}
      <Nav.Link className="position-relative">
        <BsBag size={24} />
        {cartItems.length > 0 && (
          <Badge
            bg="dark"
            pill
            className="position-absolute top-0 start-100 translate-middle"
            style={{ fontSize: '0.6rem' }}
          >
            {cartItems.length}
          </Badge>
        )}
      </Nav.Link>

      {/* User Icon */}
      <Nav.Link>
        <img
          src="assets/user-placeholder.png"
          alt="user"
          className="rounded-circle"
          width="28"
          height="28"
        />
      </Nav.Link>
    </Nav>
  );
};

export default BottomNavbar;
