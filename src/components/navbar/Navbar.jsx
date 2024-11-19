import React, { useState, useEffect } from 'react';
import '../../styles/Narbar.css';
import DefaultAvatar from '../../assets/images/DefaultAvatar.png'
import Profile from "../profile/Profile";
export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const [isDropdownOpen,setIsDropdownOpen]=useState(false);
    const [isProfileOpen,setIsProfileOpen]=useState(false);;
    useEffect(() => {
        // Check if 'user' data exists in localStorage
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            setUser(parsedUser);
            setIsLoggedIn(true);
        }
    }, []);

    function toggleMenu() {
        setIsOpen(!isOpen);
    }
    const onLogout = () => {
        localStorage.clear();
        setUser(null);
        window.location.href = '/';
    };
    const toggleDropdown=()=>{
        setIsDropdownOpen(!isDropdownOpen);
    }
    const openProfile=()=>{
        setIsProfileOpen(true);
        setIsDropdownOpen(false);
    }
    return (
        <nav className="navbar">
            <span href="/" className="navbar-logo" onClick={toggleMenu}>MyWebsite</span>
            <div className={`navbar-links ${isOpen ? 'open' : ''}`}>
                {isLoggedIn ? (
                    <div className="navbar-avatar-container">
                        <img
                            src={user?.picture || DefaultAvatar}
                            alt={user?.name || "User"}
                            className="navbar-avatar"
                            onClick={toggleDropdown}
                        />
                        {isDropdownOpen && (
                            <div className="dropdown-menu">
                                <span onClick={openProfile}>Profile</span>
                                <span onClick={onLogout}>Logout</span>
                            </div>
                        )}
                    </div>
                ) : (
                    <>
                        <a href="/login">Login</a>
                        <a href="/register">Register</a>
                    </>
                )}
            </div>
            <button className="navbar-toggle" onClick={toggleMenu}>
                <span className="navbar-toggle-icon"></span>
                <span className="navbar-toggle-icon"></span>
                <span className="navbar-toggle-icon"></span>
            </button>

            {isProfileOpen && (
                <Profile user={user} onClose={() => setIsProfileOpen(false)} />
            )}
        </nav>
    );
}
