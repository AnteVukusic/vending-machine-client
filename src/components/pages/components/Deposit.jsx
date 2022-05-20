import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { Alert, Button, Col, Container, Form, Modal, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../../../actions';
import { userService } from '../../../services';
import { userDepositConstants } from '../../../constants';
import '../styles/Deposit.css';

function Deposit() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const [show, setShow] = useState(false);
  const [amount, setAmount] = useState(0);
  const [err, setErr] = useState(null);
  const handleClose = () => {
    setShow(false);
    setAmount(0);
  };
  const handleShow = () => setShow(true);

  function handleSubmit(e) {
    e.preventDefault();
    userService.deposit({
      userId: user.id,
      amount,
    }).then(() => {
      dispatch(userActions.getUserData(user.id));
      handleClose();
      setAmount(0);
      toast('Deposit successfully added');
    }).catch((error) => {
      toast(error);
      setErr(error);
    });
  }

  function incrementAmount(value) {
    setAmount(amount + value);
  }

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Add deposit
      </Button>

      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Add deposit</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            {err && (
              <Row>
                <Col xs="12">
                  <Alert variant="danger">{err}</Alert>
                </Col>
              </Row>
            )}
            <Row>
              <Col xs="12">
                <Form id="deposit-form" onSubmit={handleSubmit}>
                  <Form.Group id="amount">
                    <Form.Label>Amount</Form.Label>
                    <Form.Control disabled value={amount} type="number" required />
                  </Form.Group>
                </Form>
              </Col>
            </Row>
            <Row>
              {userDepositConstants.coins.map((coin, index) => (
                <Col onClick={() => incrementAmount(coin)} key={`coin-index-${index}`}>
                  <div className="deposit-coin">
                    {coin}
                  </div>
                </Col>
              ))}
            </Row>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button type="submit" form="deposit-form" variant="primary">
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export { Deposit };
