import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { rootStateType } from "../Redux/Store";

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const isAuth = useSelector((state: rootStateType) => state.auth.isAuth);
  if (isAuth) {
    return children;
  }
  return <Navigate to="/auth/signin" state={{ from: location }} replace />;
};

export default AuthProvider;
