import React from "react";
import check from "../assets/check.png";
import bank from "../assets/bank.png";
import user from "../assets/user.png";

const Invoice = () => {
  return (
    <div id="invoice">
      <div className="invoiceD1">
        <h1>Review Invoice</h1>
        <p className="p1">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
          interdum, arcu ut tempus fermentum, urna diam consequat sapien, eu
          bibendum quam velit ut augue.
        </p>
        <div className="vendorDiv">
          <span className="leftSpan">
            <img src={check} alt="check" />
            <h1>Vendor Details</h1>
          </span>
          <span className="rightSpan">
            <span>
              <img src={user} alt="" />
              <p>Johnson</p>
            </span>
            <span>
              <img src={bank} alt="" />
              <p>Johnson</p>
            </span>
          </span>
        </div>
        <div className="invoiceAmountDiv">
          <span className="leftSpan">
            <img src={check} alt="check" />
            <h1>Invoice Amount</h1>
          </span>
          <span className="rightSpan">
            <span>
              <p>Subtotal</p>
              <h1>$1233</h1>
            </span>
            <span>
              <p>Total</p>
              <h1>$1233</h1>
            </span>
            <span>
              <p>GST</p>
              <h1>$1233</h1>
            </span>
            <span className="lineSpan"></span>
            <span className="amountSpan">
              <p>Amount Payable</p>
              <h1>$1233</h1>
            </span>
          </span>
        </div>
        <div className="invoiceDetailDiv">
          <span className="leftSpan">
            <img src={check} alt="check" />
            <h1>Invoice Details</h1>
          </span>
          <span className="rightSpan">
            <span>
              <p>Invoice Number</p>
              <h1>123345</h1>
            </span>
            <span>
              <p>Invoice Date</p>
              <h1>12 March</h1>
            </span>
            <button>Checkout</button>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Invoice;
