"use client";
import { useState, useEffect } from "react";
import { IoPerson } from "react-icons/io5";
import { RiMacbookFill } from "react-icons/ri";
import { FaLightbulb } from "react-icons/fa6";
import { FaRegKeyboard } from "react-icons/fa6";
import { AiFillLike } from "react-icons/ai";

const FeaturesPreview = () => {
  const [featureIndex, setFeatureIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setFeatureIndex((prevIndex) => (prevIndex + 1) % 4);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <aside className="hidden text-gray-200 md:flex justify-center flex-col items-center w-1/2 h-screen bg-primary border-r-[0.1px] border-r-gray-800">
      <h1 className="text-center text-slate-200 bold mb-10 font-Oswald text-2xl">
        Acquire knowledge; it's an ornament among friends and armor against
        enemies.
      </h1>
      <section className="flex  flex-col justify-between items-center w-60  overflow-hidden  mb-12 ">
        <div
          style={{ transform: `translate(${-featureIndex * 100}%)` }}
          className=" w-full h-full flex transition-transform justify-between duration-500 ease-in-out"
        >
          <div className="w-full flex flex-col justify-center items-center">
            <IoPerson className="text-center text-7xl" size={250} />
            <p>Add you personal blog</p>
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
            <p>Like to your favorate Blog</p>
          </div>
        </div>

        <div className=" text-6xl w-20 justify-between flex">
          <button
            className={featureIndex === 0 ? "font-bold " : ""}
            onClick={() => setFeatureIndex(0)}
          >
            .
          </button>
          <button
            className={featureIndex === 1 ? "font-bold text-white" : ""}
            onClick={() => setFeatureIndex(1)}
          >
            .
          </button>
          <button
            className={featureIndex === 2 ? "font-bold text-white" : ""}
            onClick={() => setFeatureIndex(2)}
          >
            .
          </button>
          <button
            className={featureIndex === 3 ? "font-bold text-white" : ""}
            onClick={() => setFeatureIndex(3)}
          >
            .
          </button>
          <button
            className={featureIndex === 4 ? "font-bold text-white" : ""}
            onClick={() => setFeatureIndex(4)}
          >
            .
          </button>
        </div>
      </section>
    </aside>
  );
};

export default FeaturesPreview;
