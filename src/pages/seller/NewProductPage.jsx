import {useEffect, useState} from "react";
import {getCategories} from "../../services/api/CategoryApi.jsx";
import {getBrands} from "../../services/api/BrandsApi.jsx";
import {useNavigate} from "react-router-dom";
import {useFroala} from "../../hooks/useFroala.jsx";
import FroalaEditorComponent from "react-froala-wysiwyg";

const NewProductPage = () => {
    const [productName, setProductName] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedBrand, setSelectedBrand] = useState("");
    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);
    const [errors, setErrors] = useState({});
    const [isFormValid, setIsFormValid] = useState(false);
    const [images, setImages] = useState([]);
    const [mainImage, setMainImage] = useState(null);
    const { model, setModel, editorRef, exportToDoc } = useFroala();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const categoriesData = await getCategories();
                const brandsData = await getBrands();
                setCategories(categoriesData);
                setBrands(brandsData);
            } catch (error) {
                console.error("Error fetching categories or brands:", error);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        const validateForm = () => {
            const newErrors = {};
            if (!productName.trim()) newErrors.productName = "Product Name is required.";
            if (!selectedCategory) newErrors.selectedCategory = "Please select a category.";
            if (!selectedBrand) newErrors.selectedBrand = "Please select a brand.";
            setErrors(newErrors);
            setIsFormValid(Object.keys(newErrors).length === 0);
        };
        validateForm();
    }, [productName, selectedCategory, selectedBrand]);

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        const newImages = files.map((file) => ({ file, name: file.name }));
        setImages((prevImages) => [...prevImages, ...newImages]);
        setMainImage(URL.createObjectURL(files[0]));
    };

    const handleThumbnailClick = (image) => {
        setMainImage(URL.createObjectURL(image.file));
    };

    const handleSave = async () => {
        if (!isFormValid) return;

        console.log({
            productName,
            selectedCategory,
            selectedBrand,
            description: model,
            images,
        });

        for (const image of images) {
            try {
                const folderName = `product/${productName}`;
                const uniqueName = image.name;
                console.log("image folder: " + folderName + " unique name: " + uniqueName);
                // const response = await uploadImage(image.file, folderName, uniqueName);
                // console.log("Cloudinary response: ", response);
            } catch (error) {
                console.error("Error uploading image:", error);
            }
        }
    };

    const handleImageDelete = (index) => {
        setImages((prevImages) => prevImages.filter((_, i) => i !== index));
    };

    return (
        <div className="p-8 bg-gray-100">
            <div className="grid grid-cols-2 gap-8 bg-white rounded-lg shadow-lg p-8">
                {/* Left Section: Product Info */}
                <div>
                    <h2 className="text-2xl font-semibold text-gray-800 mb-6">Product Details</h2>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Product Name</label>
                        <input
                            type="text"
                            value={productName}
                            onChange={(e) => setProductName(e.target.value)}
                            className="w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter product name"
                        />
                        {errors.productName && <p className="text-red-500 text-sm">{errors.productName}</p>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Category</label>
                        <select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                            <option value="">Select Category</option>
                            {categories.map((category, index) => (
                                <option key={category.id || index} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                        {errors.selectedCategory && <p className="text-red-500 text-sm">{errors.selectedCategory}</p>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Brand</label>
                        <select
                            value={selectedBrand}
                            onChange={(e) => setSelectedBrand(e.target.value)}
                            className="w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                            <option value="">Select Brand</option>
                            {brands.map((brand, index) => (
                                <option key={brand.id || index} value={brand.id}>
                                    {brand.name}
                                </option>
                            ))}
                        </select>
                        {errors.selectedBrand && <p className="text-red-500 text-sm">{errors.selectedBrand}</p>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Description</label>
                        <FroalaEditorComponent
                            tag="textarea"
                            ref={editorRef}
                            model={model}
                            onModelChange={(newModel) => setModel(newModel)}
                        />
                    </div>
                </div>

                {/* Right Section: Image Management */}
                <div>
                    <h2 className="text-2xl font-semibold text-gray-800 mb-6">Product Images</h2>
                    <div className="mb-4">
                        <input
                            type="file"
                            onChange={handleImageChange}
                            className="w-full border border-gray-300 rounded-md p-2"
                            multiple
                        />
                    </div>
                    <div className="flex gap-6">
                        {/* Main Image */}
                        <div
                            className="w-96 h-96 border border-gray-300 rounded-md flex justify-center items-center bg-gray-100">
                            {mainImage ? (
                                <img
                                    src={mainImage}
                                    alt="Main"
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <p className="text-gray-500">No image selected</p>
                            )}
                        </div>

                        {/* List of Thumbnails */}
                        <div className="flex flex-col gap-4 overflow-y-auto max-h-96">
                            {images.map((image, index) => (
                                <div key={index} className="relative">
                                    <img
                                        src={URL.createObjectURL(image.file)}
                                        alt="Thumbnail"
                                        className="w-28 h-28 border border-gray-300 rounded-md cursor-pointer"
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
                        </div>
                    </div>

                    <button
                        onClick={handleSave}
                        className={`mt-6 w-full py-2 text-white font-semibold rounded-md ${
                            isFormValid ? "bg-blue-500 hover:bg-blue-600" : "bg-gray-300 cursor-not-allowed"
                        }`}
                        disabled={!isFormValid}
                    >
                        Save
                    </button>
                    <button
                        onClick={exportToDoc}
                        className="mt-4 w-full py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                    >
                        Export Description to .doc
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NewProductPage;