import React from "react";
import {
  FaBan,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaBriefcase,
  FaVenusMars,
  FaCalendarAlt,
  FaCheckCircle,
  FaUserShield,
} from "react-icons/fa";
import { FaX } from "react-icons/fa6";

const DetailModal = ({ request, onClose }) => {
  const data= request.additionalData;
  if (!request) return null;

  return (
      <div className="fixed inset-0 z-20 w-full bg-opacity-50 bg-gray-900 flex items-center justify-center p-4 overflow-auto">
        <div className="bg-gray-800 rounded-2xl shadow-2xl p-8 w-[50%] mx-auto space-y-8">
          <div className="flex flex-col items-center space-y-4">
            <div className="relative">
              <img
                  src={data.imageUrl}
                  className="w-32 h-32 rounded-full object-cover border-4 border-blue-500 shadow-xl transition-transform hover:scale-105"
              />
              <button
                  onClick={onClose}
                  className="absolute top-[0.5rem] right-[-17.5rem] text-gray-400 hover:text-gray-200"
              >
                <FaX />
              </button>
            </div>
            <h1 className="text-3xl font-bold text-white tracking-wide">
              {data.fullName}
            </h1>
          </div>

          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Displaying all user details */}
              <DetailItem
                  icon={<FaEnvelope />}
                  label="Email"
                  value={data.email}
              />
              <DetailItem
                  icon={<FaVenusMars />}
                  label="Gender"
                  value={data.gender}
              />
              <DetailItem
                  icon={<FaPhone />}
                  label="Phone"
                  value={data.phone}
              />
              <DetailItem
                  icon={<FaBriefcase />}
                  label="Role"
                  value={data.role}
              />
              <DetailItem
                  icon={<FaMapMarkerAlt />}
                  label="Address"
                  value={data.address}
              />
              <DetailItem
                  icon={<FaCalendarAlt />}
                  label="Date of Birth"
                  value={new Date(data.dateOfBirth).toLocaleDateString()}
              />
              <DetailItem
                  icon={<FaCheckCircle />}
                  label="Confirmed"
                  value={data.isConfirmed ? "True" : "False"}
              />
              <DetailItem
                  icon={<FaBan />}
                  label="Banned"
                  value={data.isBanned ? "Yes" : "No"}
              />
            </div>
          </div>
        </div>
      </div>
  );
};

const DetailItem = ({ icon, label, value }) => (
    <div className="flex items-center space-x-4 group p-4 rounded-lg hover:bg-gray-700 transition-colors">
      <div className="p-3 bg-blue-500 rounded-lg group-hover:bg-blue-600">
        <span className="text-white text-xl">{icon}</span>
      </div>
      <div>
        <p className="text-gray-400 text-sm">{label}</p>
        <p className="text-white font-medium">{value}</p>
      </div>
    </div>
);

export default DetailModal;
