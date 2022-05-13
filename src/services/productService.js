import { serviceHelper } from '../helpers';

const postProduct = (productData) => {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(productData),
  };
  return serviceHelper.openFetch(`${process.env.REACT_APP_API_URL}/product/add-product`, requestOptions).then(serviceHelper.handleResponse);
};

const putProduct = (productData) => {
  const requestOptions = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(productData),
  };
  return serviceHelper.openFetch(`${process.env.REACT_APP_API_URL}/product/update-product`, requestOptions).then(serviceHelper.handleResponse);
};

const getProducts = () => {
  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };
  return serviceHelper.authFetch(`${process.env.REACT_APP_API_URL}/product/get-products`, requestOptions).then(serviceHelper.handleResponse);
};

const getProduct = (productId) => {
  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };
  return serviceHelper.authFetch(`${process.env.REACT_APP_API_URL}/product/get-product/${productId}`, requestOptions).then(serviceHelper.handleResponse);
};

const deleteProduct = (productId) => {
  const requestOptions = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  };
  return serviceHelper.authFetch(`${process.env.REACT_APP_API_URL}/product/get-product/${productId}`, requestOptions).then(serviceHelper.handleResponse);
};

const buyProducts = (purchaceData) => {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(purchaceData),
  };
  return serviceHelper.openFetch(`${process.env.REACT_APP_API_URL}/product/buy`, requestOptions).then(serviceHelper.handleResponse);
};

export const productService = {
  postProduct,
  putProduct,
  deleteProduct,
  getProduct,
  getProducts,
  buyProducts,
};
