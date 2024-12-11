import { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useNavigate } from "react-router-dom";
import { getProductsByChunk } from "../../services/api/ProductApi"; // Adjust the import according to your project structure
import { ToastContainer } from "react-toastify";
import LoadingSpinner from "../../components/loading/LoadingSpinner"
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
            <div className="h-screen ">
              <LoadingSpinner/>
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
                <div className="border-solid border-[1px] border-[#ffffff70] px-2 rounded-md line-clamp-1">
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
