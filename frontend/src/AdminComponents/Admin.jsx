import React, {useState} from "react";
import AdminMenu from "./AdminMenu";
import DashBoard from "./Dashboard";
import ManageProducts from "./ManageProducts";
import ManageOrders from "./ManageOrders";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

const Admin = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [notif, setNotif] = useState([]);

    const toggleSidebar = () => {
        setSidebarOpen(false);
    };

    return (
        <Router>
            <div className="flex">
                <div className="fixed z-50">
                    <AdminMenu notif={notif} sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
                </div>
                <div className="lg:pl-[23%] md:pl-[20%]">
                    <Routes>
                        <Route
                            exact
                            path="/"
                            element={<ManageDashWrapper toggleSidebar={toggleSidebar} setnotif={setNotif} />}
                        />
                        <Route
                            exact
                            path="/ManageProducts"
                            element={<ManageProductsWrapper toggleSidebar={toggleSidebar} />}
                        />
                        <Route
                            exact
                            path="/ManageOrders"
                            element={<ManageOrdersWrapper setnotif={setNotif} toggleSidebar={toggleSidebar} />}
                        />
                    </Routes>
                </div>
            </div>
        </Router>
    );
};

const ManageProductsWrapper = ({toggleSidebar}) => {
    return (
        <div onClick={toggleSidebar}>
            <ManageProducts />
        </div>
    );
};
const ManageOrdersWrapper = ({setnotif, toggleSidebar}) => {
    return (
        <div onClick={toggleSidebar}>
            <ManageOrders setnotif={setnotif} />
        </div>
    );
};
const ManageDashWrapper = ({setnotif, toggleSidebar}) => {
    return (
        <div onClick={toggleSidebar}>
            <DashBoard setnotif={setnotif} />
        </div>
    );
};

export default Admin;
