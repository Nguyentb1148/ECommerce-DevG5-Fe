import { useState, useEffect, useRef } from "react";
import { RiUploadCloudFill } from "react-icons/ri";
import { X } from "lucide-react";
import { CiCircleQuestion } from "react-icons/ci";

const EditProductPage = () => {
    const [productName, setProductName] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedBrand, setSelectedBrand] = useState("");
    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);
    const [images, setImages] = useState([]);
    const [mainImage, setMainImage] = useState(null);
    const [description, setDescription] = useState("");
    const [isVariantModalOpen, setIsVariantModalOpen] = useState(false);
    const [variantData, setVariantData] = useState({ attributes: [], processedVariants: [] });
    const [errors, setErrors] = useState({});
    const fileInputRef = useRef(null);
    const [invalidImageIndexes, setInvalidImageIndexes] = useState([]);
    const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);

    useEffect(() => {
        // Fetch the product data and populate the state
    }, []);

    const handleUpload = () => {
        // Implement file upload logic here
    };

    const handleFileChange = (event) => {
        // Handle file changes and validate here
    };

    const handleThumbnailClick = (image) => {
        // Handle thumbnail click to set the main image
    };

    const openHelpModal = () => {
        // Open help modal logic
    };

    const closeHelpModal = () => {
        // Close help modal logic
    };

    const handleHelpIconClick = () => {
        // Handle help icon click to show help modal
    };

    const handleImageDelete = (index) => {
        // Handle image delete logic
    };

    const validate = () => {
        // Validate the form fields
        return true; // Return true if valid, false if not
    };

    const handleSaveProduct = async () => {
        // Save the updated product data here
    };

    const handleAddProduct = () => {
        // Logic to reset the form for adding a new product
    };

    return (
        <div className="p-4 bg-gray-100 min-h-screen">
            <h2 className="text-2xl font-semibold mb-2 text-gray-800">Edit Product</h2>
            <div className="grid grid-cols-5 gap-8">
                <div className="col-span-2 flex flex-col space-y-6">
                    <div className="p-2 bg-white rounded-lg shadow-md space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Product Name<span className="text-red-500 ml-1">*</span>
                            </label>
                            <input
                                type="text"
                                value={productName}
                                onChange={(e) => setProductName(e.target.value)}
                                className={`w-full border ${errors.productName ? "border-red-500" : "border-gray-300"} rounded-md p-2 focus:ring-blue-500 focus:border-blue-500`}
                            />
                            {errors.productName && <p className="text-red-500 text-sm">{errors.productName}</p>}
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Category<span className="text-red-500 ml-1">*</span>
                                </label>
                                <select
                                    value={selectedCategory}
                                    onChange={(e) => setSelectedCategory(e.target.value)}
                                    className={`w-full border ${errors.selectedCategory ? "border-red-500" : "border-gray-300"} rounded-md p-2 focus:ring-blue-500 focus:border-blue-500`}
                                >
                                    <option value="">Select Category</option>
                                    {categories.map((category) => (
                                        <option key={category._id} value={category._id}>
                                            {category.name}
                                        </option>
                                    ))}
                                </select>
                                {errors.selectedCategory &&
                                    <p className="text-red-500 text-sm">{errors.selectedCategory}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Brand<span className="text-red-500 ml-1">*</span>
                                </label>
                                <select
                                    value={selectedBrand}
                                    onChange={(e) => setSelectedBrand(e.target.value)}
                                    className={`w-full border ${errors.selectedBrand ? "border-red-500" : "border-gray-300"} rounded-md p-2 focus:ring-blue-500 focus:border-blue-500`}
                                >
                                    <option value="">Select Brand</option>
                                    {brands.map((brand) => (
                                        <option key={brand._id} value={brand._id}>
                                            {brand.name}
                                        </option>
                                    ))}
                                </select>
                                {errors.selectedBrand && <p className="text-red-500 text-sm">{errors.selectedBrand}</p>}
                            </div>
                        </div>
                    </div>
                    <div className="p-2 bg-white rounded-lg shadow-md flex space-x-4">
                        {/* Main image on the left */}
                        <div className="w-full">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Images<span className="text-red-500 ml-1">*</span>
                            </label>
                            <div
                                className="w-96 h-96 border border-gray-300 rounded-md flex items-center justify-center bg-gray-50">
                                {mainImage ? (
                                    <img
                                        src={mainImage}
                                        alt="Main"
                                        className="w-full h-full object-contain"
                                    />
                                ) : (
                                    <p className="text-gray-500">No image selected</p>
                                )}
                            </div>
                            {errors.images && <p className="text-red-500 text-sm">{errors.images}</p>}
                        </div>

                        {/* List of images on the right */}
                        <div className="flex flex-col space-y-4 w-64 max-h-96 overflow-y-auto">
                            {/* List of images */}
                            {images.map((image, index) => {
                                return (
                                    <div key={index} className="flex items-center space-x-2">
                                        <div className="relative">
                                            <img
                                                src={URL.createObjectURL(image.file)}
                                                alt="Thumbnail"
                                                className="w-full h-28 border border-gray-300 rounded-md cursor-pointer object-contain"
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
                            })}
                            <button
                                className="w-full border border-gray-300 rounded-md p-2 flex items-center justify-center bg-blue-50 hover:bg-blue-100"
                                onClick={handleUpload}
                            >
                                <RiUploadCloudFill className="mr-2 text-4xl"/>
                            </button>
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleFileChange}
                                className="hidden"
                                multiple
                            />
                        </div>
                    </div>
                </div>
                <div className="col-span-3 flex flex-col space-y-6">
                    <div
                        className="p-2 bg-white rounded-lg shadow-md flex-grow"
                        style={{
                            height: "calc(2 * (14rem + 1rem))", // Ensures height matches Part 1 + Part 2
                            display: "flex", // Ensures the textarea stretches to fit
                            flexDirection: "column",
                        }}
                    >
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Description<span className="text-red-500 ml-1">*</span>
                        </label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className={`w-full flex-grow border ${errors.description ? "border-red-500" : "border-gray-300"} rounded-md p-2 focus:ring-blue-500 focus:border-blue-500 resize-none`}
                        ></textarea>
                        {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
                    </div>

                    <button
                        onClick={() => setIsVariantModalOpen(true)}
                        className="bg-green-500 text-white py-1 px-1 rounded-md hover:bg-green-600"
                    >
                        Add Attributes and Variants
                    </button>
                </div>
            </div>
            <button
                onClick={handleSaveProduct}
                className="mt-4 bg-blue-600 text-white py-1 px-2 rounded-md hover:bg-blue-700"
            >
                Save Product
            </button>
            {isVariantModalOpen && (
                <div
                    className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
                    onClick={() => setIsVariantModalOpen(false)}
                >
                    <div className="bg-white p-4 rounded-lg w-96" onClick={(e) => e.stopPropagation()}>
                        <h3 className="text-xl font-semibold">Variants</h3>
                        {/* Add your variant input fields here */}
                    </div>
                </div>
            )}
        </div>
    );
};

export default EditProductPage;
