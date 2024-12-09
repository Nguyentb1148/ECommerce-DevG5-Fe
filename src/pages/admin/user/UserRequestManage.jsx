import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from "react-toastify";
import CustomDataTable from '../../../components/datatable/CustomDataTable';
import { GetAllUsers } from "../../../services/api/UserApi";
import DetailModal from "../../../components/user/DetailModal"
import ConfirmUserModal from '../../../components/modal/ConfirmUserModal';
const UserRequestManage = () => {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [isUserModalOpen, setIsUserModalOpen] = useState(false);
    const [isConfirmUserModalOpen, setIsConfirmUserModalOpen] = useState(false);
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
            cell: (row) => (
                <span className={`text-${row.verify?.status === 'pending' ? 'yellow-300' : 'red-500'}`}>
                    {row.verify?.status}
                </span>
            ),
        },
        {
            name: "Action",
            center: "true", 
            cell: (row) => (
                <div className="max-md:w-56">
                    {row.verify?.status === 'pending' ? (
                        <button
                            className="bg-yellow-400 text-white px-2 py-1 rounded "
                            onClick={() => {
                                setSelectedUser(row);
                                setIsConfirmUserModalOpen(true);
                            }}
                        >
                            Confirm
                        </button>
                    ) : (
                        <button
                            className="bg-green-500 text-white px-3 py-1 rounded"
                            onClick={() => {
                                setSelectedUser(row);
                                setIsUserModalOpen(true);
                            }}
                        >
                            Details
                        </button>
                    )}
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
                <DetailModal
                    user={selectedUser}
                    onClose={() => setIsUserModalOpen(false)}
                />
            )}
            {isConfirmUserModalOpen && (
                <ConfirmUserModal
                    user={selectedUser}
                    onClose={() => setIsConfirmUserModalOpen(false)}
                />
            )}
        </div>
    )
}

export default UserRequestManage