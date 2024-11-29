import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Thumbs } from "swiper/modules";

const ProductSlider = ({ images }) => {
    const [thumbsSwiper, setThumbsSwiper] = useState(null);

    return (
        <div className="flex flex-col items-center gap-4">
            {/* Main Slider */}
            <Swiper
                modules={[Navigation, Pagination, Thumbs]}
                // navigation
                pagination={{ clickable: true }}
                spaceBetween={10}
                slidesPerView={1}
                thumbs={{ swiper: thumbsSwiper }}
                className="rounded-lg w-[300px] relative"
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

            {/* Thumbnails (bên dưới) */}
            <Swiper
                modules={[Thumbs]}
                onSwiper={setThumbsSwiper}
                spaceBetween={10}
                slidesPerView={5}
                watchSlidesProgress
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
                            className="w-full h-full object-cover rounded border hover:border-red-500"
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default ProductSlider;
