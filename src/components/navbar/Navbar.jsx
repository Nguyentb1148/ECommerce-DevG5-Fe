import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MdOutlineShoppingCart } from "react-icons/md";
import User from '../../pages/profile/User';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isLogin, setIsLogin] = useState(false);

    // Check if the user is logged in when the component mounts
    useEffect(() => {
        // Check localStorage for user data (or token, etc.)
        const userData = localStorage.getItem('user'); // Replace with the actual key you're using for the user data
        if (userData) {
            setIsLogin(true);  // User is logged in
        } else {
            setIsLogin(false); // User is not logged in
        }
    }, []); // Empty dependency array means this runs only once after the first render

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <div className="navbar w-full z-20 bg-gray-900 ">
            <div className="flex items-center justify-between w-[90%] mx-auto p-4">
                <a href="/" className=" text-primary font-semibold tracking-widest text-2xl uppercase sm:text-3xl">
                    DevSHOP
                </a>
                <button
                    className="text-white md:hidden focus:outline-none"
                    onClick={toggleMenu}
                >
                    <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 6h16M4 12h16m-7 6h7"
                        />
                    </svg>
                </button>

                <div className="hidden md:block">
                    <ul className="flex items-center gap-5">
                        <li>
                            <a href="/" className="item-navbar">
                                Home
                            </a>
                        </li>
                        <li>
                            <Link to="/productFilter" className="item-navbar">
                                Product
                            </Link>
                        </li>
                        <li>
                            <Link to="/contact" className="item-navbar">
                                Contact
                            </Link>
                        </li>
                        <li>
                            <Link className="item-navbar" to="/shoppingCart">
                                <MdOutlineShoppingCart size={25} />
                            </Link>
                        </li>
                        {isLogin ? (
                            <User />
                        ) : (
                            <Link to="/authentication" className="btn-add">
                                Login
                            </Link>
                        )}
                    </ul>
                </div>
            </div>

            {/* Mobile Dropdown Menu */}
            {isMenuOpen && (
                <div className="md:hidden bg-gray-800 shadow-lg">
                    <ul className="flex flex-col items-center gap-4 p-4">
                        <li>
                            <a href="/#" className="item-navbar">
                                Home
                            </a>
                        </li>
                        <li>
                            <Link to="/productFilter" className="item-navbar">
                                Product
                            </Link>
                        </li>
                        <li>
                            <Link to="/contact" className="item-navbar">
                                Contact
                            </Link>
                        </li>
                        <li>
                            <Link className="item-navbar" to="/shoppingCart">
                                <MdOutlineShoppingCart size={25} />
                            </Link>
                        </li>
                        {isLogin ? (
                            <User />
                        ) : (
                            <Link to="/login" className="btn-add">
                                Login
                            </Link>
                        )}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Navbar;