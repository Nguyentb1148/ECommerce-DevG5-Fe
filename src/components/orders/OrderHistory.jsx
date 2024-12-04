import React, { useState } from "react";
import { FiSearch, FiCheck, FiTruck, FiPackage, FiHome } from "react-icons/fi";
import OrderDetails from "./OrderDetails";

const OrderHistory = () => {
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [showOrderDetails, setShowOrderDetails] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    const [orders, setOrders] = useState([
        {
            id: 1,
            orderNumber: "ORD-001",
            date: "2024-01-15",
            items: [
                { name: "Product 1", quantity: 2, price: 49.99 },
                { name: "Product 2", quantity: 1, price: 29.99 }
            ],
            total: 129.97,
            status: "Delivered",
            progress: 100,
            shippingAddress: "123 Main St, City, Country",
            timeline: [
                { status: "Order Placed", date: "2024-01-15 09:00", icon: FiPackage, completed: true },
                { status: "Processing", date: "2024-01-15 11:30", icon: FiCheck, completed: true },
                { status: "Out for Delivery", date: "2024-01-16 14:20", icon: FiTruck, completed: true },
                { status: "Delivered", date: "2024-01-17 16:45", icon: FiHome, completed: true }
            ]
        },
        {
            id: 2,
            orderNumber: "ORD-002",
            date: "2024-01-10",
            items: [
                { name: "Product 3", quantity: 1, price: 79.99 }
            ],
            total: 79.99,
            status: "Processing",
            progress: 50,
            shippingAddress: "456 Oak St, Town, Country",
            timeline: [
                { status: "Order Placed", date: "2024-01-10 14:30", icon: FiPackage, completed: true },
                { status: "Processing", date: "2024-01-11 10:15", icon: FiCheck, completed: true },
                { status: "Out for Delivery", date: "", icon: FiTruck, completed: false },
                { status: "Delivered", date: "", icon: FiHome, completed: false }
            ]
        }
    ]);

    const filterOrders = orders.filter(order =>
        order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase())
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

            <div className="space-y-4">
                {filterOrders.map((order) => (
                    <div
                        key={order.id}
                        className="border rounded-lg p-4 hover:shadow-md transition-shadow border-gray-600"
                    >
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h3 className="font-semibold text-white">Order #{order.orderNumber}</h3>
                                <p className="text-sm text-gray-400">{order.date}</p>
                            </div>
                            <span
                                className={`px-3 py-1 rounded-full text-sm ${order.status === "Delivered"
                                    ? "bg-green-900 text-green-200"
                                    : "bg-yellow-900 text-yellow-200"
                                    }`}
                            >
                                {order.status}
                            </span>
                        </div>

                        <div className="space-y-2">
                            {order.items.map((item, index) => (
                                <div key={index} className="flex justify-between text-sm">
                                    <span className="text-gray-300">
                                        {item.name} x{item.quantity}
                                    </span>
                                    <span className="text-gray-300">${item.price.toFixed(2)}</span>
                                </div>
                            ))}
                        </div>

                        <div className="mt-4 pt-4 border-t border-gray-700 flex justify-between items-center">
                            <span className="font-semibold text-white">
                                Total: ${order.total.toFixed(2)}
                            </span>
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
