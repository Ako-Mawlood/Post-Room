"use client";

import { IoPerson } from "react-icons/io5";
import { RiMacbookFill } from "react-icons/ri";
import { FaLightbulb } from "react-icons/fa6";
import { AiFillLike } from "react-icons/ai";
import useSlider from "@/app/Hooks/useSlider";
import { GoDotFill } from "react-icons/go";
import clsx from "clsx";

const FeaturesPreview = () => {
    const { sliderIndex, setSliderIndex, setIsOnFocus } = useSlider(4);
    return (
        <section className="flex flex-col justify-between items-center text-lg w-60 mb-12 overflow-hidden">
            <div
                style={{
                    transform: `translateX(${-sliderIndex * 100}%)`,
                }}
                className="w-full h-full flex transition-transform justify-between duration-500 ease-in-out"
            >
                <div className="w-full flex flex-col justify-center items-center">
                    <IoPerson className="text-center text-7xl" size={250} />
                    <h1>Add your personal blog</h1>
                </div>
                <div className="w-full flex flex-col justify-center items-center">
                    <RiMacbookFill className="text-center text-7xl" size={250} />
                    <p>See others blogs</p>
                </div>
                <div className="w-full flex flex-col justify-center items-center">
                    <FaLightbulb className="text-center text-7xl" size={250} />
                    <p>Share your brilliant ideas</p>
                </div>
                <div className="w-full flex flex-col justify-center items-center ml-2">
                    <AiFillLike className="text-center text-7xl" size={250} />
                    <p>Like your favorate Blogs</p>
                </div>
            </div>

            <div className="flex w-24 mt-3 h-4 justify-between items-center">
                {[0, 1, 2, 3].map((id, index) => (
                    <button
                        key={id}
                        onMouseEnter={() => { setSliderIndex(index), setIsOnFocus(true) }}
                        onMouseLeave={() => { setIsOnFocus(false) }}
                    >
                        <GoDotFill className={clsx("duration-200", {
                            "w-7 h-7": sliderIndex == index,
                            "w-3 h-3": sliderIndex != index,
                        })} />
                    </button>
                )
                )}
            </div>
        </section >
    );
};

export default FeaturesPreview; 