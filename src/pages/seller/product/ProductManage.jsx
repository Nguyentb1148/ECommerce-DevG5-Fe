import { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import AddProduct from "../../../components/products/AddProduct";
import EditProduct from "../../../components/products/EditProduct";
import { deleteProduct, getProductsByUserId } from "../../../services/api/ProductApi";
import { toast, ToastContainer } from "react-toastify";
import CustomDataTable from "../../../components/datatable/CustomDataTable";
import LoadingDots from "../../../components/loading/LoadingDots"; // Import LoadingDots component

const ProductManage = () => {
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [isEditProductOpen, setIsEditProductOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProductId, setSelectedProductId] = useState(null); // State to store selected product ID

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
    fetchProducts();
  }, []);

  const handleFilter = (event) => {
    const searchQuery = event.target.value.toLowerCase();
    const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(searchQuery) ||
        product.categoryId.name.toLowerCase().includes(searchQuery) ||
        product.brandId.name.toString().includes(searchQuery)
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
                onClick={() => {
                  setSelectedProductId(row._id); // Set selected product ID
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

  const handleDelete = async (row) => {
    const confirm = window.confirm(`Are you sure you want to delete ${row.name}?`);
    if (confirm) {
      try {
        const response = await deleteProduct(row._id);
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
        <div className="flex justify-center items-center h-screen">
          <LoadingDots />
        </div>
    );
  }

  return (
      <div className="h-screen">
        <h1 className="grid place-items-center text-4xl py-4 text-white">Manage Product</h1>
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

          {/* Display message if no products found */}
          {records.length === 0 ? (
              <p className="text-center text-white mt-4">No products found.</p>
          ) : (
              <CustomDataTable columns={columns} records={records} />
          )}

          {isAddProductOpen && (
              <AddProduct
                  onClose={() => setIsAddProductOpen(false)}
                  refreshProducts={fetchProducts}
              />
          )}
          {isEditProductOpen && (
              <EditProduct
                  onClose={() => setIsEditProductOpen(false)}
                  productId={selectedProductId} // Pass the selected productId
                  refreshProducts={fetchProducts}
              />
          )}

          <ToastContainer />
        </div>
      </div>
  );
};

export default ProductManage;
