import React, { useState, useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
//assets
import upload from "../assets/upload.png";
//api
import { useDispatch, useSelector } from "react-redux";
import { useCreateDocumentMutation } from "../slices/documentApiSlice";

//other
import { RotatingLines } from "react-loader-spinner";
import { toast } from "react-toastify";
//mui
import PropTypes from "prop-types";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

function CircularProgressWithLabel(props) {
  return (
    <Box
      sx={{
        position: "relative",
        display: "inline-flex",
        width: "100px",
        height: "100px",
      }}
    >
      <CircularProgress
        variant="determinate"
        {...props}
        sx={{
          width: "100px",
          height: "100px",
        }}
      />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100px",
          height: "100px",
        }}
      >
        <Typography variant="caption" component="div" className="percentNumber">
          {/*   {`${Math.round(props.value)}%`} */}
          {props.value}%
        </Typography>
      </Box>
    </Box>
  );
}

CircularProgressWithLabel.propTypes = {
  /**
   * The value of the progress indicator for the determinate variant.
   * Value between 0 and 100.
   * @default 0
   */
  value: PropTypes.number.isRequired,
};

const Upload = () => {
  const { userInfo } = useSelector((state) => state.auth);

  const [values, setValues] = useState({
    name: "",
    address: `${userInfo?.company ? userInfo?.company : ""}`,
    contractor: "",
    type: "",
    valuation: "",
  });
  const [progress, setProgress] = useState(0);
  const [file, setFile] = useState();
  const [loading, setLoading] = useState(false);

  const [createDocument] = useCreateDocumentMutation();

  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      setFile(file);
      /*       const reader = new FileReader();

      reader.onabort = () => console.log("file reading was aborted");
      reader.onerror = () => console.log("file reading has failed");
      reader.onload = () => {

        const binaryStr = reader.result;
        console.log(binaryStr);
      };
      reader.readAsArrayBuffer(file); */
    });
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const handleInput = (e) => {
    e.preventDefault();
    const Value = e.target.value;
    setValues({
      ...values,
      [e.target.name]: Value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("address", values.address);
    formData.append("contractor", values.contractor);
    formData.append("type", values.type);
    formData.append("valuation", values.valuation);

    formData.append("file", file);

    /*   const data = {
      name: values.name,
      address: values.address,
      contractor: values.contractor,
      type: values.type, 
      valuation: values.valuation,
      fileSize: "128",
      documentName: "Resume7",
      file,
    }; */
    const headers = {};
    const token = sessionStorage.getItem("token");
    if (token) {
      headers["x-auth-token"] = token;
    }

    try {
      const res = await createDocument(formData).unwrap();
      /*     const res = await axios.post(
        "http://localhost:5000/api/document",
        formData,
        {
          headers: headers,
          onUploadProgress: (data) => {
            console.log(data.loaded, data.total);
          },
        }
      ); */

      setValues({
        name: "",
        address: "",
        contractor: "",
        type: "",
        valuation: "",
      });
      setFile();
      toast.success("Document Created", { position: "top-center" });
      setLoading(false);

      setTimeout(() => {
        window.location.assign(`/document/${res._id}`);
      }, 2000);
    } catch (error) {
      console.log(error);
      toast.error(error.data.msg);
    }
  };
  console.log(file);

  function fetchProgress() {
    const headers = {};
    const token = sessionStorage.getItem("token");
    if (token) {
      headers["x-auth-token"] = token;
    }

    fetch("https://travendev.com/api/api/document/progress", {
      headers: headers,
    }) /* fetch("http://localhost:5000/api/document/progress", {
      headers: headers,
    }) */
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setProgress(data.progress);
      })
      .catch((error) => {
        console.error("Error fetching progress:", error);
      });
  }
  /*   setInterval(fetchProgress, 5000); */
  useEffect(() => {
    if (loading) {
      const intervalId = setInterval(fetchProgress, 1000);

      // Clear the interval when the component unmounts
      return () => clearInterval(intervalId);
    }
  }, [loading]);
  useEffect(() => {
    setValues({
      address: userInfo?.company ? userInfo?.company : "",
    });
  }, [userInfo]);
  return (
    <div id="upload">
      <img src={upload} alt="upload" />
      <div
        id="uploadformDiv"
        style={{
          opacity: `${loading ? "0.6" : "1"}`,
        }}
      >
        <h1>Upload Documents</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sagittis
          tincidunt
        </p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Project name"
            value={values.name}
            onChange={handleInput}
            required
          />{" "}
          <input
            type="text"
            name="address"
            placeholder="Company"
            value={values.address}
            onChange={handleInput}
            required
          />
          <input
            type="text"
            name="contractor"
            placeholder="Contractor"
            value={values.contractor}
            onChange={handleInput}
            required
          />
          <input
            type="text"
            name="type"
            placeholder="Permit Type"
            value={values.type}
            onChange={handleInput}
            required
          />
          <input
            type="text"
            name="valuation"
            placeholder="Valuation"
            value={values.valuation}
            onChange={handleInput}
            required
          />
          <p className="fileName">{file && file.name}</p>
          <div
            {...getRootProps()}
            style={{
              outline: "none",
            }}
          >
            <input {...getInputProps()} />
            {isDragActive ? (
              <div className="isActiveDiv">
                <p>Drop here...</p>
              </div>
            ) : (
              <div className="uploadDiv">
                <p>Upload</p>
                <i className="fa-solid fa-upload"></i>
              </div>
            )}
          </div>
          {/*  <input
            id="file-uploader"
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
          /> */}
          {loading ? (
            <div
              style={{
                alignSelf: "center",
                position: "absolute",
                top: "45%",
                width: "100px",
                height: "100px",
              }}
            >
              <CircularProgressWithLabel
                value={progress}
                style={{
                  width: "100px",
                  height: "100px",
                }}
              />
              {/*      <progress value={uploadProgress} max="100" />
                <span>{uploadProgress}%</span> */}
              {/*   <FileUploadProgress
                  key="ex1"
                  url="http://localhost:5000/api/document"
                  method="post"
                  onProgress={(e, request, progress) => {
                    console.log("progress", e, request, progress);
                  }}
                  onLoad={(e, request) => {
                    console.log("load", e, request);
                  }}
                  onError={(e, request) => {
                    console.log("error", e, request);
                  }}
                  onAbort={(e, request) => {
                    console.log("abort", e, request);
                  }}
                /> */}
            </div>
          ) : (
            <button type="Upload">Submit</button>
          )}
        </form>
      </div>
    </div>
  );
};

export default Upload;
