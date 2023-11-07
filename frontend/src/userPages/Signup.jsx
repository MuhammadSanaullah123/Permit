import React, { useState } from "react";
import { Link } from "react-router-dom";
import loginImage from "../assets/loginImage.png";

const Signup = () => {
  const [values, setValues] = useState({
    username: "",
    email: "",
    company: "",
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
  console.log(values);
  return (
    <div id="signup">
      <div id="mainDiv">
        <img src={loginImage} alt="Contract" />
        <h1>Signup</h1>
        <p className="p1">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sagittis
          tincidunt
        </p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Full Name"
            value={values.username}
            onChange={handleInput}
            required
          />{" "}
          <input
            type="text"
            name="company"
            placeholder="Company"
            value={values.company}
            onChange={handleInput}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={values.email}
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
          <button type="submit">Signup</button>
        </form>
        <span>
          <p>Or</p>
          <Link to="/user/login">Login</Link>
        </span>
      </div>
    </div>
  );
};

export default Signup;
