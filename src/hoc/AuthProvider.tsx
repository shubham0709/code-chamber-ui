import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { rootStateType } from "../Redux/Store";

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const isAuth = useSelector((state: rootStateType) => state.auth.isAuth);
  if (isAuth) {
    return children;
  }
  return <Navigate to="/auth/signin" />;
};

export default AuthProvider;
