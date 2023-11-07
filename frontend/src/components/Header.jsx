import React, { useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const [mobile, setMobile] = useState(false);
  const [profile, setProfile] = useState(false);

  const handleLogout = () => {
    setProfile(!profile);
  };
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

        <div className="linkDiv">
          <Link to="/user/dashboard">Dashboard</Link>
          <Link to="/user/upload">Upload New Documents</Link>
          <Link to="/user/invoices">Invoices</Link>
        </div>
        <div className="imgDiv">
          <i
            className="fa-solid fa-user"
            onClick={() => setProfile(!profile)}
          ></i>
          <div
            className="logDiv"
            style={{
              display: `${profile ? "flex" : "none"}`,
            }}
          >
            <span onClick={handleLogout}>
              <i className="fa-solid fa-right-from-bracket"></i>
              <p>Logout</p>
            </span>

            <Link to="/user/profile" onClick={() => setProfile(!profile)}>
              <span>
                <i className="fa-solid fa-user profile"></i>
                <p to="/user/upload">Profile</p>
              </span>
            </Link>
          </div>
        </div>
      </div>
      {mobile && (
        <div className="moblinkDiv">
          <Link to="/user/dashboard">Dashboard</Link>
          <Link to="/user/upload">Upload New Documents</Link>
          <Link to="/user/invoices">Invoices</Link>
        </div>
      )}
    </>
  );
};

export default Header;
