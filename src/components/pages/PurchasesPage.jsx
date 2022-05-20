import React, { useEffect, useState } from 'react';
import { Alert, Col, Container, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { userHelper } from '../../helpers/userHelper';
import { userService } from '../../services';
import { Deposit, PurchasedProductCard, WithDraw } from './components';

function PurchasesPage() {
  const { user } = useSelector((state) => state.user);
  const [purchases, setPurchases] = useState([]);
  const [err, setErr] = useState(null);

  useEffect(() => {
    userService.getUserPurchases(user.id)
      .then((res) => {
        setPurchases(res.purchases);
        setErr(null);
      })
      .catch((error) => {
        setErr(error);
      });
  }, []);

  return (
    <Container>
      {err && (
        <Row>
          <Col span="12">
            <Alert variant="danger">
              {err}
            </Alert>
          </Col>
        </Row>
      )}
      <Row className="w-100 mb-3 mt-5">
        <Col xs="6">
          <span style={{ fontSize: '1.5rem', fontWeight: '600' }}>Purchases</span>
        </Col>
        <Col xs="6">
          <Row className="d-flex justify-content-end">
            <Col xs="auto">
              <Deposit />
            </Col>
            <Col xs="auto">
              <WithDraw />
            </Col>
          </Row>
        </Col>
      </Row>
      <Row className="w-100">
        {userHelper.getUserProductsList(purchases).map((product, index) => (
          <Col md="4" key={`purchased-product-card-${index}`}>
            <PurchasedProductCard product={product} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export { PurchasesPage };
