import React from 'react';
import ShippingStatus from '../shipping/ShippingStatus';
import { FaX } from "react-icons/fa6";

const OrderDetails = ({ order, onClose }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-gray-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6">
                    <div className="flex justify-between items-start mb-6">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-100">Order Details</h2>
                            <p className="text-gray-400">Order #{order.orderNumber}</p>
                        </div>
                        <button
                            onClick={onClose}
                            className="text-gray-400 hover:text-gray-200"
                        >
                            <FaX />
                        </button>
                    </div>

                    <div className="space-y-6">
                        <div className="bg-gray-700 p-4 rounded-lg">
                            <h3 className="font-semibold text-gray-100 mb-2">Shipping Address</h3>
                            <p className="text-gray-300">{order.shippingAddress}</p>
                        </div>

                        <div>
                            <h3 className="font-semibold text-gray-100 mb-4">Order Timeline</h3>
                            <div >
                                <ShippingStatus order={order} />
                            </div>
                        </div>

                        <div>
                            <h3 className="font-semibold text-gray-100 mb-4">Order Items</h3>
                            <div className="space-y-3">
                                {order.items.map((item, index) => (
                                    <div
                                        key={index}
                                        className="flex justify-between items-center py-2 border-b border-gray-700"
                                    >
                                        <div>
                                            <span className="font-medium text-gray-100">{item.name}</span>
                                            <span className="text-gray-400 ml-2">x{item.quantity}</span>
                                        </div>
                                        <span className="text-gray-100">${item.price.toFixed(2)}</span>
                                    </div>
                                ))}
                            </div>
                            <div className="mt-4 pt-4 border-t border-gray-700">
                                <div className="flex justify-between items-center">
                                    <span className="font-bold text-gray-100">Total</span>
                                    <span className="font-bold text-gray-100">${order.total.toFixed(2)}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderDetails;
