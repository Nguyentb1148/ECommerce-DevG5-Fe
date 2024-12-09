import React from "react";
import { FaBan, FaEnvelope, FaPhone, FaMapMarkerAlt, FaBriefcase, FaVenusMars } from "react-icons/fa";
import { FaX } from "react-icons/fa6";

const DetailModal = ({ user, onClose }) => {
  if (!user) return null;

  return (
    <div className="fixed inset-0 z-20 w-full bg-opacity-50 bg-gray-900 flex items-center justify-center p-4 overflow-auto">
      <div className="bg-gray-800 rounded-2xl shadow-2xl p-8 w-[50%] mx-auto space-y-8">
        <div className="flex flex-col items-center space-y-4">
          <div className="relative">
            <img
              src={user.imageUrl}
              className="w-32 h-32 rounded-full object-cover border-4 border-blue-500 shadow-xl transition-transform hover:scale-105"
            />
            <button onClick={onClose} className="absolute top-[0.5rem] right-[-17.5rem] text-gray-400 hover:text-gray-200">
              <FaX />
            </button>
          </div>
          <h1 className="text-3xl font-bold text-white tracking-wide">{user.fullName}</h1>
          <span className="px-4 py-1 bg-blue-500 text-white rounded-full text-sm font-semibold shadow-lg">
          </span>
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center space-x-4 group p-4 rounded-lg hover:bg-gray-700 transition-colors">
              <div className="p-3 bg-blue-500 rounded-lg group-hover:bg-blue-600">
                <FaEnvelope className="text-white text-xl" />
              </div>
              <div>
                <p className="text-gray-400 text-sm">Email</p>
                <p className="text-white font-medium">{user.email}</p>
              </div>
            </div>

            <div className="flex items-center space-x-4 group p-4 rounded-lg hover:bg-gray-700 transition-colors">
              <div className="p-3 bg-blue-500 rounded-lg group-hover:bg-blue-600">
                <FaVenusMars className="text-white text-xl" />
              </div>
              <div>
                <p className="text-gray-400 text-sm">Gender</p>
                <p className="text-white font-medium">{user.gender}</p>
              </div>
            </div>

            <div className="flex items-center space-x-4 group p-4 rounded-lg hover:bg-gray-700 transition-colors">
              <div className="p-3 bg-blue-500 rounded-lg group-hover:bg-blue-600">
                <FaPhone className="text-white text-xl" />
              </div>
              <div>
                <p className="text-gray-400 text-sm">Phone</p>
                <p className="text-white font-medium">{user.phone}</p>
              </div>
            </div>

            <div className="flex items-center space-x-4 group p-4 rounded-lg hover:bg-gray-700 transition-colors">
              <div className="p-3 bg-blue-500 rounded-lg group-hover:bg-blue-600">
                <FaBriefcase className="text-white text-xl" />
              </div>
              <div>
                <p className="text-gray-400 text-sm">Role</p>
                <p className="text-white font-medium">{user.role}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4 group p-4 rounded-lg hover:bg-gray-700 transition-colors">
              <div className="p-3 bg-blue-500 rounded-lg group-hover:bg-blue-600">
                <FaMapMarkerAlt className="text-white text-xl" />
              </div>
              <div>
                <p className="text-gray-400 text-sm">Address</p>
                <p className="text-white font-medium">{user.address}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4 group p-4 rounded-lg hover:bg-gray-700 transition-colors">
              <div className="p-3 bg-blue-500 rounded-lg group-hover:bg-blue-600">
                <FaBan className="text-white text-xl" />
              </div>
              <div>
                <p className="text-gray-400 text-sm">Banned</p>
                <p className="text-white font-medium">{user.isBanned ? "Yes" : "No"}</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default DetailModal;
