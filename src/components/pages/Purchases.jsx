import React from 'react';
import { useSelector } from 'react-redux';
import { userHelper } from '../../helpers/userHelper';
import { PurchasedProductCard } from './components';

function Purchases() {
  const { user } = useSelector((state) => state.user);
  return (
    <>
      {userHelper.getUserProductsList(user).map((product, index) => (
        <PurchasedProductCard key={`purchased-product-card-${index}`} product={product} />
      ))}
    </>
  );
}

export { Purchases };
