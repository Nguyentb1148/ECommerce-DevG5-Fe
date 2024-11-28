import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { deleteImage, uploadImage } from "../../configs/Cloudinary.jsx";
import { updateCategory } from "../../services/api/CategoryApi.jsx";

const EditCategory = ({ onClose, category }) => {
    const [categoryName, setCategoryName] = useState(category.name);
    const [currentImageUrl, setCurrentImageUrl] = useState(category.imageUrl);
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(category.imageUrl);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const handleUpdateCategory = async () => {
        setLoading(true);
        setErrorMessage('');

        try {
            let updatedImageUrl = currentImageUrl;

            // Step 1: Delete old image and upload new one if a new image is provided
            if (selectedFile) {
                // Delete the old image
                const folderName = 'Category'; // The folder name used in Cloudinary
                const oldImagePublicId = currentImageUrl.split('/').pop().split('.')[0]; // Extract public ID from URL

                try {
                    await deleteImage(folderName, oldImagePublicId); // Call the deleteImage function
                    console.log('Old image deleted successfully.');
                } catch (deleteError) {
                    console.error('Failed to delete old image:', deleteError);
                    setErrorMessage('Failed to delete old image.');
                    return; // Stop execution if the old image cannot be deleted
                }

                // Upload new image
                const uploadedImage = await uploadImage(selectedFile, folderName, categoryName);
                updatedImageUrl = uploadedImage.secure_url; // Set new image URL
            }

            // Step 2: Prepare updated category data
            const updatedCategory = {
                name: categoryName,
                imageUrl: updatedImageUrl,
            };

            // Step 3: Update category via API
            await updateCategory(category._id, updatedCategory);

            alert('Category updated successfully!');
            onClose(); // Close the modal after successful update
            window.location.reload();

        } catch (error) {
            console.error('Error updating category:', error);
            setErrorMessage('Failed to update the category.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-20 bg-black bg-opacity-30 flex items-center justify-center">
            <div className="bg-gray-800 rounded-lg shadow-md p-6 w-[400px]">
                <h2 className="text-xl font-bold mb-4 text-white">Update Category</h2>
                <div className="w-full  bg-gray-700 rounded-2xl border border-gray-600">
                    {previewUrl && (
                        <img
                            src={previewUrl}
                            alt="Preview"
                            className="w-full h-40 object-cover rounded-md mb-4"
                        />
                    )}
                    <div className="grid gap-2 py-2">
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
                    <h3 className="text-lg font-medium py-2 text-white">Name Category:</h3>
                    <input
                        type="text"
                        value={categoryName}
                        onChange={(e) => setCategoryName(e.target.value)}
                        placeholder="Enter category name"
                        className="w-full border border-gray-600 bg-gray-700 text-white rounded p-2 mb-4"
                    />
                </div>

                <div className="flex justify-end">
                    <button
                        onClick={onClose}
                        className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded mr-2"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleUpdateCategory}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                        disabled={loading}
                    >
                        {loading ? "Updating..." : "Update"}
                    </button>
                </div>
                {errorMessage && <p className="text-red-500 mt-4">{errorMessage}</p>}
            </div>
        </div>
    );
};

EditCategory.propTypes = {
    onClose: PropTypes.func.isRequired,
    category: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        imageUrl: PropTypes.string,
        createdAt: PropTypes.string,
        updatedAt: PropTypes.string,
    }).isRequired,
};

export default EditCategory;
