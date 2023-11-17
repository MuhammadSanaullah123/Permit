import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
//api
import { useDispatch, useSelector } from "react-redux";
import { useGetDocumentByIdMutation } from "../slices/documentApiSlice";
import {
  useGetConversationMutation,
  useCreateConversationMutation,
} from "../slices/conversationApiSlice";
import { useGetInvoiceMutation } from "../slices/invoiceApiSlice";
import { setSingleDocument } from "../slices/documentSlice";
import { setConversation } from "../slices/conversationSlice";
import { setInvoice } from "../slices/invoiceSlice";
//other
import { toast } from "react-toastify";

const Document = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { documentInfo } = useSelector((state) => state.document);
  const { userInfo } = useSelector((state) => state.auth);
  const { conversationInfo } = useSelector((state) => state.conversation);

  const [message, setMessage] = useState("");
  const [getDocument] = useGetDocumentByIdMutation();
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

  useEffect(() => {
    handleGetDocument();
    handleGetConversation();
  }, []);
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
            <h2>PDF link</h2>
            <p>{documentInfo?.url}</p>
          </span>
          <span id="span3" className="mainDivspan">
            <h2>Contractor</h2>
            <p>{documentInfo?.contractor}</p>
          </span>
          <span id="span4" className="mainDivspan">
            <h2>File Size</h2>
            <p>{documentInfo?.fileSize}</p>
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
        </div>
      </div>
      {userInfo?.role === "user" ? (
        <button
          className="viewBtn"
          onClick={() =>
            navigate(`/user/invoice/${window.location.pathname.split("/")[2]}`)
          }
        >
          View Receipt
        </button>
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

      <div id="messageDiv">
        <h1>Comments</h1>
        <div className="convoDiv">
          {conversationInfo[0]?.messages.map((item, index) => (
            <>
              <div
                className={`${
                  item.sender === "admin" ? "leftmessageDiv" : "rightmessageDiv"
                }`}
              >
                <p className="messagep">{item?.message}</p>
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
