import { useEffect, useState } from "react";
import { getCategories } from "../../services/api/CategoryApi";

const CategoryFilter = ({ selectedCategories = [], setSelectedCategories }) => {
  const [categories, setCategories] = useState([]);

  // Fetch categories from the backend
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getCategories(); // Adjust the endpoint as needed
        console.log(response);
        setCategories(response || []); // Assuming response has a `data` field with categories
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const toggleCategory = (categoryId) => {
    if (selectedCategories.includes(categoryId)) {
      setSelectedCategories(
        selectedCategories.filter((item) => item !== categoryId)
      );
    } else {
      setSelectedCategories([...selectedCategories, categoryId]);
    }
  };

  return (
    <div className="">
      {/* Category List */}
      {categories.length > 0 ? (
        <ul className="space-y-2">
          {categories.map((category) => (
            <li
              key={category._id}
              className="flex items-center space-x-3 cursor-pointer"
              onClick={() => toggleCategory(category._id)}
            >
              {/* Checkbox */}
              <input
                type="checkbox"
                id={`category-${category._id}`}
                checked={selectedCategories.includes(category._id)}
                onChange={() => toggleCategory(category._id)}
                className="w-4 h-4 cursor-pointer"
              />
              {/* Label */}
              <label
                htmlFor={`category-${category._id}`}
                className={`cursor-pointer ${
                  selectedCategories.includes(category._id)
                    ? "font-bold"
                    : "font-normal"
                }`}
              >
                {category.name}
              </label>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No categories available</p>
      )}
    </div>
  );
};

export default CategoryFilter;
