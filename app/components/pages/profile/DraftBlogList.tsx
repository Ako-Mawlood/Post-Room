"use client";

import axiosInstance from "@/libs/axiosInstance";
import Image from "next/image";
import blogWhite from "@/public/assets/blogWhite.svg";
import blogBlack from "@/public/assets/blogBlack.svg";
import { blogType } from "@/app/types/blogType";
import Link from "next/link";

import { getCookie } from "cookies-next";

import BlogCard from "../../ui/BlogCard";
import DeleteBlogBtn from "../read/DeleteBlogBtn";
import { useQuery } from "@tanstack/react-query";

async function getDraftedBlogs() {
  const token = getCookie("token");

  const res = await axiosInstance("/api/blog/draft", {
    headers: { Authorization: token },
  });
  return res.data;
}

const DraftBlogList = () => {
  const { data: draftedBlogs, isLoading } = useQuery({
    queryKey: ["draftedBlogs"],
    queryFn: getDraftedBlogs,
  });

  if (isLoading) {
    return <div>loading...</div>;
  }

  if (draftedBlogs.length === 0) {
    return (
      <div className="mb-7 flex flex-col items-center justify-center opacity-30">
        <div className="my-10 w-72">
          <Image
            draggable={false}
            src={blogWhite}
            className="hidden dark:block"
            width={0}
            height={250}
            alt="No blog vector"
          />
          <Image
            src={blogBlack}
            draggable={false}
            className="dark:hidden"
            width={0}
            height={250}
            alt="No blog vector"
          />
        </div>
        <h1 className="text-center font-PT text-4xl font-semibold">
          No drafted blogs yet.
        </h1>
      </div>
    );
  }

  return (
    <>
      {draftedBlogs && (
        <div className="mx-auto flex w-full flex-wrap justify-start gap-10 p-6">
          {draftedBlogs.map((blog: blogType) => (
            <div
              key={blog.id}
              className="relative h-52 w-full md:w-4/5 lg:w-[47%]"
            >
              <div className="absolute right-4 top-4">
                <DeleteBlogBtn
                  text=""
                  className="hover:bg-transparent"
                  blogId={blog.blogId}
                />
              </div>
              <BlogCard
                author={blog.author.fullname}
                username={blog.author.username}
                authorImageUrl={blog.author.imageUrl}
                blogId={blog.blogId}
                isSaved={blog.saved}
                categories={blog.categories}
                title={blog.title}
                content={blog.content}
                createdAt={blog.createdAt}
                blogImageUrl={blog.imageUrl}
                stars={blog._count.stars}
              />
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default DraftBlogList;
