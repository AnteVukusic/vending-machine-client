// eslint-disable-next-line camelcase
import jwt_decode from 'jwt-decode';

const removeTokenFromLocalStorage = () => {
  window.localStorage.removeItem('vending-machine-client-token');
};

const getTokenFromLocalStorage = () => {
  const token = window.localStorage.getItem('vending-machine-client-token');
  return token;
};

const setTokenToLocalStorage = (token) => {
  window.localStorage.setItem('vending-machine-client-token', token);
};

const isTokenExpired = () => {
  const token = getTokenFromLocalStorage();
  if (!token || token === '') return true;
  let decodedToken;

  try {
    decodedToken = jwt_decode(token);
  } catch (err) {
    removeTokenFromLocalStorage();
  }
  if (!decodedToken || decodedToken === {}) return true;

  if (decodedToken.expiresAt < Date.now()) return true;

  return false;
};

const getDecodedToken = () => {
  const token = getTokenFromLocalStorage();

  if (!token || token === '') return null;

  let decodedToken;
  try {
    decodedToken = jwt_decode(token);
  } catch (err) {
    removeTokenFromLocalStorage();
  }
  if (!decodedToken || decodedToken === {}) return null;
  return decodedToken;
};

const getUserIdFromToken = () => {
  const token = getDecodedToken();
  if (!token) return null;
  const { user } = token;

  if (!user) return null;
  return user.id;
};

export const tokenHelper = {
  isTokenExpired,
  removeTokenFromLocalStorage,
  getTokenFromLocalStorage,
  setTokenToLocalStorage,
  getDecodedToken,
  getUserIdFromToken,
};
