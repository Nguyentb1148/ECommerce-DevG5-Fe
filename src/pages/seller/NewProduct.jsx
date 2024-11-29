import { useState, useEffect, useRef } from "react";
import { getCategories } from "../../services/api/CategoryApi.jsx";
import { getBrands } from "../../services/api/BrandsApi.jsx";
import { uploadImage } from "../../configs/Cloudinary.jsx";
import { createProduct } from "../../services/api/ProductApi.jsx";
import VariantPage from "./VariantPage";
import { RiUploadCloudFill } from "react-icons/ri";
import { X  } from "lucide-react";

const NewProduct = () => {
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
    const [productSaved, setProductSaved] = useState(false);
    const [errors, setErrors] = useState({});
    const fileInputRef = useRef(null);
    const [invalidImageIndexes, setInvalidImageIndexes] = useState([]);  // State for invalid images

    useEffect(() => {
        const fetchData = async () => {
            const categoriesData = await getCategories();
            const brandsData = await getBrands();
            setCategories(categoriesData);
            setBrands(brandsData);
        };
        fetchData();
    }, []);

    const handleUpload = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (event) => {
        const selectedFiles = Array.from(event.target.files);
        const newImages = [];
        const invalidIndexes = [];

        selectedFiles.forEach((file, index) => {
            if (file.size > 2 * 1024 * 1024) { // If the file exceeds 2MB
                invalidIndexes.push(newImages.length); // Mark the index of the invalid image
                newImages.push({ file, name: file.name, isLarge: true }); // Indicate that the image is large
            } else {
                newImages.push({ file, name: file.name, isLarge: false });
            }
        });

        if (invalidIndexes.length > 0) {
            setInvalidImageIndexes(invalidIndexes); // Store invalid image indexes for warning
        } else {
            setInvalidImageIndexes([]); // Clear invalid indexes if all images are valid
        }

        setImages((prevImages) => {
            const updatedImages = [...prevImages, ...newImages];

            // If this is the first image being added, set it as the main image
            if (updatedImages.length === newImages.length) {
                setMainImage(URL.createObjectURL(updatedImages[0].file)); // Set the first image as the main image
            }

            return updatedImages;
        });
    };


    const handleThumbnailClick = (image) => {
        if (image && image.file) {
            setMainImage(URL.createObjectURL(image.file));
        }
    };

    const handleImageDelete = (index) => {
        // Remove the image from the list
        setImages((prevImages) => {
            const updatedImages = prevImages.filter((_, i) => i !== index);

            // Check if there are any remaining images to set a new main image
            if (updatedImages.length === 0) {
                setMainImage(null); // If no images are left, set main image to null
            } else {
                // Set the new main image to the first image in the updated list
                setMainImage(URL.createObjectURL(updatedImages[0].file));
            }

            return updatedImages;
        });

        // Remove from invalid image indexes as well
        setInvalidImageIndexes((prevIndexes) => prevIndexes.filter((i) => i !== index));
    };


    const validate = () => {
        const newErrors = {};
        const wordCount = productName.trim().split(" ").length;

        if (productName.trim() === "" || wordCount < 2) {
            newErrors.productName = "Product name must have at least two words.";
        }
        if (!selectedCategory) {
            newErrors.selectedCategory = "Category is required.";
        }
        if (!selectedBrand) {
            newErrors.selectedBrand = "Brand is required.";
        }
        if (images.length < 4 || images.length > 6) {
            newErrors.images = "You must upload between 4 and 6 images.";
        } else {
            for (let i = 0; i < images.length; i++) {
                if (images[i].file.size > 2 * 1024 * 1024) {
                    newErrors.images = "Each image must be under 2MB.";
                    break;
                }
            }
        }
        if (description.trim() === "" || description.split(" ").length > 500) {
            newErrors.description = "Description is required and must not exceed 500 words.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSaveProduct = async () => {
        if (!validate()) return;

        const user = JSON.parse(localStorage.getItem("user"));
        const productData = {
            name: productName,
            categoryId: selectedCategory,
            brandId: selectedBrand,
            imageUrls: images,
            description,
            variants: variantData.variants,
        };

        const imageUploadPromises = productData.imageUrls.map(async (image) => {
            const imageId = Math.random().toString(36).substring(2, 8);
            const uploadedImageUrl = await uploadImage(image.file, productData.name, imageId);
            return uploadedImageUrl.url;
        });

        const uploadedImageUrls = await Promise.all(imageUploadPromises);
        productData.imageUrls = uploadedImageUrls;

        try {
            const response = await createProduct({
                ...productData,
                sellerId: user.id,
                price: variantData.variants?.[0].price || 0,
            });
            console.log("Product saved successfully:", response);
            setProductSaved(true);
        } catch (error) {
            console.error("Error saving product:", error);
        }
    };

    const handleAddProduct = () => {
        setProductName("");
        setSelectedCategory("");
        setSelectedBrand("");
        setImages([]);
        setMainImage(null);
        setDescription("");
        setProductSaved(false);
        setErrors({});
    };

    return (
        <div className="p-4 bg-gray-100 min-h-screen">
            <h2 className="text-2xl font-semibold mb-2 text-gray-800">Add Product</h2>
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

                        {/* List of images on the right with size display */}
                        <div className="flex flex-col space-y-4 w-64 max-h-96 overflow-y-auto">
                            {/* Display validation message for large images */}
                            {invalidImageIndexes.length > 0 && (
                                <p className="text-red-500 text-sm mb-2">
                                    Some images are too large (must be under 2MB).
                                </p>
                            )}

                            {/* List of images */}
                            {images.map((image, index) => {
                                // Check if the image object exists
                                if (!image || !image.file) {
                                    return null;  // Skip this image if it's invalid
                                }

                                // Get image size in MB for display (rounded to 2 decimal places)
                                const imageSize = (image.file.size / 1048576).toFixed(2); // Size in MB

                                return (
                                    <div key={index} className="flex items-center space-x-2">
                                        <div className="relative">
                                            <img
                                                src={URL.createObjectURL(image.file)}
                                                alt="Thumbnail"
                                                className={`w-full h-28 border border-gray-300 rounded-md cursor-pointer object-contain ${invalidImageIndexes.includes(index) ? 'border-red-500' : ''}`}
                                                onClick={() => handleThumbnailClick(image)}
                                            />
                                            <button
                                                onClick={() => handleImageDelete(index)}
                                                className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs"
                                            >
                                                ×
                                            </button>
                                        </div>
                                        {/* Image size display next to the thumbnail in MB */}
                                        <span className="text-sm text-gray-500">
                {imageSize} MB {image.isLarge && <span className="text-red-500">(Too large)</span>}
            </span>
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
            {productSaved && (
                <button
                    onClick={handleAddProduct}
                    className="mt-4 bg-gray-600 text-white py-1 px-2 rounded-md hover:bg-gray-700"
                >
                    Add Another Product
                </button>
            )}
            {isVariantModalOpen && (
                <div
                    className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50"
                    onClick={() => setIsVariantModalOpen(false)}
                >
                    <div
                        className="bg-white rounded-lg w-[1500px] h-[800px] p-6 overflow-y-auto relative"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Close button in top-right corner */}
                        <button
                            onClick={() => setIsVariantModalOpen(false)}
                            className="absolute top-4 right-4 text-xl text-gray-500 hover:text-gray-800"
                        >
                            <X className="h-6 w-6" />
                        </button>

                        {/* Full variant page inside the modal */}
                        <VariantPage
                            onSave={(data) => {
                                setVariantData(data);
                                setIsVariantModalOpen(false);
                            }}
                        />
                    </div>
                </div>
            )}


        </div>
    );
};

export default NewProduct;
