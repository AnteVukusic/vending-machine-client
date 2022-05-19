import React, { useEffect, useState } from 'react';
import { Alert, Col, Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { userActions } from '../../actions/userActions';
import { productService } from '../../services';
import { Deposit } from './components';
import './styles/MachinePage.css';

function MachinePage() {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [inputedAmount, setInputedAmount] = useState(0);
  const [err, setErr] = useState(null);

  function fetchProducts() {
    productService.getProducts()
      .then((res) => {
        setProducts(res.products);
        setErr(null);
      })
      .catch((error) => {
        setErr(error);
      });
  }

  function buyItems() {
    productService.buyProducts({
      moneyCount: inputedAmount,
      products: selectedItems.map((si) => ({
        productId: si.product._id,
        amount: si.amount,
      })),
    }).then(() => {
      fetchProducts();
      dispatch(userActions.getUserData(user.id));
      setInputedAmount(0);
      setSelectedItems([]);
      toast('Products sucessfully bought!');
      setErr(null);
    })
      .catch((error) => {
        setErr(error);
      });
  }

  function selectItem(item, incrementor) {
    const selectedItem = selectedItems.find((si) => si.product._id === item._id);
    if (!selectedItem) {
      return setSelectedItems([...selectedItems, { product: item, amount: 1 }]);
    }
    if (selectedItem.amount === 1 && incrementor === -1) {
      return setSelectedItems(selectedItems.filter((si) => si.product._id !== item._id));
    }
    return setSelectedItems(selectedItems.map((si) => {
      if (si.product._id !== item._id) return si;
      return {
        ...si,
        amount: si.amount + incrementor,
      };
    }));
  }

  function incrementInputAmount(value) {
    setInputedAmount(inputedAmount + value);
  }

  function resetInputedAmount() {
    setInputedAmount(0);
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <Container>
      <Row className="w-100 mb-3 mt-5">
        <Col>
          <span style={{ fontSize: '1.5rem', fontWeight: '600' }}>Machine</span>
        </Col>
        <Col xs="6" className="d-flex justify-content-end">
          <Deposit />
        </Col>
      </Row>
      <Row className="w-100">
        <Col xs={12} className="d-flex justify-content-center">
          {err && (
          <Alert style={{ maxWidth: '600px' }} variant="danger">{err}</Alert>
          )}
        </Col>
        <Col xs={12} className="d-flex justify-content-center">

          <div className="vm-container">
            <div className="vm-items">
              {products && (
                <>
                  {products.map((p, i) => {
                    const selectedItem = selectedItems.find((si) => si.product._id === p._id);
                    return (
                      (
                        <div key={`${p.productName}-${i}`} className={`vm-item ${selectedItem ? 'selected' : ''}`}>
                          <span><b>{p.productName}</b></span>
                          <span>Stock: {p.amount}</span>
                          <span>Cost: <b>{p.cost}</b></span>
                          <div className="vm-item-incrementors">
                            <div className={`vm-item-decrement ${!selectedItem || (selectedItem && selectedItem.amount === 0) ? 'disabled' : ''}`} onClick={() => selectItem(p, -1)}>-</div>
                            <div className={`vm-item-increment ${selectedItem && selectedItem.amount >= p.amount ? 'disabled' : ''}`} onClick={() => selectItem(p, 1)}>+</div>
                          </div>
                          {selectedItem && (
                            <div className="vm-item-amount-selected">
                              Amount: <b>{selectedItem.amount}</b>
                            </div>
                          )}
                        </div>
                      )
                    );
                  })}
                </>
              )}
            </div>
            <div className="vm-deposit-box">
              <div className="vm-deposit-box-amount">
                {inputedAmount}
              </div>
              <div className="vm-deposit-box-coins">
                {[5, 10, 15, 20, 25].map((value, index) => (
                  <div onClick={() => incrementInputAmount(value)} key={index} className="vm-deposit-box-coins-item">
                    {value}
                  </div>
                ))}
              </div>
              <div className="vm-deposit-box-reset" onClick={resetInputedAmount}>
                Return money
              </div>
              <div onClick={buyItems} className="vm-deposit-box-buy">
                Buy
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export { MachinePage };
