import React, { useEffect } from "react";
import { createContext, useReducer } from "react";
import { GET_USER } from "../actions/auth";
import { userReducer } from "../reducers/auth";

const UserContext = createContext(null);

// const getUser = () => {
//   return JSON.parse(localStorage.getItem("user")) || initialUserState;
// };

const UserContextProvider = ({ children }) => {
  const [userState, dispatch] = useReducer(userReducer, initialUserState);

  useEffect(() => {
    const saved = localStorage?.getItem("user");
    if (saved)
      dispatch({
        type: GET_USER,
        payload: JSON.parse(saved),
      });
  }, []);

  // console.log(userState);

  return (
    <UserContext.Provider value={{ userState, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};

const initialUserState = {
  isAuthenticated: false,
  user: {
    firstName: "",
    lastName: "",
    email: "",
  },
  // token: localStorage.getItem("token") || null,
};

export { UserContextProvider, UserContext };
