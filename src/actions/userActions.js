import { routes, userActionTypes } from '../constants';
import { actionHelper, tokenHelper } from '../helpers';
import { userService } from '../services';

const loginUser = (loginData, history) => (dispatch) => {
  dispatch(actionHelper.createAction(userActionTypes.USER_LOGIN_USER_REQUEST));
  userService.loginUser(loginData)
    .then((res) => {
      tokenHelper.setTokenToLocalStorage(res.token);
      history.push(routes.DASHBOARD);
      dispatch(actionHelper.createAction(userActionTypes.USER_LOGIN_USER_SUCCESS, { user: res.user }));
    })
    .catch((err) => {
      dispatch(actionHelper.createAction(userActionTypes.USER_LOGIN_USER_FAILURE, { error: err }));
    });
};

const registerUser = (registerData, history) => (dispatch) => {
  dispatch(actionHelper.createAction(userActionTypes.USER_REGISTER_USER_REQUEST));
  userService.registerUser(registerData)
    .then((res) => {
      tokenHelper.setTokenToLocalStorage(res.token);
      history.push(routes.DASHBOARD);
      dispatch(actionHelper.createAction(userActionTypes.USER_REGISTER_USER_SUCCESS, { user: res.user }));
    })
    .catch((err) => {
      dispatch(actionHelper.createAction(userActionTypes.USER_REGISTER_USER_FAILURE, { error: err }));
    });
};

const getUserData = (userId) => (dispatch) => {
  dispatch(actionHelper.createAction(userActionTypes.USER_FETCH_USER_INFO_REQUEST));
  userService.getUser(userId)
    .then((res) => {
      dispatch(actionHelper.createAction(userActionTypes.USER_FETCH_USER_INFO_SUCCESS, { user: res.user }));
    })
    .catch((err) => {
      dispatch(actionHelper.createAction(userActionTypes.USER_FETCH_USER_INFO_FAILURE, { error: err }));
    });
};

const logoutUser = () => (dispatch) => {
  tokenHelper.removeTokenFromLocalStorage();
  dispatch(actionHelper.createAction(userActionTypes.USER_CLEAR_USER_STATE));
};

const getUserPurchases = (userId) => (dispatch) => {
  dispatch(actionHelper.createAction(userActionTypes.USER_GET_USER_PURCHASES_REQUEST));
  userService.getUserPurchases(userId)
    .then((res) => {
      dispatch(actionHelper.createAction(userActionTypes.USER_GET_USER_PURCHASES_SUCCESS, { purchases: res.purchases }));
    })
    .catch((err) => {
      dispatch(actionHelper.createAction(userActionTypes.USER_GET_USER_PURCHASES_FAILURE, { error: err }));
    });
};

const clearUserError = () => (dispatch) => {
  dispatch(actionHelper.createAction(userActionTypes.USER_CLEAR_USER_ERROR));
};

export const userActions = {
  loginUser,
  clearUserError,
  registerUser,
  logoutUser,
  getUserData,
  getUserPurchases,
};
