import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { gsap } from "gsap";
import Image2 from "../../assets/product/p-2.jpg";

const ProductDetail = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const navRef = useRef(null);
  const activeElementRef = useRef(null);
  const location = useLocation();

  const navItems = [
    { name: "Home Page", path: "/" },
    { name: "Product", path: "/product" },
  ];

  useEffect(() => {
    const currentIndex = navItems.findIndex(
      (item) => item.path === location.pathname
    );
    setActiveIndex(currentIndex);
  }, [location]);

  useEffect(() => {
    const updateActiveElement = () => {
      const nav = navRef.current;
      const activeElement = activeElementRef.current;
      const activeButton = nav.querySelector(".active button");
      if (activeButton && activeElement) {
        const activeRect = activeButton.getBoundingClientRect();
        const navRect = nav.getBoundingClientRect();
        const offsetX = activeRect.left - navRect.left + nav.scrollLeft;
        const width = activeRect.width;

        gsap.to(activeElement, {
          x: offsetX,
          width: width,
          duration: 0.3,
        });
      }
    };

    updateActiveElement();
    window.addEventListener("resize", updateActiveElement);

    return () => {
      window.removeEventListener("resize", updateActiveElement);
    };
  }, [activeIndex]);

  const handleMouseEnter = (index) => {
    const nav = navRef.current;
    const activeElement = activeElementRef.current;
    const hoverButton = nav.querySelectorAll("button")[index];
    if (hoverButton && activeElement) {
      const hoverRect = hoverButton.getBoundingClientRect();
      const navRect = nav.getBoundingClientRect();
      const offsetX = hoverRect.left - navRect.left + nav.scrollLeft;
      const width = hoverRect.width;

      gsap.to(activeElement, {
        x: offsetX,
        width: width,
        duration: 0.3,
      });
    }
  };

  const handleMouseLeave = () => {
    const nav = navRef.current;
    const activeElement = activeElementRef.current;
    const activeButton = nav.querySelector(".active button");
    if (activeButton && activeElement) {
      const activeRect = activeButton.getBoundingClientRect();
      const navRect = nav.getBoundingClientRect();
      const offsetX = activeRect.left - navRect.left + nav.scrollLeft;
      const width = activeRect.width;

      gsap.to(activeElement, {
        x: offsetX,
        width: width,
        duration: 0.3,
      });
    }
  };

  return (
    <div className="max-w-screen-lg mx-auto p-4">
      <header className="flex justify-between items-center py-4 border-b border-gray-200">
        <div className="text-lg font-semibold">
          118 Mai Thuc Lan Street | 1231232132
        </div>
        <div className="flex items-center space-x-4">
          <select className="border border-gray-300 p-1 rounded">
            <option>USD</option>
            <option>EUR</option>
          </select>
          <select className="border border-gray-300 p-1 rounded">
            <option>ENGLISH</option>
            <option>SPANISH</option>
          </select>
          <div className="space-x-2">
            <i className="fas fa-facebook"></i>
            <i className="fas fa-twitter"></i>
            <i className="fas fa-instagram"></i>
          </div>
        </div>
      </header>

      <nav ref={navRef} className="relative z-10 flex justify-between items-center py-4">
        <h1 className="text-3xl font-bold">DevG5 Store</h1>
        <div className="flex space-x-4">
          <ul className="flex space-x-10 relative">
            {navItems.map((item, index) => (
              <li
                key={index}
                className={`relative ${
                  activeIndex === index ? "active" : ""
                } transition-colors`}
                onClick={() => setActiveIndex(index)}
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
              >
                <Link to={item.path}>
                  <button className="text-lg font-semibold text-gray-600 hover:text-gray-800 transition-colors">
                    {item.name}
                  </button>
                </Link>
              </li>
            ))}
            <div
              ref={activeElementRef}
              className="absolute bottom-0 h-[2px] bg-gradient-to-r from-blue-500 to-transparent rounded-lg transition-all duration-300"
              style={{
                transform: "translateX(0)",
                width: 0,
              }}
            ></div>
          </ul>
          <input
            type="text"
            placeholder="Search Products"
            className="border border-gray-300 p-2 rounded w-72"
          />
          <button className="bg-gray-100 p-2 rounded">
            <i className="fas fa-search"></i>
          </button>
        </div>
      </nav>

      <div className="grid grid-cols-2 gap-4 mt-8">
        <div className="relative">
          <img src={Image2} alt="Product" className="w-full rounded" />
          <div className="absolute top-2 right-2 text-gray-500 cursor-pointer">
            <i className="fas fa-heart"></i>
          </div>
        </div>

        <div className="ml-[130px]">
          <h2 className="text-2xl font-bold">
            Name product: ABABABABABABABABABAB
          </h2>
          <div className="text-3xl text-red-600 mt-2">423424242 $</div>
          <ul className="mt-4 space-y-2">
            <li>
              <span className="font-semibold">Brand:</span> NexaSoft Tech
              Company
            </li>
            <li>
              <span className="font-semibold">Size:</span> 15.7 x 11.0 inches (W
              x D x H)
            </li>
            <li>
              <span className="font-semibold">Weight:</span> 6.2 pounds
            </li>
            <li>
              <span className="font-semibold">Delivery:</span> Worldwide
            </li>
            <li>
              <span className="font-semibold">Variant:</span> Off White, Space
              Gray, Jet Black
            </li>
          </ul>
          <div className="flex items-center space-x-4 mt-6">
            <input
              type="number"
              className="border border-gray-300 p-2 rounded w-16"
              defaultValue={1}
            />
            <button className="bg-red-600 text-white px-6 py-2 rounded">
              Buy Now
            </button>
            <button className="border border-gray-300 p-2 rounded">
              <i className="fas fa-heart"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
