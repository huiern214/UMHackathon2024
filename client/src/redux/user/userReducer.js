import { LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT } from './userTypes';

const initialState = {
  userId: null,
  permisson: null,
  error: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        userId: action.payload.userId,
        permisson: action.payload.permission,
        error: null,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        userId: null,
        permisson: null,
        error: action.payload,
      };
    case LOGOUT:
      return {
        ...state,
        userId: null,
        permission: null,
        error: null,
      };
    default:
      return state;
  }
};

export default userReducer;
