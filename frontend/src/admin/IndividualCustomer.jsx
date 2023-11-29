import React, { useState, useEffect } from "react";
import DocumentsTable from "../components/DocumentsTable";

//assets
import deleteIcon from "../assets/delete.png";
import downloadIcon from "../assets/download.png";

//mui
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
//others
import { RotatingLines } from "react-loader-spinner";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useGetUserByIdMutation } from "../slices/usersApiSlice";
import { setSingleUser } from "../slices/authSlice";
import { useGetAllUsersDocumentsMutation } from "../slices/documentApiSlice";
import { setDocument } from "../slices/documentSlice";
const IndividualCustomer = () => {
  const dispatch = useDispatch();
  const [getUser] = useGetUserByIdMutation();
  const [getAllDocument] = useGetAllUsersDocumentsMutation();

  const { userInfo } = useSelector((state) => state.auth);
  const { documentInfo } = useSelector((state) => state.document);

  const [statusCounts, setStatusCounts] = useState({
    Approved: 0,
    Rejected: 0,
    Pending: 0,
  });
  const [data, setData] = useState();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(data?.length / itemsPerPage);

  const handlePageChange = async (e, page) => {
    setCurrentPage(page);
  };

  const handleGetUser = async () => {
    try {
      const res = await getUser(
        window.location.pathname.split("/")[3]
      ).unwrap();

      dispatch(setSingleUser({ ...res }));
    } catch (error) {
      error.data.errors.forEach((error) => {
        toast.error(error.msg);
      });
    }
  };
  const handleGetAllDocuments = async () => {
    try {
      const res = await getAllDocument().unwrap();

      dispatch(setDocument({ ...res }));
      setData(res);
    } catch (error) {
      error.data.errors.forEach((error) => {
        toast.error(error.msg);
      });
    }
  };
  const handleDownload = (e, url) => {
    e.stopPropagation();
    const newTab = window.open(url, "_blank");
    if (newTab) {
      newTab.focus();
    } else {
      window.location.assign(url);
    }
  };
  useEffect(() => {
    handleGetUser();
    handleGetAllDocuments();
  }, []);

  useEffect(() => {
    if (documentInfo && Array.isArray(documentInfo)) {
      console.log(documentInfo);
      const currentUserDocuments = documentInfo?.filter(
        (document) => document?.user === userInfo?._id
      );

      setData(currentUserDocuments);

      const counts = currentUserDocuments?.reduce(
        (acc, obj) => {
          const status = obj.status;
          acc[status]++;
          return acc;
        },
        { Approved: 0, Rejected: 0, Pending: 0 }
      );

      setStatusCounts(counts);
    }
  }, [documentInfo]);
  const paginatedData =
    data &&
    Array.isArray(data) &&
    data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div id="individualcustomer">
      <div className="customerDiv">
        <div className="customerDiv1">
          <span
            className="imageRadiusDiv"
            style={{
              border: `${userInfo?.image ? "0" : "1px solid #fff"}`,
            }}
          >
            {userInfo?.image ? (
              <img src={userInfo?.image} alt="" className="userPic" />
            ) : (
              <i className="fa-solid fa-user defaultUser"></i>
            )}
          </span>

          <div className="detailDiv">
            <span>
              <h1>Customer Name</h1>
              <p>{userInfo?.name}</p>
            </span>
            <span>
              <h1>Email</h1>
              <p>{userInfo?.email}</p>
            </span>
            <span>
              <h1>No of documents Submitted</h1>
              <p>{data && data?.length}</p>
            </span>
          </div>
        </div>
      </div>
      <div className="documentDetailDiv">
        <span id="span1">
          <h1>Drafted</h1>
          <h2>01</h2>
        </span>
        <span id="span2">
          <h1>Rejected</h1>
          <h2>{statusCounts.Rejected}</h2>
        </span>
        <span id="span3">
          <h1>Sent for Approval</h1>
          <h2>{statusCounts.Pending}</h2>
        </span>
        <span id="span4">
          <h1>Approved</h1>
          <h2>{statusCounts.Approved}</h2>
        </span>
      </div>
      <div className="individualTableDiv">
        <h1>Recent Documents</h1>

        {!paginatedData?.length > 0 ? (
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
        ) : (
          <>
            <DocumentsTable
              rows={paginatedData}
              handleDownload={handleDownload}
            />
            <Stack id="pagination" spacing={2}>
              <Pagination
                onChange={handlePageChange}
                count={totalPages}
                page={currentPage}
                color="primary"
              />
            </Stack>
          </>
        )}
      </div>
    </div>
  );
};

export default IndividualCustomer;
