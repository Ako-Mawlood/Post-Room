"use client";

import { blogType } from "@/app/types/blogType";
import React, { useEffect, useState } from "react";
import BlogCard from "@/app/components/ui/BlogCard";
import { getBlogs } from "@/libs/getBlogs";
import BlogCardSkeleton from "@/app/components/ui/BlogCardSekeleton";
import Trigger from "@/app/components/shared/Trigger";

const CategoryPage = ({ params }: { params: { category: string } }) => {
  const [blogs, setBlogs] = useState<blogType[]>([]);
  const [skip, setSkip] = useState(0);
  const [hasReachedEnd, setHasReachedEnd] = useState(false);
  const [isBlogFound, setIsBlogFound] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchNewBlogs() {
      if (hasReachedEnd || isLoading) return; // Prevent redundant fetches

      setIsLoading(true);

      try {
        const URL = `/api/blog/category/${params.category}?skip=${skip}`;
        const fetchedBlogs: blogType[] = await getBlogs(URL);
        if (fetchedBlogs.length === 0) {
          setHasReachedEnd(true);
          if (blogs.length === 0) setIsBlogFound(false);
          return;
        }

        setBlogs((prevBlogs) => [...prevBlogs, ...fetchedBlogs]);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchNewBlogs();
  }, [skip]);

  if (!isBlogFound && blogs.length === 0) {
    return (
      <section className="relative flex w-full flex-col items-center gap-5">
        <h1 className="text-4xl text-muted-foreground">
          No results for <span className="text-primary">{params.category}</span>
        </h1>
      </section>
    );
  }

  return (
    <aside className="order-2 flex w-full flex-col items-start justify-start md:order-1 md:w-[45rem]">
      <h1>
        <span className="text-4xl text-primary">
          {params.category.replace("%20", " ")} tagged blogs
        </span>
      </h1>

      <section className="relative flex w-full flex-col items-center gap-5">
        {blogs.map((blog) => (
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
              username={blog.author.username}
              isSaved={blog.saved}
              isDraft={false}
            />
          </div>
        ))}

        {isLoading ? (
          <>
            <BlogCardSkeleton />
            <BlogCardSkeleton />
            <BlogCardSkeleton />
          </>
        ) : hasReachedEnd ? (
          <p className="my-20 font-PT">🚀 Whoa, you&apos;ve reached the end!</p>
        ) : (
          <Trigger setSkip={setSkip} />
        )}
      </section>
    </aside>
  );
};

export default CategoryPage;
