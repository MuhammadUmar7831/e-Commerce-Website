import React from "react";
import AdminMenu from "./AdminMenu";
import DashBoard from "./Dashboard";
import ManageProducts from "./ManageProducts";
import ManageOrders from "./ManageOrders";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const Admin = () => {
  return <DashBoard />;
};

export default Admin;
