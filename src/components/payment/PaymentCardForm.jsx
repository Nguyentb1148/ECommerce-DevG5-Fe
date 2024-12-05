import React from "react";
import { FaCcVisa } from "react-icons/fa";
import { BiErrorCircle } from "react-icons/bi";
import { CgCalendarDates } from "react-icons/cg";
import { IoBarcode } from "react-icons/io5";

const PaymentCardForm = ({ formData, handleInputChange, errors }) => (
  <div className="bg-gray-800 p-6 rounded-lg shadow-md mb-6">
    <h2 className="text-2xl font-bold mb-4 text-white">Card Details</h2>
    <div className="space-y-4">
      <InputField
        id="cardNumber"
        label="Card Number"
        icon={<FaCcVisa className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />}
        value={formData.cardNumber}
        onChange={handleInputChange}
        error={errors.cardNumber}
        placeholder="1234 5678 9012 3456"
      />
      <div className="grid grid-cols-2 gap-4">
        <InputField
          id="expiryDate"
          label="Expiry Date"
          icon={<CgCalendarDates className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />}
          value={formData.expiryDate}
          onChange={handleInputChange}
          error={errors.expiryDate}
          placeholder="MM/YY"
        />
        <InputField
          id="cvv"
          label="CVV"
          icon={<IoBarcode className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />}
          value={formData.cvv}
          onChange={handleInputChange}
          error={errors.cvv}
          placeholder="123"
        />
      </div>
    </div>
  </div>
);

const InputField = ({ id, label, value, onChange, error, placeholder, icon }) => (
  <div>
    <label htmlFor={id} className="block text-sm font-medium text-gray-400">
      {label}
    </label>
    <div className="relative">
      {icon}
      <input
        type="text"
        id={id}
        name={id}
        value={value}
        onChange={onChange}
        className={`mt-1 block w-full px-8 py-2 bg-gray-700 text-white border ${
          error ? "border-red-500" : "border-gray-600"
        } rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500`}
        placeholder={placeholder}
        aria-label={label}
      />
    </div>
    {error && (
      <p className="text-red-500 text-sm mt-1 flex items-center">
        <BiErrorCircle className="mr-1" /> {error}
      </p>
    )}
  </div>
);

export default PaymentCardForm;
