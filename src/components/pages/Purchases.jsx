import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { userHelper } from '../../helpers/userHelper';
import { PurchasedProductCard } from './components';

function Purchases() {
  const { user } = useSelector((state) => state.user);
  return (
    <Container>
      <Row className="w-100 mb-3 mt-5">
        <Col>
          <span style={{ fontSize: '1.5rem', fontWeight: '600' }}>Purchases</span>
        </Col>
      </Row>
      <Row className="w-100">
        {userHelper.getUserProductsList(user).map((product, index) => (
          <Col md="4" key={`purchased-product-card-${index}`}>
            <PurchasedProductCard product={product} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export { Purchases };
