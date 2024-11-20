import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import User from '../../pages/profile/User';
import Search from '../search/Search'
const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isLogin, setIsLogin] = useState(false);
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <div className="navbar w-full z-20 bg-white dark:bg-gray-900 ">
            <div className="flex items-center justify-between w-[90%] mx-auto px-4 py-3">
                <a href="" className=" text-primary font-semibold tracking-widest text-2xl uppercase sm:text-3xl">
                    DevSHOP
                </a>
                <button
                    className="text-gray-500 dark:text-white md:hidden focus:outline-none"
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
                <ul className="hidden md:flex items-center lg:gap-2">
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
                        <Link to="/blog" className="item-navbar">
                            Contact
                        </Link>
                    </li>
                    <li>
                        <Link to="/contact" className="item-navbar">
                            Contact
                        </Link>
                    </li>
                    <Search/>
                </ul>
                <div className="hidden md:block">
                    <div className="flex items-center">
                        {!isLogin ?
                            <>
                                <User />
                            </> :
                            <>
                                <Link to="/login" className="btn-add">
                                    Login
                                </Link>
                            </>}
                    </div>
                </div>
            </div>

            {/* Mobile Dropdown Menu */}
            {isMenuOpen && (
                <div className="md:hidden bg-white dark:bg-gray-800 shadow-lg">
                    <ul className="flex flex-col items-center gap-4 p-4">
                        <Search />
                        <li>
                            <a href="/#" className="inline-block font-semibold text-gray-500 hover:text-black dark:hover:text-white duration-200">
                                Home
                            </a>
                        </li>
                        <li>
                            <a href="/#shop" className="inline-block font-semibold text-gray-500 hover:text-black dark:hover:text-white duration-200">
                                Product
                            </a>
                        </li>
                        <li>
                            <a href="/#about" className="inline-block font-semibold text-gray-500 hover:text-black dark:hover:text-white duration-200">
                                About
                            </a>
                        </li>
                        {!isLogin ?
                            <>
                                <User />
                            </> :
                            <>
                                <Link to="/login" className="btn-add">
                                    Login
                                </Link>
                            </>}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Navbar;
