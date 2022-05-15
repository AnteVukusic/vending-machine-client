import React from 'react';
import { useSelector } from 'react-redux';
import { Switch } from 'react-router-dom';
import { routes } from '../../constants';
import { roles } from '../../constants/roleConstants';
import { PrivateRoute } from '../auth';
import { MainLayout } from './components';
import { Machine, NewProduct, OwningProducts, Purchases } from '.';

function Dashboard() {
  const { user } = useSelector((state) => state.user);
  function getRouterByRole() {
    switch (user.role) {
      case roles.BUYER:
        return (
          <>
            <PrivateRoute exact path={routes.DASHBOARD} component={Purchases} />
            <PrivateRoute exact path={routes.PURCHASES} component={Purchases} />
            <PrivateRoute exact path={routes.MACHINE} component={Machine} />
          </>
        );
      case roles.SELLER:
        return (
          <>
            <PrivateRoute exact path={routes.DASHBOARD} component={OwningProducts} />
            <PrivateRoute exact path={routes.OWNING_PRODUCTS} component={OwningProducts} />
            <PrivateRoute exact path={routes.NEW_PRODUCT} component={NewProduct} />
          </>
        );
      default:
        return null;
    }
  }
  return (
    <MainLayout>
      <Switch>
        {getRouterByRole()}
      </Switch>
    </MainLayout>
  );
}

export { Dashboard };
