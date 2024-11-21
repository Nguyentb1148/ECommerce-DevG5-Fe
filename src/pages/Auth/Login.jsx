import React, { useState } from 'react';
import {login} from '../../services/Api/AuthApi';
import {Link, useNavigate} from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import eyeIcon from '../../assets/images/eye.svg';
import eyeSlashIcon from '../../assets/images/eyeSlash.svg';
const clientId = "671407638676-nc6tsp0nscas88kneq1jt9q3itl2l6h8.apps.googleusercontent.com";

const Login = () => {


    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrorMessage("");

        const credentials = { email, password };

        try {

            console.log("Attempting login with:", credentials);

            const data = await login(credentials); // Call the AuthApi function
            console.log("Login successful:", data);

        // Decode the accessToken
            const decoded = jwtDecode(data.token.accessToken);
            console.log("Decoded JWT:", decoded);

        // Save the decoded token in localStorage
            localStorage.setItem("user", JSON.stringify(decoded));
            setLoggedIn(true);
        } catch (error) {
            console.error("Login error:", error);
            const errorMsg = error.response?.data?.message || "An error occurred during login.";
            setErrorMessage(errorMsg);
        } finally {
            setLoading(false);
        }
    };


    //login via gg
    const handleLoginSuccess = async (response) => {
        const decoded = jwtDecode(response.credential);
        console.log(decoded)
        const { email } = decoded;
        const userData = {
            email: email,
            password: 'Password01@',
        };
        try {
            const data = await login(userData); // Call the AuthApi function
            if (data) {
                const decoded = jwtDecode(data.token.accessToken);
                localStorage.setItem("user", JSON.stringify(decoded));
                setLoggedIn(true);                
            } else {
                setErrorMessage('Failed to log in via Google.');
            }
        } catch (error) {
            setErrorMessage('An error occurred during login via Google.');
        }
    };

    const handleLoginFailure = (response) => {
        console.log('Login failed:', response);
    };

    if (loggedIn) {
        navigate('/');
        window.location.reload();
    }
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
        setPasswordInputType(showPassword ? 'password' : 'text');
    };

    return (
        <div className="login-container">
            <div className="login-form">
                <h2>Login</h2>
                {errorMessage && <div className="error-message">{errorMessage}</div>}
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
                    <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <div className="password-field">
                            <input
                                type={passwordInputType}
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                disabled={loading}
                            />
                            <button
                                type="button"
                                className="password-toggle"
                                onClick={togglePasswordVisibility}
                            >
                                <img src={showPassword ? eyeSlashIcon : eyeIcon} alt="Show/Hide Password"/>
                            </button>
                        </div>
                    </div>
                    <button type="submit" className="login-button" disabled={loading}>
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                </form>

                <div className="register-link">
                    <p>Don't have an account? <Link to="/register">Register</Link></p>
                </div>
                <div className="register-link">
                    <p> <Link to="/forgotpassword">forgot password ?</Link></p>
                </div>

                <div className="google-login-container">
                    <h2>Login with Google</h2>  
                    <GoogleOAuthProvider clientId={clientId}>
                        <GoogleLogin
                            onSuccess={handleLoginSuccess}
                            onError={handleLoginFailure}
                            scope="profile email"
                            disabled={loading}
                        />
                    </GoogleOAuthProvider>
                </div>
            </div>
        </div>
    );
};

export default Login;
