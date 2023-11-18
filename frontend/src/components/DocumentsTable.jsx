import React from "react";
import { Link, useNavigate } from "react-router-dom";

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

//other
import Moment from "react-moment";

const DocumentsTable = ({ rows, handleDelete, handleDownload }) => {
  const navigate = useNavigate();
  return (
    <div>
      <TableContainer id="table" component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell className="tableHeading">Project Name</TableCell>
              <TableCell className="tableHeading" align="left">
                Created on
              </TableCell>
              <TableCell className="tableHeading" align="center">
                Permit Type
              </TableCell>
              <TableCell className="tableHeading" align="center">
                Status
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.isArray(rows) &&
              rows?.map((row, index) => (
                <TableRow
                  key={row._id}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                    cursor: "pointer",
                  }}
                  onClick={() =>
                    window.location.replace(`/document/${row._id}`)
                  }
                >
                  <TableCell component="th" scope="row" className="rowvalue">
                    {row.projectName}
                  </TableCell>
                  <TableCell align="left" className="rowvalue">
                    <Moment format="DD MMMM YYYY">{row.createdAt}</Moment>
                  </TableCell>
                  <TableCell align="center" className="rowvalue">
                    {row.permitType}
                  </TableCell>
                  <TableCell align="center" className="rowvalue">
                    {/*   {row.status} */}
                    <div className="statusDiv">
                      <p
                        style={{
                          color: `${
                            row.status === "Pending"
                              ? "#3F3EED"
                              : row.status === "Approved"
                              ? "#52ff00"
                              : "#e74c3c"
                          }`,
                        }}
                      >
                        {row.status}
                      </p>
                      <img
                        className="deleteIcon"
                        src={deleteIcon}
                        alt="delete"
                        onClick={(e) => handleDelete(e, row._id)}
                      />

                      <img
                        src={downloadIcon}
                        alt="download"
                        onClick={(e) => handleDownload(e, row.url)}
                      />

                      <Link
                        onClick={() =>
                          window.location.replace(`/document/${row._id}`)
                        }
                        style={{
                          display: `${
                            sessionStorage.getItem("userInfo") &&
                            JSON.parse(sessionStorage.getItem("userInfo"))
                              .role === "admin"
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
