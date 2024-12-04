import { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import DataTable, { createTheme } from "react-data-table-component";
import AddProduct from "../../../components/products/AddProduct";
import EditProduct from "../../../components/products/EditProduct";
import {deleteProduct, getProductsByUserId,} from "../../../services/api/ProductApi";
import {ToastContainer} from "react-toastify";
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
  // State management
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [isEditProductOpen, setIsEditProductOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProductId, setSelectedProductId] = useState(null); // State to store selected productId

  // Responsive Table
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

  const handleDelete = async (row) => {
    const confirm = window.confirm(
        `Are you sure you want to delete ${row.name} with id ${row._id}?`
    );
    if (confirm) {
      try {
        const response = await deleteProduct(row._id);
        alert(response.message);
        await fetchProducts();
      } catch (error) {
        console.error("Error deleting product data:", error);
      }
    }
  };

  // Table columns
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
                onClick={() => {
                  setSelectedProductId(row._id); // Set selected productId
                  setIsEditProductOpen(true);
                }}
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

  if (loading) {
    return <div>Loading...</div>;
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
            {/* Search Box */}
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
        {/* Modals */}
        {isAddProductOpen && (
            <AddProduct
                onClose={() => setIsAddProductOpen(false)}
                refreshProducts={fetchProducts}
            />
        )}
        {isEditProductOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <EditProduct
                  onClose={() => setIsEditProductOpen(false)}
                  refreshProducts={fetchProducts}
                  productId={selectedProductId}
              />
            </div>
        )}

        <ToastContainer />
      </div>
  );
};

export default ProductManage;