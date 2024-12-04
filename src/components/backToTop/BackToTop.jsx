import React, { useEffect, useState } from 'react'
import { FaLevelUpAlt } from "react-icons/fa";

const BackToTop = () => {
    const [isVisible, setIsVisible] = useState(false);
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
        <div className="fixed bottom-10 right-5 z-50">
            <button
                onClick={btnToTop}
                className="p-[10px] z-60 bg-primary text-gray-100 rounded-full shadow-lg hover:bg-opacity-80 focus:outline-none"
            >
                <FaLevelUpAlt size={25} />
            </button>
        </div>
    )
}

export default BackToTop