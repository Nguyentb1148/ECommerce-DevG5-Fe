import React from 'react'
import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { MdOutlineShoppingCart } from "react-icons/md";
import { BiArrowToTop } from "react-icons/bi";
import { IoSunnyOutline } from "react-icons/io5";
import { MdOutlineNightlight } from "react-icons/md";
import { IoMdChatboxes } from "react-icons/io";

const Sidebar = () => {
    const [darkMode, setDarkMode] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    // DarkMode
    useEffect(() => {
        const isDarkMode = localStorage.getItem('darkMode') === 'true';
        setDarkMode(isDarkMode);
    }, []);
    useEffect(() => {
        document.documentElement.classList.toggle('dark', darkMode);
        localStorage.setItem('darkMode', darkMode);
    }, [darkMode]);
    const btnDarkMode = () => {
        setDarkMode((prevMode) => !prevMode);
    };
    // BackToTop
    const handleScroll = () => {
        if (window.scrollY > 100) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };
    const btnToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };
    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div>
            <div className="fixed grid place-items-center right-0 top-60 text-white bg-gray-900 dark:bg-gray-800 px-4 py-2 rounded-lg">
                <div className="border-b-2 border-gray item-sidebar">
                    <button onClick={btnToTop}>
                        <BiArrowToTop className="text-3xl " />
                    </button>

                </div>
                <div className="text-3xl item-sidebar">
                    <button onClick={btnDarkMode}>
                        {darkMode ? <IoSunnyOutline /> : <MdOutlineNightlight />}
                    </button>
                </div>
                <div className="item-sidebar" >
                    <Link className="text-lg" to="">
                        <IoMdChatboxes className="text-3xl" />
                    </Link>
                </div>
                <div className="item-sidebar">
                    <Link className="text-lg" to="">
                        <MdOutlineShoppingCart className="text-3xl" />
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Sidebar