import { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import DataTable, { createTheme } from "react-data-table-component";
import Image from "../../../assets/robot-assistant.png";
import AddProduct from "../../../components/products/AddProduct";
import EditProduct from "../../../components/products/EditProduct";
import {
  deleteProduct,
  getProductsByUserId,
} from "../../../services/api/ProductApi";
import { toast, ToastContainer } from "react-toastify";

createTheme(
  "dark",
  {
    text: {
      primary: "#e5e7eb",
      secondary: "#9ca3af",
    },
    background: {
      default: "#1f2937",
    },
    context: {
      background: "#374151",
      text: "#ffffff",
    },
    divider: {
      default: "#4b5563",
    },
    action: {
      button: "#4f46e5",
      hover: "rgba(255, 255, 255, 0.1)",
      disabled: "rgba(255, 255, 255, 0.3)",
    },
  },
  "dark"
);

const ProductManage = () => {
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [isEditProductOpen, setIsEditProductOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [scrollHeight, setScrollHeight] = useState("430px");

  const updateScrollHeight = () => {
    if (window.innerWidth < 768) {
      setScrollHeight("400px");
    } else if (window.innerWidth < 1024) {
      setScrollHeight("440px");
    } else if (window.innerWidth < 1280) {
      setScrollHeight("460px");
    } else {
      setScrollHeight("650px");
    }
  };

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const user = JSON.parse(localStorage.getItem("user"));
      const response = await getProductsByUserId(user.id);
      setProducts(response);
      setRecords(response);
    } catch (error) {
      console.error("Error fetching product data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    updateScrollHeight();
    window.addEventListener("resize", updateScrollHeight);
    return () => window.removeEventListener("resize", updateScrollHeight);
  }, []);

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleFilter = (event) => {
    const searchQuery = event.target.value.toLowerCase();
    const filteredProducts = products.filter((product) =>
      product.name.toLowerCase().includes(searchQuery)
    );
    setRecords(filteredProducts);
  };

  const columns = [
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
      center: "true",
    },
    {
      name: "Category",
      selector: (row) => row.categoryId.name,
      sortable: true,
      center: "true",
    },
    {
      name: "Brand",
      selector: (row) => row.brandId.name,
      sortable: true,
      center: "true",
    },
    {
      name: "Image",
      selector: (row) => row.imageUrls,
      cell: (row) => (
        <img
          src={row.imageUrls[0]}
          alt={row.name}
          className="w-10 h-10 object-cover rounded-md"
        />
      ),
      sortable: false,
      center: "true",
    },
    {
      name: "Action",
      center: "true",
      cell: (row) => (
        <div className="max-md:flex max-md:w-56">
          <button
            className="bg-yellow-400 text-white px-2 py-1 rounded mr-2"
            onClick={() => setIsEditProductOpen(true)}
          >
            Edit
          </button>
          <button
            className="bg-red-500 text-white px-2 py-1 rounded"
            onClick={() => handleDelete(row)}
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  const handleDelete = async (row) => {
    const confirm = window.confirm(
      `Are you sure you want to delete ${row.name} with id ${row._id}?`
    );
    if (confirm) {
      try {
        const response = await deleteProduct(row._id);
        console.log(response);
        toast.success(response.message);
        // Filter out the deleted product from both products and records
        setProducts((prevProducts) =>
          prevProducts.filter((product) => product._id !== row._id)
        );
        setRecords((prevRecords) =>
          prevRecords.filter((record) => record._id !== row._id)
        );
      } catch (error) {
        toast.error("Error deleting product data:", error);
      }
    }
  };

  if (loading) {
    return (
      <div className="grid mt-12 gap-3">
        <div className="flex items-center justify-center">
          <svg
            className="animate-spin border-indigo-600"
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            viewBox="0 0 34 34"
            fill="none"
          >
            <g id="Component 2">
              <circle
                id="Ellipse 717"
                cx="17.0007"
                cy="17.0001"
                r="14.2013"
                stroke="#D1D5DB"
                strokeWidth="4"
                strokeDasharray="2 3"
              />
              <path
                id="Ellipse 715"
                d="M21.3573 30.5163C24.6694 29.4486 27.4741 27.2019 29.2391 24.2028C31.0041 21.2038 31.6065 17.661 30.9319 14.2471C30.2573 10.8332 28.3528 7.78584 25.5798 5.68345C22.8067 3.58105 19.3583 2.57 15.8891 2.84222"
                stroke="#4F46E5"
                strokeWidth="4"
              />
            </g>
          </svg>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen">
      <h1 className="grid place-items-center text-4xl py-4 text-white">
        Manage Product
      </h1>
      <div className="w-[90%] lg:w-[70%] mx-auto rounded-md shadow-md">
        <div className="flex justify-between my-2">
          <button
            className="btn-add bg-blue-500 text-white px-4 py-2 rounded"
            onClick={() => setIsAddProductOpen(true)}
          >
            Add product
          </button>
          <div className="w-48 md:w-64 flex items-center rounded-md px-2 bg-gray-800">
            <FaSearch className="flex items-center justify-center w-10 text-white" />
            <input
              type="text"
              onChange={handleFilter}
              placeholder="Search..."
              className="bg-transparent w-44 border-none outline-none text-white focus:ring-0"
            />
          </div>
        </div>
        <div className="overflow-hidden">
          <DataTable
            theme="dark"
            columns={columns}
            data={records}
            fixedHeader
            pagination
            fixedHeaderScrollHeight={scrollHeight}
            paginationPosition="bottom"
          />
        </div>
      </div>
      {isAddProductOpen && (
        <AddProduct
          onClose={() => setIsAddProductOpen(false)}
          refreshProducts={fetchProducts}
        />
      )}
      {isEditProductOpen && (
        <EditProduct onClose={() => setIsEditProductOpen(false)} />
      )}
      <ToastContainer />
    </div>
  );
};

export default ProductManage;
