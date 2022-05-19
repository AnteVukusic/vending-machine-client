import React from 'react';
import PropTypes from 'prop-types';
import '../styles/PurchasedProductCard.css';

function PurchasedProductCard({ product }) {
  return (
    <div className="purchase-card">
      <div className="purchase-card-details">
        <span className="purchase-card-name">
          {product.productName}
        </span>
      </div>
      <div className="purchase-card-costs">
        <span className="purchase-card-single-cost">Cost of product: <b>{product.cost}</b></span>
        <span className="purchase-card-amount-bought">Amount: <b>{product.amountBought}</b></span>
        <span className="purchase-card-total-cost">Total cost: <b>{product.amountBought * product.cost}</b></span>
      </div>
    </div>
  );
}

PurchasedProductCard.propTypes = {
  product: PropTypes.object.isRequired,
};

export { PurchasedProductCard };
