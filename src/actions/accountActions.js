import axios from 'src/utils/axios';
import authService from 'src/services/authService';

export const LOGIN_REQUEST = '@account/login-request';
export const LOGIN_SUCCESS = '@account/login-success';
export const LOGIN_FAILURE = '@account/login-failure';
export const REGISTER_REQUEST = '@account/register-request';
export const REGISTER_SUCCESS = '@account/register-success';
export const REGISTER_FAILURE = '@account/register-failure';
export const SILENT_LOGIN = '@account/silent-login';
export const LOGOUT = '@account/logout';
export const UPDATE_PROFILE = '@account/update-profile';

export function login(email, password) {
  return async (dispatch) => {
    try {
      dispatch({ type: LOGIN_REQUEST });

      const user = await authService.loginWithEmailAndPassword(email, password);

      dispatch({
        type: LOGIN_SUCCESS,
        payload: {
          user
        }
      });
    } catch (error) {
      dispatch({ type: LOGIN_FAILURE });
      throw error;
    }
  };
}

export function setUserData(user) {
  return (dispatch) => dispatch({
    type: SILENT_LOGIN,
    payload: {
      user
    }
  });
}

export function logout() {
  return async (dispatch) => {
    authService.logout();

    dispatch({
      type: LOGOUT
    });
  };
}

export function register(userData) {
  return async (dispatch) => {
    try {
      dispatch({ type: REGISTER_REQUEST });

      const user = await authService.register(userData);
      dispatch({
        type: REGISTER_SUCCESS,
        payload: {
          user
        }
      });
    } catch (error) {
      dispatch({ type: REGISTER_FAILURE });
      throw error;
    }
  };
}

export function updateProfile(update) {
  const request = axios.post('/api/account/profile', { update });

  return (dispatch) => {
    request.then((response) => dispatch({
      type: UPDATE_PROFILE,
      payload: response.data
    }));
  };
}
