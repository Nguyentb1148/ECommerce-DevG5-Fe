import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [errors, setErrors] = useState({});
  const [user, setUser] = useState({
    fullName: "John Doe",
    email: "johndoe@example.com",
    dateOfBirth: "1990-01-01",
    phone: "1234567890",
    gender: "Male",
    address: "123 Main Street, City, Country",
    imageURL: null,
    role: "Admin",
  });

  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    if (user.fullName.trim().split(" ").length < 2) {
      newErrors.fullName = "Full name must have at least two words.";
    }
    if (!/^\d{10}$/.test(user.phone)) {
      newErrors.phone = "Phone number must be exactly 10 digits.";
    }
    const today = new Date();
    const birthDate = new Date(user.dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    if (age < 18) {
      newErrors.dateOfBirth = "You must be at least 18 years old.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    if (!validate()) return;
    setIsEditing(false);
    console.log("User details saved:", user);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUser((prev) => ({ ...prev, imageURL: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

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
              <button onClick={() => handleNavigation("/user/profile")} className="hover:text-gray-300">
                Profile
              </button>
            </li>
            <li className="mb-4">
              <button onClick={() => handleNavigation("/user/change-password")} className="hover:text-gray-300">
                Change Password
              </button>
            </li>
            <li className="mb-4">
              <button onClick={() => handleNavigation("/user/product-history")} className="hover:text-gray-300">
                Product History
              </button>
            </li>
            <li className="mb-4">
              <button onClick={() => handleNavigation("/user/voucher")} className="hover:text-gray-300">
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

      {/* Profile Content */}
      <div className="flex-1 p-6">
        <div className="max-w-5xl mx-auto bg-white shadow-md rounded-lg p-6">
          <h1 className="text-2xl font-semibold mb-6">Profile</h1>
          <div className="flex gap-12">
            {/* Profile Form */}
            <div className="flex-1">
              <form className="space-y-4">
                {/* Full Name */}
                <div>
                  <label className="block text-gray-700 text-lg">Full Name</label>
                  <input
                    type="text"
                    name="fullName"
                    value={user.fullName}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className={`w-full max-w-[800px] px-4 py-3 rounded-md border ${
                      errors.fullName
                        ? "border-red-500"
                        : isEditing
                        ? "border-gray-300"
                        : "border-transparent bg-gray-100"
                    } text-lg`}
                  />
                  {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName}</p>}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-gray-700 text-lg">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={user.email}
                    readOnly
                    className="w-full max-w-[800px] px-4 py-3 rounded-md border border-transparent bg-gray-100 text-lg"
                  />
                </div>

                {/* Date of Birth */}
                <div>
                  <label className="block text-gray-700 text-lg">Date of Birth</label>
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={user.dateOfBirth}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className={`w-full max-w-[800px] px-4 py-3 rounded-md border ${
                      errors.dateOfBirth
                        ? "border-red-500"
                        : isEditing
                        ? "border-gray-300"
                        : "border-transparent bg-gray-100"
                    } text-lg`}
                  />
                  {errors.dateOfBirth && <p className="text-red-500 text-sm">{errors.dateOfBirth}</p>}
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-gray-700 text-lg">Phone</label>
                  <input
                    type="text"
                    name="phone"
                    value={user.phone}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className={`w-full max-w-[800px] px-4 py-3 rounded-md border ${
                      errors.phone
                        ? "border-red-500"
                        : isEditing
                        ? "border-gray-300"
                        : "border-transparent bg-gray-100"
                    } text-lg`}
                  />
                  {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
                </div>

                {/* Gender */}
                <div>
                  <label className="block text-gray-700 text-lg">Gender</label>
                  <select
                    name="gender"
                    value={user.gender}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className={`w-full max-w-[800px] px-4 py-3 rounded-md border ${
                      isEditing ? "border-gray-300" : "border-transparent bg-gray-100"
                    } text-lg`}
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                {/* Address */}
                <div>
                  <label className="block text-gray-700 text-lg">Address</label>
                  <textarea
                    name="address"
                    value={user.address}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className={`w-full max-w-[800px] px-4 py-3 rounded-md border ${
                      isEditing ? "border-gray-300" : "border-transparent bg-gray-100"
                    } text-lg`}
                    rows="3"
                  />
                </div>

                {/* Role */}
                <div>
                  <label className="block text-gray-700 text-lg">Role</label>
                  <input
                    type="text"
                    name="role"
                    value={user.role}
                    readOnly
                    className="w-full max-w-[800px] px-4 py-3 rounded-md border border-transparent bg-gray-100 text-lg"
                  />
                </div>

                {/* Save or Edit button */}
                <div className="flex items-center gap-4">
                  {!isEditing ? (
                    <button
                      type="button"
                      onClick={() => setIsEditing(true)}
                      className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                    >
                      Edit
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={handleSave}
                      className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                    >
                      Save
                    </button>
                  )}
                </div>
              </form>
            </div>

            {/* Image Section */}
            <div className="flex flex-col items-center justify-start w-64">
              <div
                className="w-64 h-64 rounded-full overflow-hidden border-4 border-gray-300 bg-gray-200"
                style={{
                  backgroundImage: user.imageURL ? `url(${user.imageURL})` : "none",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                {!user.imageURL && <span className="text-gray-500 flex items-center justify-center h-full">No Image</span>}
              </div>
              {isEditing && (
                <div className="mt-4">
                  <input type="file" accept="image/*" onChange={handleImageUpload} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
