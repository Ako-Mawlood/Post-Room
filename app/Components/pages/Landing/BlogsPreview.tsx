"use client"
import {previewBlogs} from "@/StaticData/previewBlogs"
import Image from "next/image"
import clsx from "clsx"
import starIcon from "@/public/Icons/star.svg"
import {Avatar, AvatarImage, AvatarFallback} from "../../ui/avatar"
import {Badge} from "../../ui/badge"

interface BlogsPreviewPropsType {
  sliderIndex: number
  backgroundColor: string
}

const BlogsPreview = ({sliderIndex, backgroundColor}: BlogsPreviewPropsType) => {
  return (
    <div
      style={{backgroundColor: `rgb(${backgroundColor})`}}
      className="w-full  md:w-[520px] h-[70vh] md:h-auto relative border-y-[1px] text-gray-900 border-black md:border-none"
    >
      {previewBlogs.map((blog, index) => (
        <div
          key={blog.id}
          className={clsx("h-[70vh] md:h-full w-full absolute top-0 left-0 duration-500", {
            "opacity-0": sliderIndex != index,
            "opacity-100": sliderIndex == index,
          })}
        >
          <div className="flex flex-col md:flex-row w-full h-3/5 absolute md:relative">
            <div
              style={{
                background: `linear-gradient(0deg, rgb(${backgroundColor}) 0, rgba(0,0,0,0) 50%)`,
              }}
              className="w-full h-full relative bottom-[-2px] left-0 z-10"
            >
              <Badge
                variant="secondary"
                className="flex items-center gap-3 absolute md:bottom-[-15px] left-4 mt-8 rounded-none md:rounded-full text-xs opacity-85 z-20 shadow-md"
              >
                <Image className="size-6" src="/assets/star.svg" width={20} height={20} alt="Star icon" />
                Get this & many more
              </Badge>
            </div>
            <Image
              src={blog.src}
              className="w-full h-full object-cover z-0"
              fill={true}
              quality={100}
              priority={true}
              sizes="(min-width: 2540px) 720px, (min-width: 1720px) calc(9.75vw + 474px), (min-width: 780px) calc(40.87vw - 57px), 100vw"
              alt="Blog image"
            />
          </div>
          <div className="md:px-5 md:py-7 lg:py-10">
            <div
              style={{backgroundColor: `rgb(${backgroundColor})`}}
              className="flex flex-col justify-center gap-2 w-full md:h-2/5 absolute md:relative bottom-2 left-0 p-4 md:p-0 font-semibold z-20"
            >
              <h1 className="text-2xl md:line-clamp-2 opacity-75">{blog.title}</h1>
              <p className="text-base opacity-70 md:line-clamp-2">{blog.description}</p>
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={blog.authorImage} />
                  <AvatarFallback>
                    {" "}
                    {blog.fullName
                      .split(" ")
                      .slice(0, 2)
                      .map((word) => word[0].toUpperCase())}
                  </AvatarFallback>
                </Avatar>
                <div className="text-base font-sans">
                  <h2 className="opacity-75">{blog.fullName}</h2>
                  <p className="text-xs opacity-70 line-clamp-2">{blog.authorBio}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default BlogsPreview
