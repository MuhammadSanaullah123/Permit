import React, { useState } from "react";

//assets
import welcome from "../assets/welcome.png";
import deleteIcon from "../assets/delete.png";
import downloadIcon from "../assets/download.png";
//components
import AdminDocumentTable from "../components/AdminDocumentTable";

//mui
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

const Dashboard = () => {
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
    <div id="dashboard">
      <div className="dashbaordDiv">
        <div className="dashbaordDiv1">
          <span>
            <h1>Welcome</h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
              interdum, arcu ut tempus fermentum, urna diam consequat sapien, eu
              bibendum quam velit ut augue.
            </p>
          </span>
          <img src={welcome} alt="welcome" />
        </div>
        <div className="dashbaordDiv1 dashbaordDiv2">
          <h1>Upload New Documents</h1>
          <button>Upload</button>
        </div>
        <div className="dashbaordsmallDiv" id="dashbaordDivDrafted">
          <h1>Drafted</h1>
          <h2>01</h2>
        </div>
        <div className="dashbaordsmallDiv" id="dashbaordDivRejected">
          <h1>Rejected</h1>
          <h2>01</h2>
        </div>
        <div className="dashbaordsmallDiv" id="dashbaordDivSent">
          <h1>Sent for Approval</h1>
          <h2>01</h2>
        </div>
        <div className="dashbaordsmallDiv" id="dashbaordDivApproved">
          <h1>Approved</h1>
          <h2>01</h2>
        </div>
      </div>
      <h1 className="rech1">Recent Documents</h1>
      <AdminDocumentTable rows={data} />
      <Stack id="pagination" spacing={2}>
        <Pagination onChange={handlePageChange} count={pages} color="primary" />
      </Stack>
    </div>
  );
};

export default Dashboard;
