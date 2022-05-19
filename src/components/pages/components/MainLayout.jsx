import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Navigation } from './Navigation';
import { userActions } from '../../../actions';
import { tokenHelper } from '../../../helpers';

function MainLayout({ children }) {
  const dispatch = useDispatch();
  const isUserLoggedIn = useSelector((state) => state.user.isUserLoggedIn);
  useEffect(() => {
    if (!isUserLoggedIn) {
      dispatch(userActions.getUserData(tokenHelper.getUserIdFromToken()));
    }
  }, [isUserLoggedIn]);

  return isUserLoggedIn ? (
    <>
      <Navigation />
      <Container className="d-flex">
        {children}
      </Container>
    </>
  ) : null;
}

MainLayout.propTypes = {
  children: PropTypes.any.isRequired,
};

export { MainLayout };
