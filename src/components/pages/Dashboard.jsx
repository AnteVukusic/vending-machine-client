import React from 'react';
import { Card, Button, Alert } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../../actions';

function Dashboard() {
  const dispatch = useDispatch();
  const { user, error } = useSelector((state) => state.user);

  function handleLogout() {
    dispatch(userActions.logoutUser());
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Profile</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <strong>Name:</strong> {user.name}
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        <Button variant="link" onClick={handleLogout}>
          Log Out
        </Button>
      </div>
    </>
  );
}

export { Dashboard };
