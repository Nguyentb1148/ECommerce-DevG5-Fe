import { useState, useEffect, useRef } from "react";
import { FaX } from "react-icons/fa6";
import { getCategories } from "../../services/api/CategoryApi";
import { getBrands } from "../../services/api/BrandsApi";
import { createProduct } from "../../services/api/ProductApi";
import { uploadImage } from "../../configs/Cloudinary";
import { toast } from "react-toastify";
import RichTextEditor from "../../components/section/RichTextEditor.jsx";
import AttributeSection from "../section/AttributeSection";
import VariantSection from "../section/VariantSection";
import InputSection from "../section/InputSection";
import SelectSection from "../section/SelectSection";
import ImageSection from "../section/ImageSection";

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
      default:
        return null;
    }
  };

  const [attributeInputValues, setAttributeInputValues] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [images, setImages] = useState([]);
  const fileInputRef = useRef(null);
  const [invalidImageIndexes, setInvalidImageIndexes] = useState([]);
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


  const handleImageDelete = (index) => {
    setImages((prevImages) => {
      const updatedImages = prevImages.filter((_, i) => i !== index);
      return updatedImages;
    });

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
        // Flag image as too large, but still add it to the newImages list
        newImages.push({ file, name: file.name, isLarge: true });
        invalidIndexes.push(newImages.length - 1); // Store the index of the large image
      } else {
        // Add valid images normally
        newImages.push({ file, name: file.name, isLarge: false });
      }
    });

    // Ensure total number of images does not exceed the limit (6 in this case)
    if (newImages.length + images.length > 6) {
      toast.warning("You can only upload a maximum of 6 images.");
      return;
    }

    // Update images state with all images, including large ones
    setImages((prevImages) => {
      const updatedImages = [...prevImages, ...newImages];
      return updatedImages; // Don't filter out large images
    });

    // Set invalid image indexes for large images, for UI display
    setInvalidImageIndexes(invalidIndexes);
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
        return uploadImage(image.file, formData.productName, imageId).then(
            (uploadedImageUrl) => uploadedImageUrl.url
        );
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
          <form onSubmit={handleSubmit} className="bg-gray-900 shadow-md rounded-lg px-8 pt-4 pb-4">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold mb-2 text-white"> Add New Product </h2>
              <button onClick={onClose} className="text-gray-400 hover:text-gray-200">
                <FaX />
              </button>
            </div>
            {/* Name */}
            <InputSection
                label="Product Name"
                name="productName"
                value={formData.productName}
                onChange={handleInputChange}
                onBlur={handleBlur}
                error={errors.productName}
                placeholder="Enter product name"
            />
            {/* Category & Brand */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-3">
              <SelectSection
                  label="Category"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  options={categories}
                  error={errors.category}
                  placeholder="Select Category"
              />
              <SelectSection
                  label="Brand"
                  name="brand"
                  value={formData.brand}
                  onChange={handleInputChange}
                  options={brands}
                  error={errors.brand}
                  placeholder="Select Brand"
              />
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
            <ImageSection
                images={images}
                setImages={setImages}
                invalidImageIndexes={invalidImageIndexes}
                setInvalidImageIndexes={setInvalidImageIndexes}
                errors={errors}
                fileInputRef={fileInputRef}
                handleImageDelete={handleImageDelete}
                handleFileChange={handleFileChange}
            />
            {/* Attribute Section */}
            <AttributeSection
                formData={formData}
                setFormData={setFormData}
                errors={errors}
                attributeInputValues={attributeInputValues}
                setAttributeInputValues={setAttributeInputValues}
                handleAttributeInputChange={handleAttributeInputChange}
                addValueToAttribute={addValueToAttribute}
                removeAttribute={removeAttribute}
                removeValueFromAttribute={removeValueFromAttribute}
                addAttribute={addAttribute}
                isEdit={false}
            />
            {/* Variant Section */}
            <VariantSection
                formData={formData}
                setFormData={setFormData}
                errors={errors}
                removeVariant={removeVariant}
            />
            {/* Button */}
            <div className="flex justify-end">
              <button onClick={onClose} className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded mr-2"> Cancel </button>
              <button type="submit" disabled={isSubmitting} className="px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                {isSubmitting ? "Saving..." : "Add Product"}
              </button>
            </div>
          </form>
        </div>
      </div>
  );
};

export default AddProduct;