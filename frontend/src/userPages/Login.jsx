import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";
import { toast } from "react-toastify";

import loginImage from "../assets/loginImage.png";

const Login = () => {
  const [values, setValues] = useState({
    username: "",
    password: "",
  });
  const [login] = useLoginMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
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
    let data = {
      username: values.username,
      password: values.password,
    };
    try {
      const res = await login(data).unwrap();
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
    <div id="login">
      <div id="mainDiv">
        <img src={loginImage} alt="Contract" />
        <h1>Login</h1>
        <p className="p1">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sagittis
          tincidunt
        </p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Username/Email"
            value={values.username}
            onChange={handleInput}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={values.password}
            onChange={handleInput}
            required
          />
          <Link>Forgot Password</Link>
          <button type="submit">Login</button>
        </form>
        <span>
          <p>Or</p>
          <Link to="/user/signup">Signup</Link>
        </span>
      </div>
    </div>
  );
};

export default Login;
