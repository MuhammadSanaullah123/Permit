import React from "react";

//mui
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const InvoicesTable = ({ rows }) => {
  return (
    <div className="tableDiv">
      <TableContainer id="table" component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell className="tableHeading">Document Name</TableCell>
              <TableCell className="tableHeading" align="left">
                Payments
              </TableCell>
              <TableCell className="tableHeading" align="left">
                Date
              </TableCell>
              <TableCell className="tableHeading" align="left">
                Name
              </TableCell>
              <TableCell className="tableHeading" align="left">
                Address
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
                  {row.docname}
                </TableCell>
                <TableCell align="left" className="rowvalue">
                  {row.payment}
                </TableCell>
                <TableCell align="left" className="rowvalue">
                  {row.date}
                </TableCell>
                <TableCell align="left" className="rowvalue rowname">
                  {row.name}
                </TableCell>
                <TableCell
                  align="left"
                  className="rowvalue"
                  style={{ maxWidth: "370px" }}
                >
                  {row.address}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default InvoicesTable;
