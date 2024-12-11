// import { useState } from "react";
// import Navbar from "../../components/navbar/Navbar";
// import UpdateProfile from "../../components/profile/UpdateProfile";
// import ChangePassword from "../../components/password/ChangePassword";
// import OrderHistory from "../../components/orders/OrderHistory";
// import ListVoucher from "../../components/voucher/ListVoucher";
// import UserRoleUpdate from "../../components/user/UserRoleUpdate";

// const Profile = () => {
//   const [activeTab, setActiveTab] = useState("profile");
//   const renderActiveTab = () => {
//     switch (activeTab) {
//       case "profile":
//         return <UpdateProfile />;
//       case "password":
//         return <ChangePassword />;
//       case "orders":
//         return <OrderHistory />;
//       case "vouchers":
//         return <ListVoucher />;
//       case "changeRole":
//         return <UserRoleUpdate />;
//       default:
//         return <UpdateProfile />;
//     }
//   };

//   return (
//     <div>
//       <Navbar />
//       <div className="min-h-screen bg-gray-900 ">
//         <div className="max-w-6xl mx-auto">
//           <div className="bg-gray-800 rounded-xl shadow-lg">
//             {/* Tab Navigation */}
//             <div className="flex justify-center items-center py-4 ">
//               <div className="flex  border-b">
//                 <button
//                   onClick={() => setActiveTab("profile")}
//                   className={`pb-2 px-4 ${activeTab === "profile"
//                       ? "border-b-2 border-blue-500 text-blue-500"
//                       : "text-gray-500"
//                     }`}
//                 >
//                   Update Profile
//                 </button>
//                 <button
//                   onClick={() => setActiveTab("password")}
//                   className={`pb-2 px-4 ${activeTab === "password"
//                       ? "border-b-2 border-blue-500 text-blue-500"
//                       : "text-gray-500"
//                     }`}
//                 >
//                   Change Password
//                 </button>
//                 <button
//                   onClick={() => setActiveTab("orders")}
//                   className={`pb-2 px-4 ${activeTab === "orders"
//                       ? "border-b-2 border-blue-500 text-blue-500"
//                       : "text-gray-500"
//                     }`}
//                 >
//                   Order History
//                 </button>
//                 <button
//                   onClick={() => setActiveTab("vouchers")}
//                   className={`pb-2 px-4 ${activeTab === "vouchers"
//                       ? "border-b-2 border-blue-500 text-blue-500"
//                       : "text-gray-500"
//                     }`}
//                 >
//                   List Voucher
//                 </button>
//                 <button
//                   onClick={() => setActiveTab("changeRole")}
//                   className={`pb-2 px-4 ${activeTab === "changeRole"
//                       ? "border-b-2 border-blue-500 text-blue-500"
//                       : "text-gray-500"
//                     }`}
//                 >
//                   Update Role
//                 </button>
//               </div>
//             </div>

//             {/* Active Tab Content */}
//             <div>{renderActiveTab()}</div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Profile;

import { useState } from "react";
import { FaUser, FaLock, FaHistory, FaTag, FaUserShield } from "react-icons/fa"; // Import icons
import Navbar from "../../components/navbar/Navbar";
import UpdateProfile from "../../components/profile/UpdateProfile";
import ChangePassword from "../../components/password/ChangePassword";
import OrderHistory from "../../components/orders/OrderHistory";
import ListVoucher from "../../components/voucher/ListVoucher";
import UserRoleUpdate from "../../components/user/UserRoleUpdate";

const Profile = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [cartCount, setCartCount] = useState(0);

  const renderActiveTab = () => {
    switch (activeTab) {
      case "profile":
        return <UpdateProfile />;
      case "password":
        return <ChangePassword />;
      case "orders":
        return <OrderHistory />;
      case "vouchers":
        return <ListVoucher />;
      case "changeRole":
        return <UserRoleUpdate />;
      default:
        return <UpdateProfile />;
    }
  };

  return (
    <div>
        <Navbar cartCount={cartCount} />
        <div className="min-h-screen bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <div className="bg-gray-800 rounded-xl shadow-lg">
            {/* Tab Navigation */}
            <div className="flex justify-center items-center py-4">
              <div className="flex border-b">
                <button
                  onClick={() => setActiveTab("profile")}
                  className={`pb-2 px-4 ${activeTab === "profile"
                      ? "border-b-2 border-blue-500 text-blue-500"
                      : "text-gray-500"
                    }`}
                >
                  {/* Chữ trên màn hình lớn và icon trên màn hình nhỏ */}
                  <span className="hidden sm:inline">Update Profile</span>
                  <FaUser className="sm:hidden text-xl" />
                </button>
                <button
                  onClick={() => setActiveTab("password")}
                  className={`pb-2 px-4 ${activeTab === "password"
                      ? "border-b-2 border-blue-500 text-blue-500"
                      : "text-gray-500"
                    }`}
                >
                  <span className="hidden sm:inline">Change Password</span>
                  <FaLock className="sm:hidden text-xl" />
                </button>
                <button
                  onClick={() => setActiveTab("orders")}
                  className={`pb-2 px-4 ${activeTab === "orders"
                      ? "border-b-2 border-blue-500 text-blue-500"
                      : "text-gray-500"
                    }`}
                >
                  <span className="hidden sm:inline">Order History</span>
                  <FaHistory className="sm:hidden text-xl" />
                </button>
                <button
                  onClick={() => setActiveTab("vouchers")}
                  className={`pb-2 px-4 ${activeTab === "vouchers"
                      ? "border-b-2 border-blue-500 text-blue-500"
                      : "text-gray-500"
                    }`}
                >
                  <span className="hidden sm:inline">List Voucher</span>
                  <FaTag className="sm:hidden text-xl" />
                </button>
                <button
                  onClick={() => setActiveTab("changeRole")}
                  className={`pb-2 px-4 ${activeTab === "changeRole"
                      ? "border-b-2 border-blue-500 text-blue-500"
                      : "text-gray-500"
                    }`}
                >
                  <span className="hidden sm:inline">Update Role</span>
                  <FaUserShield className="sm:hidden text-xl" />
                </button>
              </div>
            </div>

            {/* Active Tab Content */}
            <div>{renderActiveTab()}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
