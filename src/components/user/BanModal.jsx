import React from "react";
import axios from "axios";
import { BanUser } from "../../services/api/UserApi";

const BanModal = ({ user, onClose, onBan }) => {
  const handleBan = async () => {
    try {
      const credentials = {
        userId: user._id,
        isBanned: !user.isBanned, // Toggle the ban status
      };
      console.log(credentials);
      // Call the BanUser API
      await BanUser(credentials);

      alert(
        `User ${user.fullName} has been ${
          user.isBanned ? "unbanned" : "banned"
        }.`
      );
      onBan(); // Refresh data
      onClose(); // Close modal
    } catch (error) {
      console.error(
        "Error banning/unbanning user:",
        error.response?.data || error.message
      );
    }
  };

  if (!user) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white rounded-lg p-6 w-96">
        <h2 className="text-2xl font-bold mb-4">
          {user.isBanned ? "Unban User" : "Ban User"}
        </h2>
        <p>
          Are you sure you want to {user.isBanned ? "unban" : "ban"}{" "}
          <strong>{user.name}</strong>?
        </p>
        <div className="flex justify-end mt-4">
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className={`${
              user.isBanned ? "bg-green-500" : "bg-red-500"
            } text-white px-4 py-2 rounded`}
            onClick={handleBan}
          >
            {user.isBanned ? "Unban" : "Ban"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BanModal;
