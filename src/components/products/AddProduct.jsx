import { useState, useEffect, useRef } from "react";
import { FaX } from "react-icons/fa6";
import { FiUpload, FiPlus, FiTrash2, FiX } from "react-icons/fi";
import { getCategories } from "../../services/api/CategoryApi";
import { getBrands } from "../../services/api/BrandsApi";
import { createProduct } from "../../services/api/ProductApi";
import { uploadImage } from "../../configs/Cloudinary";
import { toast } from "react-toastify";
import RichTextEditor from "./RichTextEditor";

const AddProduct = ({ onClose, refreshProducts }) => {
  const [formData, setFormData] = useState({
    productName: "",
    category: "",
    brand: "",
    description: "",
    image: null,
    attributes: [],
    variants: [],
  });

  const [errors, setErrors] = useState({
    productName: null,
    category: null,
    brand: null,
    description: null,
    image: null,
    attributes: null,
    variants: null,
  });

  const validateField = (name, value) => {
    switch (name) {
      case "productName":
        if (!value.trim()) {
          return "Product name is required";
        } else if (value.length < 3) {
          return "Product name must be at least 3 characters long";
        }
        return null;

      case "category":
        return !value ? "Please select a category" : null;

      case "brand":
        return !value ? "Please select a brand" : null;

      // case "description":
      //   console.log('description: ',value)
      //   if (!value.trim()) {
      //     return "Description is required";
      //   } else if (value.length < 10) {
      //     return "Description must be at least 10 characters long";
      //   }
      //   // else if (value.length > 500) {
      //   //   return "Description must not exceed 500 characters";
      //   // }
      //   return null;
      default:
        return null;
    }
  };

  const [attributeInputValues, setAttributeInputValues] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [images, setImages] = useState([]);
  const fileInputRef = useRef(null);
  const [invalidImageIndexes, setInvalidImageIndexes] = useState([]); // State for invalid images
  const [mainImage, setMainImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const editorRef = useRef();

  useEffect(() => {
    const fetchData = async () => {
      const categoriesData = await getCategories();
      const brandsData = await getBrands();
      setCategories(categoriesData);
      setBrands(brandsData);
    };
    fetchData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Update form data
    setFormData({ ...formData, [name]: value });

    // Real-time field validation
    const fieldError = validateField(name, value);
    setErrors((prev) => ({
      ...prev,
      [name]: fieldError,
    }));
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;

    // Trim the value on blur
    const trimmedValue = value.trim();

    // Update form data with trimmed value
    setFormData((prev) => ({
      ...prev,
      [name]: trimmedValue,
    }));

    // Validate after trimming
    const fieldError = validateField(name, trimmedValue);
    setErrors((prev) => ({
      ...prev,
      [name]: fieldError,
    }));
  };

  const validateImages = () => {
    if (images.length < 4 || images.length > 6) {
      return "You must upload between 4 and 6 images";
    }

    const invalidImages = images.filter(
      (image) => image.file.size > 2 * 1024 * 1024
    );
    if (invalidImages.length > 0) {
      return "Some images exceed the 2MB size limit";
    }

    return null;
  };

  const validateAttributes = () => {
    if (formData.attributes.length === 0) {
      return "At least one attribute is required";
    }

    const invalidAttributes = formData.attributes.filter(
      (attr) => !attr.name.trim() || attr.values.length === 0
    );

    if (invalidAttributes.length > 0) {
      return "All attributes must have a name and at least one value";
    }

    return null;
  };

  const validateVariants = () => {
    if (formData.variants.length === 0) {
      return "At least one variant is required";
    }

    const invalidVariants = formData.variants.filter(
      (variant) =>
        !variant.price ||
        parseFloat(variant.price) <= 0 ||
        !variant.quantity ||
        parseInt(variant.quantity) < 0
    );

    if (invalidVariants.length > 0) {
      return "All variants must have valid price (> 0) and quantity (≥ 0)";
    }

    return null;
  };

  useEffect(() => {
    setErrors((prev) => ({
      ...prev,
      variants: validateVariants(),
    }));
  }, [formData.variants]);

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
    setInvalidImageIndexes((prevIndexes) =>
      prevIndexes.filter((i) => i !== index)
    );
  };

  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files);
    const newImages = [];
    const invalidIndexes = [];

    selectedFiles.forEach((file) => {
      if (file.size > 2 * 1024 * 1024) {
        // If the file exceeds 2MB
        invalidIndexes.push(newImages.length); // Mark the index of the invalid image
        newImages.push({ file, name: file.name, isLarge: true }); // Indicate that the image is large
      } else {
        newImages.push({ file, name: file.name, isLarge: false });
      }
    });

    // Limit the number of images to 6 and warn if more than 6 are uploaded
    if (newImages.length + images.length > 6) {
      toast.warning("You can only upload a maximum of 6 images.");
      return; // Prevent adding more images
    }

    setImages((prevImages) => {
      const updatedImages = [...prevImages, ...newImages];
      // Only set the main image if the first image is valid
      if (
        updatedImages.length > 0 &&
        updatedImages[0].file.size <= 2 * 1024 * 1024
      ) {
        setMainImage(URL.createObjectURL(updatedImages[0].file));
      } else {
        setMainImage(null); // Clear main image if not valid
      }
      return updatedImages.filter(
        (_, index) => !invalidIndexes.includes(index)
      );
    });

    if (invalidIndexes.length > 0) {
      setInvalidImageIndexes(invalidIndexes); // Store invalid image indexes for warning
    } else {
      setInvalidImageIndexes([]); // Clear invalid indexes if all images are valid
    }
  };

  // addVariant function to add new attribute at the beginning
  const addAttribute = () => {
    setFormData({
      ...formData,
      attributes: [{ name: "", values: [] }, ...formData.attributes],
    });
    setAttributeInputValues(["", ...attributeInputValues]);
  };

  // Clean up variant input value when removing variant
  const removeAttribute = (index) => {
    const newAttributes = formData.attributes.filter((_, i) => i !== index);
    const newAttributeInputValues = attributeInputValues.filter(
      (_, i) => i !== index
    );
    setFormData({ ...formData, attributes: newAttributes });
    setAttributeInputValues(newAttributeInputValues);
  };

  // Function to remove a specific variant
  const removeVariant = (indexToRemove) => {
    const newVariants = formData.variants.filter(
      (_, index) => index !== indexToRemove
    );
    setFormData({ ...formData, variants: newVariants });
  };

  const handleAttributeInputChange = (index, value) => {
    const newAttributeInputValues = [...attributeInputValues];
    newAttributeInputValues[index] = value;

    const attributeError = !value.trim()
      ? "Attribute name cannot be empty"
      : null;

    setAttributeInputValues(newAttributeInputValues);
    setErrors((prev) => ({
      ...prev,
      attributes: attributeError,
    }));
  };

  // Add value to specific variant
  const addValueToAttribute = (attributeIndex) => {
    if (attributeInputValues[attributeIndex]?.trim()) {
      const newAttributes = [...formData.attributes];
      newAttributes[attributeIndex].values = [
        ...newAttributes[attributeIndex].values,
        attributeInputValues[attributeIndex].trim(),
      ];
      setFormData({ ...formData, attributes: newAttributes });

      // Clear only the specific variant's input
      const newAttributeInputValues = [...attributeInputValues];
      newAttributeInputValues[attributeIndex] = "";
      setAttributeInputValues(newAttributeInputValues);
    }
  };

  const removeValueFromAttribute = (attributeIndex, valueIndex) => {
    const newAttributes = [...formData.attributes];
    newAttributes[attributeIndex].values = newAttributes[
      attributeIndex
    ].values.filter((_, i) => i !== valueIndex);
    setFormData({ ...formData, attributes: newAttributes });
  };

  const generateCombinations = (arrays) => {
    if (arrays.length === 0) return [[]];
    const result = [];
    const restCombinations = generateCombinations(arrays.slice(1));
    for (const item of arrays[0]) {
      for (const combination of restCombinations) {
        result.push([item, ...combination]);
      }
    }
    return result;
  };

  useEffect(() => {
    const validAttributes = formData.attributes.filter(
      (v) => v.name && v.values.length > 0
    );
    if (validAttributes.length > 0) {
      const attributeArrays = validAttributes.map((v) => v.values);
      const combinations = generateCombinations(attributeArrays);

      const newVariants = combinations.map((combo) => ({
        name: combo.join(" - "),
        price: "",
        quantity: "",
        attributeCombination: combo,
        attributeDetails: validAttributes.map((attribute, index) => ({
          name: attribute.name,
          value: combo[index],
        })),
      }));

      setFormData((prev) => ({
        ...prev,
        variants: newVariants,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        variants: [],
      }));
    }
  }, [formData.attributes]);

  const validateForm = () => {
    const newErrors = {
      productName: validateField("productName", formData.productName),
      category: validateField("category", formData.category),
      brand: validateField("brand", formData.brand),
      description: validateField("description", formData.description),
      image: validateImages(),
      attributes: validateAttributes(),
      variants: validateVariants(),
    };

    setErrors(newErrors);

    // Check if any errors exist
    return !Object.values(newErrors).some((error) => error !== null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSubmitting) return;
    setIsSubmitting(true);

    // Validate the form
    const isValid = validateForm();
    if (!isValid) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      toast.error("Please correct the errors in the form.");
      setIsSubmitting(false);
      return;
    }

    try {
      // Upload images
      const imageUploadPromises = images.map((image) => {
        const imageId = Math.random().toString(36).substring(2, 8);
        return uploadImage(image.file, formData.productName, imageId)
            .then(uploadedImageUrl => uploadedImageUrl.url);
      });

// Use Promise.all to run all image uploads concurrently
      Promise.all(imageUploadPromises)
          .then((uploadedImageUrls) => {
            // Handle the array of uploaded image URLs here
            console.log("Uploaded Image URLs:", uploadedImageUrls);
            // You can now proceed with other actions that depend on the image URLs
          })
          .catch((error) => {
            console.error("Error uploading images:", error);
          });


      const descriptionUrl = await new Promise((resolve) => {
        if (editorRef.current) {
          console.log("processing url...");
          editorRef.current.uploadToCloudinary(resolve);
        } else {
          resolve(formData.description);
        }
      });

      setFormData((prev) => ({
        ...prev,
        description: descriptionUrl,
      }));

      const uploadedImageUrls = await Promise.all(imageUploadPromises);

      const productData = {
        name: formData.productName,
        price: formData.variants[0]?.price || 0,
        description: descriptionUrl,
        imageUrls: uploadedImageUrls,
        categoryId: formData.category,
        brandId: formData.brand,
        variants: formData.variants.map((variant) => ({
          price: variant.price,
          stockQuantity: variant.quantity,
          attributes: Object.fromEntries(
            variant.attributeDetails.map((detail) => [
              detail.name,
              detail.value,
            ])
          ), // Convert attributeDetails to an object
        })),
      };

      console.log("data before send", productData);
      await createProduct(productData);
      console.log("data after send", productData);

      refreshProducts();
      toast.success("Product saved successfully");
      onClose();
    } catch (error) {
      console.error("Error saving product:", error);
      toast.error("Failed to save product. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed top-0 inset-0 z-20 bg-black bg-opacity-50 py-6 px-4 sm:px-6 lg:px-8 overflow-auto">
      <div className="w-[50%] mx-auto">
        <form
          onSubmit={handleSubmit}
          className="bg-gray-900 shadow-md rounded-lg px-8 pt-4 pb-4"
        >
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold mb-2 text-white">
              Add New Product
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-200"
            >
              <FaX />
            </button>
          </div>
          {/* Name */}
          <div className="mb-3">
            <label
              htmlFor="productName"
              className="block text-gray-400 text-sm font-bold mb-2"
            >
              Product Name <span className="text-red-500 ml-1">*</span>
            </label>
            <input
              type="text"
              id="productName"
              name="productName"
              value={formData.productName}
              onChange={handleInputChange}
              onBlur={handleBlur}
              className="w-full px-3 py-2 bg-gray-700 text-gray-100 placeholder-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              aria-label="Product Name"
            />
            {errors.productName && (
              <p className="text-red-500 text-xs mt-1">{errors.productName}</p>
            )}
          </div>
          {/* Category & Brand */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-3">
            <div>
              <label
                htmlFor="category"
                className="block text-gray-400 text-sm font-bold mb-2"
              >
                Category <span className="text-red-500 ml-1">*</span>
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full px-3 py-2 bg-gray-700 text-gray-100 placeholder-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                aria-label="Category"
              >
                <option value="">Select Category</option>
                {categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </select>
              {errors.category && (
                <p className="text-red-500 text-xs mt-1">{errors.category}</p>
              )}
            </div>
            <div>
              <label
                htmlFor="brand"
                className="block text-gray-400 text-sm font-bold mb-2"
              >
                Brand <span className="text-red-500 ml-1">*</span>
              </label>
              <select
                id="brand"
                name="brand"
                value={formData.brand}
                onChange={handleInputChange}
                className="w-full px-3 py-2 bg-gray-700 text-gray-100 placeholder-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                aria-label="Brand"
              >
                <option value="">Select Brand</option>
                {brands.map((brand) => (
                  <option key={brand._id} value={brand._id}>
                    {brand.name}
                  </option>
                ))}
              </select>
              {errors.brand && (
                <p className="text-red-500 text-xs mt-1">{errors.brand}</p>
              )}
            </div>
          </div>
          {/* Description */}
          <div className="mb-3">
            <label
              htmlFor="description"
              className="block text-gray-400 text-sm font-bold mb-2"
            >
              Description <span className="text-red-500 ml-1">*</span>
            </label>
            <RichTextEditor
              ref={editorRef}
              fileName={formData.productName}
              docxUrl={""}
              descriptionUrl={formData.description}
              rows="4"
              className="w-full px-3 py-2 bg-gray-700 text-gray-100 placeholder-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              aria-label="Description"
            />

            {errors.description && (
              <p className="text-red-500 text-xs mt-1">{errors.description}</p>
            )}
          </div>
          {/* Image */}
          <div className="mb-3">
            <label className="block text-gray-400 text-sm font-bold mb-2">
              Product Image <span className="text-red-500 ml-1">*</span>
            </label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 bg-gray-700 rounded-md">
              <div className="space-y-1 text-center">
                {mainImage ? (
                  <>
                  </>
                ) : (
                  <div className="flex flex-col items-center">
                    <FiUpload className="mx-auto h-9 w-9 text-gray-200" />
                    <p className="text-gray-300">
                      Upload a file or drag and drop
                    </p>
                  </div>
                )}
                <div className="grid grid-cols-3 gap-4">
                  {/* List of images */}
                  {images.map((image, index) => {
                    // Check if the image object exists
                    if (!image || !image.file) {
                      return null; // Skip this image if it's invalid
                    }

                    // Get image size in MB for display (rounded to 2 decimal places)
                    const imageSize = (image.file.size / 1048576).toFixed(2); // Size in MB

                    return (
                      <div className="">
                        <div key={index} className="">
                          <div className="relative">
                            <img
                              src={URL.createObjectURL(image.file)}
                              alt="Thumbnail"
                              className={`w-20 h-20 md:w-28 md:h-28 border border-gray-300 rounded-md cursor-pointer object-cover ${invalidImageIndexes.includes(index)
                                ? "border-red-500"
                                : ""
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
                          {/* Image size display next to the thumbnail in MB */}
                          <span className="text-sm text-gray-500">
                            {imageSize} MB{" "}
                            {image.isLarge && (
                              <span className="text-red-500">(Too large)</span>
                            )}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>

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
                <label
                  htmlFor="image"
                  className="cursor-pointer inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Choose file
                </label>
              </div>
            </div>

            {errors.image && (
              <p className="text-red-500 text-xs mt-1">{errors.image}</p>
            )}
          </div>
          {/* Attribute */}
          <div className="mb-3">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-100">Attribute</h3>
              <button
                type="button"
                onClick={addAttribute}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 focus:ring-offset-gray-800"
              >
                <FiPlus className="mr-2" /> Add Attribute
              </button>
            </div>
            {formData.attributes.map((attribute, attributeIndex) => (
              <div
                key={attributeIndex}
                className="mb-6 p-4 border border-gray-700 rounded-lg bg-gray-750"
              >
                <div className="flex gap-4 mb-4">
                  <input
                    type="text"
                    placeholder="Attribute Name (e.g., Color)"
                    value={attribute.name}
                    disabled={attribute.values.length > 0}
                    onChange={(e) => {
                      const newAttributes = [...formData.attributes];
                      newAttributes[attributeIndex].name = e.target.value;
                      setFormData({ ...formData, attributes: newAttributes });
                    }}
                    className="w-48 md:flex-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-100 placeholder-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                  <button
                    type="button"
                    onClick={() => removeAttribute(attributeIndex)}
                    className="p-2 text-red-400 hover:text-red-300"
                  >
                    <FiTrash2 size={20} />
                  </button>
                </div>

                <div className="flex flex-wrap gap-2 mb-3">
                  {attribute.values.map((value, valueIndex) => (
                    <span
                      key={valueIndex}
                      className="inline-flex items-center px-3 py-1 bg-indigo-900 text-indigo-100 rounded-lg text-sm transition-all duration-200 hover:bg-indigo-800"
                    >
                      {value}
                      <button
                        type="button"
                        onClick={() =>
                          removeValueFromAttribute(attributeIndex, valueIndex)
                        }
                        className="ml-2 text-indigo-300 hover:text-indigo-200 focus:outline-none"
                      >
                        <FiX size={14} />
                      </button>
                    </span>
                  ))}
                </div>

                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Add new value"
                    value={attributeInputValues[attributeIndex] || ""}
                    onChange={(e) =>
                      handleAttributeInputChange(attributeIndex, e.target.value)
                    }
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        addValueToAttribute(attributeIndex);
                      }
                    }}
                    className="w-44 md:flex-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-100 placeholder-gray-400"
                  />
                  <button
                    type="button"
                    onClick={() => addValueToAttribute(attributeIndex)}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-800"
                  >
                    Add
                  </button>
                </div>
              </div>
            ))}
            {errors.attributes && (
              <p className="text-red-500 text-xs mt-1">{errors.attributes}</p>
            )}
          </div>
          {/* Variants */}
          {formData.variants.length > 0 && (
            <div className="mb-3">
              <h3 className="text-lg font-medium mb-4 text-gray-100">
                Variants
              </h3>
              <div className="space-y-4">
                {formData.variants.map((variant, index) => (
                  <div
                    key={index}
                    className="p-4 bg-gray-750 border border-gray-700 rounded-lg"
                  >
                    <div className="md:flex md:justify-between gap-3">
                      <div className="max-md:mb-4 flex flex-wrap gap-2">
                        {variant.attributeDetails.map((detail, detailIndex) => (
                          <span
                            key={detailIndex}
                            className="inline-flex items-center px-3 py-1 bg-gray-700 text-gray-200 rounded-md text-sm"
                          >
                            <span className="font-medium text-indigo-400">
                              {detail.name}:
                            </span>
                            <span className="ml-2">{detail.value}</span>
                          </span>
                        ))}
                      </div>
                      <div className="flex gap-4 items-center">
                        <input
                          type="number"
                          placeholder="Price"
                          value={variant.price}
                          onChange={(e) => {
                            const newVariants = [...formData.variants];
                            newVariants[index].price = e.target.value;
                            setFormData({ ...formData, variants: newVariants });
                          }}
                          className="w-20 px-2 md:w-28 md:px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-100 placeholder-gray-400 appearance-none"
                        />
                        <input
                          type="number"
                          placeholder="Quantity"
                          value={variant.quantity}
                          onChange={(e) => {
                            const newVariants = [...formData.variants];
                            newVariants[index].quantity = e.target.value;
                            setFormData({ ...formData, variants: newVariants });
                          }}
                          className="w-20 px-2 md:w-28 md:px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-100 placeholder-gray-400"
                        />
                        <button
                          type="button"
                          onClick={() => removeVariant(index)}
                          className="p-2 text-red-400 hover:text-red-300 focus:outline-none ml-auto"
                        >
                          <FiTrash2 size={20} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {errors.variants && (
                <p className="text-red-500 text-xs mt-1">{errors.variants}</p>
              )}
            </div>
          )}
          {/* Button */}
          <div className="flex justify-end">
            <button
              onClick={onClose}
              className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded mr-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {isSubmitting ? "Saving..." : "Add Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
