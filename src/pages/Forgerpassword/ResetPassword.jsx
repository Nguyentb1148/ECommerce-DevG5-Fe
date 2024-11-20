import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import '../../styles/ResetPassword.css';
import { resetpassword } from '../../services/Api/AuthApi';

const ResetPassword = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
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

        if (password !== confirmPassword) {
            setErrorMessage("Passwords do not match.");
            setLoading(false);
            return;
        }

        try {
            const response = await resetpassword(token, password); // Call the fixed API function
            setSuccessMessage('Password reset successfully!');
            setTimeout(() => navigate('/login'), 2000); // Redirect to login page after 2 seconds
        } catch (error) {
            setErrorMessage(error.response?.data?.message || "An error occurred while resetting the password.");
        } finally {
            setLoading(false);
        }
    };

    return (
       <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-gray-700 text-center mb-4">
          Forgot Password
        </h2>
        <p className="text-sm text-gray-500 text-center mb-6">
          Enter your email to reset your password.
        </p>
        {message && (
          <p className="text-center text-green-500 text-sm mb-4">{message}</p>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
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
              placeholder="Enter your email"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-900"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md transition"
          >
            Send Reset Link
          </button>
        </form>
        <div className="mt-4 text-center">
          <a
            href="/login"
            className="text-sm text-blue-500 hover:underline"
          >
            Back to Login
          </a>
        </div>
      </div>
    </div>
    );
};

export default ResetPassword;
