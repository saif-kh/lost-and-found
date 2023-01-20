import React, { useContext } from "react";
import { Navigate, redirect } from "react-router-dom";
import { UserContext } from "../context/store/auth";

const withPrivate = (Component) => {
  const PrivateComponent = (props) => {
    const { userState } = useContext(UserContext);

    if (!userState.isAuthenticated) {
      return redirect("/login");
    }
    return Component;
  };
  return PrivateComponent;
};

export default withPrivate;
