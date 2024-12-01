import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import React, { useState, useEffect } from "react";
import DataTable, { createTheme } from "react-data-table-component";
import {
  BanUser,
  GetAllUsers,
  UpdateUserInfo,
} from "../../../services/api/UserApi";
import DetailModal from "../../../components/user/DetailModal";
import BanModal from "../../../components/user/BanModal";
import UpdateUserInfoModal from "../../../components/user/UpdateUserInfoModal";
import { toast, ToastContainer } from "react-toastify";

createTheme(
  "dark",
  {
    text: {
      primary: "#e5e7eb",
      secondary: "#9ca3af",
    },
    background: {
      default: "#1f2937",
    },
    context: {
      background: "#374151",
      text: "#ffffff",
    },
    divider: {
      default: "#4b5563",
    },
    action: {
      button: "#4f46e5",
      hover: "rgba(255, 255, 255, 0.1)",
      disabled: "rgba(255, 255, 255, 0.3)",
    },
  },
  "dark"
);

const UserManage = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [modalType, setModalType] = useState(null);

  const fetchUsers = async () => {
    try {
      const response = await GetAllUsers();
      setUsers(response);
    } catch (error) {
      console.error(
        "Error fetching user data:",
        error.response?.data || error.message
      );
      toast.error("Error fetching user data");
    }
  };

  // Handle Ban action (called when Ban/Unban button is clicked)
  const handleBan = () => {
    fetchUsers(); // Refresh user data after banning/unbanning
  };

  // Handle modal opening
  const handleOpenModal = (user, type) => {
    setSelectedUser(user);
    setModalType(type);
  };

  // Handle modal closing
  const handleCloseModal = () => {
    setSelectedUser(null);
    setModalType(null);
  };

  // Responsive Table
  const [scrollHeight, setScrollHeight] = useState("430px");
  const updateScrollHeight = () => {
    if (window.innerWidth < 768) {
      setScrollHeight("430px");
    } else if (window.innerWidth < 1024) {
      setScrollHeight("450px");
    } else if (window.innerWidth < 1280) {
      setScrollHeight("500px");
    } else {
      setScrollHeight("650px");
    }
  };

  // Fetch data
  useEffect(() => {
    fetchUsers(); // Fetch user data on component load
    updateScrollHeight();
    window.addEventListener("resize", updateScrollHeight);
    return () => window.removeEventListener("resize", updateScrollHeight);
  }, []);

  const columns = [
    {
      name: "Full Name",
      selector: (row) => row.fullName,
      sortable: true,
      center: "true", // change here
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
      center: "true", // change here
    },
    {
      name: "Gender",
      selector: (row) => row.gender,
      sortable: true,
      center: "true", // change here
    },
    {
      name: "Phone",
      selector: (row) => row.phone,
      sortable: true,
      center: "true", // change here
    },
    {
      name: "Address",
      selector: (row) => row.address,
      sortable: true,
      center: "true", // change here
    },
    {
      name: "Role",
      selector: (row) => row.role,
      sortable: true,
      center: "true", // change here
    },
    {
      name: "Action",
      center: "true", // change here
      cell: (row) => (
        <div className="flex space-x-2">
          <button
            className="bg-blue-500 text-white px-2 py-1 rounded"
            onClick={() => handleOpenModal(row, "detail")}
          >
            Details
          </button>
          <button
            className={`${
              row.isBanned ? "bg-green-500" : "bg-red-500"
            } text-white px-2 py-1 rounded`}
            onClick={() => handleOpenModal(row, "ban")}
          >
            {row.isBanned ? "Unban" : "Ban"}
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="h-screen">
      <h1 className="grid place-items-center text-4xl py-4 text-white">
        User Management
      </h1>
      <div className="md:w-[650px] lg:w-[850px] xl:w-[90%] mx-auto rounded-md shadow-md">
        <div className="overflow-hidden">
          <DataTable
            theme="dark"
            columns={columns}
            data={users}
            fixedHeader
            pagination
            fixedHeaderScrollHeight={scrollHeight}
            paginationPosition="bottom"
          />
        </div>
      </div>

      {/* Modal for Details */}
      {modalType === "detail" && selectedUser && (
        <DetailModal user={selectedUser} onClose={handleCloseModal} />
      )}

      {/* Modal for Ban/Unban */}
      {modalType === "ban" && selectedUser && (
        <BanModal
          user={selectedUser}
          onClose={handleCloseModal}
          onBan={handleBan}
        />
      )}

      <ToastContainer />
    </div>
  );
};

export default UserManage;
