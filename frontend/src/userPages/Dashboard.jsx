import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
//assets
import welcome from "../assets/welcome.png";
//components
import DocumentsTable from "../components/DocumentsTable";

//mui
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { toast } from "react-toastify";
//api
import { useDispatch, useSelector } from "react-redux";
import {
  useGetDocumentsMutation,
  useDeleteDocumentMutation,
} from "../slices/documentApiSlice";
import { setDocument } from "../slices/documentSlice";
//others
import { RotatingLines } from "react-loader-spinner";
const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [getAllDocument] = useGetDocumentsMutation();
  const [deleteDocument] = useDeleteDocumentMutation();

  const { documentInfo } = useSelector((state) => state.document);
  const [statusCounts, setStatusCounts] = useState({
    Approved: 0,
    Rejected: 0,
    Pending: 0,
  });
  const [data, setData] = useState();
  const [documentAvail, setDocumentAvail] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(data?.length / itemsPerPage);

  const handlePageChange = async (e, page) => {
    setCurrentPage(page);
  };

  const handleGetAllDocuments = async () => {
    try {
      const res = await getAllDocument().unwrap();
      console.log(res);
      const sortedData = [...res].sort((a, b) => {
        const dateA = new Date(a.createdAt);
        const dateB = new Date(b.createdAt);

        return dateB - dateA;
      });
      console.log(sortedData);
      dispatch(setDocument({ ...sortedData }));
      setData(sortedData);
    } catch (error) {
      console.error(error);
      if (error?.data?.msg === "Documents not found") {
        setDocumentAvail(false);
      }
    }
  };

  const handleDelete = async (e, id) => {
    e.stopPropagation();
    try {
      const res = await deleteDocument(id).unwrap();
      toast.success("Document Deleted", { position: "top-center" });

      handleGetAllDocuments();
    } catch (error) {
      error.data.errors.forEach((error) => {
        toast.error(error.msg);
      });
    }
  };
  const handleDownload = (e, url) => {
    e.stopPropagation();

    window.location.assign(url);
  };
  console.log(data);
  useEffect(() => {
    handleGetAllDocuments();
  }, []);
  useEffect(() => {
    if (documentInfo && Array.isArray(documentInfo)) {
      setData(documentInfo);
      const counts = documentInfo.reduce(
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
  console.log(documentAvail);
  return (
    <div id="dashboard">
      <div className="dashbaordDiv">
        <div className="dashbaordDiv1">
          <span>
            <h1>Welcome</h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
              interdum, arcu ut tempus fermentum, urna diam consequat sapien, eu
              bibendum quam velit ut augue.
            </p>
          </span>
          <img src={welcome} alt="welcome" />
        </div>
        <div className="dashbaordDiv1 dashbaordDiv2">
          <h1>Upload New Documents</h1>
          <button onClick={() => navigate("/user/upload")}>Upload</button>
        </div>
        <div className="dashbaordsmallDiv" id="dashbaordDivDrafted">
          <h1>Total</h1>
          <h2>
            {statusCounts.Rejected +
              statusCounts.Pending +
              statusCounts.Approved}
          </h2>
        </div>
        <div className="dashbaordsmallDiv" id="dashbaordDivRejected">
          <h1>Rejected</h1>
          <h2>{statusCounts.Rejected}</h2>
        </div>
        <div className="dashbaordsmallDiv" id="dashbaordDivSent">
          <h1>Sent for Approval</h1>
          <h2>{statusCounts.Pending}</h2>
        </div>
        <div className="dashbaordsmallDiv" id="dashbaordDivApproved">
          <h1>Approved</h1>
          <h2>{statusCounts.Approved}</h2>
        </div>
      </div>
      <h1 className="rech1">Recent Documents</h1>
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
          <DocumentsTable
            rows={paginatedData}
            handleDelete={handleDelete}
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
      ) : (
        paginatedData?.length === 0 &&
        documentAvail === false && (
          <div
            style={{
              marginTop: "20px",
            }}
          >
            <h2>No Documents</h2>
          </div>
        )
      )}
    </div>
  );
};

export default Dashboard;
