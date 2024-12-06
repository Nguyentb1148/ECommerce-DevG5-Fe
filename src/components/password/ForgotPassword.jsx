import React from "react";
import { FaEnvelope } from "react-icons/fa";
const ForgotPassword = ({ formData, errors, handleInputChange }) => {
  return (
    <div className="space-y-4">
      <div>
        <label
          className="block text-sm font-medium text-gray-300"
          htmlFor="email"
        >
          Email
        </label>
        <div className="mt-1 relative flex items-center">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
            <FaEnvelope className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="email"
            id="email"
            name="email"
            autocomplete="off"
            value={formData.email}
            onChange={handleInputChange}
            className={`pl-10 w-full px-4 py-2 bg-opacity-20 bg-gray-700 text-white border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
              errors.email ? "border-red-500" : ""
            }`}
            placeholder="Enter your email"
            required
          />
        </div>
        {errors.email && (
          <p className="mt-1 text-sm text-red-500">{errors.email}</p>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
