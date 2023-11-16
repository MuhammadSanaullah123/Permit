import React, { useState } from "react";

const Profile = () => {
  const [values, setValues] = useState({
    name: "",
    company: "",
    email: "",
    description: "",
    image: "",
    password: "",
    conpassword: "",
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
    <div id="profile">
      <div className="imageDiv">
        <i className="fa-solid fa-user"></i>
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={values.name}
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
        <textarea
          name="description"
          placeholder="Description..."
          value={values.description}
          onChange={handleInput}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Change Password"
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
        <button type="submit">Done</button>
      </form>
    </div>
  );
};

export default Profile;
