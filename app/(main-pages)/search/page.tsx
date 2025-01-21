"use client";

import BlogCard from "@/app/components/ui/BlogCard";
import { blogType } from "@/app/types/blogType";
import { useEffect, useState } from "react";
import BlogCardSkeleton from "@/app/components/ui/BlogCardSekeleton";
import axiosInstance from "@/libs/axiosInstance";
import { getCookie } from "cookies-next";

const BlogsPage = ({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) => {
  const q = (searchParams && searchParams.q) || "";
  const [blogs, setBlogs] = useState<blogType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isBlogFound, setIsBlogFound] = useState(true);
  useEffect(() => {
    async function fetchNewBlogs() {
      setIsLoading(true);

      try {
        setIsBlogFound(true);
        const res = await axiosInstance(`api/search?query=${q}`, {
          headers: { Authorization: getCookie("token") },
        });
        if (res.data.length === 0) {
          setIsBlogFound(false);
        }
        setBlogs(res.data);
      } catch (err) {
        console.error("Failed to fetch blogs:", err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchNewBlogs();
  }, [q]);
  useEffect(() => {
    setIsBlogFound(true);
  }, []);

  return (
    <aside className="order-2 flex w-full flex-col items-start justify-start md:order-1 md:w-[45rem]">
      <h1 className="text-4xl text-primary">
        {!isBlogFound ? (
          <>
            <span className="text-4xl text-muted-foreground">
              No result for{" "}
            </span>
            <span>{q}</span>
          </>
        ) : (
          <>
            <span className="text-4xl text-muted-foreground">Results for </span>{" "}
            <span>{q}</span>
          </>
        )}
      </h1>
      {isLoading && (
        <section className="relative flex w-full flex-col items-center gap-5 p-5">
          <BlogCardSkeleton />
          <BlogCardSkeleton />
          <BlogCardSkeleton />
        </section>
      )}
      {blogs.length !== 0 && !isLoading && (
        <section className="relative flex w-full flex-col items-center gap-5 p-5 md:w-[728px]">
          {blogs.map((blog: blogType) => (
            <div key={blog.id} className="animate-stretch h-52 w-full">
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
        </section>
      )}
      {blogs.length === 0 && !isLoading && (
        <p className="my-10 font-sans text-lg">
          Make sure you spelled everything correctly, or try different keywords.
        </p>
      )}
    </aside>
  );
};

export default BlogsPage;
