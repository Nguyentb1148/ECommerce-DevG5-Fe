import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { RiArrowDropDownLine } from "react-icons/ri";

export default function HomePageSeller() {
    const [isProductDropdownOpen, setIsProductDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setIsProductDropdownOpen(!isProductDropdownOpen);
    };

    return (
        <div style={{ display: "flex", height: "100vh" }}>
            {/* Sidebar */}
            <aside style={styles.sidebar}>
                <nav>
                    <ul style={styles.navList}>
                        <li style={styles.navItem}>
                            <a href="/dashboard" style={styles.navLink}>Dashboard</a>
                        </li>
                        <li style={styles.navItem}>
                            {/* Dropdown Menu for Products */}
                            <div onClick={toggleDropdown} style={{ ...styles.navLink, cursor: "pointer", display: "flex", alignItems: "center" }}>
                                <span>Products</span>
                                <RiArrowDropDownLine
                                    style={{
                                        marginLeft: "auto",
                                        fontSize: "20px",
                                        transition: "transform 0.3s",
                                        transform: isProductDropdownOpen ? "rotate(180deg)" : "rotate(0deg)",
                                    }}
                                />
                            </div>
                            <ul
                                style={{
                                    ...styles.dropdownMenu,
                                    display: isProductDropdownOpen ? "block" : "none", // Toggle visibility
                                }}
                            >
                                <li style={styles.dropdownItem}>
                                    <a
                                        href="/seller/product"
                                        style={styles.dropdownLink}
                                    >
                                        Product List
                                    </a>
                                </li>
                                <li style={styles.dropdownItem}>
                                    <a
                                        href="/seller/create-product"
                                        style={styles.dropdownLink}
                                    >
                                        New Product
                                    </a>
                                </li>
                            </ul>
                        </li>
                        <li style={styles.navItem}>
                            <a href="/analytics" style={styles.navLink}>Analytics</a>
                        </li>
                        <li style={styles.navItem}>
                            <a href="/settings" style={styles.navLink}>Settings</a>
                        </li>
                    </ul>
                </nav>
            </aside>

            {/* Main Content */}
            <main style={styles.mainContent}>
                <Outlet /> {/* This renders the nested route's component */}
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
    dropdownMenu: {
        listStyle: "none",
        padding: 0,
        margin: "5px 0 0 20px", // Indentation for dropdown
    },
    dropdownItem: {
        marginBottom: "5px",
    },
    dropdownLink: {
        textDecoration: "none",
        color: "#333",
        padding: "5px 10px",
        display: "block",
        borderRadius: "5px",
        transition: "background-color 0.3s",
    },
    mainContent: {
        flex: 1,
        padding: "20px",
    },
};
