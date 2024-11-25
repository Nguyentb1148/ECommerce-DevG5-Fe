import React, { useState } from "react";

const BrandFilter = () => {
  const [selectedBrands, setSelectedBrands] = useState([]);

  const brands = [
    { name: "Apple"},
    { name: "Samsung"},
    { name: "ASUS"},
    { name: "Dell"},
    { name: "Lenovo"},
    { name: "HP"},
    { name: "Panasonic"},
  ];

  const toggleBrand = (brand) => {
    if (selectedBrands.includes(brand)) {
      setSelectedBrands(selectedBrands.filter((item) => item !== brand));
    } else {
      setSelectedBrands([...selectedBrands, brand]);
    }
  };

  return (
    <div className="">
      {/* Brand List */}
      <ul className="space-y-2">
        {brands.map((brand, index) => (
          <li
            key={index}
            className="flex items-center justify-between cursor-pointer"
            onClick={() => toggleBrand(brand.name)}
          >
            <div className="flex items-center space-x-3">
              {/* Checkbox */}
              <input
                type="checkbox"
                id={`brand-${index}`}
                checked={selectedBrands.includes(brand.name)}
                onChange={() => toggleBrand(brand.name)}
                className="w-4 h-4 cursor-pointer"
              />
              {/* Label */}
              <label
                htmlFor={`brand-${index}`}
                className={`cursor-pointer ${
                  selectedBrands.includes(brand.name) ? "font-bold " : "font-normal"
                }`}
              >
                {brand.name}
              </label>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BrandFilter;
