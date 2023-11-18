import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
//assets
import check from "../assets/check.png";
import bank from "../assets/bank.png";
import user from "../assets/user.png";

//api
import { useDispatch, useSelector } from "react-redux";
import { useGetInvoiceMutation } from "../slices/invoiceApiSlice";
import { setInvoice } from "../slices/invoiceSlice";

//other
import { toast } from "react-toastify";
const Invoice = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { invoiceInfo } = useSelector((state) => state.invoice);
  const [getInvoice] = useGetInvoiceMutation();

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
  console.log(invoiceInfo);
  return (
    <div id="invoice">
      <div className="invoiceD1">
        <h1>Review Invoice</h1>
        <p className="p1">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
          interdum, arcu ut tempus fermentum, urna diam consequat sapien, eu
          bibendum quam velit ut augue.
        </p>

        {invoiceInfo._id ? (
          <>
            <div className="vendorDiv">
              <span className="leftSpan">
                <img src={check} alt="check" />
                <h1>Vendor Details</h1>
              </span>
              <span className="rightSpan">
                <span>
                  <img src={user} alt="" />
                  <p>{invoiceInfo?.useremail}</p>
                </span>
                <span>
                  <img src={bank} alt="" />
                  <p>{invoiceInfo?.address}</p>
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
                  <h1>$990</h1>
                </span>
                <span>
                  <p>Total</p>
                  <h1>${invoiceInfo?.amount}</h1>
                </span>
                <span>
                  <p>GST</p>
                  <h1>$10</h1>
                </span>
                <span className="lineSpan"></span>
                <span className="amountSpan">
                  <p>Amount Payable</p>
                  <h1>${invoiceInfo?.amount}</h1>
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
                  <h1>{invoiceInfo?._id}</h1>
                </span>
                <span>
                  <p>Invoice Date</p>
                  <h1>{invoiceInfo?.issueDate}</h1>
                </span>
                <button onClick={() => navigate("/user/checkout")}>
                  Checkout
                </button>
              </span>
            </div>
          </>
        ) : (
          <h1
            style={{
              marginTop: "20px",
            }}
          >
            No Invoice yet
          </h1>
        )}
      </div>
    </div>
  );
};

export default Invoice;
