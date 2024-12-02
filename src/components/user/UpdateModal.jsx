import React, { useState } from "react";
import axios from "axios";

const UpdateModal = ({ user, onClose, onUpdate }) => {
  const [role, setRole] = useState(user?.role || "");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `/api/users/${user.id}`,
        { role },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      alert(`User role updated to ${role}`);
      onUpdate(); // Refresh data
      onClose(); // Close modal
    } catch (error) {
      console.error(
        "Error updating user role:",
        error.response?.data || error.message
      );
    }
  };

  if (!user) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white rounded-lg p-6 w-96">
        <h2 className="text-2xl font-bold mb-4">Update User Role</h2>
        <form onSubmit={handleSubmit}>
          <label className="block mb-2">
            Role:
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="border rounded p-2 w-full"
            >
              <option value="admin">Admin</option>
              <option value="user">User</option>
              <option value="store">Store</option>
            </select>
          </label>
          <div className="flex justify-end mt-4">
            <button
              type="button"
              className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateModal;
