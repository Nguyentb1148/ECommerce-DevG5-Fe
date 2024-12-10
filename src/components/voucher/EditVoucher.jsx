import React, { useState, useEffect } from "react";

const EditVoucher = ({ onClose, onEditVoucher, selectedVoucher }) => {
  const [voucherData, setVoucherData] = useState({
    code: "",
    createdAt: "",
    validity: "",
    minCartPrice: "",
    discount: "",
    description: "",
  });

  useEffect(() => {
    // Cập nhật voucherData khi selectedVoucher thay đổi
    if (selectedVoucher) {
      setVoucherData({
        code: selectedVoucher.code || "",
        createdAt: selectedVoucher.createdAt || "",
        validity: selectedVoucher.validity || "",
        minCartPrice: selectedVoucher.minCartPrice || "",
        discount: selectedVoucher.discount || "",
        description: selectedVoucher.description || "",
      });
    }
  }, [selectedVoucher]);  // Thực hiện khi selectedVoucher thay đổi

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setVoucherData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !voucherData.code ||
      !voucherData.createdAt ||
      !voucherData.validity ||
      !voucherData.minCartPrice ||
      !voucherData.discount ||
      !voucherData.description
    ) {
      alert("Please fill all fields.");
      return;
    }

    if (!selectedVoucher || !selectedVoucher.id) {
      console.log(selectedVoucher);
      alert("Voucher data is missing.");
      return;
    }

    // Gọi hàm onEditVoucher từ props để xử lý dữ liệu cập nhật
    onEditVoucher(selectedVoucher.id, voucherData);
  };

  return (
    <div className="fixed inset-0 z-20 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-gray-800 rounded-lg shadow-md p-6 w-[500px]">
        <h2 className="text-xl font-bold mb-4 text-white">Update Voucher</h2>
        {/* Code Voucher */}
        <div>
          <h3 className="text-base font-medium py-2 text-white">Code Voucher:</h3>
          <input
            type="text"
            name="code"
            value={voucherData.code}
            onChange={handleInputChange}
            placeholder="Enter code voucher"
            className="w-full border border-gray-600 bg-gray-700 text-white rounded p-2 mb-4"
          />
        </div>
        {/* Start and End Date */}
        <div className="mb-2 flex justify-between">
          <div className="w-full pr-2">
            <h3 className="text-base font-medium py-2 text-white">Start date:</h3>
            <input
              type="date"
              name="createdAt"
              value={voucherData.createdAt}
              onChange={handleInputChange}
              className="w-full border border-gray-600 bg-gray-700 text-white rounded p-2 mb-4"
              required
            />
          </div>
          <div className="w-full pl-2">
            <h3 className="text-lg font-medium py-2 text-white">End date:</h3>
            <input
              type="date"
              name="validity"
              value={voucherData.validity}
              onChange={handleInputChange}
              className="w-full border border-gray-600 bg-gray-700 text-white rounded p-2 mb-4"
              required
            />
          </div>
        </div>
        {/* Minimum Cart Price */}
        <div className="mb-4">
          <h3 className="text-base font-medium py-2 text-white">Conditions apply:</h3>
          <input
            type="number"
            name="minCartPrice"
            value={voucherData.minCartPrice}
            onChange={handleInputChange}
            className="w-full border border-gray-600 bg-gray-700 text-white rounded p-2 mb-4"
            required
          />
        </div>
        {/* Discount Value */}
        <div className="mb-4">
          <h3 className="text-base font-medium py-2 text-white">Discount Value:</h3>
          <input
            type="number"
            name="discount"
            value={voucherData.discount}
            onChange={handleInputChange}
            className="w-full border border-gray-600 bg-gray-700 text-white rounded p-2 mb-4"
            required
          />
        </div>
        {/* Description */}
        <div className="mb-4">
          <h3 className="text-base font-medium py-2 text-white">Description:</h3>
          <input
            type="text"
            name="description"
            value={voucherData.description}
            onChange={handleInputChange}
            className="w-full border border-gray-600 bg-gray-700 text-white rounded p-2 mb-4"
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
            onClick={handleSubmit}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditVoucher;

