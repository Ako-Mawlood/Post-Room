"use client";

import axiosInstance from "@/libs/axiosInstance";
import Image from "next/image";
import blogWhite from "@/public/assets/blogWhite.svg";
import blogBlack from "@/public/assets/blogBlack.svg";
import { blogType } from "@/app/types/blogType";
import { getCookie } from "cookies-next";
import BlogCard from "@/app/components/ui/BlogCard";
import DeleteBlogBtn from "@/app/components/pages/read/DeleteBlogBtn";
import { useQuery } from "@tanstack/react-query";
import BlogCardSkeleton from "@/app/components/ui/BlogCardSekeleton";

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
    return (
      <div className="flex w-full flex-wrap justify-center gap-10 p-6">
        <div className="w-full md:w-[40rem] lg:w-[45%]">
          <BlogCardSkeleton />
        </div>
        <div className="w-full md:w-[40rem] lg:w-[45%]">
          <BlogCardSkeleton />
        </div>
      </div>
    );
  }

  if (!isLoading && draftedBlogs.length === 0) {
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
    <div className="flex w-full flex-wrap justify-center gap-10 p-6">
      {draftedBlogs.map((blog: blogType) => (
        <div key={blog.blogId} className="relative w-full md:w-4/5 lg:w-[47%]">
          <DeleteBlogBtn
            text=""
            className="absolute right-4 top-6 w-fit hover:bg-transparent"
            blogId={blog.blogId}
          />
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
            isDraft={true}
          />
        </div>
      ))}
    </div>
  );
};

export default DraftBlogList;
