import React from 'react';
import { useSelector } from 'react-redux';
import { Switch } from 'react-router-dom';
import { routes } from '../../constants';
import { roles } from '../../constants/roleConstants';
import { PrivateRoute } from '../auth';
import { MainLayout } from './components';
import { MachinePage, NewProductPage, OwningProductsPage, PurchasesPage } from '.';

function Dashboard() {
  const { user } = useSelector((state) => state.user);
  function getRouterByRole() {
    switch (user.role) {
      case roles.BUYER:
        return (
          <>
            <PrivateRoute exact path={routes.DASHBOARD} component={PurchasesPage} />
            <PrivateRoute exact path={routes.PURCHASES} component={PurchasesPage} />
            <PrivateRoute exact path={routes.MACHINE} component={MachinePage} />
          </>
        );
      case roles.SELLER:
        return (
          <>
            <PrivateRoute exact path={routes.DASHBOARD} component={OwningProductsPage} />
            <PrivateRoute exact path={routes.OWNING_PRODUCTS} component={OwningProductsPage} />
            <PrivateRoute exact path={routes.NEW_PRODUCT} component={NewProductPage} />
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
