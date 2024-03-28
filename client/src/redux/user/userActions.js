import { LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT } from './userTypes';

export const loginSuccess = (userId, permission) => {
  return {
    type: LOGIN_SUCCESS,
    payload: {
      userId: userId,
      permission: permission,
    },
  };
};

export const loginFailure = (error) => {
  return {
    type: LOGIN_FAILURE,
    payload: error,
  };
};

export const logout = () => {
  return {
    type: LOGOUT,
  };
};

