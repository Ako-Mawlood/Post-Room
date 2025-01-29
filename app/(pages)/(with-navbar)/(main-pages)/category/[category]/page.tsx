"use client";

import { blogType } from "@/app/types/blogType";
import { useState, useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/libs/axiosInstance";
import { getCookie } from "cookies-next";
import BlogsList from "@/app/components/pages/blogs/BlogsList";

const BlogsPage = ({ params }: { params: { category: string } }) => {
  const queryClient = useQueryClient();
  const [blogs, setBlogs] = useState<blogType[]>([]);
  const [fetchedBlogIds, setFetchedBlogIds] = useState<Set<number>>(new Set());
  const [skip, setSkip] = useState(0);
  const [hasReachedEnd, setHasReachedEnd] = useState(false);
  const category = params.category;

  // Reset state when the category changes
  useEffect(() => {
    setBlogs([]);
    setFetchedBlogIds(new Set());
    setSkip(0);
    setHasReachedEnd(false);
  }, [category]);

  const { data: fetchedBlogs, isFetching } = useQuery({
    queryKey: ["categoryBlogs", category, skip],
    queryFn: async () => {
      const URL = `/api/blog/category/${category}?skip=${skip}`;
      const res = await axiosInstance(URL, {
        params: { fetchedBlogIds: Array.from(fetchedBlogIds) },
        headers: { Authorization: getCookie("token") },
      });
      return res.data;
    },
    enabled: !!category && !hasReachedEnd,
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
          (blog: blogType) => !fetchedBlogIds.has(blog.id),
        );

        if (newFetchedBlogs.length > 0) {
          setFetchedBlogIds((prevIds) => {
            const updatedIds = new Set(prevIds);
            newFetchedBlogs.forEach((blog: blogType) =>
              updatedIds.add(blog.id),
            );
            return updatedIds;
          });

          setBlogs((prevBlogs) => [...prevBlogs, ...newFetchedBlogs]);

          queryClient.setQueryData(
            ["searchBlogs", category, skip],
            (prev: blogType[] = []) => [...prev, ...newFetchedBlogs],
          );
        }
      }
    }
  }, [fetchedBlogs, queryClient, fetchedBlogIds, category, skip]);

  return (
    <aside className="order-2 flex w-full flex-col items-start justify-start gap-5 md:order-1 md:max-w-[45rem]">
      <h1 className="text-4xl text-primary">
        {blogs.length === 0 && !isFetching ? (
          <>
            <span className="text-4xl text-muted-foreground">
              No blogs categorized under
            </span>
            <span>{category.replace("%20", " ")}</span>
          </>
        ) : (
          <>
            <span className="text-4xl text-muted-foreground">
              Blogs categorized under{" "}
            </span>
            <span>{category.replace("%20", " ")}</span>
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
        <p className="my-10 min-h-[200vh] font-sans text-lg">
          No blogs in this category. Create one, bro!
        </p>
      )}
    </aside>
  );
};

export default BlogsPage;
