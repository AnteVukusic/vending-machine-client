import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { routes } from '../../constants/routes';
import { PrivateRoute } from '../auth';
import { Dashboard, LoginPage, RegisterPage } from '../pages';

function Routes() {
  return (
    <Router>
      <Switch>
        <Route exact path={routes.LOGIN} component={LoginPage} />
        <Route exact path={routes.REGISTER} component={RegisterPage} />
        <PrivateRoute path={routes.DASHBOARD} component={Dashboard} />
      </Switch>
    </Router>
  );
}

export { Routes };
