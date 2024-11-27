import { useState, useEffect } from "react";
import DataTable from "react-data-table-component";

import { deleteBrand, getBrands} from "../../../services/api/BrandsApi.jsx";
import AddBrand from "../../../components/brand/AddBrand.jsx";
import EditBrand from "../../../components/brand/EditBrand.jsx";

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
            setScrollHeight("460px");
        } else {
            setScrollHeight("650px");
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
                <img
                    src={row.imageUrl}
                    alt={row.name}
                    className="w-12 h-12 object-cover rounded-md"
                />
            ),
            center: true,
        },
        // {
        //     name: "Created At",
        //     cell: (row) =>
        //         row.createdAt
        //             ? new Intl.DateTimeFormat("en-US", {
        //                 year: "numeric",
        //                 month: "short",
        //                 day: "numeric",
        //                 hour: "2-digit",
        //                 minute: "2-digit",
        //                 second: "2-digit",
        //             }).format(new Date(row.createdAt))
        //             : "N/A",
        //     sortable: true,
        //     center: true,
        // },
        // {
        //     name: "Updated At",
        //     cell: (row) =>
        //         row.updatedAt
        //             ? new Intl.DateTimeFormat("en-US", {
        //                 year: "numeric",
        //                 month: "short",
        //                 day: "numeric",
        //                 hour: "2-digit",
        //                 minute: "2-digit",
        //                 second: "2-digit",
        //             }).format(new Date(row.updatedAt))
        //             : "N/A",
        //     sortable: true,
        //     center: true,
        // },
        {
            name: "Action",
            center: true,
            cell: (row) => (
                <div className="flex">
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
            <h1 className="grid place-items-center text-4xl py-2">Manage Branches</h1>
            <button
                className="btn-add my-2 ml-6 bg-blue-500 text-white px-4 py-2 rounded"
                onClick={() => setIsAddBranchOpen(true)}
            >
                Add Brand
            </button>
            <div className="w-[90%] lg:w-[70%] mx-auto border border-gray-300 rounded-md shadow-md">
                {loading ? (
                    <div className="text-center p-4">Loading brandes...</div>
                ) : errorMessage ? (
                    <div className="text-center text-red-500 p-4">{errorMessage}</div>
                ) : (
                    <DataTable
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
