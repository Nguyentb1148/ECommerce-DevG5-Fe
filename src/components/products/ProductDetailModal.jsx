// src/components/products/ProductDetailModal.jsx

import React from "react";

const ProductDetailModal = ({ product, onClose }) => {
  if (!product) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-lg shadow-lg p-6 w-full sm:w-3/4 lg:w-2/3 xl:w-1/2 max-h-[90%] overflow-auto">
        <h2 className="text-2xl font-bold mb-4 text-white">Product Details</h2>
        <div className="text-white">
          <p><strong>Name:</strong> {product.name}</p>
          <p><strong>Category:</strong> {product.categoryId.name}</p>
          <p><strong>Price:</strong> ${product.price}</p>
          <p><strong>Status:</strong> {product.verify.status}</p>
          <p><strong>Description:</strong> {product.description}</p>
          {/* Add more product details as needed */}
        </div>
        <div className="mt-6 flex justify-end gap-2">
          <button
            onClick={onClose}
            className="bg-gray-600 text-white px-4 py-2 rounded"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailModal;