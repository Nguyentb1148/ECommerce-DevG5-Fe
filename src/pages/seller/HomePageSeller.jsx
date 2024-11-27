import React from "react";
import {Outlet} from "react-router-dom";
import NewProductPage from "./NewProductPage.jsx";

export default function HomePageSeller() {
    return (
        <div style={{display: "flex", height: "100vh"}}>
            {/* Sidebar */}
            <aside style={styles.sidebar}>
                <nav>
                    <ul style={styles.navList}>
                        <li style={styles.navItem}><a href="/dashboard" style={styles.navLink}>Dashboard</a></li>
                        <li style={styles.navItem}><a href="/seller/product" style={styles.navLink}>Products</a></li>
                        <li style={styles.navItem}><a href="/seller/product-detail" style={styles.navLink}>Product
                            details</a></li>
                        <li style={styles.navItem}><a href="/seller/create-product-old" style={styles.navLink}>new
                            product(old)</a></li>
                        <li style={styles.navItem}><a href="/seller/create-product" style={styles.navLink}>new
                            product(new)</a></li>
                        <li style={styles.navItem}><a href="/seller/techinfor" style={styles.navLink}>tech
                            information</a></li>
                        <li style={styles.navItem}><a href="/analytics" style={styles.navLink}>Analytics</a></li>
                        <li style={styles.navItem}><a href="/settings" style={styles.navLink}>Settings</a></li>
                    </ul>
                </nav>
            </aside>

            {/* Main Content */}
            <main style={styles.mainContent}>
            <Outlet/> {/* This renders the nested route's component */}
            </main>
        </div>
    );
}

const styles = {
    sidebar: {
        width: "200px",
        backgroundColor: "#f4f4f4",
        padding: "10px",
        boxShadow: "2px 0 5px rgba(0, 0, 0, 0.1)",
    },
    navList: {
        listStyle: "none",
        padding: 0,
        margin: 0,
    },
    navItem: {
        marginBottom: "10px",
    },
    navLink: {
        textDecoration: "none",
        color: "#333",
        fontWeight: "bold",
        display: "block",
        padding: "10px",
        borderRadius: "5px",
        transition: "background-color 0.3s",
    },
    navLinkHover: {
        backgroundColor: "#ddd",
    },
    mainContent: {
        flex: 1,
        padding: "20px",
    },
};
