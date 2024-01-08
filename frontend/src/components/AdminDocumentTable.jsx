import React, { useState } from "react";
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
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
//other
import Moment from "react-moment";
const AdminDocumentTable = ({
  rows,
  handleDelete,
  handleUpdate,
  handleDownload,
}) => {
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
              <TableCell className="tableHeading" align="center">
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.isArray(rows) &&
              rows.map((row, index) => (
                <TableRow
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  /*   onClick={() => navigate(`/document/${row._id}`)} */
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
                    <div
                      className="statusDiv"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <FormControl sx={{ m: 1, minWidth: 120 }}>
                        <Select
                          value={row.status}
                          onChange={(e) => {
                            e.stopPropagation();
                            handleUpdate(e, row._id, e.target.value);
                          }}
                          displayEmpty
                          inputProps={{ "aria-label": "Without label" }}
                          sx={{
                            color: `${
                              row.status === "Approved"
                                ? "#52FF00"
                                : row.status === "Rejected"
                                ? "#e22121"
                                : row.status === "Pending"
                                ? "#3F3EED"
                                : "#3F3EED"
                            }`,
                          }}
                        >
                          <MenuItem value="">
                            <em>None</em>
                          </MenuItem>
                          <MenuItem value="Approved">Approved</MenuItem>
                          <MenuItem value="Pending">Pending</MenuItem>
                          <MenuItem value="Rejected">Rejected</MenuItem>
                        </Select>
                      </FormControl>

                      {/* {row.status} */}
                    </div>
                  </TableCell>

                  <TableCell align="center" className="rowvalue">
                    <div className="actionDiv">
                      <img
                        className="deleteIcon"
                        src={deleteIcon}
                        alt="delete"
                        onClick={(e) => handleDelete(e, row._id)}
                      />
                      <img
                        style={{
                          cursor: "pointer",
                        }}
                        src={downloadIcon}
                        alt="download"
                        onClick={(e) => handleDownload(e, row.url)}
                      />
                      <Link
                        to={`/document/${row._id}`}
                        style={{
                          display: `${
                            JSON.parse(sessionStorage.getItem("userInfo"))
                              .role === "admin"
                              ? "flex"
                              : "none"
                          }`,
                        }}
                      >
                        <img src={view} alt="view" className="viewIcon" />
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

export default AdminDocumentTable;
