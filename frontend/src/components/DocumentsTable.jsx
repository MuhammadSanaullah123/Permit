import React from "react";
import { Link } from "react-router-dom";

//assets
import deleteIcon from "../assets/delete.png";
import downloadIcon from "../assets/download.png";
import view from "../assets/view.png";
//mui
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

/* function createData(name, created, actions, status) {
  return { name, created, actions, status };
} */

/* const rows = [
  createData(
    "Steller B",
    "29 Augest 2023",
    "SN",
    <div className="statusDiv">
      <p>Approved</p>
      <img className="deleteIcon" src={deleteIcon} alt="delete" />
      <img src={downloadIcon} alt="download" />
    </div>
  ),
  createData(
    "Steller B",
    "29 Augest 2023",
    "SN",
    <div className="statusDiv">
      <p>Approved</p>
      <img className="deleteIcon" src={deleteIcon} alt="delete" />
      <img src={downloadIcon} alt="download" />
    </div>
  ),
  createData(
    "Steller B",
    "29 Augest 2023",
    "SN",
    <div className="statusDiv">
      <p>Approved</p>
      <img className="deleteIcon" src={deleteIcon} alt="delete" />
      <img src={downloadIcon} alt="download" />
    </div>
  ),
  createData(
    "Steller B",
    "29 Augest 2023",
    "SN",
    <div className="statusDiv">
      <p>Approved</p>
      <img className="deleteIcon" src={deleteIcon} alt="delete" />
      <img src={downloadIcon} alt="download" />
    </div>
  ),
  createData(
    "Steller B",
    "29 Augest 2023",
    "SN",
    <div className="statusDiv">
      <p>Approved</p>
      <img className="deleteIcon" src={deleteIcon} alt="delete" />
      <img src={downloadIcon} alt="download" />
    </div>
  ),
  createData(
    "Steller B",
    "29 Augest 2023",
    "SN",
    <div className="statusDiv">
      <p>Approved</p>
      <img className="deleteIcon" src={deleteIcon} alt="delete" />
      <img src={downloadIcon} alt="download" />
    </div>
  ),
  createData(
    "Steller B",
    "29 Augest 2023",
    "SN",
    <div className="statusDiv">
      <p>Approved</p>
      <img className="deleteIcon" src={deleteIcon} alt="delete" />
      <img src={downloadIcon} alt="download" />
    </div>
  ),
]; */

const DocumentsTable = ({ rows }) => {
  return (
    <div>
      <TableContainer id="table" component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell className="tableHeading">Document Name</TableCell>
              <TableCell className="tableHeading" align="left">
                Created on
              </TableCell>
              <TableCell className="tableHeading" align="center">
                Actions
              </TableCell>
              <TableCell className="tableHeading" align="center">
                Status
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows?.map((row, index) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row" className="rowvalue">
                  {row.name}
                </TableCell>
                <TableCell align="left" className="rowvalue">
                  {row.created}
                </TableCell>
                <TableCell align="center" className="rowvalue">
                  {row.actions}
                </TableCell>
                <TableCell align="center" className="rowvalue">
                  {/*   {row.status} */}
                  <div className="statusDiv">
                    <p>Approved</p>
                    <img className="deleteIcon" src={deleteIcon} alt="delete" />
                    <img src={downloadIcon} alt="download" />
                    <Link
                      to="/document/123"
                      style={{
                        display: `${
                          window.location.pathname.split("/")[1] === "admin"
                            ? "flex"
                            : "none"
                        }`,
                      }}
                    >
                      <img src={view} alt="view" />
                    </Link>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default DocumentsTable;
