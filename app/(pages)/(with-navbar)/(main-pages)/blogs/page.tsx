"use client";

import { blogType } from "@/app/types/blogType";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/libs/axiosInstance";
import { getCookie } from "cookies-next";
import BlogsList from "@/app/components/pages/blogs/BlogsList";

const BlogsPage = () => {
  const [blogs, setBlogs] = useState<blogType[]>([]);
  const [fetchedBlogIds, setFetchedBlogIds] = useState<number[]>([]);
  const [skip, setSkip] = useState(0);
  const [hasReachedEnd, setHasReachedEnd] = useState(false);

  const {
    data: fetchedBlogs,
    isFetching,
    isError,
  } = useQuery({
    queryKey: ["blogs", skip],
    queryFn: async () => {
      const URL = `/api/blog?skip=${skip}`;
      const res = await axiosInstance(URL, {
        params: { fetchedBlogIds },
        headers: { Authorization: getCookie("token") },
      });
      return res.data;
    },
    enabled: !hasReachedEnd,
    staleTime: 0,
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    refetchOnReconnect: true,
  });

  useEffect(() => {
    if (fetchedBlogs) {
      if (fetchedBlogs.length === 0) {
        setHasReachedEnd(true); // No more blogs to fetch
      } else {
        const newFetchedBlogs = fetchedBlogs.filter(
          (blog: blogType) => !fetchedBlogIds.includes(blog.id),
        );

        if (newFetchedBlogs.length > 0) {
          setFetchedBlogIds((prevIds) => [
            ...prevIds,
            ...newFetchedBlogs.map((blog: blogType) => blog.id),
          ]);

          setBlogs((prevBlogs) => [...prevBlogs, ...newFetchedBlogs]);
        }
      }
    }
  }, [fetchedBlogs]);

  useEffect(() => {
    setSkip(0);
    setBlogs([]);
    setFetchedBlogIds([]);
    setHasReachedEnd(false);
  }, []);

  if (isError) {
    console.error("Could not fetch data");
    return <p>Error fetching blogs.</p>;
  }

  return (
    <aside className="order-2 flex w-full flex-col items-start justify-start md:order-1 md:max-w-[45rem]">
      <BlogsList
        blogs={blogs}
        isFetching={isFetching}
        hasReachedEnd={hasReachedEnd}
        setSkip={setSkip}
      />
    </aside>
  );
};

export default BlogsPage;
