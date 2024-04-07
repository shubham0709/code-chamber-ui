import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const isAuth = useSelector((state) => state.auth.isAuth);
  if (isAuth) {
    return children;
  }
  return <Navigate to="/auth/signin" />;
};

export default AuthProvider;
