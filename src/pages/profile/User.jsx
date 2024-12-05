import { useState } from "react";
import { CgProfile } from "react-icons/cg";
import { MdLogout } from "react-icons/md";
import { Link } from "react-router-dom";

const User = () => {
    const [dropdown, setDropdown] = useState(true);

    const logout = () => {
        localStorage.clear();
        window.location.href = "/";
    };

    return (
        <div>
            {/* Avatar with dropdown toggle */}
            <div className="avatar relative">
                <div className="w-10 h-10 rounded-full">
                    <img
                        src="https://i.pinimg.com/474x/4b/71/f8/4b71f8137985eaa992d17a315997791e.jpg"
                        onClick={() => setDropdown(!dropdown)}
                        className="cursor-pointer rounded-full"
                        alt="User Avatar"
                    />
                </div>

                {/* Dropdown Menu */}
                {!dropdown && (
                    <ul className="z-10 absolute top-11 left-[-50px] md:left-[-90px] lg:left-[-50px] rounded-md bg-white text-slate-600 dark:bg-gray-900 dark:text-gray-500 font-medium shadow-md">
                        <li className="py-2 px-6 flex items-center hover:bg-gray-700 hover:text-white duration-300">
                            <CgProfile className="h-6 w-6 mr-2" />
                            <Link to="/user/profile">Profile</Link>
                        </li>
                        <li
                            onClick={logout}
                            className="py-2 px-6 flex items-center hover:bg-gray-700 hover:text-white duration-300 cursor-pointer"
                        >
                            <MdLogout className="h-6 w-6 mr-2" />
                            Logout
                        </li>
                    </ul>
                )}
            </div>

        </div>
    );
};

export default User;
