"use client";

import { blogType } from "@/app/types/blogType";
import Trigger from "@/app/components/shared/Trigger";
import { useEffect, useState } from "react";
import BlogCard from "@/app/components/ui/BlogCard";
import { getBlogs } from "@/libs/getBlogs";
import BlogCardSkeleton from "@/app/components/ui/BlogCardSekeleton";

const BlogsPage = () => {
  const [blogs, setBlogs] = useState<blogType[]>([]);
  const [fetchedBlogIds, setFetchedBlogIds] = useState<number[]>([]);
  const [skip, setSkip] = useState(0);
  const [hasReachedEnd, setHasReachedEnd] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchNewBlogs() {
      setIsLoading(true);
      const URL = `/api/blog?skip=${skip}`;
      try {
        const fetchedBlogs: blogType[] = await getBlogs(URL, {
          skipBlogIds: fetchedBlogIds,
        });
        const blogIds: number[] = fetchedBlogs.map((blog) => blog.id);
        setFetchedBlogIds((prev) => [...prev, ...blogIds]);

        if (fetchedBlogs.length === 0) {
          setHasReachedEnd(true);
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

  if (blogs.length === 0 && isLoading) {
    return (
      <section className="order-2 flex w-full flex-col items-start justify-start gap-10 md:order-1 md:w-[45rem]">
        <BlogCardSkeleton />
        <BlogCardSkeleton />
        <BlogCardSkeleton />
      </section>
    );
  }

  return (
    <aside className="order-2 flex w-full flex-col items-start justify-start md:order-1 md:max-w-[45rem]">
      <section className="flex w-full flex-col items-center gap-5 md:gap-10">
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
        {isLoading && (
          <>
            <BlogCardSkeleton />
            <BlogCardSkeleton />
          </>
        )}
        {hasReachedEnd && !isLoading ? (
          <p className="my-20 font-PT">🚀 Whoa, you&apos;ve reached the end!</p>
        ) : (
          !isLoading && <Trigger setSkip={setSkip} />
        )}
      </section>
    </aside>
  );
};

export default BlogsPage;
