import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
//api
import {
  usePayInvoiceMutation,
  useGetInvoiceMutation,
} from "../slices/invoiceApiSlice";
import { setInvoice } from "../slices/invoiceSlice";
//square
import { CreditCard, PaymentForm } from "react-square-web-payments-sdk";
//other
import { useDispatch, useSelector } from "react-redux";
import { RotatingLines } from "react-loader-spinner";
import { toast } from "react-toastify";
const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [values, setValues] = useState({
    email: "",
    cardNo: "",
    date: "",
    cvc: "",
  });
  const [loading, setLoading] = useState(false);
  const { invoiceInfo } = useSelector((state) => state.invoice);
  const [payInvoice] = usePayInvoiceMutation();
  const [getInvoice] = useGetInvoiceMutation();

  const handleInput = (e) => {
    e.preventDefault();
    const Value = e.target.value;
    setValues({
      ...values,
      [e.target.name]: Value,
    });
  };

  const handleSubmit = async (token, buyer) => {
    setLoading(true);
    const data = {
      sourceId: token.token,
      amount: invoiceInfo?.amount,
      documentId: invoiceInfo?.documentId,
      email: values.email,
    };
    try {
      const res = await payInvoice(data).unwrap();
      console.log(res);
      setValues({
        email: "",
        cardNo: "",
        date: "",
        cvc: "",
      });
      setLoading(false);

      toast.success("Payment Success", {
        position: "top-center",
        hideProgressBar: true,
        autoClose: 1000,
      });
      setTimeout(() => {
        navigate("/invoices");
      }, 1500);
    } catch (error) {
      error.data.errors.forEach((error) => {
        toast.error(error.msg);
      });
      setLoading(false);
    }
  };
  const handleGetInvoice = async () => {
    try {
      const res = await getInvoice(
        window.location.pathname.split("/")[3]
      ).unwrap();

      dispatch(setInvoice({ ...res }));
    } catch (error) {
      error.data.errors.forEach((error) => {
        toast.error(error.msg);
      });
    }
  };

  useEffect(() => {
    handleGetInvoice();
  }, []);
  return (
    <div id="checkout">
      <div
        className="checkoutDiv"
        style={{
          opacity: `${loading ? "0.4" : "1"}`,
        }}
      >
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
          <span className="span1ParentDiv">
            <span className="span1">
              <span className="spanCircleBorder">
                <span className="spanCircle"></span>
              </span>
              <p>Credit Card</p>
            </span>
            {/*  <span className="span1Images">
              <i className="fa-brands fa-cc-visa cardImg"></i>
              <i className="fa-brands fa-cc-mastercard cardImg"></i>
             
            </span> */}
          </span>
          <div className="paymentFormDiv">
            <PaymentForm
              applicationId={`${process.env.REACT_APP_APPLICATION_ID}`}
              locationId={`${process.env.REACT_APP_LOCATION_ID}`}
              cardTokenizeResponseReceived={handleSubmit}
            >
              <CreditCard className="card" />
            </PaymentForm>
          </div>
          {/*  <span className="span2">
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
          <button type="submit">Pay now</button> */}
        </form>
      </div>
      {loading && (
        <div
          style={{
            alignSelf: "center",
            position: "absolute",
          }}
        >
          <RotatingLines
            strokeColor="grey"
            strokeWidth="5"
            animationDuration="0.75"
            width="96"
            visible={true}
          />
        </div>
      )}
    </div>
  );
};

export default Checkout;
