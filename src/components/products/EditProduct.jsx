import React, { useEffect, useState, useRef } from "react";
import { getProductById, updateProduct } from "../../services/api/ProductApi.jsx";
import { getCategories } from "../../services/api/CategoryApi";
import { getBrands } from "../../services/api/BrandsApi";
import RichTextEditor from "./RichTextEditor.jsx";
import { FiUpload, FiTrash2 } from "react-icons/fi";

const EditProduct = ({ onClose, productId }) => {
  const [formData, setFormData] = useState({
    productName: "",
    category: "",
    brand: "",
    description: "",
    images: [],
    attributes: [],
    variants: [],
  });
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);

  const editorRef = useRef();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [product, categoriesData, brandsData] = await Promise.all([
          getProductById(productId),
          getCategories(),
          getBrands(),
        ]);

        setCategories(categoriesData);
        setBrands(brandsData);

        setFormData({
          productName: product.name,
          category: product.categoryId._id,
          brand: product.brandId._id,
          description: product.description,
          images: product.imageUrls.map((url) => ({ file: null, url })),
          attributes: product.attributes || [],
          variants: product.variants.map((variant) => ({
            ...variant,
            price: variant.price || "",
            quantity: variant.stockQuantity || "",
          })),
        });
      } catch (error) {
        console.error("Error fetching product, categories, or brands:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [productId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDescriptionChange = (descriptionUrl) => {
    setFormData({ ...formData, description: descriptionUrl });
  };

  const handleFileChange = (e) => {
    const files = e.target.files;
    const newImages = Array.from(files).map((file) => ({
      file: file,
      url: URL.createObjectURL(file),
    }));

    setFormData({
      ...formData,
      images: [...formData.images, ...newImages],
    });
  };

  const handleImageDelete = (index) => {
    const updatedImages = formData.images.filter((_, i) => i !== index);
    setFormData({ ...formData, images: updatedImages });
  };

  const handleSetMainImage = (index) => {
    const updatedImages = [...formData.images];
    const mainImage = updatedImages.splice(index, 1)[0];
    updatedImages.unshift(mainImage);
    setFormData({ ...formData, images: updatedImages });
  };

  const handleAddAttribute = () => {
    setFormData({
      ...formData,
      attributes: [...formData.attributes, { name: "", value: "" }],
    });
  };

  const handleRemoveAttribute = (index) => {
    const updatedAttributes = formData.attributes.filter((_, i) => i !== index);
    setFormData({ ...formData, attributes: updatedAttributes });
  };

  const handleAttributeChange = (index, field, value) => {
    const updatedAttributes = formData.attributes.map((attr, i) =>
        i === index ? { ...attr, [field]: value } : attr
    );
    setFormData({ ...formData, attributes: updatedAttributes });
  };

  const handleAddVariant = () => {
    setFormData({
      ...formData,
      variants: [
        ...formData.variants,
        {
          attributes: [],
          price: "",
          quantity: "",
        },
      ],
    });
  };

  const handleRemoveVariant = (index) => {
    const updatedVariants = formData.variants.filter((_, i) => i !== index);
    setFormData({ ...formData, variants: updatedVariants });
  };

  const handleVariantChange = (index, field, value) => {
    const updatedVariants = formData.variants.map((variant, i) =>
        i === index ? { ...variant, [field]: value || [] } : variant
    );
    setFormData({ ...formData, variants: updatedVariants });
  };


  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await editorRef.current.uploadToCloudinary();
      await updateProduct(productId, formData);
      alert("Product updated successfully");
      onClose();
    } catch (error) {
      console.error("Error updating product:", error);
      alert("Failed to update the product");
    }
  };

  if (loading) {
    return (
        <div className="bg-gray-700 p-6 rounded shadow-lg text-white">
          <p>Loading product information...</p>
        </div>
    );
  }

  return (
      <div className="fixed top-0 inset-0 z-20 bg-black bg-opacity-50 py-6 px-4 sm:px-6 lg:px-8 overflow-auto">
        <div className="w-[50%] mx-auto">
          <form onSubmit={handleFormSubmit} className="bg-gray-900 shadow-md rounded-lg px-8 pt-4 pb-4">
            <h2 className="text-2xl font-bold mb-2 text-white">Edit Product</h2>

            {/* Product Name */}
            <div className="mb-3">
              <label htmlFor="productName" className="block text-gray-400 text-sm font-bold mb-2">
                Product Name <span className="text-red-500 ml-1">*</span>
              </label>
              <input
                  type="text"
                  id="productName"
                  name="productName"
                  value={formData.productName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 bg-gray-700 text-gray-100 placeholder-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Category */}
            <div className="mb-3">
              <label htmlFor="category" className="block text-gray-400 text-sm font-bold mb-2">
                Category <span className="text-red-500 ml-1">*</span>
              </label>
              <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 bg-gray-700 text-gray-100 placeholder-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="">Select Category</option>
                {categories.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                ))}
              </select>
            </div>

            {/* Brand */}
            <div className="mb-3">
              <label htmlFor="brand" className="block text-gray-400 text-sm font-bold mb-2">
                Brand <span className="text-red-500 ml-1">*</span>
              </label>
              <select
                  id="brand"
                  name="brand"
                  value={formData.brand}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 bg-gray-700 text-gray-100 placeholder-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="">Select Brand</option>
                {brands.map((brand) => (
                    <option key={brand._id} value={brand._id}>
                      {brand.name}
                    </option>
                ))}
              </select>
            </div>

            {/* Description */}
            <div className="mb-3">
              <label htmlFor="description" className="block text-gray-400 text-sm font-bold mb-2">
                Description
              </label>
              <RichTextEditor
                  ref={editorRef}
                  fileName={formData.productName}
                  docxUrl={formData.description}
                  onDescriptionUrlChange={handleDescriptionChange}
                  className="w-full px-3 py-2 bg-gray-700 text-gray-100 placeholder-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  aria-label="Description"
              />
            </div>

            {/* Attributes */}
            <div className="mb-3">
              <label className="block text-gray-400 text-sm font-bold mb-2">
                Attributes
              </label>
              {formData.attributes.map((attribute, index) => (
                  <div key={index} className="flex space-x-4 mb-2">
                    <input
                        type="text"
                        value={attribute.name}
                        onChange={(e) => handleAttributeChange(index, 'name', e.target.value)}
                        placeholder="Attribute Name"
                        className="w-full px-3 py-2 bg-gray-700 text-gray-100 placeholder-gray-400 rounded-md"
                    />
                    <input
                        type="text"
                        value={attribute.value}
                        onChange={(e) => handleAttributeChange(index, 'value', e.target.value)}
                        placeholder="Attribute Value"
                        className="w-full px-3 py-2 bg-gray-700 text-gray-100 placeholder-gray-400 rounded-md"
                    />
                    <button
                        type="button"
                        onClick={() => handleRemoveAttribute(index)}
                        className="bg-red-500 text-white p-2 rounded-full"
                    >
                      <FiTrash2 size={16} />
                    </button>
                  </div>
              ))}
              <button
                  type="button"
                  onClick={handleAddAttribute}
                  className="text-blue-500 hover:underline"
              >
                Add Attribute
              </button>
            </div>

            {/* Variants */}
            <div className="mb-3">
              <label className="block text-gray-400 text-sm font-bold mb-2">
                Variants
              </label>
              {formData.variants.map((variant, index) => (
                  <div key={index} className="flex space-x-4 mb-2">
                    <input
                        type="text"
                        value={(variant.attributes && Array.isArray(variant.attributes) ? variant.attributes.join(", ") : "")}
                        onChange={(e) =>
                            handleVariantChange(index, 'attributes', e.target.value.split(", "))
                        }
                        placeholder="Variant Attributes"
                        className="w-full px-3 py-2 bg-gray-700 text-gray-100 placeholder-gray-400 rounded-md"
                    />
                    <input
                        type="number"
                        value={variant.price}
                        onChange={(e) => handleVariantChange(index, 'price', e.target.value)}
                        placeholder="Price"
                        className="w-1/3 px-3 py-2 bg-gray-700 text-gray-100 placeholder-gray-400 rounded-md"
                    />
                    <input
                        type="number"
                        value={variant.quantity}
                        onChange={(e) => handleVariantChange(index, 'quantity', e.target.value)}
                        placeholder="Quantity"
                        className="w-1/3 px-3 py-2 bg-gray-700 text-gray-100 placeholder-gray-400 rounded-md"
                    />
                    <button
                        type="button"
                        onClick={() => handleRemoveVariant(index)}
                        className="bg-red-500 text-white p-2 rounded-full"
                    >
                      <FiTrash2 size={16} />
                    </button>
                  </div>
              ))}

              <button
                  type="button"
                  onClick={handleAddVariant}
                  className="text-blue-500 hover:underline"
              >
                Add Variant
              </button>
            </div>

            {/* Images */}
            <div className="mb-3">
              <label htmlFor="images" className="block text-gray-400 text-sm font-bold mb-2">
                Product Images
              </label>
              <div className="flex flex-col items-center">
                {formData.images[0] && (
                    <div className="relative mb-3">
                      <img
                          src={formData.images[0].url}
                          alt="Main Image"
                          className="h-48 w-48 object-cover rounded-lg border-4 border-indigo-500"
                      />
                      <button
                          type="button"
                          onClick={() => handleImageDelete(0)}
                          className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1"
                      >
                        <FiTrash2 size={16} />
                      </button>
                    </div>
                )}

                {/* Image Thumbnails */}
                <div className="grid grid-cols-3 gap-4">
                  {formData.images.slice(1).map((image, index) => (
                      <div key={index} className="relative">
                        <img
                            src={image.url || URL.createObjectURL(image.file)}
                            alt={`Thumbnail ${index + 1}`}
                            className="h-28 w-full object-cover border border-gray-300 rounded-md cursor-pointer"
                            onClick={() => handleSetMainImage(index + 1)}
                        />
                        <button
                            type="button"
                            onClick={() => handleImageDelete(index + 1)}
                            className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs"
                        >
                          ×
                        </button>
                      </div>
                  ))}
                </div>

                <input
                    type="file"
                    id="images"
                    name="images"
                    accept="image/*"
                    multiple
                    onChange={handleFileChange}
                    className="mt-3 hidden"
                />
                <label
                    htmlFor="images"
                    className="text-blue-500 cursor-pointer hover:underline flex items-center mt-2"
                >
                  <FiUpload size={16} />
                  <span className="ml-2">Upload more images</span>
                </label>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                  onClick={onClose}
                  className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded mr-2"
              >
                Cancel
              </button>
              <button
                  type="submit"
                  className="px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
  );
};

export default EditProduct;
