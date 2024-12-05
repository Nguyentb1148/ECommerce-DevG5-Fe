import React from 'react'
import Navbar from '../../components/navbar/Navbar'
import ListFilter from '../../components/filter/ListFilter'
import ListProduct from '../../components/products/ListProduct'
import BackToTop from '../../components/backToTop/BackToTop'
const FilterProduct = () => {
  return (
    <div className="scroll-smooth bg-gray-900 text-gray-300">
      <Navbar />
      <BackToTop />
      <div className="w-[90%] mx-auto md:flex justify-between scroll-smooth ">
        <ListFilter />
        <ListProduct />
      </div>
    </div>
  )
}
export default FilterProduct;