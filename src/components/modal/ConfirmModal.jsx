import React, { useState } from "react";
import { FaCheck, FaTimes } from "react-icons/fa";
import { FaX } from "react-icons/fa6";
import { ApproveProduct, RejectProduct } from "../../services/api/ProductApi"; 
import { toast, ToastContainer } from "react-toastify";

const ConfirmModal = ({ product, onClose }) => {
    const [showRejectionForm, setShowRejectionForm] = useState(false);
    const [rejectionReason, setRejectionReason] = useState("");
    const [loading, setLoading] = useState(false);

    const handleApprove = async () => {
        setLoading(true);
        try {
            await ApproveProduct(product.id);
            toast.success("Product approved successfully!");
            onClose(); // Đóng modal sau khi thành công
        } catch (err) {
            console.error("Approval error:", err);
            toast.error("Failed to approve product. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleReject = async (e) => {
        e.preventDefault();
        if (!rejectionReason.trim()) {
            toast.error("Please provide a reason for rejection.");
            return;
        }
        setLoading(true);
        try {
            await RejectProduct(product.id, rejectionReason);
            toast.success("Product rejected successfully!");
            setRejectionReason("");
            setShowRejectionForm(false);
            onClose(); // Đóng modal sau khi thành công
        } catch (err) {
            console.error("Rejection error:", err);
            toast.error("Failed to reject product. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-20 bg-opacity-30 bg-gray-900 p-6 text-white overflow-auto">
            <div className="max-w-4xl mx-auto bg-gray-800 rounded-lg shadow-xl p-8">
                <div className="space-y-6">
                   {/* Product Header */}
                   <div className="flex justify-between items-center">
                        <h2 className="text-3xl font-bold text-center text-gray-100">Product Details</h2>
                        <button onClick={onClose} className="text-gray-400 hover:text-gray-200">
                            <FaX />
                        </button>
                    </div>
                    <div className="flex items-center">
                        <h3 className="text-2xl w-36">Name:</h3>
                        <p className="text-xl text-gray-400 px-2">{product.name}</p>
                    </div>
                    <div className="flex items-center">
                        <h3 className="text-2xl w-36">Category:</h3>
                        <p className="text-xl text-gray-400 px-2">{product.categoryId?.name}</p>
                    </div>
                    <div className="flex items-center">
                        <h3 className="text-2xl w-36">Brand: </h3>
                        <p className="text-lg text-gray-400 px-2">{product.brandId?.name}</p>
                    </div>
                    <div className="flex items-center">
                        <h3 className="text-2xl w-36">Seller: </h3>
                        <p className="text-lg text-gray-400 px-2">{product.sellerId?.fullName}</p>
                    </div>
                    {/* Price */}
                    <div className="flex items-center">
                        <h3 className="text-2xl w-36">Seller: </h3>
                        <p className="text-lg text-gray-400 px-2">
                        {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.price)}
                        </p>
                    </div>

                    {/* Image Gallery */}
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
                        {product.imageUrls.map((image, index) => (
                            <div key={index} className="relative aspect-square overflow-hidden rounded-lg">
                                <img
                                    src={image}
                                    alt={`Product ${index + 1}`}
                                    className="object-cover w-full h-full hover:scale-110 transition-transform duration-300"
                                    onError={(e) => {
                                        e.target.src = "https://images.unsplash.com/photo-1590212151175-e58edd96185b";
                                    }}
                                />
                            </div>
                        ))}
                    </div>

                    {/* Description */}
                    <h3 className="text-2xl">Description: </h3>
                    <div className="bg-gray-700 rounded-lg p-6">
                        <p className="text-gray-300 line-clamp-2">{product.description}</p>
                    </div>

                    {/* Action Buttons */}
                    {!showRejectionForm ? (
                        <div className="flex gap-4">
                            <button
                                onClick={handleApprove}
                                disabled={loading}
                                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-colors duration-300 ${
                                    loading
                                        ? "bg-green-300 cursor-not-allowed"
                                        : "bg-green-500 hover:bg-green-600"
                                }`}
                            >
                                <FaCheck /> {loading ? "Approving..." : "Approve"}
                            </button>
                            <button
                                onClick={() => setShowRejectionForm(true)}
                                disabled={loading}
                                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-colors duration-300 ${
                                    loading
                                        ? "bg-red-300 cursor-not-allowed"
                                        : "bg-red-500 hover:bg-red-600"
                                }`}
                            >
                                <FaTimes /> Reject
                            </button>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            <div>
                                <label htmlFor="rejectionReason" className="block text-gray-300 mb-2">
                                    Rejection Reason
                                </label>
                                <textarea
                                    id="rejectionReason"
                                    value={rejectionReason}
                                    onChange={(e) => setRejectionReason(e.target.value)}
                                    className="w-full bg-gray-700 border border-gray-600 rounded-lg p-4 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    rows="4"
                                    placeholder="Please provide a reason for rejection..."
                                ></textarea>
                            </div>
                            <div className="flex gap-4">
                                <button
                                    onClick={handleReject}
                                    disabled={loading || !rejectionReason.trim()}
                                    className={`px-6 py-3 rounded-lg font-semibold transition-colors duration-300 ${
                                        loading
                                            ? "bg-blue-300 cursor-not-allowed"
                                            : "bg-blue-500 hover:bg-blue-600"
                                    }`}
                                >
                                    {loading ? "Rejecting..." : "Submit Rejection"}
                                </button>
                                <button
                                    onClick={() => {
                                        setShowRejectionForm(false);
                                        setRejectionReason("");
                                    }}
                                    disabled={loading}
                                    className="px-6 py-3 bg-gray-600 hover:bg-gray-700 rounded-lg font-semibold transition-colors duration-300"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default ConfirmModal;
