import React, { useEffect, useState } from 'react';
import { Alert, Button, Col, Container, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { routes } from '../../constants';
import { productService } from '../../services';
import { OwnedProductCard } from './components';

function OwningProductsPage() {
  const { user } = useSelector((state) => state.user);
  const history = useHistory();
  const [products, setProducts] = useState([]);
  const [error, setError] = useState();

  useEffect(() => {
    productService.getProducts(user.id)
      .then((res) => {
        setError(null);
        setProducts(res.products);
      })
      .catch((err) => {
        toast.error(err);
        setError(err);
      });
  }, []);

  function handleAddNewProduct() {
    history.push(routes.NEW_PRODUCT);
  }

  return (
    <Container>
      <Row className="w-100 mb-3 mt-5">
        <Col>
          <span style={{ fontSize: '1.5rem', fontWeight: '600' }}>OwningProducts</span>
        </Col>
        <Col className="d-flex justify-content-end">
          <Button onClick={handleAddNewProduct} variant="primary">Add new product</Button>
        </Col>
      </Row>
      <Row className="w-100">

        {!error
          ? (
            <>
              {products.length > 0
                ? (
                  <>
                    {products.map((product, index) => (
                      <Col className="mt-3" md="4" key={`purchased-product-card-${index}`}>
                        <OwnedProductCard product={product} />
                      </Col>
                    ))}
                  </>
                ) : (
                  <Col>User owns no products</Col>
                )}
            </>
          )
          : (
            <Col xs="12">
              <Alert variant="danger">
                {error}
              </Alert>
            </Col>
          )}
      </Row>
    </Container>
  );
}

export { OwningProductsPage };
