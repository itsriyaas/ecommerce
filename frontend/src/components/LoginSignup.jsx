import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { FaMobileAlt, FaEye, FaEyeSlash } from 'react-icons/fa';
import { GrGoogle } from 'react-icons/gr';

const LoginSignupModal = ({ show, handleClose }) => {
  const [formData, setFormData] = useState({ email: '', password: '', confirmPassword: '', name: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [isRegister, setIsRegister] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isRegister) {
      console.log('Register Info:', formData);
    } else {
      console.log('Login Info:', formData, 'Remember me:', remember);
    }
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Body style={{ padding: '2rem' }}>
        <div className="text-center mb-4">
          <h5 className="fw-bold">Mayukha <span style={{ letterSpacing: 2 }}>Fashion</span></h5>
          <p className="text-muted">
            {isRegister ? 'Create your account' : 'Login with your email & password'}
          </p>
        </div>

        <Form onSubmit={handleSubmit}>
          {isRegister && (
            <Form.Group className="mb-3">
              <Form.Label>Full Name <span className="text-danger">*</span></Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </Form.Group>
          )}

          <Form.Group className="mb-3">
            <Form.Label>Email <span className="text-danger">*</span></Form.Label>
            <Form.Control
              type="email"
              placeholder="customer@demo.com"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3 position-relative">
            <Form.Label>Password <span className="text-danger">*</span></Form.Label>
            <Form.Control
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              style={{ position: 'absolute', right: 10, top: '38px', cursor: 'pointer' }}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </Form.Group>

          {isRegister && (
            <Form.Group className="mb-3">
              <Form.Label>Confirm Password <span className="text-danger">*</span></Form.Label>
              <Form.Control
                type="password"
                placeholder="Re-enter password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </Form.Group>
          )}

          {!isRegister && (
            <div className="d-flex justify-content-between align-items-center mb-3">
              <Form.Check
                type="switch"
                label="Remember me"
                checked={remember}
                onChange={() => setRemember(!remember)}
              />
              <a href="#" className="text-decoration-none small">Forgot password?</a>
            </div>
          )}

          <Button variant="dark" type="submit" className="w-100 mb-3">
            {isRegister ? 'Register' : 'Login'}
          </Button>

          <div className="text-center text-muted mb-3">Or</div>

          <Button variant="primary" className="w-100 mb-2 d-flex align-items-center justify-content-center gap-2">
            <GrGoogle />
            {isRegister ? 'Sign Up With Google' : 'Login With Google'}
          </Button>

          <Button variant="dark" className="w-100 mb-3 d-flex align-items-center justify-content-center gap-2">
            <FaMobileAlt />
            {isRegister ? 'Sign Up with Mobile' : 'Login with Mobile'}
          </Button>

          <div className="text-center">
            {isRegister ? (
              <>
                <span>Already have an account? </span>
                <button
                  type="button"
                  className="fw-bold text-decoration-none btn btn-link p-0"
                  onClick={() => setIsRegister(false)}
                >
                  Login
                </button>
              </>
            ) : (
              <>
                <span>Don’t have any account? </span>
                <button
                  type="button"
                  className="fw-bold text-decoration-none btn btn-link p-0"
                  onClick={() => setIsRegister(true)}
                >
                  Register
                </button>
              </>
            )}
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default LoginSignupModal;
