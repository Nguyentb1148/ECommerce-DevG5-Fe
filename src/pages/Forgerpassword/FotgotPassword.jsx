import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { forgotPassword } from '../../services/Api/AuthApi';

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
            const response = await forgotPassword(email);
            console.log("Response data: ", response);

            setMessage(response.data);
            alert(response.data)
        } catch (error) {
            setErrorMessage(error.response?.data?.message || "An error occurred while sending the email.");
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
        infoMessage: {
            color: 'blue',
            marginBottom: '10px',
        },
    };

    return (
        <div style={styles.container}>
            <h2>Forgot Password</h2>
            {showImmediateMessage && <div style={styles.infoMessage}>Sending Email...</div>}
            {errorMessage && <div style={styles.errorMessage}>{errorMessage}</div>}
            {message && <div style={styles.successMessage}>{message}</div>}
            <form onSubmit={handleSubmit}>
                <div style={styles.formGroup}>
                    <label htmlFor="email" style={styles.label}>Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
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
                    {loading ? 'Sending...' : 'Send Confirmation Email'}
                </button>
            </form>
        </div>
    );
};

export default ForgotPassword;
