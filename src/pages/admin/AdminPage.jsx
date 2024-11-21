import {Link, Outlet} from 'react-router-dom';
import {useState} from "react"; // Import the Outlet component from React Router

export default function AdminPage() {
    const [isCategoryOpen, setCategoryOpen] = useState(false);
    const [isProductOpen, setProductOpen] = useState(false);

    const toggleCategoryDropdown = () => setCategoryOpen(prev => !prev);
    const toggleProductDropdown = () => setProductOpen(prev => !prev);

    return (
        <div style={{ display: 'flex', height: '100vh', backgroundColor: '#f4f4f9' }}>
            {/* Sidebar */}
            <div style={styles.sidebar}>
                <h2 style={styles.sidebarTitle}>Admin Dashboard</h2>
                <ul style={styles.sidebarMenu}>
                    {/* Category Dropdown */}
                    <li style={styles.sidebarItem}>
                        <a
                            href="#!"
                            onClick={toggleCategoryDropdown}
                            style={styles.sidebarLink}
                        >
                            Category
                        </a>
                        {isCategoryOpen && (
                            <ul style={styles.dropdownMenu}>
                                <li style={styles.dropdownItem}>
                                    <Link to="/admin/create-category" style={styles.sidebarLink}>New Category</Link>
                                </li>
                                <li style={styles.dropdownItem}>
                                    <Link to="/admin/categories" style={styles.sidebarLink}>Categories List</Link>
                                </li>
                            </ul>
                        )}
                    </li>

                    {/* Other Sidebar Items */}
                    <li style={styles.sidebarItem}><Link to="/admin/other" style={styles.sidebarLink}>Other</Link></li>
                </ul>
            </div>

            {/* Main Content - Dynamic content will be rendered here */}
            <div style={styles.content}>
                <Outlet />  {/* This will render the nested route components */}
            </div>
        </div>
    );
}

// Inline styles for the AdminPage layout
const styles = {
    sidebar: {
        width: '250px',
        backgroundColor: '#343a40',
        color: 'white',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        position: 'fixed',
        top: 0,
        left: 0,
        boxShadow: '2px 0px 5px rgba(0, 0, 0, 0.1)',
    },
    sidebarTitle: {
        fontSize: '24px',
        fontWeight: 'bold',
        marginBottom: '20px',
    },
    sidebarMenu: {
        listStyle: 'none',
        paddingLeft: 0,
    },
    sidebarItem: {
        marginBottom: '15px',
    },
    sidebarLink: {
        color: 'white',
        textDecoration: 'none',
        fontSize: '18px',
        transition: 'color 0.3s ease',
        display: 'block',
        padding: '10px',
    },
    dropdownMenu: {
        listStyle: 'none',
        paddingLeft: '20px', // Indentation for dropdown items
        marginTop: '10px',
        paddingBottom: '10px',
    },
    dropdownItem: {
        marginBottom: '10px',
    },
    content: {
        marginLeft: '260px',
        padding: '20px',
        width: 'calc(100% - 250px)',
        backgroundColor: '#f9f9f9',
    },
};
