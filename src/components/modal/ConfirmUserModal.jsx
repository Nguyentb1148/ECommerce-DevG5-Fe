import React, { useState } from 'react';
import {
    FaCheck,
    FaTimes,
    FaBan,
    FaEnvelope,
    FaPhone,
    FaMapMarkerAlt,
    FaBriefcase,
    FaVenusMars,
} from "react-icons/fa";
import { FaX } from "react-icons/fa6";
import { toast, ToastContainer } from "react-toastify";
import { approveRequest, rejectRequest } from "../../services/api/RequestApi.jsx";

const ConfirmUserModal = ({  request, onClose }) => {
    const [showRejectionForm, setShowRejectionForm] = useState(false);
    const [rejectionfeadback, setRejectionfeadback] = useState("");
    const [loading, setLoading] = useState(false);
    console.log("request data: ", request);
    const data= request.additionalData;
    // Handle Approve action
    const handleApprove = async () => {
        setLoading(true);
        try {
            console.log("Approving request for user:", request._id);
            await approveRequest(request._id);
            toast.success("User approved successfully!");
            onClose();
        } catch (error) {
            console.error("Failed to approve user:", error);
            toast.error("Failed to approve the user.");
        } finally {
            setLoading(false);
        }
    };

    // Handle Reject action
    const handleReject = async () => {
        if (!rejectionReason.trim()) {
            toast.error("Please provide a rejection reason.");
            return;
        }
        console.log("Rejecting request for user:", request._id, "with reason:", rejectionReason);
        setLoading(true);
        try {
            await rejectRequest(request._id, { feedback: rejectionReason });
            toast.success("User rejected successfully!");
            onClose();
        } catch (error) {
            console.error("Failed to reject user:", error);
            toast.error("Failed to reject the user.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-20 w-full bg-opacity-50 bg-gray-900 flex items-center justify-center p-4 overflow-auto">
            <div className="bg-gray-800 rounded-2xl shadow-2xl p-8 w-[50%] mx-auto space-y-8">
                <div className="flex flex-col items-center space-y-4">
                    <div className="relative">
                        <img
                            src={data.imageUrl}
                            alt="User profile"
                            className="w-32 h-32 rounded-full object-cover border-4 border-blue-500 shadow-xl transition-transform hover:scale-105"
                        />
                        <button
                            onClick={onClose}
                            className="absolute top-[0.5rem] right-[-17.5rem] text-gray-400 hover:text-gray-200"
                        >
                            <FaX />
                        </button>
                    </div>
                    <h1 className="text-3xl font-bold text-white tracking-wide">
                        {data.fullName}
                    </h1>
                </div>

                <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* User Information */}
                        <DetailItem icon={<FaEnvelope />} label="Email" value={data.email} />
                        <DetailItem icon={<FaVenusMars />} label="Gender" value={data.gender} />
                        <DetailItem icon={<FaPhone />} label="Phone" value={data.phone} />
                        <DetailItem icon={<FaBriefcase />} label="Role" value={data.role} />
                        <DetailItem icon={<FaMapMarkerAlt />} label="Address" value={data.address} />
                        <DetailItem
                            icon={<FaBan />}
                            label="Banned"
                            value={data.isBanned ? "Yes" : "No"}
                        />
                    </div>

                    {/* Action Buttons */}
                    {!showRejectionForm ? (
                        <div className="flex gap-4">
                            <button
                                onClick={handleApprove}
                                disabled={loading}
                                className={`flex items-center gap-2 px-6 py-3 text-white rounded-lg font-semibold transition-colors duration-300 ${
                                    loading
                                        ? "bg-green-300 cursor-not-allowed"
                                        : "bg-blue-500 hover:bg-blue-600"
                                }`}
                            >
                                <FaCheck /> {loading ? "Approving..." : "Approve"}
                            </button>
                            <button
                                onClick={() => setShowRejectionForm(true)}
                                disabled={loading}
                                className={`flex items-center gap-2 px-6 py-3 text-white rounded-lg font-semibold transition-colors duration-300 ${
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
                                <label htmlFor="rejectionfeadback" className="block text-gray-300 mb-2">
                                    Rejection feadback
                                </label>
                                <textarea
                                    id="rejectionfeadback"
                                    value={rejectionfeadback}
                                    onChange={(e) => setRejectionfeadback(e.target.value)}
                                    className="w-full bg-gray-700 border border-gray-600 rounded-lg p-4 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    rows="4"
                                    placeholder="Please provide a feadback for rejection..."
                                ></textarea>
                            </div>
                            <div className="flex gap-4">
                                <button
                                    onClick={handleReject}

                                    disabled={loading || !rejectionfeadback.trim()}
                                    className={`px-6 py-3 rounded-lg font-semibold text-white transition-colors duration-300 ${loading
                                        ? "bg-blue-300 cursor-not-allowed"
                                        : "bg-blue-500 hover:bg-blue-600"
                                        }`}
                                >
                                    {loading ? "Rejecting..." : "Submit Rejection"}
                                </button>
                                <button
                                    onClick={() => {
                                        setShowRejectionForm(false);
                                        setRejectionfeadback("");
                                    }}
                                    disabled={loading}
                                    className="px-6 py-3 text-white bg-gray-600 hover:bg-gray-700 rounded-lg font-semibold transition-colors duration-300"
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

const DetailItem = ({ icon, label, value }) => (
    <div className="flex items-center space-x-4 group p-4 rounded-lg hover:bg-gray-700 transition-colors">
        <div className="p-3 bg-blue-500 rounded-lg group-hover:bg-blue-600">
            <span className="text-white text-xl">{icon}</span>
        </div>
        <div>
            <p className="text-gray-400 text-sm">{label}</p>
            <p className="text-white font-medium">{value}</p>
        </div>
    </div>
);

export default ConfirmUserModal;