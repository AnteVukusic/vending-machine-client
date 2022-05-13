import React from 'react';
import { Switch } from 'react-router-dom';
import { routes } from '../../constants';
import { PrivateRoute } from '../auth';
import { MainLayout } from './components';
import { Machine } from './Machine';
import { Purchases } from './Purchases';

function Dashboard() {
  return (
    <MainLayout>
      <Switch>
        <PrivateRoute exact path={routes.DASHBOARD} component={Purchases} />
        <PrivateRoute exact path={routes.PURCHASES} component={Purchases} />
        <PrivateRoute exact path={routes.MACHINE} component={Machine} />
      </Switch>
    </MainLayout>
  );
}

export { Dashboard };
