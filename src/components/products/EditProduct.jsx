import React, { useEffect, useState } from 'react';
import { getProductById } from "../../services/api/ProductApi.jsx";

const EditProduct = ({ onClose, refreshProducts, productId }) => {
  const [product, setProduct] = useState(null); // Use null initially to handle loading state
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productData = await getProductById(productId);
        setProduct(productData);
      } catch (error) {
        console.error("Error fetching product data:", error);
      } finally {
        setLoading(false); // Loading complete
      }
    };
    fetchData();
  }, [productId]); // Add productId as a dependency to re-fetch when it changes

  if (loading) {
    return <p>Loading product information...</p>;
  }

  if (!product) {
    return <p>Product information could not be retrieved.</p>;
  }

  return (
      <div>
        <h2>Product Information</h2>
        <ul>
          <li><strong>ID:</strong> {product.id}</li>
          <li><strong>Name:</strong> {product.name}</li>
          <li><strong>Price:</strong> ${product.price}</li>
          <li><strong>Category:</strong> {product.categoryId.name}</li>
          <li><strong>Brand:</strong> {product.brandId.name}</li>
          <li><strong>Description:</strong> {product.description}</li>
        </ul>
        <button onClick={onClose}>Close</button>
      </div>
  );
};

export default EditProduct;
