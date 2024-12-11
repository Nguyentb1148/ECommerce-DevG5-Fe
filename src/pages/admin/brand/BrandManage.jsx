import React, { useState, useEffect } from "react";
import { deleteBrand, getBrands } from "../../../services/api/BrandsApi.jsx";
import AddBrand from "../../../components/brand/AddBrand.jsx";
import EditBrand from "../../../components/brand/EditBrand.jsx";
import { toast, ToastContainer } from "react-toastify";
import CustomDataTable from "../../../components/datatable/CustomDataTable.jsx";
import LoadingDots from "../../../components/loading/LoadingDots.jsx";


const BrandManage = () => {
  const [isAddBranchOpen, setIsAddBranchOpen] = useState(false);
  const [isEditBranchOpen, setIsEditBranchOpen] = useState(false);
  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [reFetchBrand, setReFetchBrand] = useState(false);

  useEffect(() => {
    const fetchBranches = async () => {
      try {
        const data = await getBrands();
        setBranches(data);
        console.log("Fetched branches:", data);
      } catch (error) {
        setErrorMessage("Failed to fetch branches.");
      } finally {
        setLoading(false);
      }
    };

    fetchBranches();
  }, [reFetchBrand]);

  const handleDelete = async (row) => {
    const confirm = window.confirm(
      `Are you sure you want to delete ${row.name}?`
    );
    if (confirm) {
      try {
        await deleteBrand(row._id);
        setBranches((prevBranches) =>
          prevBranches.filter((branch) => branch._id !== row._id)
        );
        toast.success(`Branch ${row.name} deleted successfully!`);
      } catch (error) {
        console.error(`Error deleting branch ${row.name}:`, error);
        setErrorMessage("Failed to delete the branch.");
      }
    }
  };

  const columns = [
    {
      name: "Brand",
      selector: (row) => row.name,
      sortable: true,
      center: "true",
    },
    {
      name: "Description",
      selector: (row) => row.description || "N/A", 
      sortable: true,
      center: "true",
    },
    {
      name: "Image", 
      cell: (row) => (
        <img
          src={row.imageUrl}
          alt={row.name}
          className="w-14 h-10 object-center rounded-md"
        />
      ),
      center: "true",
    },
    {
      name: "Action",
      center: true,
      cell: (row) => (
        <div className="max-md:flex max-md:w-56">
          <button
            className="bg-yellow-400 text-white px-2 py-1 rounded mr-2"
            onClick={() => {
              setSelectedBranch(row);
              setIsEditBranchOpen(true);
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

  return (
    <div className="h-screen">
      <h1 className="grid place-items-center text-4xl py-2 text-white">
        Brand Management
      </h1>
      <button
        className="btn-add my-2 ml-6 bg-blue-500 text-white px-4 py-2 rounded"
        onClick={() => setIsAddBranchOpen(true)}
      >
        Add Brand
      </button>
      <div className="w-[90%] lg:w-[70%] mx-auto rounded-md ">
        {loading ? (
            <div className="">
              <LoadingDots/>
            </div>
        ) : errorMessage ? (
          <div className="text-center text-red-500 p-4">{errorMessage}</div>
        ) : (
          <CustomDataTable columns={columns} records={branches} />
        )}
      </div>
      {/* Modals */}
      {isAddBranchOpen && (
        <AddBrand
          onClose={() => setIsAddBranchOpen(false)}
          setReFetchBrand={setReFetchBrand}
          reFetchBrand={reFetchBrand}
        />
      )}
      {isEditBranchOpen && selectedBranch && (
        <EditBrand
          onClose={() => setIsEditBranchOpen(false)}
          branch={selectedBranch}
          setReFetchBrand={setReFetchBrand}
          reFetchBrand={reFetchBrand}
        />
      )}

      <ToastContainer />
    </div>
  );
};

export default BrandManage;
