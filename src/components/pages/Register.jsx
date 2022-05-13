import React, { useRef } from 'react';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { userActions } from '../../actions';

function Register() {
  const dispatch = useDispatch();
  const history = useHistory();
  const userState = useSelector((state) => state.user);
  const nameRef = useRef();
  const roleRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const error = null;

  async function handleSubmit(e) {
    e.preventDefault();
    dispatch(userActions.registerUser(
      {
        name: nameRef.current.value,
        password: passwordRef.current.value,
        confirmPassword: confirmPasswordRef.current.value,
        role: roleRef.current.value,
      },
      history,
    ));
  }

  return (
    <Card>
      <Card.Body>
        <h2 className="text-center mb-4">Register</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group id="name">
            <Form.Label>Name</Form.Label>
            <Form.Control type="name" ref={nameRef} required />
          </Form.Group>
          <Form.Group id="password">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" ref={passwordRef} required />
          </Form.Group>
          <Form.Group id="confirmPassword">
            <Form.Label>Confirm password</Form.Label>
            <Form.Control type="password" ref={confirmPasswordRef} required />
          </Form.Group>
          <Form.Group id="role">
            <Form.Label>Select role</Form.Label>
            <Form.Control
              as="select"
              ref={roleRef}
            >
              <option value="buyer">Buyer</option>
              <option value="seller">Seller</option>
            </Form.Control>
          </Form.Group>
          <Button
            disabled={userState.isRequestInProgress}
            className="w-100"
            type="submit"
          >
            Register
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
}

export { Register };
