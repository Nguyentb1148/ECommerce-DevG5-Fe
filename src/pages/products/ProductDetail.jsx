import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ProductSlider from "../../components/products/ProductSlider";
import Navbar from "../../components/navbar/Navbar";
import { FaShoppingCart, FaAngleUp, FaAngleDown } from "react-icons/fa";
import { getProductById } from "../../services/api/ProductApi";
import { AddToCart } from "../../services/api/CartApi.jsx";
import mammoth from "mammoth";
import { toast, ToastContainer } from "react-toastify";
import { FiMinus, FiPlus } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import ProductReviews from "../../components/products/ProductReviews";
import LoadingSpinner from "../../components/loading/LoadingSpinner"
const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState({});
  const [selectedPrice, setSelectedPrice] = useState(0);
  const [selectedStock, setSelectedStock] = useState(0);
  const [cartCount, setCartCount] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [descriptionContent, setDescriptionContent] = useState(""); // State for description content
  const [isExpanded, setIsExpanded] = useState(false); 

  const handleShowMore = () => {
    setIsExpanded(!isExpanded); 
  };
  useEffect(() => {
    if (!id) return;
    const fetchProduct = async () => {
      try {
        const productData = await getProductById(id);
        setProduct(productData);
        setSelectedVariant(productData.variants[0].attributes); // Set the first variant's attributes by default
        setSelectedPrice(productData.variants[0].price);
        setSelectedStock(productData.variants[0].stockQuantity); // Set the first variant's stock quantity by default
        // If product description is a URL (and points to a Word document), fetch and parse it using Mammoth
        if (
          productData.description &&
          productData.description.startsWith("http")
        ) {
          const response = await fetch(productData.description);
          if (response.ok) {
            const arrayBuffer = await response.arrayBuffer();
            mammoth
              .convertToHtml({ arrayBuffer })
              .then((result) => {
                setDescriptionContent(result.value); // Set the HTML content from the Word document
              })
              .catch((error) => {
                console.error("Error converting .docx file:", error);
                setDescriptionContent(
                  "<p>Failed to load description content.</p>"
                );
              });
          } else {
            console.error("Failed to fetch description content.");
          }
        } else {
          setDescriptionContent(productData.description || "");
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };
    fetchProduct();
  }, [id]);
  const handleVariantClick = (key, value) => {
    const updatedVariant = { ...selectedVariant, [key]: value };
    setSelectedVariant(updatedVariant);
    updateVariantData(updatedVariant);
  };
  const updateVariantData = (updatedVariant) => {
    const selectedVariantData = product.variants.find((v) =>
      Object.entries(updatedVariant).every(
        ([key, value]) => v.attributes[key] === value
      )
    );
    if (selectedVariantData) {
      setSelectedPrice(selectedVariantData.price);
      setSelectedStock(selectedVariantData.stockQuantity);
    }
  };
  const handleAddToCart = async () => {
    const selectedVariantData = product.variants.find((v) =>
      Object.entries(selectedVariant).every(
        ([key, value]) => v.attributes[key] === value
      )
    );
    if (!selectedVariantData || selectedVariantData.stockQuantity < quantity) {
      toast.warning("Not enough stock available!");
      return;
    }
    const cartData = {
      productId: product._id,
      variantId: selectedVariantData._id,
      count: quantity,
    };
    try {
      setIsAnimating(true);
      await AddToCart(cartData);
      setTimeout(() => {
        setIsAnimating(false);
        setCartCount(prev => prev + quantity);
        toast.success("Product added to cart!");
      }, 500);
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error("Failed to add product to cart.");
    }
  };
  const handleQuantityChange = (amount) => {
    // Calculate new quantity based on current quantity and amount (increase or decrease)
    const newQuantity = Math.max(1, Math.min(quantity + amount, selectedStock)); // Ensure quantity doesn't go below 1 and exceeds stock
    setQuantity(newQuantity);
  };
  if (!product) {
    return <div className="w-full h-screen pt-32 bg-gray-900">
    <LoadingSpinner/>
    </div>;
  }
  const fallbackImage = "https://via.placeholder.com/150"; // Fallback image URL
  // Get unique attribute keys
  const attributeKeys = [
    ...new Set(
      product.variants.flatMap((variant) => Object.keys(variant.attributes))
    ),
  ];
  return (
    <>
      <div className="bg-gray-900 min-h-screen">
        <Navbar cartCount={cartCount} />
        <div className="max-w-7xl mx-auto p-4">
          <div className="bg-gray-800 p-6 rounded-lg shadow-sm">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {/* Left Section - Product Images */}
              <div>
                <ProductSlider
                  images={product.imageUrls.map((url) => url || fallbackImage)}
                />
              </div>
              {/* Right Section - Product Details */}
              <div>
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white">
                  {product.name}
                </h1>
                {/* Display dynamic attribute keys */}
                {attributeKeys.map((key) => (
                  <div key={key} className="mt-4">
                    <span className="text-gray-400 font-medium">{key}:</span>
                    <div className="flex gap-4 mt-2">
                      {product.variants
                        .map((variant) => variant.attributes[key])
                        .filter(
                          (value, index, self) => self.indexOf(value) === index
                        ) // Remove duplicates
                        .map((value) => (
                          <button
                            key={value}
                            className={`px-2 sm:px-4 py-1 sm:py-2 border border-gray-600 rounded-lg hover:bg-gray-700 ${selectedVariant[key] === value
                              ? "bg-gray-700 text-white"
                              : "bg-gray-800 text-gray-200"
                              }`}
                            onClick={() => handleVariantClick(key, value)}
                          >
                            {value}
                          </button>
                        ))}
                    </div>
                  </div>
                ))}
                {selectedVariant && (
                  <div className="mt-4">
                    <span className="text-gray-400 font-medium">
                      Số lượng còn kho: {selectedStock || 0}
                    </span>
                  </div>
                )}
                <div className="mt-4 flex gap-3 items-center">
                  <div className="flex items-center space-x-2 bg-gray-700 rounded-lg p-1">
                    <button
                      className="p-1 text-gray-400 hover:text-white"
                      disabled={quantity <= 1}
                      onClick={() => handleQuantityChange(-1)}
                    >
                      <FiMinus />
                    </button>
                    <span className="text-white px-2 ">{quantity}</span>
                    <button
                      className="p-1 text-gray-400 hover:text-white"
                      onClick={() => handleQuantityChange(+1)}
                    >
                      <FiPlus />
                    </button>
                  </div>
                  <button
                    onClick={handleAddToCart}
                    className="btn-add flex items-center"
                  >
                    <FaShoppingCart className="mr-2" />
                    Add to card
                  </button>
                  <AnimatePresence>
                    {isAnimating && (
                      <motion.div
                        initial={{ scale: 1, x: 0, y: 0 }}
                        animate={{
                          scale: 0.5,
                          x: window.innerWidth - 100,
                          y: -window.innerHeight + 100,
                        }}
                        exit={{ scale: 0 }}
                        transition={{ duration: 1 }}
                        className="fixed z-50"
                        style={{ left: "20%", top: "50%" }}
                      >
                        <img
                          src={product.imageUrls[0]}
                          alt="Flying product"
                          className="w-20 h-20 z-50 object-cover rounded-lg"
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                <div className="mt-4">
                  <p className="text-white text-lg sm:text-2xl lg:text-3xl font-semibold">
                    {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(selectedPrice * quantity)}
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* Description Section */}
          <div className="mt-6 bg-gray-800 p-4 sm:p-6 rounded-lg shadow-sm">
            <h2 className="text-lg sm:text-3xl font-semibold mb-4 text-white text-center">
              Mô Tả Sản Phẩm
            </h2>
            {/* Display parsed Word document content */}
            <div
              className={`text-gray-300 description ${isExpanded ? 'h-full' : 'max-h-72'} overflow-hidden`}
              dangerouslySetInnerHTML={{ __html: descriptionContent }}
            />
            <div className="flex justify-center">
              <button
                onClick={handleShowMore}
                className=" p-2 text-xl font-medium text-gray-100 rounded-md focus:outline-none transition-all"
              >
                {isExpanded ? <><FaAngleUp /></> : <><FaAngleDown /></>}
              </button>
            </div>
          </div>
          {/* Product Reviews Section */}
          <div className="mt-6 bg-gray-800 p-4 sm:p-6 rounded-lg shadow-sm">
            <h2 className="text-lg sm:text-xl font-semibold mb-4 text-white text-center">
              Đánh Giá Sản Phẩm
            </h2>
            <ProductReviews productId={id} /> 
          </div>
        </div>
      </div>
      <ToastContainer className="mt-12" />
      </>
  );
};
export default ProductDetail;