import { useState } from "react";
import { MdOutlineHome, MdLogout } from "react-icons/md";
import { FaBoxArchive } from "react-icons/fa6";
import { IoPricetag } from "react-icons/io5";
import { FiShoppingBag } from "react-icons/fi";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Image from "../../assets/robot-assistant.png";

const SidebarSeller = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [activeItem, setActiveItem] = useState(""); // Trạng thái lưu mục active
    const navigate = useNavigate();

    const menuItems = [
        { name: "Dashboard", icon: <MdOutlineHome size={25} />, path: "" },
        { name: "Product", icon: <FaBoxArchive size={25} />, path: "product" },
        { name: "Voucher", icon: <IoPricetag size={25} />, path: "voucher" },
        { name: "Orders", icon: <FiShoppingBag  size={25} />, path: "orders" },
        { name: "Logout", icon: <MdLogout size={25} />, path: "logout" },
      ];

    const handleClick = (path) => {
        setActiveItem(path); 
        navigate(path); 
    };

    return (
        <div className="">
            <div className="flex md:hidden justify-around py-2 ">
                <div className="flex items-center">
                    <img src={Image} alt="" className="w-8 h-8" />
                </div>
                <div className="ml-2">
                    <ul className="flex">
                        {menuItems.map((item, index) => (
                            <li
                                key={index}
                                className={`flex items-center p-2 cursor-pointer rounded-lg mx-1 text-white ${activeItem === item.path ? "bg-gray-700" : "hover:bg-gray-700"
                                    }`}
                                onClick={() => handleClick(item.path)}
                            >
                                <div className="flex items-center justify-center w-7 ">{item.icon}</div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            {/* Sidebar */}
            <div
                className={`bg-gray-800 max-md:hidden h-screen ${isOpen ? "w-64" : "w-20"
                    }  transition-all duration-300 relative shadow-md`}
            >
                {/* Logo */}
                <div className="flex items-center p-4">
                    <img src={Image} alt="" className="w-10 h-10" />
                    {isOpen && (
                        <div className="ml-4">
                            <h1 className="text-xl font-semibold text-white">DevShop</h1>
                        </div>
                    )}
                </div>

                {/* Toggle Button */}
                <button
                    className="absolute top-5 -right-4 bg-gray-800 text-white rounded-full p-2 shadow-md"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <FaChevronLeft /> : <FaChevronRight />}
                </button>

                {/* Menu Items */}
                <ul className="mt-6 ">
                    {menuItems.map((item, index) => (
                        <li
                            key={index}
                            className={`flex items-center p-4 cursor-pointer text-white  ${activeItem === item.path ? "bg-gray-700" : "hover:bg-gray-700"
                                }`}
                            onClick={() => handleClick(item.path)}
                        >
                            <div className="flex items-center justify-center w-10">{item.icon}</div>
                            {isOpen && <span className="ml-4">{item.name}</span>}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default SidebarSeller;