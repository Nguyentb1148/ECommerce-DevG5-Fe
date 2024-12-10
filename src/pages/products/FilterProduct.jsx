import { useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import ListFilter from "../../components/filter/ListFilter";
import ListProduct from "../../components/products/ListProduct";
import BackToTop from "../../components/backToTop/BackToTop";
const FilterProduct = () => {
  const [filters, setFilters] = useState({});
  const handleApplyFilters = (appliedFilters) => {
    setFilters(appliedFilters);
  };
  return (
    <div className="scroll-smooth bg-gray-900 text-gray-300">
      <Navbar />
      <BackToTop />
      <div className="w-[90%] mx-auto md:flex justify-between scroll-smooth ">
        <ListFilter onApplyFilters={handleApplyFilters} />
        <ListProduct filters={filters} />
      </div>
    </div>
  );
};
export default FilterProduct;
