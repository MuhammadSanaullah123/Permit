import React from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

const PrivateRouteAdmin = () => {
  const userInfo = JSON.parse(sessionStorage.getItem("userInfo"));

  if (userInfo && userInfo.role === "admin") {
    return <Outlet />;
  } else {
    // Use window.location.assign for redirection
    window.location.assign("/login");
    return null; // or some loading/error component if needed
  }
};

export default PrivateRouteAdmin;
