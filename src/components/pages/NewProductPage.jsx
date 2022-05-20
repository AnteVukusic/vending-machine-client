import React, { useRef, useState } from 'react';
import { Alert, Button, Col, Form, Row } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { routes } from '../../constants';

import { productService } from '../../services';

function NewProductPage() {
  const history = useHistory();
  const [isRequestInProgress, setIsRequestInProgress] = useState(false);
  const [error, setError] = useState(null);

  const productNameRef = useRef();
  const amountRef = useRef();
  const costRef = useRef();

  function handleSubmit(e) {
    e.preventDefault();
    setIsRequestInProgress(true);
    productService.postProduct({
      productName: productNameRef.current.value,
      cost: parseInt(costRef.current.value, 10),
      amount: parseInt(amountRef.current.value, 10),
    })
      .then(() => {
        toast(`Product ${productNameRef.current.value} successfully added`);
        setIsRequestInProgress(false);
        history.push(routes.OWNING_PRODUCTS);
      })
      .catch((err) => {
        setIsRequestInProgress(false);
        setError(err);
        toast.error(err);
      });
  }

  return (
    <Row className="w-100 mt-5 mb-3">
      <Col>
        <span style={{ fontSize: '1.5rem', fontWeight: '600' }}>Add new products</span>
      </Col>
      <Col xs="12" className="mt-3">
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group id="productName">
            <Form.Label>Product name</Form.Label>
            <Form.Control type="text" ref={productNameRef} required />
          </Form.Group>
          <Form.Group id="amount">
            <Form.Label>Stock amount</Form.Label>
            <Form.Control type="number" ref={amountRef} required />
          </Form.Group>
          <Form.Group id="cost">
            <Form.Label>Cost</Form.Label>
            <Form.Control type="number" ref={costRef} required />
          </Form.Group>
          <Button
            disabled={isRequestInProgress}
            className="w-100"
            type="submit"
          >
            Add new product
          </Button>
        </Form>
      </Col>
    </Row>
  );
}

export { NewProductPage };
