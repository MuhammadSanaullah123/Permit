import React, { useState, useEffect } from "react";

//components
import CusotmersTable from "../components/CusotmersTable";

//mui
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
//others
import { RotatingLines } from "react-loader-spinner";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  useGetAllUsersMutation,
  useGetUserByIdMutation,
} from "../slices/usersApiSlice";
import { setUsers } from "../slices/authSlice";
const Customers = () => {
  const dispatch = useDispatch();
  const [getAllUsers] = useGetAllUsersMutation();
  const { userInfo } = useSelector((state) => state.auth);

  const [data, setData] = useState();
  const [documentAvail, setDocumentAvail] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(data?.length / itemsPerPage);

  const handlePageChange = async (e, page) => {
    setCurrentPage(page);
  };

  const handleGetAllUsers = async () => {
    try {
      const res = await getAllUsers().unwrap();

      dispatch(setUsers({ ...res }));
      setData(res);
    } catch (error) {
      console.error(error.data.msg);
      if (error.data.msg === "Users not found") {
        setDocumentAvail(false);
      }
    }
  };
  console.log(data);
  useEffect(() => {
    handleGetAllUsers();
  }, []);
  useEffect(() => {
    if (userInfo) {
      setData(userInfo);
    }
  }, [userInfo]);
  const paginatedData =
    data &&
    Array.isArray(data) &&
    data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  console.log(paginatedData);
  console.log(documentAvail);
  return (
    <div id="invoices">
      <h1 className="h1">Customers</h1>

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
          <CusotmersTable rows={paginatedData} />
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
              width: "95%",
              alignSelf: "center",
            }}
          >
            <h3>No Customers</h3>
          </div>
        )
      )}
    </div>
  );
};

export default Customers;
