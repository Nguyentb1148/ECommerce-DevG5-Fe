import React, { useState } from "react";

const AddVoucher = ({ onClose }) => {
  const [voucherName, setVoucherName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [discountType, setDiscountType] = useState('Percentage');
  const [discountValue, setDiscountValue] = useState('');

  return (
    <div className="fixed inset-0 z-20 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-gray-800 rounded-lg shadow-md p-6 w-[500px]">
        <h2 className="text-xl font-bold mb-4 text-white">Add New Voucher</h2>
        {/* Name */}
        <div>
          <h3 className="text-base font-medium py-2 text-white">Name Voucher:</h3>
          <input
            type="text"
            value={voucherName}
            onChange={(e) => setVoucherName(e.target.value)}
            placeholder="Enter category name"
            className="w-full border border-gray-600 bg-gray-700 text-white rounded p-2 mb-4"
          />
        </div>
        <div className="mb-2 flex justify-between">
          <div className="w-full pr-2">
            <h3 className="text-base font-medium py-2 text-white">Start date:</h3>
            <input
              type="date"
              className="w-full border border-gray-600 bg-gray-700 text-white rounded p-2 mb-4"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              required
            />
          </div>
          <div className="w-full pl-2">
            <h3 className="text-lg font-medium py-2 text-white">End date:</h3>
            <input
              type="date"
              className="w-full border border-gray-600 bg-gray-700 text-white rounded p-2 mb-4"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="mb-4">
          <h3 className="text-base font-medium py-2 text-white">Discount Type:</h3>

          <select
            className="w-full border border-gray-600 bg-gray-700 text-white rounded p-2 mb-4"
            value={discountType}
            onChange={(e) => setDiscountType(e.target.value)}
          >
            <option value="Percentage">Percentage</option>
            <option value="Fixed">Fixed</option>
          </select>
        </div>
        <div className="mb-4">
          <h3 className="text-base font-medium py-2 text-white">Discount Value:</h3>
          <input
            type="number"
            className="w-full border border-gray-600 bg-gray-700 text-white rounded p-2 mb-4"
            value={discountValue}
            onChange={(e) => setDiscountValue(e.target.value)}
            required
          />
        </div>
        {/* Buttons */}
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded mr-2"
          >
            Cancel
          </button>
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  )
}

export default AddVoucher;