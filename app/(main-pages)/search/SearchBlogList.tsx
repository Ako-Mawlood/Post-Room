"use client";

import { blogType } from "@/app/types/blogType";
import Trigger from "./Trigger";
import React, { useEffect, useState } from "react";
import BlogCard from "../../ui/BlogCard";
import { getBlogs } from "@/libs/getBlogs";
import { Skeleton } from "../../ui/skeleton";

const SearchBlogList = ({ url }: { url: string }) => {
  const [blogs, setBlogs] = useState<blogType[]>([]);
  const [skip, setSkip] = useState(0);
  const [hasReachedEnd, setHasReachedEnd] = useState(false);

  useEffect(() => {
    async function fetchNewBlogs() {
      const URL = url + `?skip=${skip}`;
      const fetchedBlogs: blogType[] = await getBlogs(URL);
      if (fetchedBlogs.length === 0) {
        setHasReachedEnd(true);
      }
      if (blogs.length === 0) {
        setBlogs(fetchedBlogs);
      } else {
        setBlogs((prevBlogs) => [...prevBlogs, ...fetchedBlogs]);
      }
    }
    fetchNewBlogs();
  }, [skip]);

  if (blogs.length === 0) {
    return (
      <div className="flex w-full flex-col gap-4">
        <Skeleton className="h-52 w-full md:w-[40rem]" />
        <Skeleton className="h-52 w-full md:w-[40rem]" />
        <Skeleton className="h-52 w-full md:w-[40rem]" />
        <Skeleton className="h-52 w-full md:w-[40rem]" />
        <Skeleton className="h-52 w-full md:w-[40rem]" />
        <Skeleton className="h-52 w-full md:w-[40rem]" />
      </div>
    );
  }
  return (
    <>
      {blogs.length !== 0 && (
        <section className="relative flex w-full flex-col items-center gap-5 p-5 md:w-[728px]">
          {blogs.map((blog: blogType) => (
            <div key={blog.id} className="animate-strech h-52 w-full">
              <BlogCard
                title={blog.title}
                author={blog.author.fullname}
                authorImageUrl={blog.author.imageUrl}
                blogId={blog.blogId}
                blogImageUrl={blog.imageUrl}
                categories={blog.categories}
                content={blog.content}
                createdAt={blog.createdAt}
                stars={blog._count.stars}
              />
            </div>
          ))}
          {hasReachedEnd ? (
            <p className="my-20 font-PT">
              🚀 Whoa, you&apos;ve reached the end!
            </p>
          ) : (
            <Trigger setSkip={setSkip} />
          )}
        </section>
      )}
    </>
  );
};

export default SearchBlogList;
