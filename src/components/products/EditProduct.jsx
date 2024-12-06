import  { useEffect, useState, useRef } from "react";
import { FaX } from "react-icons/fa6";
import {getProductById, updateProduct} from "../../services/api/ProductApi.jsx";
import { getCategories } from "../../services/api/CategoryApi";
import { getBrands } from "../../services/api/BrandsApi";
import {handleImageUpload} from "../../configs/Cloudinary";
import { toast } from "react-toastify";
import RichTextEditor from "../section/RichTextEditor.jsx";
import AttributeSection from "../section/AttributeSection";
import VariantSection from "../section/VariantSection";
import InputSection from "../section/InputSection";
import SelectSection from "../section/SelectSection";
import ImageSection from "../section/ImageSection";

const EditProduct = ({ onClose, refreshProducts, productId }) => {
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

  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [images, setImages] = useState([]);
  const fileInputRef = useRef(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const editorRef = useRef();
  const [attributeInputValues, setAttributeInputValues] = useState([]);
  const [invalidImageIndexes, setInvalidImageIndexes] = useState([]);

  //check value was change or not
  const prevNameRef = useRef(formData.productName); // Ref to track previous name
  const prevCategoryRef = useRef(formData.category);  // Ref for category
  const prevBrandRef = useRef(formData.brand);        // Ref for brand


  //alert attribute
  const [showAttributes, setShowAttributes] = useState(false); // State for controlling visibility of attributes

  const handleShowAttributes = () => {
    if (showAttributes) {
      // Hide attribute section
      setShowAttributes(false);
    } else {
      // Show attribute section with confirmation
      const userConfirmed = window.confirm(
          "If you change the attributes, all the prices and quantities of the variants will be removed. Do you want to continue?"
      );

      if (userConfirmed) {
        setShowAttributes(true); // Show the attributes section if user confirms
      }
    }
  };


  useEffect(() => {
    const loadData = async () => {
      const categoriesData = await getCategories();
      const brandsData = await getBrands();
      setCategories(categoriesData);
      setBrands(brandsData);
      await fetchData();
    };
    loadData();
  }, [productId]);

  const fetchData = async () => {
    try {
      const productData = await getProductById(productId);
      console.log("Fetched product data:", productData); // Log the product data

      const attributeData = getAttributesFromVariants(productData.variants);

      const variantsData = productData.variants.map((variant) => ({
        price: variant.price,
        quantity: variant.stockQuantity,
        attributeDetails: Object.keys(variant.attributes).map((key) => ({
          name: key,
          value: variant.attributes[key],
        })),
      }));

      // Fetch images from imageUrls array and convert to Blobs
      const imageBlobs = await Promise.all(
          productData.imageUrls.map(async (imageUrl) => {
            try {
              const response = await fetch(imageUrl, {
                method: "GET",
                cache: "force-cache",  // This forces the browser to fetch from the cache
              });

              if (response.ok) {
                const imageBlob = await response.blob();
                return URL.createObjectURL(imageBlob); // Convert blob to URL and return it
              } else {
                throw new Error("Image not found or cached");
              }
            } catch (err) {
              console.error("Error fetching image from cache or the image is deleted.", err);
              return null; // Return null if image fetch fails
            }
          })
      );

      // Set the fetched image URLs into the state (filter out null values)
      setImages(imageBlobs.filter((url) => url !== null));
      // Set other form data
      setFormData({
        ...formData,
        productName: productData.name,
        description: productData.description,
        category: productData.categoryId._id, // Set category from product data
        brand: productData.brandId._id, // Set brand from product data
        attributes: attributeData, // Add the attributes into the form data
        variants: variantsData,
      });

    } catch (error) {
      console.error("Error fetching product data:", error);
    }
  };

  const getAttributesFromVariants = (variants) => {
    const attributeData = [];

    variants.forEach(variant => {
      const attributes = variant.attributes;

      // Iterate through each attribute in the variant
      for (let key in attributes) {
        // Check if the attribute already exists in the array
        let attribute = attributeData.find(attr => attr.name === key);

        // If the attribute doesn't exist, add it
        if (!attribute) {
          attributeData.push({
            name: key, // Use 'name' instead of 'key'
            values: [attributes[key]]
          });
        } else {
          // If it exists, add the value if it's not already present
          if (!attribute.values.includes(attributes[key])) {
            attribute.values.push(attributes[key]);
          }
        }
      }
    });

    return attributeData;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "productName" && prevNameRef.current !== value) {
      console.log(`Product Name Changed:`);
      console.log(`Old Name: ${prevNameRef.current}`);
      console.log(`New Name: ${value}`);
      prevNameRef.current = value; // Update the previous value
    }
    // Check for category change
    if (name === "category" && prevCategoryRef.current !== value) {
      console.log(`Category Changed:`);
      console.log(`Old Category: ${prevCategoryRef.current}`);
      console.log(`New Category: ${value}`);
      prevCategoryRef.current = value; // Update the previous category value
    }

    // Check for brand change
    if (name === "brand" && prevBrandRef.current !== value) {
      console.log(`Brand Changed:`);
      console.log(`Old Brand: ${prevBrandRef.current}`);
      console.log(`New Brand: ${value}`);
      prevBrandRef.current = value; // Update the previous brand value
    }
    setFormData({ ...formData, [name]: value });

    const fieldError = validateField(name, value);
    setErrors((prev) => ({
      ...prev,
      [name]: fieldError,
    }));
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    const trimmedValue = value.trim();

    setFormData((prev) => ({
      ...prev,
      [name]: trimmedValue,
    }));

    const fieldError = validateField(name, trimmedValue);
    setErrors((prev) => ({
      ...prev,
      [name]: fieldError,
    }));
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);

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
        // Check if the image is an object (file object) or a URL (string)
        if (typeof image === 'object' && image.file) {
          const imageId = Math.random().toString(36).substring(2, 8);
          // Upload file using handleImageUpload
          return handleImageUpload(image.file, formData.productName, imageId).then(
              (uploadedImageUrl) => uploadedImageUrl.url
          );
        } else {
          // It's a URL, so no need to upload it
          return Promise.resolve(image); // Just resolve the URL as is
        }
      });

      const uploadedImageUrls = await Promise.all(imageUploadPromises);

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

      //Call API to update the product
      const response= await updateProduct(productId,productData);
      console.log("data after send", response);

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

    return !Object.values(newErrors).some((error) => error !== null);
  };

  const validateImages = () => {
    if (images.length < 4 || images.length > 6) {
      return "You must upload between 4 and 6 images";
    }
    return null;
  };

  const validateAttributes = () => {
    if (formData.attributes.length === 0) {
      return "At least one attribute is required";
    }
    return null;
  };

  const validateVariants = () => {
    if (formData.variants.length === 0) {
      return "At least one variant is required";
    }
    return null;
  };

  return (
      <div className="fixed top-0 inset-0 z-20 bg-black bg-opacity-50 py-6 px-4 sm:px-6 lg:px-8 overflow-auto">
        <div className="w-[50%] mx-auto">
          <form onSubmit={handleSubmit} className="bg-gray-900 shadow-md rounded-lg px-8 pt-4 pb-4">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold mb-2 text-white"> Edit Product </h2>
              <button onClick={onClose} className="text-gray-400 hover:text-gray-200">
                <FaX />
              </button>
            </div>

            {/* Product Name */}
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
              <label htmlFor="description" className="block text-gray-400 text-sm font-bold mb-2">
                Description <span className="text-red-500 ml-1">*</span>
              </label>
              <RichTextEditor
                  ref={editorRef}
                  fileName={formData.productName}
                  docxUrl={formData.description}
                  descriptionUrl={formData.description}
                  rows="4"
                  className="w-full px-3 py-2 bg-gray-700 text-gray-100 placeholder-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
              />
              {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
            </div>
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

            {/* Button to Show Attribute Section */}
            <div className="mb-4 text-center">
              <button
                  type="button"
                  className="text-blue-600 hover:text-blue-800"
                  onClick={handleShowAttributes}
              >
                {showAttributes ? "Hide Attribute" : "Show Attribute"}
              </button>
            </div>

            {/* Attributes Section */}
            {showAttributes && (
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
                />
            )}
            {/* Variants Section */}
            <VariantSection
                formData={formData}
                setFormData={setFormData}
                errors={errors}
                removeVariant={removeVariant}
            />
            {/* Image Section */}


            {/* Submit Button */}
            <div className="mt-5 text-center">
              <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50"
              >
                {isSubmitting ? "Updating..." : "Update Product"}
              </button>
            </div>
          </form>
        </div>
      </div>
  );
};

export default EditProduct;
