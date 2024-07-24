"use client";

import Image from "next/image";
import clsx from "clsx";
import { Avatar, AvatarImage, AvatarFallback } from "../../ui/avatar";
import { Badge } from "../../ui/badge";
import { previewBlogs } from "@/constants/previewBlogs";
import { getInitials } from "@/libs/utils";

interface BlogsPreviewPropsType {
  sliderIndex: number;
  backgroundColor: string;
}

const BlogsPreview = ({
  sliderIndex,
  backgroundColor,
}: BlogsPreviewPropsType) => {
  return (
    <div
      style={{ backgroundColor: `rgb(${backgroundColor})` }}
      className="relative h-[70vh] w-full border-y-[1px] border-black text-gray-900 md:h-auto md:w-[560px] md:border-none"
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
              <Badge
                variant="secondary"
                className="absolute left-4 z-20 mt-8 flex items-center gap-3 rounded-none text-xs opacity-85 shadow-md md:bottom-[-15px] md:rounded-full"
              >
                <Image
                  className="size-6"
                  src="/assets/star.svg"
                  width={20}
                  height={20}
                  alt="Star icon"
                />
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
            <div
              style={{ backgroundColor: `rgb(${backgroundColor})` }}
              className="absolute bottom-2 left-0 z-20 flex w-full flex-col justify-center gap-2 p-4 font-semibold md:relative md:h-2/5 md:p-0"
            >
              <h1 className="text-2xl opacity-75 md:line-clamp-2">
                {blog.title}
              </h1>
              <p className="text-base opacity-70 md:line-clamp-2">
                {blog.description}
              </p>
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={blog.authorImage} />
                  <AvatarFallback>{getInitials(blog.fullName)}</AvatarFallback>
                </Avatar>
                <div className="font-sans text-base">
                  <h2 className="opacity-75">{blog.fullName}</h2>
                  <p className="line-clamp-2 text-xs opacity-70">
                    {blog.authorBio}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BlogsPreview;
