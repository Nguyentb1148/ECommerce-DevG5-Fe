import React, { useState, useEffect } from "react";
import DataTable, { createTheme } from "react-data-table-component";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  GetAllProducts,
  ApproveProduct,
  RejectProduct,
  UnrejectProduct,
  UpdateRequest,
  updateProduct,
} from "../../../services/api/ProductApi";
import RejectModal from "../../../components/products/RejectModal";
import ProductDetailModal from "../../../components/products/ProductDetailModal";

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
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modalType, setModalType] = useState(null);

  const fetchProducts = async () => {
    try {
      const response = await GetAllProducts();
      console.log("Response:", response.data); // Debugging log
      const filteredProducts = response.data.filter(
        (product) => product.verify.status === "pending" || product.verify.status === "rejected"
      );
      setProducts(filteredProducts);
    } catch (error) {
      console.error("Error fetching product data:", error.response?.data || error.message);
      toast.error("Error fetching product data");
    }
  };

  const handleApprove = async (productId, requestId) => {
    console.log("Approving product with ID:", productId, "and request ID:", requestId);
    try {
      await ApproveProduct(productId);
      await UpdateRequest(
        requestId,
        "approved",
        "Product approved successfully"
      ); // Update request
      await updateProduct(productId, { verify: { status: "approved" } });
      toast.success("Product approved successfully");
      fetchProducts();
    } catch (error) {
      console.error(
        "Error approving product:",
        error.response?.data || error.message
      );
      toast.error("Error approving product");
    }
  };

  const handleReject = async (productId, feedback, requestId) => {
    console.log("Rejecting product with ID:", productId, "and request ID:", requestId);
    try {
      await RejectProduct(productId, feedback);
      await UpdateRequest(requestId, "rejected", feedback); // Update request
      await updateProduct(productId, { verify: { status: "rejected" } });
      toast.success("Product rejected successfully");
      fetchProducts();
    } catch (error) {
      console.error(
        "Error rejecting product:",
        error.response?.data || error.message
      );
      toast.error("Error rejecting product");
    }
  };

  const handleUnreject = async (productId) => {
    try {
      await UnrejectProduct(productId);
      toast.success("Product unrejected successfully");
      fetchProducts();
    } catch (error) {
      console.error(
        "Error unrejecting product:",
        error.response?.data || error.message
      );
      toast.error("Error unrejecting product");
    }
  };

  const handleOpenModal = (product, type) => {
    setSelectedProduct(product);
    setModalType(type);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
    setModalType(null);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const columns = [
    {
      name: "Tên sản phẩm",
      selector: (row) => row.name,
      sortable: true,
      center: false,
    },
    {
      name: "Người Bán",
      selector: (row) => row.sellerId.fullName,
      sortable: true,
      center: true,
    },
    {
      name: "Giá",
      selector: (row) => `$${row.price}`,
      sortable: true,
      center: true,
    },
    {
      name: "Trạng thái",
      selector: (row) => row.verify.status,
      sortable: true,
      center: true,
    },
    {
      name: "Chức năng",
      center: true,
      cell: (row) => (
        <div className="flex space-x-2">
          <button
            className="bg-blue-500 text-white px-2 py-1 rounded"
            onClick={() => handleOpenModal(row, "detail")}
          >
            Chi tiết
          </button>
          <button
            className="bg-green-500 text-white px-2 py-1 rounded"
            onClick={() => handleApprove(row._id, row.verify.requestId)}
          >
            Đồng ý
          </button>
          {row.verify.status === "rejected" ? (
            <button
              className="bg-yellow-500 text-white px-2 py-1 rounded"
              onClick={() => handleUnreject(row._id)}
            >
              Gỡ từ chối
            </button>
          ) : (
            <button
              className="bg-red-500 text-white px-2 py-1 rounded"
              onClick={() => handleOpenModal(row, "reject")}
            >
              Từ chối
            </button>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="h-screen">
      <h1 className="grid place-items-center text-4xl py-4 text-white">
        Quản lý yêu cầu sản phẩm
      </h1>
      <div className="md:w-[650px] lg:w-[850px] xl:w-[90%] mx-auto rounded-md shadow-md">
        <div className="overflow-hidden">
          <DataTable
            theme="dark"
            columns={columns}
            data={products}
            fixedHeader
            pagination
            fixedHeaderScrollHeight="650px"
            paginationPosition="bottom"
          />
        </div>
      </div>

     {/* Modal for Reject */}
     {modalType === "reject" && selectedProduct && (
        <RejectModal
          product={selectedProduct}
          onClose={handleCloseModal}
          onReject={(reason) =>
            handleReject(selectedProduct._id, reason, selectedProduct.verify.requestId)
          } // Pass requestId here
        />
      )}

      {/* Modal for Detail */}
      {modalType === "detail" && selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          onClose={handleCloseModal}
        />
      )}

      <ToastContainer />
    </div>
  );
};

export default ProductManage;