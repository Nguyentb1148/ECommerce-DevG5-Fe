import { useState, useEffect, useRef, useLayoutEffect } from "react";
import { RiUploadCloudFill } from "react-icons/ri";
import { getProductById } from "../../services/api/ProductApi.jsx";
import { useParams } from "react-router-dom";
import { getCategories } from "../../services/api/CategoryApi.jsx";
import { getBrands } from "../../services/api/BrandsApi.jsx";
import VariantPage from "./VariantPage";
import {X} from "lucide-react";
import {CiCircleQuestion} from "react-icons/ci"; // Import your VariantPage component

const EditProductPage = () => {
    const [productName, setProductName] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedBrand, setSelectedBrand] = useState("");
    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);
    const [images, setImages] = useState([]);
    const [imageSizes, setImageSizes] = useState([]); // To store the sizes of each image
    const [mainImage, setMainImage] = useState(null);
    const [description, setDescription] = useState("");
    const [textareaHeight, setTextareaHeight] = useState(0); // State to store dynamic height of the textarea
    const [isVariantPageOpen, setIsVariantPageOpen] = useState(false); // State to control the visibility of VariantPage
    const fileInputRef = useRef(null);
    const { productId } = useParams();
    const [isHelpModalOpen, setIsHelpModalOpen] = useState(false); // State to control the help modal visibility

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const productData = await getProductById(productId);
                console.log(productData);

                // Set product details to state (if needed for other parts of your component)
                setProductName(productData.name);
                setDescription(productData.description);
                setSelectedCategory(productData.categoryId?._id);
                setSelectedBrand(productData.brandId?._id);
                setImages(productData.imageUrls);
                setMainImage(productData.imageUrls[0]);

                // Get the sizes of images from URLs (if needed)
                await getImageSizes(productData.imageUrls);

                // Save variants to localStorage so VariantPage can access it
                const savedVariants = productData.variants.map((variant) => ({
                    attributes: variant.attributes,
                    price: variant.price,
                    stockQuantity: variant.stockQuantity,
                }));

                localStorage.setItem('variants', JSON.stringify(savedVariants)); // Save variants to localStorage

            } catch (err) {
                console.error(err.message);
            }
        };

        fetchProduct();
    }, [productId]);
    // Fetch categories and brands
    useEffect(() => {
        const fetchData = async () => {
            try {
                const categoriesData = await getCategories();
                const brandsData = await getBrands();
                setCategories(categoriesData);
                setBrands(brandsData);
            } catch (err) {
                console.error("Failed to fetch categories or brands.");
            }
        };
        fetchData();
    }, []);
    const openHelpModal = () => {
        setIsHelpModalOpen(true);
    };

    const closeHelpModal = () => {
        setIsHelpModalOpen(false);
    };

    const handleHelpIconClick = () => {
        openHelpModal();  // Open the modal
    };

    // Function to get the size of an image from URL
    const getImageSizeFromUrl = async (url) => {
        try {
            const response = await fetch(url, { method: "HEAD" }); // Make a HEAD request to get only the headers
            const contentLength = response.headers.get("Content-Length");
            return contentLength ? parseInt(contentLength, 10) : null;
        } catch (error) {
            console.error("Error fetching image size:", error);
            return null;
        }
    };

    // Get sizes for existing images (from URLs)
    const getImageSizes = async (imageUrls) => {
        const sizes = [];
        for (const url of imageUrls) {
            const size = await getImageSizeFromUrl(url);
            sizes.push(size);
        }
        setImageSizes(sizes); // Update image sizes state
    };

    // Handle clicking on an image to set as the main image
    const handleImageClick = (image) => {
        setMainImage(image);
    };

    // Handle file upload and display image size
    const handleFileChange = (event) => {
        const files = event.target.files;
        if (files.length > 0) {
            const newImages = Array.from(files).map((file) => URL.createObjectURL(file)); // Create object URLs for images
            const newImageSizes = Array.from(files).map((file) => file.size); // Get the size of each image file (in bytes)
            setImages((prevImages) => [...prevImages, ...newImages]); // Add new images to existing ones
            setImageSizes((prevSizes) => [...prevSizes, ...newImageSizes]); // Add new image sizes
        }
    };

    // Handle image delete
    const handleImageDelete = (index) => {
        const updatedImages = images.filter((_, imgIndex) => imgIndex !== index); // Remove image by index
        const updatedSizes = imageSizes.filter((_, imgIndex) => imgIndex !== index); // Remove image size by index
        setImages(updatedImages); // Update state with remaining images
        setImageSizes(updatedSizes); // Update state with remaining image sizes
    };

    // Handle saving the product data
    const handleSaveProduct = () => {
        // Save logic goes here
    };

    // Toggle the visibility of VariantPage
    const handleVariantPageOpen = () => {
        setIsVariantPageOpen(true);
    };

    const handleVariantPageClose = () => {
        setIsVariantPageOpen(false);
    };

    // Calculate the height dynamically after the component is mounted
    useLayoutEffect(() => {
        const productNameHeight = document.getElementById("product-name").offsetHeight;
        const imagesHeight = document.getElementById("images-section").offsetHeight;
        setTextareaHeight(productNameHeight + imagesHeight); // Set textarea height to the sum of the name and images section height
    }, []);

    return (
        <div className="p-4 bg-gray-100 min-h-screen">
            <h2 className="text-2xl font-semibold mb-2 text-gray-800">Edit Product</h2>
            <div className="grid grid-cols-5 gap-8">
                <div className="col-span-2 flex flex-col space-y-6">
                    <div className="p-2 bg-white rounded-lg shadow-md space-y-4" id="product-name">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Product Name<span className="text-red-500 ml-1">*</span>
                            </label>
                            <input
                                type="text"
                                value={productName}
                                onChange={(e) => setProductName(e.target.value)}
                                className="w-full border border-gray-300 rounded-md p-2"
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Category<span className="text-red-500 ml-1">*</span>
                                </label>
                                <select
                                    value={selectedCategory}
                                    onChange={(e) => setSelectedCategory(e.target.value)}
                                    className="w-full border border-gray-300 rounded-md p-2"
                                >
                                    <option value="">Select Category</option>
                                    {categories.map((category) => (
                                        <option key={category._id} value={category._id}>
                                            {category.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Brand<span className="text-red-500 ml-1">*</span>
                                </label>
                                <select
                                    value={selectedBrand}
                                    onChange={(e) => setSelectedBrand(e.target.value)}
                                    className="w-full border border-gray-300 rounded-md p-2"
                                >
                                    <option value="">Select Brand</option>
                                    {brands.map((brand) => (
                                        <option key={brand._id} value={brand._id}>
                                            {brand.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="p-2 bg-white rounded-lg shadow-md flex space-x-4" id="images-section">
                        {/* Main image on the left */}
                        <div className="w-full">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Images<span className="text-red-500 ml-1">*</span>
                            </label>
                            <div className="w-96 h-96 border border-gray-300 rounded-md flex items-center justify-center bg-gray-50">
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
                        </div>

                        {/* List of images on the right */}
                        <div className="flex flex-col space-y-4 w-64 max-h-96 overflow-y-auto">
                            {images.map((image, index) => (
                                <div key={index} className="relative flex items-center space-x-2">
                                    <div className="relative">
                                        <img
                                            src={image}
                                            alt="Thumbnail"
                                            className="w-full h-28 border border-gray-300 rounded-md cursor-pointer object-contain"
                                            onClick={() => handleImageClick(image)} // Set the clicked image as the main image
                                        />
                                        {/* Delete button (×) */}
                                        <button
                                            onClick={() => handleImageDelete(index)}
                                            className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs"
                                        >
                                            ×
                                        </button>
                                        {/* Image size display */}
                                        <div className="absolute bottom-0 left-0 bg-gray-800 text-white text-xs px-2 py-1 rounded-tl-md">
                                            {imageSizes[index] ? `${(imageSizes[index] / 1024).toFixed(2)} KB` : "N/A"}
                                        </div>
                                    </div>
                                </div>
                            ))}
                            <button
                                className="w-full border border-gray-300 rounded-md p-2 flex items-center justify-center bg-blue-50 hover:bg-blue-100"
                                onClick={() => fileInputRef.current.click()} // Trigger file input click
                            >
                                <RiUploadCloudFill className="mr-2 text-4xl" />
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
                    <div className="p-2 bg-white rounded-lg shadow-md flex-grow">
                        <label className="block text-sm font-medium text-gray-700">
                            Product Description
                        </label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            rows={4}
                            className="w-full border border-gray-300 rounded-md p-2"
                            style={{ height: textareaHeight, overflowY: "auto" }}
                        />
                    </div>
                    <div className="flex justify-end space-x-4">
                        <button
                            onClick={handleSaveProduct}
                            className="bg-blue-500 text-white px-4 py-2 rounded-md"
                        >
                            Save Product
                        </button>
                        {/* Add Manage Variants button */}
                        <button
                            onClick={handleVariantPageOpen}
                            className="bg-green-500 text-white px-4 py-2 rounded-md"
                        >
                            Manage Variants
                        </button>
                    </div>
                </div>
            </div>

            {/* Variant Modal - Popup Style */}
            {isVariantPageOpen && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg relative w-[1300px] h-[700px]">
                        <div className="absolute top-4 right-4 flex items-center gap-2">
                            {/*help icon*/}
                            <button
                                onClick={handleHelpIconClick} // This function should open the help modal
                                className="text-xl text-gray-500 hover:text-gray-800"
                            >
                                <CiCircleQuestion className="h-7 w-7"/>
                            </button>
                            {/* Close Button */}
                            <button
                                onClick={handleVariantPageClose}
                                className="text-xl text-gray-500 hover:text-gray-800"
                            >
                                <X className="h-7 w-7"/>
                            </button>
                        </div>
                            {/* Render the VariantPage */}
                            <VariantPage onClose={handleVariantPageClose}/>
                        </div>
                    </div>
                    )}
                    {isHelpModalOpen && (
                        <div
                            className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50"
                    onClick={closeHelpModal} // Close help modal when clicking outside
                >
                    <div
                        className="bg-white rounded-lg w-[600px] p-6 overflow-y-auto relative"
                        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
                    >
                        {/* Close help modal button */}
                        <button
                            onClick={closeHelpModal} // Close help modal
                            className="absolute top-4 right-4 text-xl text-gray-500 hover:text-gray-800"
                        >
                            <X className="h-6 w-6" />
                        </button>

                        {/* Help modal content */}
                        <h2 className="text-2xl font-bold mb-4">How to Create Attributes and Variants</h2>
                        <p className="mb-4">
                            In this section, you can create attributes for your product, such as size, color, RAM, storage, etc. These attributes are essential to define different variants of your product.
                        </p>
                        <p className="mb-4">
                            For example, if you are selling a phone, you might create attributes like:
                            <ul className="list-disc pl-5 mt-2">
                                <li>Color: Red, Blue, Black</li>
                                <li>RAM: 4GB, 8GB, 16GB</li>
                                <li>Storage: 64GB, 128GB, 256GB</li>
                            </ul>
                        </p>
                        <p className="mb-4">
                            Once you have defined these attributes, you can click the <strong>Create Variants</strong> button. This will automatically generate product variants based on the combinations of these attributes.
                        </p>
                        <p>
                            For instance, with the attributes above, variants like "Red - 8GB RAM - 128GB Storage" or "Blue - 16GB RAM - 256GB Storage" will be created.
                        </p>

                        <div className="mt-6">
                            <button
                                onClick={closeHelpModal} // Close the help modal
                                className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                            >
                                Got it
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EditProductPage;
