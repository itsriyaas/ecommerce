import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const products = [
  {
    id: 1,
    title: 'Zara Monte Carlo',
    image: 'https://i.pinimg.com/736x/7c/48/ee/7c48ee432632dbe0326e37c62bf50631.jpg',
    price: '₹1500 - ₹2200',
  },
  {
    id: 2,
    title: 'Zara Miss Chase',
    image: 'https://assetscdn1.paytm.com/images/catalog/product/A/AP/APPMISS-CHASE-CMISS20070E08D553B/1563022537247_0..jpg',
    price: '₹1200',
    oldPrice: '₹2500',
  },
  {
    id: 3,
    title: 'White Oxford Shirt',
    image: 'https://i.pinimg.com/originals/97/be/0f/97be0fddd46ec910c9e6db8ed5c5588f.png',
    price: '₹2000 - ₹3500',
  },
  {
    id: 4,
    title: 'The Horse Original',
    image: 'https://i.pinimg.com/736x/dc/8a/56/dc8a56cd473bbf4ce05b87dbacae2b29.jpg',
    price: '₹1500',
    oldPrice: '₹2000',
  },
  {
    id: 5,
    title: 'Women Round Neck',
    image: 'https://assets.myntassets.com/dpr_1.5,q_60,w_400,c_limit,fl_progressive/assets/images/11697274/2020/6/16/ebb4db93-d8e9-4ff6-880f-54d7b2cbe5651592279968625-Roadster-Women-Tops-6561592279967201-1.jpg',
    price: '₹1500 - ₹2000 ',
  },
  {
    id: 6,
    title: 'Kids',
    image: 'https://cstor.nn2.ru/forum/data/forum/images/2015-11/133146646-g_01.20.01_atie-rubaka_goluboi_1.jpg',
    price: '₹1500 - ₹2000 ',
  },
];

const NewArrivals = () => {
  return (
    <Container className="my-5">
      <h3 className="mb-4">New Arrivals</h3>
      <Row className="g-4">
        {products.map((product) => (
          <Col key={product.id} xs={12} sm={6} md={4} lg={3} xl={2}>
            <Link to={"/allproducts"} style={{textDecoration:"none"}}>
                <Card className="h-100 border-0">
                  <Card.Img variant="top" src={product.image} className="rounded" />
                  <Card.Body className="p-2">
                    <Card.Title className="h6 mb-1">{product.title}</Card.Title>
                    <div>
                      <strong>{product.price}</strong>{' '}
                      {product.oldPrice && (
                        <span className="text-muted text-decoration-line-through">
                          {product.oldPrice}
                        </span>
                      )}
                    </div>
                  </Card.Body>
                </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default NewArrivals;
