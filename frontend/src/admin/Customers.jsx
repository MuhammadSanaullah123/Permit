import React, { useState } from "react";

//components
import CusotmersTable from "../components/CusotmersTable";

//mui
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

const Customers = () => {
  function createData(name, date, email, document) {
    return { name, date, email, document };
  }
  const rows = [
    createData(
      "Steller B",
      "29 Augest 2023",
      "SN@gmail.com",
      <div className="docDiv">
        <p>12</p>
      </div>
    ),
    createData(
      "Steller B",
      "29 Augest 2023",
      "SN@gmail.com",
      <div className="docDiv">
        <p>12</p>
      </div>
    ),
    createData(
      "Steller B",
      "29 Augest 2023",
      "SN@gmail.com",
      <div className="docDiv">
        <p>12</p>
      </div>
    ),
    createData(
      "Steller B",
      "29 Augest 2023",
      "SN@gmail.com",
      <div className="docDiv">
        <p>12</p>
      </div>
    ),
    createData(
      "Steller B",
      "29 Augest 2023",
      "SN@gmail.com",
      <div className="docDiv">
        <p>12</p>
      </div>
    ),
    createData(
      "Steller B",
      "29 Augest 2023",
      "SN@gmail.com",
      <div className="docDiv">
        <p>12</p>
      </div>
    ),
    createData(
      "Steller B",
      "29 Augest 2023",
      "SN@gmail.com",
      <div className="docDiv">
        <p>12</p>
      </div>
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
      <h1 className="h1">Customers</h1>
      <CusotmersTable rows={data} />

      <Stack id="pagination" spacing={2}>
        <Pagination onChange={handlePageChange} count={pages} color="primary" />
      </Stack>
    </div>
  );
};

export default Customers;
