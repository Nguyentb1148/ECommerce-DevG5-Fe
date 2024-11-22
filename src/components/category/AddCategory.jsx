import React, { useState } from "react";

const AddCategory = ({ onClose }) => {
  const [categoryName, setCategoryName] = useState("");

  const handleAddCategory = () => {
    if (categoryName.trim() === "") {
      alert("Category name cannot be empty");
      return;
    }
    alert(`Category "${categoryName}" has been added!`);
    onClose(); // Đóng modal sau khi thêm
  };

  return (
    <div className="fixed inset-0 z-20 bg-black bg-opacity-30 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-md p-6 w-[400px]">
        <h2 className="text-xl font-bold mb-4">Add New Category</h2>
        <input
          type="text"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          placeholder="Enter category name"
          className="w-full border border-gray-300 rounded p-2 mb-4"
        />
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded mr-2"
          >
            Cancel
          </button>
          <button
            onClick={handleAddCategory}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddCategory;
