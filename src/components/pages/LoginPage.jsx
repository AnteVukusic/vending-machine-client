import React, { useEffect, useRef } from 'react';
import { Form, Button, Card, Alert, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { userActions } from '../../actions';
import { routes } from '../../constants';

function LoginPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const userState = useSelector((state) => state.user);
  const nameRef = useRef();
  const passwordRef = useRef();

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

  useEffect(() => () => {
    dispatch(userActions.clearUserError());
  }, []);

  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: '100vh' }}
    >
      <div className="w-100">
        <Card style={{ width: '400px', margin: 'auto' }}>
          <Card.Body>
            <h2 className="text-center mb-4">Log In</h2>
            {userState.error && <Alert variant="danger">{userState.error}</Alert>}
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
      </div>
    </Container>
  );
}

export { LoginPage };
