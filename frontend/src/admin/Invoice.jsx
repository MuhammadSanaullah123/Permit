import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useCreateInvoiceMutation } from "../slices/invoiceApiSlice";
import { useGetDocumentByIdMutation } from "../slices/documentApiSlice";
import { setSingleDocument } from "../slices/documentSlice";
import { useGetUserByIdMutation } from "../slices/usersApiSlice";
import { setSingleUser, setUsers } from "../slices/authSlice";
import { toast } from "react-toastify";

const Invoice = () => {
  const dispatch = useDispatch();
  const { documentInfo } = useSelector((state) => state.document);
  const [user, setUser] = useState();

  const [values, setValues] = useState({
    useremail: user ? user?.name : "",
    documentName: documentInfo ? documentInfo?.documentName : "",
    amount: "",
    address: documentInfo ? documentInfo?.address : "",
    date: "",
  });
  const [createInvoice] = useCreateInvoiceMutation();
  const [getDocument] = useGetDocumentByIdMutation();
  const [getUser] = useGetUserByIdMutation();

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
    let data = {
      id: window.location.pathname.split("/")[3],
      user: documentInfo?.user,
      useremail: values.useremail,
      documentName: values.documentName,
      amount: values.amount,
      address: values.address,
      date: values.date,
    };
    try {
      const res = await createInvoice(data).unwrap();
      toast.success("Invoice Created", { position: "top-center" });
      setValues({
        useremail: user ? user?.name : "",
        documentName: documentInfo ? documentInfo?.documentName : "",
        amount: "",
        address: documentInfo ? documentInfo?.address : "",
        date: "",
      });
    } catch (error) {
      error.data.errors.forEach((error) => {
        toast.error(error.msg);
      });
    }
  };
  const handleGetDocument = async () => {
    try {
      const res = await getDocument(
        window.location.pathname.split("/")[3]
      ).unwrap();

      dispatch(setSingleDocument({ ...res }));
    } catch (error) {
      error.data.errors.forEach((error) => {
        toast.error(error.msg);
      });
    }
  };

  const handleGetUser = async () => {
    try {
      const res = await getUser(documentInfo?.user).unwrap();

      setUser({ ...res });
    } catch (error) {
      error.data.errors.forEach((error) => {
        toast.error(error.msg);
      });
    }
  };

  useEffect(() => {
    handleGetDocument();
  }, []);
  useEffect(() => {
    if (documentInfo?.user) {
      handleGetUser();
    }
  }, [documentInfo]);

  useEffect(() => {
    setValues({
      useremail: user ? user?.name : "",
      documentName: documentInfo ? documentInfo?.documentName : "",
      amount: "",
      address: documentInfo ? documentInfo?.address : "",
      date: "",
    });
  }, [user]);
  console.log(values);
  return (
    <div id="generateInvoice">
      <span className="span1">
        <h1>Generate Invoice</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
          interdum, arcu ut tempus fermentum, urna diam consequat sapien, eu
          bibendum quam velit ut augue.
        </p>
      </span>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="useremail"
          placeholder="Username/Email"
          value={values.useremail}
          onChange={handleInput}
          required
        />
        <input
          type="text"
          name="documentName"
          placeholder="Document Name"
          value={values.documentName}
          onChange={handleInput}
          required
        />
        <input
          type="text"
          name="amount"
          placeholder="Total Amount"
          value={values.amount}
          onChange={handleInput}
          required
        />
        <input
          type="text"
          name="address"
          placeholder="Address..."
          value={values.address}
          onChange={handleInput}
          required
        />
        <input
          type="date"
          name="date"
          placeholder="Invoice Date"
          value={values.date}
          onChange={handleInput}
          required
          style={{
            paddingRight: "10px",
          }}
        />
        <button type="submit">Generate Invoice</button>
      </form>
    </div>
  );
};

export default Invoice;
