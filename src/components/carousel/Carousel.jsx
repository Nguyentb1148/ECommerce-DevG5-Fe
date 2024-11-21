import Slider from "react-slick";
import Image3 from "../../assets/hero/headphone.png"
import Image2 from "../../assets/category/vr.png"
import Image1 from "../../assets/category/macbook.png"
const CarouselData = [
    {
        id: 1,
        img: Image1,
        subtitle: "Beats Solo",
        title: "Branded",
        title2: "Laptop",
    },
    {
        id: 2,
        img: Image2,
        subtitle: "Beats Solo",
        title: "wireless",
        title2: "Virtial",
    },
    {
        id: 3,
        img: Image3,
        subtitle: "Beats Solo",
        title: "wireless",
        title2: "Headphone1",
    },
]
const Carousel = () => {

    var settings = {
        dots: true,
        infinite: true,
        speed: 800,
        slidesToShow: 1,
        slidesToScroll: 1,
    };
    return (
        <div className="w-[90%] mx-auto mt-[79px]">
            <div className="carousel-bg-color overflow-hidden rounded-3xl min-h-[550px] sm:min-h-[650px] flex justify-center items-center">
                <div className="w-full pb-8 sm:pb-0">
                    <Slider {...settings}>
                        {CarouselData.map((data) => (
                            <div key={data.id}>
                                <div className="grid grid-cols-1 sm:grid-cols-2">
                                    <div className="flex flex-col justify-center gap-4 sm:pl-3 pt-12 sm:pt-0 text-center sm:text-left order-2 sm:order-1 relative z-10">
                                        <h1
                                            data-aos="zoom-out"
                                            data-aos-duration="500"
                                            data-aos-once="true"
                                            className="text-2xl sm:text-6xl lg:text-2xl font-bold">
                                            {data.subtitle}
                                        </h1>
                                        <h1
                                            data-aos="zoom-out"
                                            data-aos-duration="500"
                                            data-aos-once="true"
                                            className="text-5xl sm:text-6xl lg:text-7xl font-bold">
                                            {data.title}
                                        </h1>
                                        <h1
                                            data-aos="zoom-out"
                                            data-aos-duration="500"
                                            data-aos-once="true"
                                            className="text-5xl uppercase text-white dark:text-white/5 sm:text-[80px] md:text-[100px] xl:text-[150px] font-bold">
                                            {data.title2}
                                        </h1>
                                        <div
                                            data-aos="fade-up"
                                            data-aos-offset="0"
                                            data-aos-duration="500"
                                            data-aos-once="true"
                                        >
                                            <button>Shop now</button>
                                        </div>
                                    </div>
                                    <div className="order-1 sm:order-2">
                                        <div
                                            data-aos="zoom-in"
                                            data-aos-once="true"
                                            className="relative z-10"
                                        >
                                            <img

                                                src={data.img} alt="" className="w-[300px] h-[300px] sm:w-[450px] sm:h-[450px] sm:scale-105 lg:scale-110 object-contain mx-auto drop-shadow-sm relative z-40" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </Slider>
                </div>
            </div>
        </div>
    )
}
export default Carousel;