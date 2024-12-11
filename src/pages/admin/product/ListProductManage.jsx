import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from "react-toastify";
import CustomDataTable from '../../../components/datatable/CustomDataTable';
import ProductDetailModal from '../../../components/modal/ProductDetailModal';

import { getProducts } from '../../../services/api/ProductApi';
import { FaSearch } from "react-icons/fa";

const ListProductManage = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isProductDetailModalOpen, setIsProductDetailModalOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState(""); // Store the search query

    const fetchProducts = async () => {
        try {
            const response = await getProducts();
            console.log("Response:", response.data);
            const filteredProducts = response.data.filter(
                (product) => product.verify.status === "approved"
            );
            setProducts(filteredProducts);
            setFilteredProducts(filteredProducts); // Store the filtered products initially
        } catch (error) {
            console.error("Error fetching product data:", error.response?.data || error.message);
            toast.error("Error fetching product data");
        }
    };

    const handleSearch = (event) => {
        const query = event.target.value.toLowerCase();
        setSearchQuery(query);

        if (query === "") {
            // If the search query is empty, reset the filtered list to all products
            setFilteredProducts(products);
        } else {
            // Filter the products based on the search query
            const filtered = products.filter((product) =>
                product.name.toLowerCase().includes(query) ||
                product.sellerId?.fullName.toLowerCase().includes(query) ||
                product.price.toString().includes(query) || // Handle price search
                product.verify?.status.toLowerCase().includes(query)
            );
            setFilteredProducts(filtered);
        }
    };

    useEffect(() => {
        fetchProducts(); // Fetch product data on component load
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
            <div className="w-[90%] lg:w-[80%] mx-auto rounded-md shadow-md">
                <div className="flex justify-between my-2">
                    {/* Adjust the Search Box to the right */}
                    <div className="ml-auto w-48 md:w-64 flex items-center rounded-md px-2 bg-gray-800">
                        <FaSearch className="flex items-center justify-center w-10 text-white"/>
                        <input
                            type="text"
                            onChange={handleSearch}
                            placeholder="Search..."
                            className="bg-transparent w-44 border-none outline-none text-white focus:ring-0"
                        />
                    </div>
                </div>

                <div className="md:w-[650px] lg:w-[850px] xl:w-[90%] mx-auto rounded-md shadow-md">
                    <CustomDataTable
                        columns={columns}
                        records={filteredProducts} // Use filteredProducts instead of products
                    />
                </div>
            </div>

            {isProductDetailModalOpen && (
                <ProductDetailModal
                    product={selectedProduct}
                    onClose={() => setIsProductDetailModalOpen(false)}
                />
            )}
            <ToastContainer />
        </div>
    );
};

export default ListProductManage;
