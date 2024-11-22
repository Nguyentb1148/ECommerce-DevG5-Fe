import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { resetpassword } from '../../services/Api/AuthApi';
import { FcCheckmark } from "react-icons/fc";  // Import the green checkmark icon


const ResetPassword = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const [passwordMatch, setPasswordMatch] = useState(null); // State to track password match
    const [showSuccess, setShowSuccess] = useState(false); // Track if success is shown

    const [searchParams] = useSearchParams(); // Use searchParams to get query params
    const token = searchParams.get('token'); // Extract token from query string
    const navigate = useNavigate();

    useEffect(() => {
        if (!token) {
            navigate('/login');
        }
    }, [token, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrorMessage('');
        setSuccessMessage('');

        setShowSuccess(false); // Reset success message visibility

        if (password !== confirmPassword) {
            setErrorMessage("Passwords do not match.");
            setPasswordMatch(false); // Passwords don't match

            setLoading(false);
            return;
        }

        try {

            const response = await resetpassword(token, password); // Call the fixed API function
            setSuccessMessage('Password reset successfully!');
            setPasswordMatch(true); // Passwords match, show success
            setShowSuccess(true); // Show the success indicator
            setTimeout(() => navigate('/login'), 2000); // Redirect to login page after 2 seconds
        } catch (error) {
            setErrorMessage(error.response?.data?.message || "An error occurred while resetting the password.");
            setPasswordMatch(false); // In case of error

        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg border border-gray-300">
                <h2 className="text-2xl font-semibold text-gray-700 text-center mb-6">Reset Your Password</h2>

                {/* Show success message with green checkmark if passwords match */}
                {showSuccess && (
                    <div className="text-sm text-green-500 text-center mb-4 flex items-center justify-center">
                        <FcCheckmark className="text-green-500 text-6xl mr-2 animate-pulse" />
                        Password reset successful!
                    </div>
                )}

                {/* Show error message if passwords do not match */}
                {passwordMatch === false && (
                    <div className="text-sm text-red-500 text-center mb-4">
                        {errorMessage}
                    </div>
                )}

                {!showSuccess && (
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium text-gray-700"
                            >
                                New Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                disabled={loading}
                                placeholder="Enter your new password"
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="confirmPassword"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Confirm Password
                            </label>
                            <input
                                type="password"
                                id="confirmPassword"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                                disabled={loading}
                                placeholder="Re-enter your new password"
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full py-2 px-4 rounded-md font-medium text-white transition ${
                                loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
                            }`}
                        >
                            {loading ? 'Resetting...' : 'Reset Password'}
                        </button>
                    </form>
                )}

                <div className="mt-4 text-center">
                    <button
                        onClick={() => navigate('/login')}
                        className="text-sm text-blue-500 hover:underline"
                    >
                        Back to Login
                    </button>
                </div>
            </div>
=======
        <div className="reset-password-container">
            <h2>Reset Your Password</h2>
            {errorMessage && <div className="error-message">{errorMessage}</div>}
            {successMessage && <div className="success-message">{successMessage}</div>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="password">New Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        disabled={loading}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="confirmPassword">Confirm Password:</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        disabled={loading}
                    />
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? 'Resetting...' : 'Reset Password'}
                </button>
            </form>

        </div>
    );
};

export default ResetPassword;

