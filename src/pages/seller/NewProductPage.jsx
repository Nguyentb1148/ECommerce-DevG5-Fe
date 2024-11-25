import { useState, useEffect } from "react";
import { getCategories } from "../../services/api/CategoryApi.jsx";
import { getBrands } from "../../services/api/BrandsApi.jsx";
import { uploadImage } from "../../configs/Cloudinary.jsx";

const styles = {
    container: {
        padding: "20px",
        fontFamily: "Arial, sans-serif",
        backgroundColor: "#f4f4f4",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        margin: "0 auto",
    },
    section: {
        backgroundColor: "#fff",
        padding: "20px",
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    },
    header: {
        textAlign: "center",
        color: "#333",
        marginBottom: "20px",
    },
    input: {
        width: "100%",
        padding: "10px",
        marginBottom: "10px",
        borderRadius: "4px",
        border: "1px solid #ccc",
    },
    select: {
        width: "100%",
        padding: "10px",
        marginBottom: "10px",
        borderRadius: "4px",
        border: "1px solid #ccc",
    },
    editor: {
        border: "1px solid #ccc",
        borderRadius: "4px",
        padding: "10px",
        minHeight: "200px",
        backgroundColor: "#fff",
        marginBottom: "10px",
    },
    button: {
        padding: "12px 20px",
        backgroundColor: "#007bff",
        color: "#fff",
        border: "none",
        borderRadius: "4px",
        fontSize: "16px",
        width: "100%",
        opacity: 0.6,
        cursor: "not-allowed",
    },
    buttonEnabled: {
        opacity: 1,
        cursor: "pointer",
    },
    errorText: {
        color: "red",
        fontSize: "12px",
        marginBottom: "10px",
    },
    imagePreviewContainer: {
        display: "flex",
        flexDirection: "row", // Change to row for horizontal alignment
        marginTop: "10px",
    },
    imagePreview: {
        display: "flex",
        alignItems: "center",
        marginBottom: "10px",
    },
    image: {
        width: "100px",
        height: "100px",
        objectFit: "cover",
        marginRight: "10px",
    },
    deleteButton: {
        backgroundColor: "red",
        color: "white",
        border: "none",
        cursor: "pointer",
        padding: "5px",
    },
    mainImage: {
        flex: 1,
        textAlign: "center",
        padding: "10px",
        border: "1px solid #ccc",
        borderRadius: "4px",
        backgroundColor: "#f4f4f4",
        maxWidth: "70%", // Add maximum width for proper layout
    },
    thumbnails: {
        flex: 1,
        display: "flex",
        flexDirection: "column", // Keep this column direction for thumbnails
        gap: "10px",
        maxHeight: "400px",
        overflowY: "auto",
        marginLeft: "20px", // Add some spacing between the main image and thumbnails
    },
    thumbnail: {
        width: "80px",
        height: "80px",
        objectFit: "cover",
        cursor: "pointer",
        borderRadius: "4px",
        border: "1px solid #ccc",
    },
};

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
            if (!productName.trim()) {
                newErrors.productName = "Product Name is required.";
            }
            if (!selectedCategory) newErrors.selectedCategory = "Please select a category.";
            if (!selectedBrand) newErrors.selectedBrand = "Please select a brand.";
            setErrors(newErrors);
            setIsFormValid(Object.keys(newErrors).length === 0);
        };
        validateForm();
    }, [productName, selectedCategory, selectedBrand]);

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        const newImages = files.map((file) => ({
            file,
            name: file.name,
        }));
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
            images,
        });

        for (const image of images) {
            try {
                const folderName = `product/${productName}`;
                const uniqueName = image.name;
                console.log('image folder: ' + folderName + " unique name: " + uniqueName);
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
        <div style={styles.container}>
            <div style={styles.section}>
                <h2 style={styles.header}>Product Details</h2>

                <input
                    type="text"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    placeholder="Product Name"
                    style={styles.input}
                />
                {errors.productName && <div style={styles.errorText}>{errors.productName}</div>}

                <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    style={styles.select}
                >
                    <option value="">Select Category</option>
                    {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                            {category.name}
                        </option>
                    ))}
                </select>
                {errors.selectedCategory && <div style={styles.errorText}>{errors.selectedCategory}</div>}

                <select
                    value={selectedBrand}
                    onChange={(e) => setSelectedBrand(e.target.value)}
                    style={styles.select}
                >
                    <option value="">Select Brand</option>
                    {brands.map((brand) => (
                        <option key={brand.id} value={brand.id}>
                            {brand.name}
                        </option>
                    ))}
                </select>
                {errors.selectedBrand && <div style={styles.errorText}>{errors.selectedBrand}</div>}

                <input
                    type="file"
                    onChange={handleImageChange}
                    style={styles.input}
                    multiple
                />

                {/* Image Preview Container with Flexbox */}
                <div style={styles.imagePreviewContainer}>
                    <div style={styles.mainImage}>
                        {mainImage ? (
                            <img
                                src={mainImage}
                                alt="Main"
                                style={{width: "100%", height: "100%", maxHeight: "400px", maxWidth: "400px"}}
                            />
                        ) : (
                            <p>No image selected</p>
                        )}
                    </div>

                    <div style={styles.thumbnails}>
                        {images.map((image, index) => (
                            <div key={index} style={styles.imagePreview}>
                                <img
                                    src={URL.createObjectURL(image.file)}
                                    alt="thumbnail"
                                    style={styles.thumbnail}
                                    onClick={() => handleThumbnailClick(image)}
                                />
                                <button
                                    onClick={() => handleImageDelete(index)}
                                    style={styles.deleteButton}
                                >
                                    Delete
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                <button
                    onClick={handleSave}
                    style={{
                        ...styles.button,
                        ...(isFormValid ? styles.buttonEnabled : {}),
                    }}
                    disabled={!isFormValid}
                >
                    Save
                </button>
            </div>
        </div>

    );
};

export default NewProductPage;
