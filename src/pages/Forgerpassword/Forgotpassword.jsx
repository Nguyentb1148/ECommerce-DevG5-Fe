import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/ForgotPassword.css';
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
        <div className="forgot-password-container">
            <h2>Forgot Password</h2>
            {showImmediateMessage && <div className="info-message">Sending Email...</div>}
            {errorMessage && <div className="error-message">{errorMessage}</div>}
            {message && <div className="success-message">{message}</div>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        disabled={loading}
                    />
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? 'Sending...' : 'Send Confirmation Email'}
                </button>
            </form>
        </div>
    );
};

export default ForgotPassword;
