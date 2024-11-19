import '../../styles/Register.css'
import React, { useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {jwtDecode} from "jwt-decode";
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import eyeIcon from '../../assets/images/eye.svg';
import eyeSlashIcon from '../../assets/images/eyeSlash.svg';
const clientId = "862905097670-678pkbir60a8v0jk4v75ua6nsu4j3k40.apps.googleusercontent.com";

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [passwordInputType, setPasswordInputType] = useState('password');
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [confirmPasswordInputType, setConfirmPasswordInputType] = useState('password');
    const [regiteredIn,setRegisteredIn]= useState(false);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (password !== confirmPassword) {
            setErrorMessage('The password and confirmation password do not match.');
            return;
        }
        const newUser = {
            email,
            password,
            confirmPassword,
        };
        console.log(newUser);
        alert(`Email sending to ${email}, confirm to create account. `)
        setRegisteredIn(true)
    };

    const handleRegisterSuccess = async (response) => {
        console.log('Register successful:', response);
        const decoded = jwtDecode(response.credential);
        console.log('Decoded JWT:', decoded);
        const { email } = decoded;

        const userData = {
            email,
            password: 'Password01@',
            confirmPassword: 'Password01@'
        };
        console.log("user data: ", userData);
        setRegisteredIn(true);
    };

    if(regiteredIn){
        navigate('/')
        window.location.reload();
    }
    const handleRegisterFailure = (response) => {
        console.log('Register failed:', response);
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
        setPasswordInputType(showPassword ? 'password' : 'text');
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
        setConfirmPasswordInputType(showConfirmPassword ? 'password' : 'text');
    };

    return (
        <div className="center-container">
            <div className="registration-container">
                <h2>Register</h2>
                {errorMessage && <div className="error-message">{errorMessage}</div>}
                <form onSubmit={handleSubmit} className="registration-form">
                    <div className="form-group">
                        <label>Email:</label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
                    </div>
                    <div className="form-group">
                        <label>Password:</label>
                        <div className="password-field">
                            <input
                                type={passwordInputType}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
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
                    <div className="form-group">
                        <label>Confirm Password:</label>
                        <div className="password-field">
                            <input
                                type={confirmPasswordInputType}
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                            <button
                                type="button"
                                className="password-toggle"
                                onClick={toggleConfirmPasswordVisibility}
                            >
                                <img src={showConfirmPassword ? eyeSlashIcon : eyeIcon} alt="Show/Hide Password"/>
                            </button>
                        </div>
                    </div>
                    <button type="submit" className="registration-button">
                        {loading ? 'Registering in...' : 'Register'}
                    </button>
                    <div className="login-link">
                        <p>Already have an account?<Link to="/login">Login</Link></p>
                    </div>
                    <GoogleOAuthProvider clientId={clientId}>
                        <div className="register-container">
                            <h2>Login with Google</h2>
                            <GoogleLogin
                                onSuccess={handleRegisterSuccess}
                                onError={handleRegisterFailure}
                                scope="profile email"
                            />
                        </div>
                    </GoogleOAuthProvider>
                </form>
            </div>
        </div>
    );
};

export default Register;
