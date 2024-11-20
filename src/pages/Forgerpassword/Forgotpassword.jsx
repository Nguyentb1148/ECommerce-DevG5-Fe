import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { forgotpassword } from '../../services/Api/AuthApi';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [showImmediateMessage, setShowImmediateMessage] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrorMessage('');
        setMessage('');
        setShowImmediateMessage(true);

        // Hide the immediate message after 3 seconds
        setTimeout(() => setShowImmediateMessage(false), 3000);

        try {
            const response = await forgotpassword(email);
            console.log("Response data: ", response);
            setMessage(response.message); // Adjusted to match correct property
        } catch (error) {
            setErrorMessage(error.response?.data?.message || "An error occurred while sending the email.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
        {/* Main container with border */}
        <div className="w-full max-w-lg bg-white p-8 rounded-lg shadow-lg border border-gray-300">
            <h2 className="text-2xl font-semibold text-gray-700 text-center mb-6">Forgot Password</h2>
            {showImmediateMessage && (
                <div className="text-sm text-blue-500 text-center mb-4">Sending Email...</div>
            )}
            {errorMessage && (
                <div className="text-sm text-red-500 text-center mb-4">{errorMessage}</div>
            )}
            {message && (
                <div className="text-sm text-green-500 text-center mb-4">{message}</div>
            )}
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Email Address
                    </label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        disabled={loading}
                        placeholder="Enter your email"
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
                    {loading ? 'Sending...' : 'Send Confirmation Email'}
                </button>
            </form>
            <div className="mt-4 text-center">
                <button
                    onClick={() => navigate('/login')}
                    className="text-sm text-blue-500 hover:underline"
                >
                    Back to Login
                </button>
            </div>
        </div>
        </div>
    );
};

export default ForgotPassword;
