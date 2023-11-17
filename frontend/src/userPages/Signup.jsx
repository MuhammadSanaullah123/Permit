import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useSignupMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";
import { toast } from "react-toastify";
import loginImage from "../assets/loginImage.png";

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [signup] = useSignupMutation();
  const { userInfo } = useSelector((state) => state.auth);

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      name: values.username,
      email: values.email,
      company: values.company,
      password: values.password,
    };

    try {
      const res = await signup(data).unwrap();
      toast.success("Account Created", { position: "top-center" });

      dispatch(setCredentials({ ...res }));
    } catch (error) {
      error.data.errors.forEach((error) => {
        toast.error(error.msg);
      });

      /* toast.error(error.data.errors); */
      /*   toast.error(error?.data?.errors || error.error); */
    }
  };
  useEffect(() => {
    if (userInfo) {
      navigate("/user/dashboard");
    }
  }, [navigate, userInfo]);
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
