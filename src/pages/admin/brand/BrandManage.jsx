import { useState, useEffect } from "react";
import DataTable, { createTheme } from 'react-data-table-component';

import { deleteBrand, getBrands } from "../../../services/api/BrandsApi.jsx";
import AddBrand from "../../../components/brand/AddBrand.jsx";
import EditBrand from "../../../components/brand/EditBrand.jsx";

createTheme('dark', {
    text: {
        primary: '#e5e7eb',
        secondary: '#9ca3af',
    },
    background: {
        default: '#1f2937',
    },
    context: {
        background: '#374151',
        text: '#ffffff',
    },
    divider: {
        default: '#4b5563',
    },
    action: {
        button: '#4f46e5',
        hover: 'rgba(255, 255, 255, 0.1)',
        disabled: 'rgba(255, 255, 255, 0.3)',
    },
}, 'dark');


const BrandManage = () => {
    const [isAddBranchOpen, setIsAddBranchOpen] = useState(false);
    const [isEditBranchOpen, setIsEditBranchOpen] = useState(false);
    const [scrollHeight, setScrollHeight] = useState("430px");
    const [branches, setBranches] = useState([]);
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");
    const [selectedBranch, setSelectedBranch] = useState(null);

    const updateScrollHeight = () => {
        if (window.innerWidth < 768) {
            setScrollHeight("400px");
        } else if (window.innerWidth < 1024) {
            setScrollHeight("440px");
        } else if (window.innerWidth < 1280) {
            setScrollHeight("800px");
        } else {
            setScrollHeight("800px");
        }
    };

    useEffect(() => {
        updateScrollHeight();
        window.addEventListener("resize", updateScrollHeight);
        return () => window.removeEventListener("resize", updateScrollHeight);
    }, []);

    useEffect(() => {
        const fetchBranches = async () => {
            try {
                const data = await getBrands();
                setBranches(data);
                console.log("Fetched branches:", data);
            } catch (error) {
                setErrorMessage("Failed to fetch branches.");
            } finally {
                setLoading(false);
            }
        };

        fetchBranches();
    }, []);

    const handleDelete = async (row) => {
        const confirm = window.confirm(`Are you sure you want to delete ${row.name}?`);
        if (confirm) {
            try {
                await deleteBrand(row._id);
                setBranches((prevBranches) =>
                    prevBranches.filter((branch) => branch._id !== row._id)
                );
                alert(`Branch ${row.name} deleted successfully!`);
            } catch (error) {
                console.error(`Error deleting branch ${row.name}:`, error);
                setErrorMessage("Failed to delete the branch.");
            }
        }
    };

    const columns = [
        {
            name: "Brand",
            selector: (row) => row.name,
            sortable: true,
            center: true,
        },
        {
            name: "Description",
            selector: (row) => row.description || "N/A", // Fallback if description is missing
            sortable: true,
            center: true,
        },
        {
            name: "Image",
            cell: (row) => (
                <div
                    style={{
                        width: '120px',  // Fixed width
                        height: '40px',  // Fixed height
                        overflow: 'hidden',  // Ensure the image doesn't overflow
                        position: 'relative',  // Keep the image contained
                    }}
                >
                    <img
                        src={row.imageUrl}
                        alt={row.name}
                        style={{
                            width: '100%',  // Make the image fill the container
                            height: '100%',  // Make the image fill the container
                            objectFit: 'cover',  // Ensures the image is cropped but retains aspect ratio
                            position: 'absolute',  // Keep the image inside the container
                            top: 0,
                            left: 0,
                        }}
                        className="rounded-md"
                    />
                </div>
            ),
            center: true,
        },

        {
            name: "Action",
            center: true,
            cell: (row) => (
                <div className="max-md:flex max-md:w-56">
                    <button
                        className="bg-yellow-400 text-white px-2 py-1 rounded mr-2"
                        onClick={() => {
                            setSelectedBranch(row);
                            setIsEditBranchOpen(true);
                        }}
                    >
                        Edit
                    </button>
                    <button
                        className="bg-red-500 text-white px-2 py-1 rounded"
                        onClick={() => handleDelete(row)}
                    >
                        Delete
                    </button>
                </div>
            ),
        },
    ];


    return (
        <div className="h-screen">
            <h1 className="grid place-items-center text-4xl py-2 text-white">Manage Branches</h1>
            <button
                className="btn-add my-2 ml-6 bg-blue-500 text-white px-4 py-2 rounded"
                onClick={() => setIsAddBranchOpen(true)}
            >
                Add Brand
            </button>
            <div className="w-[90%] lg:w-[70%] mx-auto rounded-md ">
                {loading ? (
                    <div className="grid gap-3">
                        <div className="flex items-center justify-center">
                            <svg className="animate-spin border-indigo-600" xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 34 34" fill="none">
                                <g id="Component 2">
                                    <circle id="Ellipse 717" cx="17.0007" cy="17.0001" r="14.2013" stroke="#D1D5DB" stroke-width="4" stroke-dasharray="2 3" />
                                    <path id="Ellipse 715" d="M21.3573 30.5163C24.6694 29.4486 27.4741 27.2019 29.2391 24.2028C31.0041 21.2038 31.6065 17.661 30.9319 14.2471C30.2573 10.8332 28.3528 7.78584 25.5798 5.68345C22.8067 3.58105 19.3583 2.57 15.8891 2.84222" stroke="#4F46E5" stroke-width="4" />
                                </g>
                            </svg>
                        </div>
                    </div>) : errorMessage ? (
                        <div className="text-center text-red-500 p-4">{errorMessage}</div>
                    ) : (
                    <DataTable
                        theme='dark'
                        columns={columns}
                        data={branches}
                        fixedHeader
                        pagination
                        fixedHeaderScrollHeight={scrollHeight}
                        paginationPosition="bottom"
                    />
                )}
            </div>
            {/* Modals */}
            {isAddBranchOpen && <AddBrand onClose={() => setIsAddBranchOpen(false)} />}
            {isEditBranchOpen && selectedBranch && (
                <EditBrand
                    onClose={() => setIsEditBranchOpen(false)}
                    branch={selectedBranch}
                />
            )}
        </div>
    );
};

export default BrandManage;
