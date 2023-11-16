import React, { useState } from "react";

const Invoice = () => {
  const [values, setValues] = useState({
    useremail: "",
    documentName: "",
    amount: "",
    address: "",
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
          name="documentName"
          placeholder="Document Name"
          value={values.documentName}
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
          name="address"
          placeholder="Address..."
          value={values.address}
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
