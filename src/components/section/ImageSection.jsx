import React from 'react';
import { FiUpload } from 'react-icons/fi';

const ImageSection = ({
                          images,
                          setImages,
                          invalidImageIndexes,
                          setInvalidImageIndexes,
                          errors,
                          fileInputRef,
                          handleImageDelete,
                          handleFileChange,
                          handleThumbnailClick,
                      }) => {

    return (
        <div className="mb-3">
            <label className="block text-gray-400 text-sm font-bold mb-2">
                Product Image <span className="text-red-500 ml-1">*</span>
            </label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 bg-gray-700 rounded-md">
                <div className="space-y-1 text-center">
                    {/* Display uploaded images */}
                    {images.length > 0 && typeof images[0] === 'string' ? (
                        <div className="grid grid-cols-3 gap-4">
                            {images.map((image, index) => (
                                <div key={index}>
                                    <div className="relative">
                                        <img
                                            src={image}
                                            alt="Product"
                                            className={`w-20 h-20 md:w-28 md:h-28 border border-gray-300 rounded-md cursor-pointer object-cover ${
                                                invalidImageIndexes.includes(index) ? 'border-red-500' : ''
                                            }`}
                                            onClick={() => handleThumbnailClick(image)}
                                        />
                                        <button
                                            onClick={() => handleImageDelete(index)}
                                            className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs"
                                        >
                                            ×
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        // Upload section when no images are available
                        <div className="text-center text-gray-300">
                            <input
                                type="file"
                                ref={fileInputRef}
                                multiple
                                id="image"
                                name="image"
                                accept="image/*"
                                onChange={handleFileChange}
                                className="sr-only"
                            />
                            <label htmlFor="image" className="cursor-pointer w-10 h-10 py-2">
                                <FiUpload className="mx-auto h-9 w-9 text-gray-300 hover:scale-105 duration-300" />
                            </label>
                            <p>Upload a file or drag and drop under 2MB</p>
                        </div>
                    )}
                </div>
            </div>

            {errors.image && <p className="text-red-500 text-xs mt-1">{errors.image}</p>}
        </div>
    );
};

export default ImageSection;
