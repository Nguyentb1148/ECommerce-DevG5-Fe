import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from "react-toastify";
import CustomDataTable from '../../../components/datatable/CustomDataTable';
import ProductDetailModal from '../../../components/modal/ProductDetailModal';

import { getProducts } from '../../../services/api/ProductApi';
const ListProductManage = () => {
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isProductDetailModalOpen, setIsProductDetailModalOpen] = useState(false);

    const fetchProducts = async () => {
        try {
            const response = await getProducts();
            console.log("Response:", response.data);
            const filteredProducts = response.data.filter(
                (product) => product.verify.status === "approved"
            );
            setProducts(filteredProducts);
        } catch (error) {
            console.error("Error fetching product data:", error.response?.data || error.message);
            toast.error("Error fetching product data");
        }
    };
    useEffect(() => {
        fetchProducts();
    }, []);

    const columns = [
        {
            name: "Name",
            selector: (row) => row.name,
            sortable: true,
            center: true,
        },
        {
            name: "Price",
            selector: (row) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(row.price),
            sortable: true,
            center: true,
        },
        {
            name: "Seller",
            selector: (row) => row.sellerId?.fullName || "N/A",
            sortable: true,
            center: true,
        },
        {
            name: "Created At",
            selector: (row) => row.createdAt,
            cell: (row) =>
                new Intl.DateTimeFormat("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                }).format(new Date(row.createdAt)),
            sortable: true,
            center: true,
        },
        {
            name: "Status",
            selector: row => row.verify?.status,
            sortable: true,
            center: true,
            cell: (row) => (
                <span className="text-green-500">
                    {row.verify?.status}
                </span>
            ),
        },
        {
            name: 'Action',
            center: true,
            cell: (row) => (
                <div className="max-md:w-56">
                    <button
                        className="bg-green-500 text-white px-3 py-1 rounded"
                        onClick={() => {
                            setSelectedProduct(row);
                            setIsProductDetailModalOpen(true);
                        }}
                    >
                        Details
                    </button>
                </div>
            ),
        }
    ];
    return (
        <div>
            <h1 className="grid place-items-center text-4xl py-4 text-white">
                Manage List Product
            </h1>
            <div className="md:w-[650px] lg:w-[850px] xl:w-[90%] mx-auto rounded-md shadow-md">
                <CustomDataTable
                    columns={columns}
                    records={products}
                />
            </div>
            {isProductDetailModalOpen && (
                <ProductDetailModal
                    product={selectedProduct}
                    onClose={() => setIsProductDetailModalOpen(false)}
                />
            )}
            <ToastContainer />
        </div>
    )
}

export default ListProductManage;