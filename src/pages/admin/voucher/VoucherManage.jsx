// import { useState, useEffect } from 'react';
// import { FaSearch } from "react-icons/fa";
// import AddVoucher from '../../../components/voucher/AddVoucher';
// import EditVoucher from '../../../components/voucher/EditVoucher';
// import CustomDataTable from '../../../components/datatable/CustomDataTable';
// import { getListVoucher, addVoucher } from "../../../services/api/VoucherApi";

// const VoucherManage = () => {
//   const [vouchers, setVouchers] = useState([]);
//   const [selectedVoucher, setSelectedVoucher] = useState(null);
//   const [isAddVoucherOpen, setIsAddVoucherOpen] = useState(false);
//   const [isEditVoucherOpen, setIsEditVoucherOpen] = useState(false);
//   const [records, setRecords] = useState(vouchers);

//   const fetchVouchers = async () => {
//     try {
//       const fetchedVouchers = await getListVoucher();
//       setVouchers(fetchedVouchers);
//       setRecords(fetchedVouchers); // Đồng bộ dữ liệu để tìm kiếm
//       console.log('Vouchers:', fetchedVouchers);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const handleAddVoucher = async (voucherData) => {
//     try {
//       const token = 'your-auth-token'; // Thay bằng token lấy từ hệ thống xác thực
//       const newVoucher = await addVoucher(voucherData, token);
//       setVouchers([...vouchers, newVoucher]); // Cập nhật danh sách vouchers
//       setRecords([...vouchers, newVoucher]); // Đồng bộ với records
//       setIsAddVoucherOpen(false);
//     } catch (error) {
//       console.error('Error adding voucher:', error);
//     }
//   };

//   const handleFilter = (event) => {
//     const newData = vouchers.filter(row => {
//       return row.name.toLowerCase().includes(event.target.value.toLowerCase());
//     });
//     setRecords(newData);
//   };

//   useEffect(() => {
//     fetchVouchers();
//   }, []);

//   const columns = [
//     {
//       name: "Code",
//       selector: row => row.code,
//       sortable: true,
//       center: true,
//     },
//     {
//       name: "Start date",
//       selector: row => row.createdAt,
//       cell: (row) =>
//         new Intl.DateTimeFormat("en-US", {
//           year: "numeric",
//           month: "short",
//           day: "numeric",
//           hour: "2-digit",
//           minute: "2-digit",
//           second: "2-digit",
//         }).format(new Date(row.createdAt)),
//       sortable: true,
//       center: true,
//     },
//     {
//       name: "End date",
//       selector: row => row.validity,
//       cell: (row) =>
//         new Intl.DateTimeFormat("en-US", {
//           year: "numeric",
//           month: "short",
//           day: "numeric",
//           hour: "2-digit",
//           minute: "2-digit",
//           second: "2-digit",
//         }).format(new Date(row.validity)),
//       sortable: true,
//       center: true,
//     },
//     {
//       name: "Conditions apply",
//       selector: row => row.minCartPrice,
//       cell: (row) => (
//         <div>
//           Đơn hàng có giá trị tối thiểu là{" "}
//           {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(row.minCartPrice)}
//         </div>
//       ),
//       sortable: true,
//       center: true,
//     },
//     {
//       name: "Discount Value",
//       selector: row => row.discount,
//       sortable: true,
//       center: true,
//     },
//     {
//       name: "Description",
//       selector: row => row.description,
//       sortable: true,
//       center: true,
//     },
//     {
//       name: 'Action',
//       center: true,
//       cell: (row) => (
//         <div className="max-md:flex max-md:w-56">
//           <button
//             className="bg-yellow-400 text-white px-2 py-1 rounded mr-2"
//             onClick={() => {
//               setSelectedVoucher(row);
//               setIsEditVoucherOpen(true);
//             }}
//           >
//             Edit
//           </button>
//           <button
//             className="bg-red-500 text-white px-2 py-1 rounded"
//             onClick={() => {
//               setSelectedVoucher(row);
//             }}
//           >
//             Delete
//           </button>
//         </div>
//       ),
//     }
//   ];

//   return (
//     <div className="h-screen">
//       <h1 className="grid place-items-center text-4xl py-4 text-white">Manage Voucher</h1>
//       <div className="w-[90%] lg:w-[80%] mx-auto rounded-md shadow-md">
//         <div className="flex justify-between my-2">
//           <button
//             className="btn-add bg-blue-500 text-white px-4 py-2 rounded"
//             onClick={() => setIsAddVoucherOpen(true)}
//           >
//             Add voucher
//           </button>
//           {/* Search Box */}
//           <div className="w-48 md:w-64 flex items-center rounded-md px-2 bg-gray-800">
//             <FaSearch className="flex items-center justify-center w-10 text-white" />
//             <input
//               type="text"
//               onChange={handleFilter}
//               placeholder="Search..."
//               className="bg-transparent w-44 border-none outline-none text-white focus:ring-0"
//             />
//           </div>
//         </div>
//         <CustomDataTable columns={columns} records={records} />
//       </div>
//       {/* Modal */}
//       {isAddVoucherOpen && (
//         <AddVoucher
//           onClose={() => setIsAddVoucherOpen(false)}
//           onAddVoucher={handleAddVoucher}
//         />
//       )}
//       {isEditVoucherOpen && (
//         <EditVoucher onClose={() => setIsEditVoucherOpen(false)} />
//       )}
//     </div>
//   );
// };

