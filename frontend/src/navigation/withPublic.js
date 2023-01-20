import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../context/store/auth";

function withPublic(Component) {
  const PublicComponent = (props) => {
    const { userState } = useContext(UserContext);

    if (userState.isAuthenticated) {
      return <Navigate to={"/user"} />;
    }
    return <Component {...props} />;
  };
  return PublicComponent;
}

export default withPublic;
