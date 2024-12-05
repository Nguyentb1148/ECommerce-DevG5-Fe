import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ProductSlider from "../../components/products/ProductSlider";
import Navbar from "../../components/navbar/Navbar";
import { FaShoppingCart } from "react-icons/fa";
import { getProductById } from "../../services/api/ProductApi";
import { AddToCart } from "../../services/api/CartApi";
import mammoth from "mammoth"; // Import Mammoth.js
import { toast, ToastContainer } from "react-toastify";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [cart, setCart] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState({});
  const [selectedPrice, setSelectedPrice] = useState(0);
  const [selectedStock, setSelectedStock] = useState(0);
  const [descriptionContent, setDescriptionContent] = useState(""); // State for description content

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

  const toggleModal = () => setIsModalOpen(!isModalOpen);
  const toggleReviewModal = () => setIsReviewModalOpen(!isReviewModalOpen);

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
      await AddToCart(cartData);
      toast.success("Product added to cart!");
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error("Failed to add product to cart.");
    }
  };

  const handleQuantityChange = (amount) => {
    const newQuantity = Math.max(1, quantity + amount);
    setQuantity(newQuantity);
  };

  const handleQuantityInputChange = (e) => {
    let newQuantity = Number(e.target.value);
    newQuantity = Math.max(1, Math.min(selectedStock || 1, newQuantity));
    setQuantity(newQuantity);
  };

  if (!product) {
    return <div>Loading...</div>;
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
        <Navbar />
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
                    <span className="text-gray-400">{key}:</span>
                    <div className="flex gap-4 mt-2">
                      {product.variants
                        .map((variant) => variant.attributes[key])
                        .filter(
                          (value, index, self) => self.indexOf(value) === index
                        ) // Remove duplicates
                        .map((value) => (
                          <button
                            key={value}
                            className={`px-2 sm:px-4 py-1 sm:py-2 border rounded ${
                              selectedVariant[key] === value
                                ? "bg-gray-800 text-white"
                                : "bg-gray-700 text-gray-200"
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
                    <span className="text-gray-400">
                      Số lượng còn kho: {selectedStock || 0}
                    </span>
                  </div>
                )}

                <div className="mt-4 flex gap-3 items-center">
                  <div className="flex items-center border border-gray-600 rounded overflow-hidden">
                    <input
                      type="number"
                      className="w-13 text-center"
                      value={quantity}
                      onChange={handleQuantityInputChange}
                      min="1"
                      max={selectedStock || 1}
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

          {/* Description Section */}
          <div className="mt-6 bg-gray-800 p-4 sm:p-6 rounded-lg shadow-sm">
            <h2 className="text-lg sm:text-xxl font-semibold mb-4 text-white text-center">
              Mô Tả Sản Phẩm
            </h2>
            {/* Display parsed Word document content */}
            <div
              className="text-gray-300"
              dangerouslySetInnerHTML={{ __html: descriptionContent }}
            />
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default ProductDetail;
