import { useEffect, useState } from "react";
import { getBrands } from "../../services/api/BrandsApi";

const BrandFilter = ({ selectedBrands = [], setSelectedBrands }) => {
  const [brands, setBrands] = useState([]);

  const toggleBrand = (brandId) => {
    if (selectedBrands.includes(brandId)) {
      setSelectedBrands(selectedBrands.filter((item) => item !== brandId));
    } else {
      setSelectedBrands([...selectedBrands, brandId]);
    }
  };

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await getBrands(); // Adjust the endpoint as needed
        setBrands(response || []); // Assuming response has a `data` field with brands
      } catch (error) {
        console.error("Error fetching brands:", error);
      }
    };

    fetchBrands();
  }, []);

  return (
    <div className="">
      {/* Brand List */}
      {brands.length > 0 ? (
        <ul className="space-y-2">
          {brands.map((brand) => (
            <li
              key={brand._id}
              className="flex items-center justify-between cursor-pointer"
              onClick={() => toggleBrand(brand._id)}
            >
              <div className="flex items-center space-x-3">
                {/* Checkbox */}
                <input
                  type="checkbox"
                  id={`brand-${brand._id}`}
                  checked={selectedBrands.includes(brand._id)}
                  onChange={() => toggleBrand(brand._id)}
                  className="w-4 h-4 cursor-pointer"
                />
                {/* Label */}
                <label
                  htmlFor={`brand-${brand._id}`}
                  className={`cursor-pointer ${
                    selectedBrands.includes(brand._id)
                      ? "font-bold "
                      : "font-normal"
                  }`}
                >
                  {brand.name}
                </label>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No brands available</p>
      )}
    </div>
  );
};

export default BrandFilter;
