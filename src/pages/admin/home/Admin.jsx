import React from "react";
import SidebarAdmin from "../../../components/sidebar/SidebarAdmin";
import { Outlet } from 'react-router-dom';
const Admin = () => {
    return (
        <div className="md:flex bg-gray-900 ">
            <SidebarAdmin />
            <div className="md:flex-1">
                <Outlet />
            </div>
        </div>
    );
};

export default Admin;
