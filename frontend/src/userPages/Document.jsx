import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
//api
import { useDispatch, useSelector } from "react-redux";
import { useGetDocumentByIdMutation } from "../slices/documentApiSlice";
import { useGetPermitByIdMutation } from "../slices/permitApiSlice";
import {
  useGetConversationMutation,
  useCreateConversationMutation,
} from "../slices/conversationApiSlice";
import { useGetInvoiceMutation } from "../slices/invoiceApiSlice";
import { setSingleDocument } from "../slices/documentSlice";
import { setPermit } from "../slices/permitSlice";

import { setConversation } from "../slices/conversationSlice";
import { setInvoice } from "../slices/invoiceSlice";

//other
import { toast } from "react-toastify";

const Document = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { documentInfo } = useSelector((state) => state.document);
  const { permitInfo } = useSelector((state) => state.permit);

  const { userInfo } = useSelector((state) => state.auth);
  const { conversationInfo } = useSelector((state) => state.conversation);
  const { invoiceInfo } = useSelector((state) => state.invoice);

  const [getInvoice] = useGetInvoiceMutation();
  const [message, setMessage] = useState("");
  const [getDocument] = useGetDocumentByIdMutation();
  const [getPermit] = useGetPermitByIdMutation();

  const [getConversation] = useGetConversationMutation();
  const [createConversation] = useCreateConversationMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      text: message,
      id: window.location.pathname.split("/")[2],
    };
    try {
      const res = await createConversation(data).unwrap();
      setMessage("");
      handleGetConversation();
      toast.success("Message Sent", {
        position: "top-center",
        hideProgressBar: true,
        autoClose: 1000,
      });
    } catch (error) {
      error.data.errors.forEach((error) => {
        toast.error(error.msg);
      });
    }
  };

  const handleGetDocument = async () => {
    try {
      const res = await getDocument(
        window.location.pathname.split("/")[2]
      ).unwrap();

      dispatch(setSingleDocument({ ...res }));
    } catch (error) {
      error.data.errors.forEach((error) => {
        toast.error(error.msg);
      });
    }
  };

  const handleGetPermit = async () => {
    try {
      const res = await getPermit(
        window.location.pathname.split("/")[2]
      ).unwrap();

      dispatch(setPermit({ ...res }));
    } catch (error) {
      /*  error.data.errors.forEach((error) => {
        toast.error(error.msg);
      }); */
      console.error(error);
    }
  };
  const handleGetConversation = async () => {
    try {
      const res = await getConversation(
        window.location.pathname.split("/")[2]
      ).unwrap();

      dispatch(setConversation({ ...res }));
    } catch (error) {
      error.data.errors.forEach((error) => {
        toast.error(error.msg);
      });
    }
  };

  const handleReceipt = async () => {};
  const handleGetInvoice = async () => {
    try {
      const res = await getInvoice(
        window.location.pathname.split("/")[2]
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
  useEffect(() => {
    handleGetDocument();
    handleGetPermit();
    handleGetConversation();
  }, []);
  console.log(permitInfo);
  return (
    <div id="document">
      <div className="mainDiv">
        <h1>Document Details</h1>
        <div className="mainDivd1">
          <span id="span1" className="mainDivspan">
            <h2>Project Name</h2>
            <p>{documentInfo?.projectName}</p>
          </span>
          <span id="span2" className="mainDivspan">
            <h2>Project Link</h2>
            <Link to={`${documentInfo?.url}`} target="_blank">
              Download Project
            </Link>
          </span>
          <span id="span3" className="mainDivspan">
            <h2>Contractor</h2>
            <p>{documentInfo?.contractor}</p>
          </span>
          <span id="span4" className="mainDivspan">
            <h2>File Size</h2>
            <p>
              {(documentInfo?.fileSize / 1000000).toString().slice(0, 5)} MB
            </p>
          </span>
          <span id="span5" className="mainDivspan">
            <h2>Customer Name</h2>
            <p>{userInfo?.name}</p>
          </span>
          <span id="span6" className="mainDivspan">
            <h2>Permit type</h2>
            <p>{documentInfo?.permitType}</p>
          </span>
          <span id="span7" className="mainDivspan">
            <h2>Status</h2>
            <p
              style={{
                color: `${
                  documentInfo?.status === "Pending"
                    ? "rgb(84 83 244)"
                    : documentInfo?.status === "Approved"
                    ? "#52ff00"
                    : "#e74c3c"
                }`,
              }}
            >
              {documentInfo?.status}
            </p>
          </span>
          <span id="span8" className="mainDivspan">
            <h2>Address</h2>
            <p>{documentInfo?.address}</p>
          </span>
          <span id="span9" className="mainDivspan">
            <h2>Valuation</h2>
            <p>{documentInfo?.valuation}</p>
          </span>
          <span id="span10" className="mainDivspan">
            <h2>Invoice Status</h2>
            <p>{invoiceInfo?.status}</p>
          </span>
          {permitInfo?.url && (
            <span id="span11" className="mainDivspan">
              <h2>Permit Status</h2>
              <Link to={`${permitInfo?.url}`} target="_blank">
                Download Permit
              </Link>
            </span>
          )}
        </div>
      </div>
      {userInfo?.role === "user" ? (
        <button
          className="viewBtn"
          onClick={() =>
            navigate(`/invoice/${window.location.pathname.split("/")[2]}`)
          }
        >
          View Receipt
        </button>
      ) : (
        <>
          {invoiceInfo?.documentId ? (
            <div className="buttonDiv">
              <button
                className="viewBtn"
                onClick={() =>
                  navigate(`/invoice/${window.location.pathname.split("/")[2]}`)
                }
              >
                View Receipt
              </button>
              {!permitInfo?.url && (
                <button
                  className="permitBtn"
                  onClick={() =>
                    navigate(
                      `/admin/upload/${window.location.pathname.split("/")[2]}`
                    )
                  }
                >
                  Upload Permit
                </button>
              )}
            </div>
          ) : (
            <button
              style={{
                width: "200px",
              }}
              className="viewBtn"
              onClick={() => navigate(`/admin/invoice/${documentInfo._id}`)}
            >
              Generate Reciept
            </button>
          )}
        </>
      )}

      <div id="messageDiv">
        <h1>Comments</h1>
        <div className="convoDiv">
          {conversationInfo[0]?.messages.map((item, index) => (
            <>
              <div
                className={`${
                  item.sender === "admin" ? "leftmessageDiv" : "rightmessageDiv"
                }`}
                style={{
                  alignSelf:
                    item?.message === "Invoice has been generated" ||
                    (item?.message === "Invoice has been paid" && "center"),
                  borderRadius:
                    item?.message === "Invoice has been generated" ||
                    (item?.message === "Invoice has been paid" && "50px"),
                  opacity:
                    item?.message === "Invoice has been generated" ||
                    (item?.message === "Invoice has been paid" && "0.5"),
                  height:
                    item?.message === "Invoice has been generated" ||
                    (item?.message === "Invoice has been paid" && "10px"),
                  padding:
                    item?.message === "Invoice has been generated" ||
                    (item?.message === "Invoice has been paid" && "13px"),
                }}
              >
                <p
                  className="messagep"
                  style={{
                    fontSize:
                      item?.message === "Invoice has been generated" ||
                      (item?.message === "Invoice has been paid" && "14px"),
                  }}
                >
                  {item?.message}
                </p>
              </div>
            </>
          ))}
        </div>
        <div className="sendDiv">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="message"
              placeholder="Type Your Message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />
            <button className="sendBtn" type="submit">
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Document;
