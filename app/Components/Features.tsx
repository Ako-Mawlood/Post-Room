"use client";

import { IoPerson } from "react-icons/io5";
import { RiMacbookFill } from "react-icons/ri";
import { FaLightbulb } from "react-icons/fa6";
import { AiFillLike } from "react-icons/ai";
import useFeatureContext from "../Hooks/useFeatureContext";

const Features = () => {
  const { sliderIndex } = useFeatureContext();
  return (
    <div
      style={{
        transform: `translateX(${-sliderIndex * 100}%)`,
      }}
      className=" w-full h-full flex transition-transform justify-between duration-500 ease-in-out"
    >
      <div className="w-full flex flex-col justify-center items-center">
        <IoPerson className="text-center text-7xl" size={250} />
        <p>Add your personal blog</p>
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
  );
};

export default Features;
