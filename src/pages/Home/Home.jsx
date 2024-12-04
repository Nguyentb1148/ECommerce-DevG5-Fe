import React from 'react';
import Navbar from '../../components/navbar/Navbar';
import Carousel from '../../components/carousel/Carousel';
import Services from '../../components/support/Services';
import Products from '../../components/products/Products';
import Blog from '../../components/blog/Blog';
import Footer from '../../components/footer/Footer';
import BackToTop from '../../components/backToTop/BackToTop';

const Home = () => {
    return (
        <div className="w-full bg-gray-900 text-white overflow-hidden">
            <div className="fixed z-20 top-0 w-full">
                <Navbar />
            </div>
            <Carousel />
            <Services />
            <Products itemsPerPage={4} />
            <Blog />
            <Footer />
            <BackToTop />
        </div>
    );
}

export default Home;
