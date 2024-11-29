import axios from "axios";
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
  const [modalType, setModalType] = useState(null); // "detail", "ban", "update"
  const [updatedUser, setUpdatedUser] = useState({
    fullName: "",
    phone: "",
    address: "",
    gender: "",
    role: "",
  });

  const fetchUsers = async () => {
    try {
      const response = await GetAllUsers();
      setUsers(response);
    } catch (error) {
      console.error(
        "Error fetching user data:",
        error.response?.data || error.message
      );
    }
  };

  // Handle input changes for updating user info
  const onInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onSubmit = async (user) => {
    try {
      const updatedData = { ...updatedUser, userId: user._id }; // Add userId for API request
      await UpdateUserInfo(updatedData);
      alert(`User ${user.fullName}'s information has been updated.`);
      fetchUsers(); // Refresh the user list after update
      handleCloseModal(); // Close the modal after submission
    } catch (error) {
      console.error(
        "Error updating user info:",
        error.response?.data || error.message
      );
      alert("Failed to update user information. Please try again.");
    }
  };

  // Handle role updates
  const handleRoleUpdate = async (user) => {
    const newRole = prompt(
      `Enter new role for ${user.name} (e.g., "admin", "user", "store")`,
      user.role
    );
    if (newRole && newRole !== user.role) {
      try {
        const credentials = {
          userId: user._id,
          newRole,
        };
        await alert(`Updated role for ${user.fullName} to ${newRole}.`);
        fetchUsers(); // Refresh user list after role update
      } catch (error) {
        console.error(
          "Error updating user role:",
          error.response?.data || error.message
        );
      }
    }
  };

  // Handle modal opening
  const handleOpenModal = (user, type) => {
    setSelectedUser(user);
    setModalType(type);
    setUpdatedUser({
      // Initialize updated user data
      fullName: user.fullName || "",
      phone: user.phone || "",
      address: user.address || "",
      gender: user.gender || "",
      role: user.role || "",
    });
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
      center: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
      center: true,
    },
    {
      name: "Gender",
      selector: (row) => row.gender,
      sortable: true,
      center: true,
    },
    {
      name: "Phone",
      selector: (row) => row.phone,
      sortable: true,
      center: true,
    },
    {
      name: "Address",
      selector: (row) => row.address,
      sortable: true,
      center: true,
    },
    {
      name: "Role",
      selector: (row) => row.role,
      sortable: true,
      center: true,
    },
    {
      name: "Banned",
      selector: (row) => (row.isBanned ? "Yes" : "No"),
      sortable: true,
      center: true,
    },
    {
      name: "Action",
      center: true,
      cell: (row) => (
        <div className="flex space-x-2">
          <button
            className="bg-blue-500 text-white px-2 py-1 rounded"
            onClick={() => handleOpenModal(row, "detail")}
          >
            Details
          </button>
          <button
            className="bg-red-500 text-white px-2 py-1 rounded"
            onClick={() => handleOpenModal(row, "ban")}
          >
            Ban/Unban
          </button>
          {/* <button
            className="bg-green-500 text-white px-2 py-1 rounded"
            onClick={() => handleOpenModal(row, "updateUserRole")}
          >
            Update Role
          </button> */}
          {/* <button
            className="bg-purple-500 text-white px-2 py-1 rounded"
            onClick={() => handleOpenModal(row, "updateUserInfo")}
          >
            Update User Info
          </button> */}
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

      {/* {modalType === "updateUserInfo" && selectedUser && (
        <UpdateUserInfoModal
          user={selectedUser}
          updatedUser={updatedUser}
          onInputChange={onInputChange}
          onSubmit={onSubmit}
          onClose={handleCloseModal}
        />
      )} */}
    </div>
  );
};

export default UserManage;
