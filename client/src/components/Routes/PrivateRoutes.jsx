import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export default function PrivateRoutes({ path, ...props }) {
  const { isLoggedIn } = useSelector((state) => state.auth);
  if (isLoggedIn) {
    return <Outlet path={path} {...props} />;
  } else {
    return <Navigate replace to="/login" />;
  }
}