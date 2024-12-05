import React from "react";
import { BiErrorCircle } from "react-icons/bi";

const ShippingInformation = ({ formData, handleInputChange, errors, city, district, ward }) => (
  <div className="bg-gray-800 p-6 rounded-lg shadow-md mb-6">
    <h2 className="text-2xl font-bold mb-4 text-white">Shipping Information</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-400">
          Full Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          className={`mt-1 block w-full px-4 py-2 bg-gray-700 text-white border ${errors.name ? "border-red-500" : "border-gray-600"} rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500`}
          placeholder="Enter your full name"
        />
        {errors.name && <ErrorMessage message={errors.name} />}
      </div>
      <div>
        <label htmlFor="city" className="block text-sm font-medium text-gray-400">
          City
        </label>
        <select
          id="city"
          name="city"
          value={formData.city}
          onChange={handleInputChange}
          className={`mt-1 block w-full px-4 py-2 bg-gray-700 text-white border ${errors.city ? "border-red-500" : "border-gray-600"} rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500`}
        >
          <option value="">Select City</option>
          {city.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
        {errors.city && <ErrorMessage message={errors.city} />}
      </div>
      <div>
        <label htmlFor="district" className="block text-sm font-medium text-gray-400">
          District
        </label>
        <select
          id="district"
          name="district"
          value={formData.district}
          onChange={handleInputChange}
          className={`mt-1 block w-full px-4 py-2 bg-gray-700 text-white border ${errors.district ? "border-red-500" : "border-gray-600"} rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500`}
        >
          <option value="">Select District</option>
          {district.map((district) => (
            <option key={district} value={district}>
              {district}
            </option>
          ))}
        </select>
        {errors.district && <ErrorMessage message={errors.district} />}
      </div>
      <div>
        <label htmlFor="ward" className="block text-sm font-medium text-gray-400">
          Ward
        </label>
        <select
          id="ward"
          name="ward"
          value={formData.ward}
          onChange={handleInputChange}
          className={`mt-1 block w-full px-4 py-2 bg-gray-700 text-white border ${errors.ward ? "border-red-500" : "border-gray-600"} rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500`}
        >
          <option value="">Select Ward</option>
          {ward.map((ward) => (
            <option key={ward} value={ward}>
              {ward}
            </option>
          ))}
        </select>
        {errors.ward && <ErrorMessage message={errors.ward} />}
      </div>
      <div className="md:col-span-2">
        <label htmlFor="address" className="block text-sm font-medium text-gray-400">
          Address
        </label>
        <input
          type="text"
          id="address"
          name="address"
          value={formData.address}
          onChange={handleInputChange}
          className={`mt-1 block w-full px-4 py-2 bg-gray-700 text-white border ${errors.address ? "border-red-500" : "border-gray-600"} rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500`}
          placeholder="Enter your address"
        />
        {errors.address && <ErrorMessage message={errors.address} />}
      </div>
    </div>
  </div>
);

const ErrorMessage = ({ message }) => (
  <p className="text-red-500 text-sm mt-1 flex items-center">
    <BiErrorCircle className="mr-1" /> {message}
  </p>
);

export default ShippingInformation;
