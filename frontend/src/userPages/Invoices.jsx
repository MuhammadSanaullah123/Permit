import React, { useState, useEffect } from "react";

//components
import InvoicesTable from "../components/InvoicesTable";

//mui
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

//other
import { toast } from "react-toastify";

//api
import { useDispatch, useSelector } from "react-redux";
import { useGetAllInvoiceMutation } from "../slices/invoiceApiSlice";
import { setInvoice } from "../slices/invoiceSlice";
const Invoices = () => {
  const dispatch = useDispatch();
  const { invoiceInfo } = useSelector((state) => state.invoice);
  const [getAllInvoice] = useGetAllInvoiceMutation();
  const [data, setData] = useState();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(data?.length / itemsPerPage);

  const handlePageChange = async (e, page) => {
    setCurrentPage(page);
  };

  const handleGetAllInvoice = async () => {
    try {
      const res = await getAllInvoice().unwrap();
      setData(res);
      dispatch(setInvoice({ ...res }));
    } catch (error) {
      error.data.errors.forEach((error) => {
        toast.error(error.msg);
      });
    }
  };
  useEffect(() => {
    handleGetAllInvoice();
  }, []);
  const paginatedData =
    data &&
    Array.isArray(data) &&
    data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  console.log(data);
  return (
    <div id="invoices">
      <InvoicesTable rows={paginatedData} />

      <Stack id="pagination" spacing={2}>
        <Pagination
          onChange={handlePageChange}
          count={totalPages}
          page={currentPage}
          color="primary"
        />
      </Stack>
    </div>
  );
};

export default Invoices;
