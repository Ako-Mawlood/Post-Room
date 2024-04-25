"use client"

import useSliderContext from "@/app/Hooks/useSliderContext"
import drowingImage from "../../../../public/drowing.png"
import freindesImage from "../../../../public/freinds.jpg"
import Image, { StaticImageData } from "next/image";
import macbookImage from "../../../../public/macbook.jpg"
import Link from "next/link"
import clsx from "clsx";

const blogs = [
    {
        index: 0,
        title: "Engineering Innovations Unleashed",
        description: "Explore engineering marvels and technological advancements shaping our world.",
        src: drowingImage
    },
    {
        index: 1,
        title: "Strong Connections",
        description: "Discover the importance of friendship and its impact on personal growth.",
        src: freindesImage
    },
    {
        index: 2,
        title: "MacBook Experience: A Journey in Innovation",
        description: "Embark on an immersive journey into the world of MacBook and experience cutting-edge technology like never before.",
        src: macbookImage
    }
];

interface blogType {
    index: number;
    title: string;
    description: string;
    src: StaticImageData;
}

const BlogsPreview = () => {
    const { sliderIndex } = useSliderContext();
    const translateValue = -sliderIndex * 100
    return (
        <section className="h-[205vw] sm:h-[170vw] md:h-[42vw] md:w-5/6 mx-6 overflow-hidden md:mx-auto md:mt-6">
            <div style={{ transform: `translateY(${translateValue}%)` }} className={`flex flex-col gap-2 w-full h-full duration-1000 transition-transform transform`}>
                {blogs.map((blog: blogType) => (
                    <div className={clsx("w-full flex flex-col md:flex-row justify-between items-center", {
                        "opacity-0 duration-1000": sliderIndex != blog.index,
                        "opacity-100": sliderIndex == blog.index,
                    })}>
                        <Image src={blog.src} placeholder="blur" className="rounded-2xl w-full md:w-2/5" width={500} height={633} alt="Blog image" />
                        <div className="flex flex-col justify-start md:justify-center items-start w-full h-[95vw] sm:h-[60vw] md:h-auto md:w-2/5">
                            <h1 className="text-2xl my-3 md:text-[3vw] font-semibold">{blog.title}</h1>
                            <p className="text-lg md:text-xl my-2">{blog.description}</p>
                            <Link className="bg-blue-600 text-gray-200 w-36 py-2 text-center rounded-full font-semibold text-xl mt-4 hover:opacity-90" href='/'>Read blog</Link>
                        </div>

                    </div>

                ))}

            </div>
        </section>

    )
}

export default BlogsPreview