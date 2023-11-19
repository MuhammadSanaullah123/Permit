import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useGetResetCodeMutation } from "../slices/usersApiSlice";

import { toast } from "react-toastify";

import loginImage from "../assets/loginImage.png";

const ForgotPassword = () => {
  const [values, setValues] = useState({
    useremail: "",
  });
  const [getResetCode] = useGetResetCodeMutation();

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
      useremail: values.useremail,
    };
    try {
      const res = await getResetCode(data).unwrap();
      toast.success(`${res.message}`, { position: "top-center" });
      setValues({
        useremail: "",
      });
    } catch (error) {
      toast.error(error.data.msg);
    }
  };

  return (
    <div id="forgotPassword">
      <div id="mainDiv">
        <img src={loginImage} alt="Contract" />
        <h1>Password Reset</h1>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="useremail"
            placeholder="Username/Email"
            value={values.useremail}
            onChange={handleInput}
            required
          />

          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
