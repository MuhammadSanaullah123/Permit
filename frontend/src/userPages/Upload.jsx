import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";

import upload from "../assets/upload.png";

const Upload = () => {
  const [values, setValues] = useState({
    name: "",
    address: "",
    contractor: "",
    type: "",
    valuation: "",
  });
  const [file, setFile] = useState();

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

  const handleSubmit = () => {};
  console.log(file);

  return (
    <div id="upload">
      <img src={upload} alt="upload" />
      <div id="uploadformDiv">
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
          <div {...getRootProps()}>
            <input {...getInputProps()} />
            {isDragActive ? (
              <div className="isActiveDiv">
                <p>Drop here...</p>
              </div>
            ) : (
              <div className="uploadDiv">
                <p>Upload</p>
                <i class="fa-solid fa-upload"></i>
              </div>
            )}
          </div>
          {/*  <input
            id="file-uploader"
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
          /> */}
          <button type="Upload">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Upload;
