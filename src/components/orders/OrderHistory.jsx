import React, { useState, useEffect } from "react";
import { FiSearch } from "react-icons/fi";
import OrderDetails from "./OrderDetails";
import { orderByUserId } from "../../services/api/OrderApi";
import { format } from "date-fns";
import LoadingDots from "../loading/LoadingDots";

const OrderHistory = () => {
  const [userId, setUserId] = useState(null);
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showOrderDetails, setShowOrderDetails] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true); // Thêm trạng thái loading

  useEffect(() => {
    // Fetch orders for the user
    const fetchOrders = async () => {
      try {
        const response = await orderByUserId();
        if (response && response.data) {
          setOrders(response.data);
        } else {
          setOrders([]); // Fallback to empty orders array
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false); // Dữ liệu đã được tải xong
      }
    };
    fetchOrders();
  }, []);

  const filterOrders = orders.filter(
    (order) =>
      order._id && order._id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewDetails = (order) => {
    setSelectedOrder(order);
    setShowOrderDetails(true);
  };

  return (
    <div className="p-6 bg-gray-800 rounded-lg shadow-md">
      <div className="relative mb-6">
        <input
          type="text"
          placeholder="Search orders..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-600 bg-gray-700 text-white focus:ring-blue-500 focus:border-blue-500"
        />
        <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
      </div>

      {/* Hiển thị loading khi đang tải dữ liệu */}
      {loading ? (
        <div className="">
          <LoadingDots />
        </div>
      ) : (
        <div className="space-y-4">
          {filterOrders.map((order) => (
            <div
              key={order._id}
              className="border rounded-lg p-4 hover:shadow-md transition-shadow border-gray-600"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-semibold text-white">
                    Order #{order._id}
                  </h3>
                  <p className="text-sm text-gray-400">
                    {order.orderDate
                      ? format(new Date(order.orderDate), "dd/MM/yyyy HH:mm")
                      : "Unknown date"}
                  </p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-sm ${
                    order.status === "Delivered"
                      ? "bg-green-900 text-green-200"
                      : "bg-yellow-900 text-yellow-200"
                  }`}
                >
                  {order.status}
                </span>
              </div>

              <div className="space-y-2">
                {order.orderItems.map((item) => (
                  <div key={item._id} className="flex justify-between text-sm">
                    <span className="text-gray-300">
                      {item.productId?.name || "Unknown Product"} x
                      {item.quantity}
                    </span>
                    <span className="text-gray-300">
                      {new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(item.price)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-4 pt-4 border-t border-gray-700 flex justify-between items-center">
                <div>
                  <span className="font-semibold text-white">Total:</span>
                  <span className="font-normal text-gray-300 px-2">
                    {new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(order.totalPrice)}
                  </span>
                </div>
                <button
                  onClick={() => handleViewDetails(order)}
                  className="text-blue-500 hover:text-blue-600 text-sm font-medium"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Order Details Modal */}
      {showOrderDetails && (
        <OrderDetails
          order={selectedOrder}
          onClose={() => setShowOrderDetails(false)}
        />
      )}
    </div>
  );
};

export default OrderHistory;
