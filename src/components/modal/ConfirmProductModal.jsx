// import React, { useState } from "react";
// import { FaCheck, FaTimes } from "react-icons/fa";
// import { FaX } from "react-icons/fa6";
// import { ApproveProduct, RejectProduct } from "../../services/api/ProductApi";
// import { toast, ToastContainer } from "react-toastify";
// import mammoth from 'mammoth';
// import { useEffect } from "react";
// const ConfirmModal = ({ product, onClose }) => {
//     const [showRejectionForm, setShowRejectionForm] = useState(false);
//     const [rejectionReason, setRejectionReason] = useState("");
//     const [descriptionContent, setDescriptionContent] = useState(''); // State for description content

//     const [loading, setLoading] = useState(false);
//     useEffect(() => {
//         const fetchProduct = async () => {
//             setLoading(true); // Set loading to true when fetching starts
//             if (product.description && product.description.startsWith('http')) {
//                 const response = await fetch(product.description);
//                 if (response.ok) {
//                     const arrayBuffer = await response.arrayBuffer();
//                     try {
//                         const result = await mammoth.convertToHtml({ arrayBuffer });
//                         setDescriptionContent(result.value); // Set the HTML content from the Word document
//                     } catch (error) {
//                         console.error('Error converting .docx file:', error);
//                         setDescriptionContent('<p>Failed to load description content.</p>');
//                     }
//                 } else {
//                     console.error('Failed to fetch description content.');
//                     setDescriptionContent('<p>Failed to load description content.</p>');
//                 }
//             } else {
//                 setDescriptionContent(product.description || '');
//             }
//             setLoading(false); // Set loading to false when fetching is done
//         };

//         if (product) {
//             fetchProduct();
//         }
//     }, [product]);
//     const handleApprove = async () => {
//         console.log("Approve button clicked");
//         if (!product || !product._id) {
//             console.error("Product ID is missing");
//             toast.error("Product ID is missing. Cannot approve the product.");
//             return;
//         }
//         setLoading(true);
//         try {
//             await ApproveProduct(product._id);
//             toast.success("Product approved successfully!");
//             onClose(); // Close modal after success
//         } catch (err) {
//             console.error("Approval error:", err);
//             toast.error("Failed to approve product. Please try again.");
//         } finally {
//             setLoading(false);
//         }
//     };
//     const handleReject = async (e) => {
//         e.preventDefault();
//         console.log("Reject button clicked");
//         if (!product || !product._id) {
//             console.error("Product ID is missing");
//             toast.error("Product ID is missing. Cannot reject the product.");
//             return;
//         }
//         if (!rejectionReason.trim()) {
//             toast.error("Please provide a reason for rejection.");
//             return;
//         }
//         setLoading(true);
//         try {
//             await RejectProduct(product._id, rejectionReason);
//             toast.success("Product rejected successfully!");
//             setRejectionReason("");
//             setShowRejectionForm(false);
//             onClose(); // Close modal after success
//         } catch (err) {
//             console.error("Rejection error:", err);
//             toast.error("Failed to reject product. Please try again.");
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div className="fixed inset-0 z-20 bg-opacity-30 bg-gray-900 p-6 text-white overflow-auto">
//             <div className="max-w-4xl mx-auto bg-gray-800 rounded-lg shadow-xl p-8">
//                 <div className="space-y-6">
//                     {/* Product Header */}
//                     <div className="flex justify-between items-center">
//                         <h2 className="text-3xl font-bold text-center text-gray-100">Product Details</h2>
//                         <button onClick={onClose} className="text-gray-400 hover:text-gray-200">
//                             <FaX />
//                         </button>
//                     </div>
//                     <div className="flex items-center">
//                         <h3 className="text-2xl w-36">Name:</h3>
//                         <p className="text-xl text-gray-400 px-2">{product.name}</p>
//                     </div>
//                     <div className="flex items-center">
//                         <h3 className="text-2xl w-36">Category:</h3>
//                         <p className="text-xl text-gray-400 px-2">{product.categoryId?.name}</p>
//                     </div>
//                     <div className="flex items-center">
//                         <h3 className="text-2xl w-36">Brand: </h3>
//                         <p className="text-lg text-gray-400 px-2">{product.brandId?.name}</p>
//                     </div>
//                     <div className="flex items-center">
//                         <h3 className="text-2xl w-36">Seller: </h3>
//                         <p className="text-lg text-gray-400 px-2">{product.sellerId?.fullName}</p>
//                     </div>
//                     {/* Price */}
//                     <div className="flex items-center">
//                         <h3 className="text-2xl w-36">Seller: </h3>
//                         <p className="text-lg text-gray-400 px-2">
//                             {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.price)}
//                         </p>
//                     </div>

