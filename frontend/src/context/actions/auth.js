import api from "../../services/api";

export const USER_LOGIN_SUCCESS = "USER_LOGIN_SUCCESS";
export const USER_LOGIN_FAILURE = "USER_LOGIN_FAILURE";
export const GET_USER = "GET_USER";
export const USER_LOGOUT = "USER_LOGOUT";

// export const login = (email, password) => async (dispatch) => {
//   try {
//     const { headers } = await api("application/x-www-form-urlencoded").post(
//       "/login",
//       {
//         email,
//         password,
//       }
//     );
//     dispatch({ type: USER_LOGIN_SUCCESS, payload: headers["access-token"] });
//     localStorage.setItem("token", headers["access-token"]);
//   } catch (err) {
//     dispatch({ type: USER_LOGIN_FAILURE });
//     throw new Error();
//   }
// };

export const login = (email, password) => async (dispatch) => {
  try {
    const { data } = await api(email, password).get("user/login");
    data.password = password;
    data.email = email;
    localStorage.setItem("user", JSON.stringify(data));
    dispatch({ type: USER_LOGIN_SUCCESS });
    dispatch({ type: GET_USER, payload: data });
    console.log("data is", data);
    return data;
  } catch (error) {
    dispatch({ type: USER_LOGOUT });
    throw new Error();
  }
};

export const updateUser = (user) => async (dispatch) => {
  try {
    const res = await api(user.email, user.password).put("user/update", user);
    dispatch({ type: GET_USER, payload: user });
    return res;
  } catch (error) {
    throw error;
  }
};

// export const getUser = () => async (dispatch) => {
//   try {
//     const { data } = await api().get("/me");
//     dispatch({ type: GET_USER, payload: data });
//     return data;
//   } catch (err) {
//     dispatch({ type: USER_LOGOUT });
//     throw new Error();
//   }
// };

export const logout = () => (dispatch) => {
  dispatch({
    type: USER_LOGOUT,
    payload: {
      isAuthenticated: false,
      user: null,
    },
  });
};
