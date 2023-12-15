import React, { useState, useEffect } from "react";

//components
import InvoicesTable from "../components/InvoicesTable";

//mui
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

//other
import { toast } from "react-toastify";
import { RotatingLines } from "react-loader-spinner";
//api
import { useDispatch, useSelector } from "react-redux";
import {
  useGetAllInvoiceMutation,
  useGetAllInvoiceAllUsersMutation,
} from "../slices/invoiceApiSlice";
import { setInvoice } from "../slices/invoiceSlice";
const Invoices = () => {
  const dispatch = useDispatch();
  const { invoiceInfo } = useSelector((state) => state.invoice);
  const { userInfo } = useSelector((state) => state.auth);
  const [getAllInvoice] = useGetAllInvoiceMutation();
  const [getAllInvoiceAllUsers] = useGetAllInvoiceAllUsersMutation();

  const [data, setData] = useState();
  const [documentAvail, setDocumentAvail] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(data?.length / itemsPerPage);

  const handlePageChange = async (e, page) => {
    setCurrentPage(page);
  };

  const handleGetAllUsersInvoice = async () => {
    try {
      const res = await getAllInvoiceAllUsers().unwrap();
      setData(res);
      dispatch(setInvoice({ ...res }));
    } catch (error) {
      console.error(error.data.msg);
      if (error.data.msg === "Invoices not found") {
        setDocumentAvail(false);
      }
    }
  };

  const handleGetAllInvoice = async () => {
    try {
      const res = await getAllInvoice().unwrap();
      setData(res);
      dispatch(setInvoice({ ...res }));
    } catch (error) {
      console.error(error.data.msg);
      if (error.data.msg === "Invoices not found") {
        setDocumentAvail(false);
      }
    }
  };
  useEffect(() => {
    if (userInfo?.role === "admin") {
      handleGetAllUsersInvoice();
    }
    if (userInfo?.role === "user") {
      handleGetAllInvoice();
    }
  }, [userInfo]);

  const paginatedData =
    data && Array.isArray(data)
      ? data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
      : [];
  console.log(data);
  console.log(paginatedData);
  console.log(documentAvail);

  return (
    <div id="invoices">
      {paginatedData?.length === 0 && documentAvail === true ? (
        <div
          style={{
            alignSelf: "center",
          }}
        >
          <RotatingLines
            strokeColor="grey"
            strokeWidth="5"
            animationDuration="0.75"
            width="96"
            visible={true}
          />
        </div>
      ) : paginatedData?.length > 0 && documentAvail === true ? (
        <>
          <InvoicesTable rows={paginatedData} />
          <Stack id="pagination" spacing={2}>
            <Pagination
              onChange={handlePageChange}
              count={totalPages}
              page={currentPage}
              color="primary"
            />
          </Stack>
        </>
      ) : (
        paginatedData?.length === 0 &&
        documentAvail === false && (
          <div
            style={{
              marginTop: "20px",
            }}
          >
            <h2>No Invoices</h2>
          </div>
        )
      )}
    </div>
  );
};

export default Invoices;
