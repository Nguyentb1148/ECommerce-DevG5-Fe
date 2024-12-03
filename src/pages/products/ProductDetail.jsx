import React, { useState } from "react";
import ProductSlider from "./ProductSlider";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import { FaShoppingCart } from 'react-icons/fa';

const ProductDetail = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [cart, setCart] = useState([]);
  const [quantity, setQuantity] = useState(1);

  const toggleModal = () => setIsModalOpen(!isModalOpen);
  const toggleReviewModal = () => setIsReviewModalOpen(!isReviewModalOpen);

  const images = [
    "https://cdn.ankhang.vn/media/product/21199_asus_gaming_rog_strix_g15_g513ih_hn015w.jpg",
    "https://bizweb.dktcdn.net/thumb/1024x1024/100/329/122/products/laptop-gaming-asus-rog-zephyrus-duo-16-2023-gx650pz-nm031w-4.jpg?v=1711947035900",
    "https://philong.com.vn/media/product/250-30152-asus-rog-flow-x16-gv601vv-nl016w-philong2.png",
    "https://laptoptv.vn/wp-content/uploads/2024/05/8-1-scaled.jpg",
    "https://bizweb.dktcdn.net/thumb/1024x1024/100/329/122/products/laptop-gaming-asus-rog-zephyrus-duo-16-2023-gx650pz-nm031w-4.jpg?v=1711947035900",
    "https://www.phucanh.vn/media/news/1910_ROGStrixG16.jpg"
  ];

  const [selectedVariant, setSelectedVariant] = useState("Off White");

  const variants = ["Off White", "Space Gray", "Jet Black"];

  const handleVariantClick = (variant) => {
    setSelectedVariant(variant);
  };

  const handleAddToCart = () => {
    const product = {
      name: "ABABABABABABABABABAB",
      price: 423424242,
      variant: selectedVariant,
      quantity: quantity,
    };
    setCart([...cart, product]);
    alert("Product added to cart!");
  };

  const handleQuantityChange = (amount) => {
    setQuantity((prevQuantity) => Math.max(1, prevQuantity + amount));
  };

  const features = [
    "Trang bị bộ xử lý Intel Core i5-13420H cân mọi tác vụ văn phòng, học tập",
    "RAM 8GB DDR4 có thể nâng cấp tối đa lên 32GB, cho bạn thoải mái lướt web mà không lo lag giật",
    "Ổ cứng 512GB rộng rãi, hỗ trợ lưu trữ tài liệu, tải game thoải mái",
    "Card đồ họa RTX 2050 giúp chỉnh sửa ảnh, video hay chơi game với mức cấu hình cao",
    "Màn hình 15.6 inch FHD cho bạn thoải mái làm việc, giải trí với chất lượng hình ảnh sắc nét, chân thực",
  ];

  const specifications = {
    "Loại card đồ họa": "NVIDIA GeForce RTX 2050 4GB GDDR6",
    "Dung lượng RAM": "8GB",
    "Loại RAM": "DDR4 3200MHz",
    "Số khe ram": "2 khe (Nâng cấp tối đa 32 GB)",
    "Ổ cứng": "512GB PCIe NVMe Gen4 (2 khe, nâng cấp tối đa 2TB SSD)",
    "Công nghệ màn hình": "Viền mỏng, Màn hình chống chói Acer ComfyView",
    "Cổng giao tiếp": `
      1 x USB Type-C (USB 3.2 Gen 2, Thunderbolt 4)
      2 x USB 3.2 Gen 1
      1 x HDMI 2.1 hỗ trợ HDCP
      1 x 3.5 mm headphone/speaker jack
      1 x Ethernet (RJ-45)
      DC-in jack
    `,
    "Kích thước màn hình": "15.6 inches",
  };
  const [generalRating, setGeneralRating] = useState(0);
  const [experienceRatings, setExperienceRatings] = useState({
    performance: 0,
    battery: 0,
    camera: 0,
  });
  const [comment, setComment] = useState("");

  const handleRatingClick = (rating) => {
    setGeneralRating(rating);
  };

  const handleExperienceRating = (key, rating) => {
    setExperienceRatings({ ...experienceRatings, [key]: rating });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (comment.length < 15) {
      alert("Vui lòng nhập ít nhất 15 ký tự.");
      return;
    }
    console.log("Đánh giá:", {
      generalRating,
      experienceRatings,
      comment,
    });
    toggleReviewModal();
  };

  const reviews = {
    rating: 5.0,
    totalReviews: 1,
    stars: [1, 0, 0, 0, 0], // Number of reviews for each star rating
  };

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
              <ProductSlider images={images} />
            </div>
            {/* Right Section - Product Details */}
            <div>
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold dark:text-white">Name product: ABABABABABABABABABAB</h1>
              <p className="text-red-600 text-lg sm:text-2xl lg:text-3xl font-semibold mt-4">$423424242</p>
              <div className="mt-4">
                <p className="text-gray-600 dark:text-gray-400">Brand: NewSUS Tech Company</p>
                <p className="text-gray-600 dark:text-gray-400">Size: 15.7 x 11 x 1.0 inches (W x D x H)</p>
                <p className="text-gray-600 dark:text-gray-400">Weight: 6.28 pounds</p>
                <p className="text-gray-600 dark:text-gray-400">Delivery: Worldwide</p>
              </div>
              <div className="mt-4">
                <span className="text-gray-600 dark:text-gray-400">Variant:</span>
                <div className="flex gap-4 mt-2">
                  {variants.map((variant) => (
                    <button
                      key={variant}
                      className={`px-2 sm:px-4 py-1 sm:py-2 border rounded ${selectedVariant === variant
                        ? "bg-gray-800 text-white"
                        : "bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                        }`}
                      onClick={() => handleVariantClick(variant)}
                    >
                      {variant}
                    </button>
                  ))}
                </div>
                <p className="mt-2 text-gray-600 dark:text-gray-400">Selected Variant: {selectedVariant}</p>
              </div>
              <div className="mt-4 flex gap-4 items-center">
                <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded overflow-hidden">
                  <button
                    onClick={() => handleQuantityChange(-1)}
                    className="bg-gray-300 dark:bg-gray-600 text-black dark:text-white px-4 py-2"
                  >
                    -
                  </button>
                  <span className="mx-5">{quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(1)}
                    className="bg-gray-300 dark:bg-gray-600 text-black dark:text-white px-4 py-2"
                  >
                    +
                  </button>
                </div>
                <button className="bg-red-500 text-white px-4 sm:px-6 py-2 rounded">Buy Now</button>
                <button
  onClick={handleAddToCart}
  className="bg-blue-500 text-white px-4 sm:px-6 py-2 rounded flex items-center"
