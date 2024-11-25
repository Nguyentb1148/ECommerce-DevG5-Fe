import React from 'react';

const OrderDetails = ({ order, onClose }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6">
                    <div className="flex justify-between items-start mb-6">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Order Details</h2>
                            <p className="text-gray-600 dark:text-gray-400">Order #{order.orderNumber}</p>
                        </div>
                        <button
                            onClick={onClose}
                            className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                        >
                            ×
                        </button>
                    </div>

                    <div className="space-y-6">
                        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                            <h3 className="font-semibold text-gray-800 dark:text-gray-100 mb-2">Shipping Address</h3>
                            <p className="text-gray-600 dark:text-gray-300">{order.shippingAddress}</p>
                        </div>

                        <div>
                            <h3 className="font-semibold text-gray-800 dark:text-gray-100 mb-4">Order Timeline</h3>
                            <div className="relative">
                                <div className="absolute top-1/2 left-4 right-4 h-1 bg-gray-200 dark:bg-gray-600 -translate-y-1/2">
                                    <div
                                        className="h-full bg-blue-500 transition-all duration-500"
                                        style={{ width: `${order.progress}%` }}
                                    />
                                </div>

                                <div className="relative flex justify-between">
                                    {order.timeline.map((item, index) => {
                                        const Icon = item.icon;
                                        return (
                                            <div key={index} className="flex flex-col items-center">
                                                <div
                                                    className={`w-8 h-8 rounded-full flex items-center justify-center z-10 ${
                                                        item.completed
                                                            ? 'bg-blue-500'
                                                            : 'bg-gray-200 dark:bg-gray-600'
                                                    }`}
                                                >
                                                    <Icon
                                                        className={`w-4 h-4 ${
                                                            item.completed
                                                                ? 'text-white'
                                                                : 'text-gray-500 dark:text-gray-400'
                                                        }`}
                                                    />
                                                </div>
                                                <div className="mt-2 text-center">
                                                    <p
                                                        className={`text-sm font-medium ${
                                                            item.completed
                                                                ? 'text-blue-500'
                                                                : 'text-gray-500 dark:text-gray-400'
                                                        }`}
                                                    >
                                                        {item.status}
                                                    </p>
                                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                                        {item.date || 'Pending'}
                                                    </p>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>

                        <div>
                            <h3 className="font-semibold text-gray-800 dark:text-gray-100 mb-4">Order Items</h3>
                            <div className="space-y-3">
                                {order.items.map((item, index) => (
                                    <div
                                        key={index}
                                        className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700"
                                    >
                                        <div>
                                            <span className="font-medium text-gray-800 dark:text-gray-100">{item.name}</span>
                                            <span className="text-gray-500 dark:text-gray-400 ml-2">x{item.quantity}</span>
                                        </div>
                                        <span className="text-gray-800 dark:text-gray-100">${item.price.toFixed(2)}</span>
                                    </div>
                                ))}
                            </div>
                            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                                <div className="flex justify-between items-center">
                                    <span className="font-bold text-gray-800 dark:text-gray-100">Total</span>
                                    <span className="font-bold text-gray-800 dark:text-gray-100">${order.total.toFixed(2)}</span>
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
