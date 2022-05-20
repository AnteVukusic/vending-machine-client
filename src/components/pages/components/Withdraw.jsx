import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { Alert, Button, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../../../actions';
import { userService } from '../../../services';

function WithDraw() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [err, setErr] = useState(null);

  function handleSubmit() {
    userService.reset({ userId: user.id })
      .then(() => {
        dispatch(userActions.getUserData(user.id));
        handleClose();
        toast('Deposit successfully withdrawn');
      }).catch((error) => {
        toast(error);
        setErr(error);
      });
  }

  return (
    <>
      <Button disabled={user.deposit < 1} variant="primary" onClick={handleShow}>
        Withdraw
      </Button>

      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Withdraw deposit from your account?</Modal.Title>
        </Modal.Header>
        {err && (
          <Modal.Body>
            {err && (<Alert variant="danger">{err}</Alert>)}
          </Modal.Body>
        )}
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button type="button" variant="primary" onClick={handleSubmit}>
            Withdraw
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export { WithDraw };
