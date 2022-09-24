import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { UidContext } from '../AppContext'

export default function PrivateRoutes() {
  const uid = useContext(UidContext)
  if (uid) {
    return <Outlet path="/" />;
  } else {
    return <Navigate replace to="/profil" />;
  }
}