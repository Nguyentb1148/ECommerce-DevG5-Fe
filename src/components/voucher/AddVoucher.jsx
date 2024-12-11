import React, { useState } from "react";

const AddVoucher = ({ onClose, onAddVoucher }) => {
  const [voucherData, setVoucherData] = useState({
    code: "",
    startDate: "",
    endDate: "",
    minCartPrice: "",
    discount: "",
    description: "",
  });

  const [errors, setErrors] = useState({});
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setVoucherData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!voucherData.code.trim()) newErrors.code = "Code is required.";
    if (!voucherData.startDate) newErrors.startDate = "Start date is required.";
    if (!voucherData.endDate) newErrors.endDate = "End date is required.";
    else if (new Date(voucherData.endDate) <= new Date(voucherData.startDate)) {
      newErrors.endDate = "End date must be after start date.";
    }
    if (!voucherData.minCartPrice || parseFloat(voucherData.minCartPrice) <= 0) {
      newErrors.minCartPrice = "Minimum price must be greater than 0.";
    }
    if (!voucherData.discount || parseFloat(voucherData.discount) <= 0) {
      newErrors.discount = "Discount value must be greater than 0.";
    }
    if (!voucherData.description.trim()) newErrors.description = "Description is required.";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevents default form submission behavior
    console.log('Button clicked, handling form submission...');
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    console.log("Voucher data: ", voucherData);
    onAddVoucher(voucherData); // This should be called when the form is valid
  };

  return (
      <div className="fixed inset-0 z-20 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="bg-gray-800 rounded-lg shadow-md p-6 w-[500px]">
          <h2 className="text-xl font-bold mb-4 text-white">Add New Voucher</h2>
          {/* Code Voucher */}
          <div>
            <h3 className="text-base font-medium py-2 text-white">
              Code Voucher<span className="text-red-500 ml-1">*</span>
            </h3>
            <input
                type="text"
                name="code"
                value={voucherData.code}
                onChange={handleInputChange}
                placeholder="Enter code voucher"
                className="w-full border border-gray-600 bg-gray-700 text-white rounded p-2 mb-1"
            />
            {errors.code && <p className="text-red-500 text-xs mt-1">{errors.code}</p>}
          </div>
          {/* Start and End Date */}
          <div className="mb-2 flex justify-between">
            <div className="w-full pr-2">
              <h3 className="text-base font-medium py-2 text-white">
                Start date<span className="text-red-500 ml-1">*</span>
              </h3>
              <input
                  type="date"
                  name="startDate"
                  value={voucherData.startDate}
                  onChange={handleInputChange}
                  className="w-full border border-gray-600 bg-gray-700 text-white rounded p-2 mb-1"
              />
              {errors.startDate && <p className="text-red-500 text-xs mt-1">{errors.startDate}</p>}
            </div>
            <div className="w-full pl-2">
              <h3 className="text-lg font-medium py-2 text-white">
                End date<span className="text-red-500 ml-1">*</span>
              </h3>
              <input
                  type="date"
                  name="endDate"
                  value={voucherData.endDate}
                  onChange={handleInputChange}
                  className="w-full border border-gray-600 bg-gray-700 text-white rounded p-2 mb-1"
              />
              {errors.endDate && <p className="text-red-500 text-xs mt-1">{errors.endDate}</p>}
            </div>
          </div>
          {/* Minimum Cart Price */}
          <div className="mb-4">
            <h3 className="text-base font-medium py-2 text-white">
              Minimum price<span className="text-red-500 ml-1">*</span>
            </h3>
            <input
                type="number"
                name="minCartPrice"
                value={voucherData.minCartPrice}
                onChange={handleInputChange}
                className="w-full border border-gray-600 bg-gray-700 text-white rounded p-2 mb-1"
            />
            {errors.minCartPrice && <p className="text-red-500 text-xs mt-1">{errors.minCartPrice}</p>}
          </div>
          {/* Discount Value */}
          <div className="mb-4">
            <h3 className="text-base font-medium py-2 text-white">
              Discount Value(%)<span className="text-red-500 ml-1">*</span>
            </h3>
            <input
                type="number"
                name="discount"
                value={voucherData.discount}
                onChange={handleInputChange}
                className="w-full border border-gray-600 bg-gray-700 text-white rounded p-2 mb-1"
            />
            {errors.discount && <p className="text-red-500 text-xs mt-1">{errors.discount}</p>}
          </div>
          {/* Description */}
          <div className="mb-4">
            <h3 className="text-base font-medium py-2 text-white">
              Description<span className="text-red-500 ml-1">*</span>
            </h3>
            <input
                type="text"
                name="description"
                value={voucherData.description}
                onChange={handleInputChange}
                className="w-full border border-gray-600 bg-gray-700 text-white rounded p-2 mb-1"
            />
            {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
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
                onClick={handleSubmit} // Ensure this triggers handleSubmit
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
            >
              Add
            </button>
          </div>
        </div>
      </div>
  );
};

export default AddVoucher;
