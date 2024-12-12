import React from 'react';
import { FiCheck, FiTruck, FiPackage, FiHome } from "react-icons/fi";

const ShippingStatus = ({ order }) => {
    // Define the timeline steps
    const timelineSteps = [
        { status: 'Order Placed', icon: FiPackage },
        { status: 'Processing', icon: FiCheck },
        { status: 'Out for Delivery', icon: FiTruck },
        { status: 'Delivered', icon: FiHome },
    ];

    // Determine the progress and completion state based on order.status
    const statusIndex = timelineSteps.findIndex(step => step.status === order.status);
    const progress = ((statusIndex + 1) / timelineSteps.length) * 100;

    return (
        <div className="relative">
            {/* Progress Bar */}
            <div className="absolute top-[60%] left-4 right-4 h-1 bg-gray-600 -translate-y-1/2">
                <div
                    className="h-full bg-blue-500 transition-all  duration-500"
                    style={{ width: `${progress}%` }}
                />
            </div>

            {/* Timeline */}
            <div className="relative flex justify-between">
                {timelineSteps.map((item, index) => {
                    const Icon = item.icon;
                    const isCompleted = index <= statusIndex;

                    return (
                        <div key={index} className="flex flex-col items-center ">
                            <div
                                className={`w-8 h-8 rounded-full flex items-center justify-center z-10 ${
                                    isCompleted ? 'bg-blue-500' : 'bg-gray-600'
                                }`}
                            >
                                <Icon
                                    className={`w-4 h-4 ${
                                        isCompleted ? 'text-white' : 'text-gray-200'
                                    }`}
                                />
                            </div>
                            <div className="text-center">
                                <p
                                    className={`mt-3 text-xs md:text-sm font-medium ${
                                        isCompleted ? 'text-blue-500' : 'text-gray-400'
                                    }`}
                                >
                                    {item.status}
                                </p>
                                <p className="hidden text-xs text-gray-400">
                                    {index <= statusIndex ? order.orderDate : 'Pending'}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default ShippingStatus;