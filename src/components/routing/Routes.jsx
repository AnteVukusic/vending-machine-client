import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { routes } from '../../constants/routes';
import { PrivateRoute } from '../auth';
import { Dashboard, Login, Register } from '../pages';

function Routes() {
  return (
    <Router>
      <Switch>
        <PrivateRoute exact path={routes.DASHBOARD} component={Dashboard} />
        <Route path={routes.LOGIN} component={Login} />
        <Route path={routes.REGISTER} component={Register} />
      </Switch>
    </Router>
  );
}

export { Routes };
