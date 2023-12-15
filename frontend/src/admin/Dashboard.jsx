import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
//assets
import welcome from "../assets/welcome.png";

//components
import AdminDocumentTable from "../components/AdminDocumentTable";

//mui
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
//others
import { RotatingLines } from "react-loader-spinner";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  useGetAllUsersDocumentsMutation,
  useDeleteDocumentMutation,
  useUpdateDocumentMutation,
} from "../slices/documentApiSlice";
import { setDocument } from "../slices/documentSlice";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [getAllDocument] = useGetAllUsersDocumentsMutation();
  const [updateDocument] = useUpdateDocumentMutation();
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

      dispatch(setDocument({ ...res }));
      setData(res);
    } catch (error) {
      console.error(error.data.msg);
      if (error.data.msg === "Documents not found") {
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

  const handleUpdate = async (e, id, status) => {
    e.stopPropagation();
    const data = {
      status,
      id,
    };
    try {
      const res = await updateDocument(data).unwrap();
      /*  navigate(`/document/${res._id}`); */
      handleGetAllDocuments();
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
  console.log(data);
  useEffect(() => {
    handleGetAllDocuments();
  }, []);
  useEffect(() => {
    if (Array.isArray(documentInfo)) {
      console.log(documentInfo);
      setData(documentInfo);
      const counts = documentInfo?.reduce(
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

  console.log(paginatedData);
  console.log(documentAvail);

  return (
    <div id="dashboard">
      <div className="dashbaordDiv">
        <div className="dashbaordDiv1Admin">
          <span className="dashbaordDiv1Adminspan">
            <h1>Welcome</h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
              interdum, arcu ut tempus fermentum, urna diam consequat sapien, eu
              bibendum quam velit ut augue.
            </p>
          </span>
          <img src={welcome} alt="welcome" />
        </div>
        {/*   <div className="dashbaordDiv1 dashbaordDiv2">
          <h1>Upload New Documents</h1>
          <button>Upload</button>
        </div> */}
        <div className="dashbaordsmallDiv" id="dashbaordDivDrafted">
          <h1>Total</h1>
          <h2>
            {" "}
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
          <AdminDocumentTable
            rows={paginatedData}
            handleDelete={handleDelete}
            handleUpdate={handleUpdate}
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
