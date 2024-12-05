import React from 'react';
import { FaX } from "react-icons/fa6";
import { FaCreditCard, FaMoneyBill } from "react-icons/fa";
import ShippingStatus from '../shipping/ShippingStatus';

const OrderDetailsManage = ({ orderData, onClose }) => {
    return (
        <div className='fixed top-0 inset-0 z-20 bg-black bg-opacity-50 py-6 px-4 sm:px-6 lg:px-8 overflow-auto'>
            <div className="max-w-6xl mx-auto p-6 bg-gray-900 rounded-lg shadow-lg text-gray-100">
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
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="p-4 bg-gray-800 rounded-lg">
                            <h3 className="text-sm font-medium text-gray-300">Order ID</h3>
                            <p className="mt-1 text-lg">{orderData.orderId}</p>
                        </div>
                        <div className="p-4 bg-gray-800 rounded-lg">
                            <h3 className="text-sm font-medium text-gray-300">Purchase Date</h3>
                            <p className="mt-1 text-lg">{orderData.date}</p>
                        </div>
                    </div>
                    {/* Product & Payment */}
                    <div className="space-y-4">
                        <h2 className="text-xl font-semibold text-gray-100">Products</h2>
                        <div className="overflow-x-auto">
                            <table className="w-full bg-gray-800 rounded-lg">
                                <thead>
                                    <tr className="text-left border-b border-gray-700">
                                        <th className="p-4 text-sm font-medium text-gray-300">STT</th>
                                        <th className="p-4 text-sm font-medium text-gray-300">Image</th>
                                        <th className="p-4 text-sm font-medium text-gray-300">Name</th>
                                        <th className="p-4 text-sm font-medium text-gray-300">Quantity</th>
                                        <th className="p-4 text-sm font-medium text-gray-300">Price</th>
                                        <th className="p-4 text-sm font-medium text-gray-300">SubTotal</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orderData.products.map((product, index) => (
                                        <tr key={index} className="border-b border-gray-700 last:border-0">
                                            <td className="p-4">
                                                <span className="w-6 h-6 rounded-full flex items-center justify-center text-sm font-medium">
                                                    {index + 1}
                                                </span>
                                            </td>
                                            <td className="p-4">
                                                <img
                                                    src={product.image}
                                                    alt={product.name}
                                                    className="w-12 h-12 object-cover rounded-md"
                                                    onError={(e) => {
                                                        e.target.src = "https://images.unsplash.com/photo-1560393464-5c69a73c5770";
                                                    }}
                                                />
                                            </td>
                                            <td className="p-4">{product.name}</td>
                                            <td className="p-4">{product.quantity}</td>
                                            <td className="p-4">${product.price.toFixed(2)}</td>
                                            <td className="p-4">${(product.quantity * product.price).toFixed(2)}</td>
                                        </tr>
                                    ))}
                                    <tr>
                                        <td colSpan="5" className="text-center p-4">Total Price: </td>
                                        <td className="p-4 text-indigo-500 font-medium">${orderData.totalPrice.toFixed(2)}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="p-4 bg-gray-800 rounded-lg">
                                <h3 className="text-sm font-medium text-gray-300">Payment Status</h3>
                                <p className="mt-1 capitalize flex items-center gap-2">
                                    <FaCreditCard className="text-indigo-400" />
                                    {orderData.paymentStatus}
                                </p>
                            </div>
                            <div className="p-4 bg-gray-800 rounded-lg">
                                <h3 className="text-sm font-medium text-gray-300">Payment Method</h3>
                                <p className="mt-1 flex items-center gap-2">
                                    <FaMoneyBill className="text-indigo-400" />
                                    {orderData.paymentMethod}
                                </p>
                            </div>
                        </div>
                    </div>
                    {/* Information Shipping */}
                    <div className="space-y-4">
                        <h2 className="text-xl font-semibold text-gray-100">Shipping Information</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="p-4 bg-gray-800 rounded-lg">
                                <h3 className="text-sm font-medium text-gray-300">Full Name</h3>
                                <p className="mt-1">{orderData.shippingInfo.fullName}</p>
                            </div>
                            <div className="p-4 bg-gray-800 rounded-lg">
                                <h3 className="text-sm font-medium text-gray-300">Email</h3>
                                <p className="mt-1">{orderData.email}</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="p-4 bg-gray-800 rounded-lg">
                                <h3 className="text-sm font-medium text-gray-300">Phone Number</h3>
                                <p className="mt-1">{orderData.shippingInfo.phoneNumber}</p>
                            </div>

                            <div className="p-4 bg-gray-800 rounded-lg">
                                <h3 className="text-sm font-medium text-gray-300">Address</h3>
                                <p className="mt-1">{orderData.shippingInfo.address}</p>
                            </div>
                        </div>
                    </div>
                    {/* Shipping Status */}
                    <div className="space-y-4">
                        <h2 className="text-xl font-semibold text-gray-100">Shipping Status</h2>
                        <div className="p-4 bg-gray-800 rounded-lg">
                            <div >
                                <ShippingStatus order={orderData} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OrderDetailsManage;