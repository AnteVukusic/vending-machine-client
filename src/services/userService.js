import { serviceHelper } from '../helpers';

const loginUser = (loginData) => {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(loginData),
  };
  return serviceHelper.openFetch(`${process.env.REACT_APP_API_URL}/user/login`, requestOptions).then(serviceHelper.handleResponse);
};

const registerUser = (registerData) => {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(registerData),
  };
  return serviceHelper.openFetch(`${process.env.REACT_APP_API_URL}/user/register`, requestOptions).then(serviceHelper.handleResponse);
};

const getUsers = () => {
  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };
  return serviceHelper.authFetch(`${process.env.REACT_APP_API_URL}/user/get-users`, requestOptions).then(serviceHelper.handleResponse);
};

const getUser = (userId) => {
  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };
  return serviceHelper.authFetch(`${process.env.REACT_APP_API_URL}/user/get-user/${userId}`, requestOptions).then(serviceHelper.handleResponse);
};

const deposit = (depositData) => {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(depositData),
  };
  return serviceHelper.authFetch(`${process.env.REACT_APP_API_URL}/user/deposit`, requestOptions).then(serviceHelper.handleResponse);
};

const reset = (resetData) => {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(resetData),
  };
  return serviceHelper.authFetch(`${process.env.REACT_APP_API_URL}/user/reset`, requestOptions).then(serviceHelper.handleResponse);
};

const getUserPurchases = (userId) => {
  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };
  return serviceHelper.authFetch(`${process.env.REACT_APP_API_URL}/user/get-purchases/${userId}`, requestOptions).then(serviceHelper.handleResponse);
};

export const userService = {
  loginUser,
  registerUser,
  getUsers,
  getUser,
  deposit,
  reset,
  getUserPurchases,
};
