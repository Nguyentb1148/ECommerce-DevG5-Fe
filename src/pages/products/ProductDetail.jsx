import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ProductSlider from "./ProductSlider";

import { FaShoppingCart } from "react-icons/fa";
import { getProductById } from "../../services/api/ProductApi"; // Adjust the import according to your project structure
import { AddToCart } from "../../services/api/CartApi";
import Navbar from "../../components/navbar/Navbar";
import { Sidebar } from "lucide-react";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [cart, setCart] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedVariant, setSelectedVariant] = useState("");
  const [selectedPrice, setSelectedPrice] = useState(0);

  useEffect(() => {
    console.log("Product ID from URL:", id); // Log the ID to check if it's being retrieved correctly

    if (!id) {
      console.error("Product ID is undefined");
      return;
    }

    const fetchProduct = async () => {
      try {
        const productData = await getProductById(id);
        setProduct(productData);
        setSelectedColor(productData.variants[0].attributes.color);
        setSelectedVariant(productData.variants[0].attributes.option);
        setSelectedPrice(productData.variants[0].price);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };
    fetchProduct();
  }, [id]);

  const toggleModal = () => setIsModalOpen(!isModalOpen);
  const toggleReviewModal = () => setIsReviewModalOpen(!isReviewModalOpen);

  const handleColorClick = (color) => {
    setSelectedColor(color);
    updatePrice(color, selectedVariant);
  };

  const handleVariantClick = (variant) => {
    setSelectedVariant(variant);
    updatePrice(selectedColor, variant);
  };

  const updatePrice = (color, variant) => {
    const selectedProduct = product.variants.find(
      (v) => v.attributes.color === color && v.attributes.option === variant
    );
    if (selectedProduct) {
      setSelectedPrice(selectedProduct.price);
    }
  };

  const handleAddToCart = async () => {
    const selectedVariantData = product.variants.find(
      (v) =>
        v.attributes.color === selectedColor &&
        v.attributes.option === selectedVariant
    );

    if (!selectedVariantData || selectedVariantData.stockQuantity < quantity) {
      alert("Not enough stock available!");
      return;
    }

    console.log("Product: --------->", product);
    console.log("Selected varriant: --------->", selectedVariantData);

    const cartData = {
      productId: product._id,
      variantId: selectedVariantData._id,
      count: quantity,
    };

    try {
      await AddToCart(cartData);
      alert("Product added to cart!");
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert("Failed to add product to cart.");
    }
  };

  const handleQuantityChange = (amount) => {
    const newQuantity = Math.max(1, quantity + amount);
    if (
      selectedVariantData &&
      newQuantity <= selectedVariantData.stockQuantity
    ) {
      setQuantity(newQuantity);
    }
  };
  const handleQuantityInputChange = (e) => {
    let newQuantity = Number(e.target.value);
    if (newQuantity === 0) {
      newQuantity = 0;
    } else {
      newQuantity = Math.max(
        1,
        Math.min(
          selectedVariantData ? selectedVariantData.stockQuantity : 1,
          newQuantity
        )
      );
    }
    setQuantity(newQuantity);
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  const fallbackImage = "https://via.placeholder.com/150"; // Fallback image URL

  // Get unique colors and variants
  const uniqueColors = [
    ...new Set(product.variants.map((variant) => variant.attributes.color)),
  ];
  const uniqueVariants = [
    ...new Set(product.variants.map((variant) => variant.attributes.option)),
  ];

  const selectedVariantData = product.variants.find(
    (v) => v.attributes.option === selectedVariant
  );

  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen">
      <Navbar />
      <Sidebar />
      <div className="max-w-7xl mx-auto p-4">
        {/* Main Content */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {/* Left Section - Product Images */}
            <div>
              <ProductSlider
                images={product.imageUrls.map((url) => url || fallbackImage)}
              />
            </div>
            {/* Right Section - Product Details */}
            <div>
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold dark:text-white">
                {product.name}
              </h1>
              <div className="mt-4">
                <p className="text-gray-600 dark:text-gray-400">
                  Thương hiệu: {product.brandId.name}
                </p>
              </div>
              <div className="mt-4">
                <span className="text-gray-600 dark:text-gray-400">
                  Màu sắc:
                </span>
                <div className="flex gap-4 mt-2">
                  {uniqueColors.map((color) => (
                    <button
                      key={color}
                      className={`px-2 sm:px-4 py-1 sm:py-2 border rounded ${
                        selectedColor === color
                          ? "bg-gray-800 text-white"
                          : "bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                      }`}
                      onClick={() => handleColorClick(color)}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
              <div className="mt-4">
                <span className="text-gray-600 dark:text-gray-400">
                  Variant:
                </span>
                <div className="flex gap-4 mt-2">
                  {uniqueVariants.map((variant) => (
                    <button
                      key={variant}
                      className={`px-2 sm:px-4 py-1 sm:py-2 border rounded ${
                        selectedVariant === variant
                          ? "bg-gray-800 text-white"
                          : "bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                      }`}
                      onClick={() => handleVariantClick(variant)}
                    >
                      {variant}
                    </button>
                  ))}
                </div>
                {selectedVariantData && (
                  <span className="text-gray-600 dark:text-gray-400 mt-1">
                    Số lượng còn kho: {selectedVariantData.stockQuantity}
                  </span>
                )}
              </div>
              <div className="mt-4 flex gap-3 items-center">
                <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded overflow-hidden">
                  <input
                    type="number"
                    className="w-13 text-center"
                    value={quantity}
                    onChange={(e) => handleQuantityInputChange(e)}
                    min="1"
                    max={
                      selectedVariantData
                        ? selectedVariantData.stockQuantity
                        : 1
                    }
                  />
                </div>
                <button className="bg-red-500 text-white px-4 sm:px-6 py-2 rounded">
                  Buy Now
                </button>
                <button
                  onClick={handleAddToCart}
                  className="bg-blue-500 text-white px-4 sm:px-6 py-2 rounded flex items-center"
                >
                  <FaShoppingCart className="mr-2" />
                  Thêm vào giỏ hàng
                </button>
              </div>
              <div className="mt-4">
                <p className="text-red-600 text-lg sm:text-2xl lg:text-3xl font-semibold">
                  ${selectedPrice * quantity}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-6">
          {/* Features Section */}
          <div className="col-span-1 lg:col-span-3 bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-lg shadow-sm">
            <h2 className="text-lg sm:text-xxl font-semibold mb-4 dark:text-white text-center">
              Đặc Điểm Nổi Bật
            </h2>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
              {product.description &&
                product.description
                  .split("\n")
                  .map((line, index) => <li key={index}>{line}</li>)}
            </ul>
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-12">
          <h2 className="text-lg sm:text-xl font-semibold mb-4 dark:text-white">
            Related Products
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
            {Array(12)
              .fill(null)
              .map((_, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-2 sm:p-4"
                >
                  <img
                    src="https://via.placeholder.com/200"
                    alt={`Product ${index + 1}`}
                    className="w-full rounded"
                  />
                  <p className="text-gray-700 dark:text-gray-300 mt-2 text-sm">
                    Laptop Model {index + 1}
                  </p>
                  <p className="text-red-600 text-lg font-semibold">
                    $1,999.99
                  </p>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
