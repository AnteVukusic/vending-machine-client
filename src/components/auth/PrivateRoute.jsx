import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect, Route } from 'react-router-dom';
import { tokenHelper } from '../../helpers';
import { userActions } from '../../actions';
import { routes } from '../../constants';

function PrivateRoute({ component, name, ...rest }) {
  const dispatch = useDispatch();
  const isUserLoggedIn = useSelector((state) => state.user.isUserLoggedIn);
  const isTokenExpired = tokenHelper.isTokenExpired();

  useEffect(() => {
    console.log('is user logged in: ', isUserLoggedIn);
    if (!isUserLoggedIn && !isTokenExpired) {
      dispatch(userActions.fetchUserInfo());
    }
  }, [isUserLoggedIn]);

  const delegate = () => {
    if (isTokenExpired) {
      return (<Redirect to={{ pathname: routes.LOGIN }} />);
    }
    if (isUserLoggedIn) {
      return (<Route {...rest} name={name} component={component} />);
    }
    return null;
  };

  return delegate();
}

PrivateRoute.propTypes = {
  component: PropTypes.func.isRequired,
};

export { PrivateRoute };
