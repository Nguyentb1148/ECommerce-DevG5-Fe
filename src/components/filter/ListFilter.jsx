import React, { useState } from "react";
import { FaChevronUp, FaChevronDown, FaFilter } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import PriceRange from "./PriceRange";
import RatingFilter from "./RatingFilter";
import ColorFilter from "./ColorFilter";
import CategoryFilter from "./CategoryFilter";
import BrandFilter from "./BrandFilter";

const ListFilter = () => {
    const [isModalOpen, setIsModalOpen] = useState(false); 

    const [openSection, setOpenSection] = useState({
        category: true,
        brand: true,
        price: true,
        rating: true,
        color: true,
    });

    const handleToggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };
    const handleToggleSection = (section) => {
        setOpenSection({ ...openSection, [section]: !openSection[section] });
    };

    return (
        <>
            <div className="md:hidden fixed bottom-4 right-2 z-50">
                <button
                    className="p-[14px] bg-green-500 rounded-full text-white shadow-lg"
                    onClick={handleToggleModal}
                >
                    <FaFilter size={20} />
                </button>
            </div>
            {/* Modal hiển thị ListFilter */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
                    <div className="bg-white dark:bg-gray-900 w-full fixed p-6 rounded-lg top-10 h-90v overflow-y-auto">
                        <button
                            className="absolute top-4 right-6 text-black dark:text-white text-2xl"
                            onClick={handleToggleModal}
                        >
                            <IoCloseSharp />
                        </button>
                        {/* Nội dung ListFilter */}
                        <div className="mt-6">
                            <div className="mb-4">
                                <div
                                    className="flex justify-between items-center cursor-pointer"
                                    onClick={() => handleToggleSection("category")}
                                >
                                    <h3 className="font-semibold text-lg py-2">Categories</h3>
                                    <span>
                                        {openSection.category ? <FaChevronDown /> : <FaChevronUp />}
                                    </span>
                                </div>
                                {openSection.category && <CategoryFilter />}
                            </div>

                            <div className="mb-4">
                                <div
                                    className="flex justify-between items-center cursor-pointer"
                                    onClick={() => handleToggleSection("brand")}
                                >
                                    <h3 className="font-semibold text-lg py-2">Brands</h3>
                                    <span>
                                        {openSection.brand ? <FaChevronDown /> : <FaChevronUp />}
                                    </span>
                                </div>
                                {openSection.brand && <BrandFilter />}
                            </div>

                            <div className="mb-4">
                                <div
                                    className="flex justify-between items-center cursor-pointer"
                                    onClick={() => handleToggleSection("color")}
                                >
                                    <h3 className="font-semibold text-lg py-2">Color</h3>
                                    <span>
                                        {openSection.color ? <FaChevronDown /> : <FaChevronUp />}
                                    </span>
                                </div>
                                {openSection.color && <ColorFilter />}
                            </div>

                            <div className="mb-4">
                                <PriceRange />
                            </div>

                            <div className="mb-4">
                                <div
                                    className="flex justify-between items-center cursor-pointer"
                                    onClick={() => handleToggleSection("rating")}
                                >
                                    <h3 className="font-semibold text-lg py-2">Rating</h3>
                                    <span>
                                        {openSection.rating ? <FaChevronDown /> : <FaChevronUp />}
                                    </span>
                                </div>
                                {openSection.rating && <RatingFilter />}
                            </div>

                            <div className="flex justify-between mt-6">
                                <button className="px-4 py-2 bg-gray-200 rounded-md text-gray-700 hover:bg-gray-300">
                                    Clear Filter
                                </button>
                                <button className="px-4 py-2 bg-green-500 rounded-md text-white hover:bg-green-600">
                                    Apply
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <div className="max-md:hidden md:w-[40%] lg:w-[30%] xl:w-[20%] p-4 rounded-lg shadown-left">
                {/* Categories */}
                <div className="mb-4">
                    <div
                        className="flex justify-between items-center cursor-pointer"
                        onClick={() => handleToggleSection("category")}
                    >
                        <h3 className="font-semibold text-lg py-2">Categories</h3>
                        <span>{openSection.category ? <><FaChevronDown /></> : <><FaChevronUp /></>}</span>
                    </div>
                    {openSection.category && (
                        <CategoryFilter />
                    )}
                </div>
                {/* Brands */}
                <div className="mb-4">
                    <div
                        className="flex justify-between items-center cursor-pointer"
                        onClick={() => handleToggleSection("brand")}
                    >
                        <h3 className="font-semibold text-lg py-2">Brands</h3>
                        <span>{openSection.brand ? <><FaChevronDown /></> : <><FaChevronUp /></>}</span>
                    </div>
                    {openSection.brand && (
                        <BrandFilter />
                    )}
                </div>
                {/* Colors */}
                <div className="mb-4">
                    <div className="flex justify-between items-center cursor-pointer"
                        onClick={() => handleToggleSection("color")}>
                        <h3 className="font-semibold text-lg py-2">Color</h3>
                        <span>{openSection.rating ? <><FaChevronDown /></> : <><FaChevronUp /></>}</span>
                    </div>
                    {openSection.color && (
                        <ColorFilter />
                    )}
                </div>
                {/* Price */}
                <div className="mb-4">
                    <PriceRange />
                </div>
                {/* Rating */}
                <div className="mb-4">
                    <div className="flex justify-between items-center cursor-pointer"
                        onClick={() => handleToggleSection("rating")}>
                        <h3 className="font-semibold text-lg py-2">Rating</h3>
                        <span>{openSection.rating ? <><FaChevronDown /></> : <><FaChevronUp /></>}</span>
                    </div>
                    {openSection.rating && (
                        <RatingFilter />
                    )}
                </div>
                {/* Button */}
                <div className="flex justify-between mt-6">
                    <button className="px-4 py-2 bg-gray-200 rounded-md text-gray-700 hover:bg-gray-300">
                        Clear Filter
                    </button>
                    <button className="px-4 py-2 bg-green-500 rounded-md text-white hover:bg-green-600">
                        Apply
                    </button>
                </div>
            </div >
        </>
    );
};

export default ListFilter;