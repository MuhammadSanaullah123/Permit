import React, { useState } from "react";
import DocumentsTable from "../components/DocumentsTable";

//assets
import deleteIcon from "../assets/delete.png";
import downloadIcon from "../assets/download.png";

//mui
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

const IndividualCustomer = () => {
  function createData(name, created, actions, status) {
    return { name, created, actions, status };
  }
  const rows = [
    createData(
      "Steller B 1",
      "29 Augest 2023",
      "SN",
      <div className="statusDiv">
        <p>Approved</p>
        <img className="deleteIcon" src={deleteIcon} alt="delete" />
        <img src={downloadIcon} alt="download" />
      </div>
    ),
    createData(
      "Steller B 2",
      "29 Augest 2023",
      "SN",
      <div className="statusDiv">
        <p>Approved</p>
        <img className="deleteIcon" src={deleteIcon} alt="delete" />
        <img src={downloadIcon} alt="download" />
      </div>
    ),
    createData(
      "Steller B 3",
      "29 Augest 2023",
      "SN",
      <div className="statusDiv">
        <p>Approved</p>
        <img className="deleteIcon" src={deleteIcon} alt="delete" />
        <img src={downloadIcon} alt="download" />
      </div>
    ),
    createData(
      "Steller B 4",
      "29 Augest 2023",
      "SN",
      <div className="statusDiv">
        <p>Approved</p>
        <img className="deleteIcon" src={deleteIcon} alt="delete" />
        <img src={downloadIcon} alt="download" />
      </div>
    ),
    createData(
      "Steller B 5",
      "29 Augest 2023",
      "SN",
      <div className="statusDiv">
        <p>Approved</p>
        <img className="deleteIcon" src={deleteIcon} alt="delete" />
        <img src={downloadIcon} alt="download" />
      </div>
    ),
    createData(
      "Steller B 6",
      "29 Augest 2023",
      "SN",
      <div className="statusDiv">
        <p>Approved</p>
        <img className="deleteIcon" src={deleteIcon} alt="delete" />
        <img src={downloadIcon} alt="download" />
      </div>
    ),
    createData(
      "Steller B 7",
      "29 Augest 2023",
      "SN",
      <div className="statusDiv">
        <p>Approved</p>
        <img className="deleteIcon" src={deleteIcon} alt="delete" />
        <img src={downloadIcon} alt="download" />
      </div>
    ),
  ];

  const [data, setData] = useState(rows);

  const itemsToShow = 5;
  const pages = Math.ceil(rows.length / itemsToShow);

  const handlePageChange = async (e, page) => {
    console.log(page);

    if (rows.length > (page - 1) * 5 && rows.length < itemsToShow * page) {
      setData(rows.slice((page - 1) * 5, rows.length));
    } else {
      setData(rows.slice((page - 1) * 5, itemsToShow * page));
    }
    console.log(rows.slice((page - 1) * 5, itemsToShow * page));
  };

  return (
    <div id="individualcustomer">
      <div className="customerDiv">
        <div className="customerDiv1">
          <span className="imageRadiusDiv">
            <i className="fa-solid fa-user defaultUser"></i>
          </span>

          <div className="detailDiv">
            <span>
              <h1>Customer Name</h1>
              <p>Steller B</p>
            </span>
            <span>
              <h1>Email</h1>
              <p>StellerB@gmail.com</p>
            </span>
            <span>
              <h1>No of documents Submitted</h1>
              <p>12</p>
            </span>
          </div>
        </div>
      </div>
      <div className="documentDetailDiv">
        <span id="span1">
          <h1>Drafted</h1>
          <h2>01</h2>
        </span>
        <span id="span2">
          <h1>Rejected</h1>
          <h2>01</h2>
        </span>
        <span id="span3">
          <h1>Sent for Approval</h1>
          <h2>01</h2>
        </span>
        <span id="span4">
          <h1>Approved</h1>
          <h2>01</h2>
        </span>
      </div>
      <div className="individualTableDiv">
        <h1>Recent Documents</h1>
        <DocumentsTable rows={data} />
        <Stack id="pagination" spacing={2}>
          <Pagination
            onChange={handlePageChange}
            count={pages}
            color="primary"
          />
        </Stack>
      </div>
    </div>
  );
};

export default IndividualCustomer;
