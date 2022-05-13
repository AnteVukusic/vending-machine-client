import { routes } from '../constants/routes';
import { tokenHelper } from './tokenHelper';

const handleResponse = (response) => response.text().then((text) => {
  const data = text && JSON.parse(text);
  if (!response.ok) {
    if (response.status === 401) {
      tokenHelper.removeTokenFromLocalStorage();
      window.location.pathname = routes.LOGIN;
    }
    const error = (data && data.error) || response.statusText;
    return Promise.reject(error);
  }
  return data;
});

const authFetch = async (input, init, excludeTracker) => {
  const token = window.localStorage.getItem('vending-machine-client-token');
  const fetchInit = init || {};

  fetchInit.headers = {
    ...(init ? init.headers : {}),
    Authorization: `Bearer ${token}`,
  };
  if (excludeTracker) {
    return fetch(input, fetchInit);
  }
  return fetch(input, fetchInit);
};

const openFetch = async (input, init) => {
  const fetchInit = init || {};

  return fetch(input, fetchInit);
};

export const serviceHelper = {
  openFetch,
  authFetch,
  handleResponse,
};
