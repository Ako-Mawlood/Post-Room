import Navbar from "@/app/components/Navbar";
import BlogCard from "@/app/components/ui/BlogCard";
import { blogType } from "@/app/types/blogType";
import axiosInstance from "@/libs/axiosInstance";
import { getCookie } from "cookies-next";
import { cookies } from "next/headers";

import React, { useState } from "react";

async function getBlogs(q: string) {
  const token = getCookie("token", { cookies });
  const query = q;
  console.log(query);
  const res = await axiosInstance(`/api/search?query=${q}`, {
    headers: { Authorization: token },
  });
  return res.data;
}

const BlogsPage = async ({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) => {
  const q = (searchParams && searchParams.q) || "";

  const blogs = await getBlogs(q as string);

  return (
    <div className="w-full">
      <Navbar />
      <main className="mt-20 flex w-full items-start justify-center">
        {blogs && (
          <section className="flex w-3/6 flex-col gap-5 border-r border-primary pr-20">
            <h1 className="text-4xl text-primary">
              {blogs.length ? (
                <span className="text-4xl text-muted-foreground">
                  Result for{" "}
                </span>
              ) : (
                <span className="text-4xl text-muted-foreground">
                  No result for{" "}
                </span>
              )}

              {q}
            </h1>
            {blogs.map((blog: blogType) => (
              <div key={blog.blogId} className="h-60 w-full">
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
        <section className="w-2/6 rounded-lg bg-black"></section>
      </main>
    </div>
  );
};

export default BlogsPage;
