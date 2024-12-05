import React, { useState, useEffect } from 'react'
import { FaSearch } from "react-icons/fa";
import { FiCheck, FiTruck, FiPackage, FiHome } from "react-icons/fi";
import DataTable, { createTheme } from 'react-data-table-component';
import OrderDetailsManage from '../../../components/orders/OrderDetailsManage';

createTheme('dark', {
  text: {
    primary: '#e5e7eb',
    secondary: '#9ca3af',
  },
  background: {
    default: '#1f2937',
  },
  context: {
    background: '#374151',
    text: '#ffffff',
  },
  divider: {
    default: '#4b5563',
  },
  action: {
    button: '#4f46e5',
    hover: 'rgba(255, 255, 255, 0.1)',
    disabled: 'rgba(255, 255, 255, 0.3)',
  },
}, 'dark');

const OrderManage = () => {
  const [isOrderDetailsOpen, setIsOrderDetailsOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
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

  useEffect(() => {
    updateScrollHeight();
    window.addEventListener("resize", updateScrollHeight);
    return () => window.removeEventListener("resize", updateScrollHeight);
  }, []);

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
      )
    },
    {
      name: "Shipping",
      selector: row => row.shippingStatus,
      sortable: true,
      center: true,
      cell: (row) => (
        <span className={["Processing", "Order Placed"].includes(row.shippingStatus) ? "text-yellow-300" : "text-green-400"}>
          {row.shippingStatus}
        </span>
      )
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
      ),
    }
  ]

  const data = [
    {
      id: 1,
      orderId: "ORD-2024-001",
      email: "Phuoc@mgail.com",
      date: "2024-03-01",
      products: [
        {
          name: "Product 1",
          quantity: 2,
          price: 29.99,
          image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30"
        },
        {
          name: "Product 2",
          quantity: 1,
          price: 49.99,
          image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12"
        }
      ],
      totalPrice: 109.97,
      paymentStatus: "Pending",
      paymentMethod: "VNpay",
      shippingInfo: {
        phoneNumber: "0905886611",
        fullName: "Nguyen Van Phuoc",
        address: "123 Nguyen Tri Phuong"
      },
      progress: 100,
      shippingStatus: "Delivered",
      timeline: [
        { status: "Order Placed", date: "2024-01-15 09:00", icon: FiPackage, completed: true },
        { status: "Processing", date: "2024-01-15 11:30", icon: FiCheck, completed: true },
        { status: "Out for Delivery", date: "2024-01-16 14:20", icon: FiTruck, completed: true },
        { status: "Delivered", date: "2024-01-17 16:45", icon: FiHome, completed: true }
      ]
    },
    {
      id: 2,
      orderId: "ORD-2024-002",
      email: "Lan@mgail.com",
      date: "2024-03-05",
      products: [
        {
          name: "Product 3",
          quantity: 1,
          price: 19.99,
          image: "https://images.unsplash.com/photo-1604817102030-ded9f358b490"
        },
        {
          name: "Product 4",
          quantity: 3,
          price: 15.99,
          image: "https://images.unsplash.com/photo-1633950667955-3f4d7c9e609b"
        }
      ],
      totalPrice: 67.96,
      paymentStatus: "Completed",
      paymentMethod: "Stripe",
      shippingInfo: {
        phoneNumber: "0909887766",
        fullName: "Nguyen Thi Lan",
        address: "456 Le Lai"
      },
      progress: 50,
      shippingStatus: "Processing",
      timeline: [
        { status: "Order Placed", date: "2024-03-05 09:00", icon: FiPackage, completed: true },
        { status: "Processing", date: "2024-03-05 12:00", icon: FiCheck, completed: true },
        { status: "Out for Delivery", date: "", icon: FiTruck, completed: false },
        { status: "Delivered", date: "", icon: FiHome, completed: false }
      ]
    },
    {
      id: 3,
      orderId: "ORD-2024-003",
      email: "Hoa@mgail.com",
      date: "2024-03-08",
      products: [
        {
          name: "Product 5",
          quantity: 2,
          price: 39.99,
          image: "https://images.unsplash.com/photo-1571303658981-dc174a848276"
        }
      ],
      totalPrice: 79.98,
      paymentStatus: "Pending",
      paymentMethod: "Stripe",
      shippingInfo: {
        phoneNumber: "0912345678",
        fullName: "Tran Thi Hoa",
        address: "789 Hoang Sa"
      },
      progress: 20,
      shippingStatus: "Order Placed",
      timeline: [
        { status: "Order Placed", date: "2024-03-08 10:00", icon: FiPackage, completed: true },
        { status: "Processing", date: "", icon: FiCheck, completed: false },
        { status: "Out for Delivery", date: "", icon: FiTruck, completed: false },
        { status: "Delivered", date: "", icon: FiHome, completed: false }
      ]
    },
    {
      id: 4,
      orderId: "ORD-2024-004",
      email: "Tuan@mgail.com",
      date: "2024-03-10",
      products: [
        {
          name: "Product 6",
          quantity: 1,
          price: 99.99,
          image: "https://images.unsplash.com/photo-1566570055-39b8a3ac9299"
        },
        {
          name: "Product 7",
          quantity: 1,
          price: 129.99,
          image: "https://images.unsplash.com/photo-1594584026649-26dba75ea842"
        }
      ],
      totalPrice: 229.98,
      paymentStatus: "Completed",
      paymentMethod: "VNpay",
      shippingInfo: {
        phoneNumber: "0922334455",
        fullName: "Nguyen Hoang Tuan",
        address: "123 Pham Ngoc Thach"
      },
      progress: 85,
      shippingStatus: "Out for Delivery",
      timeline: [
        { status: "Order Placed", date: "2024-03-10 08:00", icon: FiPackage, completed: true },
        { status: "Processing", date: "2024-03-10 10:30", icon: FiCheck, completed: true },
        { status: "Out for Delivery", date: "2024-03-11 12:20", icon: FiTruck, completed: true },
        { status: "Delivered", date: "", icon: FiHome, completed: false }
      ]
    },
    {
      id: 5,
      orderId: "ORD-2024-005",
      email: "Mai@mgail.com",
      date: "2024-03-15",
      products: [
        {
          name: "Product 8",
          quantity: 4,
          price: 19.99,
          image: "https://images.unsplash.com/photo-1633132760760-69c60c7b88cc"
        }
      ],
      totalPrice: 79.96,
      paymentStatus: "Completed",
      paymentMethod: "Stripe",
      shippingInfo: {
        phoneNumber: "0933556677",
        fullName: "Pham Thi Mai",
        address: "321 Hoang Hoa Tham"
      },
      progress: 50,
      shippingStatus: "Processing",
      timeline: [
        { status: "Order Placed", date: "2024-03-15 11:00", icon: FiPackage, completed: true },
        { status: "Processing", date: "2024-03-15 13:00", icon: FiCheck, completed: true },
        { status: "Out for Delivery", date: "", icon: FiTruck, completed: false },
        { status: "Delivered", date: "", icon: FiHome, completed: false }
      ]
    },
  ];


  const [records, setRecords] = useState(data);

  const handleFiter = (event) => {
    const newData = data.filter(row => row.id.toString().includes(event.target.value.toString()) || row.email.toLowerCase().includes(event.target.value.toLowerCase()));
    setRecords(newData);
  }

  return (
    <div className="h-screen">
      <h1 className="grid place-items-center text-4xl py-4 text-white">Manage Orders</h1>
      <div className="w-[90%] lg:w-[70%] mx-auto rounded-md shadow-md">
        <div className="flex justify-end my-2">
          {/* Search Box */}
          <div className="w-48 md:w-64 flex items-center rounded-md px-2 bg-gray-800">
            <FaSearch className="flex items-center justify-center w-10 text-white" />
            <input
              type="text"
              onChange={handleFiter}
              placeholder="Search..."
              className="bg-transparent w-44 border-none outline-none text-white focus:ring-0"
            />
          </div>
        </div>
        <div className="overflow-hidden">
          <DataTable
            theme='dark'
            columns={columns}
            data={records}
            fixedHeader
            pagination
            fixedHeaderScrollHeight={scrollHeight}
            paginationPosition="bottom"
          />
        </div>
      </div>
      {/* Modal */}
      {isOrderDetailsOpen && (
        <OrderDetailsManage orderData={selectedOrder} onClose={() => setIsOrderDetailsOpen(false)} />
      )}
    </div>
  )
}

export default OrderManage;