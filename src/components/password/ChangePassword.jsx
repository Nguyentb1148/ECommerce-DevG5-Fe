import React, { useState } from "react";
import { FiEye, FiEyeOff, FiLock } from "react-icons/fi";

const ChangePassword = () => {
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [passwordData, setPasswordData] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    const handlePasswordSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500));
        setLoading(false);
        setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
    };

    const checkPasswordStrength = (password) => {
        const criteria = [
            password.length >= 8,
            /[A-Z]/.test(password),
            /[a-z]/.test(password),
            /[0-9]/.test(password),
            /[^A-Za-z0-9]/.test(password),
        ];
        return criteria.filter(Boolean).length;
    };

    return (
        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
            <form onSubmit={handlePasswordSubmit} className="space-y-6 max-w-md mx-auto">
                <div>
                    <label
                        htmlFor="currentPassword"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                        Current Password
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FiLock className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                        </div>
                        <input
                            type={showPassword ? "text" : "password"}
                            id="currentPassword"
                            value={passwordData.currentPassword}
                            onChange={(e) =>
                                setPasswordData({ ...passwordData, currentPassword: e.target.value })
                            }
                            className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 pr-10 sm:text-sm border-gray-300 rounded-md dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                            required
                        />
                        <button
                            type="button"
                            className="absolute inset-y-0 right-0 pr-3 flex items-center"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? (
                                <FiEyeOff className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                            ) : (
                                <FiEye className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                            )}
                        </button>
                    </div>
                </div>

                <div>
                    <label
                        htmlFor="newPassword"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                        New Password
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FiLock className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                        </div>
                        <input
                            type={showNewPassword ? "text" : "password"}
                            id="newPassword"
                            value={passwordData.newPassword}
                            onChange={(e) =>
                                setPasswordData({ ...passwordData, newPassword: e.target.value })
                            }
                            className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 pr-10 sm:text-sm border-gray-300 rounded-md dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                            required
                        />
                        <button
                            type="button"
                            className="absolute inset-y-0 right-0 pr-3 flex items-center"
                            onClick={() => setShowNewPassword(!showNewPassword)}
                        >
                            {showNewPassword ? (
                                <FiEyeOff className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                            ) : (
                                <FiEye className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                            )}
                        </button>
                    </div>
                    <div className="mt-2">
                        <div className="flex space-x-2">
                            {[...Array(5)].map((_, index) => (
                                <div
                                    key={index}
                                    className={`h-2 w-full rounded ${
                                        index < checkPasswordStrength(passwordData.newPassword)
                                            ? "bg-green-500"
                                            : "bg-gray-200 dark:bg-gray-600"
                                    }`}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                <div>
                    <label
                        htmlFor="confirmPassword"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                        Confirm New Password
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FiLock className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                        </div>
                        <input
                            type={showConfirmPassword ? "text" : "password"}
                            id="confirmPassword"
                            value={passwordData.confirmPassword}
                            onChange={(e) =>
                                setPasswordData({ ...passwordData, confirmPassword: e.target.value })
                            }
                            className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 pr-10 sm:text-sm border-gray-300 rounded-md dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                            required
                        />
                        <button
                            type="button"
                            className="absolute inset-y-0 right-0 pr-3 flex items-center"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                            {showConfirmPassword ? (
                                <FiEyeOff className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                            ) : (
                                <FiEye className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                            )}
                        </button>
                    </div>
                </div>

                <div className="flex justify-end">
                    <button
                        type="submit"
                        disabled={loading}
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-gray-800"
                    >
                        {loading ? (
                            <svg
                                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                ></circle>
                                <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                ></path>
                            </svg>
                        ) : (
                            "Change Password"
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ChangePassword;
