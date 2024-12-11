import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from "react-toastify";
import CustomDataTable from '../../../components/datatable/CustomDataTable';
import DetailModal from "../../../components/user/DetailModal";
import ConfirmUserModal from '../../../components/modal/ConfirmUserModal';
import { FaSearch } from 'react-icons/fa';
import { getAllRequest } from "../../../services/api/RequestApi.jsx";

const UserRequestManage = () => {
    const [requests, setRequests] = useState([]);
    const [filteredRequests, setFilteredRequests] = useState([]);
    const [selectedRequest, setSelectedRequest] = useState(null);
    const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
    const [isConfirmRequestModalOpen, setIsConfirmRequestModalOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState(""); // Search query state

    const fetchRequests = async () => {
        try {
            const response = await getAllRequest();

            if (response && Array.isArray(response)) {
                // Filter out requests with status "approved"
                const filteredResponse = response.filter((request) => request.result !== "approved");
                console.log("Filtered Response:", filteredResponse);

                // Update state with the filtered data
                setRequests(filteredResponse);
                setFilteredRequests(filteredResponse);
            } else {
                console.warn("Unexpected response format:", response);
            }
        } catch (error) {
            console.error("Error fetching request data:", error.response?.data || error.message);
            toast.error("Error fetching request data");
        }
    };


    const handleSearch = (event) => {
        const query = event.target.value.toLowerCase();
        setSearchQuery(query);

        if (query === "") {
            setFilteredRequests(requests); // If query is empty, show all requests
        } else {
            // Filter requests based on search query
            const filtered = requests.filter((request) =>
                request.targetId?.fullName?.toLowerCase().includes(query) ||
                request.targetId?.email?.toLowerCase().includes(query) ||
                request.targetId?.phone?.toLowerCase().includes(query) ||
                request.targetId?.address?.toLowerCase().includes(query) ||
                request.reason?.toLowerCase().includes(query) ||
                request.status?.toLowerCase().includes(query)
            );
            setFilteredRequests(filtered);
        }
    };

    useEffect(() => {
        fetchRequests(); // Fetch requests on component mount
    }, []);

    const columns = [
        {
            name: "Requester Name",
            selector: (row) => row.additionalData?.fullName,
            sortable: true,
            center: "true",
        },
        {
            name: "Email",
            selector: (row) => row.additionalData?.email,
            sortable: true,
            center: "true",
        },
        {
            name: "Reason",
            selector: (row) => row.reason,
            sortable: true,
            center: "true",
        },
        {
            name: "Status",
            selector: (row) => row.result,
            sortable: true,
            center: "true",
            cell: (row) => (
                <span className={`text-${row.result === 'pending' ? 'yellow-300' : 'red-500'}`}>
                    {row.result}
                </span>
            ),
        },
        {
            name: "Action",
            center: "true",
            cell: (row) => (
                <div className="max-md:w-56">
                    {row.result === 'pending' ? (
                        <button
                            className="bg-yellow-400 text-white px-2 py-1 rounded "
                            onClick={() => {
                                console.log(row)
                                setSelectedRequest(row);
                                setIsConfirmRequestModalOpen(true);
                            }}
                        >
                            Confirm
                        </button>
                    ) : (
                        <button
                            className="bg-green-500 text-white px-3 py-1 rounded"
                            onClick={() => {
                                console.log(row)
                                setSelectedRequest(row);
                                setIsRequestModalOpen(true);
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
                Manage User Requests
            </h1>

            <div className="w-[90%] lg:w-[80%] mx-auto rounded-md shadow-md">
                {/* Search Box */}
                <div className="flex justify-between my-2">
                    <div className="ml-auto w-48 md:w-64 flex items-center rounded-md px-2 bg-gray-800">
                        <FaSearch className="flex items-center justify-center w-10 text-white" />
                        <input
                            type="text"
                            onChange={handleSearch}
                            value={searchQuery}
                            placeholder="Search..."
                            className="bg-transparent w-44 border-none outline-none text-white focus:ring-0"
                        />
                    </div>
                </div>

                <div className="md:w-[650px] lg:w-[850px] xl:w-[90%] mx-auto rounded-md shadow-md">
                    {/* Display filtered requests */}
                    <CustomDataTable columns={columns} records={filteredRequests} />
                </div>
            </div>

            {isRequestModalOpen && (
                <DetailModal
                    request={selectedRequest}
                    onClose={() => setIsRequestModalOpen(false)}
                />
            )}

            {isConfirmRequestModalOpen && (
                <ConfirmUserModal
                    request={selectedRequest} // Correct prop name
                    onClose={() => setIsConfirmRequestModalOpen(false)}
                />
            )}

            <ToastContainer />
        </div>
    );
};

export default UserRequestManage;
