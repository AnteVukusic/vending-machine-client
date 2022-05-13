import React from 'react';
import { Button, Container, Nav, Navbar } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../../../actions';

function Navigation() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  function handleLogout() {
    dispatch(userActions.logoutUser());
  }

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand>Vending machine</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Navbar.Text>
            Logged as {user.name}
          </Navbar.Text>
          <Nav.Item>
            <Button variant="link" onClick={handleLogout}>
              Log Out
            </Button>
          </Nav.Item>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export { Navigation };
