import { useState, useEffect } from "react";
import FroalaEditorComponent from "react-froala-wysiwyg";
import { getCategories } from "../../services/api/CategoryApi.jsx";
import { getBrands } from "../../services/api/BrandsApi.jsx";
import { getProductById } from "../../services/api/ProductApi.jsx";
import TechnologyInfo from "./TechnologyInfo";
import VariantPage from "./VariantPage";
import { useParams } from "react-router-dom";
import { useFroala } from "../../hooks/useFroala"; // Assuming useFroala hook is in a hooks directory

const ProductDetail = () => {
    const { productId } = useParams();

    const [productName, setProductName] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedBrand, setSelectedBrand] = useState("");
    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);
    const [images, setImages] = useState([]);
    const [mainImage, setMainImage] = useState(null);
    const [productDetails, setProductDetails] = useState({});
    const [technologyData, setTechnologyData] = useState([]);
    const [variantData, setVariantData] = useState({ attributes: [], variants: [] });
    const [descriptionFileUrl, setDescriptionFileUrl] = useState(""); // To store the DOCX URL

    const { model, setModel, editorRef, isLoading, exportToDoc } = useFroala(descriptionFileUrl);  // Pass the URL to the hook

    useEffect(() => {
        const fetchData = async () => {
            // Fetch categories and brands
            const categoriesData = await getCategories();
            const brandsData = await getBrands();
            setCategories(categoriesData);
            setBrands(brandsData);

            // Fetch the product details by ID
            const productData = await getProductById(productId);
            setProductDetails(productData);
            setProductName(productData.name);
            setSelectedCategory(productData.categoryId);
            setSelectedBrand(productData.brandId);
            setImages(productData.imageUrls || []);
            setMainImage(productData.imageUrls[0] || null);
            setTechnologyData(productData.technologyInfo || []);
            setVariantData(productData.variants || []);
            setDescriptionFileUrl(productData.descriptionFileUrl); // Set the DOCX URL
        };

        fetchData();
    }, [productId]);

    const handleAddAttribute = (newAttribute) => {
        // Update the attribute data state, adding the new attribute
        setVariantData({
            ...variantData,
            attributes: [...variantData.attributes, newAttribute],
        });
    };

    return (
        <div className="p-4 bg-gray-100 min-h-screen">
            <h2 className="text-2xl font-semibold mb-2 text-gray-800">Product Details</h2>
            <div className="grid grid-cols-5 gap-8">
                {/* Left Column */}
                <div className="col-span-2 flex flex-col space-y-6">
                    {/* Part 1: Product Info */}
                    <div className="p-2 bg-white rounded-lg shadow-md space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Product Name</label>
                            <input
                                type="text"
                                value={productName}
                                readOnly
                                className="w-full border border-gray-300 rounded-md p-2 bg-gray-200"
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Category</label>
                                <select
                                    value={selectedCategory}
                                    readOnly
                                    className="w-full border border-gray-300 rounded-md p-2 bg-gray-200"
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
                                    readOnly
                                    className="w-full border border-gray-300 rounded-md p-2 bg-gray-200"
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
                                <p className="text-gray-500">No image available</p>
                            )}
                        </div>
                        <div className="flex flex-col space-y-4 w-28 max-h-96 overflow-y-auto">
                            {images.map((image, index) => (
                                <div key={index} className="relative">
                                    <img
                                        src={image}
                                        alt="Thumbnail"
                                        className="w-full h-28 border border-gray-300 rounded-md cursor-pointer"
                                        onClick={() => setMainImage(image)}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Technology Info */}
                    <div className="p-2 bg-white rounded-lg shadow-md">
                        <label className="block text-sm font-medium text-gray-700">Technology Information</label>
                        <div className="bg-gray-100 p-2 rounded-md">
                            {technologyData && technologyData.length > 0 ? (
                                <TechnologyInfo technologyData={technologyData} />
                            ) : (
                                <p className="text-gray-500">No technology information available.</p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Right Column */}
                <div className="col-span-3 flex flex-col space-y-6">
                    {/* Part 3: Description */}
                    <div
                        className="p-2 bg-white rounded-lg shadow-md flex-grow max-h-[calc(100vh-12rem)] overflow-y-auto">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                        {isLoading ? (
                            <p>Loading...</p>
                        ) : (
                            <FroalaEditorComponent
                                tag="textarea"
                                value={model}  // Using the model state from useFroala
                                readOnly
                                className="froala-editor"
                                ref={editorRef}
                            />
                        )}
                    </div>

                    {/* Variants */}
                    <div className="p-2 bg-white rounded-lg shadow-md">
                        <label className="block text-sm font-medium text-gray-700">Variants</label>
                        <div className="bg-gray-100 p-2 rounded-md">
                            {variantData?.variants?.length > 0 ? (
                                <VariantPage variantData={variantData} />
                            ) : (
                                <p className="text-gray-500">No variants available.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Edit Button */}
            <button
                onClick={() => handleAddAttribute({ /* example attribute */ })}
                className="mt-4 bg-yellow-500 text-white py-2 px-4 rounded-md hover:bg-yellow-600"
            >
                Edit Product
            </button>
        </div>
    );
};

export default ProductDetail;
