import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import React, { useState, useEffect } from "react";
import {
  BanUser,
  GetAllUsers,
  UpdateUserInfo,
} from "../../../services/api/UserApi";
import DetailModal from "../../../components/user/DetailModal";
import BanModal from "../../../components/user/BanModal";
import UpdateUserInfoModal from "../../../components/user/UpdateUserInfoModal";
import { toast, ToastContainer } from "react-toastify";
import CustomDataTable from "../../../components/datatable/CustomDataTable";


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

  // Fetch data
  useEffect(() => {
    fetchUsers(); // Fetch user data on component load
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
            className={`${row.isBanned ? "bg-green-500" : "bg-red-500"
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
        <CustomDataTable columns={columns} records={users} />
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
