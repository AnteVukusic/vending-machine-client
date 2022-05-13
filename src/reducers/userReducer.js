import { createReducer } from '@reduxjs/toolkit';
import { userActionTypes } from '../constants';

const initialState = {
  user: {},
  isRequestInProgress: false,
  isUserLoggedIn: false,
  error: null,
};

export const user = createReducer(initialState, (builder) => {
  builder
    .addCase(userActionTypes.USER_LOGIN_USER_REQUEST, (state) => {
      state.isUserLoggedIn = false;
      state.isRequestInProgress = true;
    })
    .addCase(userActionTypes.USER_LOGIN_USER_SUCCESS, (state, action) => {
      state.isUserLoggedIn = true;
      state.isRequestInProgress = false;
      state.user = action.payload.user;
    })
    .addCase(userActionTypes.USER_LOGIN_USER_FAILURE, (state, action) => {
      state.isUserLoggedIn = false;
      state.isRequestInProgress = false;
      state.error = action.payload.error;
    })
    .addCase(userActionTypes.USER_REGISTER_USER_REQUEST, (state) => {
      state.isUserLoggedIn = false;
      state.isRequestInProgress = true;
    })
    .addCase(userActionTypes.USER_REGISTER_USER_SUCCESS, (state, action) => {
      state.isUserLoggedIn = true;
      state.isRequestInProgress = false;
      state.user = action.payload.user;
    })
    .addCase(userActionTypes.USER_REGISTER_USER_FAILURE, (state, action) => {
      state.isUserLoggedIn = false;
      state.isRequestInProgress = false;
      state.error = action.payload.error;
    })
    .addCase(userActionTypes.USER_FETCH_USER_INFO_FROM_TOKEN, (state, action) => {
      state.isUserLoggedIn = true;
      state.isRequestInProgress = false;
      state.user = action.payload.user;
    })
    .addCase(userActionTypes.USER_CLEAR_USER_STATE, () => initialState);
});
