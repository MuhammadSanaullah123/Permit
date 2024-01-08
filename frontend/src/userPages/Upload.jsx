import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
//assets
import upload from "../assets/upload.png";
//api
import { useDispatch, useSelector } from "react-redux";
import { useCreateDocumentMutation } from "../slices/documentApiSlice";

//other
import { RotatingLines } from "react-loader-spinner";
import { toast } from "react-toastify";
const Upload = () => {
  const [values, setValues] = useState({
    name: "",
    address: "",
    contractor: "",
    type: "",
    valuation: "",
  });
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
    try {
      const res = await createDocument(formData).unwrap();

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
      toast.error(error.data.msg);
    }
  };
  console.log(file);

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
            <button type="Upload">Submit</button>
          )}
        </form>
      </div>
    </div>
  );
};

export default Upload;
