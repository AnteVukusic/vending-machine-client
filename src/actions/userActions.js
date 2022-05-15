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

const fetchUserInfo = () => (dispatch) => {
  const userInfo = tokenHelper.getDecodedToken().user;
  if (!userInfo) {
    window.location.pathname = routes.LOGIN;
  }
  dispatch(actionHelper.createAction(userActionTypes.USER_FETCH_USER_INFO_FROM_TOKEN, { user: tokenHelper.getDecodedToken().user }));
};

const logoutUser = () => (dispatch) => {
  tokenHelper.removeTokenFromLocalStorage();
  dispatch(actionHelper.createAction(userActionTypes.USER_CLEAR_USER_STATE));
};

export const userActions = {
  loginUser,
  fetchUserInfo,
  registerUser,
  logoutUser,
};
