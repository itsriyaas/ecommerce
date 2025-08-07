import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Row, Col, Button, Image, Form } from 'react-bootstrap';
import {
  increaseQty,
  decreaseQty,
  removeFromCart
} from '../redux/cartSlice';

const CartPage = () => {
  const cartItems = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  const handleQuantityChange = (id, delta) => {
    if (delta > 0) dispatch(increaseQty(id));
    else dispatch(decreaseQty(id));
  };

  const handleRemove = (id) => dispatch(removeFromCart(id));

  const getTotal = () => {
    return cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2);
  };

  return (
    <Container className="py-4">
      <h3 className="mb-4">Your Cart</h3>
      {cartItems.length === 0 ? (
        <>
            <div className='d-flex justify-content-center align-items-center'>
                <img src="https://yandex-images.clstorage.net/Wk9h7O372/c74f97U7FI/VVADrLPcbhz-NNM5syi4IoGLkFqk7HMz3Y63A2DlPlDON4ZLrFp3uehd7Vu-vSJ9LrvDt2i127rSIvF5-Bj8EREDR-D5m3lGqnLIbbsrvSCc1tNLuLZ3bsfM61xyvzZYnjy8J4t9DdaXa8YulMJiKiPulaog44PktB_jJIIUyWJvcz-ltsAMOMk-hzWHJZEiq_O1XJ2Md0_CnutTYOICAO1dsQKwbD7zmXH7AovedxIC3JuhXPWvxI0QgQ6YP9FiRl4Av7HnBDT5M5oJnz-5PYv_n0a-q31a3p_sQUnTNhziXZY5pX8Jw4JI6A6W9WoFNfyUpV7BosKbC5Y8jxH4ZGd1AIuF3AYf1QGHFIAKii6AwbxWkqRtZOKLy1lb7z4q1WCSN7p-B-q-beYOp81qJwHlu7dv4bn6kRqLGbo_5GZmejOrjOkHEM0isg2fL4gXsNCfbKmRV17msuxpbsEVMOxGqDySfQjBrk_lJ7vjVA8h3qq5Wsyr3bgtsSKfFNRrb3Ivqbj3ARrSFrs4qCu3AYPknEeTjlFC-LrOaXvWNCzebbY6u1M48ahV3SaZx24pI-W_hFbxmeSuLaUEtyXGYXBpMK-N4SE81jeVIbMjhSWO34pau4dcaMaO-1R7yQgi_0CoCJpXAOCBdsM8pM5YLz7rs4RMz67thQyIA6ge72ZgRgOqqesQFOs_ugKBEpUOssKOUba7Smf2jPxjYcoAKdxGkjSPezvjjnz5I5T8XgoI_oGgZtS_0L0qlAWABdRcW381orfeITD8EpANmSSKCIvDq26es3Vu8J3fQlLSOhHXf6IfpFY74p1SyDGR6UkJO-CTkH_PqM-ADqocjCTWand7IKOP5BA53ACwIqsMiAqbx7Bqu69IW86ZyHZB5S8wxmuGO4FUBcKyePszju9THT7EobhA1Z3oqRWpOqgu91loVSa1juYnIfQxryW3CYkCnfW1W6CMTnvniM98c8U" alt="" />
                </div>
                <p className='text-center'>Your cart is empty !</p>
        </>
       
      ) : (
        <Container>
          <Row>
            {cartItems.map(item => (
              <Col xs={12} className="mb-3" key={item.id}>
                <Row className="align-items-center border p-3 rounded">
                  <Col xs={4} md={2}>
                    <Image src={item.thumbnail} fluid rounded />
                  </Col>
                  <Col xs={8} md={4}>
                    <h6>{item.title}</h6>
                    <p className="mb-1 text-muted">${item.price}</p>
                  </Col>
                  <Col xs={6} md={3} className="d-flex align-items-center">
                    <Button
                      variant="outline-secondary"
                      size="sm"
                      onClick={() => handleQuantityChange(item.id, -1)}
                    >−</Button>
                    <Form.Control
                      value={item.quantity}
                      readOnly
                      className="mx-2 text-center"
                      style={{ width: '50px' }}
                    />
                    <Button
                      variant="outline-secondary"
                      size="sm"
                      onClick={() => handleQuantityChange(item.id, 1)}
                    >+</Button>
                  </Col>
                  <Col xs={6} md={2}>
                    <strong>${(item.price * item.quantity).toFixed(2)}</strong>
                  </Col>
                  <Col xs={12} md={1}>
                    <Button variant="danger" size="sm" onClick={() => handleRemove(item.id)}>Remove</Button>
                  </Col>
                </Row>
              </Col>
            ))}
          </Row>

          <Row className="mt-4">
            <Col md={{ span: 4, offset: 8 }}>
              <h5>Total: ${getTotal()}</h5>
              <Button variant="success" className="w-100">Checkout</Button>
            </Col>
          </Row>
        </Container>
      )}
    </Container>
  );
};

export default CartPage;
