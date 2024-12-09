import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from "react-toastify";
import ConfirmModal from '../../../components/modal/ConfirmModal';
import ProductDetailModal from '../../../components/modal/ProductDetailModal';
import CustomDataTable from '../../../components/datatable/CustomDataTable';
import { getProducts, ApproveProduct, RejectProduct, UpdateRequest, updateProduct } from '../../../services/api/ProductApi';
const ProductRequestManage = () => {
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
    const [isProductDetailModalOpen, setIsProductDetailModalOpen] = useState(false);
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [rejectionReason, setRejectionReason] = useState("");
    const fetchProducts = async () => {
        try {
            const response = await getProducts();
            console.log("Response:", response.data); // Debugging log
            const filteredProducts = response.data.filter(
                (product) => product.verify.status === "pending" || product.verify.status === "rejected"
            );
            setProducts(filteredProducts);
        } catch (error) {
            console.error("Error fetching product data:", error.response?.data || error.message);
            toast.error("Error fetching product data");
        }
    };
    useEffect(() => {
        fetchProducts();
    }, []);
    const handleApprove = async (productId, requestId) => {
        console.log("Approving product with ID:", productId, "and request ID:", requestId);
        try {
            await ApproveProduct(productId);
            await UpdateRequest(requestId, "approved", "Product approved successfully"); // Update request
            await updateProduct(productId, { verify: { status: "approved" } });
            toast.success("Product approved successfully");
            fetchProducts();
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
            fetchProducts();
        } catch (error) {
            console.error("Error rejecting product:", error.response?.data || error.message);
            toast.error("Error rejecting product");
        }
    };
    const columns = [
        {
            name: "Name",
            selector: (row) => row.name,
            sortable: true,
            center: "true",
        },
        {
            name: "Price",
            selector: (row) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(row.price),
            sortable: true,
            center: "true",
        },
        {
            name: "Seller",
            selector: (row) => row.sellerId?.fullName || "N/A",
            sortable: true,
            center: "true",
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
            center: "true",
        },
        {
            name: "Status",
            selector: row => row.verify?.status,
            sortable: true,
            center: "true",
            cell: (row) => (
                <span className={`text-${row.verify?.status === 'pending' ? 'yellow-300' : 'red-500'}`}>
                    {row.verify?.status}
                </span>
            ),
        },
        {
            name: 'Action',
            center: "true",
            cell: (row) => (
                <div className="max-md:w-56">
                    {row.verify?.status === 'pending' ? (
                        <button
                            className="bg-yellow-400 text-white px-2 py-1 rounded "
                            onClick={() => {
                                setSelectedProduct(row);
                                setIsConfirmModalOpen(true);
                            }}
                        >
                            Confirm
                        </button>
                    ) : (
                        <button
                            className="bg-green-500 text-white px-3 py-1 rounded"
                            onClick={() => {
                                setSelectedProduct(row);
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
    return (
        <div>
            <h1 className="grid place-items-center text-4xl py-4 text-white">
                Manage Product Request
            </h1>
            <div className="md:w-[650px] lg:w-[850px] xl:w-[90%] mx-auto rounded-md shadow-md">
                <CustomDataTable
                    columns={columns}
                    records={products}
                />
            </div>
            {isConfirmModalOpen && (
                <ConfirmModal
                    product={selectedProduct}
                    onReject={(rejectionReason) => handleReject(selectedProduct._id, rejectionReason, selectedProduct.requestId)}
                    onApprove={() => handleApprove(selectedProduct._id, selectedProduct.requestId)}
                    onClose={() => {
                        setIsConfirmModalOpen(false);
                        fetchProducts(); // Refresh the table when the modal is closed
                    }}
                    rejectionReason={rejectionReason}
                    setRejectionReason={setRejectionReason}
                />
            )}
            {isProductDetailModalOpen && (
                <ProductDetailModal
                    product={selectedProduct}
                    onClose={() => setIsProductDetailModalOpen(false)}
                />
            )}
            <ToastContainer />
        </div>
    );
};
export default ProductRequestManage;