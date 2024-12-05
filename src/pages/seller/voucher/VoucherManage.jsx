import { useState, useEffect } from 'react'
import { FaSearch } from "react-icons/fa";
import AddVoucher from '../../../components/voucher/AddVoucher';
import EditVoucher from '../../../components/voucher/EditVoucher';
import DataTable, { createTheme } from 'react-data-table-component';

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

const VoucherManage = () => {
  const [isAddVoucherOpen, setIsAddVoucherOpen] = useState(false);
  const [isEditVoucherOpen, setIsEditVoucherOpen] = useState(false);
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
  useEffect(() => {
    updateScrollHeight();
    window.addEventListener("resize", updateScrollHeight);
    return () => window.removeEventListener("resize", updateScrollHeight);
  }, []);
  const columns = [
    {
      name: "Name",
      selector: row => row.name,
      sortable: true,
      center: true,
    },
    {
      name: "Start date",
      selector: row => row.start,
      sortable: true,
      center: true,
    },
    {
      name: "End date",
      selector: row => row.end,
      sortable: true,
      center: true,
    },
    {
      name: "Discount Type",
      selector: row => row.discountType,
      sortable: true,
      center: true,
    },
    {
      name: "Discount Value",
      selector: row => row.discountValue,
      sortable: true,
      center: true,
    },
    {
      name: 'Action',
      center: true,
      cell: (row) => (
        <div className="max-md:flex max-md:w-56">
          <button
            className="bg-yellow-400 text-white px-2 py-1 rounded mr-2"
            onClick={() => setIsEditVoucherOpen(true)}
          >
            Edit
          </button>
          <button
            className="bg-red-500 text-white px-2 py-1 rounded"
          >
            Delete
          </button>
        </div>
      ),
    }
  ]
  const data = [
    {
      id: 1,
      name: "Spring Sale 2024",
      start: "2024-03-01",
      end: "2024-03-31",
      discountType: "Percentage",
      discountValue: "10%",
    },
    {
      id: 2,
      name: "Black Friday 2024",
      start: "2024-11-22",
      end: "2024-11-30",
      discountType: "Fixed",
      discountValue: "50$",
    },
    {
      id: 3,
      name: "Summer Promo",
      start: "2024-06-01",
      end: "2024-06-30",
      discountType: "Percentage",
      discountValue: "15%",
    },
    {
      id: 4,
      name: "New Year Deal",
      start: "2024-01-01",
      end: "2024-01-15",
      discountType: "Fixed",
      discountValue: "30$",
    },
    {
      id: 5,
      name: "Christmas Discount",
      start: "2024-12-20",
      end: "2024-12-25",
      discountType: "Percentage",
      discountValue: "20%",
    },
  ];
  const [records, setRecords] = useState(data);

  const handleFiter = (event) => {
    const newData = data.filter(row => {
      return row.name.toLowerCase().includes(event.target.value.toLowerCase())
    })
    setRecords(newData);
  }
  return (
    <div className="h-screen">
      <h1 className="grid place-items-center text-4xl py-4 text-white">Manage Voucher</h1>
      <div className="w-[90%] lg:w-[70%] mx-auto rounded-md shadow-md">
        <div className="flex justify-between my-2">
          <button
            className="btn-add bg-blue-500 text-white px-4 py-2 rounded"
            onClick={() => setIsAddVoucherOpen(true)}
          >
            Add voucher
          </button>
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
      {isAddVoucherOpen && (
        <AddVoucher onClose={() => setIsAddVoucherOpen(false)} />
      )}
      {isEditVoucherOpen && (
        <EditVoucher onClose={() => setIsEditVoucherOpen(false)} />
      )}
    </div>
  )
}

export default VoucherManage;