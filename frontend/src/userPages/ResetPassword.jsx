import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useResetPasswordMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";
import { toast } from "react-toastify";

import loginImage from "../assets/loginImage.png";

const ResetPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [values, setValues] = useState({
    password: "",
    conpassword: "",
  });
  const [resetPassword] = useResetPasswordMutation();
  const { userInfo } = useSelector((state) => state.auth);

  const handleInput = (e) => {
    e.preventDefault();
    const Value = e.target.value;
    setValues({
      ...values,
      [e.target.name]: Value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (values.password !== values.conpassword) {
      toast.error("Passwords do not match");
      return;
    }
    let data = {
      id: window.location.pathname.split("/")[2],
      token: window.location.pathname.split("/")[3],
      conpassword: values.conpassword,
      password: values.password,
    };
    try {
      const res = await resetPassword(data).unwrap();
      toast.success("Login Successful", { position: "top-center" });
      dispatch(setCredentials({ ...res }));
    } catch (error) {
      error.data.errors.forEach((error) => {
        toast.error(error.msg);
      });
    }
  };
  useEffect(() => {
    if (userInfo && userInfo?.role === "user") {
      window.location.assign("/user/dashboard");
    }
    if (userInfo && userInfo?.role === "admin") {
      window.location.assign("/admin/dashboard");
    }
  }, [navigate, userInfo]);
  return (
    <div id="updatePassword">
      <div id="mainDiv">
        <img src={loginImage} alt="Contract" />
        <h1>Password Change</h1>

        <form onSubmit={handleSubmit}>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={values.password}
            onChange={handleInput}
            required
          />
          <input
            type="password"
            name="conpassword"
            placeholder="Confirm Password"
            value={values.conpassword}
            onChange={handleInput}
            required
          />

          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
