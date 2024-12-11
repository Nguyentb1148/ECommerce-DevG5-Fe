import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from "react-toastify";
import ConfirmProductModal from '../../../components/modal/ConfirmProductModal';
import ProductDetailModal from '../../../components/modal/ProductDetailModal';
import CustomDataTable from '../../../components/datatable/CustomDataTable';
import { getProducts, ApproveProduct, RejectProduct, UpdateRequest, updateProduct } from '../../../services/api/ProductApi';
import { FaSearch } from 'react-icons/fa';


const ProductRequestManage = () => {
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
    const [isProductDetailModalOpen, setIsProductDetailModalOpen] = useState(false);
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [rejectionReason, setRejectionReason] = useState("");
    const [searchQuery, setSearchQuery] = useState(""); // Store the search query

    const fetchProducts = async () => {
        try {
            const response = await getProducts();
            console.log("Response:", response.data); // Debugging log
            const filteredProducts = response.data.filter(
                (product) => product.verify.status === "pending" || product.verify.status === "rejected"
            );
            setProducts(filteredProducts);
            setFilteredProducts(filteredProducts); // Set filtered products initially

        } catch (error) {
            console.error("Error fetching product data:", error.response?.data || error.message);
            toast.error("Error fetching product data");
        }
    };

    const handleSearch = (event) => {
        const query = event.target.value.toLowerCase();
        setSearchQuery(query);

        if (query === "") {
            // If the search query is empty, reset the filtered list to all products
            setFilteredProducts(products);
        } else {
            // Filter products based on the search query (by name, seller, status)
            const filtered = products.filter((product) =>
                product.name.toLowerCase().includes(query) ||
                product.sellerId?.fullName.toLowerCase().includes(query) ||
                product.verify?.status.toLowerCase().includes(query)
            );
            setFilteredProducts(filtered);
        }
    };

    const handleApprove = async (productId, requestId) => {
        console.log("Approving product with ID:", productId, "and request ID:", requestId);
        try {
            await ApproveProduct(productId);
            await UpdateRequest(requestId, "approved", "Product approved successfully"); // Update request
            await updateProduct(productId, { verify: { status: "approved" } });
            toast.success("Product approved successfully");
            await fetchProducts();
        } catch (error) {
            console.error("Error approving product:", error.response?.data || error.message);
            toast.error("Error approving product");
        }
    };

    const handleReject = async (productId, rejectionReason, requestId) => {
        console.log("Rejecting product with ID:", productId, "and request ID:", requestId);
        try {
            await RejectProduct(productId, rejectionReason);
            await UpdateRequest(requestId, "rejected", rejectionReason); // Update request
            await updateProduct(productId, { verify: { status: "rejected" } });
            toast.success("Product rejected successfully");
            await fetchProducts();
        } catch (error) {
            console.error("Error rejecting product:", error.response?.data || error.message);
            toast.error("Error rejecting product");
        }
    };

    const columns = [
        {
            name: "Name",
            selector: (row) => row.additionalData.name,
            sortable: true,
            center: true,
        },
        {
            name: "Price",
            selector: (row) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(row.additionalData.price),
            sortable: true,
            center: true,
        },
        {
            name: "Seller",
            selector: (row) => row.createdBy?.fullName || "N/A",
            sortable: true,
            center: true,
        },
        {
            name: "Created At",
            selector: (row) => row.createdAt,
            cell: (row) =>
                new Intl.DateTimeFormat("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                }).format(new Date(row.createdAt)),
            sortable: true,
            center: true,
        },
        {
            name: "Status",
            selector: row => row.result,
            sortable: true,
            center: true,
            cell: (row) => (
                <span className={`text-${row.result === 'pending' ? 'yellow-300' : row.result === 'rejected' ? 'red-500' : 'green-500'}`}>
                    {row.result}
                </span>
            ),
        },
        {
            name: 'Action',
            center: true,
            cell: (row) => (
                <div className="max-md:w-56">
                    {row.result === 'pending' ? (
                        <button
                            className="bg-yellow-400 text-white px-2 py-1 rounded"
                            onClick={() => {
                                setSelectedRequest(row);
                                setIsConfirmModalOpen(true);
                            }}
                        >
                            Confirm
                        </button>
                    ) : (
                        <button
                            className="bg-green-500 text-white px-3 py-1 rounded"
                            onClick={() => {
                                setSelectedRequest(row);
                                setIsProductDetailModalOpen(true);
                            }}
                        >
                            Details
                        </button>
                    )}
                </div>
            ),
        }
    ];

    useEffect(() => {
        fetchProducts(); // Fetch product data on component load
    }, []);

    return (
        <div>
            <h1 className="grid place-items-center text-4xl py-4 text-white">
                Manage Product Request
            </h1>

            <div className="w-[90%] lg:w-[80%] mx-auto rounded-md shadow-md">
                <div className="flex justify-between my-2">
                    {/* Search Box */}
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
                    <CustomDataTable
                        columns={columns}
                        records={filteredProducts} // Use filteredProducts instead of products
                    />
                </div>
            </div>

            {isConfirmModalOpen && (
                <ConfirmProductModal
                    request={selectedRequest}
                    onClose={() => {
                        setIsConfirmModalOpen(false);
                        fetchProducts(); // Refresh the table when the modal is closed
                    }}
                    fetchProducts={fetchProducts} // Pass fetchProducts as a prop
                />
            )}

            {isProductDetailModalOpen && (
                <ProductDetailModal
                    request={selectedRequest}
                    onClose={() => setIsProductDetailModalOpen(false)}
                />
            )}

            <ToastContainer />
        </div>
    );
};

export default ProductRequestManage;

