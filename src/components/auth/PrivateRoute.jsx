import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route } from 'react-router-dom';
import { tokenHelper } from '../../helpers';
import { routes } from '../../constants';

function PrivateRoute({ component, name, ...rest }) {
  const isTokenExpired = tokenHelper.isTokenExpired();

  const delegate = () => {
    if (isTokenExpired) {
      return (<Redirect to={{ pathname: routes.LOGIN }} />);
    }
    return (<Route {...rest} name={name} component={component} />);
  };

  return delegate();
}

PrivateRoute.propTypes = {
  component: PropTypes.func.isRequired,
};

export { PrivateRoute };
