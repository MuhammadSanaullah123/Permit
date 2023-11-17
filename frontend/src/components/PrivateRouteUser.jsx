import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRouteUser = () => {
  /*   const { userInfo } = useSelector((state) => state.auth); */
  console.log(JSON.parse(sessionStorage.getItem("userInfo")).role);
  return sessionStorage.userInfo &&
    JSON.parse(sessionStorage.getItem("userInfo")).role === "user" ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace />
  );
};

export default PrivateRouteUser;
