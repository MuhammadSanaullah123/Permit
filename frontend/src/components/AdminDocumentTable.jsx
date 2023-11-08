import React, { useState } from "react";

//assets
import deleteIcon from "../assets/delete.png";
import downloadIcon from "../assets/download.png";
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

const AdminDocumentTable = ({ rows }) => {
  const [status, setStatus] = useState("Pending");
  console.log(status);

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
            {rows.map((row, index) => (
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
                  <div className="statusDiv">
                    <FormControl sx={{ m: 1, minWidth: 120 }}>
                      <Select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        displayEmpty
                        inputProps={{ "aria-label": "Without label" }}
                        sx={{
                          color: `${
                            status === "Approved"
                              ? "#52FF00"
                              : status === "Rejected"
                              ? "#e22121"
                              : status === "Pending"
                              ? "#fff"
                              : "#fff"
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

                    <img className="deleteIcon" src={deleteIcon} alt="delete" />
                    <img src={downloadIcon} alt="download" />
                    {/* {row.status} */}
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
