import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FcCheckmark } from "react-icons/fc"; // Import icon

const ChangePassword = () => {
  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false); // State để theo dõi trạng thái thành công
  const navigate = useNavigate();

  // Hàm kiểm tra các điều kiện mật khẩu
  const validatePasswords = () => {
    const newErrors = {};

    if (!passwords.currentPassword) {
      newErrors.currentPassword = "Current password is required.";
    }

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;
    if (!passwords.newPassword) {
      newErrors.newPassword = "New password is required.";
    } else if (!passwordRegex.test(passwords.newPassword)) {
      newErrors.newPassword = "New password must be at least 8 characters long, contain at least one letter, one number, and one special character.";
    }

    if (passwords.newPassword !== passwords.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Hàm thay đổi giá trị mật khẩu
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPasswords((prev) => ({ ...prev, [name]: value }));
  };

  // Hàm xử lý gửi form
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validatePasswords()) {
      // Thực hiện logic thay đổi mật khẩu ở đây
      setSuccess(true); // Cập nhật trạng thái thành công
      setTimeout(() => {
        setSuccess(false); // Tắt thông báo sau 3 giây
      }, 3000);

      setPasswords({ currentPassword: "", newPassword: "", confirmPassword: "" });
      setErrors({});
    }
  };

  // Hàm điều hướng đến các trang khác
  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white h-screen">
        <div className="p-6">
          <h2 className="text-2xl font-semibold mb-6">Dashboard</h2>
          <ul>
            <li className="mb-4">
              <button onClick={() => handleNavigation("/profile")} className="hover:text-gray-300">
                Profile
              </button>
            </li>
            <li className="mb-4">
              <button onClick={() => handleNavigation("/change-password")} className="hover:text-gray-300">
                Change Password
              </button>
            </li>
            <li className="mb-4">
              <button onClick={() => handleNavigation("/product-history")} className="hover:text-gray-300">
                Product History
              </button>
            </li>
            <li className="mb-4">
              <button onClick={() => handleNavigation("/voucher")} className="hover:text-gray-300">
                Voucher
              </button>
            </li>
            <li>
              <button onClick={() => handleNavigation("/logout")} className="hover:text-gray-300">
                Log Out
              </button>
            </li>
          </ul>
        </div>
      </div>

      {/* Change Password Content */}
      <div className="flex-1 p-6">
        <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-6 relative">
          {/* Thông báo thành công */}
          {success && (
            <div className="absolute top-4 right-4 bg-green-100 text-green-800 px-4 py-3 rounded-md flex items-center shadow-lg animate-fade-in">
              <FcCheckmark className="text-2xl mr-2" />
              <span>Password changed successfully!</span>
            </div>
          )}

          <h1 className="text-2xl font-semibold mb-6">Change Password</h1>
          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Current Password */}
            <div>
              <label className="block text-gray-700 text-lg">Current Password</label>
              <input
                type="password"
                name="currentPassword"
                value={passwords.currentPassword}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-md border ${
                  errors.currentPassword ? "border-red-500" : "border-gray-300"
                } text-lg`}
              />
              {errors.currentPassword && <p className="text-red-500 text-sm">{errors.currentPassword}</p>}
            </div>

            {/* New Password */}
            <div>
              <label className="block text-gray-700 text-lg">New Password</label>
              <input
                type="password"
                name="newPassword"
                value={passwords.newPassword}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-md border ${
                  errors.newPassword ? "border-red-500" : "border-gray-300"
                } text-lg`}
              />
              {errors.newPassword && <p className="text-red-500 text-sm">{errors.newPassword}</p>}
            </div>

            {/* Confirm New Password */}
            <div>
              <label className="block text-gray-700 text-lg">Confirm New Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={passwords.confirmPassword}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-md border ${
                  errors.confirmPassword ? "border-red-500" : "border-gray-300"
                } text-lg`}
              />
              {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              >
                Change Password
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
