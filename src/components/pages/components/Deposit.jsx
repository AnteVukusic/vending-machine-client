import React, { useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { Alert, Button, Col, Container, Form, Modal, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../../../actions';
import { userService } from '../../../services';

function Deposit() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const [show, setShow] = useState(false);
  const amountRef = useRef();
  const [err, setErr] = useState(null);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  function handleSubmit(e) {
    e.preventDefault();
    userService.deposit({
      userId: user.id,
      amount: parseInt(amountRef.current.value, 10),
    }).then(() => {
      dispatch(userActions.getUserData(user.id));
      handleClose();
      toast('Deposit successfully added');
    }).catch((error) => {
      toast(error);
      setErr(error);
    });
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
                    <Form.Control type="number" ref={amountRef} required />
                  </Form.Group>
                </Form>
              </Col>
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
