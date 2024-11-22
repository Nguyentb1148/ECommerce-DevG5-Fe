import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { resetPassword } from '../../services/Api/AuthApi';

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
            const response = await resetPassword(token, password); // Call the fixed API function
            setSuccessMessage('Password reset successfully!');
            setTimeout(() => navigate('/login'), 2000); // Redirect to login page after 2 seconds
        } catch (error) {
            setErrorMessage(error.response?.data?.message || "An error occurred while resetting the password.");
        } finally {
            setLoading(false);
        }
    };

    // Inline styles
    const styles = {
        container: {
            width: '100%',
            maxWidth: '400px',
            margin: '50px auto',
            padding: '20px',
            border: '1px solid #ccc',
            borderRadius: '8px',
            backgroundColor: '#f9f9f9',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            textAlign: 'center',
            fontFamily: "'Arial', sans-serif",
        },
        formGroup: {
            marginBottom: '15px',
        },
        label: {
            display: 'block',
            marginBottom: '5px',
            fontWeight: 'bold',
            fontSize: '14px',
        },
        input: {
            width: '100%',
            padding: '10px',
            fontSize: '14px',
            border: '1px solid #ccc',
            borderRadius: '4px',
        },
        button: {
            width: '100%',
            padding: '10px',
            fontSize: '16px',
            backgroundColor: '#007BFF',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease',
        },
        buttonDisabled: {
            backgroundColor: '#a9a9a9',
        },
        successMessage: {
            color: 'green',
            marginBottom: '10px',
        },
        errorMessage: {
            color: 'red',
            marginBottom: '10px',
        },
    };

    return (
        <div style={styles.container}>
            <h2>Reset Your Password</h2>
            {errorMessage && <div style={styles.errorMessage}>{errorMessage}</div>}
            {successMessage && <div style={styles.successMessage}>{successMessage}</div>}
            <form onSubmit={handleSubmit}>
                <div style={styles.formGroup}>
                    <label htmlFor="password" style={styles.label}>New Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        disabled={loading}
                        style={styles.input}
                    />
                </div>
                <div style={styles.formGroup}>
                    <label htmlFor="confirmPassword" style={styles.label}>Confirm Password:</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        disabled={loading}
                        style={styles.input}
                    />
                </div>
                <button
                    type="submit"
                    disabled={loading}
                    style={{ ...styles.button, ...(loading && styles.buttonDisabled) }}
                >
                    {loading ? 'Resetting...' : 'Reset Password'}
                </button>
            </form>
        </div>
    );
};

export default ResetPassword;
