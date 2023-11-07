import React, { useState } from "react";

const Document = () => {
  const [message, setMessage] = useState("");

  const handleSubmit = () => {};

  return (
    <div id="document">
      <div className="mainDiv">
        <h1>Document Details</h1>
        <div className="mainDivd1">
          <span id="span1" className="mainDivspan">
            <h2>Project Name</h2>
            <p>Steller B</p>
          </span>
          <span id="span2" className="mainDivspan">
            <h2>PDF link</h2>
            <p>View pdf</p>
          </span>
          <span id="span3" className="mainDivspan">
            <h2>Contractor</h2>
            <p>View pdf</p>
          </span>
          <span id="span4" className="mainDivspan">
            <h2>File Size</h2>
            <p>234</p>
          </span>
          <span id="span5" className="mainDivspan">
            <h2>Customer Name</h2>
            <p>John Doe</p>
          </span>
          <span id="span6" className="mainDivspan">
            <h2>Permit type</h2>
            <p>View pdf</p>
          </span>
          <span id="span7" className="mainDivspan">
            <h2>Status</h2>
            <p>Approved</p>
          </span>
          <span id="span8" className="mainDivspan">
            <h2>Address</h2>
            <p>2342sdfdf</p>
          </span>
          <span id="span9" className="mainDivspan">
            <h2>Valuation</h2>
            <p>View pdf</p>
          </span>
        </div>
      </div>
      <button className="viewBtn">View Receipt</button>
      <div id="messageDiv">
        <h1>Comments</h1>
        <div className="convoDiv">
          <div className="leftmessageDiv">
            <p className="messagep">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Pellentesque tempor vitae mi et imperdiet. Donec venenatis
              consectetur tortor, tincidunt ultrices nulla dapibus a.
            </p>
          </div>
          <div className="rightmessageDiv">
            <p className="messagep">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Pellentesque tempor vitae mi et imperdiet. Donec venenatis
              consectetur tortor, tincidunt ultrices nulla dapibus a.
            </p>
          </div>
          <div className="leftmessageDiv">
            <p className="messagep">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Pellentesque tempor vitae mi et imperdiet. Donec venenatis
              consectetur tortor, tincidunt ultrices nulla dapibus a.
            </p>
          </div>
          <div className="rightmessageDiv">
            <p className="messagep">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Pellentesque tempor vitae mi et imperdiet. Donec venenatis
              consectetur tortor, tincidunt ultrices nulla dapibus a.
            </p>
          </div>
          <div className="leftmessageDiv">
            <p className="messagep">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Pellentesque tempor vitae mi et imperdiet. Donec venenatis
              consectetur tortor, tincidunt ultrices nulla dapibus a.
            </p>
          </div>
          <div className="rightmessageDiv">
            <p className="messagep">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Pellentesque tempor vitae mi et imperdiet. Donec venenatis
              consectetur tortor, tincidunt ultrices nulla dapibus a.
            </p>
          </div>
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
