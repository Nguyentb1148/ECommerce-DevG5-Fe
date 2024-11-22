import React, { useState, useEffect } from 'react'
import DataTable from 'react-data-table-component'
import AddCategory from '../../../components/category/AddCategory';
import EditCategory from '../../../components/category/EditCategory';
const CategoryManage = () => {
  // Open Modal
  const [isAddCategoryOpen, setIsAddCategoryOpen] = useState(false);
  const [isEditCategoryOpen, setIsEditCategoryOpen] = useState(false);
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
    updateScrollHeight(); // Cập nhật ngay khi component render lần đầu
    window.addEventListener("resize", updateScrollHeight); // Lắng nghe sự kiện thay đổi kích thước
    return () => window.removeEventListener("resize", updateScrollHeight); // Cleanup
  }, []);
  // Fetch data
  const columns = [
    {
      name: "Id",
      selector: row => row.id,
      sortable: true,
      center: true,
    },
    {
      name: "Name",
      selector: row => row.name,
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
            onClick={() => setIsEditCategoryOpen(true)}
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
    }
  ]
  const data = [
    {
      id: 1,
      name: "phuoc",
      email: "phuoc@gmail.com",
      age: "21"
    },
    {
      id: 2,
      name: "huy",
      email: "huy@gmail.com",
      age: "22"
    },
    {
      id: 3,
      name: "phong",
      email: "phong@gmail.com",
      age: "23"
    }, {
      id: 4,
      name: "cuong",
      email: "cuong@gmail.com",
      age: "24"
    },
    {
      id: 5,
      name: "vinh",
      email: "vinh@gmail.com",
      age: "25"
    },
    {
      id: 6,
      name: "dat",
      email: "dat@gmail.com",
      age: "26"
    }, {
      id: 7,
      name: "phong",
      email: "phong@gmail.com",
      age: "23"
    }, {
      id: 8,
      name: "cuong",
      email: "cuong@gmail.com",
      age: "24"
    },
    {
      id: 9,
      name: "vinh",
      email: "vinh@gmail.com",
      age: "25"
    },
    {
      id: 10,
      name: "dat",
      email: "dat@gmail.com",
      age: "26"
    },
    {
      id: 11,
      name: "phong",
      email: "phong@gmail.com",
      age: "23"
    }, {
      id: 12,
      name: "cuong",
      email: "cuong@gmail.com",
      age: "24"
    },
    {
      id: 13,
      name: "vinh",
      email: "vinh@gmail.com",
      age: "25"
    },
    {
      id: 14,
      name: "dat",
      email: "dat@gmail.com",
      age: "26"
    }
  ]
  // Button delete
  const handleDelete = (row) => {
    const confirm = window.confirm(`Are you sure you want to delete ${row.name}?`);
    if (confirm) {
      alert(`User ${row.name} has been deleted.`);
    }
  };

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
        <div className="overflow-hidden">
          <DataTable
            columns={columns}
            data={data}
            fixedHeader
            pagination
            fixedHeaderScrollHeight={scrollHeight}
            paginationPosition="bottom"
          />
        </div>
      </div>
      {/* Modal */}
      {isAddCategoryOpen && (
        <AddCategory onClose={() => setIsAddCategoryOpen(false)} />
      )}
      {isEditCategoryOpen && (
        <EditCategory onClose={() => setIsEditCategoryOpen(false)} />
      )}
    </div>
  )
}

export default CategoryManage;