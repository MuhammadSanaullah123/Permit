import React, { useState } from "react";
import upload from "../assets/upload.png";

const Upload = () => {
  const [values, setValues] = useState({
    name: "",
    address: "",
    contractor: "",
    type: "",
    valuation: "",
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
    <div id="upload">
      <img src={upload} alt="upload" />
      <div id="uploadformDiv">
        <h1>Upload Documents</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sagittis
          tincidunt
        </p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Project name"
            value={values.name}
            onChange={handleInput}
            required
          />{" "}
          <input
            type="text"
            name="address"
            placeholder="Company"
            value={values.address}
            onChange={handleInput}
            required
          />
          <input
            type="text"
            name="contractor"
            placeholder="Contractor"
            value={values.contractor}
            onChange={handleInput}
            required
          />
          <input
            type="text"
            name="type"
            placeholder="Permit Type"
            value={values.type}
            onChange={handleInput}
            required
          />
          <input
            type="text"
            name="valuation"
            placeholder="Valuation"
            value={values.valuation}
            onChange={handleInput}
            required
          />
          <button type="Upload">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Upload;
