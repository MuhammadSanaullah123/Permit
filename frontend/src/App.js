import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import "./App.scss";

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
import AdminDashboard from "./admin/Dashboard";
import Customers from "./admin/Customers";
import IndividualCustomer from "./admin/IndividualCustomer";
import GenerateInvoice from "./admin/Invoice";
import PrivateRouteUser from "./components/PrivateRouteUser";
import PrivateRouteAdmin from "./components/PrivateRouteAdmin";
import ForgotPassword from "./userPages/ForgotPassword";
import ResetPassword from "./userPages/ResetPassword";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import store from "./store";
import { Provider } from "react-redux";
const App = () => {
  return (
    <>
      <Provider store={store}>
        <Router>
          {window.location.pathname !== "/user/signup" &&
            window.location.pathname !== "/" &&
            window.location.pathname !== "/login" &&
            window.location.pathname !== "/forgot-password" &&
            window.location.pathname.split("/")[1] !== "reset-password" && (
              <Header />
            )}
          <ToastContainer />

          <Routes>
            {/* User Routes */}
            <Route path="" element={<PrivateRouteUser />}>
              <Route exact path="/user/dashboard" element={<Dashboard />} />
              <Route exact path="/user/upload" element={<Upload />} />
              <Route exact path="/user/profile" element={<Profile />} />
              <Route exact path="/user/invoices" element={<Invoices />} />
              <Route exact path="/user/invoice/:id" element={<Invoice />} />
              <Route exact path="/user/checkout" element={<Checkout />} />
            </Route>

            {/* Common Routes */}
            <Route exact path="/document/:id" element={<Document />} />
            <Route exact path="/" element={<Navigate replace to="/login" />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/user/signup" element={<Signup />} />
            <Route exact path="/forgot-password" element={<ForgotPassword />} />
            <Route
              exact
              path="/reset-password/:id/:token"
              element={<ResetPassword />}
            />

            {/* Admin Routes */}
            <Route path="" element={<PrivateRouteAdmin />}>
              <Route
                exact
                path="/admin/dashboard"
                element={<AdminDashboard />}
              />
              <Route exact path="/admin/customers" element={<Customers />} />
              <Route
                exact
                path="/admin/invoice/:id"
                element={<GenerateInvoice />}
              />

              <Route
                exact
                path="/admin/customer/:id"
                element={<IndividualCustomer />}
              />
            </Route>

            {/* <Route path="" element={<PrivateRoute />}>
            <Route exact path="/home" element={<Home />} />
          </Route> */}
          </Routes>
        </Router>
      </Provider>
    </>
  );
};

export default App;
