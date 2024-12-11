import "react-toastify/dist/ReactToastify.css";
import React, { useState, useEffect } from "react";
import {
  GetAllUsers,
} from "../../../services/api/UserApi";
import DetailModal from "../../../components/user/DetailModal";
import BanModal from "../../../components/user/BanModal";
import { toast, ToastContainer } from "react-toastify";
import CustomDataTable from "../../../components/datatable/CustomDataTable";
import { FaSearch } from "react-icons/fa";

const UserManage = () => {
  const [users, setUsers] = useState([]);
  const [originalUsers, setOriginalUsers] = useState([]); // Store original user data
  const [selectedUser, setSelectedUser] = useState(null);
  const [modalType, setModalType] = useState(null);
  const [searchQuery, setSearchQuery] = useState(""); // Store the search query

  const fetchUsers = async () => {
    try {
      const response = await GetAllUsers();
      console.log("Response:", response); // Debugging log
      setUsers(response);
      setOriginalUsers(response); // Store the original users
    } catch (error) {
      console.error(
          "Error fetching user data:",
          error.response?.data || error.message
      );
      toast.error("Error fetching user data");
    }
  };

  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    if (query === "") {
      // If the search query is empty, reset the users list to the original
      setUsers(originalUsers);
    } else {
      // Filter the users based on the search query
      const filteredUsers = originalUsers.filter((user) =>
          user.fullName.toLowerCase().includes(query) ||
          user.email.toLowerCase().includes(query) ||
          user.role.toLowerCase().includes(query)
      );
      setUsers(filteredUsers);
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
        <div className="w-[90%] lg:w-[80%] mx-auto rounded-md shadow-md">
          <div className="flex justify-between my-2">
            {/* Adjust the Search Box to the right */}
            <div className="ml-auto w-48 md:w-64 flex items-center rounded-md px-2 bg-gray-800">
              <FaSearch className="flex items-center justify-center w-10 text-white" />
              <input
                  type="text"
                  onChange={handleSearch}
                  placeholder="Search..."
                  className="bg-transparent w-44 border-none outline-none text-white focus:ring-0"
              />
            </div>
          </div>

          <div className="md:w-[650px] lg:w-[850px] xl:w-[90%] mx-auto rounded-md shadow-md">
            <CustomDataTable columns={columns} records={users} />
          </div>
        </div>

        {/* Modal for Details */}
        {modalType === "detail" && selectedUser && (
            <DetailModal request={selectedUser} onClose={handleCloseModal} />
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
