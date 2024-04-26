"use client"

import useSliderContext from "@/app/Hooks/useSliderContext"
import SwitchSliderBtn from "../Authentication/SwitchSliderBtn"
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
        description: "Embark on a MacBook journey, exploring cutting-edge technology like never before.",
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

    return (
        <section className="flex flex-col md:flex-row items-center justify-start">
            <div className="flex flex-col md:flex-row items-center h-[163vw] sm:h-[144vw] md:h-[42vw] md:w-5/6 mt-0 mx-6 md:mt-6 md:ml-auto overflow-hidden">
                <div style={{ transform: `translateY(${-sliderIndex * 100}%)` }} className={`flex flex-col gap-2 w-full h-full duration-1000 transition-transform transform`}>
                    {blogs.map((blog: blogType, index) => (
                        <div key={index} className={clsx("w-full flex flex-col md:flex-row justify-start items-center", {
                            "opacity-0 duration-1000": sliderIndex != blog.index,
                            "opacity-100 duration-1000": sliderIndex == blog.index,
                        })}>
                            <Image src={blog.src} placeholder="blur" className="rounded-2xl w-full sm:mx-4 md:mx-0 md:w-2/5" width={512} height={648} alt="Blog image" />
                            <div className="flex flex-col justify-start md:justify-center md:ml-24 lg:ml-32 items-start w-full h-[53vw] sm:h-[30vw] md:w-2/5">
                                <h1 className="text-2xl leading-10 my-2 md:text-[3vw] font-semibold line-clamp-1 md:line-clamp-3">{blog.title}</h1>
                                <p className="text-lg md:text-xl my-2 line-clamp-2 md:line-clamp-4">{blog.description}</p>
                                <Link className="bg-blue-600 text-gray-200 w-36 py-2 text-center rounded-full font-semibold text-xl mt-4 hover:opacity-90" href='/'>Read blog</Link>
                            </div>
                        </div>

                    ))}

                </div>
            </div>
            <div className="flex md:flex-col gap-4 w-3/4 h-4  md:w-1 md:h-72 md:mr-auto mt-3 justify-between items-center">
                {[0, 1, 2].map((index) => (
                    <SwitchSliderBtn
                        key={index}
                        defaultStyle="w-full px-0 rounded-full h-1/3 bg-gray-300 duration-500"
                        onFocusStyle="w-full rounded-full h-1/3 bg-blue-600 duration-500"
                        switchIndex={index}
                        handleOnMouseEnter={() => { }}
                        handleOnMouseLeave={() => { }}
                    >
                        <div style={{}} className="animte-grow w-full h-0 bg-blue-600">
                        </div>
                    </SwitchSliderBtn>
                )
                )}
            </div>
        </section>

    )
}

export default BlogsPreview