>
  <FaShoppingCart className="mr-2" />
  Add to Cart
</button>

              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-6">
          {/* Features Section */}
          <div className="col-span-1 lg:col-span-3 bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-lg shadow-sm">
            <h2 className="text-lg sm:text-xxl font-semibold mb-4 dark:text-white text-center">Đặc Điểm Nổi Bật</h2>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
              {features.map((feature, index) => (
                <li key={index} dangerouslySetInnerHTML={{ __html: feature }}></li>
              ))}
            </ul>
          </div>
        </div>
        {/* Modal for Review */}
        {isReviewModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 w-full sm:w-3/4 lg:w-2/3 xl:w-1/2 max-h-[90%] overflow-auto">
              <h2 className="text-2xl font-bold mb-4 dark:text-white">Đánh giá & nhận xét</h2>
              <form onSubmit={handleSubmit}>
                {/* Đánh giá chung */}
                <h4 className="font-semibold mb-2 dark:text-white">Đánh giá chung</h4>
                <div className="flex gap-2 mb-6">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => handleRatingClick(star)}
                      className={`text-2xl ${generalRating >= star ? "text-yellow-500" : "text-gray-300 dark:text-gray-600"}`}
                    >
                      ★
                    </button>
                  ))}
                </div>

                {/* Đánh giá chi tiết */}
                <h4 className="font-semibold mb-2 dark:text-white">Theo trải nghiệm</h4>
                {[
                  { key: "performance", label: "Hiệu năng" },
                  { key: "battery", label: "Thời lượng pin" },
                  { key: "camera", label: "Chất lượng camera" },
                ].map((item) => (
                  <div className="mb-4" key={item.key}>
                    <p className="dark:text-gray-300">{item.label}</p>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          onClick={() => handleExperienceRating(item.key, star)}
                          type="button"
                          className={`text-xl ${experienceRatings[item.key] >= star ? "text-yellow-500" : "text-gray-300 dark:text-gray-600"}`}
                        >
                          ★
                        </button>
                      ))}
                    </div>
                  </div>
                ))}

                {/* Bình luận */}
                <textarea
                  className="w-full mt-4 p-2 border rounded dark:bg-gray-700 dark:text-gray-300"
                  placeholder="Nhập nhận xét (tối thiểu 15 ký tự)"
                  rows="4"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                ></textarea>

                {/* Gửi đánh giá */}
                <div className="mt-6 flex justify-end gap-2">
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                    type="submit"
                  >
                    Gửi đánh giá
                  </button>
                  <button
                    onClick={toggleReviewModal}
                    className="bg-gray-300 dark:bg-gray-600 text-black dark:text-white px-4 py-2 rounded"
                    type="button"
                  >
                    Đóng
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Related Products */}
        <div className="mt-12">
          <h2 className="text-lg sm:text-xl font-semibold mb-4 dark:text-white">Related Products</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
            {Array(12)
              .fill(null)
              .map((_, index) => (
                <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-2 sm:p-4">
                  <img
                    src="https://via.placeholder.com/200"
                    alt={`Product ${index + 1}`}
                    className="w-full rounded"
                  />
                  <p className="text-gray-700 dark:text-gray-300 mt-2 text-sm">Laptop Model {index + 1}</p>
                  <p className="text-red-600 text-lg font-semibold">$1,999.99</p>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;