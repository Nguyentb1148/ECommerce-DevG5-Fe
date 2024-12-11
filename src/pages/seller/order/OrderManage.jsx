import React, { useState, useEffect } from 'react';
  import { FaSearch } from "react-icons/fa";
  import OrderDetailsManage from '../../../components/orders/OrderDetailsManage';
  import CustomDataTable from '../../../components/datatable/CustomDataTable';
  import { orderBySeller } from '../../../services/api/OrderApi';
  const OrderManage = () => {
    const [isOrderDetailsOpen, setIsOrderDetailsOpen] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [records, setRecords] = useState([]);
    const [loading, setLoading] = useState(true);
    const columns = [
      {
        name: "ID",
        selector: row => row.orderId,
        sortable: true,
        center: true,
      },
      {
        name: "Email",
        selector: row => row.email,
        sortable: true,
        center: true,
      },
      {
        name: "Date",
        selector: row => row.date,
        sortable: true,
        center: true,
      },
      {
        name: "Total Price",
        selector: row => row.totalPrice,
        sortable: true,
        center: true,
      },
      {
        name: "Payment",
        selector: row => row.paymentStatus,
        sortable: true,
        center: true,
       cell: (row) => (
          <span className={row.paymentStatus === "Pending" ? "text-yellow-300" : "text-green-400"}>
            {row.paymentStatus}
          </span>
        ),
      },
      {
        name: "Shipping",
        selector: row => row.status,
        sortable: true,
        center: true,
        cell: (row) => (
          <span className={row.status === "Delivered" ? "text-green-400" : "text-yellow-300"}>
            {row.status}
          </span>
        ),
      },
      {
        name: 'Action',
        center: true,
        cell: (row) => (
          <div className="max-md:flex max-md:w-56">
            <button
              className="bg-green-500 text-white px-2 py-1 rounded mr-2"
              onClick={() => {
                setSelectedOrder(row);
                setIsOrderDetailsOpen(true);
              }}
            >
              Details
            </button>
          </div>
        )
      }
    ];
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const response = await orderBySeller();
        console.log('Response:', response.data);
        const formattedRecords = response.data.map((order) => ({
          orderId: order._id,
          email: order.userId?.email || "N/A",
          date: new Date(order.orderDate).toLocaleDateString(),
          totalPrice: order.totalPrice,
          paymentStatus: order.paymentStatus,
          paymentMethod: order.paymentMethod || "N/A", // Add payment method
          status: order.status,
          products: order.orderItems, // Add products
          shippingInfo: order.deliveryAddress, // Add shipping info
          fullName: order.userId?.fullName || "N/A", // Add full name
          phoneNumber: order.userId?.phone || "N/A", // Add phone number
        }));
        setRecords(formattedRecords);
      } catch (error) {
        console.error("Error fetching seller's orders:", error);
      } finally {
        setLoading(false);
      }
    };
    useEffect(() => {
      fetchOrders(); // Fetch orders on component mount
    }, []);
    const handleFilter = (event) => {
      const value = event.target.value.toLowerCase();
      const filteredData = records.filter(row =>
        row.orderId.toLowerCase().includes(value) || row.email.toLowerCase().includes(value)
      );
      setRecords(filteredData);
    };
    return (
      <div className="h-screen">
        <h1 className="grid place-items-center text-4xl py-4 text-white">Manage Seller Orders</h1>
        <div className="w-[90%] lg:w-[70%] mx-auto rounded-md shadow-md">
          <div className="flex justify-end my-2">
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
          {loading ? (
            <p className="text-center text-white">Loading...</p>
          ) : (
            <CustomDataTable columns={columns} records={records} />
          )}
        </div>
        {/* Modal */}
        {isOrderDetailsOpen && (
          <OrderDetailsManage orderData={selectedOrder} onClose={() => setIsOrderDetailsOpen(false)} />
        )}
      </div>
    );
  };
  export default OrderManage;