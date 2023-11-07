import React, { useState } from "react";

//components
import InvoicesTable from "../components/InvoicesTable";

//mui
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

const Invoices = () => {
  function createData(docname, payment, date, name, address) {
    return { docname, payment, date, name, address };
  }
  const rows = [
    createData(
      "2912",
      "$21,500",
      "2021-05-29",
      "Rechazada",
      <p style={{ maxHeight: "100px", overflowY: "auto" }}>
        Lorem ipsum dolor sit amet, consectet Lorem ipsum dolor sit amet,
        consectet Lorem ipsum dolor sit amet, consectet , consectet Lorem ipsum
        dolor sit amet, consectet , consectet Lorem ipsum dolor sit amet,
        consectet consectet Lorem ipsum dolor sit amet, consectet consectet
        Lorem ipsum dolor sit amet, consectet consectet Lorem ipsum dolor sit
        amet, consectet consectet Lorem ipsum dolor sit amet, consectet
      </p>
    ),
    createData(
      "2912",
      "$21,500",
      "2021-05-29",
      "Rechazada",
      <p style={{ maxHeight: "100px", overflowY: "auto" }}>
        Lorem ipsum dolor sit amet, consectet Lorem ipsum dolor sit amet,
        consectet Lorem ipsum dolor sit amet, consectet , consectet Lorem ipsum
        dolor sit amet, consectet , consectet Lorem ipsum dolor sit amet,
        consectet consectet Lorem ipsum dolor sit amet, consectet consectet
        Lorem ipsum dolor sit amet, consectet consectet Lorem ipsum dolor sit
        amet, consectet consectet Lorem ipsum dolor sit amet, consectet
      </p>
    ),
    createData(
      "2912",
      "$21,500",
      "2021-05-29",
      "Rechazada",
      <p style={{ maxHeight: "100px", overflowY: "auto" }}>
        Lorem ipsum dolor sit amet, consectet Lorem ipsum dolor sit amet,
        consectet Lorem ipsum dolor sit amet, consectet , consectet Lorem ipsum
        dolor sit amet, consectet , consectet Lorem ipsum dolor sit amet,
        consectet consectet Lorem ipsum dolor sit amet, consectet consectet
        Lorem ipsum dolor sit amet, consectet consectet Lorem ipsum dolor sit
        amet, consectet consectet Lorem ipsum dolor sit amet, consectet
      </p>
    ),
    createData(
      "2912",
      "$21,500",
      "2021-05-29",
      "Rechazada",
      <p style={{ maxHeight: "100px", overflowY: "auto" }}>
        Lorem ipsum dolor sit amet, consectet Lorem ipsum dolor sit amet,
        consectet Lorem ipsum dolor sit amet, consectet , consectet Lorem ipsum
        dolor sit amet, consectet , consectet Lorem ipsum dolor sit amet,
        consectet consectet Lorem ipsum dolor sit amet, consectet consectet
        Lorem ipsum dolor sit amet, consectet consectet Lorem ipsum dolor sit
        amet, consectet consectet Lorem ipsum dolor sit amet, consectet
      </p>
    ),
    createData(
      "2912",
      "$21,500",
      "2021-05-29",
      "Rechazada",
      <p style={{ maxHeight: "100px", overflowY: "auto" }}>
        Lorem ipsum dolor sit amet, consectet Lorem ipsum dolor sit amet,
        consectet Lorem ipsum dolor sit amet, consectet , consectet Lorem ipsum
        dolor sit amet, consectet , consectet Lorem ipsum dolor sit amet,
        consectet consectet Lorem ipsum dolor sit amet, consectet consectet
        Lorem ipsum dolor sit amet, consectet consectet Lorem ipsum dolor sit
        amet, consectet consectet Lorem ipsum dolor sit amet, consectet
      </p>
    ),
    createData(
      "2912",
      "$21,500",
      "2021-05-29",
      "Rechazada",
      <p style={{ maxHeight: "100px", overflowY: "auto" }}>
        Lorem ipsum dolor sit amet, consectet Lorem ipsum dolor sit amet,
        consectet Lorem ipsum dolor sit amet, consectet , consectet Lorem ipsum
        dolor sit amet, consectet , consectet Lorem ipsum dolor sit amet,
        consectet consectet Lorem ipsum dolor sit amet, consectet consectet
        Lorem ipsum dolor sit amet, consectet consectet Lorem ipsum dolor sit
        amet, consectet consectet Lorem ipsum dolor sit amet, consectet
      </p>
    ),
    createData(
      "2912",
      "$21,500",
      "2021-05-29",
      "Rechazada",
      <p style={{ maxHeight: "100px", overflowY: "auto" }}>
        Lorem ipsum dolor sit amet, consectet Lorem ipsum dolor sit amet,
        consectet Lorem ipsum dolor sit amet, consectet , consectet Lorem ipsum
        dolor sit amet, consectet , consectet Lorem ipsum dolor sit amet,
        consectet consectet Lorem ipsum dolor sit amet, consectet consectet
        Lorem ipsum dolor sit amet, consectet consectet Lorem ipsum dolor sit
        amet, consectet consectet Lorem ipsum dolor sit amet, consectet
      </p>
    ),
    createData(
      "2912",
      "$21,500",
      "2021-05-29",
      "Rechazada",
      <p style={{ maxHeight: "100px", overflowY: "auto" }}>
        Lorem ipsum dolor sit amet, consectet Lorem ipsum dolor sit amet,
        consectet Lorem ipsum dolor sit amet, consectet , consectet Lorem ipsum
        dolor sit amet, consectet , consectet Lorem ipsum dolor sit amet,
        consectet consectet Lorem ipsum dolor sit amet, consectet consectet
        Lorem ipsum dolor sit amet, consectet consectet Lorem ipsum dolor sit
        amet, consectet consectet Lorem ipsum dolor sit amet, consectet
      </p>
    ),
    createData(
      "2912",
      "$21,500",
      "2021-05-29",
      "Rechazada",
      <p style={{ maxHeight: "100px", overflowY: "auto" }}>
        Lorem ipsum dolor sit amet, consectet Lorem ipsum dolor sit amet,
        consectet Lorem ipsum dolor sit amet, consectet , consectet Lorem ipsum
        dolor sit amet, consectet , consectet Lorem ipsum dolor sit amet,
        consectet consectet Lorem ipsum dolor sit amet, consectet consectet
        Lorem ipsum dolor sit amet, consectet consectet Lorem ipsum dolor sit
        amet, consectet consectet Lorem ipsum dolor sit amet, consectet
      </p>
    ),
    createData(
      "2912",
      "$21,500",
      "2021-05-29",
      "Rechazada",
      <p style={{ maxHeight: "100px", overflowY: "auto" }}>
        Lorem ipsum dolor sit amet, consectet Lorem ipsum dolor sit amet,
        consectet Lorem ipsum dolor sit amet, consectet , consectet Lorem ipsum
        dolor sit amet, consectet , consectet Lorem ipsum dolor sit amet,
        consectet consectet Lorem ipsum dolor sit amet, consectet consectet
        Lorem ipsum dolor sit amet, consectet consectet Lorem ipsum dolor sit
        amet, consectet consectet Lorem ipsum dolor sit amet, consectet
      </p>
    ),
    createData(
      "2912",
      "$21,500",
      "2021-05-29",
      "Rechazada",
      <p style={{ maxHeight: "100px", overflowY: "auto" }}>
        Lorem ipsum dolor sit amet, consectet Lorem ipsum dolor sit amet,
        consectet Lorem ipsum dolor sit amet, consectet , consectet Lorem ipsum
        dolor sit amet, consectet , consectet Lorem ipsum dolor sit amet,
        consectet consectet Lorem ipsum dolor sit amet, consectet consectet
        Lorem ipsum dolor sit amet, consectet consectet Lorem ipsum dolor sit
        amet, consectet consectet Lorem ipsum dolor sit amet, consectet
      </p>
    ),
    createData(
      "2912",
      "$21,500",
      "2021-05-29",
      "Rechazada",
      <p style={{ maxHeight: "100px", overflowY: "auto" }}>
        Lorem ipsum dolor sit amet, consectet Lorem ipsum dolor sit amet,
        consectet Lorem ipsum dolor sit amet, consectet , consectet Lorem ipsum
        dolor sit amet, consectet , consectet Lorem ipsum dolor sit amet,
        consectet consectet Lorem ipsum dolor sit amet, consectet consectet
        Lorem ipsum dolor sit amet, consectet consectet Lorem ipsum dolor sit
        amet, consectet consectet Lorem ipsum dolor sit amet, consectet
      </p>
    ),
  ];
  const [data, setData] = useState(rows);

  const itemsToShow = 10;
  const pages = Math.ceil(rows.length / itemsToShow);

  const handlePageChange = async (e, page) => {
    console.log(page);

    if (
      rows.length > (page - 1) * itemsToShow &&
      rows.length < itemsToShow * page
    ) {
      setData(rows.slice((page - 1) * itemsToShow, rows.length));
    } else {
      setData(rows.slice((page - 1) * itemsToShow, itemsToShow * page));
    }
    console.log(rows.slice((page - 1) * itemsToShow, itemsToShow * page));
  };

  return (
    <div id="invoices">
      <InvoicesTable rows={data} />

      <Stack id="pagination" spacing={2}>
        <Pagination onChange={handlePageChange} count={pages} color="primary" />
      </Stack>
    </div>
  );
};

export default Invoices;
