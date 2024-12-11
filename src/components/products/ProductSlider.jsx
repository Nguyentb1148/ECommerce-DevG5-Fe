import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Thumbs } from "swiper/modules";
const ProductSlider = ({ images }) => {
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const [mainSwiper, setMainSwiper] = useState(null);
    return (
        <div className="flex flex-col md:items-center gap-4, md:ml-[50px]">
            {/* Main Slider */}
            <div className="relative w-[400px] ml-[-50px] md:ml-[-90px]">
                <Swiper
                    onSwiper={setMainSwiper}
                    modules={[Navigation, Pagination, Thumbs]}
                    pagination={{ clickable: true }}
                    spaceBetween={10}
                    slidesPerView={1}
                    thumbs={{ swiper: thumbsSwiper }}
                    loop={true}
                    className="rounded-lg w-[300px] md:w-[400px] pb-10"
                    style={{ '--swiper-pagination-bottom': '-20px' }}
                >
                    {images.map((src, index) => (
                        <SwiperSlide key={index}>
                            <img
                                src={src}
                                alt={`Slide ${index + 1}`}
                                className="w-[300px] h-[200px] md:w-[400px] md:h-[300px] object-cover  rounded-lg"
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
            {/* Thumbnails (bên dưới) */}
            <Swiper
                modules={[Thumbs]}
                onSwiper={setThumbsSwiper}
                spaceBetween={10}
                slidesPerView={5}
                watchSlidesProgress
                loop={true}
                className="w-full mt-4 "
            >
                {images.map((src, index) => (
                    <SwiperSlide
                        key={index}
                        className="!w-[51px] !h-[51px] md:!w-20 md:!h-20 flex justify-center items-center"
                    >
                        <img
                            src={src}
                            alt={`Thumbnail ${index + 1}`}
                            className="w-full h-full object-cover rounded border hover:scale-105 cursor-pointer"
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};
export default ProductSlider;