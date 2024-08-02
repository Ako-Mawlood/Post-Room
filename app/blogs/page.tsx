import React from "react";
import Navbar from "../components/Navbar";
import { getBlogs } from "@/libs/getBlogs";
import { ReadonlyURLSearchParams } from "next/navigation";
import { blogType } from "../types/blogType";
import BlogCard from "../components/ui/BlogCard";
import Trigger from "../components/pages/blogs/Trigger";
const BlogsPage = async ({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) => {
  const skip = parseInt((searchParams && searchParams.skip) as string, 10) || 0;

  const blogs = await getBlogs(skip);

  return (
    <div className="w-full">
      <Navbar />
      <main className="mt-20 flex w-full items-start justify-center">
        {blogs && (
          <section className="flex w-3/6 flex-col gap-5 border-r border-primary pr-20">
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
            <Trigger skip={skip} />
          </section>
        )}
        <section className="w-2/6 rounded-lg bg-black"></section>
      </main>
    </div>
  );
};

export default BlogsPage;
