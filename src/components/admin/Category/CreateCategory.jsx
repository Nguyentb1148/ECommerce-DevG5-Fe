import React, { useState } from 'react';
import { createCategory } from "../../../services/api/CategoryApi.jsx";
import { uploadImage } from "../../../configs/Cloudinary.jsx";
import {useNavigate} from "react-router-dom"; // Cloudinary image upload function

const CreateCategory = () => {
    const [categoryName, setCategoryName] = useState('');
    const [categoryImage, setCategoryImage] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // Handle file input change
    const handleImageChange = (e) => {
        setCategoryImage(e.target.files[0]);
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrorMessage('');

        // Validate inputs
        if (!categoryName || !categoryImage) {
            setErrorMessage('Please provide both category name and image.');
            setLoading(false);
            return;
        }

        try {
            // Step 1: Upload image to Cloudinary
            const uploadedImage = await uploadImage(categoryImage, 'Category', categoryName);
            const { secure_url, public_id } = uploadedImage; // Extract the URL and public ID

            // Step 2: Prepare category data
            const categoryData = {
                name: categoryName,
                imageUrl: secure_url,  // Use Cloudinary URL
                publicId: public_id,   // Store public ID for future deletions
            };

            // Step 3: Send category data to backend API (Create category)
            await createCategory(categoryData);

            // On success, reset form
            setCategoryName('');
            setCategoryImage(null);
            setErrorMessage('');
            navigate('/admin/categories');

            alert('Category created successfully!');
        } catch (error) {
            console.error('Error creating category:', error);
            setErrorMessage('An error occurred while creating the category.');
        } finally {
            setLoading(false);
        }
    };

    // Styles (can also be placed in an external .css file)
    const styles = {
        container: {
            maxWidth: '600px',
            margin: '0 auto',
            padding: '20px',
            backgroundColor: '#f9f9f9',
            borderRadius: '8px',
            boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
            fontFamily: 'Arial, sans-serif',
        },
        heading: {
            textAlign: 'center',
            marginBottom: '20px',
            color: '#333',
        },
        formGroup: {
            marginBottom: '15px',
        },
        label: {
            display: 'block',
            fontSize: '14px',
            marginBottom: '8px',
            fontWeight: 'bold',
        },
        input: {
            width: '100%',
            padding: '10px',
            fontSize: '14px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            outline: 'none',
        },
        submitButton: {
            width: '100%',
            padding: '10px',
            backgroundColor: '#4CAF50',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            fontSize: '16px',
            cursor: 'pointer',
            transition: 'background-color 0.3s',
        },
        submitButtonDisabled: {
            backgroundColor: '#ccc',
            cursor: 'not-allowed',
        },
        errorMessage: {
            backgroundColor: '#f8d7da',
            color: '#721c24',
            border: '1px solid #f5c6cb',
            padding: '10px',
            borderRadius: '4px',
            marginBottom: '20px',
        },
        imagePreview: {
            marginTop: '15px',
            width: '100px',
            height: '100px',
            objectFit: 'cover',
        },
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.heading}>Create Category</h2>

            {errorMessage && <div style={styles.errorMessage}>{errorMessage}</div>}

            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div style={styles.formGroup}>
                    <label style={styles.label} htmlFor="categoryName">Category Name:</label>
                    <input
                        type="text"
                        id="categoryName"
                        value={categoryName}
                        onChange={(e) => setCategoryName(e.target.value)}
                        style={styles.input}
                        required
                        disabled={loading}
                    />
                </div>

                <div style={styles.formGroup}>
                    <label style={styles.label} htmlFor="categoryImage">Category Image:</label>
                    <input
                        type="file"
                        id="categoryImage"
                        onChange={handleImageChange}
                        style={styles.input}
                        required
                        accept="image/*"
                        disabled={loading}
                    />
                </div>

                {/* Show image preview */}
                {categoryImage && (
                    <img
                        src={URL.createObjectURL(categoryImage)}
                        alt="Category Preview"
                        style={styles.imagePreview}
                    />
                )}

                <button
                    type="submit"
                    style={loading ? { ...styles.submitButton, ...styles.submitButtonDisabled } : styles.submitButton}
                    disabled={loading}
                >
                    {loading ? 'Creating Category...' : 'Create Category'}
                </button>
            </form>
        </div>
    );
};

export default CreateCategory;