// export default VoucherManage;

import { useState, useEffect } from 'react';
import { FaSearch } from "react-icons/fa";
import AddVoucher from '../../../components/voucher/AddVoucher';
import EditVoucher from '../../../components/voucher/EditVoucher';
import CustomDataTable from '../../../components/datatable/CustomDataTable';
import { getListVoucher, addVoucher, editVoucher, deleteVoucher } from "../../../services/api/VoucherApi";

const VoucherManage = () => {
  const [vouchers, setVouchers] = useState([]);
  const [selectedVoucher, setSelectedVoucher] = useState(null);
  const [isAddVoucherOpen, setIsAddVoucherOpen] = useState(false);
  const [isEditVoucherOpen, setIsEditVoucherOpen] = useState(false);
  const [records, setRecords] = useState(vouchers);

  const fetchVouchers = async () => {
    try {
      const fetchedVouchers = await getListVoucher();
      setVouchers(fetchedVouchers);
      setRecords(fetchedVouchers); // Đồng bộ dữ liệu để tìm kiếm
      console.log('Vouchers:', fetchedVouchers);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddVoucher = async (voucherData) => {
    try {
      const token = 'your-auth-token'; // Thay bằng token lấy từ hệ thống xác thực
      const newVoucher = await addVoucher(voucherData, token);
      setVouchers([...vouchers, newVoucher]); // Cập nhật danh sách vouchers
      setRecords([...vouchers, newVoucher]); // Đồng bộ với records
      setIsAddVoucherOpen(false);
    } catch (error) {
      console.error('Error adding voucher:', error);
    }
  };

  const handleEditVoucher = async (id, updatedData) => {
    try {
      const token = 'your-auth-token'; // Thay bằng token lấy từ hệ thống xác thực
      const updatedVoucher = await editVoucher(id, updatedData, token);
      setVouchers(vouchers.map(voucher => (voucher.id === id ? updatedVoucher : voucher))); // Cập nhật danh sách vouchers
      setRecords(vouchers.map(voucher => (voucher.id === id ? updatedVoucher : voucher))); // Đồng bộ với records
      setIsEditVoucherOpen(false);
    } catch (error) {
      console.error('Error editing voucher:', error);
    }
  };

  const handleDeleteVoucher = async (id) => {
    try {
      const token = 'your-auth-token'; // Thay bằng token lấy từ hệ thống xác thực
      await deleteVoucher(id, token);
      setVouchers(vouchers.filter(voucher => voucher.id !== id)); // Xóa voucher khỏi danh sách
      setRecords(vouchers.filter(voucher => voucher.id !== id)); // Đồng bộ với records
    } catch (error) {
      console.error('Error deleting voucher:', error);
    }
  };

  const handleFilter = (event) => {
    const newData = vouchers.filter(row => {
      return row.name.toLowerCase().includes(event.target.value.toLowerCase());
    });
    setRecords(newData);
  };

  useEffect(() => {
    fetchVouchers();
  }, []);

  const columns = [
    {
      name: "Code",
      selector: row => row.code,
      sortable: true,
      center: true,
    },
    {
      name: "Start date",
      selector: row => row.createdAt,
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
      name: "End date",
      selector: row => row.validity,
      cell: (row) =>
        new Intl.DateTimeFormat("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }).format(new Date(row.validity)),
      sortable: true,
      center: true,
    },
    {
      name: "Conditions apply",
      selector: row => row.minCartPrice,
      cell: (row) => (
        <div>
          Đơn hàng có giá trị tối thiểu là{" "}
          {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(row.minCartPrice)}
        </div>
      ),
      sortable: true,
      center: true,
    },
    {
      name: "Discount Value",
      selector: row => row.discount,
      sortable: true,
      center: true,
    },
    {
      name: "Description",
      selector: row => row.description,
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
            onClick={() => {
              setSelectedVoucher(row);
              setIsEditVoucherOpen(true);
            }}
          >
            Edit
          </button>
          <button
            className="bg-red-500 text-white px-2 py-1 rounded"
            onClick={() => {
              handleDeleteVoucher(row.id)}}
          >
            Delete
          </button>
        </div>
      ),
    }
  ];

  return (
    <div className="h-screen">
      <h1 className="grid place-items-center text-4xl py-4 text-white">Manage Voucher</h1>
      <div className="w-[90%] lg:w-[80%] mx-auto rounded-md shadow-md">
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
              onChange={handleFilter}
              placeholder="Search..."
              className="bg-transparent w-44 border-none outline-none text-white focus:ring-0"
            />
          </div>
        </div>
        <CustomDataTable columns={columns} records={records} />
      </div>
      {/* Modal */}
      {isAddVoucherOpen && (
        <AddVoucher
          onClose={() => setIsAddVoucherOpen(false)}
          onAddVoucher={handleAddVoucher}
        />
      )}
      {isEditVoucherOpen && (
        <EditVoucher
        onClose={() => setIsEditVoucherOpen(false)}
        onEditVoucher={handleEditVoucher}
        selectedVoucher={selectedVoucher}  // Đảm bảo giá trị này được truyền đúng
      />
      )}
    </div>
  );
};

export default VoucherManage;
