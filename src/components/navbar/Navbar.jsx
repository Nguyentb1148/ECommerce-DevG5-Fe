import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MdOutlineShoppingCart } from "react-icons/md";
import User from '../../pages/profile/User';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isLogin, setIsLogin] = useState(false);
    const [cartCount, setCartCount] = useState(0);

    useEffect(() => {
        const userData = localStorage.getItem('user');
        if (userData) {
            setIsLogin(true);
        } else {
            setIsLogin(false);
        }
    }, []);
    useEffect(() => {
        const storedCartCount = parseInt(localStorage.getItem("cartCount") || "0", 10);
        setCartCount(storedCartCount);

        const handleStorageChange = () => {
            const updatedCount = parseInt(localStorage.getItem("cartCount") || "0", 10);
            setCartCount(updatedCount);
        };

        window.addEventListener("storage", handleStorageChange);
        return () => {
            window.removeEventListener("storage", handleStorageChange);
        };
    }, []);
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <div className="navbar w-full z-20 bg-gray-900 ">
            <div className="flex items-center justify-between w-[90%] mx-auto p-4">
                <a href="/" className=" text-primary font-semibold tracking-widest text-2xl uppercase sm:text-3xl">
                    DevSHOP
                </a>
                <div className="flex">
                    <div className="relative mr-4 md:hidden">
                        <Link className="item-navbar" to="/shoppingCart">
                            <MdOutlineShoppingCart size={25} />
                        </Link>
                        {cartCount > 0 && (
                            <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                                {cartCount}
                            </span>
                        )}
                    </div>
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
                </div>

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
                        <li className="max-md:hidden relative">
                            <Link className="item-navbar" to="/shoppingCart">
                                <MdOutlineShoppingCart size={25} />
                            </Link>
                            {cartCount > 0 && (
                                <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                                    {cartCount}
                                </span>
                            )}
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
                        {isLogin ? (
                            <User />
                        ) : (
                            <Link to="/authentication" className="btn-add">
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