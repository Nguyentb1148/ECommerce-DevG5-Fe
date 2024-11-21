import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { updateCategory, getCategoryById } from "../../../services/api/CategoryApi.jsx";
import {deleteImage, uploadImage} from "../../../configs/Cloudinary.jsx";

const EditCategory = () => {
    const { id } = useParams(); // Get category ID from URL
    const [categoryName, setCategoryName] = useState('');
    const [categoryImage, setCategoryImage] = useState(null);
    const [currentImageUrl, setCurrentImageUrl] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCategory = async () => {
            try {
                const category = await getCategoryById(id); // Fetch category by ID
                setCategoryName(category.name);
                setCurrentImageUrl(category.imageUrl);
            } catch (error) {
                setErrorMessage('Failed to load category details.');
            }
        };

        fetchCategory();
    }, [id]);

    const handleImageChange = (e) => {
        setCategoryImage(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrorMessage('');

        try {
            let updatedImageUrl = currentImageUrl;

            // Step 1: Delete old image and upload new one if a new image is provided
            if (categoryImage) {
                // Delete the old image
                const folderName = 'Category'; // The folder name used in Cloudinary
                const oldImagePublicId = currentImageUrl.split('/').pop().split('.')[0]; // Extract public ID from URL

                try {
                    await deleteImage(folderName, oldImagePublicId); // Call the deleteImage function
                    console.log('Old image deleted successfully.');
                } catch (deleteError) {
                    console.error('Failed to delete old image:', deleteError);
                    setErrorMessage('Failed to delete old image.');
                    return; // Stop execution if the old image cannot be deleted
                }

                // Upload new image
                const uploadedImage = await uploadImage(categoryImage, folderName, categoryName);
                updatedImageUrl = uploadedImage.secure_url; // Set new image URL
            }

            // Step 2: Prepare updated category data
            const updatedCategory = {
                name: categoryName,
                imageUrl: updatedImageUrl,
            };

            // Step 3: Update category via API
            await updateCategory(id, updatedCategory);

            alert('Category updated successfully!');
            navigate('/admin/categories'); // Redirect to categories list
        } catch (error) {
            console.error('Error updating category:', error);
            setErrorMessage('Failed to update the category.');
        } finally {
            setLoading(false);
        }
    };


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
            backgroundColor: '#007BFF',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            fontSize: '16px',
            cursor: 'pointer',
            transition: 'background-color 0.3s',
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
            <h2 style={styles.heading}>Edit Category</h2>

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
                        accept="image/*"
                        disabled={loading}
                    />
                </div>

                {currentImageUrl && (
                    <img
                        src={currentImageUrl}
                        alt="Current Category"
                        style={styles.imagePreview}
                    />
                )}

                <button
                    type="submit"
                    style={styles.submitButton}
                    disabled={loading}
                >
                    {loading ? 'Updating Category...' : 'Update Category'}
                </button>
            </form>
        </div>
    );
};

export default EditCategory;
