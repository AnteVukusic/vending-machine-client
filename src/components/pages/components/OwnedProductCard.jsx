import React from 'react';
import PropTypes from 'prop-types';
import '../styles/OwnedProductCard.css';

function OwnedProductCard({ product }) {
  return (
    <div className="owned-card">
      <div className="owned-card-details">
        <span className="owned-card-name">
          {product.productName}
        </span>
      </div>
      <div className="owned-card-costs-stock">
        <span className="owned-card-single-cost">Cost of product: <b>{product.cost}</b></span>
        <span className="owned-card-amount-stock">Amount on stock: <b>{product.amount}</b></span>
        <span className="owned-card-created-at">Created at: {new Date(product.createdAt).toLocaleDateString('en-GB')}</span>
      </div>
    </div>
  );
}

OwnedProductCard.propTypes = {
  product: PropTypes.object.isRequired,
};

export { OwnedProductCard };
