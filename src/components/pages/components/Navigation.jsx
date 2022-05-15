import React from 'react';
import { Button, Container, Nav, Navbar } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../../../actions';
import { routes } from '../../../constants';
import { roles } from '../../../constants/roleConstants';

function Navigation() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  function handleLogout() {
    dispatch(userActions.logoutUser());
  }

  function getNavbarByRole() {
    switch (user.role) {
      case roles.BUYER:
        return (
          <>
            <Navbar.Collapse id="basic-navbar-nav" className="justify-content-start">
              <Nav>
                <Nav.Item>
                  <Nav.Link href={routes.PURCHASES}>
                    Purchases
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link href={routes.MACHINE}>
                    Machine
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </Navbar.Collapse>
            <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
              <Navbar.Text style={{ marginRight: '1rem' }}>
                Logged as {user.name}
              </Navbar.Text>
              <Navbar.Text>
                Deposit: ${user.deposit}
              </Navbar.Text>
              <Nav.Item>
                <Button variant="link" onClick={handleLogout}>
                  Log Out
                </Button>
              </Nav.Item>
            </Navbar.Collapse>
          </>
        );
      case roles.SELLER:
        return (
          <>
            <Navbar.Collapse id="basic-navbar-nav" className="justify-content-start">
              <Nav>
                <Nav.Item>
                  <Nav.Link href={routes.OWNING_PRODUCTS}>
                    Your products
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </Navbar.Collapse>
            <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
              <Navbar.Text style={{ marginRight: '1rem' }}>
                Logged as {user.name}
              </Navbar.Text>
              <Nav.Item>
                <Button variant="link" onClick={handleLogout}>
                  Log Out
                </Button>
              </Nav.Item>
            </Navbar.Collapse>
          </>
        );
      default:
        return null;
    }
  }

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand>Vending machine</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        {getNavbarByRole()}
      </Container>
    </Navbar>
  );
}

export { Navigation };
