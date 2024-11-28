import React, { useState, useEffect } from 'react'
import DataTable, { createTheme } from 'react-data-table-component'

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

const UserManage = () => {
  // Responsive Table
  const [scrollHeight, setScrollHeight] = useState("430px");
  const updateScrollHeight = () => {
    if (window.innerWidth < 768) {
      setScrollHeight("430px");
    } else if (window.innerWidth < 1024) {
      setScrollHeight("450px");
    } else if (window.innerWidth < 1280) {
      setScrollHeight("500px");
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
      name: "Name",
      selector: row => row.name,
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
      name: "Gender",
      selector: row => row.gender,
      sortable: true,
      center: true,
    },
    {
      name: "Phone",
      selector: row => row.phone,
      sortable: true,
      center: true,
    },
    {
      name: "Address",
      selector: row => row.address,
      sortable: true,
      center: true,
    },
    {
      name: "Role",
      selector: row => row.role,
      sortable: true,
      center: true,
    },
    {
      name: 'Action',
      center: true,
      cell: (row) => (
        <div className="max-md:w-80 max-md:flex md:w-80">
          <button
            className="bg-green-500 text-white px-2 py-1 rounded mr-2"
            onClick={() => handleDetails(row)}
          >
            Details
          </button>
          <button
            className="bg-red-500 text-white px-2 py-1 rounded"
            onClick={() => handleBand(row)}
          >
            Band
          </button>
        </div>
      ),
    }
  ]
  const data = [
    {
      id: 1,
      name: 'Phuoc',
      email: 'phuoc@gmail.com',
      gender: 'Male',
      phone: '123-456-789',
      address: '123 Main St, City A',
      role: 'Store',
    },
    {
      id: 2,
      name: 'Huy',
      email: 'huy@gmail.com',
      gender: 'Male',
      phone: '987-654-321',
      address: '456 Elm St, City B',
      role: 'User',
    },
    {
      id: 3,
      name: 'Phong',
      email: 'phong@gmail.com',
      gender: 'Male',
      phone: '555-555-555',
      address: '789 Oak St, City C',
      role: 'User',
    },
    {
      id: 4,
      name: 'Cuong',
      email: 'cuong@gmail.com',
      gender: 'Male',
      phone: '111-222-333',
      address: '101 Pine St, City D',
      role: 'Store',
    },
    {
      id: 5,
      name: 'Vinh',
      email: 'vinh@gmail.com',
      gender: 'Male',
      phone: '444-444-444',
      address: '202 Maple St, City E',
      role: 'Store',
    },
    {
      id: 6,
      name: 'Dat',
      email: 'dat@gmail.com',
      gender: 'Male',
      phone: '666-777-888',
      address: '303 Cedar St, City F',
      role: 'User',
    },
    {
      id: 7,
      name: 'Trang',
      email: 'trang@gmail.com',
      gender: 'Female',
      phone: '999-888-777',
      address: '404 Birch St, City G',
      role: 'Store',
    },
    {
      id: 8,
      name: 'Lan',
      email: 'lan@gmail.com',
      gender: 'Female',
      phone: '888-777-666',
      address: '505 Willow St, City H',
      role: 'User',
    },
    {
      id: 9,
      name: 'Mai',
      email: 'mai@gmail.com',
      gender: 'Female',
      phone: '777-666-555',
      address: '606 Spruce St, City I',
      role: 'Store',
    },
    {
      id: 10,
      name: 'Hung',
      email: 'hung@gmail.com',
      gender: 'Male',
      phone: '555-444-333',
      address: '707 Cypress St, City J',
      role: 'User',
    },
    {
      id: 11,
      name: 'Ngoc',
      email: 'ngoc@gmail.com',
      gender: 'Female',
      phone: '444-333-222',
      address: '808 Aspen St, City K',
      role: 'Store',
    },
    {
      id: 12,
      name: 'Minh',
      email: 'minh@gmail.com',
      gender: 'Male',
      phone: '333-222-111',
      address: '909 Beech St, City L',
      role: 'User',
    },
    {
      id: 13,
      name: 'Hoa',
      email: 'hoa@gmail.com',
      gender: 'Female',
      phone: '222-111-000',
      address: '1010 Cedar St, City M',
      role: 'Store',
    },
    {
      id: 14,
      name: 'Anh',
      email: 'anh@gmail.com',
      gender: 'Male',
      phone: '000-111-222',
      address: '1111 Maple St, City N',
      role: 'User',
    },
    {
      id: 15,
      name: 'Binh',
      email: 'binh@gmail.com',
      gender: 'Male',
      phone: '123-456-789',
      address: '1212 Pine St, City O',
      role: 'User',
    },
    {
      id: 16,
      name: 'Ly',
      email: 'ly@gmail.com',
      gender: 'Female',
      phone: '999-888-777',
      address: '1313 Oak St, City P',
      role: 'Store',
    },
    {
      id: 17,
      name: 'Tien',
      email: 'tien@gmail.com',
      gender: 'Male',
      phone: '888-777-666',
      address: '1414 Elm St, City Q',
      role: 'User',
    },
    {
      id: 18,
      name: 'Thuy',
      email: 'thuy@gmail.com',
      gender: 'Female',
      phone: '777-666-555',
      address: '1515 Spruce St, City R',
      role: 'Store',
    },
  ];
  // Button Details
  const handleDetails = (row) => {
    alert(`Edit user: ${row.name}`);
    // Add edit logic here
  };
  // Button Band
  const handleBand = (row) => {
    const confirm = window.confirm(`Are you sure you want to delete ${row.name}?`);
    if (confirm) {
      alert(`User ${row.name} has been deleted.`);
      // Add delete logic here
    }
  };

  return (
    <div className="h-screen">
      <h1 className="grid place-items-center text-4xl py-4 text-white">Manage User</h1>
      <div className="md:w-[650px] lg:w-[850px] xl:w-[90%] mx-auto rounded-md shadow-md">
        <div className="overflow-hidden">
          <DataTable
          theme='dark'
            columns={columns}
            data={data}
            fixedHeader
            pagination
            fixedHeaderScrollHeight={scrollHeight}
            paginationPosition="bottom"
          />
        </div>
      </div>
    </div>
  )
}

export default UserManage;