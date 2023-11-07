import React, { useState } from "react";

const Checkout = () => {
  const [values, setValues] = useState({
    email: "",
    cardNo: "",
    date: "",
    cvc: "",
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
    <div id="checkout">
      <div className="checkoutDiv">
        <h1>Loream Ispum</h1>
        <p className="p1">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sagittis
          tincidunt
        </p>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Confirm Email"
            value={values.email}
            onChange={handleInput}
            required
          />
          <span className="span1">
            <span className="spanCircleBorder">
              <span className="spanCircle"></span>
            </span>
            <p>Credit Card</p>
          </span>
          <span className="span2">
            <input
              type="text"
              name="cardNo"
              placeholder="Card Number"
              value={values.cardNo}
              onChange={handleInput}
              required
            />
            <input
              type="text"
              name="date"
              placeholder="Expiry Date"
              value={values.date}
              onChange={handleInput}
              required
            />
            <input
              type="text"
              name="cvc"
              placeholder="CVC"
              value={values.cvc}
              onChange={handleInput}
              required
            />
          </span>
          <button type="submit">Pay now</button>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
