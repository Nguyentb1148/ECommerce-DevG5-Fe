import React from 'react'

const ShippingStatus = ({ order }) => {
    return (
        <div className="relative">
            <div className="absolute top-1/2 left-4 right-4 h-1 bg-gray-600 -translate-y-1/2">
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
                                className={`w-8 h-8 rounded-full flex items-center justify-center z-10 ${item.completed
                                    ? 'bg-blue-500'
                                    : 'bg-gray-600'
                                    }`}
                            >
                                <Icon
                                    className={`w-4 h-4 ${item.completed
                                        ? 'text-white'
                                        : 'text-gray-200'
                                        }`}
                                />
                            </div>
                            <div className="mt-2 text-center">
                                <p
                                    className={`text-sm font-medium ${item.completed
                                        ? 'text-blue-500'
                                        : 'text-gray-400'
                                        }`}
                                >
                                    {item.status}
                                </p>
                                <p className="text-xs text-gray-400">
                                    {item.date || 'Pending'}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    )
}

export default ShippingStatus