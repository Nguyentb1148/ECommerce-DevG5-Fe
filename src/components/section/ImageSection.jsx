import React from 'react';
import { FiUpload } from "react-icons/fi";

const ImageSection = ({
                          images,
                          setImages,
                          invalidImageIndexes,
                          setInvalidImageIndexes,
                          errors,
                          fileInputRef,
                          handleImageDelete,
                          handleFileChange
                      }) => {

    // Helper function to check if an image is a URL (Blob or HTTP)
    const isUrl = (image) => typeof image === 'string' && (image.startsWith('http') || image.startsWith('blob'));

    return (
        <div className="mb-3">
            <label className="block text-gray-400 text-sm font-bold mb-2">
                Product Image <span className="text-red-500 ml-1">*</span>
            </label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 bg-gray-700 rounded-md">
                <div className="space-y-1 text-center">
                    {/* Check if images are available and display accordingly */}
                    {images.length === 0 ? (
                        <p className="text-gray-300">No images uploaded yet. Upload a file or drag and drop.</p>
                    ) : (
                        <div className="grid grid-cols-3 gap-4">
                            {/* List of images */}
                            {images.map((image, index) => {
                                // If image is a URL (Blob or HTTP URL), display it as an image
                                if (isUrl(image)) {
                                    return (
                                        <div key={index}>
                                            <div className="relative">
                                                <img
                                                    src={image} // Directly use the Blob URL or HTTP URL
                                                    alt="Thumbnail"
                                                    className="w-20 h-20 md:w-28 md:h-28 border border-gray-300 rounded-md cursor-pointer object-cover"
                                                />
                                                <button
                                                    onClick={() => handleImageDelete(index)}
                                                    className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs"
                                                >
                                                    ×
                                                </button>
                                            </div>
                                        </div>
                                    );
                                }

                                // If the image is a file object, display its thumbnail and info
                                if (image.file) {
                                    // Calculate image size in MB (rounded to 2 decimal places)
                                    const imageSize = (image.file.size / 1048576).toFixed(2); // Size in MB

                                    return (
                                        <div key={index}>
                                            <div className="relative">
                                                <img
                                                    src={URL.createObjectURL(image.file)} // Convert the file object to an object URL
                                                    alt="Thumbnail"
                                                    className="w-20 h-20 md:w-28 md:h-28 border border-gray-300 rounded-md cursor-pointer object-cover"
                                                />
                                                <button
                                                    onClick={() => handleImageDelete(index)}
                                                    className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs"
                                                >
                                                    ×
                                                </button>
                                            </div>
                                            <span className="text-sm text-gray-500">
                                                {imageSize} MB{" "}
                                                {image.isLarge && (
                                                    <span className="text-red-500">(Too large)</span>
                                                )}
                                            </span>
                                        </div>
                                    );
                                }

                                return null; // If neither URL nor file, do nothing
                            })}
                        </div>
                    )}

                    {/* Input for uploading new images */}
                    <input
                        type="file"
                        ref={fileInputRef}
                        multiple
                        id="image"
                        name="image"
                        accept="image/*"
                        onChange={handleFileChange} // Use the passed handleFileChange function
                        className="sr-only"
                    />
                    <label
                        htmlFor="image"
                        className="cursor-pointer w-10 h-10 py-2 "
                    >
                        <FiUpload className="mx-auto h-9 w-9 text-gray-300 hover:scale-105 duration-300" />
                    </label>
                    <p className="text-gray-300">Upload a file or drag and drop under 2MB</p>
                </div>
            </div>

            {/* Display errors if any */}
            {errors.image && (
                <p className="text-red-500 text-xs mt-1">{errors.image}</p>
            )}
        </div>
    );
};

export default ImageSection;
