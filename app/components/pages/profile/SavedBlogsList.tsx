"use client";

import Image from "next/image";
import blogWhite from "@/public/assets/blogWhite.svg";
import blogBlack from "@/public/assets/blogBlack.svg";
import { blogType } from "@/app/types/blogType";

import axiosInstance from "@/libs/axiosInstance";
import { getCookie } from "cookies-next";
import BlogCard from "../../ui/BlogCard";
import { useEffect, useState } from "react";
import BlogCardSkeleton from "@/app/components/ui/BlogCardSekeleton";

const SavedBlogsList = () => {
  const [savedBlogs, setSavedBlogs] = useState<
    { blog: blogType }[] | undefined
  >([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setIsLoading(true);
    axiosInstance("/api/list", {
      headers: { Authorization: getCookie("token") },
    })
      .then((res) => setSavedBlogs(res.data))
      .catch((err) =>
        setError(err.response?.data?.message || "Could not get saved blogs"),
      )
      .finally(() => setIsLoading(false));
  }, []);

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

  if (error) {
    return (
      <div className="mt-8 flex h-[30rem] w-full items-start justify-center">
        <h1 className="text-destructive">{error}</h1>
      </div>
    );
  }
  if (!savedBlogs || savedBlogs.length === 0) {
    return (
      <div className="mb-7 flex flex-col items-center justify-center">
        <div className="my-10 w-72">
          <Image
            src={blogWhite}
            className="hidden dark:block"
            layout="intrinsic"
            alt="No blog vector"
          />
          <Image
            src={blogBlack}
            className="dark:hidden"
            layout="intrinsic"
            alt="No blog vector"
          />
        </div>
        <h1 className="text-center font-PT text-4xl font-semibold">
          No saved blogs yet.
        </h1>
      </div>
    );
  }

  return (
    <div className="flex w-full flex-wrap justify-center gap-10 p-6">
      {savedBlogs.map(({ blog }) => (
        <div key={blog.id} className="w-full md:w-[40rem] lg:w-[45%]">
          <BlogCard
            author={blog.author.fullname}
            username={blog.author.username}
            authorImageUrl={blog.author.imageUrl}
            blogId={blog.blogId}
            isSaved={true}
            blogImageUrl={blog.imageUrl}
            categories={blog.categories}
            title={blog.title}
            content={blog.content}
            createdAt={blog.createdAt}
            stars={blog._count.stars}
            isDraft={false}
          />
        </div>
      ))}
    </div>
  );
};

export default SavedBlogsList;
