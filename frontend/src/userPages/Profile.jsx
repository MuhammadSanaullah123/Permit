import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useUpdateUserMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

//assets
import edit from "../assets/edit.png";
const Profile = () => {
  const { userInfo } = useSelector((state) => state.auth);

  const [values, setValues] = useState({
    name: userInfo ? userInfo.name : "",
    company: userInfo ? userInfo.company : "",
    email: userInfo ? userInfo.email : "",
    description: userInfo ? userInfo.description : "",
    image: userInfo ? userInfo.image : "",
    password: "",
    conpassword: "",
  });
  const [image, setImage] = useState();
  const [previewImage, setPreviewImage] = useState(null);

  const [updateUser] = useUpdateUserMutation();

  const dispatch = useDispatch();
  console.log(userInfo);
  console.log(values);

  const hiddenFileInput = useRef(null);

  const handleImageClick = () => {
    hiddenFileInput.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImage(file);

    // Display a preview of the image
    const reader = new FileReader();
    reader.onloadend = () => {
      // Update the preview image source
      setPreviewImage(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleInput = (e) => {
    e.preventDefault();
    const Value = e.target.value;
    setValues({
      ...values,
      [e.target.name]: Value,
    });
  };
  console.log(values);
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (values.password === values.conpassword) {
      let image_url;
      if (image) {
        const dataImage = new FormData();
        dataImage.append("file", image);
        dataImage.append("upload_preset", "miudfqwc");
        dataImage.append("cloud_name", "dvge98zue");

        const res = await fetch(
          "https://api.cloudinary.com/v1_1/dvge98zue/image/upload",
          {
            method: "post",
            body: dataImage,
          }
        );

        const resData = await res.json();
        image_url = resData.url;
      }
      let data;
      if (image) {
        data = {
          name: values.name,
          image: image_url,
          company: values.company,
          email: values.email,
          description: values.description,
          password: values.password,
        };
      } else {
        data = {
          name: values.name,
          image: values.image,
          company: values.company,
          email: values.email,
          description: values.description,
          password: values.password,
        };
      }

      try {
        const res = await updateUser(data).unwrap();
        toast.success("Update Successful", { position: "top-center" });
        sessionStorage.setItem("token", res.token);
        dispatch(setCredentials({ ...res }));
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      } catch (error) {
        toast.error(error.data.msg);
      }
    } else {
      toast.error("Passwords do not match");
    }
  };

  useEffect(() => {
    setValues({
      name: userInfo ? userInfo.name : "",
      company: userInfo ? userInfo.company : "",
      email: userInfo ? userInfo.email : "",
      description: userInfo ? userInfo.description : "",
      image: userInfo ? userInfo.image : "",
      password: "",
      conpassword: "",
    });
  }, [userInfo]);

  console.log(image);
  return (
    <div id="profile">
      <div className="imageDiv">
        {previewImage ? (
          <img src={previewImage} alt="profile" className="userImage" />
        ) : values.image ? (
          <img src={values.image} alt="profile" className="userImage" />
        ) : (
          <i className="fa-solid fa-user"></i>
        )}
        <div className="editImageDiv" onClick={handleImageClick}>
          <i className="fa-solid fa-pen"></i>
        </div>
        <input
          id="file-uploader"
          ref={hiddenFileInput}
          style={{ display: "none" }}
          type="file"
          onChange={handleFileChange}
        />
        <label htmlFor="file-uploader" className="file-label"></label>
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={values.name}
          onChange={handleInput}
        />{" "}
        <input
          type="text"
          name="company"
          placeholder="Company"
          value={values.company}
          onChange={handleInput}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={values.email}
          onChange={handleInput}
        />
        <textarea
          name="description"
          placeholder="Description..."
          value={values.description}
          onChange={handleInput}
        />
        <input
          type="password"
          name="password"
          placeholder="Change Password"
          value={values.password}
          onChange={handleInput}
        />
        <input
          type="password"
          name="conpassword"
          placeholder="Confirm Password"
          value={values.conpassword}
          onChange={handleInput}
        />
        <button type="submit">Done</button>
      </form>
    </div>
  );
};

export default Profile;
