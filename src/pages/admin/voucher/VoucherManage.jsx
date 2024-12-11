import { useState, useEffect } from 'react';
import { FaSearch } from "react-icons/fa";
import AddVoucher from '../../../components/voucher/AddVoucher';
import EditVoucher from '../../../components/voucher/EditVoucher';
import CustomDataTable from '../../../components/datatable/CustomDataTable';
import { getListVoucher, addVoucher, editVoucher, deleteVoucher } from "../../../services/api/VoucherApi";
import { format } from 'date-fns';

const VoucherManage = () => {
  const [vouchers, setVouchers] = useState([]);
  const [selectedVoucher, setSelectedVoucher] = useState(null);
  const [isAddVoucherOpen, setIsAddVoucherOpen] = useState(false);
  const [isEditVoucherOpen, setIsEditVoucherOpen] = useState(false);
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const token = 'your-auth-token'; // Replace with your actual token

  // Fetch vouchers from the API
  const fetchVouchers = async () => {
    setLoading(true);
    try {
      const fetchedVouchers = await getListVoucher();
      console.log(fetchedVouchers);
      setVouchers(fetchedVouchers);
      setRecords(fetchedVouchers); // Synchronize records for searching
    } catch (error) {
      setError('Error fetching vouchers. Please try again later.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Add new voucher
  const handleAddVoucher = async (voucherData) => {
    setLoading(true);
    try {
      const newVoucher = await addVoucher(voucherData, token);
      setVouchers((prevVouchers) => [...prevVouchers, newVoucher]);
      setRecords((prevRecords) => [...prevRecords, newVoucher]); // Sync records
      setIsAddVoucherOpen(false);
    } catch (error) {
      setError('Error adding voucher. Please try again.');
      console.error('Error adding voucher:', error);
    } finally {
      setLoading(false);
    }
  };

  // Edit existing voucher
  const handleEditVoucher = async (id, updatedData) => {
    setLoading(true);
    try {
      const updatedVoucher = await editVoucher(id, updatedData, token);
      console.log("Updated Voucher: ", updatedVoucher);
      
      // Re-fetch the vouchers after editing
      fetchVouchers();

      setSelectedVoucher(updatedVoucher); // Update selectedVoucher if necessary
      setIsEditVoucherOpen(false); // Close the edit modal
    } catch (error) {
      setError('Error editing voucher. Please try again.');
      console.error('Error editing voucher:', error);
    } finally {
      setLoading(false);
    }
  };

  // Delete voucher
  const handleDeleteVoucher = async (id) => {
    if (!id) {
      console.error('Voucher ID is missing');
      setError('Voucher ID is missing');
      return;
    }

    const confirmDelete = window.confirm("Are you sure you want to delete this voucher?");
    if (!confirmDelete) return;

    setLoading(true);
    try {
      await deleteVoucher(id, token);

      // Re-fetch the vouchers after deleting
      fetchVouchers();

      alert('Voucher deleted successfully!');
    } catch (error) {
      setError('Error deleting voucher. Please try again.');
      console.error('Error deleting voucher:', error);
    } finally {
      setLoading(false);
    }
  };

  // Search/filter vouchers
  const handleFilter = (event) => {
    const query = event.target.value.toLowerCase();
    const filteredVouchers = vouchers.filter((voucher) =>
      voucher.code.toLowerCase().includes(query)
    );
    setRecords(filteredVouchers);
  };

  useEffect(() => {
    fetchVouchers();
  }, []);

  // Data table columns
  const columns = [
    {
      name: "Code",
      selector: (row) => row.code,
      sortable: true,
      center: true,
    },
    {
      name: "Start date",
      selector: (row) => row.createdAt,
      cell: (row) => format(new Date(row.createdAt), 'dd/MM/yyyy'),
      sortable: true,
      center: true,
    },
    {
      name: "End date",
      selector: (row) => row.validity,
      cell: (row) => {
        const validity = new Date(row.validity);
        return isNaN(validity) ? 'Invalid date' : format(validity, 'dd/MM/yyyy');
      },
      sortable: true,
      center: true,
    },
    {
      name: "Conditions apply",
      selector: (row) => row.minCartPrice,
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
      selector: (row) => row.discount,
      sortable: true,
      center: true,
    },
    {
      name: "Description",
      selector: (row) => row.description,
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
              console.log(row);
              setSelectedVoucher(row);
              setIsEditVoucherOpen(true);
            }}
          >
            Edit
          </button>
          <button
            className="bg-red-500 text-white px-2 py-1 rounded"
            onClick={() => {
              if (row._id) {
                handleDeleteVoucher(row._id);
              } else {
                console.error('Voucher ID is missing in the row');
              }
            }}
          >
            Delete
          </button>
        </div>
      ),
    },
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
        {error && <div className="text-red-500 text-center">{error}</div>}
        <CustomDataTable columns={columns} records={records} loading={loading} />
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
          selectedVoucher={selectedVoucher}
        />
      )}
    </div>
  );
};

export default VoucherManage;
