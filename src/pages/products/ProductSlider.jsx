import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Thumbs } from "swiper/modules";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const ProductSlider = ({ images }) => {
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const [mainSwiper, setMainSwiper] = useState(null);

    const handlePrev = () => {
        if (mainSwiper && mainSwiper.slidePrev) mainSwiper.slidePrev();
    };

    const handleNext = () => {
        if (mainSwiper && mainSwiper.slideNext) mainSwiper.slideNext();
    };

    return (
        <div className="flex flex-col items-center gap-4">
            {/* Main Slider */}
            <div className="relative w-[300px]">
                <Swiper
                    onSwiper={setMainSwiper}
                    modules={[Navigation, Pagination, Thumbs]}
                    pagination={{ clickable: true }}
                    spaceBetween={10}
                    slidesPerView={1}
                    thumbs={{ swiper: thumbsSwiper }}
                    loop={true}
                    className="rounded-lg w-[300px] pb-10" // Add padding bottom to move pagination down
                    style={{ '--swiper-pagination-bottom': '-20px' }} // Move pagination bullets down
                >
                    {images.map((src, index) => (
                        <SwiperSlide key={index}>
                            <img
                                src={src}
                                alt={`Slide ${index + 1}`}
                                className="w-[300px] h-[300px] object-cover rounded-lg"
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
                <button
                    onClick={handlePrev}
                    className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-gray-300 dark:bg-gray-600 text-black dark:text-white p-2 rounded-full z-10"
                >
                    <FaArrowLeft />
                </button>
                <button
                    onClick={handleNext}
                    className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-gray-300 dark:bg-gray-600 text-black dark:text-white p-2 rounded-full z-10"
                >
                    <FaArrowRight />
                </button>
            </div>

            {/* Thumbnails (bên dưới) */}
            <Swiper
                modules={[Thumbs]}
                onSwiper={setThumbsSwiper}
                spaceBetween={10}
                slidesPerView={5}
                watchSlidesProgress
                loop={true}
                className="w-full mt-4"
            >
                {images.map((src, index) => (
                    <SwiperSlide
                        key={index}
                        className="!w-20 !h-20 flex justify-center items-center"
                    >
                        <img
                            src={src}
                            alt={`Thumbnail ${index + 1}`}
                            className="w-full h-full object-cover rounded border hover:border-red-500 swiper-slide-thumb-active:border-red-500"
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default ProductSlider;