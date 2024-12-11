import React, { useEffect, useState } from "react";
import ShippingStatus from "../shipping/ShippingStatus";
import { FaX } from "react-icons/fa6";
import { FaCreditCard, FaMoneyBill } from "react-icons/fa";
import { format } from "date-fns";
import { FaFilePen } from "react-icons/fa6";
import ReviewModal from "../modal/ReviewModal";
import { getProductReviews } from "../../services/api/ReviewApi";

const OrderDetails = ({ order, onClose }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const toggleModal = () => setIsModalOpen(!isModalOpen);
  const [currentProductId, setCurrentProductId] = useState(null);
  const [reviewedProducts, setReviewedProducts] = useState(new Set());

  useEffect(() => {
    // Fetch reviews for each product and check if the user has already reviewed
    const fetchReviews = async () => {
      const reviewed = new Set();
      for (const item of order.orderItems) {
        const reviews = await getProductReviews(item.productId._id);
        const userReview = reviews.find(
          (review) => review.userId._id === order.userId
        );
        if (userReview) {
          reviewed.add(item.productId._id);
        }
      }
      setReviewedProducts(reviewed);
    };

    fetchReviews();
  }, [order.orderItems, order.userId]);

  const toggleReviewModal = (productId) => {
    setCurrentProductId(productId); // Set the productId for the review
    setIsReviewModalOpen(!isReviewModalOpen);
  };
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 overflow-auto">
      <div className="max-w-6xl mx-auto p-6 mt-28 bg-gray-900 rounded-lg shadow-lg text-gray-100">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-100">Order Details</h1>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-200"
          >
            <FaX />
          </button>
        </div>
        <div className="space-y-6">
          {/* Information Order */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-gray-800 rounded-lg">
              <h3 className="text-sm font-medium text-gray-300">Order ID:</h3>
              <p className="mt-1 text-lg">{order._id}</p>
            </div>
            <div className="p-4 bg-gray-800 rounded-lg">
              <h3 className="text-sm font-medium text-gray-300">
                Purchase Date:
              </h3>
              <p className="mt-1 text-lg">
                {format(new Date(order.orderDate), "dd/MM/yyyy HH:mm")}
              </p>
            </div>
            <div className="p-4 bg-gray-800 rounded-lg md:col-span-2">
              <h3 className="text-sm font-medium text-gray-300">Address:</h3>
              <p className="mt-1 text-lg">{order.deliveryAddress}</p>
            </div>
          </div>
          {/* Product & Payment */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-100">Products</h2>
            <div className="overflow-x-auto">
              <table className="w-full bg-gray-800 rounded-lg">
                <thead>
                  <tr className="text-center border-b border-gray-700">
                    <th className="p-4 text-sm font-medium text-gray-300">
                      STT
                    </th>
                    <th className="p-4 text-sm font-medium text-gray-300">
                      Image
                    </th>
                    <th className="p-4 text-sm font-medium text-gray-300">
                      Name
                    </th>
                    <th className="p-4 text-sm font-medium text-gray-300">
                      Quantity
                    </th>
                    <th className="p-4 text-sm font-medium text-gray-300">
                      Price
                    </th>
                    <th className="p-4 text-sm font-medium text-gray-300">
                      SubTotal
                    </th>
                    <th className="p-4 text-sm font-medium text-gray-300"></th>
                  </tr>
                </thead>
                <tbody>
                  {order.orderItems.map((item, index) => (
                    <tr
                      key={index}
                      className="border-b border-gray-700 last:border-0"
                    >
                      <td className="p-4">
                        <span className="w-6 h-6 rounded-full flex items-center justify-center text-sm font-medium">
                          {index + 1}
                        </span>
                      </td>
                      <td className="p-4">
                        <img
                          src={item.productId.imageUrls[0]}
                          alt={item.name}
                          className="w-12 h-12 object-cover rounded-md"
                          onError={(e) => {
                            e.target.src =
                              "https://images.unsplash.com/photo-1560393464-5c69a73c5770";
                          }}
                        />
                      </td>
                      <td className="p-4">{item.productId.name}</td>
                      <td className="p-4 text-center">{item.quantity}</td>
                      <td className="p-4">
                        {" "}
                        <span className="text-gray-100 block mt-1">
                          {new Intl.NumberFormat("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          }).format(item.price)}
                        </span>
                      </td>
                      <td className="p-4">
                        <span className="text-gray-100 block mt-1">
                          {new Intl.NumberFormat("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          }).format(item.quantity * item.price)}
                        </span>
                      </td>
                      <td className="p-4">
                        {reviewedProducts.has(item.productId._id) ? (
                          <span className="text-gray-500 text-sm">
                            Reviewed
                          </span>
                        ) : (
                          <FaFilePen
                            className="cursor-pointer"
                            onClick={() =>
                              toggleReviewModal(item.productId._id)
                            }
                          />
                        )}
                      </td>
                    </tr>
                  ))}
                  <tr>
                    <td colSpan="5" className="text-center p-4">
                      Total Price:{" "}
                    </td>
                    <td className="p-4 text-indigo-500 font-medium ">
                      {new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(order.totalPrice)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-4 bg-gray-800 rounded-lg">
                <h3 className="text-sm font-medium text-gray-300">
                  Payment Status
                </h3>
                <p className="mt-1 capitalize flex items-center gap-2">
                  <FaCreditCard className="text-indigo-400" />
                  {order.paymentStatus}
                </p>
              </div>
              <div className="p-4 bg-gray-800 rounded-lg">
                <h3 className="text-sm font-medium text-gray-300">
                  Payment Method
                </h3>
                <p className="mt-1 flex items-center gap-2">
                  <FaMoneyBill className="text-indigo-400" />
                  {order.paymentMethod}
                </p>
              </div>
            </div>
          </div>
          {/* Shipping Status */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-100">
              Shipping Status
            </h2>
            <div className="p-4 bg-gray-800 rounded-lg">
              <div>
                <ShippingStatus order={order} />
              </div>
            </div>
          </div>
          {isReviewModalOpen && (
            <ReviewModal
              productId={currentProductId}
              onClose={() => setIsReviewModalOpen(false)}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
