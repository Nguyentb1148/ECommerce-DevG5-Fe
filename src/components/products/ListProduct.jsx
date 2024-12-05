import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useNavigate } from "react-router-dom";
import { getProducts } from "../../services/api/ProductApi"; // Adjust the import according to your project structure

const ListProduct = () => {
  const navigate = useNavigate();
  const [productsData, setProductsData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {
    const fetchData = async () => {
      const productData = await getProducts(1, itemsPerPage);
      console.log("Product Data:", productData); // Log the product data to check if it's being retrieved correctly
      setProductsData(productData.data);
    };
    fetchData();
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = Array.isArray(productsData)
    ? productsData.slice(0, indexOfLastItem)
    : [];

  const totalPages = Math.ceil(productsData.length / itemsPerPage);

  const fetchMoreProducts = async () => {
    if (currentPage < totalPages) {
      const nextPage = currentPage + 1;
      const productData = await getProducts(nextPage, itemsPerPage);
      setProductsData((prevProducts) => [...prevProducts, ...productData]);
      setCurrentPage(nextPage);
    }
  };

  const hasMore = currentPage < totalPages;

  const handleProductClick = (productId) => {
    console.log("Product ID:", productId); // Log the product ID to check if it's being retrieved correctly
    navigate(`/productDetail/${productId}`);
  };

  return (
    <div className="w-[90%] mx-auto max-md:w-full">
      <InfiniteScroll
        dataLength={currentProducts.length}
        next={fetchMoreProducts}
        hasMore={hasMore}
        loader={
          <div className="grid gap-3">
            <div className="flex items-center justify-center">
              <svg
                className="animate-spin border-indigo-600"
                xmlns="http://www.w3.org/2000/svg"
                width="34"
                height="34"
                viewBox="0 0 34 34"
                fill="none"
              >
                <g id="Component 2">
                  <circle
                    id="Ellipse 717"
                    cx="17.0007"
                    cy="17.0001"
                    r="14.2013"
                    stroke="#D1D5DB"
                    stroke-width="4"
                    stroke-dasharray="2 3"
                  />
                  <path
                    id="Ellipse 715"
                    d="M21.3573 30.5163C24.6694 29.4486 27.4741 27.2019 29.2391 24.2028C31.0041 21.2038 31.6065 17.661 30.9319 14.2471C30.2573 10.8332 28.3528 7.78584 25.5798 5.68345C22.8067 3.58105 19.3583 2.57 15.8891 2.84222"
                    stroke="#4F46E5"
                    stroke-width="4"
                  />
                </g>
              </svg>
            </div>
          </div>
        }
        endMessage={<></>}
        style={{ overflow: "unset" }}
      >
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 place-items-center">
          {currentProducts.map((data) => (
            <div
              data-aos="fade-up"
              className="px-4 md:px-12 xl:px-14 py-3 rounded-3xl grid place-items-center border-2 border-[#ffffff40]"
              key={data._id}
              onClick={() => handleProductClick(data._id)}
            >
              <div>
                <div className="relative">
                  <img
                    src={data.imageUrls[0]}
                    alt={data.name}
                    className="h-[110px] w-[110px] md:h-[130px] md:w-[130px] object-cover rounded-md bg-transparent"
                  />
                </div>
              </div>
              <h2 className="font-semibold text-lg">{data.name}</h2>
              <div className="flex items-center py-1">
                <h2 className="px-2">Color: </h2>
                <div
                  className="h-4 w-4 rounded-full"
                  style={{ backgroundColor: data.variants[0].attributes.color }}
                ></div>
              </div>
              <div className="border-solid border-[1px] border-[#ffffff70] px-2 rounded-md">
                {data.variants[0].attributes.option}
              </div>
              <div className="flex justify-around w-full py-1">
                <h2 className="font-bold">{data.price}</h2>
                <h2 className="font-normal line-through">{data.price}</h2>
              </div>
            </div>
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default ListProduct;
