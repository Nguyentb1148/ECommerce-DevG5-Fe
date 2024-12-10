import { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useNavigate } from "react-router-dom";
import { getProductsByChunk } from "../../services/api/ProductApi"; // Adjust the import according to your project structure
import { ToastContainer } from "react-toastify";
const ListProduct = ({ filters }) => {
  const navigate = useNavigate();
  const [productsData, setProductsData] = useState([]);
  // console.log("current products: ", productsData);
  const [hasMore, setHasMore] = useState(true);
  const itemsPerPage = 8;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productData = await getProductsByChunk(filters, 0, itemsPerPage);

        if (productData.success && productData.data.length > 0) {
          setProductsData(productData.data);
          setHasMore(
            productData.data.length <
              (productData.totalProducts || productData.data.length)
          );
        } else {
          setProductsData([]);
          setHasMore(false);
          console.error("No products available or invalid response.");
        }
      } catch (error) {
        console.error("Error fetching products:", error);
        setProductsData([]);
        setHasMore(false);
      }
    };
    fetchData();
  }, [filters]);

  const fetchMoreProducts = async () => {
    const skip = productsData.length;
    try {
      const productData = await getProductsByChunk(filters, skip, itemsPerPage);
      console.log("Fetching more products:", productData);

      if (productData.success && productData.data.length > 0) {
        setProductsData((prevProducts) => [
          ...prevProducts,
          ...productData.data,
        ]);
        setHasMore(
          productsData.length + productData.data.length <
            (productData.totalProducts || productData.data.length)
        );
      } else {
        setHasMore(false);
        console.error("No more products available or invalid response.");
      }
    } catch (error) {
      console.error("Error fetching more products:", error);
      setHasMore(false);
    }
  };

  const handleProductClick = (productId) => {
    navigate(`/productDetail/${productId}`);
  };

  return (
    <>
      <div className="w-[90%] mx-auto max-md:w-full">
        <InfiniteScroll
          dataLength={productsData.length}
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
                      strokeWidth="4"
                      strokeDasharray="2 3"
                    />
                    <path
                      id="Ellipse 715"
                      d="M21.3573 30.5163C24.6694 29.4486 27.4741 27.2019 29.2391 24.2028C31.0041 21.2038 31.6065 17.661 30.9319 14.2471C30.2573 10.8332 28.3528 7.78584 25.5798 5.68345C22.8067 3.58105 19.3583 2.57 15.8891 2.84222"
                      stroke="#4F46E5"
                      strokeDasharray="4"
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
            {productsData.map((data) => (
              <div
                data-aos="zoom-in"
                className="min-[375px]:w-[160px] min-[375px]:h-[250px] min-[425px]:w-[180px] min-[425px]:h-[270px] md:w-[230px] md:h-[300px] lg:w-[220px] lg:h-[290px] xl:w-[250px] xl:h-[320px] px-2 py-4 rounded-3xl grid place-items-center border-2 border-[#ffffff40] cursor-pointer"
                key={data._id}
                onClick={() => handleProductClick(data._id)}
              >
                <div>
                  <div className="relative">
                    <img
                      src={data.imageUrls[0]}
                      alt={data.name}
                      className="min-[375px]:w-[105px] min-[375px]:h-[105px] min-[425px]:w-[125px] min-[425px]:h-[125px] md:w-[155px] md:h-[155px] lg:h-[140px] lg:w-[140px] xl:h-[170px] xl:w-[170px] object-cover rounded-md bg-transparent"
                    />
                  </div>
                </div>
                <h2 className="font-semibold text-base md:text-lg line-clamp-1">
                  {data.name}
                </h2>
                <div className="flex items-center py-1">
                  <h2 className="px-2">Color: </h2>
                  <div
                    className="h-4 w-4 rounded-full"
                    style={{
                      backgroundColor: data.variants[0].attributes.color,
                    }}
                  ></div>
                </div>
                <div className="border-solid border-[1px] border-[#ffffff70] px-2 rounded-md">
                  {data.variants[0].attributes.option}
                </div>
                <div className="flex justify-around w-full py-1 font-bold text-primary">
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(data.price)}
                </div>
              </div>
            ))}
          </div>
        </InfiniteScroll>
      </div>
      <ToastContainer />
    </>
  );
};
export default ListProduct;
