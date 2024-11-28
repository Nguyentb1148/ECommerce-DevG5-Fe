import { useState, useEffect } from 'react';
import DataTable, { createTheme } from 'react-data-table-component';
import AddCategory from '../../../components/category/AddCategory';
import EditCategory from '../../../components/category/EditCategory';
import { deleteCategory, getCategories } from "../../../services/api/CategoryApi.jsx";
import { deleteImage } from "../../../configs/Cloudinary.jsx";

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
        <div className="max-md:flex max-md:w-56">
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
      <h1 className="grid place-items-center text-4xl py-2 text-white">Manage Category</h1>
      <button
        className="btn-add my-2 ml-6 bg-blue-500 text-white px-4 py-2 rounded"
        onClick={() => setIsAddCategoryOpen(true)}
      >
        Add category
      </button>
      <div className="w-[90%] lg:w-[70%] mx-auto  rounded-md ">
        {loading ? (
          <div className="grid gap-3">
            <div className="flex items-center justify-center">
              <svg className="animate-spin border-indigo-600" xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 34 34" fill="none">
                <g id="Component 2">
                  <circle id="Ellipse 717" cx="17.0007" cy="17.0001" r="14.2013" stroke="#D1D5DB" stroke-width="4" stroke-dasharray="2 3" />
                  <path id="Ellipse 715" d="M21.3573 30.5163C24.6694 29.4486 27.4741 27.2019 29.2391 24.2028C31.0041 21.2038 31.6065 17.661 30.9319 14.2471C30.2573 10.8332 28.3528 7.78584 25.5798 5.68345C22.8067 3.58105 19.3583 2.57 15.8891 2.84222" stroke="#4F46E5" stroke-width="4" />
                </g>
              </svg>
            </div>
          </div>
        ) : errorMessage ? (
          <div className="text-center text-red-500 p-4">{errorMessage}</div>
        ) : (
          <DataTable
            theme='dark'
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
