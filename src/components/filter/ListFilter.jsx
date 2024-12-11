import { useState } from "react";
import { FaChevronUp, FaChevronDown, FaFilter } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import { FaSearch } from "react-icons/fa";
import PriceRange from "./PriceRange";
import RatingFilter from "./RatingFilter";
import CategoryFilter from "./CategoryFilter";
import BrandFilter from "./BrandFilter";
const ListFilter = ({ onApplyFilters }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [search, setSearch] = useState("");
  console.log("|search|", search);
  const [openSection, setOpenSection] = useState({
    category: true,
    brand: true,
    price: true,
    rating: true,
  });
  const [selectedCategories, setSelectedCategories] = useState([]);
  console.log("selected category", selectedCategories);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [priceRange, setPriceRange] = useState([3000000, 100000000]);

  const handleToggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  const handleToggleSection = (section) => {
    setOpenSection({ ...openSection, [section]: !openSection[section] });
  };

  const handleApplyFilters = () => {
    const filters = {
      category: selectedCategories,
      brand: selectedBrands,
      price: priceRange,
      keyword: search.trim(),
    };
    onApplyFilters(filters);
    setIsModalOpen(false); // Close modal after applying filters
  };

  const handleResetFilters = () => {
    setSearch("");
    setSelectedCategories([]);
    setSelectedBrands([]);
    setPriceRange([3000000, 100000000]);
    onApplyFilters({}); // Clear filters
  };
  return (
    <>
      {/* Search Box */}
      <div className="md:hidden min-h-screen flex items-center rounded-md px-2 mb-4 bg-gray-800">
        <FaSearch className="flex items-center justify-center w-10 text-white" />
        <input
          type="text"
          name="search"
          placeholder="Search..."
          className="bg-transparent  border-none outline-none text-white focus:ring-0"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="md:hidden fixed bottom-10 left-2 z-50">
        <button
          className="p-[12px] bg-green-500 rounded-full text-white shadow-lg"
          onClick={handleToggleModal}
        >
          <FaFilter size={22} />
        </button>
      </div>
      {/* Modal hiển thị ListFilter */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
          <div className="bg-gray-900 w-full fixed p-6 rounded-lg top-10 h-90v overflow-y-auto">
            <button
              className="absolute top-4 right-6 text-white text-2xl"
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
                {openSection.category && (
                  <CategoryFilter
                    selectedCategories={selectedCategories}
                    setSelectedCategories={setSelectedCategories}
                  />
                )}
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
                {openSection.brand && (
                  <BrandFilter
                    selectedBrands={selectedBrands}
                    setSelectedBrands={setSelectedBrands}
                  />
                )}
              </div>
              <div className="mb-4">
                <PriceRange
                  priceRange={priceRange}
                  setPriceRange={setPriceRange}
                />
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
                <button
                  className="px-4 py-2 bg-gray-200 rounded-md text-gray-700 hover:bg-gray-300"
                  onClick={() => {
                    setSelectedCategories([]);
                    setSelectedBrands([]);
                    setPriceRange([3000000, 100000000]);
                    onApplyFilters({}); // Clear filters
                  }}
                >
                  Clear Filter
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="max-md:hidden md:w-[40%] lg:w-[30%] xl:w-[20%] p-4 rounded-lg shadown-left ">
        {/* Search Box */}
        <div className=" md:w-48 lg:w-52 xl:w-60 flex items-center rounded-md px-2 bg-gray-800">
          <FaSearch className="flex items-center justify-center w-10 text-white" />
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent md:w-36 lg:w-40 xl:w-44 border-none outline-none text-white focus:ring-0"
          />
        </div>
        {/* Categories */}
        <div className="mb-4">
          <div
            className="flex justify-between items-center cursor-pointer"
            onClick={() => handleToggleSection("category")}
          >
            <h3 className="font-semibold text-lg py-2">Categories</h3>
            <span>
              {openSection.category ? (
                <>
                  <FaChevronDown />
                </>
              ) : (
                <>
                  <FaChevronUp />
                </>
              )}
            </span>
          </div>
          {openSection.category && (
            <CategoryFilter
              selectedCategories={selectedCategories}
              setSelectedCategories={setSelectedCategories}
            />
          )}
        </div>
        {/* Brands */}
        <div className="mb-4">
          <div
            className="flex justify-between items-center cursor-pointer"
            onClick={() => handleToggleSection("brand")}
          >
            <h3 className="font-semibold text-lg py-2">Brands</h3>
            <span>
              {openSection.brand ? (
                <>
                  <FaChevronDown />
                </>
              ) : (
                <>
                  <FaChevronUp />
                </>
              )}
            </span>
          </div>
          {openSection.brand && (
            <BrandFilter
              selectedBrands={selectedBrands}
              setSelectedBrands={setSelectedBrands}
            />
          )}
        </div>
        {/* Price */}
        <div className="mb-4">
          <PriceRange priceRange={priceRange} setPriceRange={setPriceRange} />
        </div>
        {/* Rating */}
        <div className="mb-4">
          <div
            className="flex justify-between items-center cursor-pointer"
            onClick={() => handleToggleSection("rating")}
          >
            <h3 className="font-semibold text-lg py-2">Rating</h3>
            <span>
              {openSection.rating ? (
                <>
                  <FaChevronDown />
                </>
              ) : (
                <>
                  <FaChevronUp />
                </>
              )}
            </span>
          </div>
          {openSection.rating && <RatingFilter />}
        </div>
        {/* Button */}
        <div className="flex justify-between mt-6">
          <button
            className="px-4 py-2 bg-gray-200 rounded-md text-gray-700 hover:bg-gray-300"
            onClick={handleResetFilters}
          >
            Clear Filter
          </button>
          <button
            className="px-4 py-2 bg-green-500 rounded-md text-white hover:bg-green-600"
            onClick={handleApplyFilters}
          >
            Apply
          </button>
        </div>
      </div>
    </>
  );
};
export default ListFilter;
