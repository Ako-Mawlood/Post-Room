"use client";

import Image from "next/image";
import clsx from "clsx";
import { Avatar, AvatarImage, AvatarFallback } from "../../ui/avatar";
import { Badge } from "../../ui/badge";
import { previewBlogs } from "@/constants/previewBlogs";
import { getInitials } from "@/libs/utils";
import { PiStarFourFill as StarIcon } from "react-icons/pi";
import { backgroundColors } from "@/constants/backgroundColors";
import useSlider from "@/app/Hooks/useSlider";

type Props = {
  handleOpenAuthModal: (isNewUser: boolean) => void;
};

const BlogShowcase = ({ handleOpenAuthModal }: Props) => {
  const { sliderIndex } = useSlider(6);
  const backgroundColor = backgroundColors[sliderIndex];
  return (
    <main className="relative flex w-full flex-col justify-between border-y-[1px] border-black bg-gray-100 md:h-[70vh] md:flex-row">
      <section
        style={{ backgroundColor: `rgb(${backgroundColors[sliderIndex]},0.3)` }}
        className="flex h-full flex-grow flex-col items-start justify-between gap-6 p-10 py-10 md:border-r-[1px] md:border-black"
      >
        <h1 className="mt-4 font-PT text-6xl text-neutral-900 md:text-[5.5rem]">
          Your story matters
        </h1>
        <div className="flex max-w-[35rem] flex-col gap-10">
          <p className="text-xl font-light text-neutral-700 md:text-2xl">
            Share your unique stories with the world. Become a part of our
            community today and inspire readers everywhere with your powerful
            words.
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => handleOpenAuthModal(false)}
              className="rounded-full bg-black px-4 py-2 text-white"
            >
              Start reading
            </button>
            <button
              onClick={() => handleOpenAuthModal(true)}
              className="rounded-full border border-black px-4 py-2"
            >
              Create blog
            </button>
          </div>
        </div>
      </section>

      <div
        style={{ backgroundColor: `rgb(${backgroundColor})` }}
        className="relative h-[70vh] w-full border-t-[1px] border-black text-black md:h-auto md:w-[530px] md:border-none"
      >
        {previewBlogs.map((blog, index) => (
          <div
            key={blog.id}
            className={clsx(
              "absolute left-0 top-0 h-[70vh] w-full duration-500 md:h-full",
              {
                "opacity-0": sliderIndex != index,
                "opacity-100": sliderIndex == index,
              },
            )}
          >
            <div className="absolute flex h-3/5 w-full flex-col md:relative md:flex-row">
              <div
                style={{
                  background: `linear-gradient(0deg, rgb(${backgroundColor}) 0, rgba(0,0,0,0) 50%)`,
                }}
                className="relative bottom-[-2px] left-0 z-10 h-full w-full"
              >
                <Badge className="absolute left-8 z-20 flex items-center justify-center gap-1 rounded-none bg-yellow-500 px-3 py-1.5 text-sm font-normal text-black shadow-md md:bottom-[-15px] md:rounded-full">
                  <StarIcon size={15} />
                  Get this & many more
                </Badge>
              </div>
              <Image
                src={blog.src}
                className="z-0 h-full w-full object-cover"
                fill={true}
                quality={100}
                priority={true}
                sizes="(min-width: 2540px) 720px, (min-width: 1720px) calc(9.75vw + 474px), (min-width: 780px) calc(40.87vw - 57px), 100vw"
                alt="Blog image"
              />
            </div>
            <div className="md:px-5 md:py-7 lg:py-10">
              <div className="absolute bottom-2 left-0 z-20 flex h-56 w-full flex-col justify-around px-6">
                <h1 className="mt-2 font-PT text-3xl font-light md:line-clamp-2">
                  {blog.title}
                </h1>

                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={blog.authorImage} />
                    <AvatarFallback>
                      {getInitials(blog.fullName)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="font-sans text-base">
                    <h2 className="opacity-75">{blog.fullName}</h2>
                    <p className="line-clamp-2 text-sm">{blog.authorBio}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default BlogShowcase;