//                     {/* Image Gallery */}
//                     <h3 className="text-2xl w-36">Image: </h3>

//                     <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
//                         {product.imageUrls.map((image, index) => (
//                             <div key={index} className="relative aspect-square overflow-hidden rounded-lg">
//                                 <img
//                                     src={image}
//                                     alt={`Product ${index + 1}`}
//                                     className="object-cover w-full h-full hover:scale-110 transition-transform duration-300"
//                                     onError={(e) => {
//                                         e.target.src = "https://images.unsplash.com/photo-1590212151175-e58edd96185b";
//                                     }}
//                                 />
//                             </div>
//                         ))}
//                     </div>

//                     {/* Description */}
//                     <h3 className="text-2xl">Description: </h3>
//                     {loading ? (
//                         <p className="text-gray-400">Loading description...</p>
//                     ) : (
//                         <div className="text-gray-400" dangerouslySetInnerHTML={{ __html: descriptionContent }} />
//                     )}

//                     {/* Action Buttons */}
//                     {!showRejectionForm ? (
//                         <div className="flex gap-4">
//                             <button
//                                 onClick={handleApprove}
//                                 disabled={loading}
//                                 className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-colors duration-300 ${loading
//                                         ? "bg-green-300 cursor-not-allowed"
//                                         : "bg-green-500 hover:bg-green-600"
//                                     }`}
//                             >
//                                 <FaCheck /> {loading ? "Approving..." : "Approve"}
//                             </button>
//                             <button
//                                 onClick={() => setShowRejectionForm(true)}
//                                 disabled={loading}
//                                 className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-colors duration-300 ${loading
//                                         ? "bg-red-300 cursor-not-allowed"
//                                         : "bg-red-500 hover:bg-red-600"
//                                     }`}
//                             >
//                                 <FaTimes /> Reject
//                             </button>
//                         </div>
//                     ) : (
//                         <div className="space-y-4">
//                             <div>
//                                 <label htmlFor="rejectionReason" className="block text-gray-300 mb-2">
//                                     Rejection Reason
//                                 </label>
//                                 <textarea
//                                     id="rejectionReason"
//                                     value={rejectionReason}
//                                     onChange={(e) => setRejectionReason(e.target.value)}
//                                     className="w-full bg-gray-700 border border-gray-600 rounded-lg p-4 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                                     rows="4"
//                                     placeholder="Please provide a reason for rejection..."
//                                 ></textarea>
//                             </div>
//                             <div className="flex gap-4">
//                                 <button
//                                     onClick={handleReject}
//                                     disabled={loading || !rejectionReason.trim()}
//                                     className={`px-6 py-3 rounded-lg font-semibold transition-colors duration-300 ${loading
//                                             ? "bg-blue-300 cursor-not-allowed"
//                                             : "bg-blue-500 hover:bg-blue-600"
//                                         }`}
//                                 >
//                                     {loading ? "Rejecting..." : "Submit Rejection"}
//                                 </button>
//                                 <button
//                                     onClick={() => {
//                                         setShowRejectionForm(false);
//                                         setRejectionReason("");
//                                     }}
//                                     disabled={loading}
//                                     className="px-6 py-3 bg-gray-600 hover:bg-gray-700 rounded-lg font-semibold transition-colors duration-300"
//                                 >
//                                     Cancel
//                                 </button>
//                             </div>
//                         </div>
//                     )}
//                 </div>
//             </div>
//             <ToastContainer />
//         </div>
//     );
// };

// export default ConfirmModal;

import React, { useState, useEffect } from "react";
import { FaCheck, FaTimes } from "react-icons/fa";
import { FaX } from "react-icons/fa6";
import { ApproveProduct, RejectProduct } from "../../services/api/ProductApi";
import { toast, ToastContainer } from "react-toastify";
import mammoth from 'mammoth';

