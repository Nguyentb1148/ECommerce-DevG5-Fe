import  { useState, useEffect, useRef } from "react";
import FroalaEditorComponent from "react-froala-wysiwyg";
import { getCategories } from "../../services/api/CategoryApi.jsx";
import { getBrands } from "../../services/api/BrandsApi.jsx";
import { useFroala } from "../../hooks/useFroala.jsx";
import TechnologyInfo from "./TechnologyInfo";
import VariantPage from "./VariantPage"; // Import VariantPage for the modal
import { RiUploadCloudFill } from "react-icons/ri";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { uploadDoc, uploadImage } from "../../configs/Cloudinary.jsx";
import technologyInfo from "./TechnologyInfo";
import {createProduct} from "../../services/api/ProductApi.jsx"; // Import close icon

const NewProduct = () => {
    const [productName, setProductName] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedBrand, setSelectedBrand] = useState("");
    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);
    const [images, setImages] = useState([]);
    const [mainImage, setMainImage] = useState(null);
    const { model, setModel, editorRef, exportToDoc } = useFroala();
    const [isTechnologyModalOpen, setIsTechnologyModalOpen] = useState(false);
    const [isVariantModalOpen, setIsVariantModalOpen] = useState(false); // State for Attribute and Variant Modal
    const [productSaved, setProductSaved] = useState(false); // Track if the product was saved successfully
    const fileInputRef = useRef(null);
    const [technologyData, setTechnologyData] = useState([]);
    const [variantData, setVariantData] = useState({ attributes: [], processedVariants: [] });
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
        fileInputRef.current.click(); // Trigger the hidden file input
    };

    const handleFileChange = (event) => {
        const selectedFiles = Array.from(event.target.files); // Convert FileList to an array
        const newImages = selectedFiles.map((file) => ({ file, name: file.name }));
        setImages((prevImages) => [...prevImages, ...newImages]); // Append new files to the existing images
    };

    const handleThumbnailClick = (image) => {
        setMainImage(URL.createObjectURL(image.file));
    };

    const handleImageDelete = (index) => {
        setImages((prevImages) => prevImages.filter((_, i) => i !== index));
    };

    const handleSaveProduct = async () => {
        console.log("variants: ",variantData.variants);
        console.log("attributes: ",variantData.attributes);
        // Step 1: Gather all the necessary data
        const user=JSON.parse(localStorage.getItem("user"))
        const productData = {
            name: productName,
            categoryId: selectedCategory,
            brandId: selectedBrand,
            imageUrls: images,  // Will be updated after upload
            information: "", // You can get this from your Technology Info modal
            variants: [], // You can get this from VariantPage modal
        };

        // Step 2: Upload Images to Cloudinary
        const imageUploadPromises = productData.imageUrls.map(async (image) => {
            const imageId = Math.random().toString(36).substring(2, 8); // Generate a 6-character image ID
            const uploadedImageUrl = await uploadImage(image.file, productData.name, imageId);
            return uploadedImageUrl.url;
        });
        // Wait for all images to be uploaded and get their URLs
        const uploadedImageUrls = await Promise.all(imageUploadPromises);
        productData.imageUrls = uploadedImageUrls;  // Update product data with uploaded URLs

        // Step 3: Export the description to DOCX and get the file
        let docxFile;
        try {
            docxFile = await exportToDoc(); // This function should now return the DOCX file
            if (!docxFile) {
                throw new Error("Failed to export DOCX file from Froala.");
            }
        } catch (error) {
            console.error("Error exporting DOCX:", error);
            // Handle the error and return if needed
            return;
        }

        // Step 4: Upload DOCX file to Cloudinary
        try {
            const descriptionFileName = `${productData.name}_description.docx`;
            const descriptionUploadUrl = await uploadDoc(docxFile, productData.name, descriptionFileName);
            productData.descriptionFileUrl = descriptionUploadUrl.url;

        } catch (error) {
            console.error("Error uploading DOCX:", error);
            return;
        }
        // Step 5: Handle Technology Info
        productData.information = technologyData || "Default technology info"; // Ensure the state is used
        console.log("variants: ",variantData.variants);
        console.log("attributes: ",variantData.attributes);
        // Final product data
        const finalProductData = {
            ...productData,
            sellerId:user.id,
            descriptionFileUrl: productData.descriptionFileUrl,
            information: productData.information,
            variants: variantData.variants,
            attributes:variantData.attributes,
            price: variantData.variants?.[0].price || 0, // Fallback to 0 if no variants
        };

        // Step 7: Send the final product data to the server
        try {
            const response = await createProduct(finalProductData);
            console.log("Product saved successfully:", response);
            setProductSaved(true); // Set the productSaved flag to true after successful save
        } catch (error) {
            console.error("Error saving product:", error);
        }
    };
    // Reset the form to add another product
    const handleAddProduct = () => {
        setProductName("");
        setSelectedCategory("");
        setSelectedBrand("");
        setImages([]);
        setMainImage(null);
        setModel("");
        setProductSaved(false); // Reset the saved flag
    };
    return (
        <div className="p-4 bg-gray-100 min-h-screen">
            <h2 className="text-2xl font-semibold mb-2 text-gray-800">Add Product</h2>
            <div className="grid grid-cols-5 gap-8">
                {/* Left Column */}
                <div className="col-span-2 flex flex-col space-y-6">
                    {/* Part 1: Form Fields */}
                    <div className="p-2 bg-white rounded-lg shadow-md space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Product Name</label>
                            <input
                                type="text"
                                value={productName}
                                onChange={(e) => setProductName(e.target.value)}
                                className="w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Category</label>
                                <select
                                    value={selectedCategory}
                                    onChange={(e) => {
                                        setSelectedCategory(e.target.value);
                                        console.log("Selected Category ID:", e.target.value); // Logs the selected category ID
                                    }}
                                    className="w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
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
                                <label className="block text-sm font-medium text-gray-700">Brand</label>
                                <select
                                    value={selectedBrand}
                                    onChange={(e) => {
                                        setSelectedBrand(e.target.value);
                                        console.log("Selected brand ID:", e.target.value); // Logs the selected category ID
                                    }}
                                    className="w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
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

                    {/* Part 2: Images */}
                    <div className="p-2 bg-white rounded-lg shadow-md flex space-x-4">
                        <div
                            className="w-96 h-96 border border-gray-300 rounded-md flex items-center justify-center bg-gray-50">
                        {mainImage ? (
                                <img src={mainImage} alt="Main" className="w-full h-full object-cover" />
                            ) : (
                                <p className="text-gray-500">No image selected</p>
                            )}
                        </div>
                        <div className="flex flex-col space-y-4 w-28 max-h-96 overflow-y-auto">
                            {images.map((image, index) => (
                                <div key={index} className="relative">
                                    <img
                                        src={URL.createObjectURL(image.file)}
                                        alt="Thumbnail"
                                        className="w-full h-28 border border-gray-300 rounded-md cursor-pointer"
                                        onClick={() => handleThumbnailClick(image)}
                                    />
                                    <button
                                        onClick={() => handleImageDelete(index)}
                                        className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs"
                                    >
                                        ×
                                    </button>
                                </div>
                            ))}
                            <button
                                className="w-full border border-gray-300 rounded-md p-2 flex items-center justify-center bg-blue-50 hover:bg-blue-100"
                                onClick={handleUpload}
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

                    {/* Technology Info Button */}
                    <button
                        onClick={() => setIsTechnologyModalOpen(true)}
                        className="bg-blue-500 text-white py-2 px-2 rounded-md hover:bg-blue-600"
                    >
                        Add Technology Information
                    </button>
                </div>

                {/* Right Column */}
                <div className="col-span-3 flex flex-col space-y-6">
                    {/* Part 3: Description */}
                    <div
                        className="p-2 bg-white rounded-lg shadow-md flex-grow max-h-[calc(100vh-12rem)] overflow-y-auto">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                        <FroalaEditorComponent
                            tag="textarea"
                            ref={editorRef}
                            model={model}
                            onModelChange={(newModel) => setModel(newModel)}
                        />
                    </div>

                    {/* Attribute & Variant Button */}
                    <button
                        onClick={() => setIsVariantModalOpen(true)}
                        className="bg-green-500 text-white py-1 px-1 rounded-md hover:bg-green-600"
                    >
                        Add Attributes and Variants
                    </button>
                </div>
            </div>

            {/* Save Product Button */}
            <button
                onClick={handleSaveProduct}
                className="mt-4 bg-blue-600 text-white py-1 px-2 rounded-md hover:bg-blue-700"
            >
                Save Product
            </button>

            {/* Add Another Product Button */}
            {productSaved && (
                <button
                    onClick={handleAddProduct}
                    className="mt-4 bg-gray-600 text-white py-1 px-2 rounded-md hover:bg-gray-700"
                >
                    Add Another Product
                </button>
            )}

            {isTechnologyModalOpen && (
                <div
                    className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50"
                    onClick={() => setIsTechnologyModalOpen(false)}
                >
                    <div
                        className="bg-white rounded-lg w-11/12 max-w-2xl p-2 overflow-y-auto max-h-[800px] relative"
                        onClick={(e) => e.stopPropagation()} // Prevent closing modal when clicking inside
                    >
                        {/* Close Button */}
                        <button
                            onClick={() => setIsTechnologyModalOpen(false)}
                            className="absolute top-2 right-2 text-3xl text-gray-500"
                        >
                            <IoMdCloseCircleOutline />
                        </button>
                        <TechnologyInfo
                            onSave={(data) => {
                                setTechnologyData(data); // Save data from TechnologyInfo
                                setIsTechnologyModalOpen(false); // Close the modal
                            }}
                        />
                    </div>
                </div>
            )}

            {/* Variant Modal */}
            {isVariantModalOpen && (
                <div
                    className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50"
                    onClick={() => setIsVariantModalOpen(false)}
                >
                    <div
                        className="bg-white rounded-lg w-11/12 max-w-2xl p-2 overflow-y-auto max-h-[800px] relative"
                        onClick={(e) => e.stopPropagation()} // Prevent closing modal when clicking inside
                    >
                        {/* Close Button */}
                        <button
                            onClick={() => setIsVariantModalOpen(false)}
                            className="absolute top-2 right-2 text-3xl text-gray-500"
                        >
                            <IoMdCloseCircleOutline />
                        </button>
                        <VariantPage
                            onSave={(data) => {
                                setVariantData(data); // Save data from VariantPage
                                setIsVariantModalOpen(false); // Close the modal
                            }}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default NewProduct;
