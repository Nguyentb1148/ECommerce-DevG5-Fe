import  { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import AddCategory from '../../../components/category/AddCategory';
import EditCategory from '../../../components/category/EditCategory';
import { deleteCategory, getCategories } from "../../../services/api/CategoryApi.jsx";
import { deleteImage } from "../../../configs/Cloudinary.jsx";

const CategoryManage = () => {
  const [isAddCategoryOpen, setIsAddCategoryOpen] = useState(false);
  const [isEditCategoryOpen, setIsEditCategoryOpen] = useState(false);
  const [scrollHeight, setScrollHeight] = useState("430px");
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);

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

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data);
        console.log("Fetched categories:", data);
      } catch (error) {
        setErrorMessage("Failed to fetch categories.");
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleDelete = async (row) => {
    const confirm = window.confirm(`Are you sure you want to delete ${row.name}?`);
    if (confirm) {
      try {
        const result = await deleteImage('category', row.name);
        if (result) {
          setCategories((prevCategories) =>
              prevCategories.filter((category) => category._id !== row._id)
          );
          try {
            await deleteCategory(row._id);
          } catch (error) {
            console.log(`Error deleting category ${row.name}:`, error);
          }
          alert(`Category ${row.name} deleted successfully!`);
        }
      } catch (error) {
        setErrorMessage("Failed to delete the category.");
      }
    }
  };

  const columns = [
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
      center: true,
    },
    {
      name: "Image",
      cell: (row) => (
          <img
              src={row.imageUrl}
              alt={row.name}
              className="w-10 h-10 object-cover rounded-md"
          />
      ),
      sortable: false,
      center: true,
    },
    {
      name: "Created At",
      selector: (row) => row.createdAt,
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
      name: "Updated At",
      selector: (row) => row.updatedAt,
      cell: (row) =>
          new Intl.DateTimeFormat("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          }).format(new Date(row.updatedAt)),
      sortable: true,
      center: true,
    },
    {
      name: "Action",
      center: true,
      cell: (row) => (
          <div className="flex">
            <button
                className="bg-yellow-400 text-white px-2 py-1 rounded mr-2"
                onClick={() => {
                  setSelectedCategory(row);
                  setIsEditCategoryOpen(true);
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
        <h1 className="grid place-items-center text-4xl py-2">Manage Category</h1>
        <button
            className="btn-add my-2 ml-6 bg-blue-500 text-white px-4 py-2 rounded"
            onClick={() => setIsAddCategoryOpen(true)}
        >
          Add category
        </button>
        <div className="w-[90%] lg:w-[70%] mx-auto border border-gray-300 rounded-md shadow-md">
          {loading ? (
              <div className="text-center p-4">Loading categories...</div>
          ) : errorMessage ? (
              <div className="text-center text-red-500 p-4">{errorMessage}</div>
          ) : (
              <DataTable
                  columns={columns}
                  data={categories}
                  fixedHeader
                  pagination
                  fixedHeaderScrollHeight={scrollHeight}
                  paginationPosition="bottom"
              />
          )}
        </div>
        {/* Modals */}
        {isAddCategoryOpen && (
            <AddCategory onClose={() => setIsAddCategoryOpen(false)} />
        )}
        {isEditCategoryOpen && selectedCategory && (
            <EditCategory
                onClose={() => setIsEditCategoryOpen(false)}
                category={selectedCategory}
            />
        )}
      </div>
  );
};

export default CategoryManage;
