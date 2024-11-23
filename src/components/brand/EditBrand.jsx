import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { deleteImage, uploadImage } from "../../configs/Cloudinary.jsx";
import { updateBranch } from "../../services/api/BrandesApi.jsx";

const EditBranch = ({ onClose, branch }) => {
    const [branchName, setBranchName] = useState(branch.name);
    const [branchDescription, setBranchDescription] = useState(branch.description || '');
    const [currentImageUrl, setCurrentImageUrl] = useState(branch.imageUrl);
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(branch.imageUrl);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    // Set initial preview URL from the current image URL
    useEffect(() => {
        setPreviewUrl(branch.imageUrl);  // Ensure it updates if branch imageUrl changes
    }, [branch.imageUrl]);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const handleUpdateBranch = async () => {
        setLoading(true);
        setErrorMessage('');

        try {
            let updatedImageUrl = currentImageUrl;

            // Step 1: Delete old image and upload new one if a new image is provided
            if (selectedFile) {
                // Delete the old image
                const folderName = 'Brand'; // The folder name used in Cloudinary
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
                const uploadedImage = await uploadImage(selectedFile, folderName, branchName);
                updatedImageUrl = uploadedImage.secure_url; // Set new image URL
            }

            // Step 2: Prepare updated branch data
            const updatedBranch = {
                name: branchName,
                description: branchDescription,  // Include description in update
                imageUrl: updatedImageUrl,
            };

            // Step 3: Update branch via API
            await updateBranch(branch._id, updatedBranch);

            alert('Branch updated successfully!');
            onClose(); // Close the modal after successful update
            window.location.reload();

        } catch (error) {
            console.error('Error updating branch:', error);
            setErrorMessage('Failed to update the branch.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-20 bg-black bg-opacity-30 flex items-center justify-center">
            <div className="bg-white rounded-lg shadow-md p-6 w-[400px]">
                <h2 className="text-xl font-bold mb-4">Update Branch</h2>

                {/* Branch Name */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                        Branch Name
                    </label>
                    <input
                        type="text"
                        value={branchName}
                        onChange={(e) => setBranchName(e.target.value)}
                        placeholder="Enter branch name"
                        className="w-full border border-gray-300 rounded p-2"
                    />
                </div>

                {/* Branch Description */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                        Branch Description
                    </label>
                    <textarea
                        value={branchDescription}
                        onChange={(e) => setBranchDescription(e.target.value)}
                        placeholder="Enter branch description"
                        className="w-full border border-gray-300 rounded p-2"
                    />
                </div>

                {/* Image Preview and File Upload */}
                <div className="py-4">
                    {previewUrl && (
                        <img
                            src={previewUrl}
                            alt="Branch Preview"
                            className="w-full h-40 object-cover rounded-md mb-4"
                        />
                    )}
                    <input type="file" onChange={handleFileChange} />
                </div>

                {/* Error Message */}
                {errorMessage && <p className="text-red-500 mt-4">{errorMessage}</p>}

                {/* Buttons */}
                <div className="flex justify-end">
                    <button
                        onClick={onClose}
                        className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded mr-2"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleUpdateBranch}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                        disabled={loading}
                    >
                        {loading ? "Updating..." : "Update"}
                    </button>
                </div>
            </div>
        </div>
    );
};

EditBranch.propTypes = {
    onClose: PropTypes.func.isRequired,
    branch: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        description: PropTypes.string,
        imageUrl: PropTypes.string.isRequired,
        createdAt: PropTypes.string,
        updatedAt: PropTypes.string,
    }).isRequired,
};

export default EditBranch;
