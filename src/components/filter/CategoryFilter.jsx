import React, { useState } from "react";

const CategoryFilter = () => {
    const [selectedCategories, setSelectedCategories] = useState([]);

    const categories = [
        "Computers & Tablets",
        "Mobile & Accessories",
        "TV & Home Theater",
        "Audio & Headphones",
        "Cameras & Camcorders",
        "Gaming Equipment",
        "Home Appliances",
    ];

    const toggleCategory = (category) => {
        if (selectedCategories.includes(category)) {
            setSelectedCategories(
                selectedCategories.filter((item) => item !== category)
            );
        } else {
            setSelectedCategories([...selectedCategories, category]);
        }
    };

    return (
        <div className="">
            {/* Category List */}
            <ul className="space-y-2">
                {categories.map((category, index) => (
                    <li
                        key={index}
                        className="flex items-center space-x-3 cursor-pointer"
                        onClick={() => toggleCategory(category)}
                    >
                        {/* Checkbox */}
                        <input
                            type="checkbox"
                            id={`category-${index}`}
                            checked={selectedCategories.includes(category)}
                            onChange={() => toggleCategory(category)}
                            className="w-4 h-4 cursor-pointer"
                        />
                        {/* Label */}
                        <label
                            htmlFor={`category-${index}`}
                            className={`cursor-pointer ${selectedCategories.includes(category) ? "font-bold" : "font-normal"
                                }`}
                        >
                            {category}
                        </label>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CategoryFilter;
