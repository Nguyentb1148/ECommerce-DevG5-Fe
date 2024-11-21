import React, { useEffect, useState } from 'react';
import {deleteCategory, getCategories} from "../../../services/api/CategoryApi.jsx";
import {deleteImage} from "../../../configs/Cloudinary.jsx";
import {useNavigate} from "react-router-dom";

const CategoryPage = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

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

    const handleDelete = async (categoryId, folderName, categoryName) => {
        try {
            // Call the deleteImage function with folderName and categoryName
            const result = await deleteImage(folderName, categoryName);
            if (result) {
                setCategories((prevCategories) =>
                    prevCategories.filter((category) => category._id !== categoryId)
                );
                try {
                    const response= await deleteCategory(categoryId);
                    console.log(response);
                }catch (error) {
                    console.log(`Category name : ${categoryName} error:`,error);
                }
                alert(`Image and category ${categoryName} deleted successfully!`);
            }

        } catch (error) {
            setErrorMessage("Failed to delete the category.");
        }
    };

    const handleEdit = (categoryId) => {
        navigate(`/admin/edit-category/${categoryId}`);
    };

    // Inline styles for CategoryPage
    const pageStyles = {
        padding: '20px',
        fontFamily: 'Arial, sans-serif',
        backgroundColor: '#f9f9f9',
    };

    const headingStyles = {
        fontSize: '2.5em',
        color: '#333',
        marginBottom: '20px',
    };

    const tableStyles = {
        width: '100%',
        borderCollapse: 'collapse',
        marginTop: '20px',
    };

    const tableHeaderStyles = {
        backgroundColor: '#007BFF',
        color: 'white',
        fontWeight: 'bold',
        padding: '10px',
    };

    const tableCellStyles = {
        border: '1px solid #ddd',
        padding: '10px',
        textAlign: 'center',
    };

    const errorMessageStyles = {
        color: 'red',
        fontSize: '1.2em',
        marginBottom: '20px',
    };

    const buttonStyles = {
        margin: '5px',
        padding: '5px 10px',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    };

    const editButtonStyles = {
        ...buttonStyles,
        backgroundColor: '#007BFF',
        color: 'white',
    };

    const deleteButtonStyles = {
        ...buttonStyles,
        backgroundColor: '#FF5733',
        color: 'white',
    };

    if (loading) {
        return <div style={pageStyles}>Loading categories...</div>;
    }

    return (
        <div style={pageStyles}>
            <h1 style={headingStyles}>Categories</h1>
            {errorMessage && <div style={errorMessageStyles}>{errorMessage}</div>}

            <table style={tableStyles}>
                <thead>
                <tr>
                    <th style={tableHeaderStyles}>Category Name</th>
                    <th style={tableHeaderStyles}>Image</th>
                    <th style={tableHeaderStyles}>Updated At</th>
                    <th style={tableHeaderStyles}>Created At</th>
                    <th style={tableHeaderStyles}>Actions</th>
                </tr>
                </thead>
                <tbody>
                {categories.map((category) => (
                    <tr key={category._id}>
                        <td style={tableCellStyles}>{category.name}</td>
                        <td style={tableCellStyles}>
                            <img
                                src={category.imageUrl}
                                alt={category.name}
                                style={{ width: '50px', height: 'auto' }}
                            />
                        </td>
                        <td style={tableCellStyles}>{new Date(category.updatedAt).toLocaleDateString()}</td>
                        <td style={tableCellStyles}>{new Date(category.createdAt).toLocaleDateString()}</td>
                        <td style={tableCellStyles}>
                            <button
                                style={editButtonStyles}
                                onClick={() => handleEdit(category._id)}
                            >
                                Edit
                            </button>
                            <button
                                style={deleteButtonStyles}
                                onClick={() => handleDelete(category._id, 'category', category.name)}
                            >
                                Delete
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default CategoryPage;
