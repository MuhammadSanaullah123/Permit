import React, { useState } from "react";

const Invoice = () => {
  const [values, setValues] = useState({
    useremail: "",
    ventor: "",
    amount: "",
    description: "",
    date: "",
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
    <div id="generateInvoice">
      <span className="span1">
        <h1>Generate Invoice</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
          interdum, arcu ut tempus fermentum, urna diam consequat sapien, eu
          bibendum quam velit ut augue.
        </p>
      </span>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="useremail"
          placeholder="Username/Email"
          value={values.useremail}
          onChange={handleInput}
          required
        />
        <input
          type="text"
          name="ventor"
          placeholder="Ventor"
          value={values.ventor}
          onChange={handleInput}
          required
        />
        <input
          type="text"
          name="amount"
          placeholder="Total Amount"
          value={values.amount}
          onChange={handleInput}
          required
        />
        <input
          type="text"
          name="description"
          placeholder="Description..."
          value={values.description}
          onChange={handleInput}
          required
        />
        <input
          type="text"
          name="date"
          placeholder="Invoice Date"
          value={values.date}
          onChange={handleInput}
          required
        />
        <button type="submit">Generate Invoice</button>
      </form>
    </div>
  );
};

export default Invoice;
