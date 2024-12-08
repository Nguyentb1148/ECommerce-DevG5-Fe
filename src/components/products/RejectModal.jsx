import React, { useState } from "react";

const RejectModal = ({ product, onClose, onReject }) => {
  const [feedback, setFeedback] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onReject(feedback);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-lg shadow-lg p-6 w-full sm:w-3/4 lg:w-2/3 xl:w-1/2 max-h-[90%] overflow-auto">
        <h2 className="text-2xl font-bold mb-4 text-white">Reject Product</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-300 mb-2">Feedback</label>
            <textarea
              className="w-full p-2 rounded bg-gray-700 text-gray-300"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              required
            />
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              className="bg-gray-600 text-white px-4 py-2 rounded"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Reject
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RejectModal;