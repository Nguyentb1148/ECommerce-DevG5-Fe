import React, { useState } from "react";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";
import PriceRange from "../filter/PriceRange";
import RatingFilter from "../filter/RatingFilter";
import ColorFilter from "../filter/ColorFilter";
import CategoryFilter from "../filter/CategoryFilter";
import BrandFilter from "../filter/BrandFilter";

const ListFilter = () => {
    const [openSection, setOpenSection] = useState({
        category: true,
        brand: true,
        price: true,
        rating: true,
        color: true,
    });

    const handleToggleSection = (section) => {
        setOpenSection({ ...openSection, [section]: !openSection[section] });
    };

    return (
        <div className="w-[20%] p-4 rounded-lg shadown-left">
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
    );
};

export default ListFilter;