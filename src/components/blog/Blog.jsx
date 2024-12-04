import React from 'react'
import Image1 from "../../assets/blogs/blog-1.jpg"
import Image2 from "../../assets/blogs/blog-2.jpg"
import Image3 from "../../assets/blogs/blog-3.jpg"

const BlogData = [
    {
        title: "How to choose perfect gadget",
        subtitle: "minima facere deserunt vero illo beatae deleniti eius dolores consequuntur, eligendi corporis maiores molestiae laudantium. Porro?",
        published: "Jan 20, 2024 by Satya",
        image: Image1,
        aosDelay: "300"
    },
    {
        title: "How to choose perfect gadget",
        subtitle: "minima facere deserunt vero illo beatae deleniti eius dolores consequuntur, eligendi corporis maiores molestiae laudantium. Porro?",
        published: "Jan 20, 2024 by Satya",
        image: Image2,
        aosDelay: "400"
    },
    {
        title: "How to choose perfect gadget",
        subtitle: "minima facere deserunt vero illo beatae deleniti eius dolores consequuntur, eligendi corporis maiores molestiae laudantium. Porro?",
        published: "Jan 20, 2024 by Satya",
        image: Image3,
        aosDelay: "500"
    }
]

const Blog = () => {
    return (
        <div className="w-[80%] mx-auto">
            <div className="w-full my-10">
                <div className="text-center mb-10 max-w-[600px] mx-auto space-y-2">
                    <h1 className="text-3xl font-bold lg:text-4xl"> Recent News</h1>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 gap-y-8 sm:gap-4 md:gap-7">
                    {
                        BlogData.map((data) => (
                            <div
                                data-aos="fade-up"
                                data-aos-delay={data.aosDelay}
                                key={data.title} className="bg-gray-900">
                                <div className="overflow-hidden rounded-2xl mb-2">
                                    <img src={data.image} alt="" className="w-full h-[220px] object-cover rounded-2xl hover:scale-105 duration-500" />
                                </div>
                                <div className="space-y-2">
                                    <p className="text-xs text-gray-500">{data.published}</p>
                                    <p className="font-bold line-clamp-1">{data.title}</p>
                                    <p className="line-clamp-2 text-sm text-gray-400">{data.subtitle}</p>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default Blog;

