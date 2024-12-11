import React, { useState, useEffect } from 'react';
import { FiPercent } from "react-icons/fi";
import { getListVoucher } from '../../services/api/VoucherApi';
import { format } from 'date-fns';
import LoadingDots from "../loading/LoadingDots";  // Giả sử bạn đã có component LoadingDots
import { Link } from 'react-router-dom';

const ListVoucher = () => {
    const [vouchers, setVouchers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Function to fetch voucher data from API
        const fetchVouchers = async () => {
            try {
                const data = await getListVoucher();
                setVouchers(data);
                console.log(data);
            } catch (err) {
                setError('Error fetching vouchers');
            } finally {
                setLoading(false);
            }
        };

        fetchVouchers();
    }, []);

    if (loading) return (
        <div className="flex justify-center items-center h-full">
            <LoadingDots />  {/* Hiển thị loading */}
        </div>
    );

    if (error) return <p>{error}</p>;

    return (
        <div className="bg-gray-800 rounded-xl shadow-lg p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-100">Available Vouchers</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {vouchers.map((voucher) => (
                    <div
                        key={voucher.id}
                        className="border border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow bg-gray-700"
                    >
                        <div className="flex items-center gap-2 mb-2">
                            <FiPercent className="text-blue-400" />
                            <span className="font-bold text-lg text-gray-100">{voucher.code}</span>
                        </div>
                        <div className="text-xl font-bold text-blue-400 mb-2">
                            {voucher.discount} %
                        </div>
                        <p className="text-gray-300 text-sm mb-2">{voucher.description}</p>
                        <div className="text-sm text-gray-400">
                            <p>
                                Áp dụng cho đơn hàng:
                                <span className="pl-1">
                                    {new Intl.NumberFormat("vi-VN", {
                                        style: "currency",
                                        currency: "VND",
                                    }).format(voucher.minCartPrice)}
                                </span>
                            </p>
                            <p>
                                Ngày hết hạn:
                                <span className="pl-1">
                                    {format(new Date(voucher.validity), 'dd/MM/yyyy HH:mm')}
                                </span>
                            </p>
                        </div>
                        <button className="mt-3 w-full bg-blue-900 text-blue-300 py-2 rounded-md hover:bg-blue-800 transition-colors" >
                        <Link to="/productFilter">
                            Apply code
                        </Link>
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ListVoucher;
