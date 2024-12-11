import React, { useState, useEffect } from 'react';
import { FaSearch } from "react-icons/fa";
import AddVoucher from '../../../components/voucher/AddVoucher';
import EditVoucher from '../../../components/voucher/EditVoucher';
import CustomDataTable from '../../../components/datatable/CustomDataTable';
import { getListVoucher, addVoucher, editVoucher, deleteVoucher } from "../../../services/api/VoucherApi";
import { format } from 'date-fns';
import LoadingDots from '../../../components/loading/LoadingSpinner';
import {ToastContainer} from "react-toastify"; // Add a loading spinner component

const VoucherManage = () => {
  const [vouchers, setVouchers] = useState([]);
  const [selectedVoucher, setSelectedVoucher] = useState(null);
  const [isAddVoucherOpen, setIsAddVoucherOpen] = useState(false);
  const [isEditVoucherOpen, setIsEditVoucherOpen] = useState(false);
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false); // State to handle delete confirmation modal
  const [voucherToDelete, setVoucherToDelete] = useState(null); // State to store voucher to delete

  const token = 'your-auth-token'; // Replace with actual token

  // Fetch the list of vouchers
  const fetchVouchers = async () => {
    setLoading(true);
    try {
      const fetchedVouchers = await getListVoucher();
      setVouchers(fetchedVouchers);
      setRecords(fetchedVouchers);
    } catch (error) {
      setError('Error fetching vouchers. Please try again later.');
      console.error(error);
    } finally {
      setLoading(false); // Ensure this is in the finally block
    }
  };


  // Handle adding a new voucher
  const handleAddVoucher = async (voucherData) => {
    setLoading(true);
    try {
      const newVoucher = await addVoucher(voucherData, token);
      setVouchers((prevVouchers) => [...prevVouchers, newVoucher]); // Update vouchers list
      setRecords((prevRecords) => [...prevRecords, newVoucher]); // Sync with records
      setIsAddVoucherOpen(false);
    } catch (error) {
      setError('Error adding voucher. Please try again.');
      console.error('Error adding voucher:', error);
    } finally {
      setLoading(false);
    }
  };

  // Handle editing an existing voucher
  const handleEditVoucher = async (id, updatedData) => {
    setLoading(true);
    try {
      const updatedVoucher = await editVoucher(id, updatedData, token);
      const updatedVouchers = vouchers.map((voucher) =>
          voucher._id === id ? updatedVoucher : voucher
      );
      setVouchers(updatedVouchers); // Update vouchers list
      setRecords(updatedVouchers); // Sync with records
      setSelectedVoucher(null);    // Clear selected voucher state
      setIsEditVoucherOpen(false); // Close the edit modal
    } catch (error) {
      setError('Error editing voucher. Please try again.');
      console.error('Error editing voucher:', error);
    } finally {
      setLoading(false);
    }
  };

  // Handle deleting a voucher
  const handleDeleteVoucher = async () => {
    if (!voucherToDelete) {
      setError('Voucher ID is missing');
      return;
    }

    setLoading(true);
    try {
      await deleteVoucher(voucherToDelete._id, token);
      setVouchers((prevVouchers) => prevVouchers.filter((voucher) => voucher._id !== voucherToDelete._id));
      setRecords((prevRecords) => prevRecords.filter((voucher) => voucher._id !== voucherToDelete._id));
      alert('Voucher deleted successfully!');
      setShowDeleteConfirm(false); // Close the confirmation modal
    } catch (error) {
      setError('Error deleting voucher. Please try again.');
      console.error('Error deleting voucher:', error);
    } finally {
      setLoading(false);
    }
  };

  // Handle search filter
  const handleFilter = (event) => {
    const query = event.target.value.toLowerCase();
    const filteredVouchers = vouchers.filter((voucher) =>
        voucher.code.toLowerCase().includes(query) ||
        voucher.minCartPrice.toString().includes(query) ||
        voucher.discount.toString().includes(query) ||
        voucher.description.toLowerCase().includes(query)
    );
    setRecords(filteredVouchers);
  };

  // Fetch vouchers when the component mounts
  useEffect(() => {
    fetchVouchers();
  }, []);

  // Columns for the data table
  const columns = [
    {
      name: "Code",
      selector: (row) => row.code,
      sortable: true,
      center: true,
    },
    {
      name: "Start date",
      selector: (row) => row.startDate,
      cell: (row) => format(new Date(row.startDate), 'dd/MM/yyyy'),
      sortable: true,
      center: true,
    },
    {
      name: "End date",
      selector: (row) => row.endDate,
      cell: (row) => {
        const endDate = new Date(row.endDate);
        return isNaN(endDate) ? 'Invalid date' : format(endDate, 'dd/MM/yyyy');
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
                  setSelectedVoucher(row);
                  setIsEditVoucherOpen(true);
                }}
            >
              Edit
            </button>
            <button
                className="bg-red-500 text-white px-2 py-1 rounded"
                onClick={() => {
                  setVoucherToDelete(row); // Store the voucher to delete
                  setShowDeleteConfirm(true); // Show the confirmation modal
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
              Add Voucher
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

          {/* Show loading spinner or data */}
          {loading ? (
              <div className="flex justify-center">
                <LoadingDots />
              </div>
          ) : (
              <div>
                {error && <div className="text-red-500 text-center">{error}</div>}
                <CustomDataTable columns={columns} records={records} />
              </div>
          )}

          {/* Add Voucher Modal */}
          {isAddVoucherOpen && (
              <AddVoucher onClose={() => setIsAddVoucherOpen(false)} onAddVoucher={fetchVouchers} />
          )}

          {/* Edit Voucher Modal */}
          {isEditVoucherOpen && (
              <EditVoucher
                  onClose={() => setIsEditVoucherOpen(false)}
                  onEditVoucher={fetchVouchers}
                  selectedVoucher={selectedVoucher}
              />
          )}

          {/* Delete Confirmation Modal */}
          {showDeleteConfirm && (
              <div className="modal">
                <div className="modal-content">
                  <p>Are you sure you want to delete this voucher?</p>
                  <button onClick={handleDeleteVoucher}>Yes</button>
                  <button onClick={() => setShowDeleteConfirm(false)}>No</button>
                </div>
              </div>
          )}
        </div>

        <ToastContainer />
      </div>
  );
};

export default VoucherManage;
