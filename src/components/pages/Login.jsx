import React, { useRef } from 'react';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { userActions } from '../../actions';
import { routes } from '../../constants';

function Login() {
  const dispatch = useDispatch();
  const history = useHistory();
  const userState = useSelector((state) => state.user);
  const nameRef = useRef();
  const passwordRef = useRef();
  const error = null;

  async function handleSubmit(e) {
    e.preventDefault();
    dispatch(userActions.loginUser(
      {
        name: nameRef.current.value,
        password: passwordRef.current.value,
      },
      history,
    ));
  }

  return (
    <Card>
      <Card.Body>
        <h2 className="text-center mb-4">Log In</h2>
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
          <div className="w-100 text-center mt-3 mb-3">
            <Link to={routes.REGISTER}>Register now</Link>
          </div>
          <Button
            disabled={userState.isRequestInProgress}
            className="w-100"
            type="submit"
          >
            Log In
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
}

export { Login };
