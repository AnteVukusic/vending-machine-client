import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { userService } from '../services/userService';
import { tokenHelper } from '../helpers';
import { routes } from '../constants/routes';

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

function AuthProvider({ children }) {
  const [error, setError] = useState(null);
  const [loggedUser, setLoggedUser] = useState({});

  const history = useHistory();

  function registerUser(registerData) {
    userService.registerUser(registerData)
      .then((res) => {
        tokenHelper.setTokenToLocalStorage(res.token);
        setLoggedUser(res.loggedUser);
        history.push(routes.DASHBOARD);
      })
      .catch((res) => {
        setError(res.error);
        setLoggedUser(null);
      });
  }

  function loginUser(loginData) {
    userService.loginUser(loginData)
      .then((res) => {
        tokenHelper.setTokenToLocalStorage(res.token);
        setLoggedUser(res.user);
        history.push(routes.DASHBOARD);
      })
      .catch((res) => {
        setError(res.error);
        setLoggedUser(null);
      });
  }

  function logoutUser() {
    tokenHelper.removeTokenFromLocalStorage();
    setLoggedUser(null);
    setError(null);
    history.push(routes.LOGIN);
  }

  // eslint-disable-next-line react/jsx-no-constructed-context-values
  const auth = {
    registerUser,
    loginUser,
    logoutUser,
    loggedUser,
    error,
  };

  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { AuthProvider };
