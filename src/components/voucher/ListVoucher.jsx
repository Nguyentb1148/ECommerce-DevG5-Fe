import React, { useState } from 'react';
import { FiPercent } from "react-icons/fi";
const ListVoucher = () => {
    const [vouchers] = useState([
        {
            id: 1,
            code: "SUMMER2024",
            discount: "20%",
            validUntil: "2024-03-31",
            minPurchase: 100,
            description: "Summer season discount"
        },
        {
            id: 2,
            code: "WELCOME50",
            discount: "$50",
            validUntil: "2024-02-28",
            minPurchase: 200,
            description: "New customer welcome discount"
        },
        {
            id: 3,
            code: "FLASH30",
            discount: "30%",
            validUntil: "2024-01-31",
            minPurchase: 150,
            description: "Flash sale discount"
        }
    ]);
    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">Available Vouchers</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {vouchers.map((voucher) => (
                    <div
                        key={voucher.id}
                        className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow bg-white dark:bg-gray-700"
                    >
                        <div className="flex items-center gap-2 mb-2">
                            <FiPercent className="text-blue-500 dark:text-blue-400" />
                            <span className="font-bold text-lg text-gray-800 dark:text-gray-100">{voucher.code}</span>
                        </div>
                        <div className="text-xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                            {voucher.discount} OFF
                        </div>
                        <p className="text-gray-600 dark:text-gray-300 text-sm mb-2">{voucher.description}</p>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                            <p>Min. Purchase: ${voucher.minPurchase}</p>
                            <p>Valid until: {voucher.validUntil}</p>
                        </div>
                        <button className="mt-3 w-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 py-2 rounded-md hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors">
                            Copy Code
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};
export default ListVoucher;