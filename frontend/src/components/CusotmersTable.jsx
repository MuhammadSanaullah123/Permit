import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
//other
import Moment from "react-moment";
import { toast } from "react-toastify";

//api
import { useDispatch, useSelector } from "react-redux";
import { useGetAllUsersDocumentsMutation } from "../slices/documentApiSlice";
import { setDocument } from "../slices/documentSlice";

const CusotmersTable = ({ rows }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [getAllDocument] = useGetAllUsersDocumentsMutation();
  const { documentInfo } = useSelector((state) => state.document);
  const handleGetAllDocuments = async () => {
    try {
      const res = await getAllDocument().unwrap();

      dispatch(setDocument({ ...res }));
    } catch (error) {
      error.data.errors.forEach((error) => {
        toast.error(error.msg);
      });
    }
  };
  useEffect(() => {
    handleGetAllDocuments();
  }, []);
  console.log(documentInfo);
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
              <TableCell className="tableHeading" align="center">
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.isArray(rows) &&
              rows.map((row, index) => {
                const noOfDocs = documentInfo?.filter(
                  (document) => document.user === row._id
                );

                return (
                  <TableRow
                    key={index}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    onClick={() =>
                      window.location.assign(`/admin/customer/${row._id}`)
                    }
                  >
                    <TableCell component="th" scope="row" className="rowvalue">
                      {row.name}
                    </TableCell>
                    <TableCell align="left" className="rowvalue">
                      <Moment format="DD MMMM YYYY">{row.createdAt}</Moment>
                    </TableCell>
                    <TableCell align="left" className="rowvalue">
                      {row.email}
                    </TableCell>
                    <TableCell align="center" className="rowvalue">
                      <div className="docDiv">
                        <p>{noOfDocs?.length}</p>
                      </div>
                      {/*      {row.document} */}
                    </TableCell>
                    <TableCell align="center" className="rowvalue">
                      <img
                        src={view}
                        alt="view"
                        style={{
                          width: "30px",
                          height: "30px",
                        }}
                        onClick={() =>
                          window.location.assign(`/admin/customer/${row._id}`)
                        }
                      />
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default CusotmersTable;
