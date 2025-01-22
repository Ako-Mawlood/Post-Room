"use client";

import { blogType } from "@/app/types/blogType";
import Trigger from "./Trigger";
import React, { useEffect, useState } from "react";
import BlogCard from "../../ui/BlogCard";
import { getBlogs } from "@/libs/getBlogs";
import BlogCardSkeleton from "../../ui/BlogCardSekeleton";

const BlogsList = () => {
  const [blogs, setBlogs] = useState<blogType[]>([]);
  const [fetchedBlogIds, setFetchedBlogIds] = useState<number[]>([]);
  const [skip, setSkip] = useState(0);
  const [hasReachedEnd, setHasReachedEnd] = useState(false);

  useEffect(() => {
    async function fetchNewBlogs() {
      const URL = `/api/blog?skip=${skip}`;
      const fetchedBlogs: blogType[] = await getBlogs(URL, {
        skipBlogIds: fetchedBlogIds,
      });
      const blogIdes: number[] = [];
      fetchedBlogs.map((blog) => {
        blogIdes.push(blog.id);
      });
      setFetchedBlogIds((prev) => [...prev, ...blogIdes]);
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
      <section className="flex w-full flex-col items-center gap-5">
        <BlogCardSkeleton />
        <BlogCardSkeleton />
        <BlogCardSkeleton />
      </section>
    );
  }
  return (
    <>
      {blogs.length !== 0 && (
        <section className="flex w-full flex-col items-center gap-10">
          {blogs.map((blog: blogType) => (
            <BlogCard
              key={blog.id}
              username={blog.author.username}
              title={blog.title}
              isSaved={blog.saved}
              author={blog.author.fullname}
              authorImageUrl={blog.author.imageUrl}
              blogId={blog.blogId}
              blogImageUrl={blog.imageUrl}
              categories={blog.categories}
              content={blog.content}
              createdAt={blog.createdAt}
              stars={blog._count.stars}
            />
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

export default BlogsList;
