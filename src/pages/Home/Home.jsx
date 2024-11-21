import React from 'react';
import Navbar from '../../components/navbar/Navbar';
import Carousel from '../../components/carousel/Carousel';
import Services from '../../components/support/Services';
import Products from '../../components/products/Products';
import Blog from '../../components/blog/Blog';
import Footer from '../../components/footer/Footer';
import Sidebar from '../../components/sidebar/Sidebar';

const Home = () => {
    return (
        <div className="w-full bg-white dark:bg-gray-900 dark:text-white duration-200 overflow-hidden">
            <div className="fixed z-20 top-0 w-full">
                <Navbar />
            </div>
            <Carousel />
            <Services />
            <Products itemsPerPage={4} />
            <Blog />
            <Footer />
            <Sidebar />
        </div>
    );
}

export default Home;
