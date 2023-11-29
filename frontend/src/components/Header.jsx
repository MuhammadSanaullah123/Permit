import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useAuthMutation, useLogoutMutation } from "../slices/usersApiSlice";
import { setCredentials, clearCredentials } from "../slices/authSlice";
import { toast } from "react-toastify";

const Header = () => {
  const [mobile, setMobile] = useState(false);
  const [profile, setProfile] = useState(false);
  const [auth] = useAuthMutation();
  const [logout] = useLogoutMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = async () => {
    try {
      await logout().unwrap();
      dispatch(clearCredentials());
      setProfile(!profile);
      navigate("/login");
    } catch (error) {
      error.data.errors.forEach((error) => {
        toast.error(error.msg);
      });
    }
  };
  const { userInfo } = useSelector((state) => state.auth);
  const handleAuth = async () => {
    try {
      const res = await auth().unwrap();

      dispatch(setCredentials({ ...res }));
    } catch (error) {
      error.data.errors.forEach((error) => {
        toast.error(error.msg);
      });
    }
  };
  /*   useEffect(() => {
    if (!sessionStorage.getItem("userInfo")) {
      navigate("/login");
    }
  }, [sessionStorage.getItem("userInfo")]); */

  useEffect(() => {
    if (sessionStorage.userInfo) {
      handleAuth();
    }
  }, []);
  useEffect(() => {
    const handleScroll = () => {
      const header = document.getElementById("header");
      if (window.scrollY > 0) {
        header.style.boxShadow = " rgb(0 0 0 / 10%) 0px 4px 4px 5px";
      } else {
        header.style.boxShadow = "none";
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <>
      <div id="header">
        {!mobile ? (
          <i
            className="fa-solid fa-bars"
            onClick={() => setMobile(!mobile)}
          ></i>
        ) : (
          <i
            className="fa-solid fa-xmark fa-bars"
            onClick={() => setMobile(!mobile)}
          ></i>
        )}
        {window.location.pathname.split("/")[1] === "admin" ? (
          <div className="linkDiv">
            <Link to="/admin/dashboard">Dashboard</Link>
            <Link to="/admin/invoice">Invoices</Link>
            <Link to="/admin/customers">Customers</Link>
          </div>
        ) : (
          <div className="linkDiv">
            <Link to="/user/dashboard">Dashboard</Link>
            <Link to="/user/upload">Upload New Documents</Link>
            <Link to="/user/invoices">Invoices</Link>
          </div>
        )}

        <div
          className="imgDiv"
          style={{
            border: `${userInfo?.image ? "0" : "1px solid #fff"}`,
          }}
        >
          {userInfo?.image ? (
            <img
              src={userInfo?.image}
              alt=""
              className="userImage"
              onClick={() => setProfile(!profile)}
            />
          ) : (
            <i
              className="fa-solid fa-user"
              onClick={() => setProfile(!profile)}
            ></i>
          )}

          <div
            className="logDiv"
            style={{
              display: `${profile ? "flex" : "none"}`,
            }}
          >
            {" "}
            <Link to="/user/profile" onClick={() => setProfile(!profile)}>
              <span>
                <i className="fa-solid fa-user profile"></i>
                <p to="/user/upload">Profile</p>
              </span>
            </Link>
            <span onClick={handleLogout}>
              <i className="fa-solid fa-right-from-bracket"></i>
              <p>Logout</p>
            </span>
          </div>
        </div>
      </div>
      {mobile &&
        (window.location.pathname.split("/")[1] === "admin" ? (
          <div className="moblinkDiv">
            <Link to="/admin/dashboard">Dashboard</Link>
            <Link to="/admin/invoice">Invoices</Link>
            <Link to="/admin/customers">Customers</Link>
          </div>
        ) : (
          <div className="moblinkDiv">
            <Link to="/user/dashboard">Dashboard</Link>
            <Link to="/user/upload">Upload New Documents</Link>
            <Link to="/user/invoices">Invoices</Link>
          </div>
        ))}
    </>
  );
};

export default Header;
