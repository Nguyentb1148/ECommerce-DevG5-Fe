import { useState, useEffect } from "react";
import {deleteProduct, getProducts, getProductsByUserId} from "../../services/api/ProductApi.jsx";
import { useNavigate } from "react-router-dom";

const styles = {
    mainContent: {
        padding: "20px",
    },
    table: {
        width: "100%",
        borderCollapse: "collapse",
        marginTop: "20px",
    },
    th: {
        backgroundColor: "#f4f4f4",
        padding: "10px",
        borderBottom: "1px solid #ddd",
        textAlign: "left",
    },
    td: {
        padding: "10px",
        borderBottom: "1px solid #ddd",
    },
    img: {
        width: "100px",
        height: "auto",
        borderRadius: "5px",
    },
    noData: {
        textAlign: "center",
        padding: "20px",
        color: "#555",
    },
    button: {
        padding: "5px 10px",
        margin: "0 5px",
        cursor: "pointer",
        borderRadius: "5px",
        border: "1px solid #ddd",
        backgroundColor: "#f4f4f4",
    },
    buttonEdit: {
        backgroundColor: "#4CAF50",
        color: "white",
    },
    buttonDelete: {
        backgroundColor: "#f44336",
        color: "white",
    },
    verifyPending: {
        color: "#FFA500", // Orange for "Pending"
        fontWeight: "bold",
    },
    verifyApproved: {
        color: "#4CAF50", // Green for "Approved"
        fontWeight: "bold",
    },
    verifyRejected: {
        color: "#f44336", // Red for "Rejected"
        fontWeight: "bold",
    },
};

export default function ProductSeller() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const user = JSON.parse(localStorage.getItem("user"));
                setLoading(true);
                const productsData = await getProductsByUserId(user.id);
                setProducts(productsData);
                console.log("Fetched products data:", productsData);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const handleEdit = (productId) => {
        navigate(`/seller/product/${productId}`);
    };

    const handleDelete = async (productId) => {
        try {
            const response = await deleteProduct(productId);
            console.log(response);
        } catch (error) {
            console.error("Error deleting product:", error);
            alert(`Error: ${error.message}`);
        }
    };

    if (loading) return <p>Loading products...</p>;
    if (error) return <p style={{ color: "red" }}>Error: {error}</p>;

    return (
        <div style={styles.mainContent}>
            <h1>All Products</h1>
            {products.length === 0 ? (
                <p style={styles.noData}>No products found.</p>
            ) : (
                <table style={styles.table}>
                    <thead>
                    <tr>
                        <th style={styles.th}>Name</th>
                        <th style={styles.th}>Category</th>
                        <th style={styles.th}>Brand</th>
                        <th style={styles.th}>Image</th>
                        <th style={styles.th}>Price</th>
                        <th style={styles.th}>Rating</th>
                        <th style={styles.th}>Verify</th>
                        <th style={styles.th}>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {products.map((product) => (
                        <tr key={product._id}>
                            <td style={styles.td}>{product.name}</td>
                            <td style={styles.td}>{product.categoryId.name || "N/A"}</td>
                            <td style={styles.td}>{product.brandId.name || "N/A"}</td>
                            <td style={styles.td}>
                                {product.imageUrls && product.imageUrls.length > 0 ? (
                                    <img
                                        src={product.imageUrls[0]}
                                        alt={product.name}
                                        style={styles.img}
                                    />
                                ) : (
                                    "No Image"
                                )}
                            </td>
                            <td style={styles.td}>${product.price}</td>
                            <td style={styles.td}>{product.rating}</td>
                            <td
                                style={{
                                    ...styles.td,
                                    ...(product.verify.status === "pending"
                                        ? styles.verifyPending
                                        : product.verify.status === "approved"
                                            ? styles.verifyApproved
                                            : styles.verifyRejected),
                                }}
                            >
                                {product.verify.status}
                            </td>
                            <td style={styles.td}>
                                <button
                                    style={{ ...styles.button, ...styles.buttonEdit }}
                                    onClick={() => handleEdit(product._id)}
                                >
                                    Edit
                                </button>
                                <button
                                    style={{ ...styles.button, ...styles.buttonDelete }}
                                    onClick={() => handleDelete(product._id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}
