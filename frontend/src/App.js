import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import "./App.scss";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./userPages/Login";
import Signup from "./userPages/Signup";
import Header from "./components/Header";
import Dashboard from "./userPages/Dashboard";
import Upload from "./userPages/Upload";
import Profile from "./userPages/Profile";
import Document from "./userPages/Document";
import Invoices from "./userPages/Invoices";
import Invoice from "./userPages/Invoice";
import Checkout from "./userPages/Checkout";

const App = () => {
  return (
    <>
      <Router>
        {window.location.pathname !== "/user/signup" &&
          window.location.pathname !== "/user/login" && <Header />}
        <ToastContainer />

        <Routes>
          <Route
            exact
            path="/"
            element={<Navigate replace to="/user/login" />}
          />
          <Route exact path="/user/login" element={<Login />} />
          <Route exact path="/user/signup" element={<Signup />} />
          <Route exact path="/user/dashboard" element={<Dashboard />} />
          <Route exact path="/user/upload" element={<Upload />} />
          <Route exact path="/user/profile" element={<Profile />} />
          <Route exact path="/user/document/:id" element={<Document />} />
          <Route exact path="/user/invoices" element={<Invoices />} />
          <Route exact path="/user/invoice/:id" element={<Invoice />} />
          <Route exact path="/user/checkout" element={<Checkout />} />

          {/* <Route path="" element={<PrivateRoute />}>
            <Route exact path="/home" element={<Home />} />
          </Route> */}
        </Routes>
      </Router>
    </>
  );
};

export default App;
