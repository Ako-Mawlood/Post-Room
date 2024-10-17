"use client";

import BlogCard from "@/app/components/ui/BlogCard";
import { blogType } from "@/app/types/blogType";
import useFetchBlogs from "@/app/Hooks/useFetchBlogs";
import Trigger from "@/app/components/pages/blogs/Trigger";
import { SetStateAction, useEffect, useState } from "react";

import BlogCardSkeleton from "@/app/components/ui/BlogCardSekeleton";
import BlogsList from "@/app/components/pages/blogs/BlogsList";
import { getBlogs } from "@/libs/getBlogs";
import axiosInstance from "@/libs/axiosInstance";
import { getCookie } from "cookies-next";

const BlogsPage = ({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) => {
  const q = (searchParams && searchParams.q) || "";
  const [blogs, setBlogs] = useState<blogType[]>([]);
  const [skip, setSkip] = useState(0);
  const [hasReachedEnd, setHasReachedEnd] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchNewBlogs() {
      setIsLoading(true);
      const fetchedBlogs: blogType[] = await getBlogs(
        `api/search?query=${q}&skip=${skip}`,
      );
      try {
        const res = await axiosInstance(`api/search?query=${q}&skip=${skip}`, {
          headers: { Authorization: getCookie("token") },
        });
        if (res.data.length === 0) {
          setHasReachedEnd(false);
        }
        setBlogs(res.data);
      } catch (err) {
        console.error("Failed to fetch blogs:", err);
      } finally {
        setIsLoading(false);
      }
      if (blogs.length === 0) {
        setBlogs(fetchedBlogs);
      } else {
        setBlogs((prevBlogs) => [...prevBlogs, ...fetchedBlogs]);
      }
    }
    fetchNewBlogs();
  }, [skip]);

  useEffect(() => {
    setBlogs([]);
    setSkip(0);
    setHasReachedEnd(false);
  }, [q]);

  return (
    <div className="w-full">
      <main className="mt-20 flex w-full items-start justify-center">
        <section className="flex w-3/6 flex-col gap-5 border-r border-primary pr-20">
          <h1 className="text-4xl text-primary">
            <span className="text-4xl text-muted-foreground">Results for </span>
            {q}
          </h1>
          {blogs.length === 0 && !isLoading && (
            <p>
              Make sure you spelled everything correctly, or try different
              keywords.
            </p>
          )}
        </section>
        <section className="w-2/6 rounded-lg bg-black"></section>
      </main>
    </div>
  );
};

export default BlogsPage;
