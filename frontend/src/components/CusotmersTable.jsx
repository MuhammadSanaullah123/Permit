import React from "react";

//mui
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
//assets
import view from "../assets/view.png";

const CusotmersTable = ({ rows }) => {
  return (
    <div className="tableDiv">
      <TableContainer
        id="table"
        component={Paper}
        style={{
          padding: "0",
        }}
      >
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell className="tableHeading">Customer Name</TableCell>
              <TableCell className="tableHeading" align="left">
                Date
              </TableCell>
              <TableCell className="tableHeading" align="left">
                Email
              </TableCell>
              <TableCell className="tableHeading" align="center">
                Documents Received
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
                  {row.date}
                </TableCell>
                <TableCell align="left" className="rowvalue">
                  {row.email}
                </TableCell>
                <TableCell align="center" className="rowvalue">
                  <div className="docDiv">
                    <p>12</p>
                    <img src={view} alt="view" />
                  </div>
                  {/*      {row.document} */}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default CusotmersTable;
