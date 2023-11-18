import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRouteAdmin = () => {
  /*   const { userInfo } = useSelector((state) => state.auth); */

  return sessionStorage.userInfo &&
    JSON.parse(sessionStorage.getItem("userInfo")).role === "admin" ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace />
  );
};

export default PrivateRouteAdmin;
