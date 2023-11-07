import React, { useState } from "react";
import { Link } from "react-router-dom";
import loginImage from "../assets/loginImage.png";

const Login = () => {
  const [values, setValues] = useState({
    username: "",
    password: "",
  });

  const handleInput = (e) => {
    e.preventDefault();
    const Value = e.target.value;
    setValues({
      ...values,
      [e.target.name]: Value,
    });
  };
  console.log(values);
  const handleSubmit = () => {};
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
