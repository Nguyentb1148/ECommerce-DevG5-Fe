import React, { useState } from "react";
import { uploadImage } from "../../configs/Cloudinary.jsx";
import { createCategory } from "../../services/api/CategoryApi.jsx";
import { toast } from "react-toastify";

const AddCategory = ({ onClose, reFetchCategory, setReFetchCategory }) => {
  const [categoryName, setCategoryName] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      const preview = URL.createObjectURL(file);
      setPreviewUrl(preview);
    }
  };

  const handleAddCategory = async () => {
    if (!categoryName.trim()) {
      toast.error("Category name cannot be empty");
      return;
    }

    if (!selectedFile) {
      toast.warning("Please upload an image for the category");
      return;
    }

    setLoading(true);
    setErrorMessage("");

    try {
      // Step 1: Upload image to Cloudinary
      const uploadedImage = await uploadImage(
        selectedFile,
        "Category",
        categoryName
      );
      const { secure_url, public_id } = uploadedImage;

      // Step 2: Prepare category data
      const categoryData = {
        name: categoryName,
        imageUrl: secure_url,
        publicId: public_id,
      };

      // Step 3: Send category data to backend API (Create category)
      await createCategory(categoryData);

      // On success, reset form and close modal
      setCategoryName("");
      setSelectedFile(null);
      setPreviewUrl("");
      toast.success("Category created successfully!");
      onClose();

      setReFetchCategory(!reFetchCategory);

      // navigate("/admin/category");
      // if (navigate) ;
      // window.location.reload();
    } catch (error) {
      console.error("Error creating category:", error);
      setErrorMessage("An error occurred while creating the category.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-20 bg-black bg-opacity-30 flex items-center justify-center overflow-auto">
      <div className="bg-gray-800  rounded-lg shadow-md p-6 w-[400px]">
        <h2 className="text-xl font-bold mb-4 text-white">Add New Category</h2>

        {/* File Upload */}
        <div className="w-full h-full py-6 bg-gray-700 rounded-2xl border border-gray-600 gap-3 grid border-dashed place-items-center">
          {previewUrl ? (
            <img
              src={previewUrl}
              alt="Preview"
              className="w-72 h-72 object-center rounded-md"
            />
          ) : (
            <div className="grid gap-1">
              <svg
                className="mx-auto"
                width="40"
                height="40"
                viewBox="0 0 40 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M31.6497 10.6056L32.2476 10.0741L31.6497 10.6056ZM28.6559 7.23757L28.058 7.76907L28.058 7.76907L28.6559 7.23757Z"
                  fill="#4F46E5"
                />
              </svg>
              <h2 className="text-center text-gray-400 text-xs leading-4">
                PNG, JPG, or PDF, smaller than 15MB
              </h2>
            </div>
          )}
          <div className="grid gap-2">
            <h4 className="text-center text-gray-300 text-sm font-medium leading-snug">
              Drag and Drop your file here or
            </h4>
            <div className="flex items-center justify-center">
              <label>
                <input type="file" hidden onChange={handleFileChange} />
                <div className="flex w-28 h-9 px-2 flex-col bg-indigo-600 rounded-full shadow text-white text-xs font-semibold leading-4 items-center justify-center cursor-pointer focus:outline-none">
                  Choose File
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* Category Name */}
        <div>
          <h3 className="text-lg font-medium py-2 text-white">
            Name Category:
          </h3>
          <input
            type="text"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            placeholder="Enter category name"
            className="w-full border border-gray-600 bg-gray-700 text-white rounded p-2 mb-4"
          />
        </div>

        {/* Error Message */}
        {errorMessage && (
          <div className="text-red-500 text-sm mb-4">{errorMessage}</div>
        )}

        {/* Buttons */}
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
            disabled={loading}
          >
            {loading ? "Adding..." : "Add"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddCategory;
