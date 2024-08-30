"use client";

import { blogType } from "@/app/types/blogType";
import Trigger from "./Trigger";
import React, { useEffect, useState } from "react";
import BlogCard from "../../ui/BlogCard";
import { getBlogs } from "@/libs/getBlogs";
import { Skeleton } from "../../ui/skeleton";

const BlogsList = ({}) => {
  const [blogs, setBlogs] = useState<blogType[]>([]);
  const [skip, setSkip] = useState(0);
  const [hasReachedEnd, setHasReachedEnd] = useState(false);
  useEffect(() => {
    async function fetchNewBlogs() {
      const fetchedBlogs: blogType[] = await getBlogs(skip);
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
  return (
    <>
      {blogs.length !== 0 ? (
        <section className="relative flex w-3/6 flex-col items-center gap-5 border-r border-primary pr-20">
          {blogs.map((blog: blogType) => (
            <div key={blog.id} className="animate-strech h-60 w-full">
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
            <p className="my-20 font-PT">🚀 Whoa, you’ve reached the end!</p>
          ) : (
            <Trigger setSkip={setSkip} />
          )}
        </section>
      ) : (
        <Skeleton className="h-40 w-96" />
      )}
    </>
  );
};

export default BlogsList;