const ConfirmModal = ({ product, onClose }) => {
    const [showRejectionForm, setShowRejectionForm] = useState(false);
    const [feedback, setFeedback] = useState(""); // Updated to 'feedback'
    const [descriptionContent, setDescriptionContent] = useState(""); // State for description content
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchProduct = async () => {
            setLoading(true);
            if (product.description && product.description.startsWith('http')) {
                const response = await fetch(product.description);
                if (response.ok) {
                    const arrayBuffer = await response.arrayBuffer();
                    try {
                        const result = await mammoth.convertToHtml({ arrayBuffer });
                        setDescriptionContent(result.value); // Set the HTML content from the Word document
                    } catch (error) {
                        console.error('Error converting .docx file:', error);
                        setDescriptionContent('<p>Failed to load description content.</p>');
                    }
                } else {
                    console.error('Failed to fetch description content.');
                    setDescriptionContent('<p>Failed to load description content.</p>');
                }
            } else {
                setDescriptionContent(product.description || '');
            }
            setLoading(false);
        };

        if (product) {
            fetchProduct();
        }
    }, [product]);

    const handleApprove = async () => {
        console.log("Approve button clicked");
        if (!product || !product._id) {
            console.error("Product ID is missing");
            toast.error("Product ID is missing. Cannot approve the product.");
            return;
        }
        setLoading(true);
        try {
            await ApproveProduct(product._id);
            toast.success("Product approved successfully!");
            onClose(); // Close modal after success
        } catch (err) {
            console.error("Approval error:", err);
            toast.error("Failed to approve product. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleReject = async (e) => {
        e.preventDefault();
        console.log("Reject button clicked");
        if (!product || !product._id) {
            console.error("Product ID is missing");
            toast.error("Product ID is missing. Cannot reject the product.");
            return;
        }
        if (!feedback.trim()) {
            toast.error("Please provide feedback for rejection.");
            return;
        }
        setLoading(true);
        try {
            await RejectProduct(product._id, feedback);
            toast.success("Product rejected successfully!");
            setFeedback(""); // Clear feedback
            setShowRejectionForm(false);
            onClose(); // Close modal after success
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
                    {/* Product Info */}
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
                    <div className="flex items-center">
                        <h3 className="text-2xl w-36">Price: </h3>
                        <p className="text-lg text-gray-400 px-2">
                            {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.price)}
                        </p>
                    </div>
                    {/* Image Gallery */}
                    <h3 className="text-2xl w-36">Image: </h3>
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
                    {loading ? (
                        <p className="text-gray-400">Loading description...</p>
                    ) : (
                        <div className="text-gray-400" dangerouslySetInnerHTML={{ __html: descriptionContent }} />
                    )}
                    {/* Action Buttons */}
                    {!showRejectionForm ? (
                        <div className="flex gap-4">
                            <button
                                onClick={handleApprove}
                                disabled={loading}
                                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-colors duration-300 ${loading
                                    ? "bg-green-300 cursor-not-allowed"
                                    : "bg-green-500 hover:bg-green-600"
                                    }`}
                            >
                                <FaCheck /> {loading ? "Approving..." : "Approve"}
                            </button>
                            <button
                                onClick={() => setShowRejectionForm(true)}
                                disabled={loading}
                                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-colors duration-300 ${loading
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
                                <label htmlFor="feedback" className="block text-gray-300 mb-2">
                                    Feedback
                                </label>
                                <textarea
                                    id="feedback"
                                    value={feedback}
                                    onChange={(e) => setFeedback(e.target.value)}
                                    className="w-full bg-gray-700 border border-gray-600 rounded-lg p-4 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    rows="4"
                                    placeholder="Please provide feedback for rejection..."
                                ></textarea>
                            </div>
                            <div className="flex gap-4">
                                <button
                                    onClick={handleReject}
                                    disabled={loading || !feedback.trim()}
                                    className={`px-6 py-3 rounded-lg font-semibold transition-colors duration-300 ${loading
                                        ? "bg-blue-300 cursor-not-allowed"
                                        : "bg-blue-500 hover:bg-blue-600"
                                        }`}
                                >
                                    {loading ? "Rejecting..." : "Submit Feedback"}
                                </button>
                                <button
                                    onClick={() => {
                                        setShowRejectionForm(false);
                                        setFeedback("");
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
