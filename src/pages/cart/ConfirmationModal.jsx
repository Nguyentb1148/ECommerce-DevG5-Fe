import React from "react";

const ConfirmationModal = ({ isOpen, title, message, onConfirm, onCancel }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-gray-800 rounded-lg shadow-lg p-6 max-w-sm w-full text-white">
        <h2 className="text-xl font-bold mb-4">{title}</h2>
        <p className="text-gray-300 mb-6">{message}</p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onCancel}
            className="py-2 px-4 bg-gray-600 hover:bg-gray-500 rounded-lg"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="py-2 px-4 bg-red-600 hover:bg-red-500 rounded-lg"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
