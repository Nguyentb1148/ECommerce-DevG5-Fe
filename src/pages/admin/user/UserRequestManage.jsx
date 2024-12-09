import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from "react-toastify";
import CustomDataTable from '../../../components/datatable/CustomDataTable';
import { GetAllUsers } from "../../../services/api/UserApi";
const UserRequestManage = () => {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [isUserModalOpen, setIsUserModalOpen] = useState(false);
    const fetchUsers = async () => {
        try {
            const response = await GetAllUsers();

            const filteredUsers = response.filter(
                (user) => user.role === "user"
            );
            setUsers(filteredUsers);
        } catch (error) {
            console.error(
                "Error fetching user data:",
                error.response?.data || error.message
            );
            toast.error("Error fetching user data");
        }
    };
    useEffect(() => {
        fetchUsers();
    }, []);
    const columns = [
        {
            name: "Full Name",
            selector: (row) => row.fullName,
            sortable: true,
            center: "true", 
        },
        {
            name: "Email",
            selector: (row) => row.email,
            sortable: true,
            center: "true", 
        },
        {
            name: "Gender",
            selector: (row) => row.gender,
            sortable: true,
            center: "true", 
        },
        {
            name: "Phone",
            selector: (row) => row.phone,
            sortable: true,
            center: "true", 
        },
        {
            name: "Address",
            selector: (row) => row.address,
            sortable: true,
            center: "true", 
        },
        {
            name: "Update role to Seller",
            selector: (row) => row.verify?.status,
            sortable: true,
            center: "true", 
        },
        {
            name: "Action",
            center: "true", 
            cell: (row) => (
              <div className="flex space-x-2">
                <button
                  className="bg-green-500 text-white px-2 py-1 rounded"
                  onClick={() => {
                    setSelectedUser(row);
                    setIsUserModalOpen(true);
                }}
                >
                  Accept
                </button>
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded"
                  onClick={() => {
                    setSelectedUser(row);
                    setIsUserModalOpen(true);
                }}
                >
                  Decline
                </button>
              </div>
            ),
          },

    ];
    return (
        <div>
            <h1 className="grid place-items-center text-4xl py-4 text-white">
                Manage User Request
            </h1>
            <div className="md:w-[650px] lg:w-[850px] xl:w-[90%] mx-auto rounded-md shadow-md">
                <CustomDataTable columns={columns} records={users} />
            </div>
            {isUserModalOpen && (
                <UserDetailModal
                    users={selectedUser}
                    onClose={() => setIsUserModalOpen(false)}
                />
            )}
        </div>
    )
}

export default UserRequestManage