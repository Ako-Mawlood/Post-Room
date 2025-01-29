"use client";

import { blogType } from "@/app/types/blogType";
import { useState, useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/libs/axiosInstance";
import { getCookie } from "cookies-next";
import BlogsList from "@/app/components/pages/blogs/BlogsList";

const SearchPage = ({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) => {
  const queryClient = useQueryClient();
  const q = searchParams?.q as string;

  const [blogs, setBlogs] = useState<blogType[]>([]);
  const [fetchedBlogIds, setFetchedBlogIds] = useState<number[]>([]);
  const [skip, setSkip] = useState(0);
  const [hasReachedEnd, setHasReachedEnd] = useState(false);
  const [query, setQuery] = useState<string | undefined>(q);

  const {
    data: fetchedBlogs,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ["searchBlogs", query, skip],
    queryFn: async () => {
      const URL = `/api/search?query=${query}&skip=${skip}`;
      const res = await axiosInstance(URL, {
        params: { fetchedBlogIds },
        headers: { Authorization: getCookie("token") },
      });
      return res.data;
    },
    enabled: !!query && !hasReachedEnd,
    staleTime: 0,
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    refetchOnReconnect: true,
  });

  useEffect(() => {
    if (q !== query) {
      setQuery(q);
      setSkip(0);
      setBlogs([]);
      setFetchedBlogIds([]);
      setHasReachedEnd(false);
      refetch();
    }
  }, [q, queryClient, refetch]);

  useEffect(() => {
    if (fetchedBlogs) {
      if (fetchedBlogs.length === 0) {
        setHasReachedEnd(true);
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

  return (
    <aside className="order-2 flex min-h-[200vh] w-full flex-col items-start justify-start gap-5 md:order-1 md:w-[45rem]">
      <h1 className="text-4xl text-primary">
        {blogs.length === 0 && !isFetching ? (
          <>
            <span className="text-4xl text-muted-foreground">
              No result for{" "}
            </span>
            <span>{q}</span>
          </>
        ) : (
          <>
            <span className="text-4xl text-muted-foreground">Results for </span>
            <span>{q}</span>
          </>
        )}
      </h1>
      <BlogsList
        blogs={blogs}
        isFetching={isFetching}
        hasReachedEnd={hasReachedEnd}
        setSkip={setSkip}
      />

      {blogs.length === 0 && !isFetching && (
        <p className="my-10 font-sans text-lg">
          Make sure you spelled everything correctly, or try different keywords.
        </p>
      )}
    </aside>
  );
};

export default SearchPage;
