import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {getProductById} from "../../services/api/ProductApi.jsx";  // assuming you're using react-router for navigation

const styles = {
    container: {
        padding: "20px",
    },
    productTitle: {
        fontSize: "2rem",
        fontWeight: "bold",
    },
    price: {
        fontSize: "1.5rem",
        color: "#4CAF50",
        margin: "20px 0",
    },
    description: {
        fontSize: "1rem",
        marginBottom: "20px",
    },
    imageGallery: {
        display: "flex",
        gap: "10px",
        marginBottom: "20px",
    },
    img: {
        width: "200px",
        height: "auto",
        borderRadius: "5px",
    },
    attributesList: {
        marginBottom: "20px",
    },
    variant: {
        padding: "8px 12px",
        margin: "5px 0",
        backgroundColor: "#f4f4f4",
        borderRadius: "4px",
    },
    verifyStatus: {
        padding: "10px",
        margin: "10px 0",
        backgroundColor: "#fff3cd",
        borderRadius: "5px",
    },
    actions: {
        marginTop: "20px",
    },
};

export default function ProductDetailSeller() {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProductDetail = async () => {
            try {
                setLoading(true);
                const productData = await getProductById(productId);  // Ensure the correct API call to get product by ID
                setProduct(productData);
                console.log("Detail product: ",productData);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProductDetail();
    }, [productId]);  // Ensure that this effect runs when the productId changes


    if (loading) return <p>Loading product details...</p>;
    if (error) return <p style={{ color: "red" }}>Error: {error}</p>;
    if (!product) return <p>No product found.</p>;

    return (
        <div style={styles.container}>
            <h1 style={styles.productTitle}>{product.name}</h1>
            <div style={styles.price}>${product.price.toFixed(2)}</div>

            {/* Product Images */}
            <div style={styles.imageGallery}>
                {product.imageUrls?.map((url, index) => (
                    <img key={index} src={url} alt={`${product.name} ${index + 1}`} style={styles.img} />
                ))}
            </div>

            {/* Product Description */}
            <p style={styles.description}>{product.description}</p>

            {/* Product Attributes */}
            {product.attributes && product.attributes.length > 0 && (
                <div style={styles.attributesList}>
                    <h3>Attributes</h3>
                    {product.attributes.map((attribute) => (
                        <div key={attribute._id.$oid}>
                            <strong>{attribute.name}:</strong>
                            <ul>
                                {attribute.value.map((val, index) => (
                                    <li key={index}>{val}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            )}

            {/* Product Variants */}
            {product.variants && product.variants.length > 0 && (
                <div style={styles.attributesList}>
                    <h3>Variants</h3>
                    {product.variants.map((variant) => (
                        <div key={variant._id} style={styles.variant}>
                            <strong>{variant.name}</strong>: {variant.stockQuantity} in stock
                        </div>
                    ))}
                </div>
            )}

            {/* Verify Status */}
            <div style={styles.verifyStatus}>
                <h4>Verification Status</h4>
                <p>{product.verify.description}</p>
                <p>Status: <strong>{product.verify.status}</strong></p>
            </div>

            {/* Created and Updated Date */}
            <div>
                <p><strong>Created At:</strong> {new Date(product.createdAt).toLocaleString()}</p>
                <p><strong>Updated At:</strong> {new Date(product.updatedAt).toLocaleString()}</p>
            </div>

            {/* Actions (Edit, Delete) */}
            <div style={styles.actions}>
                <button>Edit</button>
                <button>Delete</button>
            </div>
        </div>
    );
}
