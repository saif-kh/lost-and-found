import {
  GET_USER,
  USER_LOGIN_FAILURE,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
} from "../actions/auth";

const userReducer = (state, { type, payload }) => {
  switch (type) {
    case USER_LOGIN_SUCCESS:
      return { ...state, isAuthenticated: true };
    case USER_LOGIN_FAILURE:
      return { ...state, isAuthenticated: false };
    case GET_USER:
      return {
        ...state,
        user: {
          id: payload.id,
          firstName: payload.firstName,
          lastName: payload.lastName,
          email: payload.email,
          password: payload.password,
        },
      };
    case USER_LOGOUT:
      return { ...state, isAuthenticated: false, user: null };
  }
  return state;
};

export { userReducer };
